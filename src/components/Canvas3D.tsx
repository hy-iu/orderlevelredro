import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { ACADEMIC_DOMAINS, OBJECTS, RESEARCH_NODES, RELATION_LINKS } from '../data/physicsData';
import { LayerVisibility } from './ControlPanel';

interface Canvas3DProps {
  activeDomain?: string;
  layerVisibility: LayerVisibility;
  onSelectItem: (item: any, type: string) => void;
  selectedItem?: any;
  theme?: 'light' | 'dark';
}

type ZMode = 'tau' | 't';
type LabelMode = 'auto' | 'all' | 'off';

// 数据 log 空间范围：x = log10(L/m)，y = log10(E/eV)，z = log10(τ/s) 或 log10(T/K)
const X_RANGE: [number, number] = [-36, 27];
const Y_RANGE: [number, number] = [-25, 29];
const Z_CONF: Record<ZMode, { range: [number, number]; label: string; hint: string }> = {
  tau: { range: [-45, 43], label: 'log₁₀(τ/s)', hint: '特征时间尺度' },
  t: { range: [-10, 3], label: 'log₁₀(T/K)', hint: '特征温度' }
};

const DOMAIN_COLOR = new Map(ACADEMIC_DOMAINS.map(d => [d.id, d.color]));

/** 取整主刻度步长：跨度小用 2，否则用 10 */
const majorStep = (span: number) => (span <= 15 ? 2 : 10);

/** 标签短名：去掉括号注释部分 */
const shortName = (d: any) =>
  (d.label || d.title || d.name || d.id).split('(')[0].split('（')[0].trim();

/** 自动模式下标签出现的相机距离阈值 */
const LABEL_LOD_DIST = 65;

export const Canvas3D: React.FC<Canvas3DProps> = ({
  layerVisibility,
  onSelectItem,
  selectedItem,
  theme = 'light'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const groupsRef = useRef<Record<string, THREE.Group>>({});
  const meshMapRef = useRef<Map<string, THREE.Mesh>>(new Map());
  const labelEntriesRef = useRef<{ mesh: THREE.Mesh; label: CSS2DObject }[]>([]);
  const allMeshesRef = useRef<THREE.Mesh[]>([]);
  // 连线索引：节点 id → 相关线段（legs 双向 + relations），用于选中高亮
  const linksRef = useRef<Map<string, { a: [number, number, number]; b: [number, number, number]; other: string }[]>>(new Map());
  const highlightGroupRef = useRef<THREE.Group | null>(null);
  const hoveredIdRef = useRef<string | null>(null);
  const selectedIdRef = useRef<string | null>(null);
  const neighborIdRef = useRef<Set<string>>(new Set());
  const [zMode, setZMode] = useState<ZMode>('tau');
  const [labelMode, setLabelMode] = useState<LabelMode>('auto');
  const labelModeRef = useRef<LabelMode>('auto');
  useEffect(() => { labelModeRef.current = labelMode; }, [labelMode]);

  const isDark = theme === 'dark';

  useEffect(() => {
    if (!containerRef.current) return;

    const zConf = Z_CONF[zMode];
    const [zMin, zMax] = zConf.range;
    const [xMin, xMax] = X_RANGE;
    const [yMin, yMax] = Y_RANGE;
    // 重定中偏移：数据中心 → 原点
    const cx = (xMin + xMax) / 2;
    const cy = (yMin + yMax) / 2;
    const cz = (zMin + zMax) / 2;

    // 主题色板（无发光、无雾，平面化）
    const P = {
      bg: isDark ? 0x0f172a : 0xffffff,
      axis: isDark ? '#94a3b8' : '#334155',
      tick: isDark ? '#94a3b8' : '#64748b',
      grid: isDark ? 0x1e293b : 0xe2e8f0,
      label: isDark ? '#cbd5e1' : '#0f172a',
      leg: isDark ? '#475569' : '#94a3b8',
      tagBg: isDark ? 'rgba(15, 23, 42, 0.82)' : 'rgba(255, 255, 255, 0.85)',
      tagBorder: isDark ? '#475569' : '#cbd5e1',
      tagText: isDark ? '#e2e8f0' : '#1e293b'
    };

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(P.bg);

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(62, 38, 86);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    // CSS2D 标签层（常屏尺寸文字，不阻挡鼠标）
    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(width, height);
    Object.assign(labelRenderer.domElement.style, {
      position: 'absolute', top: '0', left: '0', pointerEvents: 'none', zIndex: '5'
    });
    containerRef.current.appendChild(labelRenderer.domElement);

    // 轨道控制：阻尼 + 缩放到光标 + 右键平移
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.zoomToCursor = true;
    controls.minDistance = 8;
    controls.maxDistance = 260;
    controlsRef.current = controls;

    const root = new THREE.Group();
    root.position.set(-cx, -cy, -cz);
    scene.add(root);

    const frameGroup = new THREE.Group();
    const objectsGroup = new THREE.Group();
    const nodesGroup = new THREE.Group();
    const relationsGroup = new THREE.Group();
    root.add(frameGroup, objectsGroup, nodesGroup, relationsGroup);
    groupsRef.current = { objects: objectsGroup, nodes: nodesGroup, relations: relationsGroup };

    // ---------- 坐标框：12 条边 + 主刻度 + 数值标签 + 底面网格 ----------
    const textSprite = (text: string, size: number, color: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = color;
        ctx.font = `${size}px "JetBrains Mono", monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 128, 32);
      }
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(canvas), transparent: true }));
      sprite.scale.set(9, 2.25, 1);
      return sprite;
    };

    const lineSegs = (pts: [number, number, number][], color: string | number, opacity = 1) => {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pts.flat(), 3));
      return new THREE.LineSegments(geo, new THREE.LineBasicMaterial({ color, transparent: opacity < 1, opacity }));
    };

    // 盒框 12 边
    const c = (x: number, y: number, z: number): [number, number, number] => [x, y, z];
    const edges: [number, number, number][] = [];
    const corners = [
      c(xMin, yMin, zMin), c(xMax, yMin, zMin), c(xMax, yMin, zMax), c(xMin, yMin, zMax),
      c(xMin, yMax, zMin), c(xMax, yMax, zMin), c(xMax, yMax, zMax), c(xMin, yMax, zMax)
    ];
    [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]]
      .forEach(([a, b]) => edges.push(corners[a], corners[b]));
    frameGroup.add(lineSegs(edges, P.axis));

    // 底面网格（y = yMin 平面，主刻度处）
    const gridPts: [number, number, number][] = [];
    const sx = majorStep(xMax - xMin), sy = majorStep(yMax - yMin), sz = majorStep(zMax - zMin);
    for (let x = Math.ceil(xMin / sx) * sx; x <= xMax; x += sx) gridPts.push(c(x, yMin, zMin), c(x, yMin, zMax));
    for (let z = Math.ceil(zMin / sz) * sz; z <= zMax; z += sz) gridPts.push(c(xMin, yMin, z), c(xMax, yMin, z));
    frameGroup.add(lineSegs(gridPts, P.grid));

    // 刻度标签放在默认相机朝向的前侧棱边：X 沿前底边 (yMin,zMax)，Y 沿前竖边 (xMax,zMax)，Z 沿右底边 (xMax,yMin)
    for (let x = Math.ceil(xMin / sx) * sx; x <= xMax; x += sx) {
      const s = textSprite(String(x), 26, P.tick);
      s.position.set(x, yMin - 2.5, zMax + 1.5);
      frameGroup.add(s);
    }
    for (let y = Math.ceil(yMin / sy) * sy; y <= yMax; y += sy) {
      const s = textSprite(String(y), 26, P.tick);
      s.position.set(xMax + 3.5, y, zMax + 1.5);
      frameGroup.add(s);
    }
    for (let z = Math.ceil(zMin / sz) * sz; z <= zMax; z += sz) {
      const s = textSprite(String(z), 26, P.tick);
      s.position.set(xMax + 1.5, yMin - 2.5, z);
      frameGroup.add(s);
    }

    // 轴标题
    const xTitle = textSprite('log₁₀(L/m)', 30, P.label);
    xTitle.position.set(xMin + 9, yMin - 3, zMax + 2);
    xTitle.scale.set(12, 3, 1);
    frameGroup.add(xTitle);
    const yTitle = textSprite('log₁₀(E/eV)', 30, P.label);
    yTitle.position.set(xMax + 8, cy, zMax + 1.5);
    yTitle.scale.set(12, 3, 1);
    frameGroup.add(yTitle);
    const zTitle = textSprite(zConf.label, 30, P.label);
    zTitle.position.set(xMax + 1.5, yMin - 6, cz);
    zTitle.scale.set(12, 3, 1);
    frameGroup.add(zTitle);

    // ---------- 数据点（按学科着色，平面材质） + CSS2D 标签 ----------
    const meshMap = new Map<string, THREE.Mesh>();
    meshMapRef.current = meshMap;
    const allMeshes: THREE.Mesh[] = [];
    allMeshesRef.current = allMeshes;
    const links = new Map<string, { a: [number, number, number]; b: [number, number, number]; other: string }[]>();
    linksRef.current = links;
    const addLink = (id: string, a: [number, number, number], b: [number, number, number], other: string) => {
      if (!links.has(id)) links.set(id, []);
      links.get(id)!.push({ a, b, other });
    };
    const highlightGroup = new THREE.Group();
    highlightGroup.renderOrder = 999;
    root.add(highlightGroup);
    highlightGroupRef.current = highlightGroup;
    const labelEntries: { mesh: THREE.Mesh; label: CSS2DObject }[] = [];
    labelEntriesRef.current = labelEntries;
    const ebPts: number[] = [];
    const ebCols: number[] = [];
    const tmpColor = new THREE.Color();

    const makeTag = (d: any) => {
      const div = document.createElement('div');
      div.textContent = shortName(d);
      Object.assign(div.style, {
        fontSize: '10px',
        fontFamily: '"JetBrains Mono", "STIX Two Text", monospace',
        padding: '0 4px',
        borderRadius: '3px',
        background: P.tagBg,
        border: `1px solid ${P.tagBorder}`,
        color: P.tagText,
        whiteSpace: 'nowrap',
        pointerEvents: 'none'
      } as CSSStyleDeclaration);
      const obj = new CSS2DObject(div);
      obj.position.set(0, 0.9, 0);
      return obj;
    };

    const addErrorBars = (o: any, x: number, y: number, z: number, color: string) => {
      if (!o.errorBar) return;
      tmpColor.set(color);
      const { dx, dy } = o.errorBar;
      if (dx > 0) {
        ebPts.push(x - dx, y, z, x + dx, y, z);
        ebCols.push(tmpColor.r, tmpColor.g, tmpColor.b, tmpColor.r, tmpColor.g, tmpColor.b);
      }
      if (dy > 0) {
        ebPts.push(x, y - dy, z, x, y + dy, z);
        ebCols.push(tmpColor.r, tmpColor.g, tmpColor.b, tmpColor.r, tmpColor.g, tmpColor.b);
      }
    };

    OBJECTS.forEach((o: any) => {
      const color = DOMAIN_COLOR.get(o.domainId) || '#0369a1';
      const zRaw = zMode === 'tau' ? o.coordsMeta?.tau : o.coordsMeta?.t;
      const hasZ = typeof zRaw === 'number';
      const pos: [number, number, number] = [o.coords[0], o.coords[1], hasZ ? zRaw : zMin];

      const mat = new THREE.MeshBasicMaterial({ color, transparent: !hasZ, opacity: hasZ ? 1 : 0.25 });
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.32, 12, 12), mat);
      mesh.position.set(...pos);
      mesh.userData = { type: 'object', data: o, baseR: 0.32 };
      const tag = makeTag(o);
      mesh.add(tag);
      objectsGroup.add(mesh);
      meshMap.set(o.id, mesh);
      allMeshes.push(mesh);
      labelEntries.push({ mesh, label: tag });
      addErrorBars(o, ...pos, color);
    });

    // 误差棒（单次绘制）
    const ebGeo = new THREE.BufferGeometry();
    ebGeo.setAttribute('position', new THREE.Float32BufferAttribute(ebPts, 3));
    ebGeo.setAttribute('color', new THREE.Float32BufferAttribute(ebCols, 3));
    objectsGroup.add(new THREE.LineSegments(ebGeo, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.55 })));

    // ---------- 研究节点（静态八面体） + legs 直线 ----------
    const legPts: number[] = [];
    RESEARCH_NODES.forEach((n: any) => {
      const color = DOMAIN_COLOR.get(n.domainId) || '#7c3aed';
      const zRaw = zMode === 'tau' ? n.coordsMeta?.tau : n.coordsMeta?.t;
      const hasZ = typeof zRaw === 'number';
      const pos: [number, number, number] = [n.coords[0], n.coords[1], hasZ ? zRaw : zMin];

      const mat = new THREE.MeshBasicMaterial({ color, transparent: !hasZ, opacity: hasZ ? 1 : 0.25 });
      const mesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.5), mat);
      mesh.position.set(...pos);
      mesh.userData = { type: 'node', data: n, baseR: 0.5 };
      const tag = makeTag(n);
      mesh.add(tag);
      nodesGroup.add(mesh);
      meshMap.set(n.id, mesh);
      allMeshes.push(mesh);
      labelEntries.push({ mesh, label: tag });

      (n.legs || []).forEach((targetId: string) => {
        const target = meshMap.get(targetId);
        if (target) {
          const tp: [number, number, number] = [target.position.x, target.position.y, target.position.z];
          legPts.push(...pos, ...tp);
          addLink(n.id, pos, tp, targetId);
          addLink(targetId, pos, tp, n.id);
        }
      });
    });
    if (legPts.length) {
      const legGeo = new THREE.BufferGeometry();
      legGeo.setAttribute('position', new THREE.Float32BufferAttribute(legPts, 3));
      nodesGroup.add(new THREE.LineSegments(legGeo, new THREE.LineBasicMaterial({ color: P.leg, transparent: true, opacity: 0.35 })));
    }

    // ---------- 关系连线（静态直线，按类型着色） ----------
    const REL_COLOR: Record<string, string> = { 'rg-flow': '#db2777', duality: '#7c3aed', 'model-correspondence': '#0284c7' };
    RELATION_LINKS.forEach((rel: any) => {
      const a = meshMap.get(rel.source);
      const b = meshMap.get(rel.target);
      if (!a || !b) return;
      const pa: [number, number, number] = [a.position.x, a.position.y, a.position.z];
      const pb: [number, number, number] = [b.position.x, b.position.y, b.position.z];
      addLink(rel.source, pa, pb, rel.target);
      addLink(rel.target, pa, pb, rel.source);
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute([...pa, ...pb], 3));
      const line = new THREE.Line(geo, new THREE.LineBasicMaterial({
        color: REL_COLOR[rel.type] || '#64748b', transparent: true, opacity: 0.7
      }));
      line.userData = { type: 'relation', data: rel };
      relationsGroup.add(line);
    });

    // ---------- 交互：OrbitControls + 悬停读数 + 点击（区分拖拽） ----------
    const domElem = containerRef.current;
    const raycaster = new THREE.Raycaster();
    const mouseNDC = new THREE.Vector2();
    let controlsDragging = false;
    controls.addEventListener('start', () => { controlsDragging = true; if (tooltipRef.current) tooltipRef.current.style.display = 'none'; });
    controls.addEventListener('end', () => { controlsDragging = false; });

    const pickMesh = (e: MouseEvent): THREE.Mesh | null => {
      const rect = domElem.getBoundingClientRect();
      mouseNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouseNDC, camera);
      const hits = raycaster.intersectObjects([...objectsGroup.children, ...nodesGroup.children], false);
      const hit = hits.find(h => h.object.userData?.data);
      return (hit?.object as THREE.Mesh) || null;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (controlsDragging) return;
      const hit = pickMesh(e);
      hoveredIdRef.current = hit ? hit.userData.data.id : null;
      const tip = tooltipRef.current;
      if (!tip) return;
      if (hit) {
        const d = hit.userData.data;
        const zv = zMode === 'tau' ? d.coordsMeta?.tau : d.coordsMeta?.t;
        const rect = domElem.getBoundingClientRect();
        tip.style.display = 'block';
        tip.style.left = `${e.clientX - rect.left + 14}px`;
        tip.style.top = `${e.clientY - rect.top + 10}px`;
        tip.innerHTML = `<b>${d.label || d.title || d.name || d.id}</b><br>` +
          `L: 10^${d.coords[0].toFixed(1)} m · E: 10^${d.coords[1].toFixed(1)} eV` +
          (typeof zv === 'number' ? `<br>${zConf.hint}: 10^${zv.toFixed(1)} ${zMode === 'tau' ? 's' : 'K'}` : '<br><i>无 Z 数据（底面投影）</i>') +
          (d.source ? `<br>来源: ${d.source}` : '');
      } else {
        tip.style.display = 'none';
      }
    };

    // 点击选择：位移 < 5px 才算点击（避免拖拽后误触发）
    let downPos = { x: 0, y: 0 };
    const onPointerDown = (e: MouseEvent) => { downPos = { x: e.clientX, y: e.clientY }; };
    const onClick = (e: MouseEvent) => {
      if (Math.hypot(e.clientX - downPos.x, e.clientY - downPos.y) > 5) return;
      const hit = pickMesh(e);
      if (hit) onSelectItem(hit.userData.data, hit.userData.type);
    };

    domElem.addEventListener('mousemove', onMouseMove);
    domElem.addEventListener('mousedown', onPointerDown);
    domElem.addEventListener('click', onClick);

    const worldPos = new THREE.Vector3();
    // 常屏尺寸钳制：近处点标记的世界尺寸随距离线性收缩（角尺寸封顶），远处保持基础尺寸
    const SCREEN_CAP = 0.014; // 角尺寸上限（弧度），约 1.5% 屏高
    let rafId = 0;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      controls.update();
      // 点标记尺寸：worldR = min(baseR, dist × SCREEN_CAP)，悬停/选中/邻居再乘高亮因子
      for (const m of allMeshes) {
        m.getWorldPosition(worldPos);
        const d = worldPos.distanceTo(camera.position);
        const base = m.userData.baseR as number;
        let s = Math.max(0.12, Math.min(1, (d * SCREEN_CAP) / base));
        const id = m.userData.data.id;
        if (id === selectedIdRef.current) s *= 2.0;
        else if (id === hoveredIdRef.current) s *= 1.8;
        else if (neighborIdRef.current.has(id)) s *= 1.45;
        m.scale.setScalar(s);
      }
      // 标签 LOD：自动模式下只显示离相机较近的点
      const mode = labelModeRef.current;
      for (const { mesh, label } of labelEntries) {
        if (mode === 'off') { label.visible = false; continue; }
        if (mode === 'all') { label.visible = true; continue; }
        mesh.getWorldPosition(worldPos);
        label.visible = worldPos.distanceTo(camera.position) < LABEL_LOD_DIST;
      }
      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      labelRenderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      controls.dispose();
      domElem.removeEventListener('mousemove', onMouseMove);
      domElem.removeEventListener('mousedown', onPointerDown);
      domElem.removeEventListener('click', onClick);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (domElem.contains(renderer.domElement)) domElem.removeChild(renderer.domElement);
      if (domElem.contains(labelRenderer.domElement)) domElem.removeChild(labelRenderer.domElement);
    };
  }, [zMode, theme]);

  // 图层开关
  useEffect(() => {
    const g = groupsRef.current;
    if (g.objects) g.objects.visible = layerVisibility.objects;
    if (g.nodes) g.nodes.visible = layerVisibility.nodes;
    if (g.relations) g.relations.visible = layerVisibility.relations;
  }, [layerVisibility, zMode, theme]);

  // 选中高亮：相关 legs / relations 连线加粗提亮，邻居点放大（点尺寸在帧循环统一计算）
  useEffect(() => {
    selectedIdRef.current = selectedItem?.id ?? null;
    const g = highlightGroupRef.current;
    if (!g) return;
    // 清空旧高亮
    while (g.children.length) {
      const child = g.children.pop()!;
      (child as THREE.LineSegments).geometry?.dispose();
      ((child as THREE.LineSegments).material as THREE.Material)?.dispose();
    }
    const neighbors = new Set<string>();
    if (selectedItem?.id) {
      const entries = linksRef.current.get(selectedItem.id) || [];
      if (entries.length) {
        const pts: number[] = [];
        entries.forEach(({ a, b, other }) => {
          pts.push(...a, ...b);
          neighbors.add(other);
        });
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
        const lines = new THREE.LineSegments(geo, new THREE.LineBasicMaterial({
          color: isDark ? '#fbbf24' : '#dc2626', transparent: true, opacity: 0.95, depthTest: false
        }));
        g.add(lines);
      }
    }
    neighborIdRef.current = neighbors;
  }, [selectedItem, zMode, theme]);

  const resetView = () => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;
    camera.position.set(62, 38, 86);
    controls.target.set(0, 0, 0);
    controls.update();
  };

  const btnCls = (active: boolean) =>
    `px-2 py-1 rounded border transition-all ${
      active
        ? 'bg-emerald-600 text-white border-emerald-500 font-bold'
        : isDark
          ? 'bg-slate-800/80 text-slate-300 border-slate-600 hover:bg-slate-700'
          : 'bg-white/80 text-slate-600 border-slate-300 hover:bg-slate-100'
    }`;

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* 悬停读数 */}
      <div
        ref={tooltipRef}
        className={`absolute z-30 hidden pointer-events-none px-2.5 py-1.5 rounded border text-[11px] font-mono leading-relaxed shadow-md ${
          isDark ? 'bg-slate-800/95 border-slate-600 text-slate-200' : 'bg-white/95 border-slate-300 text-slate-800'
        }`}
      />

      {/* 学科图例 */}
      <div className={`absolute top-16 right-6 px-2.5 py-2 rounded border text-[10px] font-mono leading-relaxed ${
        isDark ? 'bg-slate-900/80 border-slate-700 text-slate-300' : 'bg-white/85 border-slate-300 text-slate-700'
      }`}>
        {ACADEMIC_DOMAINS.map(d => (
          <div key={d.id} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: d.color }} />
            <span>{d.code} {d.name.split('(')[0].replace(/^[IVX]+\.\s*/, '')}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5 mt-1 pt-1 border-t border-slate-300 dark:border-slate-600">
          <span className="w-2 h-2 rotate-45 inline-block" style={{ background: '#7c3aed' }} />
          <span>研究课题节点</span>
        </div>
      </div>

      {/* 右下控制组：重置视角 + 标签 + Z 轴 */}
      <div className="absolute bottom-4 right-6 flex items-center gap-3 text-xs font-mono">
        <button onClick={resetView} className={btnCls(false)} title="重置相机视角">
          ⟲ 重置视角
        </button>
        <span className="flex items-center gap-1">
          <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>标签:</span>
          {([['auto', '自动'], ['all', '全部'], ['off', '关闭']] as [LabelMode, string][]).map(([m, t]) => (
            <button key={m} onClick={() => setLabelMode(m)} className={btnCls(labelMode === m)}>{t}</button>
          ))}
        </span>
        <span className="flex items-center gap-1">
          <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Z 轴:</span>
          {(['tau', 't'] as ZMode[]).map(m => (
            <button key={m} onClick={() => setZMode(m)} className={btnCls(zMode === m)}>
              {Z_CONF[m].hint}
            </button>
          ))}
        </span>
      </div>

      <div className={`absolute bottom-4 left-4 pointer-events-none px-3 py-1.5 rounded-lg text-xs font-mono border ${
        isDark ? 'bg-slate-900/70 border-slate-700 text-slate-300' : 'bg-white/70 border-slate-300 text-slate-600'
      }`}>
        左键旋转 | 右键平移 | 滚轮缩放至光标 | 悬停读数 | 点击看详情 | 半透明点 = 无 Z 数据
      </div>
    </div>
  );
};

export default Canvas3D;
