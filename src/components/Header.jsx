import React from 'react';
import { BookOpen, FileText, Compass, Network, Sparkles } from 'lucide-react';
import { ACADEMIC_DOMAINS } from '../data/physicsData';

export default function Header({
  activeDomain,
  setActiveDomain,
  onOpenEquivalenceModal
}) {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 px-6 py-3 bg-white/90 backdrop-blur-md border-b border-slate-200 flex items-center justify-between shadow-sm">
      {/* Paper Title Header */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-slate-900 text-white flex items-center justify-center font-serif font-bold text-sm">
          PR
        </div>
        <div>
          <h1 className="text-sm font-bold font-serif text-slate-900 tracking-tight">
            全景物理学标度图谱与跨尺度拓扑流动矩阵
          </h1>
          <p className="text-[11px] font-mono text-slate-500">
            Physical Review Scale Space: Multi-Dimensional Energy-Length Mapping & Duality Topology
          </p>
        </div>
      </div>

      {/* Domain Section Selector */}
      <div className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded border border-slate-200 text-xs">
        <button
          onClick={() => setActiveDomain('all')}
          className={`px-2.5 py-1 rounded text-xs font-serif font-medium transition-all ${
            activeDomain === 'all'
              ? 'bg-white text-slate-900 shadow-sm border border-slate-300 font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          全图谱相图 (All)
        </button>
        {ACADEMIC_DOMAINS.map(d => (
          <button
            key={d.id}
            onClick={() => setActiveDomain(d.id)}
            className={`px-2 py-1 rounded text-[11px] font-serif transition-all ${
              activeDomain === d.id
                ? 'bg-slate-900 text-white font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            {d.code}
          </button>
        ))}
      </div>

      {/* Equivalence Modal & Journal Action */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenEquivalenceModal}
          className="px-3 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-serif font-medium flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Network className="w-3.5 h-3.5 text-purple-700" />
          <span>附录: 算符同构与跨标度形变</span>
        </button>
      </div>
    </header>
  );
}
