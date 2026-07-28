# 补习计划：从核物理/粒子物理到非平衡统计与 BAMPS
# 模块化自学课程 · 2026 年秋

> **使用方法**：每个模块（M0-M15）设计为**一次独立对话**的主题。
> 开新对话时，把本文件路径和模块编号告诉 AI，例如：
> "请按照 ~/Documents/GitHub/orderlevelredro/STUDY_PLAN.md 中的 M05 模块，带我补习非阿贝尔规范场论与 QCD。"
> AI 会根据模块中的目标、文献、本地文件路径和练习来引导你。

---

## 依赖关系图

```
M00 数学方法 ──┬──→ M01 经典力学/统计力学 ──→ M02 量子力学 ──→ M03 电动力学/经典场论
               │                                                      │
               │         ┌────────────────────────────────────────────┘
               │         ▼
               │    M04 QFT I（正则量子化、路径积分、QED）
               │         │
               │         ▼
               │    M05 QFT II（非阿贝尔规范场、QCD、重整化）──→ M06 核物理与粒子物理
               │         │                                          │
               │         ▼                                          ▼
               │    M07 有限温度场论 ──────────────────────→ M11 重离子唯象
               │         │                                          │
               │         ▼                                          ▼
               └──→ M08 非平衡统计力学 ──→ M09 相对论流体力学 ──→ M10 BAMPS 深入
                                                                   │
                                                                   ▼
                                                    M12 涌现与多尺度物理
                                                    M13 AI + 物理
                                                    M14 量子模拟规范场论
                                                    M15 非平衡 QFT 与开放量子系统
```

---

## M00 · 数学方法（按需查阅，不必通读）

**目标**：补齐后续模块中反复用到的数学工具，遇到不懂的回来查。

**核心内容**：
- 复分析（留数定理、解析延拓 → Matsubara 求和）
- 群论基础（SU(2), SU(3), Lie 代数, 表示论 → 规范场论）
- 微分几何入门（纤维丛、联络、曲率 → 规范场的几何语言）
- 泛函分析初步（Hilbert 空间、算符、谱定理 → QFT）
- 特殊函数（Bessel, Legendre, Gamma → 散射截面、热核）

**参考书**：
- Arfken, Weber, Harris — *Mathematical Methods for Physicists*（工具书，按需查）
- Nakahara — *Geometry, Topology and Physics*（纤维丛、规范场几何，M05 前读 Ch1-10）
- 曾谨言 — 《量子力学》附录中的群论部分（SU(2)/SU(3) 快速入门）

**本地文件**：
- `~/Documents/1/note/books/分析力学.pdf`（变分法、正则变换复习）

**练习**：
- [ ] 手推 SU(3) 的 Gell-Mann 矩阵、结构常数 $f^{abc}$、Casimir $C_F=4/3, C_A=3$
- [ ] 用留数定理计算一个 Matsubara 求和（为 M07 做准备）
- [ ] 写出 $U(1)$ 和 $SU(N)$ 规范变换下协变导数的变换规则

**预计时间**：不单独花时间，贯穿后续模块。

---

## M01 · 经典力学与统计力学（复习 + 深化）

**目标**：重建从 Hamilton 力学到统计系综的逻辑链，重点理解 **Boltzmann 方程的统计力学起源**。

**核心内容**：
1. Hamilton 力学、正则变换、Hamilton-Jacobi 方程、Liouville 定理
2. 微正则/正则/巨正则系综、配分函数、自由能
3. **BBGKY 层级** → Boltzmann 方程的推导（分子混沌假设 Stosszahlansatz）
4. H 定理、细致平衡、熵增
5. Enskog 方程（稠密气体修正）→ 你的本科论文

**参考书**：
- Landau & Lifshitz — *Statistical Physics, Part 1*（§1-§30 系综，§§ 碰撞积分）
- Huang — *Statistical Mechanics*（Ch3 BBGKY, Ch5 Boltzmann 方程）
- **Cercignani — *The Boltzmann Equation and Its Applications***（Boltzmann 方程的数学圣经）
- Landau & Binder — *A Guide to Monte Carlo Simulations in Statistical Physics*

**本地文件**：
- `~/Documents/1/books/非线性玻耳兹曼方程.pdf` ← **关键**
- `~/Documents/1/books/非均匀气体的数学理论.pdf`（Chapman-Enskog 展开）
- `~/Documents/1/books/modEnskog.pdf`（修正 Enskog 方程）
- `~/Documents/1/books/clausius1879.pdf`（Clausius 原始论文，历史视角）
- `~/Documents/1/books/MCSiSP19.pdf`（MC 模拟讲义）
- `~/Documents/1/books/分子动力学模拟的理论与实践.pdf`
- `~/Documents/1/B/Enskog方程的蒙特卡洛模拟计算_吴浩源_致理-物02_2020012594.pdf`（你的本科论文）
- `~/Documents/1/note/books/经典力学[梁昆淼](理论力学部分).pdf`
- `~/Documents/1/基础物理学/热学/`（助教材料，快速复习）

**练习**：
- [ ] 从 Liouville 方程出发，手推 BBGKY 层级的第一级
- [ ] 在分子混沌假设下，从 BBGKY 推出 Boltzmann 方程
- [ ] 证明 H 定理：$\frac{dH}{dt} \leq 0$
- [ ] 用 DSMC（Direct Simulation Monte Carlo）方法模拟硬球气体达到 Maxwell 分布（你本科做过 Enskog 版本，重做 Boltzmann 版本）
- [ ] 推导 Chapman-Enskog 展开到 Navier-Stokes 阶，得到黏性系数 $\eta$ 的表达式

**预计时间**：2 周（你有本科基础，主要是深化和补 BBGKY 推导）

---

## M02 · 量子力学（复习 + 二次量子化）

**目标**：复习量子力学核心，**重点掌握二次量子化和多体量子力学**，为 QFT 做准备。

**核心内容**：
1. 量子力学公设、Dirac 符号、对称性与守恒律（复习）
2. 角动量、自旋、全同粒子（复习）
3. **二次量子化**：产生/湮灭算符、Fock 空间、Wick 定理
4. 多体 Green 函数初步（零温）
5. 散射理论（Born 近似、分波分析 → 粒子物理散射截面）

**参考书**：
- **Sakurai & Napolitano — *Modern Quantum Mechanics*, 3rd ed.**（你的教材）
- Fetter & Walecka — *Quantum Theory of Many-Particle Systems*（二次量子化、Green 函数）
- Peskin & Schroeder — Ch2.1-2.3（从 QM 到 QFT 的桥梁）

**本地文件**：
- `~/Documents/1/QM/Modern Quantum Mechanics Third Edition.pdf`
- `~/Documents/1/QM/L01.pdf` ~ `L07.pdf`（课件）
- `~/Documents/1/QM/hw/`（作业）

**练习**：
- [ ] 用二次量子化语言重写谐振子和氢原子
- [ ] 推导 Wick 定理并计算一个 4 点关联函数
- [ ] 计算 Yukawa 势的 Born 散射截面（为 M04 QED 散射做准备）
- [ ] 用 Fock 空间语言描述 Bose-Einstein 凝聚（连接 M07 和 M12）

**预计时间**：1.5 周（复习为主，二次量子化是新重点）

---

## M03 · 电动力学与经典场论（复习 + 场论语言）

**目标**：用**场论语言**重新理解电磁学，建立 Lagrangian 密度 → 运动方程 → Noether 定理 → 规范对称性的思维链。

**核心内容**：
1. Maxwell 方程的协变形式、电磁场张量 $F^{\mu\nu}$
2. Lagrangian 密度 $\mathcal{L} = -\frac{1}{4}F_{\mu\nu}F^{\mu\nu} - j_\mu A^\mu$
3. **Noether 定理**：连续对称性 → 守恒流（能量-动量张量、电荷守恒）
4. **$U(1)$ 规范不变性**：$A_\mu \to A_\mu + \partial_\mu \Lambda$ 作为局域对称性
5. 经典场的 Green 函数、推迟/超前传播子
6. 辐射、Liénard-Wiechert 势（复习）

**参考书**：
- Jackson — *Classical Electrodynamics*, 3rd ed.（Ch6 协变形式, Ch12 规范）
- **Landau & Lifshitz — *The Classical Theory of Fields***（最精炼的协变场论）
- Goldstein — *Classical Mechanics*（Ch13 经典场论，Noether 定理）

**本地文件**：
- `~/Documents/1/note/books/电动力学.pdf`
- `~/Documents/1/基础物理学/电磁学/`（助教材料）

**练习**：
- [ ] 从 $\mathcal{L}_{EM}$ 出发，用 Euler-Lagrange 方程推出 Maxwell 方程
- [ ] 用 Noether 定理推导电磁场的能量-动量张量 $T^{\mu\nu}$
- [ ] 证明 $U(1)$ 规范变换下 $\mathcal{L}$ 不变，并写出守恒流
- [ ] 思考题：如果要把 $U(1)$ 推广到 $SU(3)$，需要做什么？（为 M05 埋伏笔）

**预计时间**：1 周（复习为主，重点是场论语言和 Noether 定理）

---

## M04 · 量子场论 I：正则量子化、路径积分、QED

**目标**：系统建立 QFT 框架。从标量场 → 旋量场 → 电磁场，掌握 **Feynman 规则**和**单圈重整化**。

**核心内容**：
1. 实/复标量场的正则量子化（Klein-Gordon 场、Fock 空间）
2. **路径积分量子化**（生成泛函 $Z[J]$、Wick 转动、Feynman 传播子）
3. Dirac 场的量子化（旋量、反对易关系、费曼传播子）
4. **QED**：$\mathcal{L}_{QED} = \bar\psi(i\gamma^\mu D_\mu - m)\psi - \frac{1}{4}F^2$
5. Feynman 规则、树图散射（$e^-e^- \to e^-e^-$, $e^+e^- \to \mu^+\mu^-$）
6. **单圈重整化**：自能、顶点修正、真空极化、Ward 恒等式
7. 跑动耦合 $\alpha(Q^2)$、Landau 极点

**参考书**：
- **Peskin & Schroeder — *An Introduction to Quantum Field Theory***（主教材，Ch1-10）
- Schwartz — *Quantum Field Theory and the Standard Model*（更现代，Ch1-16）
- Zee — *Quantum Field Theory in a Nutshell*（直觉优先，补充阅读）
- 徐喆老师教过的"玻耳兹曼方程及其应用"课程笔记（如果有留存）

**本地文件**：
- `~/Documents/1/note/1807QFT/1807.pdf`（你的 QFT 课程笔记 ← **先读这个，看你已经掌握了多少**）
- `~/Documents/1/books/1807_QFT.pdf`（同一门课的教材/讲义）
- `~/Documents/1/s/2023-functional-integrals.pdf`（路径积分补充）

**练习**：
- [ ] 手推标量场的 Feynman 传播子 $\Delta_F(x-y)$
- [ ] 从路径积分推导 $\phi^4$ 理论的 Feynman 规则
- [ ] 计算 $e^+e^- \to \mu^+\mu^-$ 的微分散射截面（Peskin Ch5）
- [ ] 计算 QED 单圈真空极化 $\Pi^{\mu\nu}(q)$，验证 Ward 恒等式
- [ ] 推导 QED 的 $\beta$ 函数：$\beta(e) = \frac{e^3}{12\pi^2}$
- [ ] 思考题：QED 的跑动耦合在紫外发散（Landau 极点），QCD 会怎样？（为 M05 埋伏笔）

**预计时间**：4-5 周（核心模块，必须扎实）

---

## M05 · 量子场论 II：非阿贝尔规范场论与 QCD

**目标**：掌握 **Yang-Mills 理论**和 **QCD 的拉氏量**，理解**渐近自由**和**色禁闭**。

**核心内容**：
1. 非阿贝尔规范对称性：$SU(N)$ 规范场 $A_\mu^a$、协变导数 $D_\mu = \partial_\mu - ig T^a A_\mu^a$
2. **Yang-Mills 拉氏量**：$\mathcal{L}_{YM} = -\frac{1}{4}F^a_{\mu\nu}F^{a\mu\nu}$，$F^a_{\mu\nu} = \partial_\mu A^a_\nu - \partial_\nu A^a_\mu + g f^{abc}A^b_\mu A^c_\nu$
3. **QCD 拉氏量**：$\mathcal{L}_{QCD} = \sum_f \bar\psi_f(i\gamma^\mu D_\mu - m_f)\psi_f - \frac{1}{4}G^a_{\mu\nu}G^{a\mu\nu}$
4. Faddeev-Popov 鬼场、BRST 对称性
5. **渐近自由**：$\beta(g) = -\frac{g^3}{(4\pi)^2}\left(\frac{11}{3}C_A - \frac{4}{3}T_F n_f\right)$（负号！）
6. **色禁闭**：Wilson 圈、面积律、弦张力（定性理解）
7. 手征对称性破缺、Goldstone 定理、$\pi$ 介子作为赝 Goldstone 玻色子
8. 算符乘积展开（OPE）、部分子模型、DGLAP 方程

**参考书**：
- **Peskin & Schroeder** Ch15-19（非阿贝尔规范场、QCD、渐近自由）
- **Schwartz** Ch25-30（QCD 部分写得比 P&S 更清楚）
- Weinberg — *The Quantum Theory of Fields, Vol. II*（最严格，参考用）
- Gross, Wilczek, Politzer 的诺奖演讲（渐近自由的原始物理论证）

**本地文件**：
- `~/Documents/1/note/1807QFT/1807.pdf`（检查是否覆盖了非阿贝尔部分）
- `~/Documents/1/HEPE/`（高能物理课件，部分子模型、Higgs 机制）
- `~/Documents/1/HEPE/Tsinghua_AI_in_HEP.pdf`（AI 在高能物理中的应用 ← 连接 M13）

**练习**：
- [ ] 手推 $SU(3)$ 的 Feynman 规则（胶子传播子、三胶子/四胶子顶点、鬼场）
- [ ] 计算 QCD 的 $\beta$ 函数到单圈，解释为什么 $n_f \leq 16$ 时渐近自由
- [ ] 用 Wilson 圈论证：如果 $\langle W(C) \rangle \sim e^{-\sigma \cdot \text{Area}}$，则夸克禁闭
- [ ] 推导 QCD 的手征 Ward 恒等式，解释 $m_\pi^2 \propto m_q$
- [ ] 思考题：QCD 在有限温度下会发生什么？（→ M07）

**预计时间**：4 周

---

## M06 · 核物理与粒子物理（标准模型 + 强子物理 + 重离子入门）

**目标**：建立粒子物理标准模型的全景，理解**强子谱**和**重离子碰撞的物理动机**。

**核心内容**：
1. 标准模型全景：$SU(3)_C \times SU(2)_L \times U(1)_Y$，粒子谱，Higgs 机制
2. 强子物理：夸克模型、介子/重子谱、量子数（$J^{PC}$, 同位旋, 奇异数）
3. 深度非弹性散射（DIS）、部分子分布函数（PDF）
4. **重离子碰撞物理动机**：为什么要撞重离子？QGP 是什么？
5. RHIC 和 LHC 重离子实验概览（STAR, PHENIX, ALICE, CMS）
6. 关键观测量：椭圆流 $v_2$、喷注淬火 $\hat{q}$、J/$\psi$ 压低、手征磁效应
7. QCD 相图：$(T, \mu_B)$ 平面、临界点、色超导

**参考书**：
- **Griffiths — *Introduction to Elementary Particles***（粒子物理入门，Ch1-10）
- **Wong — *Introduction to High-Energy Heavy-Ion Collisions***（重离子入门经典）
- 施舒哲的 INSPIRE 页面上的综述文章（最新重离子唯象）
- 徐喆老师的 PRC 论文（你的本地文件）

**本地文件**：
- `~/Documents/1/HEPE/`（CP Violation, Higgs, AI in HEP）
- `~/Documents/1/PA/`（粒子宇宙学 2025 课程笔记 ← **重要**）
- `~/Documents/1/bac/PRC/PRC05.pdf`（PRC 论文）
- `~/Documents/1/bac/PRC/PhysRevC.71.064901.pdf`（BAMPS 早期论文）
- `~/Desktop/HENP/`（高能核物理截屏）
- `~/Downloads/RMP_2025/...Neutron_stars_and_the_dense_matter_equation_of_state.pdf`（中子星与 QCD 状态方程）

**练习**：
- [ ] 画出标准模型粒子谱全图，标注所有量子数
- [ ] 用夸克模型分类 $\pi, K, \rho, \omega, J/\psi, \Upsilon, p, n, \Delta, \Lambda, \Omega$
- [ ] 估算 RHIC ($\sqrt{s_{NN}}=200$ GeV) 和 LHC ($\sqrt{s_{NN}}=5.02$ TeV) 的初始温度
- [ ] 读 Wong 的书 Ch1-3，写一页总结：重离子碰撞的时空演化图像
- [ ] 读你本地的 PRC 论文，理解 BAMPS 要解决什么物理问题

**预计时间**：3 周

---

## M07 · 有限温度量子场论

**目标**：掌握**热场论**的两套形式体系（虚时 Matsubara + 实时 Keldysh），能计算 QCD 热力学量。

**核心内容**：
1. 有限温度量子统计：密度矩阵 $\hat\rho = e^{-\beta \hat H}/Z$，配分函数的路径积分表示
2. **虚时（Matsubara）形式**：玻色/费米 Matsubara 频率 $\omega_n = 2n\pi T / (2n+1)\pi T$
3. 有限温度 Feynman 规则、热传播子
4. **实时形式（Schwinger-Keldysh）**：时间围道、$2\times2$ 矩阵传播子
5. 硬热圈（HTL）近似、Debye 屏蔽质量 $m_D \sim gT$
6. **QCD 热力学**：自由能、压力、迹反常 $\epsilon - 3P$（格点 QCD 结果）
7. 有限温度下的手征对称性恢复、退禁闭相变
8. 有限化学势 $\mu_B$：符号问题（sign problem）

**参考书**：
- **Kapusta & Gale — *Finite-Temperature Field Theory: Principles and Applications***（你的教材 ← **主教材**）
- **Le Bellac — *Thermal Field Theory***（更严格，实时形式讲得好）
- **Laine & Vuorinen — *Basics of Thermal Field Theory***（最现代，有 QCD 应用）
- Altland & Simons — *Condensed Matter Field Theory*（凝聚态视角，路径积分）

**本地文件**：
- `~/Documents/1/FTFT/Finite-temperature field theory principles and applications (Joseph I. Kapusta, Charles Gale).pdf` ← **主教材**
- `~/Documents/1/FTFT/Thermal Field Theory (Le Bellac, Michel).pdf`
- `~/Documents/1/FTFT/Basics of Thermal Field Theory A Tutorial on Perturbative Computations (Mikko Laine, Aleksi Vuorinen).pdf`
- `~/Documents/1/FTFT/Condensed Matter Field Theory (Altland A., Simons B.D.).pdf`
- `~/Documents/1/FTFT/FTFT-Chapter1.pdf` ~ `FTFT-Chapter6.pdf`（课程笔记 ← **先通读**）
- `~/Documents/1/FTFT/cq.pdf`（你自己的笔记）
- `~/Documents/1/FTFT/第一次作业.jpg` ~ `第五次作业.png`（你做过的作业）
- `~/Downloads/RMP_2024/...When_superconductivity_crosses_over_From_BCS_to_BEC.pdf`（BCS-BEC 过渡 ← 连接 M12）

**练习**：
- [ ] 用路径积分推导自由标量场的有限温度配分函数
- [ ] 计算自由玻色/费米气体的压力和能量密度（Stefan-Boltzmann 极限）
- [ ] 用 Matsubara 求和计算单圈自能 $\Pi(i\omega_n, \mathbf{k})$
- [ ] 推导 QED 的 Debye 屏蔽质量 $m_D^2 = e^2 T^2/3$
- [ ] 推导 QCD 的 HTL 胶子自能，理解磁质量为什么是非微扰的
- [ ] 对比格点 QCD 的 $\epsilon - 3P$ 曲线与微扰 HTL 结果，讨论偏差来源
- [ ] 思考题：为什么有限 $\mu_B$ 的格点 QCD 有 sign problem？这对重离子物理意味着什么？

**预计时间**：4 周（你已经上过这门课，这次是深化和补实时形式）

---

## M08 · 非平衡统计力学

**目标**：系统掌握**非平衡态**的理论框架，从 Boltzmann 方程到 Keldysh 场论到涨落定理。这是你未来研究方向的**理论根基**。

**核心内容**：
1. **Boltzmann 方程的完整结构**：碰撞积分、弛豫时间近似、BGK 模型
2. **Chapman-Enskog 展开**：从 Boltzmann → Euler → Navier-Stokes → Burnett
3. **相对论 Boltzmann 方程**：协变形式、Jüttner 分布、相对论输运系数
4. **线性响应理论**：Kubo 公式、Green-Kubo 关系（$\eta = \int_0^\infty dt \langle T^{xy}(t)T^{xy}(0)\rangle$）
5. **Schwinger-Keldysh 闭合时间路径**（CTP）：非平衡 Green 函数、Wigner 变换、梯度展开
6. **量子 Boltzmann 方程**：从 Keldysh 到量子输运
7. **涨落定理**：Jarzynski 等式、Crooks 定理、非平衡态的热力学第二定律
8. **开放量子系统**：Lindblad 方程、量子主方程、退相干

**参考书**：
- **de Groot & Mazur — *Non-Equilibrium Thermodynamics***（经典非平衡热力学）
- **Kadanoff & Baym — *Quantum Statistical Mechanics***（非平衡 Green 函数，Keldysh 原始框架）
- **Kamenev — *Field Theory of Non-Equilibrium Systems***（最现代的 Keldysh 场论教材）
- Cercignani — *The Boltzmann Equation and Its Applications*（数学严格性）
- 你本地的非线性 Boltzmann 方程讲义

**本地文件**：
- `~/Documents/1/books/非线性玻耳兹曼方程.pdf` ← **核心**
- `~/Documents/1/books/非均匀气体的数学理论.pdf`（Chapman-Enskog）
- `~/Documents/1/books/modEnskog.pdf`
- `~/Documents/1/B/Computer Simulation of Liquids AT2.pdf`（分子动力学模拟）
- `~/Documents/1/B/cu_mc/`（CUDA Monte Carlo）
- `~/Downloads/RMP_2025/...Macroscopic_stochastic_thermodynamics.pdf`（宏观随机热力学 ← **必读**）
- `~/Downloads/RMP_2025/...Statistical_mechanics_for_networks_of_real_neurons.pdf`（神经元网络的统计力学 ← 连接 M13）
- `~/Downloads/RMP_2025/...Photoinduced_nonequilibrium_states_in_Mott_insulators.pdf`（非平衡 Mott 绝缘体）
- `~/Downloads/RMP_2025/...Universality_in_driven_open_quantum_matter.pdf`（驱动开放量子物质的普适性）
- `~/Downloads/RMP_2025/...Spin-glass_dynamics_Experiment_theory_and_simulation.pdf`（自旋玻璃动力学 ← 连接 M13）

**练习**：
- [ ] 从相对论 Boltzmann 方程出发，用矩方法推导理想流体力学方程
- [ ] 用 Chapman-Enskog 展开到一阶，推导剪切黏性 $\eta$ 和体黏性 $\zeta$
- [ ] 用 Kubo 公式计算自由标量场的剪切黏性
- [ ] 写出 Schwinger-Keldysh 围道上的标量场传播子（$G^{++}, G^{+-}, G^{-+}, G^{--}$）
- [ ] 从 Keldysh 作用量推导量子 Boltzmann 方程
- [ ] 证明 Jarzynski 等式 $\langle e^{-\beta W}\rangle = e^{-\beta \Delta F}$
- [ ] 思考题：Boltzmann 方程的 H 定理和量子力学的幺正性矛盾吗？（→ 粗粒化、退相干）

**预计时间**：5 周（核心模块，你的未来方向建立在这上面）

---

## M09 · 相对论流体力学

**目标**：掌握 QGP 的流体力学描述，理解**从微观输运到宏观流体**的涌现过程。

**核心内容**：
1. 理想相对论流体力学：$T^{\mu\nu} = (\epsilon+P)u^\mu u^\nu - Pg^{\mu\nu}$，Bjorken 流
2. **黏性流体力学**：Israel-Stewart 理论、Navier-Stokes 的因果性问题
3. 各向异性流体力学（anisotropic hydrodynamics）
4. **流体力学化（hydrodynamization）vs 热化（thermalization）**
5. 椭圆流 $v_2$、高阶流谐波 $v_n$、流体力学响应
6. **$\eta/s$ 的下界**：KSS 猜想 $\eta/s \geq 1/4\pi$（AdS/CFT）
7. 自旋流体力学（spin hydrodynamics）← 你的本地文件有相关论文
8. 从 Boltzmann 方程到流体力学：矩方法、Grad 展开

**参考书**：
- **Rezzolla & Zanotti — *Relativistic Hydrodynamics***（最全面的相对论流体教材）
- Romatschke & Romatschke — *Relativistic Fluid Dynamics In and Out of Equilibrium*（Cambridge, 2019）
- Heinz & Snellings 综述：*Collective flow and viscosity in relativistic heavy-ion collisions* (Ann. Rev. Nucl. Part. Sci. 2013)

**本地文件**：
- `~/Documents/1/bac/src/dynamicQCD/jaiswal-et-al-2021-dynamics-of-qcd-matter-current-status.pdf` ← **必读综述**
- `~/Documents/1/bac/src/RHIC_Boltzmann/PhysRevLett.127.052301.pdf`
- `~/Documents/1/bac/src/RHIC_Boltzmann/2103.04896v2.pdf`
- `~/Documents/1/bac/src/RHIC_Boltzmann/2203.04766v2.pdf`
- `~/Documents/1/bac/src/QGP_MC/PhysRevD.109.076025.pdf`
- `~/Documents/1/bac/src/QGP_MC/HardProbes2023_016.pdf`
- `~/Documents/1/bac/src/ds_translated_hydrospin.pdf`（自旋流体力学）

**练习**：
- [ ] 推导 Bjorken 流的解析解：$\epsilon(\tau) = \epsilon_0 (\tau_0/\tau)^{4/3}$
- [ ] 从 Israel-Stewart 方程推导因果性条件
- [ ] 用 BAMPS 的矩方法，验证 Boltzmann 方程在长波极限下给出 Navier-Stokes
- [ ] 估算 QGP 的 $\eta/s$ 并与 KSS 下界比较
- [ ] 思考题：流体力学化不需要热化——这意味着什么？（→ 涌现的本质）

**预计时间**：3 周

---

## M10 · BAMPS 深入：算法、代码、物理

**目标**：彻底理解 BAMPS 的**物理内涵、数值算法和代码结构**，能够独立运行、修改和扩展。

**核心内容**：
1. **BAMPS 物理框架**：
   - 相对论 Boltzmann 方程：$p^\mu \partial_\mu f = C[f]$
   - 碰撞积分：$2\to2$ 弹性散射（胶子-胶子）、$2\leftrightarrow3$ 非弹性过程（胶子辐射/吸收）
   - Gunion-Bertsch 矩阵元（软胶子辐射）
   - 详细平衡与热化
2. **数值算法**：
   - Test Particle 方法（用 $N_{\text{test}}$ 个测试粒子代表一个物理粒子）
   - 几何碰撞判据（geometric collision criterion）
   - 时间步长选择、因果性约束
   - 初始条件：Glauber 模型、Color Glass Condensate (CGC)
3. **代码结构**（你的 `~/Documents/1/bac/src/`）：
   - `RHIC_Boltzmann/`：主输运代码
   - `QGP_MC/`：QGP 蒙特卡洛
   - `latticeBoltzmann/`：格子 Boltzmann 方法
   - `dynamicQCD/`：动态 QCD
   - `cuda_out/`：GPU 加速版本
4. **经典验证**（你做过的）：
   - 均匀系统的平衡态验证（Jüttner 分布）
   - 输运系数验证（$\eta/s$ vs 解析结果）
   - Bjorken 膨胀的流体力学极限
5. **扩展方向**：
   - 加入夸克自由度（目前 BAMPS 主要是纯胶子）
   - 有限化学势
   - 电磁场耦合（徐喆老师 2022 年的 Ohm 定律工作）
   - 量子修正（Uehling-Uhlenbeck 项）

**参考论文**：
- **Xu & Greiner, PRC 71, 064901 (2005)**：BAMPS 原始论文 ← 你的本地文件
- **Xu & Greiner, PRC 76, 024911 (2007)**：$2\leftrightarrow3$ 过程
- **Fochler, Xu, Greiner, PRL 102, 202301 (2009)**：喷注淬火
- **Zhou, Xu, Greiner, PRL 114, 182301 (2015)**：胶子 BEC 热化 ← 徐喆老师的论文
- El, Fochler, Xu, Greiner 系列论文

**本地文件**：
- `~/Documents/1/bac/BAMPS.pdf` ← **BAMPS 主文档**
- `~/Documents/1/bac/BAMPSforZtz/`（给徐喆的版本）
- `~/Documents/1/bac/BAMPS2025gemini_modified/`（2025 年修改版）
- `~/Documents/1/bac/src/`（全部源码）
- `~/Documents/1/bac/PRC/PhysRevC.71.064901.pdf`（BAMPS 原始论文）
- `~/Documents/1/bac/PRC/PRC05.pdf`
- `~/Documents/1/bac/理论推导和实验记录.pdf`
- `~/Documents/1/bac/code.pdf`, `code.pptx`（代码说明）
- `~/Documents/1/bac/slide/`, `slide1/`（报告幻灯片）
- `~/Documents/1/bac/draft/`（论文草稿）
- `~/Documents/1/bac/2025/`（2025 年最新相关论文）
- `~/Documents/1/bac/hujin.pdf`（胡进的笔记？）
- `~/Documents/1/bac/thesis/`（你的本科 Enskog 论文 ← 对比 BAMPS 的 MC 方法）

**练习**：
- [ ] 通读 BAMPS 原始论文（PRC 71, 064901），手推碰撞积分的离散化
- [ ] 在你的代码中复现：均匀胶子气体从非平衡初态热化到 Jüttner 分布
- [ ] 验证：改变散射截面 $\sigma$，测量 $\eta/s$ 并与 $\eta/s \approx 1/(5\sigma T^2)$ 对比
- [ ] 验证：Bjorken 膨胀下，BAMPS 结果在 $\tau \gg \tau_{\text{relax}}$ 时趋近理想流体力学
- [ ] 扩展：在 BAMPS 中加入 $U(1)$ 电磁场，复现徐喆老师 2022 年的 Faraday 电流结果
- [ ] 思考题：BAMPS 的 Test Particle 方法本质上是什么？（→ 分布函数的 MC 采样 → 连接 M13 AI/ML）

**预计时间**：4-6 周（你有代码基础，重点是理解物理和算法的深层逻辑）

---

## M11 · 重离子碰撞唯象（实验对接）

**目标**：理解重离子碰撞的**完整唯象链**：初始条件 → 动力学演化 → 强子化 → 实验观测量。

**核心内容**：
1. 初始条件：Glauber 模型、CGC/IP-Glasma、TRENTo
2. 预平衡动力学：自由流、有效动力学、BAMPS/KøMPøST
3. QGP 阶段：黏性流体力学（MUSIC, vHLLE）、输运（BAMPS, SMASH）
4. 强子化：Cooper-Frye 公式、统计强子化模型
5. 强子再散射：UrQMD, SMASH
6. **关键观测量**：
   - 椭圆流 $v_2$、高阶谐波 $v_n$、流涨落
   - 喷注淬火：$R_{AA}$, $I_{AA}$, 喷注形状
   - 重味：$D$ 介子、$B$ 介子、四极矩
   - 电磁探针：光子、双轻子
   - 手征磁效应（CME）：$\gamma$ 关联
   - 净质子涨落：临界点搜索
7. 贝叶斯分析：用 MCMC 提取 QGP 输运参数
8. EIC（电子-离子对撞机）物理展望

**参考书/综述**：
- 施舒哲的综述：*Exploring QCD matter in extreme conditions with Machine Learning* (arXiv:2303.15136)
- Heinz & Snellings, Ann. Rev. Nucl. Part. Sci. 2013
- 徐喆老师组 2022 年 Ohm 定律论文（王则严、徐喆）

**本地文件**：
- `~/Documents/1/bac/2025/`（2025 年最新论文）
- `~/Documents/1/bac/src/QGP_MC/HardProbes2023_016.pdf`
- `~/Documents/1/PA/`（粒子宇宙学，早期宇宙 QCD 相变）
- `~/Downloads/RMP_2025/...Neutron_stars_and_the_dense_matter_equation_of_state.pdf`

**练习**：
- [ ] 画出重离子碰撞的完整时空演化图（$t$ vs $T$），标注每个阶段用的模型
- [ ] 用 BAMPS 计算一个简单初始条件下的 $v_2$，与实验数据定性比较
- [ ] 读施舒哲的 ML 综述，总结：ML 在重离子唯象中的 5 个主要应用
- [ ] 思考题：贝叶斯分析提取的 $\eta/s(T)$ 和 BAMPS 直接计算的 $\eta/s$ 一致吗？为什么？

**预计时间**：3 周

---

## M12 · 涌现与多尺度物理（你的大问题）

**目标**：建立**跨层级涌现**的物理直觉和数学框架。这不是一个标准课程，而是一个**研究性学习模块**。

**核心内容**：
1. **重整化群（RG）**：Wilson 的动量壳 RG、Kadanoff 块自旋、不动点、普适类
2. **有效场论（EFT）**：从 QCD → 手征微扰论 → 核力 EFT → 流体力学 EFT
3. **Anderson "More is Different" (1972)**：涌现的哲学论证
4. **QCD 中的涌现**：
   - 夸克/胶子 → 强子（禁闭）
   - 强子 → 核力（介子交换）
   - 核子 → 核物质 → 中子星
   - QGP 热化：从远非平衡到流体力学行为
5. **凝聚态中的涌现**：
   - 电子 → 能带 → 拓扑相
   - 电子-声子 → Cooper 对 → 超导（BCS-BEC 过渡）
   - 自旋 → 磁序 → 自旋液体
6. **神经网络中的涌现**：
   - 参数 → 表示 → 能力（in-context learning, chain-of-thought）
   - Grokking、相变、涌现
7. **数学工具**：
   - 张量网络（MPS, PEPS, MERA）→ 多尺度纠缠结构
   - 信息几何、Fisher 信息 → 相变的度量
   - 因果涌现（causal emergence）

**参考书/论文**：
- **Goldenfeld — *Lectures on Phase Transitions and the Renormalization Group***（RG 最好的入门）
- Anderson, "More is Different", Science 1972
- Weinberg, "Effective Field Theory, Past and Future", PoS 2009
- 你的 RMP 综述：BCS-BEC crossover, Fracton matter, Kitaev spin liquids

**本地文件**：
- `~/Downloads/RMP_2024/...When_superconductivity_crosses_over_From_BCS_to_BEC.pdf` ← **必读**
- `~/Downloads/RMP_2024/...Fracton_matter.pdf`（分数量子物质 ← 新型涌现）
- `~/Downloads/RMP_2025/...Kitaev_quantum_spin_liquids.pdf`（Kitaev 自旋液体 ← 拓扑涌现）
- `~/Downloads/RMP_2025/...Universality_in_driven_open_quantum_matter.pdf`（普适性 ← 涌现的数学）
- `~/Downloads/同步空间/QC/Quantum Tensor Network Machine Learning.md` ← **张量网络 + ML**
- `~/Documents/1/FTFT/Condensed Matter Field Theory (Altland A., Simons B.D.).pdf`（凝聚态场论，RG 章节）
- 你的 `orderlevelredro` 项目（跨标度物理图谱 ← 你自己的涌现可视化）

**练习**：
- [ ] 用 Kadanoff 块自旋方法，手推 2D Ising 模型的 RG 流
- [ ] 写出从 QCD 到手征微扰论的 EFT 匹配条件
- [ ] 用 BAMPS 数据，定量展示：在什么时间尺度 $\tau_{\text{hydro}}$ 后，系统可以用流体力学描述？（涌现的时间尺度）
- [ ] 读 Anderson 1972，写一页：你认为"涌现"可以被定量化吗？怎么定量化？
- [ ] 思考题：Boltzmann 方程中的 Stosszahlansatz（分子混沌假设）是一种"涌现假设"吗？

**预计时间**：持续进行，不是一次性学完的。

---

## M13 · AI + 物理（交叉前沿）

**目标**：掌握 **AI for Physics** 和 **Physics for AI** 两个方向的核心方法，找到你的交叉点。

**核心内容**：
1. **AI for Physics**：
   - 神经网络量子态（Neural Network Quantum States, Carleo & Troyer 2017）
   - ML 求解格点 QCD（sign problem 的 ML 攻击）
   - 图神经网络（GNN）用于粒子物理（jet tagging, event classification）
   - 物理信息神经网络（PINN）求解 PDE（Boltzmann 方程、Navier-Stokes）
   - AI 驱动的材料发现（GNoME, AlphaFold）
2. **Physics for AI**：
   - Boltzmann 机 → Hopfield 网络 → 深度学习（2024 诺奖线）
   - 统计力学 of learning：相变、泛化、过参数化
   - 重整化群 ↔ 深度网络（RG 作为深度学习的类比）
   - 张量网络 ↔ 循环/卷积神经网络
   - 扩散模型 ↔ 非平衡统计力学
3. **你的交叉点**：
   - 用 PINN 求解相对论 Boltzmann 方程（替代 BAMPS 的 MC 方法？）
   - 用 NQS 求解 QCD 多体问题
   - 用 ML 分析 BAMPS 输出，提取输运系数
   - 从 Boltzmann 方程的统计力学出发，理解为什么神经网络能涌现智能

**参考书/论文**：
- Carleo & Troyer, "Solving the Quantum Many-Body Problem with Artificial Neural Networks", Science 2017
- 施舒哲：*Exploring QCD matter in extreme conditions with Machine Learning* (arXiv:2303.15136)
- 罗迪：*物理第一性 AI：从物理通向智能*（清华物理系百年特刊）
- Mehta et al., "A high-bias, low-variance introduction to Machine Learning for physicists", Phys. Rep. 2019

**本地文件**：
- `~/Documents/1/note/ML/`（12 章 ML 课程 ← 你已经有基础）
- `~/Documents/1/QAI/`（人工智能与量子科学专题）
- `~/Documents/1/HEPE/Tsinghua_AI_in_HEP.pdf` ← **AI in HEP**
- `~/Downloads/同步空间/QC/Quantum Tensor Network Machine Learning.md` ← **张量网络 + ML**
- `~/Downloads/RMP_2025/...Nobel_Lecture_Boltzmann_machines.pdf` ← **Hinton 诺奖演讲：Boltzmann 机**
- `~/Downloads/RMP_2025/...Nobel_Lecture_Physics_is_a_point_of_view.pdf`（Hopfield 诺奖演讲）
- `~/Downloads/RMP_2025/...Statistical_mechanics_for_networks_of_real_neurons.pdf` ← **神经元统计力学**
- `~/Downloads/RMP_2025/...Spin-glass_dynamics_Experiment_theory_and_simulation.pdf`（自旋玻璃 ← Hopfield 网络的物理起源）
- `~/Documents/1/s/2256_Generative_Active_Learnin.pdf`（生成式主动学习）
- `~/Documents/1/s/2308.03074v4.pdf`, `2312.02934v4.pdf` 等（AI 相关论文）

**练习**：
- [ ] 读 Hinton 的 Boltzmann Machine 诺奖演讲，手推 Boltzmann 机的学习规则
- [ ] 用 RBM（受限 Boltzmann 机）拟合 2D Ising 模型的构型分布
- [ ] 用 PINN 求解 1+1 维 Burgers 方程（Boltzmann 方程的简化版）
- [ ] 读 Carleo & Troyer 2017，用 NQS 表示一个 1D 横场 Ising 模型的基态
- [ ] 思考题：BAMPS 的 Test Particle 方法和 MC Dropout 有什么数学联系？

**预计时间**：持续进行，与 M08/M10 并行。

---

## M14 · 量子模拟规范场论（前沿选修）

**目标**：了解用量子计算机/量子模拟器求解 QCD 实时动力学的前沿进展。

**核心内容**：
1. 格点规范理论的 Hamiltonian 形式（Kogut-Susskind）
2. 量子模拟规范场论的方案：冷原子、离子阱、超导量子比特
3. 量子算法：Hamiltonian 模拟、变分量子本征求解器（VQE）
4. 实时动力学的量子优势：为什么经典计算机做不了（sign problem）
5. 量子-经典混合方法：BAMPS 经典基准 + 量子模拟对照
6. 量子纠错在规范场论模拟中的角色

**参考论文**：
- Zohar, Cirac, Reznik, "Quantum simulations of lattice gauge theories", Rep. Prog. Phys. 2016
- 施舒哲：quantum computation in high energy physics（arXiv 最新文章）
- Kokail et al., "Self-verifying variational quantum simulation of lattice models", Nature 2019

**本地文件**：
- `~/Documents/1/QC/2509.26211v2.pdf`（量子计算论文）
- `~/Downloads/同步空间/QC/Quantum Tensor Network Machine Learning.md`
- `~/Documents/1/QAI/`（量子 AI 课程）

**练习**：
- [ ] 写出 1+1 维 $U(1)$ 格点规范理论的 Kogut-Susskind Hamiltonian
- [ ] 用 Trotter 分解设计一个量子电路来模拟 1 步时间演化
- [ ] 思考题：BAMPS 的经典输运结果可以作为量子模拟的什么？（→ 基准/验证）

**预计时间**：2 周（了解性学习，不需要深入）

---

## M15 · 非平衡 QFT 与开放量子系统（高阶选修）

**目标**：掌握非平衡量子场论的完整框架，理解 QGP 作为开放量子系统的描述。

**核心内容**：
1. Schwinger-Keldysh 场论的完整形式（路径积分、有效作用量）
2. 2PI（双粒子不可约）有效作用量 → 非平衡 Dyson 方程
3. 开放量子系统：系统-环境分离、影响泛函（Feynman-Vernon）
4. Lindblad 方程的场论推导
5. QGP 中的开放量子系统：重夸克偶素在 QGP 中的退相干和解离
6. 非平衡重整化、动力学相变

**参考书**：
- **Kamenev — *Field Theory of Non-Equilibrium Systems***（主教材）
- Calzetta & Hu — *Nonequilibrium Quantum Field Theory*
- 施舒哲 2026 年最新论文：*Bottomonium production in an open quantum system*（arXiv:2607.06191）

**本地文件**：
- `~/Documents/1/FTFT/`（热场论基础 ← 先修）
- `~/Downloads/RMP_2025/...Universality_in_driven_open_quantum_matter.pdf`
- `~/Downloads/RMP_2025/...Decoherence_of_solid-state_spin_qubits.pdf`

**练习**：
- [ ] 推导 Caldeira-Leggett 模型的影响泛函
- [ ] 从 Schwinger-Keldysh 有效作用量推导 Lindblad 方程
- [ ] 思考题：QGP 中的重夸克偶素解离和量子计算中的退相干，数学结构一样吗？

**预计时间**：3 周（高阶，M07+M08 完成后）

---

## 时间线建议（2026 年秋 → 2027 年春）

| 阶段 | 时间 | 模块 | 目标 |
|------|------|------|------|
| **第一阶段：补基础** | 9月 | M01, M02, M03 | 重建经典→量子→场论的逻辑链 |
| **第二阶段：QFT 核心** | 10-11月 | M04, M05 | QFT 扎实过关 |
| **第三阶段：热场论+非平衡** | 12-1月 | M07, M08 | 你的核心理论工具 |
| **第四阶段：BAMPS+流体** | 2-3月 | M09, M10, M11 | 回到你的代码，带着新理解 |
| **第五阶段：前沿交叉** | 4月起 | M12, M13, M14, M15 | 找到你的研究问题 |
| **贯穿始终** | 持续 | M00, M06, M12 | 数学工具、粒子物理、涌现思考 |

---

## 每次对话的启动模板

开新对话时，复制以下内容并修改模块编号：

```
请按照 ~/Documents/GitHub/orderlevelredro/STUDY_PLAN.md 中的 M__ 模块带我学习。

我的背景：
- 清华物理系博三，原导师徐喆（已故），方向是 BAMPS 输运模拟
- 本科论文：Enskog 方程的 MC 模拟
- 已上过：QFT（1807）、有限温度场论（FTFT）、量子力学（Sakurai）、
  粒子宇宙学（PA）、高能物理（HEPE）、ML 课程、量子 AI 专题
- 代码在 ~/Documents/1/bac/src/

请：
1. 先检查我对本模块先修内容的掌握程度（问我 3-5 个问题）
2. 根据我的回答调整深度
3. 按模块中的"核心内容"逐节讲解
4. 每节结束后给一个检验问题
5. 最后布置模块中的练习
```

---

*最后更新：2026-07-23*
*为吴浩源制定 · 基于本地资料分析*

---

## 附录 A：完整本地书库索引

> 以下按模块分类。路径中 `~` = `/Users/bjergsen`，`backup` = `~/Documents/GitHub/backup`。

### 数学 (M00)
| 书 | 路径 |
|---|---|
| 数学分析 第1册 | `~/Documents/1/s/数学分析  第1册_12337030.pdf` |
| 高等代数（北大第五版） | `~/Documents/1/s/高等代数（北大第五版）(OCR).pdf` |

### 经典力学 / 统计力学 (M01)
| 书 | 路径 |
|---|---|
| 理论力学简明教程（安宇，清华） | `backup/zh/理论力学简明教程 (安宇).pdf` |
| No-Nonsense Classical Mechanics (Schwichtenberg) | `backup/Jakob/No-Nonsense Classical Mechanics.pdf` |
| 分析力学讲义 | `~/Documents/1/s/分析力学讲义.pdf` |
| 统计物理学导论（王竹溪） | `backup/zh/统计物理学导论 (王竹溪).pdf` |
| 赵凯华罗蔚茵热学 | `~/Documents/1/基础物理学/赵凯华罗蔚茵热学.pdf` |
| 非线性玻耳兹曼方程 | `~/Documents/1/books/非线性玻耳兹曼方程.pdf` |
| 非均匀气体的数学理论 | `~/Documents/1/books/非均匀气体的数学理论.pdf` |
| modEnskog | `~/Documents/1/books/modEnskog.pdf` |
| Clausius 1879 原始论文 | `~/Documents/1/books/clausius1879.pdf` |
| MC Simulations in Statistical Physics (Landau & Binder) | `backup/MD/A Guide to Monte Carlo Simulations...pdf` |
| MC Simulation in Statistical Physics (Binder & Heermann) | `backup/MD/Monte Carlo Simulation in Statistical Physics.pdf` |
| Computer Simulation of Liquids (Allen & Tildesley) | `backup/MD/Computer Simulation of Liquids.pdf` |
| 分子动力学模拟的理论与实践 | `~/Documents/1/books/分子动力学模拟的理论与实践.pdf` |
| 基于第一性原理的分子动力学 (Marx & Hutter 中译) | `backup/MD/基于第一性原理的分子动力学...pdf` |
| Ab initio molecular dynamics (Marx & Hutter 英文) | `~/Documents/1/s/Ab initio molecular dynamics...pdf` |
| **An Introduction to the Theory of the Boltzmann Equation (Harris)** | `backup/An Introduction to the Theory of the Boltzmann Equation (Stewart Harris).epub` |
| 蒙特卡洛方法与人工智能（Barbu, 朱松纯） | `backup/zh/蒙特卡洛方法与人工智能.pdf` |

### 量子力学 (M02)
| 书 | 路径 |
|---|---|
| Modern Quantum Mechanics 3rd ed. (Sakurai) | `~/Documents/1/QM/Modern Quantum Mechanics Third Edition.pdf` |
| 现代量子力学 第2版 中译本 (Sakurai) | `~/Documents/1/QM/现代量子力学 第2版 中译本...pdf` |
| Sakurai_JJ (旧版) | `~/Documents/1/QM/Sakurai_JJ.pdf` |
| 喀兴林高等量子力学 | `~/Documents/1/QM/喀兴林高等量子力学.pdf` |
| Introduction to Many-Body Physics (Coleman) | `backup/manyBody/Introduction to Many-Body Physics (Piers Coleman).pdf` |

### 电动力学 / 经典场论 (M03)
| 书 | 路径 |
|---|---|
| 新概念物理教程 电磁学（赵凯华） | `~/Documents/1/基础物理学/新概念物理教程 电磁学(第二版).pdf` |
| 电动力学 | `~/Documents/1/note/books/电动力学.pdf` |
| No-Nonsense Electrodynamics (Schwichtenberg) | `backup/Jakob/No-Nonsense Electrodynamics.pdf` |
| 光学 (Hecht, 秦克诚译) | `backup/zh/光学 (第五版) (Eugene Hecht).pdf` |

### QFT I (M04)
| 书 | 路径 |
|---|---|
| **量子场论讲义（余钊焕, arXiv 1807）** | `backup/zh/量子场论讲义 (余钊焕) (arXiv 1807).pdf` |
| 同上（课程版） | `~/Documents/1/books/1807_QFT.pdf` |
| 同上（笔记版） | `~/Documents/1/note/1807QFT/1807.pdf` |
| QFT for the Gifted Amateur (Lancaster & Blundell) | `backup/QFT/Quantum Field Theory for the Gifted Amateur.pdf` |
| No-Nonsense Quantum Field Theory (Schwichtenberg) | `backup/Jakob/No-Nonsense Quantum Field Theory.pdf` |
| An Introduction to QED and QCD (Hautmann) | `backup/QFT/An Introduction to QED and QCD (Francesco Hautmann).pdf` |
| Feynman — Quantum Electrodynamics | `~/Documents/1/s/Feynman-QuantumElectrodynamics.pdf` |
| Weinberg Vol. 1 | `~/Documents/1/s/weinberg1.pdf` |
| 路径积分补充 | `~/Documents/1/s/2023-functional-integrals.pdf` |

### QFT II / 规范场论 / QCD (M05)
| 书 | 路径 |
|---|---|
| Physics from Symmetry (Schwichtenberg) | `backup/Jakob/Physics from Symmetry.pdf` |
| 基于对称性的现代物理学 (Schwichtenberg 中译) | `backup/zh/基于对称性的现代物理学.pdf` |
| An Introduction to QED and QCD (Hautmann) | `backup/QFT/An Introduction to QED and QCD.pdf` |
| Weinberg Vol. 1 | `~/Documents/1/s/weinberg1.pdf` |

### 核物理 / 粒子物理 (M06)
| 书 | 路径 |
|---|---|
| CP Violation (Bigi) | `~/Documents/1/HEPE/CP-Violation-Bigi.pdf` |
| Higgs 课件 | `~/Documents/1/HEPE/Higgs课件.pdf` |
| 高能物理实验专题 CMS/ATLAS | `~/Documents/1/HEPE/高能物理实验专题-CMS ATLAS物理课件.pdf` |
| Tsinghua AI in HEP | `~/Documents/1/HEPE/Tsinghua_AI_in_HEP.pdf` |
| 粒子宇宙学 2025 课程笔记 | `~/Documents/1/PA/` |
| 粒子宇宙学教学大纲 | `~/Documents/1/PA/粒子宇宙学理论选题教学大纲.pdf` |
| 广义相对论简介 | `~/Documents/1/PA/广义相对论简介.pdf` |
| Statistical Data Analysis (Cowan) | `backup/Statistical Data Analysis (Glen Cowan).pdf` |
| Jinfeng Liao 论文 | `~/Documents/1/s/Jinfeng Liao.pdf` |
| ATLAS Magnet System | `~/Documents/1/基础物理学/ATLASMagnetSystem.pdf` |
| BESIII 分波分析 | `~/Documents/1/s/BESⅢ实验上ψ(3686)→Σ--K0S-Ξ++c.c.的分波分析.pdf` |
| PRC 论文 | `~/Documents/1/s/PhysRevC.105.064905.pdf` |
| Wangning PhD thesis | `~/Documents/1/s/Wangning_PhD.pdf` |

### 有限温度场论 (M07)
| 书 | 路径 |
|---|---|
| **Kapusta & Gale — Finite-Temperature Field Theory** | `~/Documents/1/FTFT/Finite-temperature field theory...pdf` |
| Le Bellac — Thermal Field Theory | `~/Documents/1/FTFT/Thermal Field Theory (Le Bellac).pdf` |
| Laine & Vuorinen — Basics of Thermal Field Theory | `~/Documents/1/FTFT/Basics of Thermal Field Theory...pdf` |
| Altland & Simons — Condensed Matter Field Theory | `~/Documents/1/FTFT/Condensed Matter Field Theory...pdf` |
| 课程笔记 Ch1-6 | `~/Documents/1/FTFT/FTFT-Chapter*.pdf` |
| 你的笔记 | `~/Documents/1/FTFT/cq.pdf` |
| 作业 | `~/Documents/1/FTFT/第*次作业.*` |
| 同上（backup 副本） | `backup/CMFT/` |
| Many-Body QFT in Condensed Matter (Bruus & Flensberg) | `backup/manyBody/Many-Body Quantum Theory in Condensed Matter Physics.pdf` |
| Many-Particle Physics (Mahan) | `backup/manyBody/Many-Particle Physics (Gerald D. Mahan).pdf` |
| Quantum Theory of Many-Body Systems (Zagoskin) | `backup/manyBody/Quantum Theory of Many-Body Systems.pdf` |
| Physics and Mathematics of Quantum Many-Body Systems (Tasaki) | `backup/manyBody/Physics and Mathematics of Quantum Many-Body Systems.pdf` |
| 量子多体物理教学大纲 (2026.07) | `backup/manyBody/量子多体物理教学大纲_20260710170657.pdf` |

### 非平衡统计力学 (M08)
| 书 | 路径 |
|---|---|
| **De Groot & Mazur — Non-Equilibrium Thermodynamics** | `backup/Non-equilibrium thermodynamics (S. R. De Groot, P. Mazur).djvu` |
| **Harris — Introduction to the Theory of the Boltzmann Equation** | `backup/An Introduction to the Theory of the Boltzmann Equation (Stewart Harris).epub` |
| 非线性玻耳兹曼方程 | `~/Documents/1/books/非线性玻耳兹曼方程.pdf` |
| 非均匀气体的数学理论 | `~/Documents/1/books/非均匀气体的数学理论.pdf` |
| RMP: Macroscopic stochastic thermodynamics (2025) | `~/Downloads/RMP_2025/...Macroscopic_stochastic_thermodynamics.pdf` |
| RMP: Statistical mechanics for neurons (2025) | `~/Downloads/RMP_2025/...Statistical_mechanics_for_networks_of_real_neurons.pdf` |
| RMP: Nonequilibrium Mott insulators (2025) | `~/Downloads/RMP_2025/...Photoinduced_nonequilibrium_states_in_Mott_insulators.pdf` |
| RMP: Universality in driven open quantum matter (2025) | `~/Downloads/RMP_2025/...Universality_in_driven_open_quantum_matter.pdf` |
| RMP: Spin-glass dynamics (2025) | `~/Downloads/RMP_2025/...Spin-glass_dynamics_Experiment_theory_and_simulation.pdf` |

### 相对论流体力学 (M09)
| 书 | 路径 |
|---|---|
| Jaiswal et al. — Dynamics of QCD matter (2021) | `~/Documents/1/bac/src/dynamicQCD/jaiswal-et-al-2021-dynamics-of-qcd-matter-current-status.pdf` |
| 自旋流体力学 | `~/Documents/1/bac/src/ds_translated_hydrospin.pdf` |
| PRL 127.052301 | `~/Documents/1/bac/src/RHIC_Boltzmann/PhysRevLett.127.052301.pdf` |

### BAMPS (M10)
| 书 | 路径 |
|---|---|
| BAMPS 主文档 | `~/Documents/1/bac/BAMPS.pdf` |
| BAMPS for Ztz（给徐喆版） | `~/Documents/1/bac/BAMPSforZtz/` |
| BAMPS 2025 修改版 | `~/Documents/1/bac/BAMPS2025gemini_modified/` |
| BAMPS 原始论文 PRC 71, 064901 | `~/Documents/1/bac/PRC/PhysRevC.71.064901.pdf` |
| 全部源码 | `~/Documents/1/bac/src/` |
| 理论推导和实验记录 | `~/Documents/1/bac/理论推导和实验记录.pdf` |
| 代码说明 | `~/Documents/1/bac/code.pdf`, `code.pptx` |
| 幻灯片 | `~/Documents/1/bac/slide/`, `slide1/` |
| 论文草稿 | `~/Documents/1/bac/draft/` |
| 2025 年最新论文 | `~/Documents/1/bac/2025/` |
| GPU 计算输出 | `~/Documents/1/bac/cuda_out/` |
| 本科论文（Enskog MC） | `~/Documents/1/bac/thesis/` |
| 胡进笔记 | `~/Documents/1/bac/hujin.pdf` |

### 涌现 / 多尺度 / CFT (M12)
| 书 | 路径 |
|---|---|
| Fradkin — Field Theories of Condensed Matter Physics | `backup/CMFT/Field Theories of Condensed Matter Physics (Eduardo Fradkin).pdf` |
| 固体物理学（黄昆） | `~/Documents/1/s/固体物理学-黄昆-教材扫描版.pdf` |
| 固体理论（李正中） | `backup/manyBody/固体理论 (李正中).pdf` |
| Introduction to Superconductivity (Tinkham) | `backup/manyBody/Introduction to Superconductivity (Michael Tinkham).pdf` |
| DFT: An Advanced Course (Engel & Dreizler) | `backup/manyBody/Density Functional Theory An Advanced Course.pdf` |
| Conformal Field Theory (Schellekens) | `backup/CFT/Conformal Field Theory (A. N. Schellekens).pdf` |
| Lectures on CFT (Qualls) | `backup/CFT/Lectures on Conformal Field Theory (Joshua D. Qualls).pdf` |
| **Bootstrap Method in Theoretical Physics (Zheng)** | `backup/topics/bootstrap/Bootstrap Method in Theoretical Physics.pdf` |
| Bootstrapping Euclidean Two-Point Correlators | `backup/topics/bootstrap/Bootstrapping Euclidean Two-Point Correlators.pdf` |
| High-Precision Bootstrap of Multi-Matrix QM (Lin & Zheng) | `backup/topics/bootstrap/High-Precision Bootstrap of Multi-Matrix Quantum Mechanics.pdf` |
| RMP: BCS to BEC crossover (2024) | `~/Downloads/RMP_2024/...When_superconductivity_crosses_over_From_BCS_to_BEC.pdf` |
| RMP: Fracton matter (2024) | `~/Downloads/RMP_2024/...Fracton_matter.pdf` |
| RMP: Kitaev quantum spin liquids (2025) | `~/Downloads/RMP_2025/...Kitaev_quantum_spin_liquids.pdf` |
| 边缘奇迹 | `~/Documents/1/note/边缘奇迹.pdf` |
| cube_of_physics | `~/Documents/1/note/cube_of_physics.pdf` |

### AI + 物理 (M13)
| 书 | 路径 |
|---|---|
| **蒙特卡洛方法与人工智能（Barbu, 朱松纯）** | `backup/zh/蒙特卡洛方法与人工智能.pdf` |
| **RBM ↔ Tensor Network 等价性** | `~/Documents/1/arc/Equivalence of restricted Boltzmann machines and tensor network states.pdf` |
| Quantum Tensor Network Machine Learning | `~/Downloads/同步空间/QC/Quantum Tensor Network Machine Learning.md` |
| Tsinghua AI in HEP | `~/Documents/1/HEPE/Tsinghua_AI_in_HEP.pdf` |
| Flow Matching Guide and Code | `backup/CVGC/Flow Matching Guide and Code.pdf` |
| Yang Song (diffusion models) | `backup/CVGC/Yang Song submit-augmented.pdf` |
| RMP: Nobel Lecture — Boltzmann machines (Hinton 2024) | `~/Downloads/RMP_2025/...Nobel_Lecture_Boltzmann_machines.pdf` |
| RMP: Nobel Lecture — Physics is a point of view (Hopfield 2024) | `~/Downloads/RMP_2025/...Nobel_Lecture_Physics_is_a_point_of_view.pdf` |
| RMP: Statistical mechanics for neurons (2025) | `~/Downloads/RMP_2025/...Statistical_mechanics_for_networks_of_real_neurons.pdf` |
| RMP: Spin-glass dynamics (2025) | `~/Downloads/RMP_2025/...Spin-glass_dynamics_Experiment_theory_and_simulation.pdf` |
| ML 课程 12 章 | `~/Documents/1/note/ML/chapter*.ipynb` |
| LoRA / DoRA / AdaLoRA | `~/Documents/1/note/ML/lora*.pdf`, `adalora.pdf`, `dora*.pdf` |
| 人工智能与量子科学专题 | `~/Documents/1/QAI/` |
| Generative Active Learning | `~/Documents/1/s/2256_Generative_Active_Learnin.pdf` |
| 杂项 AI 论文 | `~/Documents/1/s/2308.03074v4.pdf`, `2312.02934v4.pdf` 等 |

### 量子计算 / 量子模拟 (M14)
| 书 | 路径 |
|---|---|
| 量子计算论文 | `~/Documents/1/QC/2509.26211v2.pdf` |
| Quantum Tensor Network ML | `~/Downloads/同步空间/QC/Quantum Tensor Network Machine Learning.md` |
| 人工智能与量子科学专题 | `~/Documents/1/QAI/` |

### 博士资格考试 / 课程存档
| 内容 | 路径 |
|---|---|
| 博资考 师姐的资料 | `~/Documents/1/arc/博资考 师姐的资料.zip` |
| 清华大学-博士生资格考试 | `~/Documents/1/arc/清华大学-博士生资格考试.zip` |
| 近代物理新进展 | `~/Documents/1/adv/` |
| 2024 研究生迎新教务 | `~/Documents/1/backup/2024年物理系研究生迎新相关教务工作.pdf` |

---

## 附录 B：关键发现

在整理过程中发现几个对你特别重要的文件：

1. **`backup/zh/量子场论讲义 (余钊焕) (arXiv 1807).pdf`**
   → 你的 "1807QFT" 就是余钊焕的 QFT 讲义。这是中文 QFT 教材中写得最清楚的之一。

2. **`backup/zh/蒙特卡洛方法与人工智能（Barbu, 朱松纯）`**
   → 朱松纯（UCLA → 北大）的书，直接讲 MC 方法和 AI 的联系。你的 BAMPS MC 背景 + 这本书 = M13 的天然入口。

3. **`~/Documents/1/arc/Equivalence of restricted Boltzmann machines and tensor network states.pdf`**
   → 这篇论文证明了 RBM 和张量网络态的数学等价性。直接连接你的 Boltzmann 方程背景和 AI/张量网络。

4. **`backup/topics/bootstrap/`**
   → 你有 conformal bootstrap 和 numerical bootstrap 的论文。Bootstrap 方法是一种**非微扰**方法，和 BAMPS 的数值精神一致，但攻击的是完全不同的问题（QFT 的解析结构）。

5. **`backup/manyBody/量子多体物理教学大纲_20260710170657.pdf`**
   → 2026 年 7 月 10 日的教学大纲——这是两周前的！你是否在准备选这门课或做助教？

6. **`backup/CVGC/Flow Matching Guide and Code.pdf` + `Yang Song submit-augmented.pdf`**
   → 你有扩散模型/Flow Matching 的资料。扩散模型的数学结构和非平衡统计力学（Fokker-Planck 方程）直接对应。

7. **`~/Documents/1/s/Jinfeng Liao.pdf`**
   → 廖劲峰（Indiana University）的论文。他是施舒哲的博士导师，CME 的核心人物。如果你联系施舒哲，这篇论文是谈资。

---

*附录更新：2026-07-23*
