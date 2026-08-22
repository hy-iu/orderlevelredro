#!/usr/bin/env node
/**
 * deriveRanges.mjs — 从 specs 文本推导物理节点的坐标 / errorBar / 3D 轴元数据
 *
 * 用法:
 *   node scripts/deriveRanges.mjs report     逐节点分析报告 + 矛盾清单（只读）
 *   node scripts/deriveRanges.mjs apply     原地重写 physicsData.ts 并重新生成 physicsData.json
 *   node scripts/deriveRanges.mjs validate  CI 校验：存在未豁免矛盾或不可解析 specs 时退出码非零
 *
 * 语义规范（与 src/types/physics.ts 注释一致）：
 *   coords     = 代表点，取 specs 数值范围在 log10 空间的中点
 *   errorBar   = 范围半宽（dex）。range=文献/实测范围（实线）；
 *                estimate=数量级估计（\sim/\approx 单值，±0.3 dex，虚线）；
 *                uncertainty=测量不确定度（\pm 或衰变宽度 Γ）
 *   coordsMeta = { t: log10(T/K), tau: log10(τ/s) }，供 3D 视图 Z 轴
 *   scripts/rangeOverrides.json 存放人工审核结论（白名单 / 强制值 / 溯源）
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const ROOT = path.join(import.meta.dirname, '..');
const DATA_TS = path.join(ROOT, 'src/data/physicsData.ts');
const DATA_JSON = path.join(ROOT, 'src/data/physicsData.json');
const OVERRIDES_PATH = path.join(import.meta.dirname, 'rangeOverrides.json');

// ---------------------------------------------------------------------------
// 单位换算表（值 = log10(单位对应的 SI 量)）
// ---------------------------------------------------------------------------
const LENGTH_UNITS = {
  m: 0, km: 3, cm: -2, mm: -3, 'μm': -6, 'µm': -6, nm: -9, pm: -12, fm: -15,
  'Å': -10, AU: 11.1749, ly: 15.9759, pc: 16.4891, kpc: 19.4891, Mpc: 22.4891, Gpc: 25.4891
};
const ENERGY_UNITS = {
  zeV: -21, neV: -9, 'μeV': -6, 'µeV': -6, meV: -3, eV: 0, keV: 3, MeV: 6, GeV: 9, TeV: 12, PeV: 15,
  erg: 11.7951, J: 18.7951,
  K: -4.0646, mK: -7.0646, 'μK': -10.0646, nK: -13.0646, // ×k_B
  Hz: -14.3832, mHz: -17.3832, 'μHz': -20.3832, nHz: -23.3832, kHz: -11.3832, MHz: -8.3832, GHz: -5.3832, // ×h
  // 质量 → 质能 ×c²（天体/粒子对象常用）
  Msun: 66.0466, g: 32.7493, kg: 35.7493
};
const TEMP_UNITS = { K: 0, mK: -3, 'μK': -6, nK: -9 }; // log10(K)，Z 轴用
const TIME_UNITS = {
  s: 0, ms: -3, 'μs': -6, 'µs': -6, ns: -9, ps: -12, fs: -15, as: -18,
  min: 1.7782, hr: 3.5563, day: 4.9375, yr: 7.4997, kyr: 10.4997, Myr: 13.4997, Gyr: 16.4997,
  '小时': 3.5563, '天': 4.9375, '年': 7.4997
};
// log10(hc / eV·m)：能量 spec 中出现波长单位时 E = hc/λ
const HC_LOG_EV_M = -5.9068;
const ALL_UNITS = { ...LENGTH_UNITS, ...ENERGY_UNITS, ...TIME_UNITS };

const dimOfUnit = u =>
  u in LENGTH_UNITS ? 'L' : u in TEMP_UNITS ? 'T' : u in TIME_UNITS ? 'time' : u in ENERGY_UNITS ? 'E' : null;

// ---------------------------------------------------------------------------
// 解析器
// ---------------------------------------------------------------------------
function normalizeUnit(raw) {
  // 先还原创作者写的 LaTeX 命令，再剥离反斜杠/空白/括号注释
  let u = raw.replace(/\\mu/g, 'μ').replace(/\\AA/g, 'Å').replace(/\\odot/g, '⊙');
  u = u.replace(/[（(].*?[)）]/g, '').replace(/[\\;,.\s]/g, '');
  u = u.replace(/\/nucleon$/, '');
  if (!u) return null;
  if (u in ALL_UNITS) return u;
  // 容忍 `meV above` 这类带尾巴的单位（仅匹配 ≥2 字符的单位前缀，避免 molecule→m 误判）
  for (const known of Object.keys(ALL_UNITS)) {
    if (known.length >= 2 && u.length > known.length && u.startsWith(known)) return known;
  }
  return u;
}

/** 把会被误读的结构替换为等长空格，保持 token 位置对齐 */
function blank(s, re) {
  return s.replace(re, m => ' '.repeat(m.length));
}

/** 子句 → { nums: [{value,pos}], units: [{unit,pos}] }（位置对齐） */
function tokenize(clause) {
  const units = [];
  for (const m of clause.matchAll(/\\text\{([^{}]*)\}/g)) {
    let u = normalizeUnit(m[1]);
    // 处理 `\mu\text{eV}` 这类前缀在 \text 外的情况
    const pre = clause.slice(Math.max(0, m.index - 4), m.index);
    if (/\\mu$/.test(pre) && u && !u.startsWith('μ')) u = 'μ' + u;
    if (u && u in ALL_UNITS) units.push({ unit: u, pos: m.index });
  }
  let s = blank(clause, /\\text\{[^{}]*\}/g);
  s = blank(s, /\\frac\{[^{}]*\}\{[^{}]*\}/g);
  s = blank(s, /\\sqrt\{[^{}]*\}/g);
  const nums = [];
  // 1) 先提取科学计数法 token（a×10^n 与纯 10^n），记录后挖掉
  const sciRe = /(\d+(?:\.\d+)?)\s*\\times\s*10\^\{?(-?\d+(?:\.\d+)?)\}?|10\^\{?(-?\d+(?:\.\d+)?)\}?/g;
  let m;
  const spans = [];
  while ((m = sciRe.exec(s)) !== null) {
    const v = m[1] !== undefined ? parseFloat(m[1]) * 10 ** parseFloat(m[2]) : 10 ** parseFloat(m[3]);
    if (Number.isFinite(v) && v > 0) nums.push({ value: v, pos: m.index });
    spans.push([m.index, m.index + m[0].length]);
  }
  for (const [a, b] of spans.reverse()) s = s.slice(0, a) + ' '.repeat(b - a) + s.slice(b);
  // 2) 挖掉剩余上下标（H^{-1}、T_{CDW}、E_J 等），避免指数/下标数字混入
  s = blank(s, /[_^]\{[^{}]*\}/g);
  // 3) 普通数字（跳过紧跟字母/_/^ 的符号下标，如 T_2）
  const plainRe = /(\d+(?:\.\d+)?)/g;
  while ((m = plainRe.exec(s)) !== null) {
    const prev = s[m.index - 1];
    if (prev && /[A-Za-z_\^]/.test(prev)) continue;
    const v = parseFloat(m[1]);
    if (Number.isFinite(v) && v > 0) nums.push({ value: v, pos: m.index });
  }
  nums.sort((a, b) => a.pos - b.pos);
  // 裸单位回退：最后一个数字之后的词（如 `2.7 K`）
  if (units.length === 0 && nums.length > 0) {
    const tail = s.slice(nums[nums.length - 1].pos).replace(/10\^\{?-?\d+\.?\d*\}?/g, ' ');
    const wm = tail.match(/[,;\s)\\]*([A-Za-zμµÅ][A-Za-z0-9μµÅ/]*)/);
    if (wm) {
      const u = normalizeUnit(wm[1]);
      if (u && u in ALL_UNITS) units.push({ unit: u, pos: nums[nums.length - 1].pos + 1 });
    }
  }
  return { nums, units };
}

/** (a ± b) [×10^n] 专项 */
function parsePm(clause) {
  let m = clause.match(/\(?\s*(\d+(?:\.\d+)?)\s*\\pm\s*(\d+(?:\.\d+)?)\s*\)?\s*(?:\\times\s*)?10\^\{?(-?\d+(?:\.\d+)?)\}?/);
  if (m) return { center: parseFloat(m[1]) * 10 ** parseFloat(m[3]), sigma: parseFloat(m[2]) * 10 ** parseFloat(m[3]) };
  m = clause.match(/(\d+(?:\.\d+)?)\s*\\pm\s*(\d+(?:\.\d+)?)/);
  if (m) return { center: parseFloat(m[1]), sigma: parseFloat(m[2]) };
  return null;
}

/**
 * 解析 spec 字符串 → { logMin, logMax, kind, halfDexPm, temps[], bound }
 * kind: 'range' | 'approx' | 'pm' | 'exact'；无法解析返回 null
 * targetDim: 'L' | 'E' | 'time' —— 能量 spec 中的波长单位按 E=hc/λ 换算
 */
function parseSpec(spec, targetDim) {
  if (!spec) return null;
  // 太阳质量 M_{\odot} / M_\odot → 可识别单位
  spec = spec.replace(/M_\{\\odot\}|M_\\odot|M_⊙/g, '\\text{Msun}');
  const clauses = spec.split(/\\quad|(?<!\\)[,;]/).map(c => c.trim()).filter(Boolean);
  const logs = [];
  const temps = [];
  let sawApprox = false, halfDexPm = null, sawBound = false, sawMulti = false;

  for (const clause of clauses) {
    // 面/体密度（cm^{-2} 等）不是坐标量纲，跳过
    if (/\}\s*\^\{-?[23]\}/.test(clause)) continue;
    // 裸 k_B T（室温涨落能标的简写）
    if (/k_B\s*T/.test(clause) && !/\d/.test(clause)) {
      logs.push(Math.log10(0.0257));
      sawApprox = true;
      continue;
    }
    const pm = /\\pm/.test(clause) ? parsePm(clause) : null;
    const { nums, units } = tokenize(clause);
    if (units.length === 0) continue;

    // 纯单位子句（无数值）：`\text{neV} - \mu\text{eV}` → 以单位本身为范围；单个单位 → 1×单位 的估计
    if (nums.length === 0) {
      for (const u of units) {
        const dim = dimOfUnit(u.unit);
        if (dim === 'T') temps.push(TEMP_UNITS[u.unit]);
        logs.push(unitToLog(u.unit, 1, targetDim));
      }
      if (units.length > 1) sawMulti = true;
      else sawApprox = true;
      continue;
    }

    if (/[<>]|\\lesssim|\\gtrsim|\\ll|\\gg/.test(clause)) sawBound = true;

    // 单位配对：每个数字取其后最近的单位；没有则用最后一个单位
    const pairs = nums.map(n => {
      const after = units.find(u => u.pos > n.pos);
      return { value: n.value, unit: (after || units[units.length - 1]).unit };
    });

    if (pm) {
      const u = pairs[0].unit;
      logs.push(unitToLog(u, pm.center, targetDim));
      halfDexPm = Math.log10((pm.center + pm.sigma) / pm.center);
      if (dimOfUnit(u) === 'T') temps.push(Math.log10(pm.center) + TEMP_UNITS[u]);
      continue;
    }

    for (const p of pairs) {
      if (dimOfUnit(p.unit) === 'T') temps.push(Math.log10(p.value) + TEMP_UNITS[p.unit]);
      logs.push(unitToLog(p.unit, p.value, targetDim));
    }
    if (/\\sim|\\approx/.test(clause)) sawApprox = true;
    if (pairs.length > 1) sawMulti = true;
  }

  if (logs.length === 0) return temps.length ? { empty: true, temps } : null;
  const logMin = Math.min(...logs);
  const logMax = Math.max(...logs);
  let kind;
  if (halfDexPm != null) kind = 'pm';
  else if (sawMulti || logMax - logMin > 0.01) kind = 'range';
  else if (sawApprox) kind = 'approx';
  else kind = 'exact';
  return { logMin, logMax, kind, halfDexPm, temps, bound: sawBound };
}

/** 数值+单位 → log10(SI)。能量 spec 中的长度单位按 E=hc/λ 转换（波长越长能量越低） */
function unitToLog(unit, value, targetDim) {
  const dim = dimOfUnit(unit);
  if (targetDim === 'E' && dim === 'L') return HC_LOG_EV_M - (Math.log10(value) + LENGTH_UNITS[unit]);
  if (targetDim === 'L' && dim === 'E') return -HC_LOG_EV_M - (Math.log10(value) + ENERGY_UNITS[unit]);
  return Math.log10(value) + (ALL_UNITS[unit] ?? 0);
}

// ---------------------------------------------------------------------------
// 数据加载：esbuild 打包成临时 esm 再 import
// ---------------------------------------------------------------------------
async function loadData() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'physdata-'));
  const out = path.join(tmp, 'physicsData.mjs');
  execFileSync(
    path.join(ROOT, 'node_modules/.bin/esbuild'),
    [DATA_TS, '--bundle', '--format=esm', `--outfile=${out}`, '--log-level=silent'],
    { cwd: ROOT }
  );
  return import(out);
}

// ---------------------------------------------------------------------------
// 推导
// ---------------------------------------------------------------------------
const ESTIMATE_HALF_DEX = 0.3; // \sim 单值的诚实半宽

function deriveNode(node, overrides) {
  const ov = overrides[node.id] || {};
  const L = parseSpec(node.specs?.length, 'L');
  const E = parseSpec(node.specs?.energy, 'E');
  const T = parseSpec(node.specs?.time, 'time');

  const result = {
    id: node.id,
    current: { x: node.coords?.x, y: node.coords?.y, dx: node.errorBar?.dx ?? null, dy: node.errorBar?.dy ?? null },
    parsed: { L, E, T },
    proposed: {},
    flags: [],
    notes: []
  };

  for (const [axis, parsed, cur, curHalf] of [
    ['x', L, node.coords?.x, node.errorBar?.dx ?? null],
    ['y', E, node.coords?.y, node.errorBar?.dy ?? null]
  ]) {
    if (!parsed || parsed.empty) {
      result.proposed[axis] = { coord: cur, halfDex: curHalf, type: curHalf != null ? 'estimate' : null };
      result.flags.push(`${axis}: specs 不可解析，保留现状`);
      continue;
    }
    let coord = (parsed.logMin + parsed.logMax) / 2;
    let halfDex, type;
    if (parsed.kind === 'range') {
      halfDex = (parsed.logMax - parsed.logMin) / 2;
      type = 'range';
    } else if (parsed.kind === 'pm') {
      halfDex = parsed.halfDexPm;
      type = 'uncertainty';
    } else if (parsed.kind === 'approx') {
      halfDex = ESTIMATE_HALF_DEX;
      type = 'estimate';
    } else {
      halfDex = null;
      type = null; // 精确单值 → 无 errorBar
    }
    if (parsed.bound) {
      // 上下限：点落在限值上，不画 errorBar（信息性提示，不阻断校验）
      halfDex = null;
      type = null;
      result.notes.push(`${axis}: specs 为上限/下限值，坐标取限值`);
    }
    result.proposed[axis] = { coord, halfDex, type };
    const margin = Math.max(halfDex ?? 0, ESTIMATE_HALF_DEX) + 0.3;
    if (typeof cur === 'number' && Math.abs(cur - coord) > margin) {
      result.flags.push(`${axis}: 当前 ${cur} 偏离推导值 ${coord.toFixed(2)}±${(halfDex ?? 0).toFixed(2)}（specs 范围 [${parsed.logMin.toFixed(2)}, ${parsed.logMax.toFixed(2)}]）`);
    }
  }

  // 衰变宽度：dy 表示 Γ/m 分数展宽
  if (node.specs?.decayWidth && E && !E.empty) {
    const G = parseSpec(node.specs.decayWidth, 'E');
    if (G && !G.empty) {
      const mLog = (E.logMin + E.logMax) / 2;
      const gLog = (G.logMin + G.logMax) / 2;
      const frac = 10 ** (gLog - mLog);
      result.proposed.y = { coord: mLog, halfDex: Math.log10(1 + frac / 2), type: 'uncertainty' };
      result.flags = result.flags.filter(f => !f.startsWith('y: 当前'));
    }
  }

  // Z 轴元数据
  const temps = [...(E?.temps ?? [])];
  const coordsMeta = {};
  if (temps.length) coordsMeta.t = (Math.min(...temps) + Math.max(...temps)) / 2;
  if (T && !T.empty) coordsMeta.tau = (T.logMin + T.logMax) / 2;
  if (Object.keys(coordsMeta).length) result.proposed.coordsMeta = coordsMeta;

  // 人工覆盖
  if (ov.keepCoords || ov.coords) {
    const px = ov.coords?.x ?? node.coords.x;
    const py = ov.coords?.y ?? node.coords.y;
    result.proposed.x = { ...result.proposed.x, coord: px };
    result.proposed.y = { ...result.proposed.y, coord: py };
    result.flags = result.flags.filter(f => !f.includes('偏离推导值'));
  }
  if (ov.errorBar) {
    result.proposed.x = { ...result.proposed.x, halfDex: ov.errorBar.dx, type: ov.errorBarType ?? result.proposed.x.type };
    result.proposed.y = { ...result.proposed.y, halfDex: ov.errorBar.dy, type: ov.errorBarType ?? result.proposed.y.type };
  }
  if (ov.exempt) result.flags = [];
  if (ov.source) result.proposed.source = ov.source;
  if (ov.coordsNote) result.proposed.coordsNote = ov.coordsNote;

  // 自动溯源
  if (!result.proposed.source) {
    const ann = node.annotation || '';
    const rmp = ann.match(/RMP\s*\d{4}(?:\s*Colloquium)?(?:\s*\([^)]*\))?/);
    if (rmp) result.proposed.source = rmp[0];
    // pdgCode 是项目内部编号（全都以 PDG- 开头），只有粒子类对象才算真正的 PDG 溯源
    else if (/PDG/.test(ann) || (/^PDG-/.test(node.pdgCode || '') && ['fundamental', 'composite', 'bound-state'].includes(node.type))) {
      result.proposed.source = 'PDG 2024';
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// 格式化
// ---------------------------------------------------------------------------
const fmtCoord = n => (n == null ? null : Number(n.toFixed(2)));
const fmtDex = n => (n == null ? null : Number(n.toPrecision(2)));
const esc = s => s.replace(/'/g, "\\'");

function proposedCoordsLine(r) {
  return `coords: { x: ${fmtCoord(r.proposed.x.coord)}, y: ${fmtCoord(r.proposed.y.coord)} },`;
}
function proposedErrorBarLine(r) {
  const dx = fmtDex(r.proposed.x.halfDex);
  const dy = fmtDex(r.proposed.y.halfDex);
  if (dx == null && dy == null) return 'errorBar: null,';
  return `errorBar: { dx: ${dx ?? 0}, dy: ${dy ?? 0} },`;
}
function proposedType(r) {
  if (r.proposed.x.halfDex == null && r.proposed.y.halfDex == null) return null;
  const types = [r.proposed.x.type, r.proposed.y.type].filter(Boolean);
  if (types.includes('estimate')) return 'estimate';
  if (types.includes('range')) return 'range';
  return types[0] ?? null;
}

// ---------------------------------------------------------------------------
// apply：原地重写 physicsData.ts
// ---------------------------------------------------------------------------
function upsertAfter(block, field, line, anchors) {
  const existRe = new RegExp(`${field}: [^\\n]*,\\n`);
  if (existRe.test(block)) return block.replace(existRe, `${line}\n`);
  for (const anchor of anchors) {
    const aRe = new RegExp(`(${anchor}: [^\\n]*\\n)`);
    if (aRe.test(block)) return block.replace(aRe, `$1    ${line}\n`);
  }
  return block;
}

function removeField(block, field) {
  return block.replace(new RegExp(`\\s*${field}: [^\\n]*,\\n`), '\n');
}

function applyToSource(derivations) {
  let src = fs.readFileSync(DATA_TS, 'utf8');
  let touched = 0;
  for (const r of derivations) {
    const idAnchor = `id: '${r.id}'`;
    const start = src.indexOf(idAnchor);
    if (start === -1) throw new Error(`未找到节点 ${r.id}`);
    let end = src.indexOf(`id: '`, start + idAnchor.length);
    if (end === -1) end = src.length;
    let block = src.slice(start, end);
    const before = block;

    block = block.replace(/coords: \{ x: [^,]+, y: [^}]+ \},/, proposedCoordsLine(r));
    block = block.replace(/errorBar: (?:\{ dx: [^,]+, dy: [^}]+ \}|null),/, proposedErrorBarLine(r));

    const type = proposedType(r);
    if (type) block = upsertAfter(block, 'errorBarType', `errorBarType: '${type}',`, ['errorBar']);
    else block = removeField(block, 'errorBarType');

    if (r.proposed.source) block = upsertAfter(block, 'source', `source: '${esc(r.proposed.source)}',`, ['errorBarType', 'errorBar']);
    else block = removeField(block, 'source');
    if (r.proposed.coordsNote) block = upsertAfter(block, 'coordsNote', `coordsNote: '${esc(r.proposed.coordsNote)}',`, ['source', 'errorBarType', 'errorBar']);
    else block = removeField(block, 'coordsNote');

    if (r.proposed.coordsMeta) {
      const cm = r.proposed.coordsMeta;
      const cmStr = `coordsMeta: { ${[cm.t != null ? `t: ${fmtCoord(cm.t)}` : null, cm.tau != null ? `tau: ${fmtCoord(cm.tau)}` : null].filter(Boolean).join(', ')} },`;
      block = upsertAfter(block, 'coordsMeta', cmStr, ['coords']);
    }

    if (block !== before) touched++;
    src = src.slice(0, start) + block + src.slice(end);
  }
  fs.writeFileSync(DATA_TS, src);
  return touched;
}

// ---------------------------------------------------------------------------
// 主流程
// ---------------------------------------------------------------------------
async function main() {
  const mode = process.argv[2] || 'report';

  if (mode === 'debug') {
    const spec = process.argv[3] || '';
    const dim = process.argv[4] || 'E';
    console.log('输入:', spec);
    const clauses = spec.replace(/M_\{\\odot\}|M_\\odot|M_⊙/g, '\\text{Msun}').split(/\\quad|(?<!\\)[,;]/).map(c => c.trim()).filter(Boolean);
    for (const c of clauses) {
      console.log('子句:', JSON.stringify(c), '→ tokens:', JSON.stringify(tokenize(c)));
    }
    console.log('结果:', JSON.stringify(parseSpec(spec, dim), null, 2));
    return;
  }

  const overrides = fs.existsSync(OVERRIDES_PATH)
    ? JSON.parse(fs.readFileSync(OVERRIDES_PATH, 'utf8'))
    : {};
  const mod = await loadData();
  const objects = mod.ACADEMIC_OBJECTS;
  const derivations = objects.map(o => deriveNode(o, overrides));

  const flagged = derivations.filter(d => d.flags.length > 0);
  const unparseable = derivations.filter(d => d.flags.some(f => f.includes('不可解析')));

  if (mode === 'report') {
    console.log(`节点总数: ${objects.length}`);
    console.log(`完全可解析: ${derivations.length - unparseable.length}；含不可解析轴: ${unparseable.length}`);
    console.log(`带标记: ${flagged.length}\n`);
    for (const d of derivations) {
      const cur = `(${d.current.x}, ${d.current.y}) eb=(${d.current.dx}, ${d.current.dy})`;
      const prop = `(${fmtCoord(d.proposed.x.coord)}, ${fmtCoord(d.proposed.y.coord)}) eb=(${fmtDex(d.proposed.x.halfDex)}, ${fmtDex(d.proposed.y.halfDex)}) ${proposedType(d) ?? 'null'}`;
      const cm = d.proposed.coordsMeta ? ` meta=${JSON.stringify(d.proposed.coordsMeta)}` : '';
      console.log(`${d.id}\n  当前 ${cur}\n  推导 ${prop}${d.proposed.source ? `  [${d.proposed.source}]` : ''}${cm}`);
      for (const f of d.flags) console.log(`  ⚠ ${f}`);
      for (const n of d.notes ?? []) console.log(`  ℹ ${n}`);
    }
    return;
  }

  if (mode === 'apply') {
    const touched = applyToSource(derivations);
    // 验证：重新加载重写后的数据，与推导值逐一比对
    const mod2 = await loadData();
    let mismatches = 0;
    for (const o2 of mod2.ACADEMIC_OBJECTS) {
      const d = derivations.find(x => x.id === o2.id);
      if (!d) continue;
      if (fmtCoord(o2.coords.x) !== fmtCoord(d.proposed.x.coord) || fmtCoord(o2.coords.y) !== fmtCoord(d.proposed.y.coord)) {
        console.error(`✗ ${o2.id} coords 写入不一致`);
        mismatches++;
      }
    }
    if (mismatches) throw new Error(`${mismatches} 个节点写入不一致，已中止`);
    fs.writeFileSync(DATA_JSON, JSON.stringify(mod2.ACADEMIC_OBJECTS, null, 2) + '\n');
    console.log(`已重写 physicsData.ts（${touched} 个节点有改动）`);
    console.log(`已生成 physicsData.json（${mod2.ACADEMIC_OBJECTS.length} 条）`);
    console.log(`仍有 ${flagged.length} 个节点带标记（report 查看）`);
    return;
  }

  if (mode === 'validate') {
    const hard = flagged.filter(d => !overrides[d.id]?.exempt);
    if (unparseable.length) {
      console.log(`✗ ${unparseable.length} 个节点 specs 不可解析:`);
      unparseable.forEach(d => console.log(`  ${d.id}: ${d.flags.join('; ')}`));
    }
    if (hard.length) {
      console.log(`✗ ${hard.length} 个节点坐标与 specs 矛盾（未豁免）:`);
      hard.forEach(d => console.log(`  ${d.id}: ${d.flags.join('; ')}`));
    }
    if (hard.length || unparseable.length) process.exit(1);
    console.log(`✓ ${objects.length} 个节点全部通过校验`);
    return;
  }

  console.error(`未知模式: ${mode}（report | apply | validate | debug）`);
  process.exit(2);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
