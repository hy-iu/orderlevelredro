import {
  AcademicDomain,
  FundamentalForce,
  PhysicsNode,
  ResearchRoute,
  EquivalenceRelation,
  QuantumHardwareRoute
} from '../types/physics';

/**
 * Rigorous Physics Energy-Scale Data (PDG - Particle Data Group 2024/2026 Reference)
 * Includes Particle Uncertainties (Error Bars / Decay Widths) & Fundamental Force Ranges.
 */

export const ACADEMIC_DOMAINS: AcademicDomain[] = [
  {
    id: 'domain-qg-gut',
    name: 'I. 量子引力与大统一标度 (Planck & GUT Scale)',
    code: 'SEC-I',
    color: '#6b21a8', // Deep Purple
    bounds: { xMin: -35, xMax: -28, yMin: 14, yMax: 28 },
    eftCutoff: '\\Lambda_{\\text{Planck}} \\sim 10^{19} \\text{ GeV}',
    description: '引力与高阶规范相互作用在普朗克长度下强耦合。标准微扰量子场论失效，经典时空连续性中断。'
  },
  {
    id: 'domain-ew',
    name: 'II. 电弱对称性破缺与高能粒子标度 (Electroweak & HEP)',
    code: 'SEC-II',
    color: '#991b1b', // Deep Red
    bounds: { xMin: -20, xMax: -16, yMin: 8, yMax: 13 },
    eftCutoff: 'v_{\\text{EW}} \\approx 246 \\text{ GeV}',
    description: '自发对称性破缺（Higgs 机制）赋予基本粒子质量；QED/QCD 的微扰能标跑动区。'
  },
  {
    id: 'domain-hadron-nuclear',
    name: 'III. 强子结构与核物质标度 (Hadronic & Nuclear Phase)',
    code: 'SEC-III',
    color: '#c2410c', // Dark Orange
    bounds: { xMin: -16, xMax: -13, yMin: 6, yMax: 9 },
    eftCutoff: '\\Lambda_{\\text{QCD}} \\approx 200 \\text{ MeV}',
    description: '色禁闭相变、手征对称性破缺及强结合能核子-核子有效场论 (Chiral EFT)。'
  },
  {
    id: 'domain-amo-atomic',
    name: 'IV. 原子、束缚态与量子光学 (AMO & Bound States)',
    code: 'SEC-IV',
    color: '#0369a1', // Deep Blue
    bounds: { xMin: -11, xMax: -6, yMin: -2, yMax: 4 },
    eftCutoff: 'E_R = \\frac{\\hbar^2 k^2}{2m} \\sim \\text{eV - meV}',
    description: '电磁相互作用占主导，外层电子波函数重叠，多体量子相干与精密测量。'
  },
  {
    id: 'domain-condensed-matter',
    name: 'V. 强关联与拓扑凝聚态物态 (Condensed Matter & Emergence)',
    code: 'SEC-V',
    color: '#15803d', // Dark Green
    bounds: { xMin: -10, xMax: -3, yMin: -4, yMax: 1 },
    eftCutoff: 'E_F \\sim 1-10 \\text{ eV}, \\quad \\Delta_{\\text{gap}} \\sim 10^{-3} \\text{ eV}',
    description: '多体费米面重构、非费米液体行为、拓扑序、高温超导与莫尔超晶格能带工程。'
  },
  {
    id: 'domain-stat-complex',
    name: 'VI. 非平衡态统计与复杂性系统 (Statistical & Active Mechanics)',
    code: 'SEC-VI',
    color: '#b45309', // Amber
    bounds: { xMin: -5, xMax: 1, yMin: -3, yMax: 0 },
    eftCutoff: 'k_B T_{\\text{room}} \\approx 25.7 \\text{ meV}',
    description: '耗散体系、涨落定理、自驱动粒子相变及高维参数空间中的神经网络损失函数景像。'
  },
  {
    id: 'domain-cosmology',
    name: 'VII. 宇宙学与大尺度引力结构 (Cosmology & Astrophysics)',
    code: 'SEC-VII',
    color: '#4338ca', // Indigo
    bounds: { xMin: 9, xMax: 26, yMin: -4, yMax: 12 },
    eftCutoff: 'H_0 \\approx 67.4 \\text{ (km/s)/Mpc}',
    description: '极早期暴胀、CMB 背景各向异性、暗物质重子声学振荡 (BAO) 与广义相对论时空曲率。'
  }
];

// --- Fundamental Interaction Force Ranges (PDG & Theoretical Limits) ---
export const FUNDAMENTAL_FORCES = [
  {
    id: 'force-strong',
    name: '强相互作用 (Strong Interaction / QCD)',
    carrier: 'Gluons (g) / Pions (π)',
    rangeLength: '1.4 \\times 10^{-15} \\text{ m (Confinement Range)}',
    rangeCoords: { xStart: -18, xEnd: -14.8, y: 8.5 },
    color: '#dc2626',
    description: '介导夸克与胶子结合，短距离受渐进自由控制，在 1.4 fm 以上受到强 QCD 色禁闭势阱截断。'
  },
  {
    id: 'force-weak',
    name: '弱相互作用 (Weak Electroweak Interaction)',
    carrier: 'W^\\pm, Z^0 \\text{ Bosons}',
    rangeLength: '2.0 \\times 10^{-18} \\text{ m (Short-Range Cutoff)}',
    rangeCoords: { xStart: -19.5, xEnd: -17.7, y: 11.0 },
    color: '#9333ea',
    description: '由高质量 W/Z 玻色子介导，由于玻色子静止质量限制，力程受到极端短程截断。'
  },
  {
    id: 'force-em',
    name: '电磁相互作用 (Electromagnetic Interaction / QED)',
    carrier: 'Photon (\\gamma, m_\\gamma = 0)',
    rangeLength: '\\infty \\text{ (Infinite Range, } V \\propto 1/r)',
    rangeCoords: { xStart: -12, xEnd: 25, y: 1.0 },
    color: '#0284c7',
    description: '由于光子无静止质量，力程为无限长，主导从原子、分子到凝聚态介观物态的一切作用。'
  },
  {
    id: 'force-gravity',
    name: '引力相互作用 (Gravitational Interaction / GR)',
    carrier: 'Graviton (g_{ \\mu\\nu }, m = 0)',
    rangeLength: '\\infty \\text{ (Infinite Range, } V \\propto 1/r)',
    rangeCoords: { xStart: -35, xEnd: 26, y: -3.5 },
    color: '#475569',
    description: '普遍存在于所有质能系统间，长程累积主导天体与宇宙演化；在普朗克标度展现极强量子引力效应。'
  }
];

// --- PDG Standard Model & Hadron Physics Reference Objects ---
const BASE_OBJECTS = [
  // Section I: Planck & GUT
  {
    id: 'obj-planck',
    label: 'Planck Mass (M_P)',
    pdgCode: 'PDG-QG-01',
    domainId: 'domain-qg-gut',
    coords: { x: -35, y: 28.08 },
    errorBar: null, // Precise fundamental constant cutoff
    symbol: 'M_P',
    type: 'fundamental',
    specs: {
      length: '1.6163 \\times 10^{-35} \\text{ m}',
      energy: '(1.2209 \\pm 0.0001) \\times 10^{19} \\text{ GeV}',
      time: '5.3912 \\times 10^{-44} \\text{ s}',
      lagrangian: 'S = \\int d^4x \\sqrt{-g} \\left[ \\frac{M_P^2}{2} R + \\mathcal{L}_m \\right]'
    },
    annotation: 'PDG 推荐常量：时空连续性上限截断；量子引力理论的特征能标。'
  },
  {
    id: 'obj-gut-boson',
    label: 'GUT X/Y Gauge Bosons',
    pdgCode: 'PDG-GUT-02',
    domainId: 'domain-qg-gut',
    coords: { x: -31, y: 25 },
    errorBar: { dx: 0.2, dy: 0.2 }, // GUT symmetry breaking energy range
    symbol: 'X, Y',
    type: 'fundamental',
    specs: {
      length: '10^{-31} \\text{ m}',
      energy: '10^{16} \\text{ GeV}',
      time: '10^{-40} \\text{ s}',
      lagrangian: '\\mathcal{L}_{GUT} \\supset -\\frac{1}{4} \\text{Tr}(F_{\\mu\\nu} F^{\\mu\\nu})'
    },
    annotation: '大统一 SU(5)/SO(10) 假设规范介子，介导重子数不守恒与质子衰变。'
  },

  // Section II: Electroweak & HEP (Full Standard Model Elementary Particles Suite)
  // --- Fundamental Scalar Boson ---
  {
    id: 'obj-higgs',
    label: 'Higgs Boson (h⁰)',
    pdgCode: 'PDG-SM-H0',
    domainId: 'domain-ew',
    coords: { x: -17.80, y: 11.098 },
    errorBar: { dx: 0.000011, dy: 0.000011 }, // PDG Decay Width \Gamma_h = 3.2 MeV -> dy = \Gamma / (E ln10)
    symbol: 'h^0',
    type: 'fundamental',
    specs: {
      length: '1.57 \\times 10^{-18} \\text{ m}',
      energy: '125.25 \\pm 0.17 \\text{ GeV}',
      decayWidth: '\\Gamma_h = 3.2_{-2.2}^{+2.8} \\text{ MeV}',
      time: '1.56 \\times 10^{-22} \\text{ s}',
      lagrangian: '\\mathcal{L} = |D_\\mu H|^2 - \\mu^2 |H|^2 - \\lambda |H|^4'
    },
    annotation: 'PDG 2024 精确推荐：标量希格斯玻色子，电弱自发对称性破缺 (SSB) 质量生成机制核心算符。'
  },

  // --- Fundamental Vector Gauge Bosons ---
  {
    id: 'obj-z-boson',
    label: 'Z⁰ Gauge Boson',
    pdgCode: 'PDG-SM-Z0',
    domainId: 'domain-ew',
    coords: { x: -17.67, y: 10.960 },
    errorBar: { dx: 0.01188, dy: 0.01188 }, // PDG Decay Width \Gamma_Z = 2.4952 GeV
    symbol: 'Z^0',
    type: 'fundamental',
    specs: {
      length: '2.16 \\times 10^{-18} \\text{ m}',
      energy: '91.1876 \\pm 0.0021 \\text{ GeV}',
      decayWidth: '\\Gamma_Z = 2.4952 \\pm 0.0023 \\text{ GeV}',
      time: '2.64 \\times 10^{-25} \\text{ s}',
      lagrangian: '\\mathcal{L}_{NC} = -\\frac{g}{2\\cos\\theta_W} \\bar{\\psi}\\gamma^\\mu (g_V - g_A\\gamma^5)\\psi Z_\\mu'
    },
    annotation: 'PDG 核心推荐：中性弱相互作用规范传播子，严格测定轻中微子代数为 3。'
  },
  {
    id: 'obj-w-boson',
    label: 'W± Gauge Boson',
    pdgCode: 'PDG-SM-W',
    domainId: 'domain-ew',
    coords: { x: -17.61, y: 10.905 },
    errorBar: { dx: 0.01126, dy: 0.01126 }, // PDG Decay Width \Gamma_W = 2.085 GeV
    symbol: 'W^\\pm',
    type: 'fundamental',
    specs: {
      length: '2.45 \\times 10^{-18} \\text{ m}',
      energy: '80.377 \\pm 0.012 \\text{ GeV}',
      decayWidth: '\\Gamma_W = 2.085 \\pm 0.042 \\text{ GeV}',
      time: '3.16 \\times 10^{-25} \\text{ s}',
      lagrangian: '\\mathcal{L}_{CC} = -\\frac{g}{\\sqrt{2}} \\bar{\\psi}_L \\gamma^\\mu W_\\mu^- \\psi_L + \\text{h.c.}'
    },
    annotation: 'PDG 核心推荐：带电弱流规范传播子，介导夸克 CKM 混合与轻子衰变。'
  },
  {
    id: 'obj-photon',
    label: 'Photon (γ)',
    pdgCode: 'PDG-SM-gamma',
    domainId: 'domain-ew',
    coords: { x: -9.71, y: 3.00 },
    errorBar: null,
    symbol: '\\gamma',
    type: 'fundamental',
    specs: {
      length: '\\infty \\text{ (Infinite Range)}',
      energy: 'm_\\gamma < 10^{-18} \\text{ eV}',
      time: '\\infty \\text{ (Stable)}',
      lagrangian: '\\mathcal{L}_{QED} = -\\frac{1}{4} F_{\\mu\\nu} F^{\\mu\\nu}'
    },
    annotation: 'PDG 推荐：无静止质量 QED 电磁规范玻色子，介导长程电磁相互作用。'
  },
  {
    id: 'obj-gluon',
    label: 'Gluon (g)',
    pdgCode: 'PDG-SM-g',
    domainId: 'domain-ew',
    coords: { x: -15.01, y: 8.30 },
    errorBar: null,
    symbol: 'g',
    type: 'fundamental',
    specs: {
      length: '1.4 \\times 10^{-15} \\text{ m (Confinement Scale)}',
      energy: 'm_g = 0 \\text{ (Theoretical)}',
      time: '\\text{Color Confined}',
      lagrangian: '\\mathcal{L}_{QCD} = -\\frac{1}{4} G_{\\mu\\nu}^a G^{a\\mu\\nu}'
    },
    annotation: 'PDG 推荐：SU(3)_c 强相互作用规范介子，具色荷度且在渐进自由下渐变禁闭。'
  },

  // --- Fundamental Quarks (6 Flavors) ---
  {
    id: 'obj-top-quark',
    label: 'Top Quark (t)',
    pdgCode: 'PDG-SM-t',
    domainId: 'domain-ew',
    coords: { x: -17.94, y: 11.237 },
    errorBar: { dx: 0.00357, dy: 0.00357 }, // PDG Decay Width \Gamma_t = 1.42 GeV
    symbol: 't',
    type: 'fundamental',
    specs: {
      length: '1.14 \\times 10^{-18} \\text{ m}',
      energy: '172.69 \\pm 0.30 \\text{ GeV}',
      decayWidth: '\\Gamma_t = 1.42 \\pm 0.19 \\text{ GeV}',
      time: '5.0 \\times 10^{-25} \\text{ s}',
      lagrangian: 'y_t \\bar{Q}_L \\tilde{H} t_R + \\text{h.c.}'
    },
    annotation: 'PDG 2024 精确推荐：最重基本轻/夸克，y_t ≈ 0.99，衰变快于强子化时间。'
  },
  {
    id: 'obj-bottom-quark',
    label: 'Bottom Quark (b)',
    pdgCode: 'PDG-SM-b',
    domainId: 'domain-ew',
    coords: { x: -16.33, y: 9.621 },
    errorBar: null,
    symbol: 'b',
    type: 'fundamental',
    specs: {
      length: '4.72 \\times 10^{-17} \\text{ m}',
      energy: '4.18 \\pm 0.03 \\text{ GeV}',
      time: '1.3 \\times 10^{-12} \\text{ s}',
      lagrangian: 'y_b \\bar{Q}_L H b_R'
    },
    annotation: 'PDG 推荐：第三代下型夸克，驱动 B 介子振荡与 CP 破坏精密测量。'
  },
  {
    id: 'obj-charm-quark',
    label: 'Charm Quark (c)',
    pdgCode: 'PDG-SM-c',
    domainId: 'domain-ew',
    coords: { x: -15.81, y: 9.104 },
    errorBar: null,
    symbol: 'c',
    type: 'fundamental',
    specs: {
      length: '1.55 \\times 10^{-16} \\text{ m}',
      energy: '1.27 \\pm 0.02 \\text{ GeV}',
      time: '1.0 \\times 10^{-12} \\text{ s}',
      lagrangian: 'y_c \\bar{Q}_L \\tilde{H} c_R'
    },
    annotation: 'PDG 推荐：第二代上型夸克，GIM 机制关键证实粒子。'
  },
  {
    id: 'obj-strange-quark',
    label: 'Strange Quark (s)',
    pdgCode: 'PDG-SM-s',
    domainId: 'domain-ew',
    coords: { x: -14.68, y: 7.970 },
    errorBar: null,
    symbol: 's',
    type: 'fundamental',
    specs: {
      length: '2.11 \\times 10^{-15} \\text{ m}',
      energy: '93.4 \\pm 8.6 \\text{ MeV}',
      time: '1.2 \\times 10^{-8} \\text{ s (K meson)}',
      lagrangian: 'y_s \\bar{Q}_L H s_R'
    },
    annotation: 'PDG 推荐：第二代下型夸克，具有奇异数量子数。'
  },
  {
    id: 'obj-up-quark',
    label: 'Up Quark (u)',
    pdgCode: 'PDG-SM-u',
    domainId: 'domain-ew',
    coords: { x: -13.04, y: 6.334 },
    errorBar: null,
    symbol: 'u',
    type: 'fundamental',
    specs: {
      length: '9.13 \\times 10^{-14} \\text{ m}',
      energy: '2.16 \\pm 0.49 \\text{ MeV}',
      time: '\\text{Stable in Hadron}',
      lagrangian: 'y_u \\bar{Q}_L \\tilde{H} u_R'
    },
    annotation: 'PDG 推荐：第一代最轻上型夸克 (Q=+2/3e)，构成核子最主干分量。'
  },
  {
    id: 'obj-down-quark',
    label: 'Down Quark (d)',
    pdgCode: 'PDG-SM-d',
    domainId: 'domain-ew',
    coords: { x: -13.37, y: 6.669 },
    errorBar: null,
    symbol: 'd',
    type: 'fundamental',
    specs: {
      length: '4.22 \\times 10^{-14} \\text{ m}',
      energy: '4.67 \\pm 0.48 \\text{ MeV}',
      time: '\\text{Stable in Hadron}',
      lagrangian: 'y_d \\bar{Q}_L H d_R'
    },
    annotation: 'PDG 推荐：第一代下型夸克 (Q=-1/3e)，与 u 夸克构成 SU(2) 同位旋基础。'
  },

  // --- Fundamental Leptons (6 Flavors) ---
  {
    id: 'obj-tau-lepton',
    label: 'Tau Lepton (τ⁻)',
    pdgCode: 'PDG-SM-tau',
    domainId: 'domain-ew',
    coords: { x: -15.96, y: 9.250 },
    errorBar: null,
    symbol: '\\tau^-',
    type: 'fundamental',
    specs: {
      length: '1.11 \\times 10^{-16} \\text{ m}',
      energy: '1776.86 \\pm 0.12 \\text{ MeV}',
      time: '(290.3 \\pm 0.5) \\times 10^{-15} \\text{ s}',
      lagrangian: 'm_\\tau \\bar{\\tau} \\tau'
    },
    annotation: 'PDG 推荐：第三代带电轻子，质量最大的轻子，可衰变为强子介子。'
  },
  {
    id: 'obj-muon',
    label: 'Muon (μ⁻)',
    pdgCode: 'PDG-SM-mu',
    domainId: 'domain-ew',
    coords: { x: -14.73, y: 8.024 },
    errorBar: null,
    symbol: '\\mu^-',
    type: 'fundamental',
    specs: {
      length: '1.87 \\times 10^{-15} \\text{ m}',
      energy: '105.658375 \\pm 0.000006 \\text{ MeV}',
      time: '(2.196981 \\pm 0.000005) \\times 10^{-6} \\text{ s}',
      lagrangian: 'm_\\mu \\bar{\\mu} \\mu'
    },
    annotation: 'PDG 推荐：第二代带电轻子，“二重电子”，精密检验 (g-2)_μ 反常磁矩。'
  },
  {
    id: 'obj-electron',
    label: 'Electron (e⁻)',
    pdgCode: 'PDG-SM-e',
    domainId: 'domain-ew',
    coords: { x: -12.41, y: 5.708 },
    errorBar: null,
    symbol: 'e^-',
    type: 'fundamental',
    specs: {
      length: '3.86 \\times 10^{-13} \\text{ m}',
      energy: '0.510998950 \\text{ MeV}',
      time: '> 6.6 \\times 10^{28} \\text{ 年}',
      lagrangian: 'm_e \\bar{e} e'
    },
    annotation: 'PDG 推荐：稳定第一代带电轻子，物质原子化学与宏观凝聚态基本构建基元。'
  },
  {
    id: 'obj-tau-neutrino',
    label: 'Tau Neutrino (ν_τ)',
    pdgCode: 'PDG-SM-nutau',
    domainId: 'domain-ew',
    coords: { x: -10.01, y: 3.300 },
    errorBar: null,
    symbol: '\\nu_\\tau',
    type: 'fundamental',
    specs: {
      length: '1.0 \\times 10^{-10} \\text{ m}',
      energy: '< 18.2 \\text{ MeV}',
      time: '\\text{Stable}',
      lagrangian: '\\bar{\\nu}_{\\tau L} i\\gamma^\\mu \\partial_\\mu \\nu_{\\tau L}'
    },
    annotation: 'PDG 推荐：第三代中性弱作用轻子，DONUT 实验测定发现。'
  },
  {
    id: 'obj-muon-neutrino',
    label: 'Muon Neutrino (ν_μ)',
    pdgCode: 'PDG-SM-numu',
    domainId: 'domain-ew',
    coords: { x: -8.01, y: 1.300 },
    errorBar: null,
    symbol: '\\nu_\\mu',
    type: 'fundamental',
    specs: {
      length: '1.0 \\times 10^{-8} \\text{ m}',
      energy: '< 0.17 \\text{ MeV}',
      time: '\\text{Stable}',
      lagrangian: '\\bar{\\nu}_{\\mu L} i\\gamma^\\mu \\partial_\\mu \\nu_{\\mu L}'
    },
    annotation: 'PDG 推荐：第二代中性弱作用轻子，长基线中微子震荡探测主体。'
  },
  {
    id: 'obj-electron-neutrino',
    label: 'Electron Neutrino (ν_e)',
    pdgCode: 'PDG-SM-nue',
    domainId: 'domain-ew',
    coords: { x: -6.41, y: -0.300 },
    errorBar: null,
    symbol: '\\nu_e',
    type: 'fundamental',
    specs: {
      length: '5.0 \\times 10^{-7} \\text{ m}',
      energy: '< 0.8 \\text{ eV (KATRIN 2024 Bound)}',
      time: '\\text{Stable}',
      lagrangian: '\\bar{\\nu}_{eL} i\\gamma^\\mu \\partial_\\mu \\nu_{eL}'
    },
    annotation: 'PDG 2024 精确上限：第一代中性轻子，KATRIN β 衰变测量限制质量小出 0.8 eV。'
  },

  // Section III: Hadronic & Nuclear Physics (PDG Hadron Spectrum)
  {
    id: 'obj-proton',
    label: 'Proton (p⁺)',
    pdgCode: 'PDG-HAD-p',
    domainId: 'domain-hadron-nuclear',
    coords: { x: -15.1, y: 8.972 },
    errorBar: null, // Stable particle (\tau > 10^34 yrs)
    symbol: 'p',
    type: 'composite',
    specs: {
      length: '0.8414 \\pm 0.0019 \\text{ fm (Charge Radius)}',
      energy: '938.272088 \\pm 0.000003 \\text{ MeV}',
      time: '> 10^{34} \\text{ 年 (PDG Limit)}',
      lagrangian: '\\mathcal{L}_{QCD} = \\bar{q}(i\\gamma^\\mu D_\\mu - m)q - \\frac{1}{4}G_{\\mu\\nu}^a G^{a\\mu\\nu}'
    },
    annotation: 'PDG 2024：稳态 (uud) 强子系统，电荷半径精准测定为 0.8414 fm。'
  },
  {
    id: 'obj-neutron',
    label: 'Neutron (n⁰)',
    pdgCode: 'PDG-HAD-n',
    domainId: 'domain-hadron-nuclear',
    coords: { x: -15.08, y: 8.973 },
    errorBar: null, // Long-lived bound hadron (\tau = 878.4 s)
    symbol: 'n',
    type: 'composite',
    specs: {
      length: '0.84 \\text{ fm}',
      energy: '939.565420 \\pm 0.000005 \\text{ MeV}',
      time: '878.4 \\pm 0.5 \\text{ s (Mean Lifetime)}',
      lagrangian: 'n \\to p + e^- + \\bar{\\nu}_e'
    },
    annotation: 'PDG 推荐：(udd) 中性强子，自由衰变平均寿命 878.4 秒。'
  },
  {
    id: 'obj-jpsi',
    label: 'J/ψ Meson (c c̄)',
    pdgCode: 'PDG-MES-Jpsi',
    domainId: 'domain-hadron-nuclear',
    coords: { x: -15.6, y: 9.49 },
    errorBar: null, // Very narrow resonance (\Gamma = 92.6 keV)
    symbol: 'J/\\psi',
    type: 'composite',
    specs: {
      length: '0.4 \\text{ fm}',
      energy: '3096.900 \\pm 0.006 \\text{ MeV}',
      decayWidth: '\\Gamma = 92.6 \\pm 1.7 \\text{ keV}',
      time: '7.1 \\times 10^{-21} \\text{ s}',
      lagrangian: 'c \\bar{c} \\text{ Bound State}'
    },
    annotation: '发现“魅夸克 (Charm)”的窄衰变宽度重夸克偶素键。'
  },
  {
    id: 'obj-pion',
    label: 'Pion (π⁺)',
    pdgCode: 'PDG-MES-pi',
    domainId: 'domain-hadron-nuclear',
    coords: { x: -15.3, y: 8.14 },
    errorBar: null, // Pseudo-Goldstone boson
    symbol: '\\pi^\\pm',
    type: 'composite',
    specs: {
      length: '0.66 \\text{ fm}',
      energy: '139.57039 \\pm 0.00018 \\text{ MeV}',
      time: '(2.6033 \\pm 0.0005) \\times 10^{-8} \\text{ s}',
      lagrangian: '\\mathcal{L}_{ChPT} = \\frac{f_\\pi^2}{4} \\text{Tr}(\\partial_\\mu U \\partial^\\mu U^\\dagger)'
    },
    annotation: '手征对称性破缺所衍生的伪 Goldstone 玻色子，介导长程核子间引力。'
  },
  {
    id: 'obj-qgp',
    label: 'Quark-Gluon Plasma (QGP)',
    pdgCode: 'PDG-PHASE-QGP',
    domainId: 'domain-hadron-nuclear',
    coords: { x: -14.5, y: 8.3 },
    errorBar: { dx: 0.5, dy: 0.15 }, // QGP phase deconfinement boundary span (1-10 fm)
    symbol: '\\text{QGP}',
    type: 'phase',
    specs: {
      length: '1 - 10 \\text{ fm}',
      energy: 'T_c \\approx 155 \\pm 5 \\text{ MeV}',
      time: '10^{-23} \\text{ s}',
      lagrangian: 'S_{EFT} \\implies \\frac{\\eta}{s} = \\frac{\\hbar}{4\\pi k_B}'
    },
    annotation: '强相互作用受热解除禁闭的近理想流体相（RHIC/LHC 观测）。'
  },

  // Section IV: AMO
  {
    id: 'obj-hydrogen',
    label: 'Hydrogen Atom (1s)',
    pdgCode: 'PDG-AMO-H',
    domainId: 'domain-amo-atomic',
    coords: { x: -10.28, y: 1.13 },
    errorBar: null, // Precise atomic bound state
    symbol: 'H',
    type: 'bound-state',
    specs: {
      length: 'a_0 = 0.5291772 \\text{ \\AA}',
      energy: '13.605693 \\text{ eV}',
      time: '1.52 \\times 10^{-16} \\text{ s}',
      lagrangian: 'H = \\frac{\\mathbf{p}^2}{2m} - \\frac{e^2}{4\\pi \\epsilon_0 r}'
    },
    annotation: '束缚态电磁有效量子力学的基准体系。'
  },
  {
    id: 'obj-rydberg',
    label: 'Rydberg State (n=50)',
    pdgCode: 'PDG-AMO-Ryd',
    domainId: 'domain-amo-atomic',
    coords: { x: -7.0, y: -2.3 },
    errorBar: { dx: 0.2, dy: 0.1 }, // Principal quantum manifold span
    symbol: '|n\\rangle',
    type: 'bound-state',
    specs: {
      length: 'r_n \\approx n^2 a_0 \\sim 130 \\text{ nm}',
      energy: 'E_n \\sim -5.4 \\text{ meV}',
      time: '\\tau \\propto n^3 \\sim 30 \\text{ \\mu s}',
      lagrangian: 'V_{ij} = \\frac{C_6}{|r_i - r_j|^6} \\quad (C_6 \\propto n^{11})'
    },
    annotation: '巨偶极矩与强范德华偶极封锁（Blockade）在量子中性原子阵列中的应用。'
  },
  {
    id: 'obj-attosecond',
    label: 'Attosecond XUV Pulse',
    pdgCode: 'PDG-AMO-Atto',
    domainId: 'domain-amo-atomic',
    coords: { x: -8.5, y: 1.6 },
    errorBar: { dx: 0.35, dy: 0.35 }, // Coherent pulse bandwidth window
    symbol: '\\tau_{\\text{atto}}',
    type: 'probe',
    specs: {
      length: '10 - 50 \\text{ nm}',
      energy: '20 - 100 \\text{ eV}',
      time: '43 \\text{ 阿秒 } (4.3 \\times 10^{-17} \\text{ s})',
      lagrangian: 'H_{int} = -\\mathbf{d} \\cdot \\mathbf{E}(t)'
    },
    annotation: '时间超高分辨相干探针，用于观察实空间电子电离与光学隧道效应。'
  },

  // Section V: Condensed Matter
  {
    id: 'obj-tb-graphene',
    label: 'Magic-Angle TBG (θ=1.08°)',
    pdgCode: 'PDG-CM-TBG',
    domainId: 'domain-condensed-matter',
    coords: { x: -8.1, y: -2.3 },
    errorBar: { dx: 0.1, dy: 0.1 }, // Flat band energy & moiré period span
    symbol: '\\text{MA-TBG}',
    type: 'quantum-material',
    specs: {
      length: 'L_M = 13.4 \\text{ nm (Moire Period)}',
      energy: 'W_{\\text{band}} \\sim 10 \\text{ meV}, \\quad T_c \\sim 1.7 \\text{ K}',
      time: '10^{-12} \\text{ s (relaxation)}',
      lagrangian: 'H_{\\text{BM}} = \\begin{pmatrix} v_F \\boldsymbol{\\sigma}\\cdot\\mathbf{p} & U(r) \\\\ U^\\dagger(r) & v_F \\boldsymbol{\\sigma}_\\theta\\cdot\\mathbf{p} \\end{pmatrix}'
    },
    annotation: '莫尔超晶格动能压制导致的强关联平带、关联绝缘相与超导相切换。'
  },
  {
    id: 'obj-ybco',
    label: 'Cuprate HTSC (YBCO)',
    pdgCode: 'PDG-CM-YBCO',
    domainId: 'domain-condensed-matter',
    coords: { x: -9.3, y: -1.7 },
    errorBar: { dx: 0.15, dy: 0.1 }, // Superconducting gap & coherence length span
    symbol: '\\ce{YBa2Cu3O_{7-x}}',
    type: 'quantum-material',
    specs: {
      length: '\\xi_{ab} \\approx 1.5 \\text{ nm}',
      energy: 'T_c = 93 \\text{ K}, \\quad \\Delta_0 \\approx 35 \\text{ meV}',
      time: '10^{-13} \\text{ s}',
      lagrangian: 'H_{t-J} = -P_S \\sum_{ij, \\sigma} t_{ij} c_{i\\sigma}^\\dagger c_{j\\sigma} P_S + J \\sum_{\\langle ij \\rangle} \\mathbf{S}_i \\cdot \\mathbf{S}_j'
    },
    annotation: '反铁磁 Mott 绝缘体经掺杂重构产生的 d 波非弱耦合配对超导体系。'
  },
  {
    id: 'obj-qsl',
    label: 'Quantum Spin Liquid (QSL)',
    pdgCode: 'PDG-CM-QSL',
    domainId: 'domain-condensed-matter',
    coords: { x: -9.6, y: -2.6 },
    errorBar: { dx: 0.2, dy: 0.15 }, // Fractionalized excitation energy continuum
    symbol: '\\text{QSL}',
    type: 'phase',
    specs: {
      length: 'a_0 \\approx 0.3 \\text{ nm}',
      energy: 'J \\sim 10-100 \\text{ meV}',
      time: 'T \\to 0 \\text{ K (No LRO)}',
      lagrangian: 'H = \\sum_{ij} K_{ij}^{\\gamma} S_i^\\gamma S_j^\\gamma \\quad (\\text{Kitaev Model})'
    },
    annotation: '阻挫几何下磁矩在零度不发生长程破缺，激发出带有马约拉纳数与分数自旋的连续态。'
  },

  // Section VI: Stat & Active
  {
    id: 'obj-active-particle',
    label: 'Active Self-Propelled Matter',
    pdgCode: 'PDG-STAT-ABP',
    domainId: 'domain-stat-complex',
    coords: { x: -5.0, y: -3.0 },
    errorBar: { dx: 0.3, dy: 0.2 }, // Non-equilibrium active phase boundary
    symbol: '\\text{ABP}',
    type: 'out-of-equilibrium',
    specs: {
      length: '1 \\text{ \\mu m} - 1 \\text{ mm}',
      energy: 'k_B T \\approx 2.57 \\times 10^{-2} \\text{ eV}',
      time: '0.1 - 10 \\text{ s}',
      lagrangian: 'm \\dot{\\mathbf{v}} = -\\gamma \\mathbf{v} + v_0 \\hat{\\mathbf{e}} + \\sqrt{2D_T} \\boldsymbol{\\xi}(t)'
    },
    annotation: '打破细致平衡（Detailed Balance）的非平衡相变与相分离 (MIPS)。'
  },

  // Section VII: Astro
  {
    id: 'obj-blackhole-m87',
    label: 'Supermassive BH (M87*)',
    pdgCode: 'PDG-ASTRO-BH',
    domainId: 'domain-cosmology',
    coords: { x: 13.3, y: -3.8 },
    errorBar: { dx: 0.023, dy: 0.047 }, // EHT Schwarzschild radius & mass measurement uncertainty
    symbol: '\\text{M87*}',
    type: 'astro-object',
    specs: {
      length: 'R_s = (1.9 \\pm 0.1) \\times 10^{13} \\text{ m}',
      energy: 'M = (6.5 \\pm 0.7) \\times 10^9 M_{\\odot}',
      time: 't_{\\text{horizon}} \\sim 6.3 \\times 10^4 \\text{ s}',
      lagrangian: 'ds^2 = -\\left(1 - \\frac{2GM}{r c^2}\\right) c^2 dt^2 + \\left(1 - \\frac{2GM}{r c^2}\\right)^{-1} dr^2 + r^2 d\\Omega^2'
    },
    annotation: 'EHT 直接实测黑洞影像；视界事件全息热力学（$S_{BH} = \\frac{k_B A}{4 \\ell_P^2}$）。'
  },
  {
    id: 'obj-cmb',
    label: 'CMB Decoupling Epoch',
    pdgCode: 'PDG-ASTRO-CMB',
    domainId: 'domain-cosmology',
    coords: { x: 26.0, y: -3.58 },
    errorBar: { dx: 0.2, dy: 0.1 }, // Acoustic horizon & photon decoupling span
    symbol: '\\text{CMB}',
    type: 'cosmological',
    specs: {
      length: '4.65 \\times 10^{26} \\text{ m (Particle Horizon)}',
      energy: 'T_{\\text{CMB}} = 2.72548 \\pm 0.00057 \\text{ K } (2.35 \\times 10^{-4} \\text{ eV})',
      time: 't_0 = 13.787 \\pm 0.020 \\text{ Gyr}',
      lagrangian: '\\frac{\\Delta T}{T}(\\hat{n}) = \\sum_{lm} a_{lm} Y_{lm}(\\hat{n})'
    },
    annotation: 'Planck 2018 精密解算：大爆炸后 38 万年光子退耦各向异性谱，原初暴胀量子涨落遗迹。'
  }
];

// --- GPT Reference Diagram Research Objects (Objects & Realized States) ---
export const ACADEMIC_OBJECTS_GPT_EXTENDED = [
  {
    id: 'obj-nucleus-dense',
    label: '原子核与致密核物质 (Nuclei & Dense Matter)',
    pdgCode: 'PDG-NUCL-01',
    domainId: 'domain-hadron-nuclear',
    coords: { x: -14.8, y: 7.5 },
    errorBar: { dx: 0.15, dy: 0.1 },
    symbol: 'A, n_{\\text{core}}',
    type: 'bound-state',
    specs: {
      length: '1.4 - 10 \\text{ fm}',
      energy: '8 \\text{ MeV/nucleon}',
      time: '10^{-20} \\text{ s}',
      lagrangian: 'V_{\\text{Yukawa}} = -g^2 \\frac{e^{-\\mu r}}{r}'
    },
    annotation: '强结合手征有效场论与中子星内部极端方程。'
  },
  {
    id: 'obj-atom-molecule-light',
    label: '原子、分子与光 (AMO & Light)',
    pdgCode: 'PDG-AMO-01',
    domainId: 'domain-amo-atomic',
    coords: { x: -9.5, y: 0.5 },
    errorBar: { dx: 0.2, dy: 0.1 },
    symbol: 'Atom, \\gamma',
    type: 'bound-state',
    specs: {
      length: '0.1 - 10 \\text{ nm}',
      energy: '1 - 10 \\text{ eV}',
      time: '10^{-15} \\text{ s (fs)}',
      lagrangian: 'H_{JC} = \\hbar \\omega a^\\dagger a + \\frac{1}{2} \\hbar \\omega_0 \\sigma_z + \\hbar g (a^\\dagger \\sigma_- + a \\sigma_+)'
    },
    annotation: '光子-原子光强偶极强耦合与腔量子电动力学 (Jaynes-Cummings)。'
  },
  {
    id: 'obj-precision-atomic-clock',
    label: '精密测量与原子钟 (Atomic Clocks)',
    pdgCode: 'PDG-AMO-CLOCK',
    domainId: 'domain-amo-atomic',
    coords: { x: -6.5, y: -1.0 },
    errorBar: { dx: 0.1, dy: 0.05 },
    symbol: '\\text{Sr}/\\text{Yb Clock}',
    type: 'probe',
    specs: {
      length: '1 - 100 \\text{ \\mu m}',
      energy: '10^{-15} \\text{ eV} \\quad (\\Delta \\nu / \\nu \\sim 10^{-18})',
      time: '10^{-6} \\text{ s (\\mu s)}',
      lagrangian: '\\delta f / f \\sim 10^{-19}'
    },
    annotation: '光晶格钟与量子频标，精确检验基本物理常数时间变异性及引力红移。'
  },
  {
    id: 'obj-electron-lattice',
    label: '电子晶格 (Electron Lattices)',
    pdgCode: 'PDG-CM-LAT',
    domainId: 'domain-condensed-matter',
    coords: { x: -9.0, y: -0.5 },
    errorBar: { dx: 0.1, dy: 0.1 },
    symbol: 'e^- \\text{Lattice}',
    type: 'quantum-material',
    specs: {
      length: '0.3 - 1 \\text{ nm}',
      energy: '1 - 5 \\text{ eV}',
      time: '10^{-14} \\text{ s}',
      lagrangian: 'H = -t \\sum c_i^\\dagger c_j + U \\sum n_{i\\uparrow} n_{i\\downarrow}'
    },
    annotation: '周期势场中布洛赫能带结构与能隙生成。'
  },
  {
    id: 'obj-strongly-correlated',
    label: '强关联电子 (Strongly Correlated e⁻)',
    pdgCode: 'PDG-CM-CORR',
    domainId: 'domain-condensed-matter',
    coords: { x: -8.5, y: -1.5 },
    errorBar: { dx: 0.15, dy: 0.1 },
    symbol: '\\text{Hubbard-}e',
    type: 'quantum-material',
    specs: {
      length: '1 - 10 \\text{ nm}',
      energy: '10 - 100 \\text{ meV}',
      time: '10^{-13} \\text{ s}',
      lagrangian: 'H_{Hubbard} = -t \\sum c_{i\\sigma}^\\dagger c_{j\\sigma} + U \\sum n_{i\\uparrow} n_{i\\downarrow}'
    },
    annotation: '库仑排斥能 U 胜过动能 t 引起的 Mott 绝缘体相变与非费米液体行为。'
  },
  {
    id: 'obj-spin-liquid-anyon',
    label: '自旋液体与任意子 (Spin Liquids & Anyons)',
    pdgCode: 'PDG-CM-ANYON',
    domainId: 'domain-condensed-matter',
    coords: { x: -8.0, y: -2.2 },
    errorBar: { dx: 0.1, dy: 0.1 },
    symbol: '\\text{QSL}, \\text{Anyon}',
    type: 'phase',
    specs: {
      length: '1 - 10 \\text{ nm}',
      energy: '1 - 10 \\text{ meV}',
      time: '10^{-9} \\text{ s}',
      lagrangian: 'H = J \\sum \\mathbf{S}_i \\cdot \\mathbf{S}_j + \\text{Topological Term}'
    },
    annotation: '涌现规范场、拓扑序与非阿贝尔编织（Braid Statistics）。'
  },
  {
    id: 'obj-plasma-turbulence',
    label: '等离子体与湍流 (Plasma & Turbulence)',
    pdgCode: 'PDG-STAT-TURB',
    domainId: 'domain-stat-complex',
    coords: { x: -2.0, y: -2.8 },
    errorBar: { dx: 0.2, dy: 0.1 },
    symbol: '\\text{MHD}',
    type: 'out-of-equilibrium',
    specs: {
      length: '1 \\text{ mm} - 1 \\text{ m}',
      energy: '10^{-3} - 1 \\text{ eV}',
      time: '10^{-3} \\text{ s (ms)}',
      lagrangian: '\\rho \\left( \\frac{\\partial \\mathbf{v}}{\\partial t} + \\mathbf{v} \\cdot \\nabla \\mathbf{v} \\right) = -\\nabla p + \\mathbf{J} \\times \\mathbf{B}'
    },
    annotation: '磁流体动力学 (MHD) 重联与非线性能量级联多尺度能谱。'
  },
  {
    id: 'obj-active-cell',
    label: '活性物质与细胞 (Active Cells)',
    pdgCode: 'PDG-STAT-BIO',
    domainId: 'domain-stat-complex',
    coords: { x: -4.5, y: -3.2 },
    errorBar: { dx: 0.2, dy: 0.1 },
    symbol: '\\text{Cell}',
    type: 'out-of-equilibrium',
    specs: {
      length: '10 \\text{ \\mu m} - 1 \\text{ mm}',
      energy: 'k_B T \\approx 25 \\text{ meV}',
      time: '1 - 10^3 \\text{ s}',
      lagrangian: '\\partial_t \\psi + \\nabla \\cdot (v_0 \\mathbf{p} \\psi) = D \\nabla^2 \\psi'
    },
    annotation: '非平衡耗散结构自驱动力学与细胞自组织涌现。'
  },
  {
    id: 'obj-primordial-blackhole',
    label: '原初黑洞与超大质量种子 (Primordial Black Holes & Seeds)',
    pdgCode: 'PDG-ASTRO-PBH',
    domainId: 'domain-cosmology',
    coords: { x: 10.5, y: -1.8 },
    errorBar: { dx: 0.2, dy: 0.1 },
    symbol: 'M_{\\text{PBH}}',
    type: 'astro-object',
    specs: {
      length: '10^{-15} - 10^{11} \\text{ m}',
      energy: 'M_{PBH} \\sim 10^{15} \\text{ g} - 10^5 M_\\odot',
      time: '10^{-20} \\text{ s} - 13.8 \\text{ Gyr}',
      lagrangian: 'M_{PBH} \\sim \\frac{c^3 t}{G}'
    },
    annotation: '原初暴胀阶段密度涨落坍缩形成的微型黑洞与暗物质/超大质量黑洞种子候选者。'
  },
  {
    id: 'obj-cosmic-inflaton',
    label: '原初暴胀标量场 (Cosmic Inflaton Field)',
    pdgCode: 'PDG-ASTRO-INFLATON',
    domainId: 'domain-qg-gut',
    coords: { x: -28.5, y: 21.0 },
    errorBar: { dx: 0.3, dy: 0.2 },
    symbol: 'V(\\phi)',
    type: 'fundamental',
    specs: {
      length: '10^{-30} \\text{ m (Compton Wavelength)}',
      energy: 'V(\\phi)^{1/4} \\sim 10^{16} \\text{ GeV}',
      time: '10^{-36} - 10^{-32} \\text{ s}',
      lagrangian: '\\mathcal{L}_{infl} = \\frac{1}{2}(\\partial_\\mu \\phi)^2 - V(\\phi)'
    },
    annotation: '驱动极早期宇宙超光速指数暴胀膨胀的慢滚标量场及量子涨落机制。'
  },
  {
    id: 'obj-galaxy-cosmic-structure',
    label: '星系与宇宙结构 (Galaxies & Cosmic Structures)',
    pdgCode: 'PDG-ASTRO-GAL',
    domainId: 'domain-cosmology',
    coords: { x: 25.5, y: -3.6 },
    errorBar: { dx: 0.2, dy: 0.1 },
    symbol: '\\text{Galaxies}',
    type: 'cosmological',
    specs: {
      length: '10^{21} - 10^{26} \\text{ m}',
      energy: 'E_{\\text{cosmo}} \\sim 2.7 \\text{ K}',
      time: '13.8 \\text{ Gyr (Cosmic Age)}',
      lagrangian: 'H^2 = \\frac{8\\pi G}{3}\\rho + \\frac{\\Lambda c^2}{3}'
    },
    annotation: '大尺度暗物质网格、星系演化与宇宙加速膨胀 (暗能量)。'
  }
];

export const ACADEMIC_RESEARCH_NODES_GPT_EXTENDED = [
  {
    id: 'node-quantum-gravity-bh',
    title: '量子引力 / 黑洞信息 (Quantum Gravity & Black Hole Info)',
    domainId: 'domain-qg-gut',
    coords: { x: -22.0, y: 20.0 },
    legs: ['obj-planck', 'obj-primordial-blackhole', 'obj-galaxy-cosmic-structure'],
    formula: 'S_{\\text{gen}} = \\frac{\\text{Area}(\\gamma)}{4G_N} + S_{\\text{bulk}}',
    abstract: '利用“岛屿假说 (Islands Formula)”与霍金辐射量子纠缠佩奇曲线，寻求广义相对论奇点与量子场幺正性演化的统一。'
  },
  {
    id: 'node-neutrino-origin-matter',
    title: '中微子与物质起源 (Neutrinos & Origin of Matter)',
    domainId: 'domain-ew',
    coords: { x: -17.5, y: 14.5 },
    legs: ['obj-higgs', 'obj-electron-neutrino'],
    formula: '\\mathcal{L} \\supset -y_\\nu \\bar{L} \\tilde{H} N_R - \\frac{1}{2} M_R \\bar{N}_R^c N_R',
    abstract: '探索轻子数不守恒与重子数不对称性（CPT/重子相干生成），解释为何可观测宇宙由物质主导而非反物质。'
  },
  {
    id: 'node-ion-cold-atom-arrays',
    title: '离子、冷原子阵列 (Ions & Cold Atom Arrays)',
    domainId: 'domain-amo-atomic',
    coords: { x: -3.5, y: 5.5 },
    legs: ['obj-precision-atomic-clock', 'obj-atom-molecule-light'],
    formula: 'H_{\\text{Rydberg}} = \\sum \\frac{\\Omega_i}{2} \\sigma_x^i - \\Delta_i n_i + \\sum_{i<j} V_{ij} n_i n_j',
    abstract: '利用里德伯态偶极封锁与囚禁离子电极，构建全连通的高保真度可编程量子比特多体阵列。'
  },
  {
    id: 'node-quantum-simulators-qubits',
    title: '量子模拟器 / 量子比特 (Quantum Simulators & Qubits)',
    domainId: 'domain-amo-atomic',
    coords: { x: 8.0, y: 4.0 },
    legs: ['obj-precision-atomic-clock', 'obj-electron-lattice', 'obj-spin-liquid-anyon'],
    formula: 'U(t) = \\exp\\left( -i \\int_0^t H_{\\text{sim}}(t\') dt\' \\right)',
    abstract: '利用高度可控的光晶格与超导电路模拟指数级 Hilbert 空间的强关联哈密顿量演化。'
  },
  {
    id: 'node-topological-fault-tolerant',
    title: '拓扑量子物态与容错 (Topological Matter & Fault Tolerance)',
    domainId: 'domain-condensed-matter',
    coords: { x: 18.0, y: 2.0 },
    legs: ['obj-spin-liquid-anyon', 'obj-strongly-correlated'],
    formula: 'H_{\\text{surface}} = -J_x \\sum A_p - J_z \\sum B_v',
    abstract: '利用分数量子霍尔效应与马约拉纳零能模（Zero Modes）进行编织，实现内嵌硬件容错的拓扑量子计算。'
  },
  {
    id: 'node-htsc-strange-metal',
    title: '高温超导 / 奇异金属 (HTSC & Strange Metals)',
    domainId: 'domain-condensed-matter',
    coords: { x: -5.0, y: -0.5 },
    legs: ['obj-strongly-correlated', 'obj-electron-lattice'],
    formula: '\\rho(T) \\propto T \\quad (\\text{Planckian Dissipation Rate } \\hbar/k_B T)',
    abstract: '解析超越费米液体理论的奇异金属线性电阻律、伪能隙相与高温超导铜氧化物/铁基配对机制。'
  },
  {
    id: 'node-quantum-thermalization',
    title: '量子热化 / 非平衡普遍性 (Quantum Thermalization)',
    domainId: 'domain-stat-complex',
    coords: { x: 2.0, y: -4.2 },
    legs: ['obj-plasma-turbulence', 'obj-strongly-correlated'],
    formula: '\\langle n | A | n \\rangle = A(\\bar{E}) + e^{-S(\\bar{E})/2} f_A(\\bar{E}, \\omega) R_{nn}',
    abstract: '本征态热化假设 (ETH)、多体局域化 (MBL) 与封闭量子孤立体系的动力学热平衡判定。'
  },
  {
    id: 'node-self-organization-life',
    title: '生命式自组织 (Life-like Self-Organization)',
    domainId: 'domain-stat-complex',
    coords: { x: 20.0, y: -2.5 },
    legs: ['obj-active-cell', 'obj-galaxy-cosmic-structure'],
    formula: '\\dot{\\rho} = -\\nabla \\cdot \\mathbf{J} + S(\\rho, \\nabla \\rho)',
    abstract: '研究非平衡态能量输入下从活性分子马达到细胞集聚、再到宏观宇宙大尺度结构的协同自组织律。'
  }
];

// --- Additional Specific Research Objects (具体研究对象) ---
export const ACADEMIC_OBJECTS_NEW = [
  // Sec I
  {
    id: 'obj-string-scale',
    label: '超弦与基本弦标度 (Fundamental Strings)',
    pdgCode: 'PDG-QG-STR',
    domainId: 'domain-qg-gut',
    coords: { x: -34.0, y: 27.5 },
    errorBar: null,
    symbol: '\\ell_s',
    type: 'fundamental',
    specs: {
      length: 'l_s = \\sqrt{\\alpha\'} \\sim 10^{-34} \\text{ m}',
      energy: 'M_s \\sim 10^{18} \\text{ GeV}',
      time: '10^{-43} \\text{ s}',
      lagrangian: 'S_{Nambu-Goto} = -T_s \\int d^2\\sigma \\sqrt{-\\det \\gamma_{ab}}'
    },
    annotation: '一维振动超弦基元，消去点粒子极性发散并自然导出无质量自旋-2 粒子（引力子）。'
  },
  {
    id: 'obj-primordial-gw',
    label: '原初引力波 (Primordial Gravitational Waves)',
    pdgCode: 'PDG-QG-PGW',
    domainId: 'domain-qg-gut',
    coords: { x: -30.0, y: 22.0 },
    errorBar: { dx: 0.3, dy: 0.2 },
    symbol: 'h_{\\mu\\nu}^{\\text{prim}}',
    type: 'probe',
    specs: {
      length: '10^{-30} \\text{ m (Horizon Cutoff)}',
      energy: 'E_{\\text{inf}} \\sim 10^{16} \\text{ GeV}',
      time: '10^{-36} \\text{ s}',
      lagrangian: 'h_{ij}\'\' + 2k h_{ij}\' + (k^2 + a^2 m^2) h_{ij} = 0'
    },
    annotation: '宇宙极早期暴胀时空量子张量涨落遗迹，以 CMB B 模偏振为直接观测印记。'
  },

  // Sec II
  {
    id: 'obj-axion-cdm',
    label: '轴子与超轻暗物质 (Axions & ALPs)',
    pdgCode: 'PDG-HEP-AXION',
    domainId: 'domain-ew',
    coords: { x: -19.5, y: 8.5 },
    errorBar: { dx: 0.4, dy: 0.3 },
    symbol: 'a',
    type: 'fundamental',
    specs: {
      length: '10^{-12} \\text{ m (Compton Wavelength)}',
      energy: 'm_a \\sim 10^{-5} \\text{ eV} - 1 \\text{ meV}',
      time: '> 10^{26} \\text{ s}',
      lagrangian: '\\mathcal{L}_a = \\frac{1}{2}(\\partial_\\mu a)^2 - \\frac{1}{2}m_a^2 a^2 + \\frac{g_{a\\gamma\\gamma}}{4} a F_{\\mu\\nu} \\tilde{F}^{\\mu\\nu}'
    },
    annotation: '解算强 CP 疑难的伪标度 Nambu-Goldstone 玻色子，冷暗物质（CDM）理想候选。'
  },
  {
    id: 'obj-sterile-neutrino',
    label: '惰性中微子 (Sterile Neutrinos / HNL)',
    pdgCode: 'PDG-HEP-STERILE',
    domainId: 'domain-ew',
    coords: { x: -18.5, y: 12.5 },
    errorBar: { dx: 0.3, dy: 0.3 },
    symbol: 'N_R',
    type: 'fundamental',
    specs: {
      length: '10^{-19} \\text{ m}',
      energy: 'M_N \\sim 1 \\text{ eV} - 100 \\text{ TeV}',
      time: '10^{-10} - 10^{20} \\text{ s}',
      lagrangian: '\\mathcal{L}_N = i \\bar{N}_R \\gamma^\\mu \\partial_\\mu N_R - \\frac{1}{2} M_R (\\bar{N}_R^c N_R + \\text{h.c.})'
    },
    annotation: '不参与电弱规范相互作用的单态费米子，跷跷板机制质量生成与暗物质载体。'
  },

  // Sec III
  {
    id: 'obj-exotic-hadron',
    label: '奇特多夸克态 (Tetraquarks & Pentaquarks)',
    pdgCode: 'PDG-HAD-EXOTIC',
    domainId: 'domain-hadron-nuclear',
    coords: { x: -15.8, y: 9.6 },
    errorBar: { dx: 0.1, dy: 0.05 },
    symbol: '\\text{X}(3872),\\, P_c',
    type: 'composite',
    specs: {
      length: '1.2 \\text{ fm}',
      energy: 'm_X = 3871.69 \\pm 0.17 \\text{ MeV}',
      decayWidth: '\\Gamma = 1.19 \\text{ MeV}',
      time: '10^{-21} \\text{ s}',
      lagrangian: 'T_{cc} / P_c^+ \\text{ Heavy Quarkonium Molecule}'
    },
    annotation: 'LHCb/BESIII 确证的超越传统 q\\bar{q} 与 qqq 的重味双夸克分子与五夸克束缚态。'
  },

  // Sec IV
  {
    id: 'obj-polar-molecule',
    label: '超冷极性分子 (Ultracold Polar Molecules)',
    pdgCode: 'PDG-AMO-MOL',
    domainId: 'domain-amo-atomic',
    coords: { x: -8.0, y: -1.5 },
    errorBar: { dx: 0.2, dy: 0.1 },
    symbol: '\\ce{NaK} / \\ce{KRb}',
    type: 'bound-state',
    specs: {
      length: '0.3 \\text{ nm}',
      energy: 'T_{\\text{deg}} \\sim 100 \\text{ nK } (10^{-10} \\text{ eV})',
      time: '1 - 100 \\text{ s}',
      lagrangian: 'H_{dd} = \\sum_{i<j} \\frac{\\mathbf{d}_i \\cdot \\mathbf{d}_j - 3(\\mathbf{d}_i \\cdot \\hat{r})(\\mathbf{d}_j \\cdot \\hat{r})}{r_{ij}^3}'
    },
    annotation: '具有长程各向异性偶极-偶极相互作用的量子各向异性分子超流体。'
  },
  {
    id: 'obj-exciton-polariton',
    label: '激子-极化介子凝色态 (Exciton-Polariton Condensate)',
    pdgCode: 'PDG-AMO-POLARITON',
    domainId: 'domain-amo-atomic',
    coords: { x: -7.5, y: 0.8 },
    errorBar: { dx: 0.15, dy: 0.1 },
    symbol: '\\psi_{\\text{pol}}',
    type: 'phase',
    specs: {
      length: '1 - 10 \\text{ \\mu m}',
      energy: 'E_{\\text{gap}} \\sim 1 - 10 \\text{ meV}',
      time: '10 - 100 \\text{ ps}',
      lagrangian: 'i\\hbar \\frac{\\partial \\psi}{\\partial t} = \\left( -\\frac{\\hbar^2 \\nabla^2}{2m^*} + g|\\psi|^2 + \\frac{i}{2}(P - \\gamma) \\right) \\psi'
    },
    annotation: '半导体微腔光子与电子-空穴激子强耦合形成的驱动耗散玻色-爱因斯坦凝聚态。'
  },

  // Sec V
  {
    id: 'obj-majorana-wire',
    label: '马约拉纳零能模拓扑线 (Majorana Zero Modes)',
    pdgCode: 'PDG-CM-MZM',
    domainId: 'domain-condensed-matter',
    coords: { x: -7.8, y: -3.0 },
    errorBar: { dx: 0.1, dy: 0.1 },
    symbol: '\\gamma_1, \\gamma_2',
    type: 'quantum-material',
    specs: {
      length: 'L_{\\text{wire}} \\sim 1 \\text{ \\mu m}',
      energy: '\\Delta_{\\text{top}} \\sim 100 \\text{ \\mu eV}',
      time: '> 1 \\text{ ms (Protected)}',
      lagrangian: 'H_{Kitaev} = -t \\sum c_i^\\dagger c_{i+1} + \\Delta \\sum c_i c_{i+1} + \\text{h.c.}'
    },
    annotation: '一维半导体自旋-轨道耦合纳米线与 s 波超导体异质结边界上的非阿贝尔马约拉纳束缚态。'
  },
  {
    id: 'obj-altermagnet',
    label: '胶替磁体 (Altermagnetic Materials)',
    pdgCode: 'PDG-CM-ALTER',
    domainId: 'domain-condensed-matter',
    coords: { x: -9.1, y: -1.0 },
    errorBar: { dx: 0.1, dy: 0.1 },
    symbol: '\\ce{RuO2} / \\ce{MnTe}',
    type: 'quantum-material',
    specs: {
      length: 'a_0 \\approx 0.4 \\text{ nm}',
      energy: 'E_{\\text{spin-split}} \\sim 0.1 - 1 \\text{ eV}',
      time: '10^{-14} \\text{ s}',
      lagrangian: 'H_k = v_F (k_x k_y \\sigma_z) + \\dots \\quad (d\\text{-wave Spin Splitting})'
    },
    annotation: '净磁化强度为零但在动量空间交替自旋分裂的三类磁结构物态。'
  },

  // Sec VI
  {
    id: 'obj-chiral-active-fluid',
    label: '手征活性流体 (Chiral Active Fluids)',
    pdgCode: 'PDG-STAT-CHIRAL',
    domainId: 'domain-stat-complex',
    coords: { x: -3.8, y: -2.0 },
    errorBar: { dx: 0.2, dy: 0.15 },
    symbol: '\\eta_{\\text{odd}}',
    type: 'out-of-equilibrium',
    specs: {
      length: '10 \\text{ \\mu m} - 1 \\text{ mm}',
      energy: 'k_B T \\approx 25.7 \\text{ meV}',
      time: '0.01 - 1.0 \\text{ s}',
      lagrangian: '\\sigma_{ij} = -p \\delta_{ij} + \\eta (\\partial_i v_j + \\partial_j v_i) + \\eta_{\\text{odd}} (\\epsilon_{ik}\\partial_k v_j + \\dots)'
    },
    annotation: '破缺时间反演与空间镜相对称性的自旋转微观粒子系综，展现奇数黏滞性（Odd Viscosity）。'
  },

  // Sec VII
  {
    id: 'obj-binary-neutron-star',
    label: '双中子星合并与 r-过程 (GW170817 BNS)',
    pdgCode: 'PDG-ASTRO-BNS',
    domainId: 'domain-cosmology',
    coords: { x: 14.5, y: -1.5 },
    errorBar: { dx: 0.2, dy: 0.1 },
    symbol: '\\text{NS-NS Merger}',
    type: 'astro-object',
    specs: {
      length: 'R \\approx 11 - 13 \\text{ km}',
      energy: 'E_{\\text{GW}} \\sim 0.025 M_\\odot c^2',
      time: '100 \\text{ s}',
      lagrangian: 'G_{\\mu\\nu} = \\frac{8\\pi G}{c^4} T_{\\mu\\nu}^{\\text{nuclear fluid}}'
    },
    annotation: 'LIGO/Virgo 首次电磁+引力波多信使确证，宇宙金、铀等重元素 r-过程慢中子捕获核合成源头。'
  }
];

// --- Additional Specific Theories (具体理论) ---
export const ACADEMIC_THEORIES_NEW = [
  {
    id: 'node-theory-lqg',
    title: '圈量子引力与自旋网络 (Loop Quantum Gravity & Spin Networks)',
    domainId: 'domain-qg-gut',
    type: 'theory',
    coords: { x: -33.5, y: 24.5 },
    legs: ['obj-planck', 'obj-string-scale'],
    formula: 'A = 8\\pi \\gamma \\ell_P^2 \\sum_i \\sqrt{j_i(j_i+1)}',
    abstract: '非微扰背景无关量子引力理论，将时空空间几何算符量子化为离散自旋网络（Spin Network）线与顶点。'
  },
  {
    id: 'node-theory-swampland',
    title: '弦论沼泽地猜想与有效边界 (Swampland Distance Conjecture)',
    domainId: 'domain-qg-gut',
    type: 'theory',
    coords: { x: -29.5, y: 17.5 },
    legs: ['obj-planck', 'obj-gut-boson'],
    formula: 'm(P) \\sim m(Q) \\exp(-\\alpha \\Delta d)',
    abstract: '判定自洽量子场论算符边界是否能嵌入量子引力（SUGRA/超弦）的数学与有效场论猜想体系。'
  },
  {
    id: 'node-theory-smeft',
    title: '标准模型有效场论 (SMEFT - SM Effective Field Theory)',
    domainId: 'domain-ew',
    type: 'theory',
    coords: { x: -18.8, y: 10.2 },
    legs: ['obj-higgs', 'obj-w-boson', 'obj-top-quark'],
    formula: '\\mathcal{L}_{SMEFT} = \\mathcal{L}_{SM} + \\sum_{i, d>4} \\frac{C_i^{(d)}}{\\Lambda^{d-4}} \\mathcal{O}_i^{(d)}',
    abstract: '无须假设新物理具体模型的模式自洽高阶维度微分算符展开，无缝对接 HEP 碰撞能量测定。'
  },
  {
    id: 'node-theory-seesaw',
    title: '跷跷板质量生成理论 (Seesaw Mechanism Type I-III)',
    domainId: 'domain-ew',
    type: 'theory',
    coords: { x: -16.8, y: 13.2 },
    legs: ['obj-electron-neutrino', 'obj-sterile-neutrino', 'obj-higgs'],
    formula: 'm_\\nu \\approx - m_D M_R^{-1} m_D^T',
    abstract: '利用重马约拉纳中微子能标 \\Lambda_{GUT} 自然解释超轻左手微子质量阶梯降落机制。'
  },
  {
    id: 'node-theory-lattice-qcd',
    title: '非微扰格点 QCD 理论 (Lattice QCD Quantum Field Theory)',
    domainId: 'domain-hadron-nuclear',
    type: 'theory',
    coords: { x: -15.5, y: 7.2 },
    legs: ['obj-proton', 'obj-gluon', 'obj-qgp'],
    formula: 'S_W[U] = \\beta \\sum_p \\left(1 - \\frac{1}{3} \\text{Re Tr} U_p \\right)',
    abstract: '在四维时空欧氏网格上离散规范与费米算符，通过蒙特卡洛泛函积分计算强子质量谱与色禁闭绝热势。'
  },
  {
    id: 'node-theory-chiral-eft',
    title: '手征有效场论核力理论 (Chiral Effective Field Theory χEFT)',
    domainId: 'domain-hadron-nuclear',
    type: 'theory',
    coords: { x: -13.8, y: 6.8 },
    legs: ['obj-pion', 'obj-proton', 'obj-nucleus-dense'],
    formula: '\\mathcal{L}_{\\chi EFT} = \\mathcal{L}_{\\pi\\pi}^{(2)} + \\mathcal{L}_{N\\pi}^{(1)} + \\mathcal{L}_{NN}^{(0)} + \\dots',
    abstract: '基于 QCD 手征对称性破缺伪 Goldstone 介子度规，高阶模计算强核子 NN 及 3N 结合算符。'
  },
  {
    id: 'node-theory-cavity-qed',
    title: '强耦合腔量子电动力学 (Cavity & Waveguide QED Theory)',
    domainId: 'domain-amo-atomic',
    type: 'theory',
    coords: { x: -9.8, y: 2.2 },
    legs: ['obj-hydrogen', 'obj-photon', 'obj-atom-molecule-light'],
    formula: 'H = \\hbar \\omega_c a^\\dagger a + \\frac{\\hbar \\omega_a}{2} \\sigma_z + \\hbar g (a^\\dagger \\sigma_- + a \\sigma_+)',
    abstract: '精准分析限制光场与单原子、人工超导比特间高 Q 值超强受控偶极作用。'
  },
  {
    id: 'node-theory-floquet',
    title: 'Floquet 周期驱动能带调控理论 (Floquet Band Engineering)',
    domainId: 'domain-amo-atomic',
    type: 'theory',
    coords: { x: -7.2, y: 3.2 },
    legs: ['obj-rydberg', 'obj-tb-graphene'],
    formula: 'H_F = i\\hbar \\frac{\\partial}{\\partial t} - H(t), \\quad H(t+T) = H(t)',
    abstract: '通过周期高频激光光场强扰动驱动原本平凡的能带结构相变为非平凡拓扑 Floquet-Bloch 态。'
  },
  {
    id: 'node-theory-topological-band',
    title: '拓扑能带理论与对称性保护序 (Topological Band Theory & SPT)',
    domainId: 'domain-condensed-matter',
    type: 'theory',
    coords: { x: -8.8, y: 0.2 },
    legs: ['obj-tb-graphene', 'obj-spin-liquid-anyon', 'obj-majorana-wire'],
    formula: 'C_1 = \\frac{1}{2\\pi} \\int_{\\text{BZ}} F_{xy}(\\mathbf{k}) d^2k',
    abstract: '用贝里曲率（Berry Curvature）积分、陈数 (Chern Number) 与 Z_2 不变量描述边缘态与无能隙边界激发现象。'
  },
  {
    id: 'node-theory-dmft',
    title: '动力学平均场强关联理论 (Dynamical Mean-Field Theory DMFT)',
    domainId: 'domain-condensed-matter',
    type: 'theory',
    coords: { x: -7.5, y: -1.8 },
    legs: ['obj-strongly-correlated', 'obj-ybco', 'obj-electron-lattice'],
    formula: 'G(i\\omega_n) = \\int d\\epsilon \\frac{D(\\epsilon)}{i\\omega_n + \\mu - \\Sigma(i\\omega_n) - \\epsilon}',
    abstract: '映射无穷维关联晶格为量子杂质模型，自洽捕捉 Mott 相变点前后的准粒子重能谱峰。'
  },
  {
    id: 'node-theory-syk',
    title: 'SYK 量子混沌理论 (Sachdev-Ye-Kitaev Model & Chaos Limit)',
    domainId: 'domain-condensed-matter',
    type: 'theory',
    coords: { x: -4.8, y: 1.2 },
    legs: ['obj-strongly-correlated', 'obj-blackhole-m87'],
    formula: 'H = \\frac{1}{4!} \\sum_{i,j,k,l=1}^N J_{ijkl} \\chi_i \\chi_j \\chi_k \\chi_l',
    abstract: '包含全连接无序马约拉纳费米子的可解多体系统，其里雅普诺夫指数饱和量子混沌普适上限 \\lambda_L = 2\\pi k_B T / \\hbar。'
  },
  {
    id: 'node-theory-stochastic-thermo',
    title: '随机热力学与涨落定理 (Stochastic Thermodynamics & Jarzynski)',
    domainId: 'domain-stat-complex',
    type: 'theory',
    coords: { x: -4.2, y: -3.5 },
    legs: ['obj-active-particle', 'obj-active-cell'],
    formula: '\\left\\langle e^{-\\beta W} \\right\\rangle = e^{-\\beta \\Delta F}',
    abstract: '针对单微粒与活性微米尺度非平衡轨迹热力学定义，推广 Clausius 不等式至任意远离平衡态涨落。'
  },
  {
    id: 'node-theory-mips',
    title: '运动诱导相分离理论 (Motility-Induced Phase Separation MIPS)',
    domainId: 'domain-stat-complex',
    type: 'theory',
    coords: { x: -2.8, y: -3.2 },
    legs: ['obj-active-particle', 'obj-chiral-active-fluid'],
    formula: 'v(\\rho) = v_0 (1 - \\gamma \\rho) \\implies \\frac{d p}{d \\rho} < 0',
    abstract: '没有任何排斥引力偶极势时，纯粹由于粒子自驱动速度被环境密度正反馈抑制所引发的非平衡气体-液体凝结。'
  },
  {
    id: 'node-theory-cosmo-pert',
    title: '原初宇宙学微扰理论 (Cosmological Perturbation Theory)',
    domainId: 'domain-cosmology',
    type: 'theory',
    coords: { x: 22.0, y: 6.0 },
    legs: ['obj-cmb', 'obj-primordial-blackhole', 'obj-galaxy-cosmic-structure'],
    formula: 'v_k\'\' + \\left( c_s^2 k^2 - \\frac{z\'\'}{z} \\right) v_k = 0',
    abstract: '推演极早期暴胀真空标量场量子涨落如何随膨胀被“拉扯”转化为今日百亿光年尺度星系网格根基。'
  },
  {
    id: 'node-theory-modified-gravity',
    title: '暗能量与修改引力理论 (f(R) Gravity & Dark Energy)',
    domainId: 'domain-cosmology',
    type: 'theory',
    coords: { x: 23.5, y: 0.5 },
    legs: ['obj-galaxy-cosmic-structure', 'obj-blackhole-m87'],
    formula: 'S = \\frac{1}{2\\kappa^2} \\int d^4x \\sqrt{-g} f(R) + S_m',
    abstract: '解析宇宙加速膨胀机制，探索宇宙学常数 \\Lambda 与红移曲率依赖大尺度引力修正的相容性。'
  }
];

// --- Additional Specific Methods (具体实验与计算方法) ---
export const ACADEMIC_METHODS_NEW = [
  {
    id: 'node-method-bootstrap',
    title: '散射振幅 Bootstrap 法 (S-Matrix Amplitude Bootstrap)',
    domainId: 'domain-qg-gut',
    type: 'method',
    coords: { x: -26.0, y: 24.0 },
    legs: ['obj-planck', 'obj-gut-boson'],
    formula: '\\text{Im } \\mathcal{A}(s, t) \\ge 0 \\implies \\text{Positivity Bounds}',
    abstract: '不依赖具体高能微扰求解，仅基于 Cauchy 积分、交叉对称性（Cross-Symmetry）与幺正性直接收束可观测量。'
  },
  {
    id: 'node-method-holographic-entropy',
    title: '全息纠缠 RT 曲面计算法 (Ryu-Takayanagi Entropy Calculation)',
    domainId: 'domain-qg-gut',
    type: 'method',
    coords: { x: -23.5, y: 16.5 },
    legs: ['obj-planck', 'obj-blackhole-m87', 'obj-qgp'],
    formula: 'S_A = \\frac{\\text{Area}(\\gamma_A)}{4G_N^{(d+1)}}',
    abstract: '在全息体（Bulk）几何中通过寻找极小面积曲面，精确计算边界量子场论子区域纠缠熵。'
  },
  {
    id: 'node-method-colliders',
    title: '极高亮度对撞机精密观测法 (HL-LHC & Future Circular Collider)',
    domainId: 'domain-ew',
    type: 'method',
    coords: { x: -17.2, y: 9.2 },
    legs: ['obj-higgs', 'obj-top-quark', 'obj-w-boson'],
    formula: 'L_{\\text{int}} = \\int L dt = 3000 \\text{ fb}^{-1}',
    abstract: '采用亚皮秒级极速径迹重建与多重热量计阵列，搜寻十亿分之一概率的反常 Higgs 耦合与新物理信号。'
  },
  {
    id: 'node-method-direct-dm',
    title: '深地液氙粒子偶发反冲探测法 (Deep Underground Xenon Detection)',
    domainId: 'domain-ew',
    type: 'method',
    coords: { x: -18.2, y: 6.5 },
    legs: ['obj-axion-cdm', 'obj-sterile-neutrino'],
    formula: '\\sigma_{\\text{SI}} < 10^{-47} \\text{ cm}^2',
    abstract: '利用千米岩石遮蔽极低本底地下实验室中的两相液氙双相时间投影室（TPC）记录电子与核反冲闪烁光 S1/S2。'
  },
  {
    id: 'node-method-eic-tomography',
    title: '电子-离子对撞硬深度散射断层成像 (EIC Hadron 3D Tomography)',
    domainId: 'domain-hadron-nuclear',
    type: 'method',
    coords: { x: -14.2, y: 8.8 },
    legs: ['obj-proton', 'obj-neutron', 'obj-gluon'],
    formula: 'f_{q/N}(x, k_T, \\mathbf{r}_T) \\quad (\\text{GPDs & TMDs})',
    abstract: '利用高能偏振电子与核子硬散射，绘制强子内部夸克与胶子的五维相空间 Wigner 运动分布图像。'
  },
  {
    id: 'node-method-heavyion-femto',
    title: '重离子飞秒干涉与各向异性流分析 (Heavy-Ion Anisotropic Flow v_n)',
    domainId: 'domain-hadron-nuclear',
    type: 'method',
    coords: { x: -13.2, y: 7.8 },
    legs: ['obj-qgp', 'obj-pion'],
    formula: '\\frac{dN}{d\\phi} = \\frac{N}{2\\pi} \\left( 1 + 2 \\sum_{n=1}^\\infty v_n \\cos[n(\\phi - \\Psi_n)] \\right)',
    abstract: '通过末态出射双介子 HBT 强度干涉与傅里叶谐波展开 v_2, v_3，重构极高强亚原子流体粘滞系数。'
  },
  {
    id: 'node-method-tweezer-manipulation',
    title: '光镊阵列单原子单分子寻址操纵术 (Optical Tweezer Single-Atom Assembly)',
    domainId: 'domain-amo-atomic',
    type: 'method',
    coords: { x: -8.8, y: 4.8 },
    legs: ['obj-hydrogen', 'obj-rydberg', 'obj-polar-molecule'],
    formula: '\\mathbf{F}_{grad} = \\frac{1}{2} \\alpha \\nabla |\\mathbf{E}|^2',
    abstract: '利用紧聚焦激光梯度力捕获单个中性原子，通过动态空间光调制器（SLM）实现无缺陷 2D/3D 自定义拓扑阵列重构。'
  },
  {
    id: 'node-method-optical-comb',
    title: '双光梳超高分辨率精密光谱测量法 (Dual Optical Frequency Comb Spectroscopy)',
    domainId: 'domain-amo-atomic',
    type: 'method',
    coords: { x: -6.8, y: -0.2 },
    legs: ['obj-precision-atomic-clock', 'obj-attosecond'],
    formula: 'f_n = f_{CEO} + n f_{rep}',
    abstract: '以锁相阿秒/飞秒脉冲序列在频域提供百万根超窄无齿梳齿，无须机械扫描实现微秒级宽带相干光谱探查。'
  },
  {
    id: 'node-method-nano-arpes',
    title: '微纳与时域角分辨光电子能谱 (Micro/Nano & Time-Resolved ARPES)',
    domainId: 'domain-condensed-matter',
    type: 'method',
    coords: { x: -9.5, y: -2.8 },
    legs: ['obj-tb-graphene', 'obj-ybco', 'obj-altermagnet'],
    formula: 'I(k, \\omega) = A(k, \\omega) f(\\omega) |M_{fi}|^2',
    abstract: '结合百纳米级聚焦光束与飞秒极紫外泵浦-探测，在实空间与实能域双重测定微区准粒子谱函数 A(k,\\omega)。'
  },
  {
    id: 'node-method-stm-qpi',
    title: '极低温 STM 准粒子干涉显微术 (Cryogenic STM & QPI Spectroscopy)',
    domainId: 'domain-condensed-matter',
    type: 'method',
    coords: { x: -6.5, y: -2.2 },
    legs: ['obj-majorana-wire', 'obj-ybco', 'obj-qsl'],
    formula: 'g(\\mathbf{r}, eV) \\equiv \\frac{dI}{dV}(\\mathbf{r}, V) \\propto N(\\mathbf{r}, eV)',
    abstract: '利用毫开尔文原子级探针遂穿电流测量单原子局域态密度 (LDOS)，依据杂质散射干涉涟漪波矢 q 映射全费米面。'
  },
  {
    id: 'node-method-nv-magnetometry',
    title: '金刚石 NV 色心单自旋量子磁测术 (Diamond NV Center Quantum Magnetometry)',
    domainId: 'domain-condensed-matter',
    type: 'method',
    coords: { x: -4.5, y: -1.2 },
    legs: ['obj-altermagnet', 'obj-strongly-correlated'],
    formula: 'B_{\\text{sens}} \\sim \\frac{\\hbar}{g \\mu_B \\sqrt{\\eta T_2^*}}',
    abstract: '利用金刚石内部单氮-空位缺陷自旋三态光检测磁共振（ODMR），在常温纳米尺度无损成像材料微弱超导及自旋流磁场。'
  },
  {
    id: 'node-method-sm-fret',
    title: '单分子荧光共振能量转移追踪法 (Single-Molecule FRET Spectroscopy)',
    domainId: 'domain-stat-complex',
    type: 'method',
    coords: { x: -5.5, y: -3.8 },
    legs: ['obj-active-cell', 'obj-active-particle'],
    formula: 'E_{FRET} = \\frac{1}{1 + (R / R_0)^6}',
    abstract: '利用近场无辐射偶极-偶极能量转移对 1-10 纳米距离敏感的特性，毫秒级实时定量记录单个蛋白质/DNA构象折叠涨落。'
  },
  {
    id: 'node-method-active-tracking',
    title: '活性粒子群体高通量 3D 显微追踪法 (High-Throughput 3D Active Tracking)',
    domainId: 'domain-stat-complex',
    type: 'method',
    coords: { x: -1.5, y: -3.5 },
    legs: ['obj-active-particle', 'obj-chiral-active-fluid'],
    formula: '\\langle [\\mathbf{r}(t+t_0) - \\mathbf{r}(t_0)]^2 \\rangle = 4 D_T t + 2 v_0^2 \\tau_R^2 \\dots',
    abstract: '全息全景数码显微成像实时重构上万个自驱动微米运动颗粒轨姿与取向矢量，精确解算多体涨落能谱。'
  },
  {
    id: 'node-method-multi-messenger',
    title: '多信使天文学联合观测法 (Multi-Messenger Astronomy Method)',
    domainId: 'domain-cosmology',
    type: 'method',
    coords: { x: 16.0, y: 3.5 },
    legs: ['obj-binary-neutron-star', 'obj-blackhole-m87'],
    formula: 'T_0^{\\text{GW}} \\leftrightarrow T_0^{\\text{Neutrino}} \\leftrightarrow T_0^{\\gamma\\text{-ray}}',
    abstract: '联合激光干涉引力波天文台 (LIGO/Virgo/KAGRA)、IceCube 深冰中微子望远镜与空间电磁波卫星网络实现源区同步捕捉。'
  },
  {
    id: 'node-method-bao-survey',
    title: '重子声学振荡与大红移星系巡天 (BAO & Galaxy Redshift Surveys)',
    domainId: 'domain-cosmology',
    type: 'method',
    coords: { x: 24.5, y: -2.0 },
    legs: ['obj-cmb', 'obj-galaxy-cosmic-structure'],
    formula: 'r_s = \\int_{z_d}^\\infty \\frac{c_s(z)}{H(z)} dz \\approx 147.5 \\text{ Mpc}',
    abstract: '以宇宙早期光子-重子声波拉伸的 147 Mpc 标准尺作为探针，利用数百万大红移星系光谱坐标测定宇宙暗能量状态方程 w(z)。'
  }
];

// --- Prominent Researchers & Nobel Labs Landmark Physics Objects (著名研究者与顶尖实验室研究对象) ---
export const ACADEMIC_OBJECTS_FAMOUS_LABS = [
  // Frank Wilczek
  {
    id: 'obj-time-crystal',
    label: '时间晶体 (Time Crystals & Floquet Order)',
    pdgCode: 'PDG-LAB-TC',
    domainId: 'domain-stat-complex',
    coords: { x: -5.8, y: -2.8 },
    errorBar: { dx: 0.15, dy: 0.1 },
    symbol: '\\ce{TC}',
    type: 'out-of-equilibrium',
    specs: {
      length: '1 - 10 \\text{ \\mu m}',
      energy: '\\hbar \\omega_{\\text{drive}} \\sim 1 - 100 \\text{ kHz}',
      time: 't_{\\text{break}} \\to \\infty \\quad (\\text{Subharmonic Oscillation})',
      lagrangian: 'H(t+T) = H(t), \\quad \\langle \\Psi(t+2T) | \\mathcal{O} | \\Psi(t+2T) \\rangle = \\langle \\Psi(t) | \\mathcal{O} | \\Psi(t) \\rangle'
    },
    annotation: 'Frank Wilczek 预言并被超导/冷原子实验确证的自发时间平移对称性破缺非平衡物态。'
  },
  {
    id: 'obj-anyon-statistics',
    label: '非阿贝尔任意子 (Non-Abelian Anyons & Braiding)',
    pdgCode: 'PDG-LAB-ANYON',
    domainId: 'domain-condensed-matter',
    coords: { x: -8.4, y: -2.5 },
    errorBar: { dx: 0.1, dy: 0.1 },
    symbol: 'e^{i\\theta}',
    type: 'phase',
    specs: {
      length: '10 - 100 \\text{ nm}',
      energy: 'E_{\\text{gap}} \\sim 0.1 - 1 \\text{ meV}',
      time: '10^{-9} \\text{ s}',
      lagrangian: '\\Psi(\\mathbf{r}_1, \\mathbf{r}_2) = e^{i\\theta} \\Psi(\\mathbf{r}_2, \\mathbf{r}_1)'
    },
    annotation: 'Wilczek 命名的二维分数量子交换统计基元，拓扑量子计算硬件编织核心。'
  },

  // Juan Maldacena
  {
    id: 'obj-traversable-wormhole',
    label: '可穿越虫洞与量子纠缠对偶 (Traversable Wormholes & ER=EPR)',
    pdgCode: 'PDG-LAB-ER-EPR',
    domainId: 'domain-qg-gut',
    coords: { x: -25.5, y: 19.0 },
    errorBar: null,
    symbol: '\\text{ER=EPR}',
    type: 'fundamental',
    specs: {
      length: 'r_g \\sim 10^{-35} - 10^3 \\text{ m}',
      energy: 'E_{\\text{teleport}} \\sim M_P c^2',
      time: 't_{\\text{traversable}} \\sim R/c',
      lagrangian: 'ds^2 = -f(r) dt^2 + \\frac{dr^2}{f(r)} + r^2 d\\Omega^2 + g_{t\\phi} dt d\\phi'
    },
    annotation: 'Maldacena & Susskind 提出的时空爱因斯坦-罗森桥与多体量子纠缠 EPR 对精确对偶论。'
  },

  // Mikhail Lukin / Immanuel Bloch
  {
    id: 'obj-rydberg-atom-array',
    label: '中性原子光镊阵列 (Rydberg Atom Arrays)',
    pdgCode: 'PDG-LAB-TWEEZER',
    domainId: 'domain-amo-atomic',
    coords: { x: -7.6, y: 4.2 },
    errorBar: { dx: 0.15, dy: 0.1 },
    symbol: '\\ce{^{87}Rb}',
    type: 'probe',
    specs: {
      length: 'd_{\\text{array}} \\approx 2 - 5 \\text{ \\mu m}',
      energy: 'V_{C6} \\sim 10 - 100 \\text{ MHz}',
      time: '\\tau \\sim 100 \\text{ \\mu s}',
      lagrangian: 'H = \\sum_i \\frac{\\Omega_i}{2} \\sigma_x^i - \\Delta_i n_i + \\sum_{i<j} V_{ij} n_i n_j'
    },
    annotation: 'Lukin (Harvard) 团队构建的 256 比特可编程中性原子多体量子模拟器。'
  },
  {
    id: 'obj-fermi-hubbard-gas',
    label: '光晶格超冷费米气体 (Fermi-Hubbard Quantum Gas)',
    pdgCode: 'PDG-LAB-FERMI-HUBBARD',
    domainId: 'domain-amo-atomic',
    coords: { x: -8.2, y: -0.8 },
    errorBar: { dx: 0.1, dy: 0.1 },
    symbol: '\\ce{^{40}K}',
    type: 'bound-state',
    specs: {
      length: 'a_{\\text{lat}} \\approx 532 \\text{ nm}',
      energy: 'U/t \\sim 1 - 20, \\quad T/T_F \\sim 0.05',
      time: '1 - 10 \\text{ s}',
      lagrangian: 'H = -t \\sum_{\\langle ij \\rangle, \\sigma} c_{i\\sigma}^\\dagger c_{j\\sigma} + U \\sum_i n_{i\\uparrow} n_{i\\downarrow}'
    },
    annotation: 'Bloch (MPQ Munich) 团队利用极低温光晶格模拟反铁磁与铜氧化物配对机制。'
  },

  // Subir Sachdev / Xiao-Gang Wen
  {
    id: 'obj-non-fermi-liquid',
    label: '无准粒子奇异金属相 (Non-Fermi Liquid & Strange Metal)',
    pdgCode: 'PDG-LAB-NFL',
    domainId: 'domain-condensed-matter',
    coords: { x: -8.6, y: -1.8 },
    errorBar: { dx: 0.1, dy: 0.1 },
    symbol: '\\chi_{\\text{NFL}}',
    type: 'phase',
    specs: {
      length: 'a_0 \\sim 0.4 \\text{ nm}',
      energy: '\\hbar / \\tau_{\\text{Planckian}} = k_B T',
      time: '\\tau \\approx 10^{-14} \\text{ s (Planckian Limit)}',
      lagrangian: '\\Sigma(\\omega) \\propto \\omega \\ln \\omega \\quad (\\text{Marginal Fermi Liquid})'
    },
    annotation: 'Sachdev (Harvard) 建立的缺乏单粒子准粒子描述、电阻随温度呈严格线性变化的普适临界态。'
  },
  {
    id: 'obj-topological-order-string',
    label: '拓扑序与弦网相凝态 (Topological Order & String-Net)',
    pdgCode: 'PDG-LAB-TOP-ORDER',
    domainId: 'domain-condensed-matter',
    coords: { x: -9.2, y: -2.2 },
    errorBar: { dx: 0.1, dy: 0.1 },
    symbol: '\\Phi_{\\text{net}}',
    type: 'phase',
    specs: {
      length: '1 - 10 \\text{ nm}',
      energy: '\\gamma_{\\text{top}} = \\ln D',
      time: 'T \\to 0 \\text{ K (Long-Range Entangled)}',
      lagrangian: 'S = \\int d^3x \\frac{k}{4\\pi} \\epsilon^{\\mu\\nu\\rho} a_\\mu \\partial_\\nu a_\\rho'
    },
    annotation: '文小刚 (MIT) 提出的超越 Landau 朗道对称破缺的拓扑长程量子纠缠与基态简并序。'
  },

  // Alain Aspect / Anton Zeilinger
  {
    id: 'obj-entangled-photons',
    label: '纠缠光子对与隐形传态 (Entangled Photons & Teleportation)',
    pdgCode: 'PDG-LAB-ENTANGLED-PHOTON',
    domainId: 'domain-amo-atomic',
    coords: { x: -9.2, y: 2.8 },
    errorBar: { dx: 0.1, dy: 0.1 },
    symbol: '|\\Psi^+\\rangle',
    type: 'probe',
    specs: {
      length: '10^3 - 10^6 \\text{ m}',
      energy: 'E_\\gamma \\sim 1 - 3 \\text{ eV}',
      time: '10^{-9} \\text{ s}',
      lagrangian: '|\\Psi^+\\rangle = \\frac{1}{\\sqrt{2}}(|H\\rangle|V\\rangle + |V\\rangle|H\\rangle)'
    },
    annotation: 'Aspect / Zeilinger 诺贝尔奖级 Bell 不等式非局域检验与自由空间量子隐形传态基元。'
  },

  // Anne L'Huillier / Ferenc Krausz
  {
    id: 'obj-hhg-attosecond-source',
    label: '阿秒高次谐波脉冲源 (High-Harmonic Generation Source)',
    pdgCode: 'PDG-LAB-HHG',
    domainId: 'domain-amo-atomic',
    coords: { x: -8.2, y: 2.0 },
    errorBar: { dx: 0.1, dy: 0.1 },
    symbol: '\\tau_{\\text{HHG}}',
    type: 'probe',
    specs: {
      length: '10 - 30 \\text{ nm}',
      energy: '20 - 150 \\text{ eV}',
      time: '43 \\text{ as } (4.3 \\times 10^{-17} \\text{ s})',
      lagrangian: 'I_{HHG} \\propto \\| \\mathcal{F}[d(t)] \\|^2'
    },
    annotation: 'L\'Huillier / Krausz 强场原子三步模型（隧道电离、加速、再碰撞光子再结合）阿秒辐射源。'
  },

  // Laurens Molenkamp
  {
    id: 'obj-hgte-qshi',
    label: 'HgTe 量子自旋霍尔绝缘体 (HgTe Quantum Spin Hall Insulator)',
    pdgCode: 'PDG-LAB-HGTE',
    domainId: 'domain-condensed-matter',
    coords: { x: -8.7, y: -0.3 },
    errorBar: { dx: 0.1, dy: 0.1 },
    symbol: '\\ce{HgTe}',
    type: 'quantum-material',
    specs: {
      length: 'd_{\\text{well}} \\approx 6.3 \\text{ nm}',
      energy: 'E_{\\text{gap}} \\approx 30 \\text{ meV}',
      time: '10^{-12} \\text{ s}',
      lagrangian: 'H_{BHZ}(k) = \\epsilon(k) + d_a(k) \\sigma_a'
    },
    annotation: 'Molenkamp / 张首晟 首次在实验中观测到具备螺旋无耗散边缘导电道的二维拓扑绝缘体。'
  },

  // Andrea Ghez / Reinhard Genzel
  {
    id: 'obj-sgra-blackhole',
    label: '银河系中心超大质量黑洞 (Supermassive BH Sgr A*)',
    pdgCode: 'PDG-LAB-SGRA',
    domainId: 'domain-cosmology',
    coords: { x: 13.0, y: -3.2 },
    errorBar: { dx: 0.05, dy: 0.05 },
    symbol: '\\text{Sgr A*}',
    type: 'astro-object',
    specs: {
      length: 'R_s = (1.2 \\pm 0.1) \\times 10^{10} \\text{ m}',
      energy: 'M = (4.15 \\pm 0.01) \\times 10^6 M_\\odot',
      time: 't_{\\text{orbit}} \\approx 16 \\text{ yrs (S2 Star)}',
      lagrangian: 'ds^2 = -\\left(1 - \\frac{r_s r}{\\rho^2}\\right) dt^2 + \\frac{\\rho^2}{\\Delta} dr^2 + \\rho^2 d\\theta^2 + \\dots'
    },
    annotation: 'Ghez / Genzel 团队通过 S2 恒星 20 年红移轨道跟踪确认的强引力黑洞视界。'
  },

  // Kip Thorne / Rainer Weiss
  {
    id: 'obj-gw150914-blackhole',
    label: '双黑洞合并引力波事件 (Binary Black Hole GW150914)',
    pdgCode: 'PDG-LAB-GW150914',
    domainId: 'domain-cosmology',
    coords: { x: 14.0, y: 4.5 },
    errorBar: { dx: 0.1, dy: 0.1 },
    symbol: '\\text{GW150914}',
    type: 'astro-object',
    specs: {
      length: 'r_{\\text{horizon}} \\sim 200 \\text{ km}',
      energy: 'E_{\\text{radiated}} = (3.0 \\pm 0.5) M_\\odot c^2',
      time: '0.2 \\text{ s}',
      lagrangian: 'h_{+, \\times}(t) = \\frac{1}{r} \\frac{4G}{c^4} \\ddot{I}_{jk}'
    },
    annotation: 'LIGO 实验室人类历史上首次直接探测到的双黑洞融合引力波涟漪信号。'
  },

  // Pablo Jarillo-Herrero
  {
    id: 'obj-moire-heterostructures',
    label: '莫尔超晶格层状异质结 (Moire Heterostructures)',
    pdgCode: 'PDG-LAB-MOIRE-HETERO',
    domainId: 'domain-condensed-matter',
    coords: { x: -7.9, y: -1.9 },
    errorBar: { dx: 0.1, dy: 0.1 },
    symbol: '\\ce{MoS2}/\\ce{WSe2}',
    type: 'quantum-material',
    specs: {
      length: 'L_{\\text{moire}} \\approx 10 - 20 \\text{ nm}',
      energy: 'W_{\\text{band}} \\sim 5 - 20 \\text{ meV}',
      time: '10^{-12} \\text{ s}',
      lagrangian: 'H_{eff} = H_{top} + H_{bottom} + T_{interlayer}(r)'
    },
    annotation: 'Jarillo-Herrero (MIT) 团队领衔的二维范德华过渡金属硫化物（TMD）层间电偶极与关联电子相。'
  },

  // Mikhail Eremets
  {
    id: 'obj-hydride-superconductor',
    label: '高压氢化物近室温超导体 (Room-Temp Hydride Superconductor)',
    pdgCode: 'PDG-LAB-HYDRIDE',
    domainId: 'domain-condensed-matter',
    coords: { x: -9.0, y: -1.3 },
    errorBar: { dx: 0.1, dy: 0.1 },
    symbol: '\\ce{LaH10}',
    type: 'quantum-material',
    specs: {
      length: 'a_0 \\approx 0.35 \\text{ nm}',
      energy: 'T_c \\approx 250 - 260 \\text{ K } (P \\sim 170 \\text{ GPa})',
      time: '10^{-13} \\text{ s}',
      lagrangian: 'H_{BCS} = \\sum_k \\epsilon_k c_k^\\dagger c_k - V \\sum_{k,k\'} c_{k\\uparrow}^\\dagger c_{-k\\downarrow}^\\dagger c_{-k\'\\downarrow} c_{k\'\\uparrow}'
    },
    annotation: 'Eremets (MPI Mainz) 团队在金刚石对顶砧（DAC）兆巴高压下发现的高声子频率近室温 BCS 强耦合超体。'
  }
];

// --- High-Potential Cutting-Edge Frontier Research Topics (高潜力前沿课题与突破理论) ---
export const ACADEMIC_FRONTIER_NODES_HIGH_POTENTIAL = [
  {
    id: 'node-fci-zero-field',
    title: '零磁场分数量子陈绝缘体 (Zero-Field Fractional Chern Insulators)',
    domainId: 'domain-condensed-matter',
    type: 'theory',
    coords: { x: -8.3, y: -1.2 },
    legs: ['obj-tb-graphene', 'obj-moire-heterostructures', 'obj-anyon-statistics'],
    formula: '\\nu = \\frac{p}{2q+1} \\quad (\\text{Zero External Field B=0})',
    abstract: '在莫尔扭角双层晶体中无需强磁场即可自发涌现分数量子霍尔效应与非阿贝尔任意子，拓扑量子计算硬件重大突破。'
  },
  {
    id: 'node-mipt-entanglement',
    title: '测量诱导相变与量子纠缠坍缩 (Measurement-Induced Phase Transitions MIPT)',
    domainId: 'domain-stat-complex',
    type: 'theory',
    coords: { x: -2.5, y: 3.5 },
    legs: ['obj-rydberg-atom-array', 'obj-entangled-photons'],
    formula: 'S_A(L) \\sim \\begin{cases} L & (p < p_c, \\text{ Volume Law}) \\\\ \\ln L & (p > p_c, \\text{ Area Law}) \\end{cases}',
    abstract: '研究随机量子线路中局域量子测量概率 p 竞争引发的纠缠熵从体积律（Volume Law）到面积律（Area Law）的普遍动力学相变。'
  },
  {
    id: 'node-islands-page-curve',
    title: '岛屿公式与黑洞霍金辐射 Page 曲线 (Islands Formula & Page Curve)',
    domainId: 'domain-qg-gut',
    type: 'theory',
    coords: { x: -26.5, y: 22.5 },
    legs: ['obj-planck', 'obj-traversable-wormhole', 'obj-sgra-blackhole'],
    formula: 'S(R) = \\min \\text{Ext} \\left[ \\frac{\\text{Area}(\\partial I)}{4G_N} + S_{\\text{semi-classical}}(R \\cup I) \\right]',
    abstract: '量子引力全息突破：证明霍金辐射熵在佩奇时间（Page Time）后严格下降，证实黑洞蒸发过程守护量子场算符幺正性。'
  },
  {
    id: 'node-quantum-biology-coherence',
    title: '量子生物学相干能输运与磁受体 (Quantum Coherence in Bio-Energy Transfer)',
    domainId: 'domain-stat-complex',
    type: 'theory',
    coords: { x: -4.5, y: -2.2 },
    legs: ['obj-active-cell', 'obj-entangled-photons'],
    formula: 'H_{FMO} = \\sum_i \\epsilon_i |i\\rangle\\langle i| + \\sum_{i\\neq j} J_{ij} |i\\rangle\\langle j| + H_{\\text{bath}}',
    abstract: '探查捕光复合物 FMO 中的常温长寿命量子相干激子输运及候鸟隐花色素（Cryptochrome）自旋自由基对磁受体。'
  },
  {
    id: 'node-fflo-pairing-altermagnet',
    title: '胶替磁体自旋流与有限动量 FFLO 配对 (Altermagnetic FFLO Superconductivity)',
    domainId: 'domain-condensed-matter',
    type: 'theory',
    coords: { x: -8.9, y: -0.6 },
    legs: ['obj-altermagnet', 'obj-ybco', 'obj-majorana-wire'],
    formula: '\\Delta(\\mathbf{r}) = \\Delta_0 e^{i \\mathbf{q} \\cdot \\mathbf{r}} \\quad (\\text{Finite-Momentum Cooper Pair})',
    abstract: '利用胶替磁体 d-波自旋分裂势场，在无宏观净磁场下诱导产生破缺空间平移对称性的库珀对有限动量配对相。'
  },
  {
    id: 'node-scrambling-many-body-scars',
    title: '量子信息乱序与多体量子疤痕 (Quantum Scrambling & Quantum Scars)',
    domainId: 'domain-amo-atomic',
    type: 'theory',
    coords: { x: -7.0, y: 5.2 },
    legs: ['obj-rydberg-atom-array', 'obj-non-fermi-liquid'],
    formula: 'OTOC(t) = \\langle [W(t), V(0)]^\\dagger [W(t), V(0)] \\rangle \\sim e^{\\lambda_L t}',
    abstract: '热化系统中非微扰本征态对遍历性的自发违背，展现出指数级信息乱序（Scrambling）与可周期复原的量子疤痕（Scars）。'
  },
  {
    id: 'node-axion-soliton-core',
    title: '超轻轴子暗物质孤子核与波相干 (Ultra-Light Axion Soliton Cores)',
    domainId: 'domain-ew',
    type: 'theory',
    coords: { x: -19.2, y: 7.2 },
    legs: ['obj-axion-cdm', 'obj-galaxy-cosmic-structure'],
    formula: 'i\\hbar \\frac{\\partial \\psi}{\\partial t} = -\\frac{\\hbar^2}{2m}\\nabla^2 \\psi + m V_{N} \\psi',
    abstract: '求解 Schrödinger-Poisson 系统，解释矮星系中心由德布罗意波相干干涉形成的 kpc 级量子孤子核相。'
  },
  {
    id: 'node-jwst-early-galaxy-anomalies',
    title: 'JWST 极高红移早期星系形成疑难 (JWST High-Redshift Early Galaxy Anomalies)',
    domainId: 'domain-cosmology',
    type: 'theory',
    coords: { x: 23.0, y: 8.5 },
    legs: ['obj-galaxy-cosmic-structure', 'obj-cmb', 'obj-primordial-blackhole'],
    formula: 'M_* > 10^{10} M_\\odot \\quad \\text{at } z > 10 \\quad (\\text{Challenging Standard } \\Lambda\\text{CDM})',
    abstract: '韦伯空间望远镜实测发现 z>10 极早期超高质量星系与暗物质种子异常，对经典 \\Lambda CDM 暴胀演化框架提出严峻挑战。'
  },
  {
    id: 'node-thermodynamic-ai-landscapes',
    title: '热力学 AI 与过参数化损失景像 (Thermodynamic AI & Loss Landscapes)',
    domainId: 'domain-stat-complex',
    type: 'theory',
    coords: { x: -1.2, y: -2.2 },
    legs: ['obj-active-particle', 'obj-time-crystal'],
    formula: 'd\\theta = -\\nabla L(\\theta) dt + \\sqrt{2 T_{eff}} dW_t',
    abstract: '运用统计物理多体临界相变与玻璃态副本对称性破缺 (RSB) 理论，解析深度学习神经网络过参数化超曲面泛化隐能景像。'
  }
];

// --- Quantum Computing Hardware & Physical Architecture Routes (量子计算物理硬件与架构路线) ---
export const QUANTUM_HARDWARE_ROUTES_OBJECTS = [
  {
    id: 'obj-transmon-qubit',
    label: '超导 Transmon 量子电路 (Superconducting Transmon Circuit)',
    pdgCode: 'PDG-QCOMP-TRANSMON',
    domainId: 'domain-condensed-matter',
    coords: { x: -7.2, y: -2.8 },
    errorBar: { dx: 0.1, dy: 0.1 },
    symbol: '\\text{Transmon}',
    type: 'quantum-material',
    specs: {
      length: '0.1 - 1 \\text{ mm}',
      energy: 'E_J/E_C \\gg 50, \\quad \\hbar \\omega_{01} \\sim 4 - 6 \\text{ GHz } (20 \\text{ \\mu eV})',
      time: 'T_1, T_2^* \\sim 100 - 300 \\text{ \\mu s}',
      lagrangian: 'H = 4 E_C (n - n_g)^2 - E_J \\cos \\phi'
    },
    annotation: '约瑟夫森结非线性电容并联结构，电荷噪声强鲁棒性超导量子处理器基石（IBM / Google Sycamore）。'
  },
  {
    id: 'obj-trapped-ion-crystal',
    label: '囚禁离子电离晶体 (Trapped-Ion Yb+/Ca+ Crystal)',
    pdgCode: 'PDG-QCOMP-ION',
    domainId: 'domain-amo-atomic',
    coords: { x: -6.8, y: 1.2 },
    errorBar: { dx: 0.1, dy: 0.1 },
    symbol: '\\ce{^{171}Yb^+} / \\ce{^{40}Ca^+}',
    type: 'bound-state',
    specs: {
      length: 'd_{\\text{ion}} \\approx 5 \\text{ \\mu m (Coulomb Crystal)}',
      energy: '\\Delta E_{\\text{hf}} \\approx 12.6 \\text{ GHz } (52 \\text{ \\mu eV})',
      time: 'T_1 > 1 \\text{ 小时}, \\quad T_2 \\sim 10 - 100 \\text{ s}',
      lagrangian: 'H_{MS} = \\frac{\\Omega}{2} \\sum_{i} \\left( \\sigma_+^i e^{i(\\eta (a+a^\\dagger) - \\delta t)} + \\text{h.c.} \\right)'
    },
    annotation: '射频 Paul 阱悬浮离域库仑晶体，全连通二比特 Mølmer-Sørensen 门保真度超 99.9%（Honeywell / IonQ）。'
  },
  {
    id: 'obj-silicon-spin-qubit',
    label: '同位素纯化硅自旋量子点 (Silicon-28 Quantum Dot Spin)',
    pdgCode: 'PDG-QCOMP-SILICON',
    domainId: 'domain-condensed-matter',
    coords: { x: -9.4, y: -1.5 },
    errorBar: { dx: 0.1, dy: 0.1 },
    symbol: '\\ce{^{28}Si/SiGe}',
    type: 'quantum-material',
    specs: {
      length: '30 - 50 \\text{ nm}',
      energy: 'E_Z = g \\mu_B B \\sim 100 \\text{ \\mu eV}',
      time: 'T_2^* \\sim 20 \\text{ \\mu s}, \\quad T_2^{\\text{CPMG}} \\sim 28 \\text{ ms}',
      lagrangian: 'H = g \\mu_B \\mathbf{B} \\cdot \\mathbf{S} + J(t) \\mathbf{S}_1 \\cdot \\mathbf{S}_2'
    },
    annotation: '利用同位素净化去除 29Si 核磁噪声，兼容 CMOS 工业微电子制程的半导体单自旋比特。'
  },
  {
    id: 'obj-bosonic-cat-qubit',
    label: '超导连续变量猫态玻色比特 (Bosonic Cat Qubit)',
    pdgCode: 'PDG-QCOMP-CAT',
    domainId: 'domain-condensed-matter',
    coords: { x: -7.5, y: -3.2 },
    errorBar: { dx: 0.1, dy: 0.1 },
    symbol: '|\\mathcal{C}_\\alpha^\\pm\\rangle',
    type: 'quantum-material',
    specs: {
      length: '1 - 10 \\text{ mm (3D Cavity)}',
      energy: '\\hbar \\omega_{\\text{cavity}} \\sim 5 \\text{ GHz}',
      time: 'T_{\\text{bit-flip}} > 10 \\text{ s (Exponential Suppression)}',
      lagrangian: 'H = -K (a^\\dagger)^2 a^2 + \\epsilon_2 (a^\\dagger)^2 + \\epsilon_2^* a^2'
    },
    annotation: '利用双光子驱动非线性克尔（Kerr）阻尼在无限维 Hilbert 空间中受拓扑保护的自动纠错猫态。'
  },
  {
    id: 'obj-photonic-boson-sampling',
    label: '集成光量子芯片与玻色取样 (Integrated Photonic Qubit)',
    pdgCode: 'PDG-QCOMP-PHOTONIC',
    domainId: 'domain-amo-atomic',
    coords: { x: -8.8, y: 1.8 },
    errorBar: { dx: 0.15, dy: 0.1 },
    symbol: '\\text{Jiuzhang}',
    type: 'probe',
    specs: {
      length: '10 - 100 \\text{ \\mu m (Silicon Waveguide)}',
      energy: 'E_\\gamma \\sim 1.55 \\text{ \\mu m } (0.8 \\text{ eV})',
      time: 't_{\\text{prop}} \\sim 1 \\text{ ns}',
      lagrangian: 'U \\in SU(N), \\quad P(n_1, \\dots, n_N) = \\frac{|\\text{Perm}(U_{s,t})|^2}{n_1! \\dots n_N!}'
    },
    annotation: '通过 100+ 模式超低损耗集成光路干涉仪与高效率单光子探测器阵列实现高维高斯玻色取样（九章/Xanadu）。'
  },
  {
    id: 'obj-solid-color-center',
    label: '固态色心与自旋-光子介面 (Diamond NV/SiV Center Nodes)',
    pdgCode: 'PDG-QCOMP-NV-SIV',
    domainId: 'domain-condensed-matter',
    coords: { x: -8.6, y: -0.9 },
    errorBar: { dx: 0.1, dy: 0.1 },
    symbol: '\\text{NV}^- / \\text{SiV}^-',
    type: 'quantum-material',
    specs: {
      length: '< 1 \\text{ nm}',
      energy: 'D_{\\text{gs}} = 2.87 \\text{ GHz}',
      time: 'T_2 > 1 \\text{ s (with 13C Register)}',
      lagrangian: 'H = D S_z^2 + g \\mu_B \\mathbf{B} \\cdot \\mathbf{S} + A \\mathbf{S} \\cdot \\mathbf{I}'
    },
    annotation: '结合自旋三态 ODMR 与近邻 13C 核自旋长寿命寄存器的分布式量子互联网硬件节点（QuTech/Harvard）。'
  }
];

export const QUANTUM_HARDWARE_ROUTES_NODES = [
  {
    id: 'node-route-superconducting',
    title: '超导量子计算路线 (Superconducting Circuit Quantum Processors)',
    domainId: 'domain-condensed-matter',
    type: 'theory',
    coords: { x: -6.8, y: -2.5 },
    legs: ['obj-transmon-qubit', 'obj-bosonic-cat-qubit', 'obj-tb-graphene'],
    formula: 'H = \\sum_i \\omega_i b_i^\\dagger b_i + \\sum_{i<j} g_{ij} (b_i^\\dagger b_j + b_i b_j^\\dagger)',
    abstract: '突破 100+ 比特高度可控约瑟夫森结网络、可变电感耦合器与三维微腔波色编码，推动相干时间与可扩展性协同增长。'
  },
  {
    id: 'node-route-trapped-ion',
    title: '囚禁离子与 QCCD 搬运路线 (Trapped-Ion & QCCD Architecture)',
    domainId: 'domain-amo-atomic',
    type: 'method',
    coords: { x: -6.5, y: 1.5 },
    legs: ['obj-trapped-ion-crystal', 'obj-precision-atomic-clock'],
    formula: 'U_{MS}(\\theta) = \\exp\\left( -i \\frac{\\theta}{4} \\sum_{i<j} \\sigma_x^i \\sigma_x^j \\right)',
    abstract: '利用长程库仑力和激光声子相干耦合实现全连通二比特逻辑门，配合表面电极微芯片实现离子全方位物理搬运。'
  },
  {
    id: 'node-route-neutral-atom',
    title: '中性原子光镊阵列路线 (Neutral-Atom Rydberg Tweezer Arrays)',
    domainId: 'domain-amo-atomic',
    type: 'method',
    coords: { x: -7.4, y: 4.8 },
    legs: ['obj-rydberg-atom-array', 'obj-polar-molecule', 'obj-hydrogen'],
    formula: 'V_{C6} = \\frac{C_6}{R^6} \\quad (C_6 \\propto n^{11})',
    abstract: '基于微米光镊捕捉 2D/3D 数百无缺陷中性原子，通过里德伯偶极封锁（Blockade）与核自旋超长相干实现高并行门。'
  },
  {
    id: 'node-route-silicon-spin',
    title: '半导体硅基自旋量子点路线 (Semiconductor Silicon Spin Qubits)',
    domainId: 'domain-condensed-matter',
    type: 'theory',
    coords: { x: -9.2, y: -1.3 },
    legs: ['obj-silicon-spin-qubit', 'obj-electron-lattice'],
    formula: 'H_{\\text{Heisenberg}} = J(t) \\mathbf{S}_1 \\cdot \\mathbf{S}_2 + g \\mu_B B_z (S_{1z} + S_{2z})',
    abstract: '利用成熟的 CMOS 纳米制程在同位素纯化 28Si 异质结中微控单电子自旋，具备超高比特密度与芯片集成潜力。'
  },
  {
    id: 'node-route-photonic',
    title: '光量子与连续变量路线 (Photonic & Continuous-Variable Quantum Route)',
    domainId: 'domain-amo-atomic',
    type: 'method',
    coords: { x: -8.5, y: 2.2 },
    legs: ['obj-photonic-boson-sampling', 'obj-entangled-photons'],
    formula: 'GKP: |0_L\\rangle = \\sum_{s} |q = 2s \\sqrt{\\pi}\\rangle',
    abstract: '基于单光子干涉与高阶压缩光场连续变量 (CV) GKP 编码，在常温下无需极低温制冷机实现百模式量子优势。'
  },
  {
    id: 'node-route-topological',
    title: '马约拉纳拓扑量子计算路线 (Topological Quantum Computing Route)',
    domainId: 'domain-condensed-matter',
    type: 'theory',
    coords: { x: -8.0, y: -2.9 },
    legs: ['obj-majorana-wire', 'obj-anyon-statistics', 'obj-tb-graphene'],
    formula: 'B_{ij} B_{jk} B_{ij} = B_{jk} B_{ij} B_{jk} \\quad (\\text{Braid Relation})',
    abstract: '利用一维超导纳米线或非阿贝尔任意子的无能隙马约拉纳零能模进行时空编织，从硬件层面免疫退相干噪声。'
  },
  {
    id: 'node-route-surface-code',
    title: '容错量子纠错与逻辑比特 (Fault-Tolerant Surface Codes & Logical Qubits)',
    domainId: 'domain-stat-complex',
    type: 'theory',
    coords: { x: -5.2, y: 4.5 },
    legs: ['obj-transmon-qubit', 'obj-trapped-ion-crystal', 'obj-rydberg-atom-array'],
    formula: 'P_L \\sim \\left( \\frac{p}{p_{th}} \\right)^{(d+1)/2} \\quad (p_{th} \\approx 1\\%)',
    abstract: '利用二维晶格二维表面码（Surface Code）与稳定子算符测量（Stabilizer Measurements），实现物理错误率低于 1% 时的无限纠错。'
  }
];


// ============================================================================
// RMP 2024–2026 综述补全：现代物理地图新增节点
// 来源：Reviews of Modern Physics Vol. 96–98 (2024–2026)
// ============================================================================

export const ACADEMIC_OBJECTS_RMP_2024_2026: PhysicsNode[] = [
  // --- Condensed Matter & Quantum Materials ---
  {
    id: 'obj-kitaev-qsl-rucl3',
    label: 'Kitaev 量子自旋液体 (α-RuCl₃)',
    pdgCode: 'RMP25-CM-KITEAEV',
    domainId: 'domain-condensed-matter',
    coords: { x: -9.2, y: -2.4 },
    errorBar: { dx: 0.1, dy: 0.1 },
    symbol: '\\alpha\\text{-}\\ce{RuCl3}',
    type: 'quantum-material',
    specs: {
      length: 'a \\approx 0.59 \\text{ nm (Honeycomb Lattice)}',
      energy: 'J_K \\sim 5-10 \\text{ meV}, \\quad T_N \\approx 7 \\text{ K}',
      time: '10^{-12} \\text{ s}',
      lagrangian: 'H_K = -K \\sum_{\\langle ij \\rangle_\\gamma} S_i^\\gamma S_j^\\gamma - \\Gamma \\sum (S_i^\\alpha S_j^\\beta + S_i^\\beta S_j^\\alpha)'
    },
    annotation: 'RMP 2025 (Matsuda et al.)：键方向 Ising 相互作用精确可解模型，自旋分数化为涌现 Majorana 费米子；磁场下转变为非阿贝尔手征自旋液体，拓扑量子计算资源。'
  },
  {
    id: 'obj-magnetic-skyrmion',
    label: '磁斯格明子 (Magnetic Skyrmions)',
    pdgCode: 'RMP25-CM-SKYRMION',
    domainId: 'domain-condensed-matter',
    coords: { x: -7.5, y: -2.8 },
    errorBar: { dx: 0.15, dy: 0.1 },
    symbol: 'N_{\\text{sk}}',
    type: 'phase',
    specs: {
      length: 'd_{\\text{sk}} \\sim 1 - 100 \\text{ nm}',
      energy: 'E_{\\text{sk}} \\sim 1 - 10 \\text{ meV}',
      time: '10^{-9} - 10^{-6} \\text{ s}',
      lagrangian: 'N_{\\text{sk}} = \\frac{1}{4\\pi} \\int \\mathbf{n} \\cdot (\\partial_x \\mathbf{n} \\times \\partial_y \\mathbf{n}) \\, d^2r'
    },
    annotation: 'RMP 2025 Colloquium：拓扑绕数保护的平滑磁化纹理；量子化螺旋度与宏观量子隧穿区分经典/量子斯格明子，自旋电子学与非传统计算平台。'
  },
  {
    id: 'obj-kagome-metal',
    label: '笼目金属 (Kagome Metals AV₃Sb₅)',
    pdgCode: 'RMP26-CM-KAGOME',
    domainId: 'domain-condensed-matter',
    coords: { x: -9.3, y: -2.0 },
    errorBar: { dx: 0.1, dy: 0.1 },
    symbol: '\\ce{CsV3Sb5}',
    type: 'quantum-material',
    specs: {
      length: 'a \\approx 0.54 \\text{ nm (Kagome Lattice)}',
      energy: 'T_{\\text{CDW}} \\sim 78-102 \\text{ K}, \\quad T_c \\sim 0.9-2.5 \\text{ K}',
      time: '10^{-13} \\text{ s}',
      lagrangian: 'H_{\\text{kagome}} = -t \\sum_{\\langle ij \\rangle} c_i^\\dagger c_j + \\lambda_{SO} \\mathbf{L}\\cdot\\mathbf{S} + U\\sum n_{i\\uparrow}n_{i\\downarrow}'
    },
    annotation: 'RMP 2026：笼目晶格同时汇聚电子拓扑（Dirac 点、平带）、几何阻挫与强关联，稳定电荷密度波、非常规超导与手征反常等全新量子态。'
  },
  {
    id: 'obj-2d-vdw-magnet',
    label: '二维范德华磁体 (2D vdW Magnets)',
    pdgCode: 'RMP26-CM-2DVDW',
    domainId: 'domain-condensed-matter',
    coords: { x: -9.1, y: -2.5 },
    errorBar: { dx: 0.1, dy: 0.1 },
    symbol: '\\ce{CrI3}',
    type: 'quantum-material',
    specs: {
      length: 'd_{\\text{mono}} \\approx 0.68 \\text{ nm (Monolayer)}',
      energy: 'T_c \\approx 45 \\text{ K} \\sim 3.9 \\text{ meV}',
      time: '10^{-12} \\text{ s}',
      lagrangian: 'H = -J \\sum_{\\langle ij \\rangle} \\mathbf{S}_i \\cdot \\mathbf{S}_j - K \\sum_i (S_i^z)^2 + \\text{Dzyaloshinskii-Moriya}'
    },
    annotation: 'RMP 2026：2017 年首次实验实现原子层厚磁有序；Floquet 工程态、光致亚稳磁相、磁激子等意外现象；自旋电子学量子功能新平台。'
  },
  {
    id: 'obj-bcs-bec-crossover',
    label: 'BCS-BEC 渡越超导体 (Crossover Superconductors)',
    pdgCode: 'RMP24-CM-BCSBEC',
    domainId: 'domain-condensed-matter',
    coords: { x: -8.4, y: -2.1 },
    errorBar: { dx: 0.1, dy: 0.1 },
    symbol: '\\Delta/E_F',
    type: 'phase',
    specs: {
      length: '\\xi \\sim 1 - 10 \\text{ nm (Coherence Length)}',
      energy: '\\Delta \\sim 1 - 20 \\text{ meV}, \\quad T_c \\sim 1 - 100 \\text{ K}',
      time: '10^{-12} \\text{ s}',
      lagrangian: '\\frac{\\Delta}{E_F} \\gg 1: \\text{BEC (Preformed Pairs)}; \\quad \\frac{\\Delta}{E_F} \\ll 1: \\text{BCS (Weak Coupling)}'
    },
    annotation: 'RMP 2024 (Chen et al.)：超导从弱耦合 BCS 到强耦合 BEC（预形成对）的连续渡越；涵盖铁基、镍基、魔角石墨烯与人工异质结近邻化体系。'
  },
  {
    id: 'obj-photo-doped-mott',
    label: '光掺杂 Mott 绝缘体 (Photo-doped Mott States)',
    pdgCode: 'RMP25-CM-PHOTOMOTT',
    domainId: 'domain-condensed-matter',
    coords: { x: -9.4, y: 0.2 },
    errorBar: { dx: 0.1, dy: 0.1 },
    symbol: '\\text{Mott}^*',
    type: 'out-of-equilibrium',
    specs: {
      length: 'a \\sim 0.3 - 0.5 \\text{ nm}',
      energy: 'U \\sim 1 - 3 \\text{ eV (Mott Gap)}',
      time: '10^{-15} - 10^{-12} \\text{ s (fs-ps)}',
      lagrangian: 'H = -t\\sum c^\\dagger c + U\\sum n_\\uparrow n_\\downarrow + \\mathbf{E}(t)\\cdot\\mathbf{P}'
    },
    annotation: 'RMP 2025：大 Mott 能隙保护下光激发载流子的亚稳态；非热自旋/轨道序、η 配对态与新型激子序的涌现。'
  },
  {
    id: 'obj-spin-orbit-sc',
    label: '自旋轨道超导异质结 (Spin-Orbit SC Hybrids)',
    pdgCode: 'RMP24-CM-SOSC',
    domainId: 'domain-condensed-matter',
    coords: { x: -7.8, y: -2.3 },
    errorBar: { dx: 0.1, dy: 0.1 },
    symbol: '\\alpha_{\\text{R}}',
    type: 'quantum-material',
    specs: {
      length: 'L_{so} \\sim 1 - 100 \\text{ nm}',
      energy: '\\Delta_{so} \\sim 1 - 10 \\text{ meV}',
      time: '10^{-12} \\text{ s}',
      lagrangian: 'H_{so} = \\alpha_R (\\boldsymbol{\\sigma} \\times \\mathbf{p}) \\cdot \\hat{z} + \\Delta(\\mathbf{r}) \\tau_x'
    },
    annotation: 'RMP 2024 Colloquium：SOC 在超导异质结中诱导等自旋三重态配对、拓扑超导（Majorana 态）、非互易输运与修正 Josephson 电流-相位关系。'
  },
  {
    id: 'obj-ion-coulomb-crystal',
    label: '离子库仑晶体 (Ion Coulomb Crystals)',
    pdgCode: 'RMP26-AMO-ICC',
    domainId: 'domain-amo-atomic',
    coords: { x: -5.3, y: -4.5 },
    errorBar: { dx: 0.1, dy: 0.1 },
    symbol: '\\text{ICC}',
    type: 'bound-state',
    specs: {
      length: 'd_{\\text{ion}} \\sim 3 - 10 \\text{ \\mu m}',
      energy: 'E \\sim \\mu\\text{eV} \\quad (T \\sim 1 - 10 \\text{ mK})',
      time: '1 - 100 \\text{ s}',
      lagrangian: 'H = \\sum_i \\frac{p_i^2}{2m} + \\frac{e^2}{4\\pi\\epsilon_0}\\sum_{i<j}\\frac{1}{|r_i - r_j|} + V_{\\text{trap}}'
    },
    annotation: 'RMP 2026 (Morigi)：激光冷却离子在阱中形成的有序结构；强关联区凝聚态物理新平台，一维至三维结构相变与非平衡动力学。'
  },
  {
    id: 'obj-polaron-2d',
    label: '极化子 (Polarons in 2D & Atomic Gases)',
    pdgCode: 'RMP26-AMO-POLARON',
    domainId: 'domain-condensed-matter',
    coords: { x: -9.0, y: -1.5 },
    errorBar: { dx: 0.1, dy: 0.1 },
    symbol: 'E_P',
    type: 'bound-state',
    specs: {
      length: 'a_{\\text{2D}} \\sim 0.3 - 1 \\text{ nm}; \\quad a_{\\text{cold}} \\sim 100 \\text{ nm}',
      energy: 'E_P \\sim 1 - 50 \\text{ meV (TMD)}; \\quad \\mu\\text{eV (Cold Atoms)}',
      time: '10^{-13} - 10^{-9} \\text{ s}',
      lagrangian: 'H = \\epsilon_{\\mathbf{k}} c_{\\mathbf{k}}^\\dagger c_{\\mathbf{k}} + \\sum_{\\mathbf{q}} \\omega_{\\mathbf{q}} a_{\\mathbf{q}}^\\dagger a_{\\mathbf{q}} + g \\sum c^\\dagger c (a + a^\\dagger)'
    },
    annotation: 'RMP 2026 (Massignan & Schmidt)：移动杂质与量子多体环境强耦合形成的准粒子；统一超冷原子气体与二维 TMD 两大平台的普适物理。'
  },
  {
    id: 'obj-spin-glass',
    label: '自旋玻璃 (Spin-Glass Dynamics)',
    pdgCode: 'RMP25-STAT-SPINGLASS',
    domainId: 'domain-stat-complex',
    coords: { x: -7.0, y: -2.6 },
    errorBar: { dx: 0.2, dy: 0.1 },
    symbol: '\\xi_{\\text{SG}}',
    type: 'phase',
    specs: {
      length: '\\xi_{\\text{SG}} \\sim 1 - 100 \\text{ nm (Coherence Length)}',
      energy: 'k_B T_g \\sim 1 - 10 \\text{ meV}',
      time: '10^{-6} - 10^{6} \\text{ s (Aging)}',
      lagrangian: 'H_{EA} = -\\sum_{\\langle ij \\rangle} J_{ij} \\mathbf{S}_i \\cdot \\mathbf{S}_j, \\quad \\langle J_{ij} \\rangle = 0, \\quad \\langle J_{ij}^2 \\rangle = J^2'
    },
    annotation: 'RMP 2025 (Dahlberg et al.)：无序与阻挫生成的范式复杂系统；Janus 专用计算机模拟逼近实验时空标度，温度混沌、记忆与再juvenation 效应。'
  },
  {
    id: 'obj-colloidal-hard-spheres',
    label: '胶体硬球 (Colloidal Hard Spheres)',
    pdgCode: 'RMP24-STAT-COLLOID',
    domainId: 'domain-stat-complex',
    coords: { x: -6.0, y: -1.6 },
    errorBar: { dx: 0.1, dy: 0.05 },
    symbol: '\\phi',
    type: 'phase',
    specs: {
      length: '\\sigma \\sim 0.1 - 5 \\text{ \\mu m}',
      energy: 'k_B T \\approx 25 \\text{ meV (Room Temp)}',
      time: '10^{-3} - 10^{3} \\text{ s}',
      lagrangian: 'Z = \\frac{PV}{Nk_BT} = 1 + \\frac{4\\phi - 2\\phi^2}{(1-\\phi)^3} \\quad (\\text{Carnahan-Starling})'
    },
    annotation: 'RMP 2024：纯熵驱动的玻璃化转变与结晶；统计力学基准体系，连接平衡态热力学与非平衡玻璃动力学。'
  },
  {
    id: 'obj-pt-symmetric',
    label: 'PT 对称非厄米系统 (PT-Symmetric Systems)',
    pdgCode: 'RMP24-QM-PTSYM',
    domainId: 'domain-amo-atomic',
    coords: { x: -5.5, y: 0.3 },
    errorBar: { dx: 0.2, dy: 0.1 },
    symbol: '\\mathcal{PT}',
    type: 'phase',
    specs: {
      length: '1 \\text{ \\mu m} - 1 \\text{ mm (Photonic/Atomic)}',
      energy: '1 - 3 \\text{ eV (Optical)}',
      time: '10^{-12} - 10^{-9} \\text{ s}',
      lagrangian: 'H = p^2 + x^2(ix)^\\epsilon, \\quad \\mathcal{PT}: x \\to -x, \\; i \\to -i'
    },
    annotation: 'RMP 2024 (Bender et al.)：以 PT 对称替代厄米性条件，复哈密顿量仍具实正谱；例外点 (EP) 处对称性自发破缺，光子学与原子物理实验验证。'
  },
  {
    id: 'obj-quantum-battery',
    label: '量子电池 (Quantum Batteries)',
    pdgCode: 'RMP24-QI-QBATT',
    domainId: 'domain-amo-atomic',
    coords: { x: -7.0, y: 0.5 },
    errorBar: { dx: 0.1, dy: 0.1 },
    symbol: 'P_{\\text{QB}}',
    type: 'hardware',
    specs: {
      length: '1 - 100 \\text{ nm (Quantum Device)}',
      energy: '1 - 10 \\text{ eV}',
      time: '10^{-9} - 10^{-6} \\text{ s}',
      lagrangian: 'P_{\\max} = \\max_U \\frac{d}{dt}\\text{Tr}[H \\rho(t)] \\propto N \\quad (\\text{Quantum Advantage})'
    },
    annotation: 'RMP 2024 Colloquium：利用量子纠缠与多体关联实现超经典充电功率标度；开放系统退相干与能量保持的核心挑战。'
  },
  {
    id: 'obj-driven-open-quantum',
    label: '驱动耗散量子物质 (Driven-Dissipative Quantum Matter)',
    pdgCode: 'RMP25-STAT-DRIVEN',
    domainId: 'domain-stat-complex',
    coords: { x: -4.8, y: -4.0 },
    errorBar: { dx: 0.2, dy: 0.1 },
    symbol: '\\mathcal{L}_{\\text{Lind}}',
    type: 'out-of-equilibrium',
    specs: {
      length: '10 - 100 \\text{ \\mu m (Cold Atom Array)}',
      energy: '1 - 100 \\text{ neV}',
      time: '10^{-6} - 1 \\text{ s}',
      lagrangian: '\\dot{\\rho} = -i[H, \\rho] + \\sum_\\alpha \\left( L_\\alpha \\rho L_\\alpha^\\dagger - \\frac{1}{2}\\{L_\\alpha^\\dagger L_\\alpha, \\rho\\} \\right)'
    },
    annotation: 'RMP 2025 (Sieberer et al.)：Lindblad-Keldysh 场论框架下驱动开放量子物质的普适性；对称性、态纯度与标度论证统一非平衡稳态分类。'
  },
  {
    id: 'obj-dual-unitary-circuit',
    label: '对偶酉线路与时空对偶 (Dual-Unitary Circuits)',
    pdgCode: 'RMP26-QI-DUALUNIT',
    domainId: 'domain-stat-complex',
    coords: { x: -5.5, y: -3.8 },
    errorBar: { dx: 0.1, dy: 0.1 },
    symbol: 'U_{\\text{DU}}',
    type: 'theory',
    specs: {
      length: '1 - 10 \\text{ \\mu m (Quantum Simulator)}',
      energy: '1 - 100 \\text{ neV}',
      time: '10^{-6} - 10^{-3} \\text{ s}',
      lagrangian: 'U_{\\text{DU}}: \\quad U \\text{ unitary in both space and time directions}'
    },
    annotation: 'RMP 2026 (Bertini et al.)：时空对偶下精确可解的量子多体动力学；首个解析量化量子混沌、热化、扰码与纠缠增长的最小模型。'
  },
  {
    id: 'obj-non-markovian-oqs',
    label: '非马尔可夫开放量子系统 (Non-Markovian OQS)',
    pdgCode: 'RMP26-QI-NONMARKOV',
    domainId: 'domain-amo-atomic',
    coords: { x: -6.3, y: -3.6 },
    errorBar: { dx: 0.1, dy: 0.1 },
    symbol: '\\tau_{\\text{mem}}',
    type: 'method',
    specs: {
      length: '1 - 100 \\text{ nm}',
      energy: '\\mu\\text{eV} - \\text{meV}',
      time: '\\tau_{\\text{mem}} \\sim 10^{-9} - 10^{-6} \\text{ s}',
      lagrangian: '\\dot{\\rho}_S(t) = \\int_0^t K(t-t\') \\rho_S(t\') dt\' \\quad (\\text{Nakajima-Zwanzig})'
    },
    annotation: 'RMP 2026 (Xu et al.)：层级运动方程 (HEOM)、Lindblad 赝模、链映射与随机展开的统一扩展态空间框架；超越 Born-Markov 近似的精确模拟。'
  },

  // --- HEP & Fundamental Physics ---
  {
    id: 'obj-xyz-exotic-hadrons',
    label: 'XYZ 奇特强子态 (Exotic Hadrons at e⁺e⁻)',
    pdgCode: 'RMP26-HEP-XYZ',
    domainId: 'domain-hadron-nuclear',
    coords: { x: -15.2, y: 9.6 },
    errorBar: { dx: 0.05, dy: 0.05 },
    symbol: '\\text{X}(3872)',
    type: 'composite',
    specs: {
      length: '\\sim 1 \\text{ fm}',
      energy: 'M_{X(3872)} = 3871.69 \\pm 0.17 \\text{ MeV}',
      time: '10^{-21} \\text{ s}',
      lagrangian: '|X\\rangle = \\alpha |c\\bar{c}\\rangle + \\beta |D^0\\bar{D}^{*0}\\rangle + \\gamma |[cq][\\bar{c}\\bar{q}]\\rangle'
    },
    annotation: 'RMP 2026 Colloquium (Wang & Liu)：BESIII/Belle/BABAR 在 e⁺e⁻ 对撞中发现的非标准强子（四夸克、分子态、混杂态），探索色禁闭本质。'
  },
  {
    id: 'obj-susy-hl-lhc',
    label: '超对称粒子 (SUSY at HL-LHC)',
    pdgCode: 'RMP25-HEP-SUSY',
    domainId: 'domain-ew',
    coords: { x: -19.0, y: 12.5 },
    errorBar: { dx: 0.3, dy: 0.3 },
    symbol: '\\tilde{\\chi}^0_1',
    type: 'fundamental',
    specs: {
      length: '< 10^{-19} \\text{ m}',
      energy: 'm_{\\text{soft}} \\sim 1 - 10 \\text{ TeV (Current Bounds)}',
      time: '\\text{Stable LSP (DM Candidate)}',
      lagrangian: '\\mathcal{L}_{\\text{SUSY}} = \\mathcal{L}_{\\text{SM}} + \\tilde{g}\\bar{\\tilde{g}}\\tilde{g} + y\\tilde{q}\\bar{q}\\tilde{\\chi} + \\text{soft breaking}'
    },
    annotation: 'RMP 2025：弱标度超对称解决规范等级问题的技术自然性；HL-LHC 强限制下的小等级问题与弦景观统计预期。'
  },
  {
    id: 'obj-conformal-bootstrap',
    label: '数值共形 Bootstrap (Conformal Bootstrap)',
    pdgCode: 'RMP24-HEP-BOOTSTRAP',
    domainId: 'domain-ew',
    coords: { x: -18.5, y: 11.5 },
    errorBar: { dx: 0.1, dy: 0.1 },
    symbol: '\\Delta_\\sigma',
    type: 'method',
    specs: {
      length: '\\text{Scale Invariant (CFT)}',
      energy: '\\text{Non-perturbative}',
      time: '\\text{N/A}',
      lagrangian: '\\sum_{\\mathcal{O}} \\lambda_{\\sigma\\sigma\\mathcal{O}}^2 \\, F_{\\Delta,\\ell}(u,v) = 0 \\quad (\\text{Crossing Symmetry})'
    },
    annotation: 'RMP 2024 (Rychkov & Su)：仅凭交叉对称性、幺正性与解析性约束 CFT 数据；三维 Ising 模型临界指数精度超越蒙特卡洛。'
  },
  {
    id: 'obj-dense-neutrino-gas',
    label: '致密中微子气体 (Dense Neutrino Gas in CCSNe)',
    pdgCode: 'RMP24-HEP-NEUTRINO',
    domainId: 'domain-cosmology',
    coords: { x: 4.5, y: 7.0 },
    errorBar: { dx: 0.2, dy: 0.1 },
    symbol: '\\nu\\nu',
    type: 'out-of-equilibrium',
    specs: {
      length: 'R \\sim 10 - 100 \\text{ km (Supernova Core)}',
      energy: 'E_\\nu \\sim 10 - 30 \\text{ MeV}',
      time: '1 - 10 \\text{ s (Cooling)}',
      lagrangian: 'i\\dot{\\rho}_{\\mathbf{p}} = [H_{\\text{vac}} + H_{\\text{mat}} + \\sqrt{2}G_F \\int (1-\\cos\\theta)\\rho_{\\mathbf{q}} d\\Gamma_q, \\rho_{\\mathbf{p}}]'
    },
    annotation: 'RMP 2024 (Volpe et al.)：核心坍缩超新星/致密合并中中微子-中微子相互作用引发集体味振荡；与凝聚态、核物理及量子计算的深层联系。'
  },
  {
    id: 'obj-cgpp',
    label: '宇宙学引力粒子产生 (Cosmological Gravitational Particle Production)',
    pdgCode: 'RMP24-COSMO-CGPP',
    domainId: 'domain-qg-gut',
    coords: { x: -29.0, y: 23.5 },
    errorBar: { dx: 0.3, dy: 0.3 },
    symbol: '\\text{CGPP}',
    type: 'fundamental',
    specs: {
      length: 'H^{-1} \\sim 10^{-26} \\text{ m (Reheating)}',
      energy: 'H_{\\text{inf}} \\sim 10^{13} \\text{ GeV}',
      time: '10^{-36} - 10^{-32} \\text{ s}',
      lagrangian: '\\langle N_k \\rangle = |\\beta_k|^2, \\quad \\ddot{\\chi}_k + \\omega_k^2(\\eta)\\chi_k = 0'
    },
    annotation: 'RMP 2024 (Kolb et al.)：膨胀宇宙中纯引力相互作用产生粒子；暗物质、引力波、暗辐射与重子不对称的宇宙学遗迹联系。'
  },
  {
    id: 'obj-exotic-spin-forces',
    label: '自旋依赖奇异第五力 (Spin-Dependent Exotic Interactions)',
    pdgCode: 'RMP25-FUND-5THFORCE',
    domainId: 'domain-amo-atomic',
    coords: { x: -4.5, y: -3.5 },
    errorBar: { dx: 0.2, dy: 0.1 },
    symbol: 'g_s g_p',
    type: 'probe',
    specs: {
      length: '\\lambda \\sim 1 \\text{ \\mu m} - 1 \\text{ m (Compton Range)}',
      energy: 'm_a \\sim \\mu\\text{eV} - \\text{meV (Axion Mass)}',
      time: '\\text{Static / Quasi-static}',
      lagrangian: '\\mathcal{L} \\supset g_s \\bar{\\psi}\\psi \\, a + g_p \\bar{\\psi} i\\gamma_5 \\psi \\, a \\implies V_{sp}(r) \\propto \\frac{e^{-r/\\lambda}}{r}'
    },
    annotation: 'RMP 2025：轴子/类轴子与 Z\'/暗光子介导的自旋依赖第五力；原子共磁力计、扭秤、NV 色心与精密光谱的低能前沿搜索。'
  },
  {
    id: 'obj-continuous-gw-ns',
    label: '连续引力波 (Continuous GW from Neutron Stars)',
    pdgCode: 'RMP26-ASTRO-CW',
    domainId: 'domain-cosmology',
    coords: { x: 4.2, y: -3.8 },
    errorBar: { dx: 0.1, dy: 0.1 },
    symbol: 'h_0^{\\text{CW}}',
    type: 'astro-object',
    specs: {
      length: 'R_{NS} \\approx 12 \\text{ km}',
      energy: 'f_{\\text{GW}} \\sim 100 - 2000 \\text{ Hz}',
      time: '> 10^6 \\text{ cycles (Years Integration)}',
      lagrangian: 'h_0 = \\frac{4\\pi^2 G}{c^4} \\frac{I \\epsilon f^2}{r}'
    },
    annotation: 'RMP 2026 Colloquium (Owen)：快速旋转中子星连续引力波；连接电磁天文、核天体物理与凝聚态（壳层弹性），下一代探测器 (CE/ET) 有望首次探测。'
  },

  // --- Astrophysics & Cosmology ---
  {
    id: 'obj-neutron-star-eos',
    label: '中子星致密物质状态方程 (Neutron Star Dense Matter EOS)',
    pdgCode: 'RMP25-ASTRO-NSEOS',
    domainId: 'domain-cosmology',
    coords: { x: 4.0, y: 8.5 },
    errorBar: { dx: 0.1, dy: 0.2 },
    symbol: 'P(\\rho)',
    type: 'astro-object',
    specs: {
      length: 'R \\approx 11 - 13 \\text{ km}',
      energy: 'E_F \\sim 100 \\text{ MeV} \\quad (\\rho \\sim 2-8 \\rho_{\\text{sat}})',
      time: '\\text{Static / Merger } \\sim 100 \\text{ s}',
      lagrangian: 'P(\\rho) = \\rho^2 \\frac{d(E/A)}{d\\rho}, \\quad \\mathcal{L}_{\\chi EFT} + \\text{pQCD}'
    },
    annotation: 'RMP 2025：从手征 EFT 核力到微扰 QCD 的多密度状态方程；GW170817 引力波与 NICER 电磁观测联合约束。'
  },
  {
    id: 'obj-sidm-halo',
    label: '自相互作用暗物质晕 (Self-Interacting Dark Matter)',
    pdgCode: 'RMP25-ASTRO-SIDM',
    domainId: 'domain-cosmology',
    coords: { x: 21.5, y: 3.0 },
    errorBar: { dx: 0.3, dy: 0.2 },
    symbol: '\\sigma/m',
    type: 'astro-object',
    specs: {
      length: 'R_{\\text{halo}} \\sim 1 - 100 \\text{ kpc}',
      energy: 'm_\\chi \\sim \\text{MeV} - \\text{GeV}, \\quad \\sigma/m \\sim 0.1 - 10 \\text{ cm}^2/\\text{g}',
      time: '\\text{Gyr (Halo Evolution)}',
      lagrangian: '\\mathcal{L} \\supset \\frac{1}{2}(\\partial\\phi)^2 - \\frac{1}{2}m_\\phi^2\\phi^2 + y\\bar{\\chi}\\chi\\phi'
    },
    annotation: 'RMP 2025 (Adhikari et al.)：轻介导子或强动力学暗区中暗物质自散射；解释星系旋转曲线多样性，约束来自卫星星系至星系团多尺度。'
  },
  {
    id: 'obj-solar-pp-fusion',
    label: '太阳 pp 链核聚变 (Solar pp-Chain Fusion)',
    pdgCode: 'RMP25-ASTRO-SOLAR',
    domainId: 'domain-cosmology',
    coords: { x: 8.8, y: 3.1 },
    errorBar: { dx: 0.1, dy: 0.1 },
    symbol: 'S_{11}',
    type: 'astro-object',
    specs: {
      length: 'R_\\odot = 6.96 \\times 10^8 \\text{ m}',
      energy: 'k_B T_c \\approx 1.3 \\text{ keV}, \\quad Q_{pp} = 26.73 \\text{ MeV}',
      time: '\\tau_\\odot \\approx 10^{10} \\text{ yr}',
      lagrangian: 'S(E) = \\sigma(E) \\cdot E \\cdot e^{2\\pi\\eta}, \\quad \\eta = \\frac{Z_1 Z_2 e^2}{\\hbar v}'
    },
    annotation: 'RMP 2025 (Solar Fusion III)：氢燃烧恒星核反应率第三次十年评估；Borexino/SNO+ 太阳中微子通量达百分之几精度。'
  },
  {
    id: 'obj-cosmic-dipole',
    label: '宇宙偶极异常 (Cosmic Dipole Anomaly)',
    pdgCode: 'RMP25-COSMO-DIPOLE',
    domainId: 'domain-cosmology',
    coords: { x: 25.0, y: -3.5 },
    errorBar: { dx: 0.2, dy: 0.1 },
    symbol: '\\mathbf{d}',
    type: 'astro-object',
    specs: {
      length: '\\sim \\text{Gpc (Hubble Scale)}',
      energy: 'T_{\\text{CMB}} = 2.725 \\text{ K}',
      time: '13.8 \\text{ Gyr}',
      lagrangian: '\\frac{\\Delta T}{T} = \\beta \\cos\\theta, \\quad \\beta_{\\text{CMB}} \\neq \\beta_{\\text{quasar/radio}}'
    },
    annotation: 'RMP 2025 Colloquium (Secrest)：CMB 偶极与类星体/射电源计数偶极的显著不一致；挑战宇宙学原理（各向同性假设）。'
  },

  // --- Statistical Mechanics & Complex Systems ---
  {
    id: 'obj-macro-stoch-thermo',
    label: '宏观随机热力学 (Macroscopic Stochastic Thermodynamics)',
    pdgCode: 'RMP25-STAT-MACROTHERMO',
    domainId: 'domain-stat-complex',
    coords: { x: -1.5, y: -1.8 },
    errorBar: { dx: 0.2, dy: 0.1 },
    symbol: '\\Phi_{\\text{qp}}',
    type: 'theory',
    specs: {
      length: '1 \\text{ mm} - 1 \\text{ m}',
      energy: 'k_B T \\sim 25 \\text{ meV}',
      time: '10^{-3} - 10^{3} \\text{ s}',
      lagrangian: '\\Phi[\\rho] = \\int_0^1 ds \\int d\\mathbf{r} \\, \\frac{[\\partial_s \\rho]^2}{4\\sigma(\\rho)} \\quad (\\text{Quasi-Potential})'
    },
    annotation: 'RMP 2025 (Falasco et al.)：从介观 Markov 跳过程到宏观确定性动力学的大偏差理论；远离平衡时准势替代自由能成为 Lyapunov 函数。'
  },
  {
    id: 'obj-neural-stat-mech',
    label: '真实神经元网络统计力学 (Statistical Mechanics of Neural Networks)',
    pdgCode: 'RMP25-STAT-NEURAL',
    domainId: 'domain-stat-complex',
    coords: { x: -2.5, y: -1.5 },
    errorBar: { dx: 0.2, dy: 0.1 },
    symbol: 'P(\\{\\sigma_i\\})',
    type: 'out-of-equilibrium',
    specs: {
      length: '1 \\text{ mm} - 1 \\text{ cm (Neural Population)}',
      energy: 'k_B T \\approx 25 \\text{ meV}',
      time: '10^{-3} - 10^{2} \\text{ s}',
      lagrangian: 'P(\\{\\sigma\\}) = \\frac{1}{Z} \\exp\\left( \\sum_i h_i \\sigma_i + \\sum_{i<j} J_{ij}\\sigma_i\\sigma_j + \\cdots \\right)'
    },
    annotation: 'RMP 2025 (Meshulam et al.)：最大熵方法与现象学重整化群揭示真实神经元网络的定量可重复集体行为；无参数预测与实验精确吻合。'
  },
  {
    id: 'obj-reaction-diffusion-ft',
    label: '随机反应扩散场论 (Field Theories for Reaction-Diffusion)',
    pdgCode: 'RMP26-STAT-RDFT',
    domainId: 'domain-stat-complex',
    coords: { x: -4.0, y: -1.8 },
    errorBar: { dx: 0.2, dy: 0.1 },
    symbol: '|\\Psi\\rangle',
    type: 'theory',
    specs: {
      length: '1 \\text{ \\mu m} - 1 \\text{ mm}',
      energy: 'k_B T',
      time: '10^{-3} - 10^{3} \\text{ s}',
      lagrangian: '\\partial_t |\\Psi\\rangle = -\\hat{H}|\\Psi\\rangle, \\quad \\hat{H} = \\int d^d x \\left[ D(\\nabla a^\\dagger)(\\nabla a) + \\lambda(a^{\\dagger 2} - a^\\dagger)a^2 \\right]'
    },
    annotation: 'RMP 2026 (del Razo et al.)：二次量子化 Fock 空间与路径积分统一经典随机反应扩散；连接化学物理、理论生态学与流行病学多尺度模拟。'
  },

  // --- Quantum Information & Methods ---
  {
    id: 'obj-quantum-crypto-beyond-qkd',
    label: '超越 QKD 的量子密码 (Quantum Cryptography Beyond QKD)',
    pdgCode: 'RMP25-QI-CRYPTO',
    domainId: 'domain-amo-atomic',
    coords: { x: 3.5, y: 0.5 },
    errorBar: { dx: 0.3, dy: 0.1 },
    symbol: '\\text{QC}',
    type: 'method',
    specs: {
      length: '1 - 100 \\text{ km (Fiber/Free-Space)}',
      energy: 'E_\\gamma \\sim 0.8 - 1.5 \\text{ eV}',
      time: '10^{-9} - 10^{-6} \\text{ s}',
      lagrangian: '\\text{Security: } \\epsilon_{\\text{sec}} \\leq 2^{-\\lambda_{\\text{QKD}}} + \\text{composable}'
    },
    annotation: 'RMP 2025 (Bozzio et al.)：量子加密、匿名通信、数字签名、委托计算等超越密钥分发的量子密码原语；光子技术实现与安全等级分类。'
  },
  {
    id: 'obj-cv-quantum-comm',
    label: '连续变量量子通信 (CV Quantum Communication)',
    pdgCode: 'RMP26-QI-CVCOMM',
    domainId: 'domain-amo-atomic',
    coords: { x: 4.0, y: 0.3 },
    errorBar: { dx: 0.2, dy: 0.1 },
    symbol: '\\hat{x}, \\hat{p}',
    type: 'method',
    specs: {
      length: '1 - 100 \\text{ km}',
      energy: 'E_\\gamma \\sim 0.8 - 1.5 \\text{ eV}',
      time: '10^{-9} \\text{ s}',
      lagrangian: 'W(\\alpha) = \\frac{1}{\\pi^2} \\int \\chi(\\beta) e^{\\alpha\\beta^* - \\alpha^*\\beta} d^2\\beta \\quad (\\text{Wigner Function})'
    },
    annotation: 'RMP 2026 (Usenko)：多光子量子态制备、操控与相干探测的连续变量方法；相空间量子光学使量子通信高效、可用、可及。'
  },
  {
    id: 'obj-qg-lab-tests',
    label: '量子引力实验室检验 (Quantum Gravity Lab Tests)',
    pdgCode: 'RMP25-QG-LABTEST',
    domainId: 'domain-qg-gut',
    coords: { x: -5.0, y: -4.2 },
    errorBar: { dx: 0.2, dy: 0.1 },
    symbol: 'm_{\\text{QG}}',
    type: 'probe',
    specs: {
      length: '1 \\text{ \\mu m} - 1 \\text{ mm (Massive Quantum System)}',
      energy: 'E \\sim \\text{neV} - \\mu\\text{eV}',
      time: '1 - 100 \\text{ s}',
      lagrangian: 'H = \\frac{p^2}{2m} + m\\Phi(\\mathbf{r}) + H_{\\text{int}}^{\\text{grav}} \\quad (\\text{Gravity-mediated Entanglement})'
    },
    annotation: 'RMP 2025 (Bose et al.)：大质量量子系统作为量子力学与引力的接口；引力诱导退相干、波函数坍缩检验与引力介导纠缠。'
  },
  {
    id: 'obj-muonic-lamb-shift',
    label: 'μ 子原子 Lamb 位移 (Muonic Atom Lamb Shift)',
    pdgCode: 'RMP24-AMO-MUONIC',
    domainId: 'domain-amo-atomic',
    coords: { x: -12.7, y: 3.5 },
    errorBar: { dx: 0.05, dy: 0.05 },
    symbol: '\\Delta E_L^{\\mu}',
    type: 'bound-state',
    specs: {
      length: 'a_\\mu = a_0 / 207 \\approx 256 \\text{ fm}',
      energy: '\\Delta E_L \\sim 0.2 - 2 \\text{ keV}',
      time: '10^{-15} \\text{ s}',
      lagrangian: '\\Delta E_L = \\Delta E_{\\text{SE}} + \\Delta E_{\\text{VP}} + \\Delta E_{\\text{recoil}} + \\Delta E_{\\text{NS}}'
    },
    annotation: 'RMP 2024 (Pachucki)：μ 子氢/氘/氦 Lamb 位移精密理论；质子电荷半径谜题 (Proton Radius Puzzle) 的最终解决与 CODATA 常数更新。'
  },
  {
    id: 'obj-lar-tpc',
    label: '液氩时间投影室 (Liquid Argon TPC Detectors)',
    pdgCode: 'RMP24-HEP-LARTPC',
    domainId: 'domain-ew',
    coords: { x: 0.5, y: 10.0 },
    errorBar: { dx: 0.2, dy: 0.2 },
    symbol: '\\text{LArTPC}',
    type: 'probe',
    specs: {
      length: 'L_{\\text{drift}} \\sim 1 - 10 \\text{ m}',
      energy: 'E_\\nu \\sim 0.1 - 100 \\text{ GeV}',
      time: '\\text{ms (Drift Time)}',
      lagrangian: 'N_e = \\frac{E_{\\text{dep}}}{W_i}, \\quad W_i^{\\text{Ar}} = 23.6 \\text{ eV}'
    },
    annotation: 'RMP 2024 (Bonivento et al.)：DUNE/ProtoDUNE 液氩 TPC 科学与技术；中微子振荡、超新星中微子与核子衰变搜索的下一代探测器。'
  },
  {
    id: 'obj-rb-turbulence',
    label: '终极 Rayleigh-Bénard 湍流 (Ultimate RB Turbulence)',
    pdgCode: 'RMP24-STAT-RBTURB',
    domainId: 'domain-stat-complex',
    coords: { x: -1.0, y: -2.0 },
    errorBar: { dx: 0.2, dy: 0.1 },
    symbol: '\\text{Ra}',
    type: 'out-of-equilibrium',
    specs: {
      length: 'H \\sim 1 \\text{ cm} - 1 \\text{ m (Cell Height)}',
      energy: 'k_B T',
      time: '1 - 10^{3} \\text{ s}',
      lagrangian: '\\text{Nu} \\sim \\text{Ra}^{1/2} \\quad (\\text{Kraichnan Ultimate Regime})'
    },
    annotation: 'RMP 2024 (Krug et al.)：扩展自相似标度分析揭示温度结构函数；从经典到终极 (Kraichnan) 湍流区域的转变。'
  }
];

// --- RMP 2024–2026 新增研究/理论/方法节点 ---
export const ACADEMIC_RESEARCH_NODES_RMP_2024_2026: ResearchRoute[] = [
  {
    id: 'node-rmp-kitaev-topological-qc',
    title: 'Kitaev 自旋液体与拓扑量子计算 (Kitaev QSL → Topological QC)',
    domainId: 'domain-condensed-matter',
    type: 'frontier',
    coords: { x: -8.5, y: -2.8 },
    legs: ['obj-kitaev-qsl-rucl3', 'obj-spin-liquid-anyon', 'obj-majorana-wire'],
    formula: 'H_K \\xrightarrow{B \\neq 0} \\text{Chiral CSL}: \\quad \\nu = \\frac{1}{2} \\quad (\\text{Non-Abelian Anyons})',
    abstract: 'RMP 2025：α-RuCl₃ 中 Kitaev 自旋分数化实验证据；磁场诱导手征自旋液体含非阿贝尔任意子，与拓扑超导/偶分母 FQH 态深层联系。'
  },
  {
    id: 'node-rmp-skyrmion-quantum',
    title: '量子斯格明子与自旋电子学 (Quantum Skyrmions & Spintronics)',
    domainId: 'domain-condensed-matter',
    type: 'frontier',
    coords: { x: -7.0, y: -3.0 },
    legs: ['obj-magnetic-skyrmion', 'obj-2d-vdw-magnet', 'obj-spin-orbit-sc'],
    formula: 'N_{\\text{sk}} \\in \\mathbb{Z}, \\quad \\hat{H}_{\\text{hel}} |n\\rangle = E_n |n\\rangle \\quad (\\text{Quantized Helicity})',
    abstract: 'RMP 2025 Colloquium：从经典拓扑纹理到量子化螺旋度与宏观量子隧穿；混合架构工程拓扑超导序，量子操作与传感新范式。'
  },
  {
    id: 'node-rmp-kagome-frustration',
    title: '笼目阻挫拓扑关联 (Kagome: Frustration × Topology × Correlation)',
    domainId: 'domain-condensed-matter',
    type: 'frontier',
    coords: { x: -9.5, y: -2.5 },
    legs: ['obj-kagome-metal', 'obj-strongly-correlated', 'obj-tb-graphene'],
    formula: '\\text{Flat Band} + \\text{Dirac} + \\text{van Hove} \\implies \\text{CDW} + \\text{SC} + \\text{Chiral Flux}',
    abstract: 'RMP 2026：AV₃Sb₅ 笼目金属中平带、Dirac 锥与 van Hove 奇点共存；电荷密度波、非常规超导与手征反常序的交织相图。'
  },
  {
    id: 'node-rmp-2d-magnet-engineering',
    title: '二维磁体量子功能工程 (2D Magnet Quantum Engineering)',
    domainId: 'domain-condensed-matter',
    type: 'frontier',
    coords: { x: -8.8, y: -2.8 },
    legs: ['obj-2d-vdw-magnet', 'obj-tb-graphene', 'obj-moire-heterostructures'],
    formula: 'T_c^{\\text{2D}} > 0 \\quad (\\text{Mermin-Wagner Evaded via Anisotropy})',
    abstract: 'RMP 2026：原子层磁体突破 Mermin-Wagner 限制；Floquet 工程态、光致亚稳磁相、磁激子与自旋电子学量子功能平台。'
  },
  {
    id: 'node-rmp-bcs-bec-unified',
    title: 'BCS-BEC 渡越统一框架 (Unified BCS-BEC Crossover)',
    domainId: 'domain-condensed-matter',
    type: 'theory',
    coords: { x: -8.0, y: -1.8 },
    legs: ['obj-bcs-bec-crossover', 'obj-ybco', 'obj-fermi-hubbard-gas'],
    formula: '\\frac{1}{k_F a_s}: \\quad -\\infty \\text{ (BCS)} \\longleftrightarrow 0 \\text{ (Unitary)} \\longleftrightarrow +\\infty \\text{ (BEC)}',
    abstract: 'RMP 2024：天然与人工超导平台中 BCS-BEC 渡越的统一描述；铁基、镍基、魔角石墨烯与异质结近邻化体系的配对机制。'
  },
  {
    id: 'node-rmp-photo-mott-control',
    title: '光控 Mott 非平衡态 (Photo-induced Mott Nonequilibrium)',
    domainId: 'domain-condensed-matter',
    type: 'frontier',
    coords: { x: -9.0, y: 0.5 },
    legs: ['obj-photo-doped-mott', 'obj-strongly-correlated', 'obj-non-fermi-liquid'],
    formula: '\\tau_{\\text{thermal}} \\gg \\tau_{\\text{obs}} \\implies \\text{Metastable Non-thermal Orders}',
    abstract: 'RMP 2025：大 Mott 能隙保护下的亚稳光致相；非热自旋/轨道序、η 配对与激子序的理论工具与实验验证。'
  },
  {
    id: 'node-rmp-driven-universality',
    title: '驱动开放量子物质普适性 (Universality in Driven Open Quantum Matter)',
    domainId: 'domain-stat-complex',
    type: 'theory',
    coords: { x: -4.0, y: -4.5 },
    legs: ['obj-driven-open-quantum', 'obj-dual-unitary-circuit', 'obj-rydberg-atom-array'],
    formula: '\\text{Lindblad-Keldysh}: \\quad S_{\\text{eff}} = \\int \\bar{\\phi}(D^{-1}_K)\\phi + \\lambda(\\bar{\\phi}\\phi)^2',
    abstract: 'RMP 2025：光驱量子材料、冷原子与 NISQ 器件中非平衡稳态的普适分类；对称性、纯度与标度论证统一框架。'
  },
  {
    id: 'node-rmp-spacetime-duality',
    title: '时空对偶精确可解动力学 (Space-Time Duality & Exact Dynamics)',
    domainId: 'domain-stat-complex',
    type: 'theory',
    coords: { x: -5.0, y: -4.5 },
    legs: ['obj-dual-unitary-circuit', 'obj-driven-open-quantum', 'obj-rydberg-atom-array'],
    formula: '\\text{Tr}(U^\\dagger U)_{\\text{space}} = \\text{Tr}(U^\\dagger U)_{\\text{time}} \\implies \\text{Exact } \\lambda_L = 2\\pi k_BT/\\hbar',
    abstract: 'RMP 2026：对偶酉线路中时空互换对称性；首次解析量化量子混沌、热化、扰码与纠缠动力学的最小精确模型。'
  },
  {
    id: 'node-rmp-neutrino-collective',
    title: '致密中微子集体味动力学 (Collective Neutrino Flavor Dynamics)',
    domainId: 'domain-cosmology',
    type: 'frontier',
    coords: { x: 5.0, y: 7.5 },
    legs: ['obj-dense-neutrino-gas', 'obj-neutron-star-eos', 'obj-binary-neutron-star'],
    formula: 'i\\dot{\\rho} = [H_{\\nu\\nu}, \\rho], \\quad H_{\\nu\\nu} \\propto G_F n_\\nu \\implies \\text{Fast Flavor Conversion}',
    abstract: 'RMP 2024：超新星/合并中中微子-中微子非线性耦合引发快速味转换；与凝聚态多体、核物理及量子计算的交叉联系。'
  },
  {
    id: 'node-rmp-multimessenger-ns',
    title: '中子星多信使物理 (Multi-messenger Neutron Star Physics)',
    domainId: 'domain-cosmology',
    type: 'frontier',
    coords: { x: 4.5, y: 8.0 },
    legs: ['obj-neutron-star-eos', 'obj-continuous-gw-ns', 'obj-binary-neutron-star', 'obj-solar-pp-fusion'],
    formula: '\\Lambda_{\\text{tidal}} = \\frac{2}{3}k_2 \\left(\\frac{Rc^2}{GM}\\right)^5 \\quad (\\text{GW + EM + Nuclear})',
    abstract: 'RMP 2025/2026：引力波 (LIGO/Virgo/KAGRA)、电磁 (NICER) 与核实验联合约束致密物质 EOS；连续 GW 与 r-过程核合成。'
  },
  {
    id: 'node-rmp-5th-force-search',
    title: '第五力与暗区低能搜索 (Fifth Force & Dark Sector Low-Energy Search)',
    domainId: 'domain-amo-atomic',
    type: 'method',
    coords: { x: -4.0, y: -3.8 },
    legs: ['obj-exotic-spin-forces', 'obj-precision-atomic-clock', 'obj-entangled-photons'],
    formula: 'V_{sp}(r) = \\frac{g_s g_p}{8\\pi m} \\left( \\frac{1}{\\lambda r} + \\frac{1}{r^2} \\right) e^{-r/\\lambda} (\\hat{\\sigma} \\cdot \\hat{r})',
    abstract: 'RMP 2025：轴子/暗光子介导自旋依赖势的完整参数化；原子共磁力计、NV 色心、扭秤与精密光谱的系统搜索方法论。'
  },
  {
    id: 'node-rmp-qg-massive-quantum',
    title: '大质量量子系统引力检验 (Massive Quantum Systems × Gravity)',
    domainId: 'domain-qg-gut',
    type: 'frontier',
    coords: { x: -5.5, y: -4.5 },
    legs: ['obj-qg-lab-tests', 'obj-ion-coulomb-crystal', 'obj-rydberg-atom-array'],
    formula: '\\Delta\\phi_{\\text{grav}} = \\frac{G m_1 m_2 t}{\\hbar d} \\implies \\text{Entanglement Witness}',
    abstract: 'RMP 2025：基态冷却与量子控制使大质量系统进入引力可探测量子态；引力介导纠缠作为量子引力低能判据。'
  },
  {
    id: 'node-rmp-conformal-bootstrap-3d',
    title: '共形 Bootstrap 非微扰 CFT (Conformal Bootstrap for 3D CFTs)',
    domainId: 'domain-ew',
    type: 'method',
    coords: { x: -18.0, y: 11.8 },
    legs: ['obj-conformal-bootstrap', 'obj-qgp', 'obj-planck'],
    formula: '\\Delta_\\sigma = 0.5181489(10), \\quad \\Delta_\\epsilon = 1.412625(18) \\quad (\\text{3D Ising})',
    abstract: 'RMP 2024：半定规划松弛与导航算法将三维 Ising 临界指数推至超越蒙特卡洛精度；向 QCD 共形窗口与引力对偶推广。'
  },
  {
    id: 'node-rmp-non-markovian-unified',
    title: '非马尔可夫动力学统一框架 (Unified Non-Markovian Simulation)',
    domainId: 'domain-amo-atomic',
    type: 'method',
    coords: { x: -7.0, y: -3.5 },
    legs: ['obj-non-markovian-oqs', 'obj-driven-open-quantum', 'obj-transmon-qubit'],
    formula: '\\hat{H}_{\\text{ext}} = H_S + \\sum_k \\omega_k b_k^\\dagger b_k + \\sum_k (g_k b_k^\\dagger S + \\text{h.c.})',
    abstract: 'RMP 2026：HEOM、赝模、链映射与随机展开在扩展态空间中的统一；量子技术时代超越 Born-Markov 的精确开放系统模拟。'
  },
  {
    id: 'node-rmp-sidm-structure',
    title: '自相互作用暗物质结构形成 (SIDM Structure Formation)',
    domainId: 'domain-cosmology',
    type: 'frontier',
    coords: { x: 22.0, y: 3.5 },
    legs: ['obj-sidm-halo', 'obj-galaxy-cosmic-structure', 'obj-primordial-blackhole'],
    formula: '\\frac{\\sigma}{m} \\sim 1 \\text{ cm}^2/\\text{g} \\implies \\rho_{\\text{core}} \\text{ (vs. NFW Cusp)}',
    abstract: 'RMP 2025：暗物质自散射在卫星星系至星系团多尺度的能量-动量输运；解决核-尖问题与旋转曲线多样性。'
  },
  {
    id: 'node-rmp-stoch-thermo-macro',
    title: '宏观非平衡热力学 (Macroscopic Nonequilibrium Thermodynamics)',
    domainId: 'domain-stat-complex',
    type: 'theory',
    coords: { x: -1.0, y: -2.2 },
    legs: ['obj-macro-stoch-thermo', 'obj-active-cell', 'obj-colloidal-hard-spheres'],
    formula: '\\Phi[\\rho] \\xrightarrow{\\text{eq.}} F[\\rho], \\quad \\Phi[\\rho] \\xrightarrow{\\text{neq.}} \\text{Lyapunov Function}',
    abstract: 'RMP 2025：大偏差理论构建宏观涨落理论；远离平衡时准势替代自由能，约束吸引子间稀有涨落跃迁率。'
  },
  {
    id: 'node-rmp-neural-criticality',
    title: '神经元网络临界性与重整化 (Neural Criticality & RG)',
    domainId: 'domain-stat-complex',
    type: 'frontier',
    coords: { x: -2.0, y: -1.8 },
    legs: ['obj-neural-stat-mech', 'obj-active-cell', 'obj-spin-glass'],
    formula: 'P(\\{\\sigma\\}) \\propto e^{-H_{\\text{maxent}}}, \\quad \\text{RG}: \\quad \\frac{dJ}{d\\ell} = \\beta(J)',
    abstract: 'RMP 2025：最大熵模型与现象学 RG 揭示真实神经网络的无参数普适预测；连接自旋玻璃、临界现象与生物信息处理。'
  },
  {
    id: 'node-rmp-solar-neutrino-precision',
    title: '太阳中微子精密核物理 (Solar Neutrino Precision Nuclear Physics)',
    domainId: 'domain-cosmology',
    type: 'method',
    coords: { x: 9.0, y: 3.5 },
    legs: ['obj-solar-pp-fusion', 'obj-electron-neutrino', 'obj-dense-neutrino-gas'],
    formula: '\\Phi_{^7\\text{Be}} = (5.00 \\pm 0.13) \\times 10^9 \\text{ cm}^{-2}\\text{s}^{-1} \\quad (\\text{Borexino})',
    abstract: 'RMP 2025 (Solar Fusion III)：pp 链与 CNO 循环核反应 S 因子第三次十年评估；太阳中微子通量达百分之几精度，约束恒星不透明度与金属丰度。'
  }
];

// --- RMP 2024–2026 新增对偶/等价关系 ---
export const ACADEMIC_RELATIONS_RMP_2024_2026: EquivalenceRelation[] = [
  {
    id: 'rel-kitaev-majorana',
    type: 'duality',
    source: 'obj-kitaev-qsl-rucl3',
    target: 'obj-majorana-wire',
    label: 'Kitaev QSL ↔ Topological Superconductor (Majorana Correspondence)',
    equation: 'H_K \\xrightarrow{\\text{Jordan-Wigner}} \\sum i J c_{2j-1} c_{2j} \\equiv H_{\\text{Kitaev chain}}',
    description: 'RMP 2025：Kitaev 蜂窝模型的自旋分数化 Majorana 费米子与一维拓扑超导 Majorana 零能模的精确数学对应；非阿贝尔编织统计共享。'
  },
  {
    id: 'rel-bcs-bec-unitary',
    type: 'rg-flow',
    source: 'obj-bcs-bec-crossover',
    target: 'obj-fermi-hubbard-gas',
    label: 'BCS-BEC Crossover: Condensed Matter ↔ Cold Atoms',
    equation: '\\frac{1}{k_F a_s}: -\\infty \\to +\\infty \\quad \\Longleftrightarrow \\quad \\text{CuO}_2 \\text{ / FeSe / Magic-Angle} \\leftrightarrow \\text{Feshbach } ^{6}\\text{Li}',
    description: 'RMP 2024：超导 BCS-BEC 渡越在凝聚态（铜氧化物、铁基、魔角）与超冷原子（Feshbach 共振）两大平台间的普适标度律对应。'
  },
  {
    id: 'rel-dual-unitary-eth',
    type: 'model-correspondence',
    source: 'obj-dual-unitary-circuit',
    target: 'obj-driven-open-quantum',
    label: 'Dual-Unitary Exact Dynamics ↔ Driven-Dissipative Universality',
    equation: '\\lambda_L^{\\text{DU}} = 2\\pi k_BT/\\hbar \\quad \\Longleftrightarrow \\quad \\text{Lindblad-Keldysh Fixed Points}',
    description: 'RMP 2025/2026：对偶酉线路精确可解的混沌/热化标度与驱动耗散量子物质 Lindblad-Keldysh 场论普适不动点的深层结构对应。'
  },
  {
    id: 'rel-neutrino-condensed',
    type: 'model-correspondence',
    source: 'obj-dense-neutrino-gas',
    target: 'obj-strongly-correlated',
    label: 'Dense Neutrino Gas ↔ Condensed Matter Many-Body',
    equation: 'H_{\\nu\\nu} \\sim G_F n_\\nu \\, \\mathbf{S}_i \\cdot \\mathbf{S}_j \\quad \\Longleftrightarrow \\quad H_{\\text{Heisenberg/BCS}}',
    description: 'RMP 2024：致密中微子气体味同位旋哈密顿量与凝聚态自旋/BCS 多体模型的数学同构；集体振荡对应超导能隙方程。'
  },
  {
    id: 'rel-spacetime-duality-ising',
    type: 'duality',
    source: 'obj-dual-unitary-circuit',
    target: 'obj-spin-glass',
    label: 'Space-Time Duality ↔ Disordered Spin Dynamics',
    equation: 'Z_{\\text{space}}[U] = Z_{\\text{time}}[U^T] \\quad \\Longleftrightarrow \\quad \\text{Aging / Memory in SG}',
    description: 'RMP 2025/2026：时空对偶下精确可解的关联函数与自旋玻璃中温度混沌、记忆效应的标度理论联系。'
  }
];

export const ACADEMIC_OBJECTS: PhysicsNode[] = [
  ...BASE_OBJECTS,
  ...ACADEMIC_OBJECTS_GPT_EXTENDED,
  ...ACADEMIC_OBJECTS_NEW,
  ...ACADEMIC_OBJECTS_FAMOUS_LABS,
  ...QUANTUM_HARDWARE_ROUTES_OBJECTS,
  ...ACADEMIC_OBJECTS_RMP_2024_2026
];
export const ACADEMIC_RESEARCH_NODES: ResearchRoute[] = [
  ...ACADEMIC_RESEARCH_NODES_GPT_EXTENDED,
  ...ACADEMIC_THEORIES_NEW,
  ...ACADEMIC_METHODS_NEW,
  ...ACADEMIC_FRONTIER_NODES_HIGH_POTENTIAL,
  ...QUANTUM_HARDWARE_ROUTES_NODES,
  ...ACADEMIC_RESEARCH_NODES_RMP_2024_2026
];

export const ACADEMIC_RELATIONS = [
  // Renormalization Group (RG Flows)
  {
    id: 'rel-qcd-rg',
    type: 'rg-flow',
    source: 'obj-planck',
    target: 'obj-proton',
    label: 'QCD Renormalization Group Flow (Asymptotic Freedom)',
    equation: '\\mu \\frac{d g}{d \\mu} = \\beta(g) < 0',
    description: '微观短距离能标下强耦合常数衰减为零（微扰可算），随探针尺度扩大能标下降，强作用暴涨触发 Quark Confinement。'
  },
  {
    id: 'rel-qed-rg',
    type: 'rg-flow',
    source: 'obj-higgs',
    target: 'obj-hydrogen',
    label: 'QED Vacuum Polarization & Charge Screening',
    equation: '\\alpha(q^2) = \\frac{\\alpha(0)}{1 - \\frac{\\alpha(0)}{3\\pi}\\ln(q^2/m_e^2)}',
    description: '基本量子电动力学中裸电荷由于虚电子对极化而被屏蔽，在低能原子尺度收敛至精细结构常数 alpha ≈ 1/137.036。'
  },

  // Dualities
  {
    id: 'rel-ads-cft',
    type: 'duality',
    source: 'obj-blackhole-m87',
    target: 'obj-qgp',
    label: 'AdS/CFT Gauge-Gravity Duality',
    equation: 'Z_{\\text{bulk}}[g_{\\mu\\nu}] \\equiv \\left\\langle \\exp\\left( \\int d^d x \\, \\phi_0 T_{\\mu\\nu} \\right) \\right\\rangle_{\\text{boundary CFT}}',
    description: 'd+1 维 Anti-de Sitter 强引力弯曲背景下的黑洞落体动力学，精确对偶等价于 d 维边界强耦合夸克-胶子等离子体 (QGP) 的剪切黏度极限 (\\eta/s = \\hbar / 4\\pi k_B)。'
  },

  // Model Correspondences
  {
    id: 'rel-dirac-model',
    type: 'model-correspondence',
    source: 'obj-hydrogen',
    target: 'obj-tb-graphene',
    label: 'Operator Isomorphism: Relativistic Dirac to Solid-State Moire Band',
    equation: 'H_D = c \\boldsymbol{\\alpha}\\cdot\\mathbf{p} + \\beta m c^2 \\iff H_{\\text{moire}} = v_F (\\sigma_x p_x + \\sigma_y p_y)',
    description: '单电子高能狄拉克相对论波动方程，在二维晶体莫尔势场中形式完全同构地形变为描述有效能带平坦化的低能极值哈密顿量。'
  },
  ...ACADEMIC_RELATIONS_RMP_2024_2026
];

// --- 3D Canvas Compatibility Exports & Conversions ---
export const DOMAIN_CLOUDS = ACADEMIC_DOMAINS.map(d => ({
  ...d,
  center: [
    (d.bounds.xMin + d.bounds.xMax) / 2,
    (d.bounds.yMin + d.bounds.yMax) / 2,
    0
  ] as [number, number, number],
  radius: Math.abs(d.bounds.xMax - d.bounds.xMin) / 2
}));

export const OBJECTS = ACADEMIC_OBJECTS.map(o => ({
  ...o,
  coords: [
    o.coords?.x ?? 0,
    o.coords?.y ?? 0,
    0
  ] as [number, number, number],
  color: o.color || '#38bdf8',
  size: o.size || 0.6
}));

export const RESEARCH_NODES = ACADEMIC_RESEARCH_NODES.map(n => ({
  ...n,
  coords: [
    n.coords?.x ?? (n.points && n.points[0] ? n.points[0].x : 0),
    n.coords?.y ?? (n.points && n.points[0] ? n.points[0].y : 0),
    0
  ] as [number, number, number],
  color: n.color || '#a855f7'
}));

export const RELATION_LINKS = ACADEMIC_RELATIONS;

