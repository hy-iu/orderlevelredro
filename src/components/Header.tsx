import React from 'react';
import { Network, Database, Sun, Moon } from 'lucide-react';
import { ACADEMIC_DOMAINS } from '../data/physicsData';

interface HeaderProps {
  activeDomain: string;
  setActiveDomain: (domain: string) => void;
  onOpenEquivalenceModal: () => void;
  onOpenParticleManager: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeDomain,
  setActiveDomain,
  onOpenEquivalenceModal,
  onOpenParticleManager,
  theme,
  onToggleTheme
}) => {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 px-6 py-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 flex items-center justify-between shadow-sm">
      {/* Paper Title Header */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center font-serif font-bold text-sm">
          PR
        </div>
        <div>
          <h1 className="text-sm font-bold font-serif text-slate-900 dark:text-slate-100 tracking-tight">
            全景物理学标度图谱与跨尺度拓扑流动矩阵
          </h1>
          <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            Physical Review Scale Space: Multi-Dimensional Energy-Length Mapping & Duality Topology
          </p>
        </div>
      </div>

      {/* Domain Section Selector */}
      <div className="hidden lg:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded border border-slate-200 dark:border-slate-700 text-xs">
        <button
          onClick={() => setActiveDomain('all')}
          className={`px-2.5 py-1 rounded text-xs font-serif font-medium transition-all ${
            activeDomain === 'all'
              ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm border border-slate-300 dark:border-slate-500 font-bold'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
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
                ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700'
            }`}
          >
            {d.code}
          </button>
        ))}
      </div>

      {/* Equivalence Modal & Backend Manager Action */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleTheme}
          className="p-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-sm transition-all"
          title={theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        <button
          onClick={onOpenParticleManager}
          className="px-3 py-1.5 rounded border border-sky-300 dark:border-sky-600 bg-sky-50 dark:bg-sky-900/40 hover:bg-sky-100 dark:hover:bg-sky-900/60 text-sky-900 dark:text-sky-200 text-xs font-serif font-medium flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Database className="w-3.5 h-3.5 text-sky-700 dark:text-sky-400" />
          <span>PDG 物理对象后台管理</span>
        </button>

        <button
          onClick={onOpenEquivalenceModal}
          className="px-3 py-1.5 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-serif font-medium flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Network className="w-3.5 h-3.5 text-purple-700 dark:text-purple-400" />
          <span>附录: 算符同构</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
