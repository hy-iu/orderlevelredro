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

      // --- Fundamental Forces Range Spans ---
      FUNDAMENTAL_FORCES.forEach(force => {
        const wStart = getWorldCoords(force.rangeCoords.xStart, force.rangeCoords.y, w, h);
        const wEnd = getWorldCoords(force.rangeCoords.xEnd, force.rangeCoords.y, w, h);
        const sStart = toScreenCoords(wStart.x, wStart.y);
        const sEnd = toScreenCoords(wEnd.x, wEnd.y);

        ctx.strokeStyle = force.color + 'aa';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 3]);
        ctx.beginPath();
        ctx.moveTo(sStart.x, sStart.y);
        ctx.lineTo(sEnd.x, sEnd.y);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = force.color;
        ctx.fillRect(sStart.x - 2, sStart.y - 4, 4, 8);
        ctx.fillRect(sEnd.x - 2, sEnd.y - 4, 4, 8);

        const forceSprite = getKatexSprite(force.name.split(' ')[0], force.color, 13);
        if (forceSprite && forceSprite.complete) {
          ctx.drawImage(forceSprite, sStart.x + 6, sStart.y - 16);
        }
      });

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

      // --- n-Leg Research Nodes ---
      if (layerVisibility.nodes) {
        ACADEMIC_RESEARCH_NODES.forEach(node => {
          if (!isWithinScale(node.coords.x, node.coords.y)) return;

          const wNode = getWorldCoords(node.coords.x, node.coords.y, w, h);
          const sNode = toScreenCoords(wNode.x, wNode.y);

          const isNodeHovered = hoveredItem?.id === node.id;
          const isNodeSelected = selectedItem?.id === node.id;

          if (node.legs) {
            node.legs.forEach(legId => {
              const targetObj = ACADEMIC_OBJECTS.find(o => o.id === legId);
              if (targetObj) {
                const wObj = getWorldCoords(targetObj.coords.x, targetObj.coords.y, w, h);
                const sObj = toScreenCoords(wObj.x, wObj.y);

                ctx.strokeStyle = isNodeHovered || isNodeSelected ? '#2563eb' : '#94a3b8';
                ctx.lineWidth = isNodeHovered || isNodeSelected ? 2 : 1;
                ctx.setLineDash([3, 3]);
                ctx.beginPath();
                ctx.moveTo(sNode.x, sNode.y);
                ctx.lineTo(sObj.x, sObj.y);
                ctx.stroke();
                ctx.setLineDash([]);
              }
            });
          }

          const size = isNodeHovered || isNodeSelected ? 10 : 8;
          ctx.fillStyle = isNodeSelected ? '#2563eb' : isNodeHovered ? '#1d4ed8' : '#0f172a';
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(sNode.x, sNode.y - size);
          ctx.lineTo(sNode.x + size, sNode.y);
          ctx.lineTo(sNode.x, sNode.y + size);
          ctx.lineTo(sNode.x - size, sNode.y);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#0f172a';
          ctx.font = isNodeHovered ? 'bold 11px "STIX Two Text", serif' : 'bold 10px "STIX Two Text", serif';
          ctx.textAlign = 'left';
          ctx.fillText(node.title.split(':')[0], sNode.x + size + 4, sNode.y + 4);
        });
      }

      // --- Physical Objects with PDG Error Bars & Prominent Standard KaTeX Labels ---
      if (layerVisibility.objects) {
        ACADEMIC_OBJECTS.forEach(obj => {
          if (!isWithinScale(obj.coords.x, obj.coords.y)) return;

          const wObj = getWorldCoords(obj.coords.x, obj.coords.y, w, h);
          const sObj = toScreenCoords(wObj.x, wObj.y);

          const isObjHovered = hoveredItem?.id === obj.id;
          const isObjSelected = selectedItem?.id === obj.id;

          // --- Draw PDG Error Bars ---
          if (obj.errorBar) {
            const ebX = (obj.errorBar.dx * 15) * transform.scale;
            const ebY = (obj.errorBar.dy * 15) * transform.scale;

            ctx.strokeStyle = isObjHovered || isObjSelected ? '#dc2626' : '#64748b';
            ctx.lineWidth = 1.2;

            // X Error Bar
            ctx.beginPath();
            ctx.moveTo(sObj.x - ebX, sObj.y);
            ctx.lineTo(sObj.x + ebX, sObj.y);
            ctx.moveTo(sObj.x - ebX, sObj.y - 3);
            ctx.lineTo(sObj.x - ebX, sObj.y + 3);
            ctx.moveTo(sObj.x + ebX, sObj.y - 3);
            ctx.lineTo(sObj.x + ebX, sObj.y + 3);
            ctx.stroke();

            // Y Error Bar
            ctx.beginPath();
            ctx.moveTo(sObj.x, sObj.y - ebY);
            ctx.lineTo(sObj.x, sObj.y + ebY);
            ctx.moveTo(sObj.x - 3, sObj.y - ebY);
            ctx.lineTo(sObj.x + 3, sObj.y - ebY);
            ctx.moveTo(sObj.x - 3, sObj.y + ebY);
            ctx.lineTo(sObj.x + 3, sObj.y + ebY);
            ctx.stroke();
          }

          // CONSTANT POINT RADIUS
          const radius = isObjHovered || isObjSelected ? 7 : 5;

          if (isObjHovered || isObjSelected) {
            ctx.fillStyle = '#3b82f633';
            ctx.beginPath();
            ctx.arc(sObj.x, sObj.y, radius + 6, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.fillStyle = isObjSelected ? '#dc2626' : isObjHovered ? '#2563eb' : '#1e3a8a';
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(sObj.x, sObj.y, radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Offset crowded particles
          let labelOffsetX = radius + 6;
          let labelOffsetY = -14;
          if (obj.id === 'obj-z-boson') { labelOffsetX = -70; labelOffsetY = -22; }
          if (obj.id === 'obj-w-boson') { labelOffsetX = -70; labelOffsetY = 10; }
          if (obj.id === 'obj-higgs') { labelOffsetX = 12; labelOffsetY = -22; }
          if (obj.id === 'obj-top-quark') { labelOffsetX = 12; labelOffsetY = 12; }

          // Prominent Standard LaTeX rendering (17px fontSize)
          const katexSprite = getKatexSprite(obj.symbol, isObjSelected ? '#dc2626' : isObjHovered ? '#2563eb' : '#0f172a', 17);
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
        if (dist < 15) {
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
      className={`relative w-full h-full bg-white overflow-hidden select-none touch-none ${
        isBoxZoomMode ? 'cursor-crosshair' : 'cursor-grab active:cursor-grabbing'
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
          className={`p-2 rounded transition-all flex items-center justify-center group relative ${
            isBoxZoomMode
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

      {/* Hover Inspection Tooltip */}
      {hoveredItem && !isBoxZoomMode && (
        <div
          style={{ left: tooltipPos.x + 14, top: tooltipPos.y + 14 }}
          className="fixed z-50 bg-slate-900 text-white p-2.5 rounded shadow-lg pointer-events-none text-xs font-serif border border-slate-700 max-w-xs animate-fade-in"
        >
          <div className="flex items-center justify-between font-bold text-sky-300 mb-0.5">
            <span>{hoveredItem.label || hoveredItem.title}</span>
            {hoveredItem.pdgCode && <span className="font-mono text-[9px] bg-sky-950 text-sky-300 px-1 rounded border border-sky-800">{hoveredItem.pdgCode}</span>}
          </div>
          <div className="text-[11px] text-slate-300 leading-snug">
            {hoveredItem.annotation || hoveredItem.abstract}
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-1 border-t border-slate-800 pt-1 flex justify-between">
            <span>点击查看 PDG 算符</span>
            <span>PDG Specification</span>
          </div>
        </div>
      )}

      {/* Academic Figure Caption Footer */}
      <div className="absolute bottom-4 left-6 right-6 pointer-events-none flex items-center justify-between border-t border-slate-300 pt-2 text-[11px] text-slate-600 font-serif">
        <div>
          <span className="font-bold">Figure 1.</span> PDG Reference Map with Standard LaTeX Rendered Labels.
        </div>
        <div className="font-mono text-[10px] text-slate-500">
          Scale: {transform.scale.toFixed(2)}x | Standard LaTeX Typesetting
        </div>
      </div>
    </div>
  );
}
