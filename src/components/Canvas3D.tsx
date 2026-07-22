import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { DOMAIN_CLOUDS, OBJECTS, RESEARCH_NODES, RELATION_LINKS } from '../data/physicsData';
import { LayerVisibility } from './ControlPanel';

interface Canvas3DProps {
  viewMode?: '2d' | '3d';
  activeDomain?: string;
  layerVisibility: LayerVisibility;
  onSelectItem: (item: any, type: string) => void;
  selectedItem?: any;
  scaleFilter?: any;
}

export const Canvas3D: React.FC<Canvas3DProps> = ({
  viewMode = '3d',
  activeDomain = 'all',
  layerVisibility,
  onSelectItem,
  selectedItem,
  scaleFilter
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animatedObjectsRef = useRef<{
    clouds?: THREE.Mesh[];
    pulses?: { mesh: THREE.Mesh; curve: THREE.QuadraticBezierCurve3; speed: number; progress: number }[];
    nodes?: THREE.Mesh[];
    objects?: THREE.Mesh[];
  }>({});

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x070913);
    scene.fog = new THREE.FogExp2(0x070913, 0.008);

    // 2. Camera Setup
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(30, 25, 45);
    cameraRef.current = camera;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 1.5);
    dirLight1.position.set(20, 40, 20);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xec4899, 1.2);
    dirLight2.position.set(-20, -20, -20);
    scene.add(dirLight2);

    // Group containers
    const gridGroup = new THREE.Group();
    const cloudsGroup = new THREE.Group();
    const objectsGroup = new THREE.Group();
    const nodesGroup = new THREE.Group();
    const relationsGroup = new THREE.Group();

    scene.add(gridGroup);
    scene.add(cloudsGroup);
    scene.add(objectsGroup);
    scene.add(nodesGroup);
    scene.add(relationsGroup);

    // --- Build 3D Axes & Grid ---
    const buildGrid = () => {
      const axesHelper = new THREE.AxesHelper(35);
      gridGroup.add(axesHelper);

      const gridXZ = new THREE.GridHelper(70, 70, 0x38bdf8, 0x1e293b);
      gridXZ.position.y = -20;
      gridGroup.add(gridXZ);

      const createTextSprite = (text: string, color = '#38bdf8', fontSize = 32) => {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = color;
          ctx.font = `Bold ${fontSize}px "JetBrains Mono", sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.shadowColor = color;
          ctx.shadowBlur = 10;
          ctx.fillText(text, 256, 64);
        }

        const texture = new THREE.CanvasTexture(canvas);
        const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true });
        const sprite = new THREE.Sprite(spriteMat);
        sprite.scale.set(12, 3, 1);
        return sprite;
      };

      const xLabel = createTextSprite('空间尺度 log₁₀(L/m) →', '#38bdf8');
      xLabel.position.set(38, 0, 0);
      gridGroup.add(xLabel);

      const yLabel = createTextSprite('能量标度 log₁₀(E/eV) ↑', '#ec4899');
      yLabel.position.set(0, 32, 0);
      gridGroup.add(yLabel);

      const zLabel = createTextSprite('时间/复杂度 log₁₀(T/s) ↗', '#10b981');
      zLabel.position.set(0, 0, 38);
      gridGroup.add(zLabel);
    };

    buildGrid();

    // --- Build Domain Clouds ---
    const cloudMeshes: THREE.Mesh[] = [];
    DOMAIN_CLOUDS.forEach((cloud: any) => {
      const radius = cloud.radius || 10;
      const geo = new THREE.IcosahedronGeometry(radius, 3);
      const mat = new THREE.MeshPhongMaterial({
        color: cloud.color,
        transparent: true,
        opacity: 0.12,
        wireframe: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const mesh = new THREE.Mesh(geo, mat);
      const center = cloud.center || [0, 0, 0];
      mesh.position.set(center[0], center[1], center[2]);
      mesh.userData = { type: 'cloud', data: cloud };
      cloudsGroup.add(mesh);

      const innerGeo = new THREE.SphereGeometry(radius * 0.7, 16, 16);
      const innerMat = new THREE.MeshBasicMaterial({
        color: cloud.color,
        transparent: true,
        opacity: 0.05,
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      mesh.add(innerMesh);

      cloudMeshes.push(mesh);
    });

    // --- Build Objects (Points & Lines) ---
    const objectMeshesMap = new Map<string, THREE.Mesh>();
    OBJECTS.forEach((obj: any) => {
      const pointGeo = new THREE.SphereGeometry(obj.size || 0.6, 24, 24);
      const pointMat = new THREE.MeshStandardMaterial({
        color: obj.color || '#38bdf8',
        emissive: obj.color || '#38bdf8',
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.8
      });
      const mesh = new THREE.Mesh(pointGeo, pointMat);
      const coords = obj.coords || [0, 0, 0];
      mesh.position.set(coords[0], coords[1], coords[2]);
      mesh.userData = { type: 'object', data: obj };
      objectsGroup.add(mesh);
      objectMeshesMap.set(obj.id, mesh);

      const haloGeo = new THREE.SphereGeometry((obj.size || 0.6) * 1.6, 16, 16);
      const haloMat = new THREE.MeshBasicMaterial({
        color: obj.color || '#38bdf8',
        transparent: true,
        opacity: 0.25,
        blending: THREE.AdditiveBlending
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      mesh.add(haloMesh);
    });

    // --- Build n-Leg Flexible Nodes (Research Topics) ---
    const nodeMeshesMap = new Map<string, THREE.Mesh>();
    const animPulses: { mesh: THREE.Mesh; curve: THREE.QuadraticBezierCurve3; speed: number; progress: number }[] = [];

    RESEARCH_NODES.forEach((node: any) => {
      const nodeGeo = new THREE.OctahedronGeometry(0.8, 1);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: node.color || '#a855f7',
        emissive: node.color || '#a855f7',
        emissiveIntensity: 0.8,
        wireframe: false,
        roughness: 0.1
      });
      const mesh = new THREE.Mesh(nodeGeo, nodeMat);
      const coords = node.coords || [0, 0, 0];
      mesh.position.set(coords[0], coords[1], coords[2]);
      mesh.userData = { type: 'node', data: node };
      nodesGroup.add(mesh);
      nodeMeshesMap.set(node.id, mesh);

      const wireGeo = new THREE.OctahedronGeometry(1.0, 1);
      const wireMat = new THREE.MeshBasicMaterial({
        color: '#ffffff',
        wireframe: true,
        transparent: true,
        opacity: 0.4
      });
      const wireMesh = new THREE.Mesh(wireGeo, wireMat);
      mesh.add(wireMesh);

      // Build Flexible Legs connecting to target Points
      if (node.legs && Array.isArray(node.legs)) {
        node.legs.forEach((targetId: string) => {
          const targetObjMesh = objectMeshesMap.get(targetId);
          if (targetObjMesh) {
            const startPos = mesh.position.clone();
            const endPos = targetObjMesh.position.clone();

            const midPos = new THREE.Vector3().addVectors(startPos, endPos).multiplyScalar(0.5);
            midPos.y += 2.0;

            const curve = new THREE.QuadraticBezierCurve3(startPos, midPos, endPos);
            const points = curve.getPoints(30);
            const legGeo = new THREE.BufferGeometry().setFromPoints(points);

            const legMat = new THREE.LineDashedMaterial({
              color: node.color || '#a855f7',
              dashSize: 0.4,
              gapSize: 0.2,
              transparent: true,
              opacity: 0.65,
              linewidth: 2
            });
            const line = new THREE.Line(legGeo, legMat);
            line.computeLineDistances();
            nodesGroup.add(line);

            const pGeo = new THREE.SphereGeometry(0.2, 8, 8);
            const pMat = new THREE.MeshBasicMaterial({
              color: '#ffffff',
              transparent: true,
              opacity: 0.9,
              blending: THREE.AdditiveBlending
            });
            const pulseMesh = new THREE.Mesh(pGeo, pMat);
            nodesGroup.add(pulseMesh);
            animPulses.push({ mesh: pulseMesh, curve, speed: 0.4 + Math.random() * 0.3, progress: Math.random() });
          }
        });
      }
    });

    // --- Build Relationships (RG Flow, Duality, Model Correspondence) ---
    RELATION_LINKS.forEach((rel: any) => {
      const srcMesh = objectMeshesMap.get(rel.source) || nodeMeshesMap.get(rel.source);
      const tgtMesh = objectMeshesMap.get(rel.target) || nodeMeshesMap.get(rel.target);

      if (srcMesh && tgtMesh) {
        const start = srcMesh.position.clone();
        const end = tgtMesh.position.clone();
        const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);

        if (rel.type === 'duality') mid.z += 4;
        else if (rel.type === 'rg-flow') mid.y += 3;
        else mid.x -= 3;

        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        const points = curve.getPoints(40);
        const geo = new THREE.BufferGeometry().setFromPoints(points);

        let color = '#ec4899';
        if (rel.type === 'duality') color = '#a855f7';
        if (rel.type === 'model-correspondence') color = '#38bdf8';

        const mat = new THREE.LineBasicMaterial({
          color,
          transparent: true,
          opacity: 0.75,
          linewidth: 2
        });
        const line = new THREE.Line(geo, mat);
        line.userData = { type: 'relation', data: rel };
        relationsGroup.add(line);

        const pGeo = new THREE.SphereGeometry(0.25, 8, 8);
        const pMat = new THREE.MeshBasicMaterial({ color, blending: THREE.AdditiveBlending });
        const pMesh = new THREE.Mesh(pGeo, pMat);
        relationsGroup.add(pMesh);
        animPulses.push({ mesh: pMesh, curve, speed: 0.25, progress: Math.random() });
      }
    });

    animatedObjectsRef.current = {
      clouds: cloudMeshes,
      pulses: animPulses,
      nodes: Array.from(nodeMeshesMap.values()),
      objects: Array.from(objectMeshesMap.values())
    };

    // Orbit Drag Control Handlers
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    const domElem = containerRef.current;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      const camera = cameraRef.current;
      if (camera) {
        const radius = camera.position.length();
        let theta = Math.atan2(camera.position.x, camera.position.z);
        let phi = Math.acos(Math.max(-1, Math.min(1, camera.position.y / radius)));

        theta -= deltaX * 0.008;
        phi -= deltaY * 0.008;
        phi = Math.max(0.1, Math.min(Math.PI - 0.1, phi));

        camera.position.x = radius * Math.sin(phi) * Math.sin(theta);
        camera.position.y = radius * Math.cos(phi);
        camera.position.z = radius * Math.sin(phi) * Math.cos(theta);
        camera.lookAt(0, 0, 0);
      }

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const camera = cameraRef.current;
      if (camera) {
        const factor = e.deltaY > 0 ? 1.08 : 0.92;
        camera.position.multiplyScalar(factor);
        camera.position.clampLength(10, 180);
      }
    };

    domElem.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domElem.addEventListener('wheel', onWheel, { passive: false });

    // Raycaster for Selection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onClick = (e: MouseEvent) => {
      const rect = domElem.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (!cameraRef.current) return;
      raycaster.setFromCamera(mouse, cameraRef.current);
      const interactables: THREE.Object3D[] = [];
      objectsGroup.traverse(child => { if ((child as THREE.Mesh).isMesh) interactables.push(child); });
      nodesGroup.traverse(child => { if ((child as THREE.Mesh).isMesh && child.userData.type === 'node') interactables.push(child); });

      const intersects = raycaster.intersectObjects(interactables, false);
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.userData && hit.userData.data) {
          onSelectItem(hit.userData.data, hit.userData.type);
        }
      }
    };

    domElem.addEventListener('click', onClick);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (animatedObjectsRef.current.clouds) {
        animatedObjectsRef.current.clouds.forEach(m => {
          m.rotation.y += 0.05 * delta;
          m.rotation.x += 0.02 * delta;
        });
      }

      if (animatedObjectsRef.current.nodes) {
        animatedObjectsRef.current.nodes.forEach(m => {
          m.rotation.y += 0.6 * delta;
          m.rotation.z += 0.3 * delta;
        });
      }

      if (animatedObjectsRef.current.pulses) {
        animatedObjectsRef.current.pulses.forEach(p => {
          p.progress += delta * p.speed;
          if (p.progress > 1) p.progress = 0;
          const pos = p.curve.getPoint(p.progress);
          p.mesh.position.copy(pos);
        });
      }

      if (rendererRef.current && cameraRef.current) {
        rendererRef.current.render(scene, cameraRef.current);
      }
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      domElem.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElem.removeEventListener('wheel', onWheel);
      domElem.removeEventListener('click', onClick);
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current && rendererRef.current.domElement) {
        domElem.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  useEffect(() => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;

    scene.children.forEach(child => {
      if (child.type === 'Group') {
        if (child.children.some(c => c.userData?.type === 'cloud')) {
          child.visible = layerVisibility.clouds;
        }
        if (child.children.some(c => c.userData?.type === 'object')) {
          child.visible = layerVisibility.objects;
        }
        if (child.children.some(c => c.userData?.type === 'node')) {
          child.visible = layerVisibility.nodes;
        }
        if (child.children.some(c => c.userData?.type === 'relation')) {
          child.visible = layerVisibility.relations;
        }
      }
    });
  }, [layerVisibility]);

  useEffect(() => {
    if (!cameraRef.current) return;
    const camera = cameraRef.current;
    if (viewMode === '2d') {
      camera.position.set(0, 0, 70);
      camera.lookAt(0, 0, 0);
    } else {
      camera.position.set(30, 25, 45);
      camera.lookAt(0, 0, 0);
    }
  }, [viewMode]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      <div className="absolute bottom-4 left-4 pointer-events-none glass-panel px-3 py-1.5 rounded-lg text-xs text-sky-300 font-mono flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
        按住左键拖拽旋转 | 滚轮缩放 | 点击可探索节点与相关联路线
      </div>
    </div>
  );
};

export default Canvas3D;
