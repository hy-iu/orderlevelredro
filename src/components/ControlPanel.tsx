import React, { useState } from 'react';
import { Eye, EyeOff, Sliders, Maximize2, Zap, Target, PanelLeftClose, PanelLeft, RotateCcw, MoveHorizontal, MoveVertical } from 'lucide-react';
import DualRangeSlider from './DualRangeSlider';

export interface LayerVisibility {
  clouds: boolean;
  objects: boolean;
  nodes: boolean;
  heatmaps?: boolean;
  forces?: boolean;
  references?: boolean;
  relations: boolean;
  [key: string]: boolean | undefined;
}

interface ControlPanelProps {
  layerVisibility: LayerVisibility;
  setLayerVisibility: React.Dispatch<React.SetStateAction<LayerVisibility>>;
  spatialRange: [number, number];
  setSpatialRange: (range: [number, number]) => void;
  energyRange: [number, number];
  setEnergyRange: (range: [number, number]) => void;
  onFitViewToSelection: () => void;
  onResetScales?: () => void;
  scaleX: number;
  scaleY: number;
  onZoomAxis: (axis: 'x' | 'y', scale: number) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  layerVisibility,
  setLayerVisibility,
  spatialRange,
  setSpatialRange,
  energyRange,
  setEnergyRange,
  onFitViewToSelection,
  onResetScales,
  scaleX,
  scaleY,
  onZoomAxis
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Logarithmic mapping for the zoom sliders: slider position p ∈ [0,100]
  // ↔ zoom ∈ [0.5, 30], so low zooms (the most-used range) get fine control.
  const ZOOM_MIN = 0.5, ZOOM_MAX = 30;
  const pToZoom = (p: number) => ZOOM_MIN * Math.pow(ZOOM_MAX / ZOOM_MIN, p / 100);
  const zoomToP = (z: number) => Math.round(100 * Math.log(z / ZOOM_MIN) / Math.log(ZOOM_MAX / ZOOM_MIN));

  const toggleLayer = (layerKey: keyof LayerVisibility) => {
    setLayerVisibility(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  const resetSpatialRange = () => {
    setSpatialRange([-35, 26]);
  };

  const resetEnergyRange = () => {
    setEnergyRange([-24, 28]);
  };

  // If collapsed, render a sleek trigger button
  if (isCollapsed) {
    return (
      <div className="absolute top-16 left-6 z-20">
        <button
          onClick={() => setIsCollapsed(false)}
          className="flex items-center gap-1.5 px-3 py-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur border border-slate-300 dark:border-slate-600 rounded shadow-md text-slate-800 dark:text-slate-200 text-xs font-serif hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-95"
          title="展开过滤器与图层控制面板 (Expand Panel)"
        >
          <PanelLeft className="w-4 h-4 text-cyan-700 dark:text-cyan-400" />
          <span className="font-bold">标度过滤器</span>
        </button>
      </div>
    );
  }

  return (
    <div className="absolute top-16 left-6 z-20 w-72 bg-white/95 dark:bg-slate-800/95 backdrop-blur border border-slate-300 dark:border-slate-600 rounded shadow-md p-3.5 text-xs font-serif text-slate-800 dark:text-slate-200 space-y-3 animate-fade-in">
      {/* Title & Collapse Trigger */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-600 pb-2">
        <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
          双极标度过滤器 (Dual Range)
        </span>
        <button
          onClick={() => setIsCollapsed(true)}
          className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          title="收起面板 (Collapse Panel)"
        >
          <PanelLeftClose className="w-4 h-4" />
        </button>
      </div>

      {/* Layer Toggles */}
      <div className="space-y-1.5">
        <div 
          onClick={() => toggleLayer('clouds')}
          className="flex items-center justify-between p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-600"
        >
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 border border-purple-600 bg-purple-50 dark:bg-purple-900/50"></span>
            学科截断能域 (Sec I-VII)
          </span>
          {layerVisibility.clouds ? <Eye className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" /> : <EyeOff className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />}
        </div>

        <div 
          onClick={() => toggleLayer('objects')}
          className="flex items-center justify-between p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-600"
        >
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-900 dark:bg-blue-400"></span>
            基元研究对象与算子 (Points)
          </span>
          {layerVisibility.objects ? <Eye className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" /> : <EyeOff className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />}
        </div>

        <div 
          onClick={() => toggleLayer('nodes')}
          className="flex items-center justify-between p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-600"
        >
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rotate-45 bg-slate-900 dark:bg-slate-300 border border-slate-700 dark:border-slate-400"></span>
            n-Leg 重点课题节点 (Nodes)
          </span>
          {layerVisibility.nodes ? <Eye className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" /> : <EyeOff className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />}
        </div>

        <div 
          onClick={() => toggleLayer('heatmaps')}
          className="flex items-center justify-between p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-600"
        >
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600"></span>
            相互作用 2D 场热力图 (Heatmaps)
          </span>
          {layerVisibility.heatmaps !== false ? <Eye className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" /> : <EyeOff className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />}
        </div>

        <div
          onClick={() => toggleLayer('forces')}
          className="flex items-center justify-between p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-600"
        >
          <span className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-cyan-600 dark:bg-cyan-400"></span>
            相互作用特征程界线 (Forces)
          </span>
          {layerVisibility.forces !== false ? <Eye className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" /> : <EyeOff className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />}
        </div>

        <div
          onClick={() => toggleLayer('references')}
          className="flex items-center justify-between p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-600"
        >
          <span className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-amber-600 dark:bg-amber-400"></span>
            参考线 (ℏc 对角线 / 室温 k_BT)
          </span>
          {layerVisibility.references !== false ? <Eye className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" /> : <EyeOff className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />}
        </div>

        <div 
          onClick={() => toggleLayer('relations')}
          className="flex items-center justify-between p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-600"
        >
          <span className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-red-600 dark:bg-red-400"></span>
            重整化 RG / 全息对偶流向
          </span>
          {layerVisibility.relations ? <Eye className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" /> : <EyeOff className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />}
        </div>
      </div>

      {/* Dual-Thumb Sliders */}
      <div className="border-t border-slate-200 dark:border-slate-600 pt-2.5 space-y-3">
        {/* Spatial Dual-Thumb Slider */}
        <div>
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
            <span className="flex items-center gap-1">
              <Maximize2 className="w-3 h-3 text-cyan-700 dark:text-cyan-400" /> 空间尺度范围 (Spatial):
            </span>
            <button
              onClick={resetSpatialRange}
              className="p-1 rounded text-slate-400 hover:text-cyan-700 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
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
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-pink-700 dark:text-pink-400" /> 能量标度范围 (Energy):
            </span>
            <button
              onClick={resetEnergyRange}
              className="p-1 rounded text-slate-400 hover:text-pink-700 dark:hover:text-pink-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              title="重置能量标度至全范围 [-24, 28]"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
          <DualRangeSlider
            minLimit={-24}
            maxLimit={28}
            minVal={energyRange[0]}
            maxVal={energyRange[1]}
            onChange={setEnergyRange}
            unit="eV"
            accentColor="#db2777"
          />
        </div>
      </div>

      {/* Per-Axis Zoom Sliders (independent X / Y) */}
      <div className="border-t border-slate-200 dark:border-slate-600 pt-2.5 space-y-3">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 dark:text-slate-300">
          <span className="flex items-center gap-1">
            <Sliders className="w-3 h-3 text-slate-600 dark:text-slate-400" /> 分轴缩放 (Per-Axis Zoom)
          </span>
          <button
            onClick={() => { onZoomAxis('x', 1); onZoomAxis('y', 1); }}
            className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            title="重置缩放至 1× (Reset Zoom)"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>

        {/* X-axis zoom */}
        <div>
          <div className="flex items-center justify-between text-[11px] mb-0.5">
            <span className="flex items-center gap-1 font-bold text-cyan-800 dark:text-cyan-300">
              <MoveHorizontal className="w-3 h-3" /> 横轴 L
            </span>
            <span className="font-mono text-slate-600 dark:text-slate-400 tabular-nums">{scaleX.toFixed(2)}×</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={zoomToP(scaleX)}
            onChange={e => onZoomAxis('x', pToZoom(Number(e.target.value)))}
            className="w-full h-1.5 cursor-pointer accent-cyan-700"
            title="横轴(长度标度)独立缩放 · Ctrl+滚轮=双轴 / Shift+Ctrl+滚轮=仅横轴"
          />
        </div>

        {/* Y-axis zoom */}
        <div>
          <div className="flex items-center justify-between text-[11px] mb-0.5">
            <span className="flex items-center gap-1 font-bold text-pink-800 dark:text-pink-300">
              <MoveVertical className="w-3 h-3" /> 纵轴 E
            </span>
            <span className="font-mono text-slate-600 dark:text-slate-400 tabular-nums">{scaleY.toFixed(2)}×</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={zoomToP(scaleY)}
            onChange={e => onZoomAxis('y', pToZoom(Number(e.target.value)))}
            className="w-full h-1.5 cursor-pointer accent-pink-700"
            title="纵轴(能量标度)独立缩放 · Alt+Ctrl+滚轮=仅纵轴"
          />
        </div>
      </div>

      {/* Action Button: Fit Viewport */}
      <div className="border-t border-slate-200 dark:border-slate-600 pt-2.5">
        <button
          onClick={onFitViewToSelection}
          className="w-full py-1.5 px-3 rounded bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 text-xs font-serif font-medium flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-98"
          title="将视野放大或平移以完全对齐左侧面板选定的标度区间"
        >
          <Target className="w-3.5 h-3.5 text-cyan-400 dark:text-cyan-600" />
          <span>将视野对齐至当前选定标度</span>
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
