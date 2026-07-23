import React, { useState, useRef, useCallback } from 'react';
import Header from './components/Header';
import Canvas2D from './components/Canvas2D';
import ControlPanel, { LayerVisibility } from './components/ControlPanel';
import DetailDrawer from './components/DetailDrawer';
import EquivalenceModal from './components/EquivalenceModal';
import ParticleManagerModal from './components/ParticleManagerModal';
import { ACADEMIC_OBJECTS, ACADEMIC_RESEARCH_NODES } from './data/physicsData';
import { CanvasTransform } from './types/physics';
import { useTheme } from './hooks/useTheme';

export function App() {
  const { theme, toggleTheme } = useTheme();
  const [activeDomain, setActiveDomain] = useState('all');

  const [layerVisibility, setLayerVisibility] = useState<LayerVisibility>({
    clouds: true,
    heatmaps: true,
    forces: true,
    objects: true,
    nodes: true,
    relations: true
  });

  const [spatialRange, setSpatialRange] = useState<[number, number]>([-35, 26]);
  const [energyRange, setEnergyRange] = useState<[number, number]>([-4, 28]);
  const [fitTrigger, setFitTrigger] = useState(0);

  // Independent per-axis viewport transform (zoom X / zoom Y / pan), lifted here
  // so the control panel's per-axis zoom sliders and the canvas share one source of truth.
  const [transform, setTransform] = useState<CanvasTransform>({ scaleX: 1, scaleY: 1, offsetX: 70, offsetY: 30 });
  const viewportRef = useRef({ w: 1200, h: 800 });

  const handleViewportChange = useCallback((size: { w: number; h: number }) => {
    viewportRef.current = size;
  }, []);

  // Zoom a single axis about the viewport centre so the view doesn't drift sideways.
  const handleZoomAxis = useCallback((axis: 'x' | 'y', newScale: number) => {
    setTransform(prev => {
      const { w, h } = viewportRef.current;
      const cx = w / 2, cy = h / 2;
      if (axis === 'x') {
        const ratio = newScale / prev.scaleX;
        return { ...prev, scaleX: newScale, offsetX: cx - (cx - prev.offsetX) * ratio };
      }
      const ratio = newScale / prev.scaleY;
      return { ...prev, scaleY: newScale, offsetY: cy - (cy - prev.offsetY) * ratio };
    });
  }, []);

  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<'object' | 'node' | 'relation' | null>(null);
  const [isEquivalenceOpen, setIsEquivalenceOpen] = useState(false);
  const [isParticleManagerOpen, setIsParticleManagerOpen] = useState(false);

  const handleSelectItem = (itemData: any, type: string) => {
    setSelectedItem(itemData);
    setSelectedType(type as 'object' | 'node' | 'relation');
  };

  const handleSelectSubItem = (itemId: string) => {
    const foundObj = ACADEMIC_OBJECTS.find(o => o.id === itemId);
    if (foundObj) {
      setSelectedItem(foundObj);
      setSelectedType('object');
      return;
    }
    const foundNode = ACADEMIC_RESEARCH_NODES.find(n => n.id === itemId);
    if (foundNode) {
      setSelectedItem(foundNode);
      setSelectedType('node');
    }
  };

  const triggerFitView = () => {
    setFitTrigger(prev => prev + 1);
  };

  const resetAllScales = () => {
    setSpatialRange([-35, 26]);
    setEnergyRange([-4, 28]);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-white dark:bg-slate-900 select-none">
      {/* Top Academic Journal Header */}
      <Header
        activeDomain={activeDomain}
        setActiveDomain={setActiveDomain}
        onOpenEquivalenceModal={() => setIsEquivalenceOpen(true)}
        onOpenParticleManager={() => setIsParticleManagerOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Control Panel with Unified Button Styles */}
      <ControlPanel
        layerVisibility={layerVisibility}
        setLayerVisibility={setLayerVisibility}
        spatialRange={spatialRange}
        setSpatialRange={setSpatialRange}
        energyRange={energyRange}
        setEnergyRange={setEnergyRange}
        onFitViewToSelection={triggerFitView}
        onResetScales={resetAllScales}
        scaleX={transform.scaleX}
        scaleY={transform.scaleY}
        onZoomAxis={handleZoomAxis}
      />

      {/* Dynamic Interactive 2D Canvas */}
      <main className="w-full h-full pt-12">
        <Canvas2D
          activeDomain={activeDomain}
          layerVisibility={layerVisibility}
          selectedItem={selectedItem}
          onSelectItem={handleSelectItem}
          spatialRange={spatialRange}
          energyRange={energyRange}
          fitTrigger={fitTrigger}
          transform={transform}
          setTransform={setTransform}
          onViewportChange={handleViewportChange}
          theme={theme}
        />
      </main>

      {/* Detail Inspection Drawer */}
      <DetailDrawer
        item={selectedItem}
        itemType={selectedType}
        onClose={() => {
          setSelectedItem(null);
          setSelectedType(null);
        }}
        onSelectSubItem={handleSelectSubItem}
      />

      {/* Operator Isomorphism Modal */}
      <EquivalenceModal
        isOpen={isEquivalenceOpen}
        onClose={() => setIsEquivalenceOpen(false)}
      />

      {/* PDG Particle Manager Backend Modal */}
      <ParticleManagerModal
        isOpen={isParticleManagerOpen}
        onClose={() => setIsParticleManagerOpen(false)}
        onRefreshData={() => {
          // Trigger optional re-fetch if dynamic backend loading is active
        }}
      />
    </div>
  );
}

export default App;
