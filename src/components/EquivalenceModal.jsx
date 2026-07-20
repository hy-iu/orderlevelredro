import React, { useState } from 'react';
import { X } from 'lucide-react';
import { BlockMath } from './MathFormula';

const EQUIVALENCE_CASES = [
  {
    id: 'case-dirac-schrodinger',
    title: 'A. 波动算符与自由/有效场方程演化 (Wave & Effective Field Equations)',
    subtitle: '同一形式的微扰动算符在量子场论、固态超晶格与流体黑洞中的同构变形',
    baseEquation: 'i\\hbar \\frac{\\partial \\psi}{\\partial t} = \\hat{H}\\psi',
    scales: [
      {
        scaleTitle: '微观基本粒子能标 (10⁻¹⁸ m / GeV)',
        form: 'i\\hbar \\gamma^\\mu \\partial_\\mu \\psi - m c \\psi = 0',
        physics: '自由电子/夸克的相对论狄拉克方程，包含自旋-轨道耦合与反粒子态。'
      },
      {
        scaleTitle: '介观固态莫尔晶格 (10⁻⁹ m / meV)',
        form: 'H_{\\text{eff}} = v_F (\\sigma_x p_x + \\sigma_y p_y) + U_{\\text{moiré}}(r)',
        physics: '魔角双层石墨烯中数万电子相干重叠，衍生出低能无质量狄拉克费米子能带。'
      },
      {
        scaleTitle: '极致密中子星/模拟声学黑洞 (10⁶ m)',
        form: '\\nabla^2 \\Psi - \\frac{1}{c_s^2} \\frac{\\partial^2 \\Psi}{\\partial t^2} = 0',
        physics: '超流体介质中的扰动声波，形式上完全同构于弯曲时空背景下的标量场波动方程。'
      }
    ]
  },
  {
    id: 'case-yang-mills',
    title: 'B. 杨-米尔斯 (Yang-Mills) 规范场的能标演化与涌现',
    subtitle: '微观夸克-胶子标准模型规范场与凝聚态“涌现规范场”的映射',
    baseEquation: '\\mathcal{L}_{YM} = -\\frac{1}{4} \\text{Tr}(F_{\\mu\\nu} F^{\\mu\\nu})',
    scales: [
      {
        scaleTitle: '高能粒子标度 (10⁻¹⁸ m - 10⁻¹⁵ m)',
        form: 'SU(3)_C \\otimes SU(2)_L \\otimes U(1)_Y',
        physics: '传递强相互作用的胶子与弱电规范玻色子（Yang-Mills 非阿贝尔规范场）。'
      },
      {
        scaleTitle: '凝聚态量子自旋液体 (10⁻⁹ m)',
        form: 'a_{\\mu} \\quad (\\text{Emergent } U(1) / SU(2) \\text{ Gauge Field})',
        physics: '自旋阻挫极度抑制长程磁有序，自发涌现出受新兴规范不变性支配的拓扑流体。'
      }
    ]
  },
  {
    id: 'case-ads-cft',
    title: 'C. AdS/CFT 全息引力-规范对偶字典 (Holographic Dictionary)',
    subtitle: 'd+1 维经典弯曲引力空间与 d 维强耦合量子场论的精确全息映射',
    baseEquation: 'Z_{\\text{bulk}}[g_{\\mu\\nu}] \\equiv \\left\\langle \\exp\\left( \\int d^d x \\, \\phi_0 T_{\\mu\\nu} \\right) \\right\\rangle_{\\text{CFT}}',
    scales: [
      {
        scaleTitle: 'Bulk 体空间 (d+1 维弯曲引力)',
        form: 'ds^2 = \\frac{R^2}{z^2} \\left( -f(z) dt^2 + d\\mathbf{x}^2 + \\frac{dz^2}{f(z)} \\right)',
        physics: '黑洞视界落体几何，额外的 z 维度在物理上严格对应于量子理论的“能标（Energy Scale）”。'
      },
      {
        scaleTitle: 'Boundary 边界 (d 维强耦合 QGP/夸克流体)',
        form: '\\frac{\\eta}{s} = \\frac{\\hbar}{4\\pi k_B} \\quad (\\text{Kovtun-Starinets-Son 剪切黏度极限})',
        physics: '强对撞产生的强耦合夸克-胶子等离子体，与全息黑洞流体力学界限完全等价。'
      }
    ]
  }
];

export default function EquivalenceModal({ isOpen, onClose }) {
  const [activeCase, setActiveCase] = useState(EQUIVALENCE_CASES[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in font-serif">
      <div className="w-full max-w-4xl max-h-[85vh] bg-white border border-slate-300 rounded-lg p-6 flex flex-col justify-between shadow-2xl text-slate-900">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-300 pb-3 mb-4">
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">Appendix A: Theoretical Operator Equivalence</span>
            <h2 className="text-base font-bold text-slate-900">
              跨标度物理模型与同构方程矩阵 (Cross-Scale Model Correspondence)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Case Tabs */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
          {EQUIVALENCE_CASES.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveCase(c)}
              className={`px-3 py-1.5 rounded text-xs font-serif transition-all ${
                activeCase.id === c.id
                  ? 'bg-slate-900 text-white font-bold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {c.title.split(' ')[0]} {c.title.split(' ')[1]}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded">
            <h3 className="text-sm font-bold text-slate-900 mb-1">{activeCase.title}</h3>
            <p className="text-xs text-slate-600 mb-2">{activeCase.subtitle}</p>
            <div className="p-2 bg-white text-slate-900 border border-slate-300">
              <div className="text-[10px] font-mono text-slate-400 mb-1 text-center">基元算符方程</div>
              <BlockMath math={activeCase.baseEquation} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {activeCase.scales.map((s, idx) => (
              <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded flex flex-col justify-between text-xs">
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-600 block mb-1">
                    {s.scaleTitle}
                  </span>
                  <div className="p-2 bg-white text-slate-900 border border-slate-200 mb-2 overflow-x-auto">
                    <BlockMath math={s.form} />
                  </div>
                </div>
                <p className="text-slate-700 text-[11px] leading-relaxed">
                  {s.physics}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-300 pt-3 mt-4 flex items-center justify-between text-xs text-slate-500 font-mono">
          <span>Physical Review Formalism Standard</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 text-white rounded hover:bg-slate-800 transition-all font-serif"
          >
            关闭回到主相图
          </button>
        </div>
      </div>
    </div>
  );
}
