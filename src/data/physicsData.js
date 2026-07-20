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
export const ACADEMIC_OBJECTS = [
  // Section I: Planck & GUT
  {
    id: 'obj-planck',
    label: 'Planck Mass (M_P)',
    pdgCode: 'PDG-QG-01',
    domainId: 'domain-qg-gut',
    coords: { x: -35, y: 28.08 },
    errorBar: { dx: 0.2, dy: 0.15 }, // PDG Error Bar / Width
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
    errorBar: { dx: 0.5, dy: 0.4 },
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

  // Section II: Electroweak & HEP (PDG Standard Model Particles)
  {
    id: 'obj-higgs',
    label: 'Higgs Boson (h⁰)',
    pdgCode: 'PDG-SM-H0',
    domainId: 'domain-ew',
    coords: { x: -18.0, y: 11.098 },
    errorBar: { dx: 0.15, dy: 0.08 }, // Mass Uncertainty: 125.25 +/- 0.17 GeV
    symbol: 'h⁰',
    type: 'fundamental',
    specs: {
      length: '1.5 \\times 10^{-18} \\text{ m}',
      energy: '125.25 \\pm 0.17 \\text{ GeV}',
      decayWidth: '\\Gamma_h = 3.2_{-2.2}^{+2.8} \\text{ MeV}',
      time: '1.56 \\times 10^{-22} \\text{ s}',
      lagrangian: '\\mathcal{L} = |D_\\mu H|^2 - \\mu^2 |H|^2 - \\lambda |H|^4'
    },
    annotation: 'PDG 2024 精确推荐：电弱自发对称性破缺 (SSB) 阶算符，测量衰变宽度 3.2 MeV。'
  },
  {
    id: 'obj-top-quark',
    label: 'Top Quark (t)',
    pdgCode: 'PDG-SM-t',
    domainId: 'domain-ew',
    coords: { x: -18.5, y: 11.237 },
    errorBar: { dx: 0.12, dy: 0.1 }, // Mass: 172.69 +/- 0.30 GeV
    symbol: 't',
    type: 'fundamental',
    specs: {
      length: '1.0 \\times 10^{-19} \\text{ m}',
      energy: '172.69 \\pm 0.30 \\text{ GeV}',
      decayWidth: '\\Gamma_t = 1.42 \\pm 0.19 \\text{ GeV}',
      time: '5.0 \\times 10^{-25} \\text{ s}',
      lagrangian: 'y_t \\bar{Q}_L \\tilde{H} t_R + \\text{h.c.}'
    },
    annotation: 'PDG 2024 精确推荐：Yukawa 因子 y_t ≈ 0.99，衰变极快以致无法形成束缚态。'
  },
  {
    id: 'obj-z-boson',
    label: 'Z⁰ Gauge Boson',
    pdgCode: 'PDG-SM-Z0',
    domainId: 'domain-ew',
    coords: { x: -18.1, y: 10.96 },
    errorBar: { dx: 0.1, dy: 0.05 },
    symbol: 'Z⁰',
    type: 'fundamental',
    specs: {
      length: '2.1 \\times 10^{-18} \\text{ m}',
      energy: '91.1876 \\pm 0.0021 \\text{ GeV}',
      decayWidth: '\\Gamma_Z = 2.4952 \\pm 0.0023 \\text{ GeV}',
      time: '2.64 \\times 10^{-25} \\text{ s}',
      lagrangian: '\\mathcal{L}_{NC} = -\\frac{g}{2\\cos\\theta_W} \\bar{\\psi}\\gamma^\\mu (g_V - g_A\\gamma^5)\\psi Z_\\mu'
    },
    annotation: 'PDG 核心推荐：中性弱流传输体，严格测定包含轻中微子代数为 3。'
  },
  {
    id: 'obj-w-boson',
    label: 'W± Gauge Boson',
    pdgCode: 'PDG-SM-W',
    domainId: 'domain-ew',
    coords: { x: -18.2, y: 10.905 },
    errorBar: { dx: 0.1, dy: 0.06 },
    symbol: 'W^\\pm',
    type: 'fundamental',
    specs: {
      length: '2.4 \\times 10^{-18} \\text{ m}',
      energy: '80.377 \\pm 0.012 \\text{ GeV}',
      decayWidth: '\\Gamma_W = 2.085 \\pm 0.042 \\text{ GeV}',
      time: '3.16 \\times 10^{-25} \\text{ s}',
      lagrangian: '\\mathcal{L}_{CC} = -\\frac{g}{\\sqrt{2}} \\bar{\\psi}_L \\gamma^\\mu W_\\mu^- \\psi_L + \\text{h.c.}'
    },
    annotation: 'PDG 核心推荐：带电弱流媒介，介导夸克 CKM 混合与中子 β 衰变。'
  },
  {
    id: 'obj-tau-lepton',
    label: 'Tau Lepton (τ⁻)',
    pdgCode: 'PDG-SM-tau',
    domainId: 'domain-ew',
    coords: { x: -17.0, y: 9.25 },
    errorBar: { dx: 0.1, dy: 0.04 },
    symbol: '\\tau^-',
    type: 'fundamental',
    specs: {
      length: '10^{-17} \\text{ m}',
      energy: '1776.86 \\pm 0.12 \\text{ MeV}',
      time: '(290.3 \\pm 0.5) \\times 10^{-15} \\text{ s}',
      lagrangian: 'm_\\tau \\bar{\\tau} \\tau'
    },
    annotation: '第三代最重带电轻子，也是唯一能直接衰变为强子的轻子。'
  },

  // Section III: Hadronic & Nuclear Physics (PDG Hadron Spectrum)
  {
    id: 'obj-proton',
    label: 'Proton (p⁺)',
    pdgCode: 'PDG-HAD-p',
    domainId: 'domain-hadron-nuclear',
    coords: { x: -15.1, y: 8.972 },
    errorBar: { dx: 0.05, dy: 0.02 },
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
    errorBar: { dx: 0.05, dy: 0.02 },
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
    errorBar: { dx: 0.08, dy: 0.04 },
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
    errorBar: { dx: 0.05, dy: 0.03 },
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
    errorBar: { dx: 0.3, dy: 0.2 },
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
    errorBar: { dx: 0.02, dy: 0.01 },
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
    errorBar: { dx: 0.2, dy: 0.1 },
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
    errorBar: { dx: 0.15, dy: 0.1 },
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
    errorBar: { dx: 0.1, dy: 0.1 },
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
    errorBar: { dx: 0.15, dy: 0.1 },
    symbol: 'YBCO',
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
    errorBar: { dx: 0.2, dy: 0.15 },
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
    errorBar: { dx: 0.3, dy: 0.2 },
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
    errorBar: { dx: 0.4, dy: 0.3 },
    symbol: 'M87*',
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
    errorBar: { dx: 0.2, dy: 0.1 },
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

export const ACADEMIC_RESEARCH_NODES = [
  {
    id: 'node-room-superconductivity',
    title: 'PROBLEM A: Room-Temperature Superconductivity Mechanisms',
    domainId: 'domain-condensed-matter',
    coords: { x: -8.7, y: -1.9 },
    legs: ['obj-ybco', 'obj-tb-graphene', 'obj-hydrogen'],
    formula: 'T_c \\propto \\omega_{\\text{log}} \\exp\\left[ -\\frac{1+\\lambda}{\\lambda - \\mu^*(1+0.62\\lambda)} \\right]',
    abstract: '探索超越微扰 BCS 理论的强电子关联配对方程。如何在莫尔平带、声子协同与高压氢化物体系中实现 300 K 常压电荷无耗散输运？'
  },
  {
    id: 'node-dark-matter',
    title: 'PROBLEM B: Microscopic Nature of Dark Matter',
    domainId: 'domain-ew',
    coords: { x: -19.5, y: 6.8 },
    legs: ['obj-wimp', 'obj-cmb', 'obj-higgs'],
    formula: '\\Omega_{\\chi} h^2 \\approx \\frac{3 \\times 10^{-26} \\text{ cm}^3\\text{s}^{-1}}{\\langle \\sigma v \\rangle}',
    abstract: '结合地下低本底散射、深空宇宙背景辐射分布与 LHC 电弱截面限制，对未知的弱相互作用粒子或轴子算符进行联立求解。'
  },
  {
    id: 'node-qgp-deconfinement',
    title: 'PROBLEM C: Non-Perturbative QCD & Color Deconfinement Phase',
    domainId: 'domain-hadron-nuclear',
    coords: { x: -14.8, y: 8.5 },
    legs: ['obj-proton', 'obj-qgp', 'obj-top-quark'],
    formula: '\\beta(g) = -\\frac{g^3}{(4\\pi)^2}\\left(\\frac{11}{3}C_A - \\frac{4}{3}T_F n_f\\right)',
    abstract: '在微观强相互作用中，高能渐进自由如何向低能红外夸克禁闭过渡？重离子碰撞下极低切向黏滞系数与对称性恢复机制解析。'
  },
  {
    id: 'node-attosecond-physics',
    title: 'PROBLEM D: Ultrafast Quantum Control of Electronic States',
    domainId: 'domain-amo-atomic',
    coords: { x: -8.8, y: -0.2 },
    legs: ['obj-attosecond', 'obj-tb-graphene', 'obj-hydrogen'],
    formula: 'H(t) = H_0 + e \\mathbf{r} \\cdot \\mathbf{E}_0 \\cos(\\omega t)',
    abstract: '利用阿秒至飞秒高强相干激光驱动系统远离局域平衡态，实现光诱导临界相变与 Floquet 拓扑能带工程。'
  },
  {
    id: 'node-blackhole-info',
    title: 'PROBLEM E: Quantum Black Hole Entropy & Information Paradox',
    domainId: 'domain-qg-gut',
    coords: { x: -12.0, y: 12.0 },
    legs: ['obj-planck', 'obj-blackhole-m87', 'obj-cmb'],
    formula: 'S_{\\text{gen}} = \\frac{\\text{Area}(\\gamma)}{4G_{N}} + S_{\\text{semi-classical}}(\\Sigma)',
    abstract: '利用“岛屿假说 (Islands Formula)”与霍金辐射量子纠缠佩奇曲线 (Page Curve)，寻求广义相对论奇点与量子场幺正性演化的统一。'
  }
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
