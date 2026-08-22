import React from 'react';
import { X, ExternalLink, ShieldCheck } from 'lucide-react';
import { BlockMath, AutoMathText } from './MathFormula';
import { PhysicsNode, ResearchRoute } from '../types/physics';

interface DetailDrawerProps {
  item: (PhysicsNode & ResearchRoute) | null;
  itemType: 'object' | 'node' | 'relation' | null;
  onClose: () => void;
  onSelectSubItem?: (itemId: string) => void;
}

export const DetailDrawer: React.FC<DetailDrawerProps> = ({
  item,
  itemType,
  onClose,
  onSelectSubItem
}) => {
  if (!item) return null;

  const formulaStr = item.specs?.lagrangian || item.formula || item.equation;

  return (
    <div className="absolute top-16 right-6 bottom-6 z-20 w-96 bg-white/95 dark:bg-slate-800/95 backdrop-blur border border-slate-300 dark:border-slate-600 rounded-lg shadow-xl p-5 flex flex-col justify-between overflow-y-auto font-serif text-slate-900 dark:text-slate-100 animate-fade-in">
      <div>
        {/* Academic Drawer Header */}
        <div className="flex items-start justify-between border-b border-slate-300 dark:border-slate-600 pb-3 mb-4">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                {item.type === 'theory'
                  ? 'Sec. Theoretical Formulation'
                  : item.type === 'method'
                  ? 'Sec. Experimental & Computational Method'
                  : itemType === 'object'
                  ? 'Sec. Physical Element Specification'
                  : 'Sec. Research Problem Node'}
              </span>
              {item.type === 'theory' && (
                <span className="px-1.5 py-0.2 bg-purple-100 text-purple-900 border border-purple-300 rounded text-[9px] font-mono font-bold">
                  具体理论
                </span>
              )}
              {item.type === 'method' && (
                <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded text-[9px] font-mono font-bold">
                  具体方法
                </span>
              )}
              {item.pdgCode && (
                <span className="px-1.5 py-0.2 bg-sky-100 text-sky-800 border border-sky-300 rounded text-[9px] font-mono font-bold flex items-center gap-1">
                  <ShieldCheck className="w-2.5 h-2.5" />
                  {item.pdgCode}
                </span>
              )}
            </div>
            <h2 className="text-base font-bold font-serif text-slate-900 dark:text-slate-100 leading-tight">
              {item.label || item.title || item.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Formula Display Box with KaTeX BlockMath */}
        {formulaStr && (
          <div className="mb-4 p-3 rounded bg-slate-50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100">
            <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mb-1 flex items-center justify-between border-b border-slate-200 dark:border-slate-600 pb-1">
              <span>Mathematical Operator / Lagrangian Density</span>
              <span>LaTeX Form</span>
            </div>
            <BlockMath math={formulaStr} className="py-2 text-sm" />
          </div>
        )}

        {/* Abstract & Annotation */}
        <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-4 p-3 bg-slate-100/70 dark:bg-slate-700/40 rounded border border-slate-200 dark:border-slate-600">
          <div className="font-bold text-slate-900 dark:text-slate-100 mb-1 text-[11px] font-mono uppercase">PDG Reference & Annotation:</div>
          {item.annotation || item.abstract || item.description}
        </div>

        {/* Quantified Scale Parameters */}
        {item.specs && (
          <div className="space-y-2 mb-4">
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase font-mono tracking-wide border-b border-slate-200 dark:border-slate-600 pb-1">
              Quantified Scale & Decay Parameters
            </h3>
            <div className="space-y-1.5 text-xs">
              {item.specs.length && (
                <div className="flex items-center justify-between p-1.5 rounded bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600">
                  <span className="text-slate-600 dark:text-slate-400 font-mono text-[11px]">Spatial Scale / Radius (L):</span>
                  <AutoMathText text={item.specs.length} className="font-mono text-slate-900 dark:text-slate-100 font-bold" />
                </div>
              )}
              {item.specs.energy && (
                <div className="flex items-center justify-between p-1.5 rounded bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600">
                  <span className="text-slate-600 dark:text-slate-400 font-mono text-[11px]">Characteristic Energy (E):</span>
                  <AutoMathText text={item.specs.energy} className="font-mono text-slate-900 dark:text-slate-100 font-bold" />
                </div>
              )}
              {item.specs.decayWidth && (
                <div className="flex items-center justify-between p-1.5 rounded bg-red-50/70 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
                  <span className="text-red-700 dark:text-red-400 font-mono text-[11px]">Decay Width (Γ):</span>
                  <AutoMathText text={item.specs.decayWidth} className="font-mono text-red-900 dark:text-red-300 font-bold" />
                </div>
              )}
              {item.specs.time && (
                <div className="flex items-center justify-between p-1.5 rounded bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600">
                  <span className="text-slate-600 dark:text-slate-400 font-mono text-[11px]">Lifetime / Relaxation (τ):</span>
                  <AutoMathText text={item.specs.time} className="font-mono text-slate-900 dark:text-slate-100 font-bold" />
                </div>
              )}
              {/* 其余 specs 键（mass、radius、temperature 等）通用渲染 */}
              {Object.entries(item.specs)
                .filter(([k, v]) => v && !['length', 'energy', 'decayWidth', 'time', 'lagrangian'].includes(k))
                .map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between p-1.5 rounded bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600">
                    <span className="text-slate-600 dark:text-slate-400 font-mono text-[11px]">{k}:</span>
                    <AutoMathText text={v as string} className="font-mono text-slate-900 dark:text-slate-100 font-bold" />
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Data Provenance: 坐标/误差棒来源与约定 */}
        {(item.source || item.coordsNote || item.errorBarType) && (
          <div className="space-y-1 mb-4 p-2 rounded bg-sky-50/60 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 text-[10px] font-mono text-sky-900 dark:text-sky-300">
            <div className="font-bold uppercase tracking-wide text-sky-700 dark:text-sky-400">Data Provenance</div>
            {item.source && <div>来源 (Source): {item.source}</div>}
            {item.errorBarType && (
              <div>
                误差棒 (Error Bar): {item.errorBarType === 'range' ? '文献范围（实线）' : item.errorBarType === 'estimate' ? '估计值 ±0.3 dex（虚线）' : '测量不确定度 / Γ 展宽'}
              </div>
            )}
            {item.coordsNote && <div>坐标约定: {item.coordsNote}</div>}
            {item.coordsMeta?.t !== undefined && <div>log₁₀(T/K) = {item.coordsMeta.t.toFixed(2)}</div>}
            {item.coordsMeta?.tau !== undefined && <div>log₁₀(τ/s) = {item.coordsMeta.tau.toFixed(2)}</div>}
          </div>
        )}

        {/* Multi-leg Bound Items */}
        {itemType === 'node' && item.legs && (
          <div className="space-y-2 mb-4">
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase font-mono tracking-wide border-b border-slate-200 dark:border-slate-600 pb-1">
              n-Leg Bound Physical States
            </h3>
            <div className="space-y-1">
              {item.legs.map(legId => (
                <button
                  key={legId}
                  onClick={() => onSelectSubItem && onSelectSubItem(legId)}
                  className="w-full text-left p-1.5 rounded bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 text-xs font-mono text-slate-800 dark:text-slate-200 flex items-center justify-between transition-all"
                >
                  <span>Linked State: {legId}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-slate-200 dark:border-slate-600 pt-3 text-[10px] text-slate-400 dark:text-slate-500 font-mono text-center">
        PDG Particle Physics Data Reference • APS Style
      </div>
    </div>
  );
};

export default DetailDrawer;
