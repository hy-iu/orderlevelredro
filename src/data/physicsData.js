/**
 * Rigorous Physics Energy-Scale Data (PDG - Particle Data Group 2024/2026 Reference)
 * Includes Particle Uncertainties (Error Bars / Decay Widths) & Fundamental Force Ranges.
 */

export const ACADEMIC_DOMAINS = [
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
    symbol: 'h⁰',
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
    symbol: 'Z⁰',
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
    symbol: 'QGP',
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
    symbol: 'MA-TBG',
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
    symbol: 'QSL',
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
    symbol: 'ABP',
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
    symbol: 'CMB',
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
    id: 'obj-quark-gluon',
    label: '夸克与胶子 (Quarks & Gluons)',
    pdgCode: 'PDG-QG-QCD',
    domainId: 'domain-hadron-nuclear',
    coords: { x: -18.0, y: 8.5 },
    errorBar: { dx: 0.1, dy: 0.1 },
    symbol: 'q, g',
    type: 'fundamental',
    specs: {
      length: '10^{-18} \\text{ m}',
      energy: '200 \\text{ MeV} - 173 \\text{ GeV}',
      time: '10^{-24} \\text{ s}',
      lagrangian: '\\mathcal{L}_{QCD} = \\bar{q}(i\\gamma^\\mu D_\\mu - m)q - \\frac{1}{4}G_{\\mu\\nu}^a G^{a\\mu\\nu}'
    },
    annotation: '色规范能标下的渐进自由与色禁闭绝热相变核心媒介。'
  },
  {
    id: 'obj-higgs-neutrino',
    label: '希格斯与中微子 (Higgs & Neutrinos)',
    pdgCode: 'PDG-EW-HN',
    domainId: 'domain-ew',
    coords: { x: -17.8, y: 11.1 },
    errorBar: { dx: 0.05, dy: 0.05 },
    symbol: 'h⁰, \\nu',
    type: 'fundamental',
    specs: {
      length: '1.57 \\times 10^{-18} \\text{ m}',
      energy: '125 \\text{ GeV} / < 0.1 \\text{ eV}',
      time: '10^{-22} \\text{ s}',
      lagrangian: '\\mathcal{L}_{Yukawa} = -y_f \\bar{L} H f_R + \\frac{c_5}{\\Lambda} (L H)^2'
    },
    annotation: '电弱自发对称性破缺与中微子马约拉纳跷跷板 (Seesaw) 质量起源。'
  },
  {
    id: 'obj-nucleus-dense',
    label: '原子核与致密核物质 (Nuclei & Dense Matter)',
    pdgCode: 'PDG-NUCL-01',
    domainId: 'domain-hadron-nuclear',
    coords: { x: -14.8, y: 7.5 },
    errorBar: { dx: 0.15, dy: 0.1 },
    symbol: 'A, n_{core}',
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
    symbol: 'Sr/Yb Clock',
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
    symbol: 'e^- Lattice',
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
    symbol: 'Hubbard-e',
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
    symbol: 'QSL, Anyon',
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
    symbol: 'MHD',
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
    symbol: 'Cell',
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
    symbol: 'Galaxies',
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
    legs: ['obj-higgs-neutrino', 'obj-quark-gluon'],
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
    symbol: 'l_s',
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
    symbol: 'X(3872), P_c',
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
    symbol: 'NaK / KRb',
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
    symbol: 'RuO_2 / MnTe',
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
    symbol: 'NS-NS Merger',
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
    legs: ['obj-electron-neutrino', 'obj-sterile-neutrino', 'obj-higgs-neutrino'],
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
    legs: ['obj-cmb', 'obj-blackhole-early-universe', 'obj-galaxy-cosmic-structure'],
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

export const ACADEMIC_OBJECTS = [
  ...BASE_OBJECTS,
  ...ACADEMIC_OBJECTS_GPT_EXTENDED,
  ...ACADEMIC_OBJECTS_NEW,
  ...ACADEMIC_OBJECTS_FAMOUS_LABS
];
export const ACADEMIC_RESEARCH_NODES = [
  ...ACADEMIC_RESEARCH_NODES_GPT_EXTENDED,
  ...ACADEMIC_THEORIES_NEW,
  ...ACADEMIC_METHODS_NEW,
  ...ACADEMIC_FRONTIER_NODES_HIGH_POTENTIAL
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
  }
];
