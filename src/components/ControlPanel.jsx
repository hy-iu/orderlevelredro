import React, { useState } from 'react';
import { Eye, EyeOff, Sliders, Maximize2, Zap, Target, PanelLeftClose, PanelLeft, RotateCcw } from 'lucide-react';
import DualRangeSlider from './DualRangeSlider';

export default function ControlPanel({
  layerVisibility,
  setLayerVisibility,
  spatialRange,
  setSpatialRange,
  energyRange,
  setEnergyRange,
  onFitViewToSelection
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleLayer = (layerKey) => {
    setLayerVisibility(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  const resetSpatialRange = () => {
    setSpatialRange([-35, 26]);
  };

  const resetEnergyRange = () => {
    setEnergyRange([-4, 28]);
  };

  // If collapsed, render a sleek trigger button
  if (isCollapsed) {
    return (
      <div className="absolute top-16 left-6 z-20">
        <button
          onClick={() => setIsCollapsed(false)}
          className="flex items-center gap-1.5 px-3 py-2 bg-white/95 backdrop-blur border border-slate-300 rounded shadow-md text-slate-800 text-xs font-serif hover:bg-slate-50 transition-all active:scale-95"
          title="展开过滤器与图层控制面板 (Expand Panel)"
        >
          <PanelLeft className="w-4 h-4 text-cyan-700" />
          <span className="font-bold">标度过滤器</span>
        </button>
      </div>
    );
  }

  return (
    <div className="absolute top-16 left-6 z-20 w-72 bg-white/95 backdrop-blur border border-slate-300 rounded shadow-md p-3.5 text-xs font-serif text-slate-800 space-y-3 animate-fade-in">
      {/* Title & Collapse Trigger */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <span className="font-bold text-slate-900 flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-slate-600" />
          双极标度过滤器 (Dual Range)
        </span>
        <button
          onClick={() => setIsCollapsed(true)}
          className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          title="收起面板 (Collapse Panel)"
        >
          <PanelLeftClose className="w-4 h-4" />
        </button>
      </div>

      {/* Layer Toggles */}
      <div className="space-y-1.5">
        <div 
          onClick={() => toggleLayer('clouds')}
          className="flex items-center justify-between p-1.5 rounded hover:bg-slate-100 cursor-pointer transition-all border border-transparent hover:border-slate-200"
        >
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 border border-purple-600 bg-purple-50"></span>
            学科截断能域 (Sec I-VII)
          </span>
          {layerVisibility.clouds ? <Eye className="w-3.5 h-3.5 text-slate-700" /> : <EyeOff className="w-3.5 h-3.5 text-slate-300" />}
        </div>

        <div 
          onClick={() => toggleLayer('objects')}
          className="flex items-center justify-between p-1.5 rounded hover:bg-slate-100 cursor-pointer transition-all border border-transparent hover:border-slate-200"
        >
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-900"></span>
            基元研究对象与算子 (Points)
          </span>
          {layerVisibility.objects ? <Eye className="w-3.5 h-3.5 text-slate-700" /> : <EyeOff className="w-3.5 h-3.5 text-slate-300" />}
        </div>

        <div 
          onClick={() => toggleLayer('nodes')}
          className="flex items-center justify-between p-1.5 rounded hover:bg-slate-100 cursor-pointer transition-all border border-transparent hover:border-slate-200"
        >
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rotate-45 bg-slate-900 border border-slate-700"></span>
            n-Leg 重点课题节点 (Nodes)
          </span>
          {layerVisibility.nodes ? <Eye className="w-3.5 h-3.5 text-slate-700" /> : <EyeOff className="w-3.5 h-3.5 text-slate-300" />}
        </div>

        <div 
          onClick={() => toggleLayer('relations')}
          className="flex items-center justify-between p-1.5 rounded hover:bg-slate-100 cursor-pointer transition-all border border-transparent hover:border-slate-200"
        >
          <span className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-red-600"></span>
            重整化 RG / 全息对偶流向
          </span>
          {layerVisibility.relations ? <Eye className="w-3.5 h-3.5 text-slate-700" /> : <EyeOff className="w-3.5 h-3.5 text-slate-300" />}
        </div>
      </div>

      {/* Dual-Thumb Sliders */}
      <div className="border-t border-slate-200 pt-2.5 space-y-3">
        {/* Spatial Dual-Thumb Slider */}
        <div>
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 mb-1">
            <span className="flex items-center gap-1">
              <Maximize2 className="w-3 h-3 text-cyan-700" /> 空间尺度范围 (Spatial):
            </span>
            <button
              onClick={resetSpatialRange}
              className="p-1 rounded text-slate-400 hover:text-cyan-700 hover:bg-slate-100 transition-colors"
              title="重置空间标度至全范围 [-35, 26]"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
          <DualRangeSlider
            minLimit={-35}
            maxLimit={26}
            minVal={spatialRange[0]}
            maxVal={spatialRange[1]}
            onChange={setSpatialRange}
            unit="m"
            accentColor="#0284c7"
          />
        </div>

        {/* Energy Dual-Thumb Slider */}
        <div>
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 mb-1">
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-pink-700" /> 能量标度范围 (Energy):
            </span>
            <button
              onClick={resetEnergyRange}
              className="p-1 rounded text-slate-400 hover:text-pink-700 hover:bg-slate-100 transition-colors"
              title="重置能量标度至全范围 [-4, 28]"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
          <DualRangeSlider
            minLimit={-4}
            maxLimit={28}
            minVal={energyRange[0]}
            maxVal={energyRange[1]}
            onChange={setEnergyRange}
            unit="eV"
            accentColor="#db2777"
          />
        </div>
      </div>

      {/* Action Button: Fit Viewport */}
      <div className="border-t border-slate-200 pt-2.5">
        <button
          onClick={onFitViewToSelection}
          className="w-full py-1.5 px-3 rounded bg-slate-900 hover:bg-slate-800 text-white text-xs font-serif font-medium flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-98"
          title="将视野放大或平移以完全对齐左侧面板选定的标度区间"
        >
          <Target className="w-3.5 h-3.5 text-cyan-400" />
          <span>将视野对齐至当前选定标度</span>
        </button>
      </div>
    </div>
  );
}
