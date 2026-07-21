import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ACADEMIC_DOMAINS, ACADEMIC_OBJECTS, ACADEMIC_RESEARCH_NODES, ACADEMIC_RELATIONS, FUNDAMENTAL_FORCES } from '../data/physicsData';
import { getKatexSprite, setSpriteLoadCallback } from '../utils/katexSprite';
import { ZoomIn, ZoomOut, RefreshCw, Layers, Sliders, Target, Crop } from 'lucide-react';

export default function Canvas2D({
  activeDomain,
  layerVisibility,
  selectedItem,
  onSelectItem,
  spatialRange,
  energyRange,
  fitTrigger
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Viewport State
  const [transform, setTransform] = useState({ scale: 1.0, offsetX: 70, offsetY: 30 });
  const [hoveredItem, setHoveredItem] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Matplotlib-style Box Zoom Mode State
  const [isBoxZoomMode, setIsBoxZoomMode] = useState(false);
  const [boxSelection, setBoxSelection] = useState(null);

  // Refs for tracking drag and gestures
  const isDraggingRef = useRef(false);
  const startDragRef = useRef({ x: 0, y: 0 });
  const touchStateRef = useRef({
    prevDist: 0,
    prevCenter: { x: 0, y: 0 }
  });

  // Map Physical Log Coordinates [-36..27], [-5..29] to Raw World Canvas Coordinates (unscaled)
  const getWorldCoords = useCallback((logL, logE, width, height) => {
    const margin = 70;
    const plotW = width - margin * 2;
    const plotH = height - margin * 2;

    const xNorm = (logL - (-36)) / (27 - (-36)); // [-36, 27]
    const yNorm = (logE - (-5)) / (29 - (-5));   // [-5, 29]

    const x = margin + xNorm * plotW;
    const y = height - margin - yNorm * plotH; // Inverted Y

    return { x, y };
  }, []);

  // Map World Coords to Screen Pixel Coords
  const toScreenCoords = useCallback((worldX, worldY) => {
    return {
      x: worldX * transform.scale + transform.offsetX,
      y: worldY * transform.scale + transform.offsetY
    };
  }, [transform]);

  // Map Screen Pixel Coords back to World Coordinates
  const toWorldCoords = useCallback((screenX, screenY) => {
    return {
      x: (screenX - transform.offsetX) / transform.scale,
      y: (screenY - transform.offsetY) / transform.scale
    };
  }, [transform]);

  // Fit Viewport to Selected Scale Range Bounds
  const fitViewToSelection = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = canvas.width / window.devicePixelRatio;
    const h = canvas.height / window.devicePixelRatio;

    const [xMin, xMax] = spatialRange;
    const [yMin, yMax] = energyRange;

    const wMin = getWorldCoords(xMin, yMax, w, h);
    const wMax = getWorldCoords(xMax, yMin, w, h);

    const boxW = Math.abs(wMax.x - wMin.x);
    const boxH = Math.abs(wMax.y - wMin.y);

    if (boxW === 0 || boxH === 0) return;

    const targetScale = Math.max(0.6, Math.min(25.0, Math.min((w - 140) / boxW, (h - 100) / boxH)));

    const centerWorldX = (wMin.x + wMax.x) / 2;
    const centerWorldY = (wMin.y + wMax.y) / 2;

    const newOffsetX = w / 2 - centerWorldX * targetScale;
    const newOffsetY = h / 2 - centerWorldY * targetScale;

    setTransform({
      scale: targetScale,
      offsetX: newOffsetX,
      offsetY: newOffsetY
    });
  }, [spatialRange, energyRange, getWorldCoords]);

  // Trigger fit view when fitTrigger updates
  useEffect(() => {
    if (fitTrigger > 0) {
      fitViewToSelection();
    }
  }, [fitTrigger, fitViewToSelection]);

  // Check if an object falls within scale sliders
  const isWithinScale = (logL, logE) => {
    return (
      logL >= spatialRange[0] && logL <= spatialRange[1] &&
      logE >= energyRange[0] && logE <= energyRange[1]
    );
  };

  // Main Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const render = () => {
      if (!containerRef.current || !canvasRef.current) return;
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;

      ctx.save();
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      ctx.clearRect(0, 0, w, h);

      // --- Paper Background ---
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);

      // --- Draw Grid Lines & Subdivisions ---
      ctx.strokeStyle = '#f1f5f9';
      ctx.lineWidth = 1;

      // Vertical Grid lines (Spatial Scale logL)
      for (let logL = -35; logL <= 25; logL += 5) {
        const wP = getWorldCoords(logL, 0, w, h);
        const sP = toScreenCoords(wP.x, wP.y);

        ctx.beginPath();
        ctx.moveTo(sP.x, 20);
        ctx.lineTo(sP.x, h - 45);
        ctx.stroke();

        ctx.fillStyle = '#64748b';
        ctx.font = '11px "STIX Two Text", "Times New Roman", serif';
        ctx.textAlign = 'center';
        ctx.fillText(`10^${logL} m`, sP.x, h - 30);
      }

      // Horizontal Grid lines (Energy Scale logE)
      for (let logE = -4; logE <= 28; logE += 4) {
        const wP = getWorldCoords(0, logE, w, h);
        const sP = toScreenCoords(wP.x, wP.y);

        ctx.beginPath();
        ctx.moveTo(60, sP.y);
        ctx.lineTo(w - 20, sP.y);
        ctx.stroke();

        ctx.fillStyle = '#64748b';
        ctx.font = '11px "STIX Two Text", "Times New Roman", serif';
        ctx.textAlign = 'right';
        let unitStr = logE >= 9 ? `10^${logE - 9} GeV` : logE >= 6 ? `10^${logE - 6} MeV` : logE >= 3 ? `10^${logE - 3} keV` : `10^${logE} eV`;
        ctx.fillText(unitStr, 54, sP.y + 4);
      }

      // --- Main Axes Lines ---
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(60, h - 45);
      ctx.lineTo(w - 20, h - 45);
      ctx.moveTo(60, h - 45);
      ctx.lineTo(60, 20);
      ctx.stroke();

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 12px "STIX Two Text", "Times New Roman", serif';
      ctx.textAlign = 'center';
      ctx.fillText('Spatial Length Scale log₁₀(L / m) →', w / 2, h - 10);

      ctx.save();
      ctx.translate(18, h / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('Energy Scale log₁₀(E / eV) →', 0, 0);
      ctx.restore();

      // --- Quantum Uncertainty Bound Line: E * L ~ \hbar c ---
      ctx.strokeStyle = '#cbd5e1';
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      const wP1 = getWorldCoords(-35, 8.3 - (-35), w, h);
      const wP2 = getWorldCoords(25, 8.3 - (25), w, h);
      const sP1 = toScreenCoords(wP1.x, wP1.y);
      const sP2 = toScreenCoords(wP2.x, wP2.y);
      ctx.moveTo(sP1.x, sP1.y);
      ctx.lineTo(sP2.x, sP2.y);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'italic 11px "STIX Two Text", serif';
      ctx.fillText('Relativistic Quantum Bound: E · L ~ ℏc', sP1.x + 110, sP1.y + 14);

      // --- 2D Fundamental Interaction Field Heatmaps (Exact QFT / QED / QCD / EW Physics Buffer) ---
      if (layerVisibility.heatmaps !== false) {
        ctx.save();

        // Offscreen grid resolution
        const gridW = 200;
        const gridH = 120;
        const offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = gridW;
        offscreenCanvas.height = gridH;
        const offCtx = offscreenCanvas.getContext('2d');
        const imgData = offCtx.createImageData(gridW, gridH);
        const buf = imgData.data;

        // Physical bounds
        const xMin = -36, xMax = 27;
        const yMin = -5, yMax = 29;

        for (let j = 0; j < gridH; j++) {
          const logE = yMax - (j / (gridH - 1)) * (yMax - yMin);
          for (let i = 0; i < gridW; i++) {
            const logL = xMin + (i / (gridW - 1)) * (xMax - xMin);

            // 1. Quantum Gravity I_grav (Planck scale y >= 28 + Macroscopic Mass Accumulation for x > -3)
            const alpha_G = Math.min(1.0, Math.pow(10.0, 2.0 * (logE - 28.0)));
            const dist_quantum = Math.abs(logL + logE + 6.705);
            const I_quantum_grav = alpha_G * Math.exp(-0.15 * dist_quantum);

            const macro_grav_spatial = logL > -3.0 ? Math.min(1.0, (logL + 3.0) / 20.0) : 0.0;
            const macro_grav_energy = Math.exp(-0.02 * Math.pow(logE - 2.0, 2));
            const I_macro_grav = 0.85 * macro_grav_spatial * macro_grav_energy;
            const I_grav = Math.max(I_quantum_grav, I_macro_grav);

            // 2. QED Electromagnetic I_EM (Mesoscopic/Atomic Peak x in [-11, -3], Screened at x > 0 due to Charge Neutrality)
            const alpha_EM = 1.0 / (137.0 - (1.0 / (3.0 * Math.PI)) * Math.max(0, logE - 5.7));
            const spatial_EM = Math.exp(-0.04 * Math.pow(logL - (-7.0), 2)); // Centered at nanometer scale
            const energy_EM = Math.exp(-0.05 * Math.pow(logE - 1.0, 2));   // eV scale (chemical/atomic binding)
            const screening_EM = logL > 0 ? Math.exp(-0.3 * (logL - 0)) : 1.0;
            const I_EM = (alpha_EM * 137.0) * spatial_EM * energy_EM * screening_EM;

            // 3. Strong QCD I_QCD (Confinement peak at x = -14.8, y = 8.3 & Asymptotic Freedom)
            const alpha_s = logE > 8.3 ? 1.0 / (1.0 + 0.8 * (logE - 8.3)) : 1.0;
            const spatial_QCD = logL <= -14.8 ? Math.exp(-0.3 * Math.pow(logL - (-14.8), 2)) : Math.exp(-2.5 * (logL - (-14.8)));
            const energy_QCD = Math.exp(-0.2 * Math.pow(logE - 8.3, 2));
            const I_QCD = alpha_s * spatial_QCD * energy_QCD;

            // 4. Weak EW I_Weak (EW Unification peak at x = -17.6, y = 11.4 & W/Z cutoff)
            const fermi_suppression = logE < 10.9 ? Math.pow(10.0, 1.5 * (logE - 10.9)) : 1.0;
            const spatial_Weak = logL <= -17.6 ? Math.exp(-0.4 * Math.pow(logL - (-17.6), 2)) : Math.exp(-4.0 * (logL - (-17.6)));
            const energy_Weak = Math.exp(-0.15 * Math.pow(logE - 11.4, 2));
            const I_Weak = fermi_suppression * spatial_Weak * energy_Weak;

            // RGBA Field Mixing (Matching Python Colormaps: QG=Amber, QED=Cyan, QCD=Red, Weak=Purple)
            const r = Math.min(255, Math.round(I_QCD * 220 + I_grav * 217 + I_Weak * 147));
            const g = Math.min(255, Math.round(I_EM * 132 + I_grav * 119 + I_Weak * 51));
            const b = Math.min(255, Math.round(I_Weak * 234 + I_EM * 199));
            const alpha = Math.min(0.38, I_grav * 0.35 + I_EM * 0.22 + I_QCD * 0.38 + I_Weak * 0.40);

            const idx = (j * gridW + i) * 4;
            buf[idx + 0] = r;
            buf[idx + 1] = g;
            buf[idx + 2] = b;
            buf[idx + 3] = Math.round(alpha * 255);
          }
        }

        offCtx.putImageData(imgData, 0, 0);

        // Map offscreen physics field canvas to current screen viewport
        const wMinWorld = getWorldCoords(xMin, yMax, w, h);
        const wMaxWorld = getWorldCoords(xMax, yMin, w, h);

        const sMin = toScreenCoords(wMinWorld.x, wMinWorld.y);
        const sMax = toScreenCoords(wMaxWorld.x, wMaxWorld.y);

        const screenPlotW = Math.abs(sMax.x - sMin.x);
        const screenPlotH = Math.abs(sMax.y - sMin.y);

        ctx.drawImage(offscreenCanvas, sMin.x, sMin.y, screenPlotW, screenPlotH);
        ctx.restore();
      }

      // --- Fundamental Forces Range Spans (Dedicated Physics Visualizations) ---
      if (layerVisibility.forces !== false) {
        FUNDAMENTAL_FORCES.forEach(force => {
        const wStart = getWorldCoords(force.rangeCoords.xStart, force.rangeCoords.y, w, h);
        const wEnd = getWorldCoords(force.rangeCoords.xEnd, force.rangeCoords.y, w, h);
        const sStart = toScreenCoords(wStart.x, wStart.y);
        const sEnd = toScreenCoords(wEnd.x, wEnd.y);
        const bandWidth = Math.abs(sEnd.x - sStart.x);

        if (force.id === 'force-gravity') {
          // 1. Gravitational Field (GR Long-range Monochromatic Amber/Bronze Band)
          const grad = ctx.createLinearGradient(0, sStart.y - 8, 0, sStart.y + 8);
          grad.addColorStop(0, '#d9770600');
          grad.addColorStop(0.5, '#d9770635');
          grad.addColorStop(1, '#d9770600');

          ctx.fillStyle = grad;
          ctx.fillRect(sStart.x, sStart.y - 8, bandWidth, 16);

          ctx.strokeStyle = '#b45309';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(sStart.x, sStart.y);
          ctx.lineTo(sEnd.x, sEnd.y);
          ctx.stroke();

          ctx.fillStyle = '#b45309';
          ctx.font = '600 11px "Inter", system-ui, -apple-system, sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText('引力 (Gravity / GR)', sStart.x + 8, sStart.y - 6);
        } else if (force.id === 'force-em') {
          // 2. QED Electromagnetic Field (Monochromatic Electric Cyan Band)
          const grad = ctx.createLinearGradient(0, sStart.y - 7, 0, sStart.y + 7);
          grad.addColorStop(0, '#0284c700');
          grad.addColorStop(0.5, '#0284c740');
          grad.addColorStop(1, '#0284c700');

          ctx.fillStyle = grad;
          ctx.fillRect(sStart.x, sStart.y - 7, bandWidth, 14);

          ctx.strokeStyle = '#0284c7';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(sStart.x, sStart.y);
          ctx.lineTo(sEnd.x, sEnd.y);
          ctx.stroke();

          ctx.fillStyle = '#0369a1';
          ctx.font = '600 11px "Inter", system-ui, -apple-system, sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText('电磁 (EM / QED)', sStart.x + 8, sStart.y - 6);
        } else if (force.id === 'force-strong') {
          // 3. QCD Strong Interaction: SU(3) RGB Color Flux Tubes + Confinement Cutoff Barrier
          const rgbColors = ['#ef4444', '#10b981', '#3b82f6']; // Red, Green, Blue SU(3) color charges
          const offsets = [-3.5, 0, 3.5];

          // Draw RGB Color Charge Flux Strands
          rgbColors.forEach((color, idx) => {
            const yOffset = offsets[idx];
            ctx.strokeStyle = color + 'dd';
            ctx.lineWidth = 1.5;
            ctx.beginPath();

            const steps = 40;
            for (let i = 0; i <= steps; i++) {
              const t = i / steps;
              const currX = sStart.x + t * bandWidth;
              const spread = 0.5 + t * 1.2;
              const currY = sStart.y + yOffset * spread + Math.sin(t * Math.PI * 4 + idx) * 1.2;
              if (i === 0) ctx.moveTo(currX, currY);
              else ctx.lineTo(currX, currY);
            }
            ctx.stroke();
          });

          // Draw QCD Confinement Barrier
          ctx.strokeStyle = '#dc2626';
          ctx.lineWidth = 1.8;
          ctx.setLineDash([3, 2]);
          ctx.beginPath();
          ctx.moveTo(sEnd.x, sEnd.y - 12);
          ctx.lineTo(sEnd.x, sEnd.y + 12);
          ctx.stroke();
          ctx.setLineDash([]);

          // Yukawa Pion Nuclear Force Tail extending past confinement wall
          ctx.strokeStyle = '#c2410c99';
          ctx.lineWidth = 1.2;
          ctx.setLineDash([2, 2]);
          ctx.beginPath();
          ctx.moveTo(sEnd.x, sEnd.y);
          ctx.lineTo(sEnd.x + 40, sEnd.y);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.fillStyle = '#dc2626';
          ctx.font = '600 11px "Inter", system-ui, -apple-system, sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText('强相互作用 (Strong / QCD)', sStart.x + 4, sStart.y - 10);
        } else if (force.id === 'force-weak') {
          // 4. Electroweak Weak Interaction: Sinusoidal Wave Packet & Exponential Decay
          ctx.strokeStyle = '#9333ea';
          ctx.lineWidth = 1.6;
          ctx.beginPath();

          const steps = 50;
          for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const currX = sStart.x + t * bandWidth;
            const amp = 5.5 * Math.exp(-t * 2.8);
            const currY = sStart.y + Math.sin(t * Math.PI * 8) * amp;

            if (i === 0) ctx.moveTo(currX, currY);
            else ctx.lineTo(currX, currY);
          }
          ctx.stroke();

          // Short-range W/Z Cutoff Cap
          ctx.strokeStyle = '#9333ea';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(sEnd.x, sEnd.y - 8);
          ctx.lineTo(sEnd.x, sEnd.y + 8);
          ctx.stroke();

          ctx.fillStyle = '#7e22ce';
          ctx.font = '600 11px "Inter", system-ui, -apple-system, sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText('弱相互作用 (Weak / EW)', sStart.x + 4, sStart.y - 10);
        }
      });
      }

      // --- Domain Background Shading (Section Clouds) ---
      if (layerVisibility.clouds) {
        ACADEMIC_DOMAINS.forEach(d => {
          if (activeDomain !== 'all' && activeDomain !== d.id) return;

          const wMin = getWorldCoords(d.bounds.xMin, d.bounds.yMax, w, h);
          const wMax = getWorldCoords(d.bounds.xMax, d.bounds.yMin, w, h);
          const sMin = toScreenCoords(wMin.x, wMin.y);
          const sMax = toScreenCoords(wMax.x, wMax.y);

          const rectW = Math.abs(sMax.x - sMin.x);
          const rectH = Math.abs(sMax.y - sMin.y);

          ctx.fillStyle = d.color + '0d';
          ctx.strokeStyle = d.color + '40';
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 3]);
          ctx.fillRect(sMin.x, sMin.y, rectW, rectH);
          ctx.strokeRect(sMin.x, sMin.y, rectW, rectH);
          ctx.setLineDash([]);

          ctx.fillStyle = d.color;
          ctx.font = 'bold 11px "STIX Two Text", serif';
          ctx.textAlign = 'left';
          ctx.fillText(`${d.code}: ${d.name.split(' ')[1]}`, sMin.x + 8, sMin.y + 16);
        });
      }

      // --- Relations (RG Flow & Holographic Duality) ---
      if (layerVisibility.relations) {
        ACADEMIC_RELATIONS.forEach(rel => {
          const srcObj = ACADEMIC_OBJECTS.find(o => o.id === rel.source);
          const tgtObj = ACADEMIC_OBJECTS.find(o => o.id === rel.target);

          if (srcObj && tgtObj) {
            const wSrc = getWorldCoords(srcObj.coords.x, srcObj.coords.y, w, h);
            const wTgt = getWorldCoords(tgtObj.coords.x, tgtObj.coords.y, w, h);
            const sSrc = toScreenCoords(wSrc.x, wSrc.y);
            const sTgt = toScreenCoords(wTgt.x, wTgt.y);

            const isRelHovered = hoveredItem?.id === rel.id;
            const isRelSelected = selectedItem?.id === rel.id;

            let strokeColor = '#dc2626';
            if (rel.type === 'duality') strokeColor = '#7c3aed';
            if (rel.type === 'model-correspondence') strokeColor = '#0284c7';

            ctx.strokeStyle = isRelHovered || isRelSelected ? strokeColor : strokeColor + 'bb';
            ctx.lineWidth = isRelHovered || isRelSelected ? 2.5 : 1.5;
            ctx.beginPath();

            const midX = (sSrc.x + sTgt.x) / 2;
            const midY = (sSrc.y + sTgt.y) / 2 - 25;
            ctx.moveTo(sSrc.x, sSrc.y);
            ctx.quadraticCurveTo(midX, midY, sTgt.x, sTgt.y);
            ctx.stroke();

            const angle = Math.atan2(sTgt.y - midY, sTgt.x - midX);
            ctx.fillStyle = strokeColor;
            ctx.beginPath();
            ctx.moveTo(sTgt.x, sTgt.y);
            ctx.lineTo(sTgt.x - 8 * Math.cos(angle - Math.PI / 6), sTgt.y - 8 * Math.sin(angle - Math.PI / 6));
            ctx.lineTo(sTgt.x - 8 * Math.cos(angle + Math.PI / 6), sTgt.y - 8 * Math.sin(angle + Math.PI / 6));
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = strokeColor;
            ctx.font = isRelHovered ? 'bold 11px "STIX Two Text", serif' : '10px "STIX Two Text", serif';
            ctx.textAlign = 'center';
            ctx.fillText(rel.type.toUpperCase(), midX, midY - 6);
          }
        });
      }

// Helper to split "中文标题 (English Subtitle)" into two lines
const parseBilingualTitle = (title) => {
  if (!title) return { zh: '', en: '' };
  const idx = title.indexOf('(');
  if (idx !== -1 && title.endsWith(')')) {
    const zh = title.slice(0, idx).trim();
    const en = title.slice(idx + 1, -1).trim();
    return { zh, en };
  }
  return { zh: title, en: '' };
};

// --- Pure Text Multi-Leg Theoretical & Method Nodes (Bilingual Line-Split, No Card Background) ---
      if (layerVisibility.nodes) {
        ACADEMIC_RESEARCH_NODES.forEach(node => {
          if (!isWithinScale(node.coords.x, node.coords.y)) return;

          const wNode = getWorldCoords(node.coords.x, node.coords.y, w, h);
          const sNode = toScreenCoords(wNode.x, wNode.y);

          const isNodeHovered = hoveredItem?.id === node.id;
          const isNodeSelected = selectedItem?.id === node.id;

          // Pick colors based on node type
          let mainColor = '#0369a1';
          let subColor = '#0c4a6e';
          let connectionColor = '#3b82f6';

          if (node.type === 'theory') {
            mainColor = isNodeSelected ? '#9333ea' : isNodeHovered ? '#a855f7' : '#7e22ce';
            subColor = isNodeSelected ? '#a855f7' : isNodeHovered ? '#c084fc' : '#6b21a8';
            connectionColor = '#8b5cf6';
          } else if (node.type === 'method') {
            mainColor = isNodeSelected ? '#059669' : isNodeHovered ? '#10b981' : '#047857';
            subColor = isNodeSelected ? '#10b981' : isNodeHovered ? '#34d399' : '#065f46';
            connectionColor = '#10b981';
          } else {
            mainColor = isNodeSelected ? '#0284c7' : isNodeHovered ? '#38bdf8' : '#0369a1';
            subColor = isNodeSelected ? '#38bdf8' : isNodeHovered ? '#7dd3fc' : '#0c4a6e';
            connectionColor = '#3b82f6';
          }

          // 1. Multi-Leg Curved Connections to Target Physical Objects/States
          if (node.legs) {
            node.legs.forEach(legId => {
              const targetObj = ACADEMIC_OBJECTS.find(o => o.id === legId);
              if (targetObj) {
                const wObj = getWorldCoords(targetObj.coords.x, targetObj.coords.y, w, h);
                const sObj = toScreenCoords(wObj.x, wObj.y);

                const midX = (sNode.x + sObj.x) / 2;
                const midY = (sNode.y + sObj.y) / 2 - 12;

                ctx.strokeStyle = isNodeHovered || isNodeSelected ? connectionColor : '#94a3b866';
                ctx.lineWidth = isNodeHovered || isNodeSelected ? 2.0 : 1.0;
                ctx.beginPath();
                ctx.moveTo(sNode.x, sNode.y);
                ctx.quadraticCurveTo(midX, midY, sObj.x, sObj.y);
                ctx.stroke();
              }
            });
          }

          // 2. Pure Text Dual-Line Rendering (Line 1: Chinese, Line 2: English)
          const { zh, en } = parseBilingualTitle(node.title || node.name);

          ctx.save();
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.lineJoin = 'round';

          // White halo outline for high contrast on paper & heatmaps
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
          ctx.lineWidth = 3.5;

          // Line 1: Chinese Title
          ctx.font = isNodeHovered || isNodeSelected
            ? '700 12px "Inter", "PingFang SC", "STHeiti", sans-serif'
            : '600 11.5px "Inter", "PingFang SC", "STHeiti", sans-serif';

          const line1Y = en ? sNode.y - 7 : sNode.y;
          ctx.strokeText(zh, sNode.x, line1Y);
          ctx.fillStyle = mainColor;
          ctx.fillText(zh, sNode.x, line1Y);

          // Line 2: English Subtitle (if present)
          if (en) {
            const line2Y = sNode.y + 7;
            ctx.font = isNodeHovered || isNodeSelected
              ? '600 10px "Inter", serif'
              : '500 9.5px "Inter", serif';
            ctx.strokeText(en, sNode.x, line2Y);
            ctx.fillStyle = subColor;
            ctx.fillText(en, sNode.x, line2Y);
          }

          // Central Anchor Node Dot
          ctx.fillStyle = mainColor;
          ctx.beginPath();
          ctx.arc(sNode.x, sNode.y, isNodeHovered || isNodeSelected ? 3.5 : 2.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        });
      }

      // --- Physical Objects with PDG Error Bars & Tight KaTeX Labels ---
      if (layerVisibility.objects) {
        ACADEMIC_OBJECTS.forEach(obj => {
          if (!isWithinScale(obj.coords.x, obj.coords.y)) return;

          const wObj = getWorldCoords(obj.coords.x, obj.coords.y, w, h);
          const sObj = toScreenCoords(wObj.x, wObj.y);

          const isObjHovered = hoveredItem?.id === obj.id;
          const isObjSelected = selectedItem?.id === obj.id;

          // --- Particle Geometry Detection ---
          const isGaugeBoson = ['obj-photon', 'obj-gluon', 'obj-w-boson', 'obj-z-boson', 'obj-gut-boson'].includes(obj.id);
          const isScalarBoson = obj.id === 'obj-higgs';
          const isFermion = obj.type === 'fundamental' && !isGaugeBoson && !isScalarBoson;
          const isCompositeHadron = obj.type === 'composite' || obj.type === 'bound-state';
          const isPhaseOrAstro = obj.type === 'phase' || obj.type === 'astro-object' || obj.type === 'out-of-equilibrium' || obj.type === 'probe' || obj.type === 'quantum-material';

          const radius = isObjHovered || isObjSelected ? 7 : 5;
          const mainColor = isObjSelected ? '#dc2626' : isObjHovered ? '#2563eb' : (isGaugeBoson ? '#9333ea' : isScalarBoson ? '#0284c7' : '#1e3a8a');

          // --- Draw PDG Decay Width / Uncertainty Error Bars ---
          if (obj.errorBar) {
            const margin = 70;
            const plotW = w - margin * 2;
            const plotH = h - margin * 2;

            // X scale: 63 log units (-36 to 27), Y scale: 34 log units (-5 to 29)
            const ebX = obj.errorBar.dx * (plotW / 63) * transform.scale;
            const ebY = obj.errorBar.dy * (plotH / 34) * transform.scale;

            ctx.strokeStyle = isObjHovered || isObjSelected ? '#dc2626' : '#64748b';
            ctx.lineWidth = isObjHovered || isObjSelected ? 1.6 : 1.2;
            const rGap = radius + 2;

            // Render X Error Bar segments outside particle radius
            if (ebX > rGap) {
              ctx.beginPath();
              // Left
              ctx.moveTo(sObj.x - rGap, sObj.y);
              ctx.lineTo(sObj.x - ebX, sObj.y);
              ctx.moveTo(sObj.x - ebX, sObj.y - 3);
              ctx.lineTo(sObj.x - ebX, sObj.y + 3);
              // Right
              ctx.moveTo(sObj.x + rGap, sObj.y);
              ctx.lineTo(sObj.x + ebX, sObj.y);
              ctx.moveTo(sObj.x + ebX, sObj.y - 3);
              ctx.lineTo(sObj.x + ebX, sObj.y + 3);
              ctx.stroke();
            }

            // Render Y Error Bar segments outside particle radius
            if (ebY > rGap) {
              ctx.beginPath();
              // Top
              ctx.moveTo(sObj.x, sObj.y - rGap);
              ctx.lineTo(sObj.x, sObj.y - ebY);
              ctx.moveTo(sObj.x - 3, sObj.y - ebY);
              ctx.lineTo(sObj.x + 3, sObj.y - ebY);
              // Bottom
              ctx.moveTo(sObj.x, sObj.y + rGap);
              ctx.lineTo(sObj.x, sObj.y + ebY);
              ctx.moveTo(sObj.x - 3, sObj.y + ebY);
              ctx.lineTo(sObj.x + 3, sObj.y + ebY);
              ctx.stroke();
            }
          }

          // Hover / Selection Glow Halo
          if (isObjHovered || isObjSelected) {
            ctx.fillStyle = isObjSelected ? '#dc262633' : '#3b82f633';
            ctx.beginPath();
            ctx.arc(sObj.x, sObj.y, radius + 7, 0, Math.PI * 2);
            ctx.fill();
          }

          if (isGaugeBoson) {
            // 1. Vector Gauge Boson (Spin-1 Field Mediator): Pure Clean Hollow Circle (\circ)
            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = mainColor;
            ctx.lineWidth = 2.2;
            ctx.beginPath();
            ctx.arc(sObj.x, sObj.y, radius + 1, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
          } else if (isScalarBoson) {
            // 2. Scalar Higgs Boson (Spin-0 Symmetry Breaking VEV): Concentric Ring Halo
            ctx.strokeStyle = mainColor;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(sObj.x, sObj.y, radius + 3, 0, Math.PI * 2);
            ctx.stroke();

            ctx.fillStyle = mainColor;
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            ctx.arc(sObj.x, sObj.y, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
          } else if (isCompositeHadron) {
            // 3. Composite Hadron / Bound State: Dashed Boundary Concentric Circle
            ctx.strokeStyle = mainColor + '99';
            ctx.lineWidth = 1.2;
            ctx.setLineDash([3, 2]);
            ctx.beginPath();
            ctx.arc(sObj.x, sObj.y, radius + 3.5, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);

            ctx.fillStyle = mainColor;
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            ctx.arc(sObj.x, sObj.y, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
          } else if (isPhaseOrAstro) {
            // 4. Thermodynamic Phase / Astro Object: Rounded Square Badge (\blacksquare)
            const side = (radius + 1) * 2;
            ctx.fillStyle = mainColor;
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            ctx.roundRect(sObj.x - side / 2, sObj.y - side / 2, side, side, 2.5);
            ctx.fill();
            ctx.stroke();
          } else {
            // 5. Fundamental Spin-1/2 Fermion Matter Quanta: Solid Sphere (\bullet)
            ctx.fillStyle = mainColor;
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(sObj.x, sObj.y, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
          }

          // Tight, compact label offsets right next to particle symbols
          let labelOffsetX = radius + 4;
          let labelOffsetY = -10;
          if (obj.id === 'obj-z-boson') { labelOffsetX = -28; labelOffsetY = -14; }
          if (obj.id === 'obj-w-boson') { labelOffsetX = -28; labelOffsetY = 0; }
          if (obj.id === 'obj-higgs') { labelOffsetX = 9; labelOffsetY = -14; }
          if (obj.id === 'obj-top-quark') { labelOffsetX = 9; labelOffsetY = 2; }

          const katexSprite = getKatexSprite(obj.symbol, isObjSelected ? '#dc2626' : isObjHovered ? '#2563eb' : '#0f172a', 15);
          if (katexSprite && katexSprite.complete) {
            ctx.drawImage(katexSprite, sObj.x + labelOffsetX, sObj.y + labelOffsetY);
          }
        });
      }

      // --- Draw Matplotlib Style Rubber-band Selection Box ---
      if (boxSelection) {
        const bx = Math.min(boxSelection.startX, boxSelection.endX);
        const by = Math.min(boxSelection.startY, boxSelection.endY);
        const bw = Math.abs(boxSelection.endX - boxSelection.startX);
        const bh = Math.abs(boxSelection.endY - boxSelection.startY);

        ctx.fillStyle = 'rgba(2, 132, 199, 0.15)';
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 3]);

        ctx.fillRect(bx, by, bw, bh);
        ctx.strokeRect(bx, by, bw, bh);
        ctx.setLineDash([]);
      }

      ctx.restore();
    };

    setSpriteLoadCallback(render);

    const handleResize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      render();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [transform, activeDomain, layerVisibility, selectedItem, hoveredItem, spatialRange, energyRange, boxSelection, getWorldCoords, toScreenCoords]);

  // --- Mouse & Touch Gestures Handling ---

  const onMouseDown = (e) => {
    if (e.button !== 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    if (isBoxZoomMode) {
      setBoxSelection({ startX: clickX, startY: clickY, endX: clickX, endY: clickY });
    } else {
      isDraggingRef.current = true;
      startDragRef.current = { x: e.clientX - transform.offsetX, y: e.clientY - transform.offsetY };
    }
  };

  const onMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Matplotlib Box Selection Mode
    if (isBoxZoomMode && boxSelection) {
      setBoxSelection(prev => ({ ...prev, endX: mouseX, endY: mouseY }));
      return;
    }

    if (isDraggingRef.current) {
      setTransform(prev => ({
        ...prev,
        offsetX: e.clientX - startDragRef.current.x,
        offsetY: e.clientY - startDragRef.current.y
      }));
      return;
    }

    // Hover Detection in Screen Space
    const w = canvas.width / window.devicePixelRatio;
    const h = canvas.height / window.devicePixelRatio;

    let foundHover = null;

    for (let obj of ACADEMIC_OBJECTS) {
      if (!isWithinScale(obj.coords.x, obj.coords.y)) continue;
      const wObj = getWorldCoords(obj.coords.x, obj.coords.y, w, h);
      const sObj = toScreenCoords(wObj.x, wObj.y);
      const dist = Math.hypot(sObj.x - mouseX, sObj.y - mouseY);
      if (dist < 15) {
        foundHover = obj;
        break;
      }
    }

    if (!foundHover) {
      for (let node of ACADEMIC_RESEARCH_NODES) {
        if (!isWithinScale(node.coords.x, node.coords.y)) continue;
        const wNode = getWorldCoords(node.coords.x, node.coords.y, w, h);
        const sNode = toScreenCoords(wNode.x, wNode.y);
        const dist = Math.hypot(sNode.x - mouseX, sNode.y - mouseY);
        if (dist < 22) {
          foundHover = node;
          break;
        }
      }
    }

    setHoveredItem(foundHover);
    if (foundHover) {
      setTooltipPos({ x: e.clientX, y: e.clientY });
    }
  };

  const onMouseUp = () => {
    if (isBoxZoomMode && boxSelection) {
      const bx = Math.min(boxSelection.startX, boxSelection.endX);
      const by = Math.min(boxSelection.startY, boxSelection.endY);
      const bw = Math.abs(boxSelection.endX - boxSelection.startX);
      const bh = Math.abs(boxSelection.endY - boxSelection.startY);

      const canvas = canvasRef.current;
      if (canvas && bw > 15 && bh > 15) {
        const w = canvas.width / window.devicePixelRatio;
        const h = canvas.height / window.devicePixelRatio;

        // Convert selection box corners to World space
        const w1 = toWorldCoords(bx, by);
        const w2 = toWorldCoords(bx + bw, by + bh);

        const wBoxW = Math.abs(w2.x - w1.x);
        const wBoxH = Math.abs(w2.y - w1.y);

        // Compute target scale & offsets purely changing Viewport
        const targetScale = Math.max(0.5, Math.min(30.0, Math.min(w / wBoxW, h / wBoxH)));
        const centerWorldX = (w1.x + w2.x) / 2;
        const centerWorldY = (w1.y + w2.y) / 2;

        const newOffsetX = w / 2 - centerWorldX * targetScale;
        const newOffsetY = h / 2 - centerWorldY * targetScale;

        setTransform({
          scale: targetScale,
          offsetX: newOffsetX,
          offsetY: newOffsetY
        });
      }

      setBoxSelection(null);
      setIsBoxZoomMode(false);
    }

    isDraggingRef.current = false;
  };

  const onWheel = useCallback((e) => {
    e.preventDefault();
    if (e.ctrlKey) {
      const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
      setTransform(prev => {
        const newScale = Math.max(0.5, Math.min(30.0, prev.scale * zoomFactor));
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const newOffsetX = mouseX - (mouseX - prev.offsetX) * (newScale / prev.scale);
        const newOffsetY = mouseY - (mouseY - prev.offsetY) * (newScale / prev.scale);
        return { scale: newScale, offsetX: newOffsetX, offsetY: newOffsetY };
      });
    } else {
      setTransform(prev => ({
        ...prev,
        offsetX: prev.offsetX - e.deltaX,
        offsetY: prev.offsetY - e.deltaY
      }));
    }
  }, []);

  const onTouchStart = (e) => {
    if (e.touches.length === 2) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const center = { x: (t1.clientX + t2.clientX) / 2, y: (t1.clientY + t2.clientY) / 2 };

      touchStateRef.current = { prevDist: dist, prevCenter: center };
    } else if (e.touches.length === 1) {
      isDraggingRef.current = true;
      startDragRef.current = {
        x: e.touches[0].clientX - transform.offsetX,
        y: e.touches[0].clientY - transform.offsetY
      };
    }
  };

  const onTouchMove = (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const currentDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const currentCenter = { x: (t1.clientX + t2.clientX) / 2, y: (t1.clientY + t2.clientY) / 2 };

      const prevDist = touchStateRef.current.prevDist || currentDist;
      const prevCenter = touchStateRef.current.prevCenter || currentCenter;

      const deltaX = currentCenter.x - prevCenter.x;
      const deltaY = currentCenter.y - prevCenter.y;
      const zoomRatio = currentDist / prevDist;

      setTransform(prev => {
        const newScale = Math.max(0.5, Math.min(30.0, prev.scale * zoomRatio));
        const newOffsetX = currentCenter.x - (currentCenter.x - (prev.offsetX + deltaX)) * (newScale / prev.scale);
        const newOffsetY = currentCenter.y - (currentCenter.y - (prev.offsetY + deltaY)) * (newScale / prev.scale);

        return { scale: newScale, offsetX: newOffsetX, offsetY: newOffsetY };
      });

      touchStateRef.current = { prevDist: currentDist, prevCenter: currentCenter };
    } else if (e.touches.length === 1 && isDraggingRef.current) {
      setTransform(prev => ({
        ...prev,
        offsetX: e.touches[0].clientX - startDragRef.current.x,
        offsetY: e.touches[0].clientY - startDragRef.current.y
      }));
    }
  };

  const onTouchEnd = () => {
    isDraggingRef.current = false;
    touchStateRef.current = { prevDist: 0, prevCenter: { x: 0, y: 0 } };
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('wheel', onWheel, { passive: false });
    return () => container.removeEventListener('wheel', onWheel);
  }, [onWheel]);

  const onClickCanvas = () => {
    if (hoveredItem && !isBoxZoomMode) {
      const type = hoveredItem.symbol ? 'object' : 'node';
      onSelectItem(hoveredItem, type);
    }
  };

  // Actions
  const zoomIn = () => setTransform(prev => ({ ...prev, scale: Math.min(30.0, prev.scale * 1.5) }));
  const zoomOut = () => setTransform(prev => ({ ...prev, scale: Math.max(0.5, prev.scale / 1.5) }));
  const resetFullScale = () => setTransform({ scale: 1.0, offsetX: 70, offsetY: 30 });

  return (
    <div
      ref={containerRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className={`relative w-full h-full bg-white overflow-hidden select-none touch-none ${isBoxZoomMode ? 'cursor-crosshair' : 'cursor-grab active:cursor-grabbing'
        }`}
    >
      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onClick={onClickCanvas}
        className="w-full h-full block"
      />

      {/* Box Zoom Active Banner Indicator */}
      {isBoxZoomMode && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-30 bg-cyan-900/90 text-cyan-200 px-4 py-1.5 rounded-full shadow-lg text-xs font-serif flex items-center gap-2 border border-cyan-700 animate-pulse">
          <Crop className="w-4 h-4 text-cyan-300" />
          <span>框选视野模式已就绪：请在画布上按住并拖拽绘制拉出矩形区域</span>
        </div>
      )}

      {/* Right Academic Toolbar */}
      <div className="absolute top-16 right-6 z-20 flex flex-col gap-1.5 bg-white/95 backdrop-blur border border-slate-300 rounded shadow-md p-1.5 font-serif text-xs">
        {/* 1. Zoom In */}
        <button
          onClick={zoomIn}
          title="放大视野 (Zoom In)"
          className="p-2 rounded hover:bg-slate-100 text-slate-800 transition-colors flex items-center justify-center group relative"
        >
          <ZoomIn className="w-4 h-4 text-slate-700" />
          <span className="absolute right-full mr-2 hidden group-hover:block whitespace-nowrap bg-slate-900 text-white text-[10px] px-2 py-1 rounded shadow">
            放大视野 (+50%)
          </span>
        </button>

        {/* 2. Zoom Out */}
        <button
          onClick={zoomOut}
          title="缩小视野 (Zoom Out)"
          className="p-2 rounded hover:bg-slate-100 text-slate-800 transition-colors flex items-center justify-center group relative"
        >
          <ZoomOut className="w-4 h-4 text-slate-700" />
          <span className="absolute right-full mr-2 hidden group-hover:block whitespace-nowrap bg-slate-900 text-white text-[10px] px-2 py-1 rounded shadow">
            缩小视野 (-33%)
          </span>
        </button>

        <div className="w-full h-px bg-slate-200" />

        {/* 3. Fit Viewport to Selected Range (With Tooltip) */}
        <button
          onClick={fitViewToSelection}
          title="将视野放大或平移以完全对齐左侧面板选定的标度区间"
          className="p-2 rounded hover:bg-slate-100 text-slate-800 transition-colors flex items-center justify-center group relative"
        >
          <Target className="w-4 h-4 text-cyan-700" />
          <span className="absolute right-full mr-2 hidden group-hover:block whitespace-nowrap bg-slate-900 text-white text-[10px] px-2 py-1 rounded shadow">
            将视野对齐至当前选定标度
          </span>
        </button>

        {/* 4. Reset Full Viewport */}
        <button
          onClick={resetFullScale}
          title="全视角 (Reset Full Viewport)"
          className="p-2 rounded hover:bg-slate-100 text-slate-800 transition-colors flex items-center justify-center group relative"
        >
          <RefreshCw className="w-4 h-4 text-slate-700" />
          <span className="absolute right-full mr-2 hidden group-hover:block whitespace-nowrap bg-slate-900 text-white text-[10px] px-2 py-1 rounded shadow">
            全视角
          </span>
        </button>

        <div className="w-full h-px bg-slate-200" />

        {/* 5. Matplotlib Style Box Zoom Mode */}
        <button
          onClick={() => setIsBoxZoomMode(!isBoxZoomMode)}
          title="进入 Matplotlib 式框选模式（在相图拖拽矩形直接放大指定视域，不改变过滤器标度）"
          className={`p-2 rounded transition-all flex items-center justify-center group relative ${isBoxZoomMode
            ? 'bg-cyan-600 text-white shadow-inner'
            : 'hover:bg-slate-100 text-slate-800'
            }`}
        >
          <Crop className="w-4 h-4" />
          <span className="absolute right-full mr-2 hidden group-hover:block whitespace-nowrap bg-slate-900 text-white text-[10px] px-2 py-1 rounded shadow">
            {isBoxZoomMode ? '退出框选模式' : '进入矩形框选视野模式 (Box Zoom)'}
          </span>
        </button>
      </div>

      {/* Hover Inspection Tooltip - Light Academic Paper Theme */}
      {hoveredItem && !isBoxZoomMode && (
        <div
          style={{ left: tooltipPos.x + 14, top: tooltipPos.y + 14 }}
          className="fixed z-50 bg-white/95 text-slate-900 backdrop-blur p-3 rounded-lg shadow-xl pointer-events-none text-xs font-serif border border-slate-300 max-w-sm animate-fade-in"
        >
          <div className="flex items-center justify-between font-bold text-slate-900 mb-1 border-b border-slate-200 pb-1">
            <span className="flex items-center gap-1.5">
              {hoveredItem.type === 'theory' && (
                <span className="px-1.5 py-0.2 bg-purple-100 text-purple-800 border border-purple-300 rounded text-[9px] font-mono font-bold">
                  理论
                </span>
              )}
              {hoveredItem.type === 'method' && (
                <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded text-[9px] font-mono font-bold">
                  方法
                </span>
              )}
              {(!hoveredItem.type || hoveredItem.type === 'node') && !hoveredItem.symbol && (
                <span className="px-1.5 py-0.2 bg-sky-100 text-sky-800 border border-sky-300 rounded text-[9px] font-mono font-bold">
                  课题
                </span>
              )}
              <span>{hoveredItem.label || hoveredItem.title}</span>
            </span>
            {hoveredItem.pdgCode && (
              <span className="font-mono text-[9px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-300">
                {hoveredItem.pdgCode}
              </span>
            )}
          </div>
          <div className="text-[11px] text-slate-700 leading-snug my-1">
            {hoveredItem.annotation || hoveredItem.abstract}
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-1.5 border-t border-slate-200 pt-1 flex justify-between">
            <span>点击查看算符与规格</span>
            <span>Physical Review Spec</span>
          </div>
        </div>
      )}

      {/* Academic Figure Caption Footer & Particle Legend */}
      <div className="absolute bottom-4 left-6 right-6 pointer-events-none flex flex-col md:flex-row items-start md:items-center justify-between border-t border-slate-300 pt-2 text-[11px] text-slate-600 font-serif gap-2">
        <div className="flex items-center gap-4 flex-wrap">
          <div>
            <span className="font-bold">Figure 1.</span> PDG Academic Map & Legend:
          </div>
          <div className="flex items-center gap-3 font-sans text-[10px] text-slate-700 flex-wrap">
            <span className="flex items-center gap-1">
              <span className="text-purple-600 font-bold text-xs">○</span> 规范玻色子
            </span>
            <span className="flex items-center gap-1">
              <span className="text-indigo-900 font-bold text-xs">●</span> 基本费米子
            </span>
            <span className="flex items-center gap-1">
              <span className="text-slate-500 font-bold text-xs">◌</span> 复合强子/束缚态
            </span>
            <span className="flex items-center gap-1">
              <span className="text-emerald-700 font-bold text-xs">■</span> 物态/材料/天体
            </span>
            <span className="flex items-center gap-1 px-1.5 py-0.2 rounded bg-purple-50 text-purple-700 border border-purple-200 font-mono font-bold">
              [理论] 具体理论
            </span>
            <span className="flex items-center gap-1 px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono font-bold">
              [方法] 研究方法
            </span>
            <span className="flex items-center gap-1 px-1.5 py-0.2 rounded bg-sky-50 text-sky-700 border border-sky-200 font-mono font-bold">
              [课题] 研究课题
            </span>
          </div>
        </div>

        <div className="font-mono text-[10px] text-slate-500">
          Scale: {transform.scale.toFixed(2)}x | Physical Review Light Theme
        </div>
      </div>
    </div>
  );
}
