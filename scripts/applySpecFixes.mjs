#!/usr/bin/env node
/**
 * applySpecFixes.mjs — 人工审核确定的 specs 文本修正（一次性 + 幂等）
 *
 * 背景：部分节点的 specs.energy/length 写的是"总量/非特征量"（如黑洞质能、
 * 无量纲精度、高斯磁场），与本图谱 Y 轴"特征能量量子"语义不一致。
 * 本表按人工审核结论修正 specs 原文，随后由 deriveRanges.mjs 重新推导坐标。
 * 每条替换断言恰好出现一次；已修正过的条目自动跳过（幂等）。
 */
import fs from 'node:fs';
import path from 'node:path';

const DATA_TS = path.join(import.meta.dirname, '../src/data/physicsData.ts');

const R = String.raw;
// [说明, 精确匹配原文, 替换为]
const FIXES = [
  ['obj-precision-atomic-clock length',
   R`length: '1 - 100 \\text{ \\mu m}',`,
   R`length: '0.5 \\text{ \\mu m} - 1 \\text{ mm (光晶格)}',`],
  ['obj-precision-atomic-clock energy',
   R`energy: '10^{-15} \\text{ eV} \\quad (\\Delta \\nu / \\nu \\sim 10^{-18})',`,
   R`energy: 'E_{\\text{opt}} \\sim 1 - 2 \\text{ eV (Sr/Yb 光跃迁)}, \\quad \\delta\\nu/\\nu \\sim 10^{-18}',`],
  ['obj-positronium energy（hfs 移至 annotation 已有）',
   R`energy: '\\text{hfs} \\, \\Delta\\nu = 203.389 \\text{ GHz}',`,
   R`energy: 'E_{\\text{bind}} = 6.8 \\text{ eV}',`],
  ['obj-antihydrogen energy',
   R`energy: '1S-2S: \\Delta\\nu/\\nu < 2 \\times 10^{-12}',`,
   R`energy: 'E_{1S-2S} = 10.2 \\text{ eV}, \\quad \\Delta\\nu/\\nu < 2 \\times 10^{-12}',`],
  ['obj-fermi-hubbard-gas energy',
   R`energy: 'U/t \\sim 1 - 20, \\quad T/T_F \\sim 0.05',`,
   R`energy: 'E_R \\sim 10 - 100 \\text{ neV (反冲能)}, \\quad U/t \\sim 1 - 20',`],
  ['obj-quantum-gas-microscope energy',
   R`energy: 'U/t \\sim 1 - 20',`,
   R`energy: 'E_R \\sim 10 - 200 \\text{ neV (反冲能)}, \\quad U/t \\sim 1 - 20',`],
  ['obj-topological-order-string energy',
   R`energy: '\\gamma_{\\text{top}} = \\ln D',`,
   R`energy: '\\Delta_{\\text{any}} \\sim 0.1 - 10 \\text{ meV (任意子能隙)}',`],
  ['obj-magnetar energy',
   R`energy: 'B \\sim 10^{14} - 10^{15} \\text{ G}',`,
   R`energy: 'h\\nu_X \\sim 1 - 100 \\text{ keV (X 射线暴)}, \\quad B \\sim 10^{14} - 10^{15} \\text{ G}',`],
  ['obj-frb energy（爆发总能移至 annotation）',
   R`energy: 'E_{\\text{radio}} \\sim 10^{38} - 10^{40} \\text{ erg}',`,
   R`energy: 'h\\nu \\sim 0.5 - 5 \\text{ GHz (射电光子)}',`],
  ['obj-frb annotation 补充爆发总能',
   R`部分呈周期重复。'`,
   R`部分呈周期重复；单次爆发总能 ~10^{38}-10^{40} erg。'`],
  ['obj-blackhole-m87 energy→EHT 光子，质能移入 mass',
   R`energy: 'M = (6.5 \\pm 0.7) \\times 10^9 M_{\\odot}',`,
   R`energy: 'h\\nu_{\\text{EHT}} = 230 \\text{ GHz} \\approx 0.95 \\text{ meV}',
      mass: 'M = (6.5 \\pm 0.7) \\times 10^9 M_{\\odot}',`],
  ['obj-sgra-blackhole energy→EHT 光子，质能移入 mass',
   R`energy: 'M = (4.15 \\pm 0.01) \\times 10^6 M_\\odot',`,
   R`energy: 'h\\nu_{\\text{EHT}} = 230 \\text{ GHz} \\approx 0.95 \\text{ meV}',
      mass: 'M = (4.15 \\pm 0.01) \\times 10^6 M_\\odot',`],
  ['obj-gw150914-blackhole energy→GW 频率量子',
   R`energy: 'E_{\\text{radiated}} = (3.0 \\pm 0.5) M_\\odot c^2',`,
   R`energy: 'h f_{\\text{GW}} \\sim 35 - 250 \\text{ Hz (旋近-并合)}',
      mass: 'E_{\\text{rad}} = (3.0 \\pm 0.5) M_\\odot c^2',`],
  ['obj-binary-neutron-star energy→GW 频率量子',
   R`energy: 'E_{\\text{GW}} \\sim 0.025 M_\\odot c^2',`,
   R`energy: 'h f_{\\text{GW}} \\sim 100 - 2000 \\text{ Hz (旋近)}',
      mass: 'E_{\\text{rad}} \\sim 0.025 M_\\odot c^2',`],
  ['obj-levitated-np energy',
   R`energy: 'E_{\\text{ZPF}} \\sim \\text{zeV}, \\quad T_{\\text{cm}} \\to \\mu\\text{K}',`,
   R`energy: '\\hbar \\Omega_{\\text{trap}} \\sim 0.1 - 100 \\text{ neV}, \\quad T_{\\text{cm}} \\sim \\mu\\text{K}',`],
  ['obj-axion-cdm length（康普顿波长与质量区间一致）',
   R`length: '10^{-12} \\text{ m (Compton Wavelength)}',`,
   R`length: '\\lambda_C \\sim 0.2 \\text{ mm} - 2 \\text{ cm (康普顿波长)}',`],
  ['obj-primordial-blackhole length（DM 窗口史瓦西半径）',
   R`length: '10^{-15} - 10^{11} \\text{ m}',`,
   R`length: 'r_s \\sim 10^{-11} - 10^{-5} \\text{ m（Schwarzschild，DM 窗口）}',`],
  ['obj-primordial-blackhole energy→Hawking 温度',
   R`energy: 'M_{PBH} \\sim 10^{15} \\text{ g} - 10^5 M_\\odot',`,
   R`energy: 'k T_H \\sim 0.1 \\text{ eV} - 100 \\text{ keV (Hawking)}',
      mass: 'M_{PBH} \\sim 10^{15} \\text{ g} - 10^5 M_\\odot',`],
  ['obj-electron-neutrino length（康普顿波长@质量上限）',
   R`length: '5.0 \\times 10^{-7} \\text{ m}',`,
   R`length: '2.5 \\times 10^{-7} \\text{ m (康普顿波长@0.8 eV)}',`],
  ['obj-muon-neutrino length',
   R`length: '1.0 \\times 10^{-8} \\text{ m}',`,
   R`length: '1.2 \\times 10^{-12} \\text{ m (康普顿波长@0.17 MeV)}',`],
  ['obj-tau-neutrino length',
   R`length: '1.0 \\times 10^{-10} \\text{ m}',`,
   R`length: '1.1 \\times 10^{-14} \\text{ m (康普顿波长@18.2 MeV)}',`],
  ['obj-21cm energy（标明静止系）',
   R`energy: 'h\\nu = 5.9 \\text{ \\mu eV}',`,
   R`energy: 'h\\nu = 5.9 \\text{ \\mu eV (静止系)}',`],
  ['obj-cosmic-string length',
   R`length: '\\text{Network} \\sim \\text{Hubble}',`,
   R`length: 'L_{\\text{network}} \\sim 10^{26} \\text{ m (哈勃尺度)}',`],
  ['obj-cosmic-string energy',
   R`energy: 'G\\mu/c^2 < 10^{-7} \\text{ (PTA/CMB Bound)}',`,
   R`energy: '\\eta \\lesssim 10^{16} \\text{ GeV (GUT 相变标度)}, \\quad G\\mu/c^2 < 10^{-7}',`],
];

let src = fs.readFileSync(DATA_TS, 'utf8');
let applied = 0, skipped = 0;
for (const [label, search, replace] of FIXES) {
  const n = src.split(search).length - 1;
  if (n === 1) {
    src = src.replace(search, replace);
    applied++;
    console.log(`✓ ${label}`);
  } else if (n === 0) {
    if (src.includes(replace)) {
      skipped++;
      console.log(`- ${label}（已修正，跳过）`);
    } else {
      console.error(`✗ ${label}：未找到原文！`);
      process.exitCode = 1;
    }
  } else {
    console.error(`✗ ${label}：原文出现 ${n} 次，不唯一！`);
    process.exitCode = 1;
  }
}
if (applied > 0) fs.writeFileSync(DATA_TS, src);
console.log(`\n应用 ${applied} 条，跳过 ${skipped} 条`);
