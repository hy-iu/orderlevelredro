import React, { useState } from 'react';
import Header from './components/Header';
import Canvas2D from './components/Canvas2D';
import ControlPanel, { LayerVisibility } from './components/ControlPanel';
import DetailDrawer from './components/DetailDrawer';
import EquivalenceModal from './components/EquivalenceModal';
import ParticleManagerModal from './components/ParticleManagerModal';
import { ACADEMIC_OBJECTS, ACADEMIC_RESEARCH_NODES } from './data/physicsData';

export function App() {
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
    <div className="relative w-screen h-screen overflow-hidden bg-white select-none">
      {/* Top Academic Journal Header */}
      <Header
        activeDomain={activeDomain}
        setActiveDomain={setActiveDomain}
        onOpenEquivalenceModal={() => setIsEquivalenceOpen(true)}
        onOpenParticleManager={() => setIsParticleManagerOpen(true)}
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
