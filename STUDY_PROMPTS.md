# 补习计划 · 全部 Prompt 与平台选择 · 2026-07-25

---

## 平台选择建议

| 模块类型 | 推荐平台 | 理由 |
|----------|----------|------|
| **理论推导**（M01-M05, M07-M09, M12, M15） | **Claude**（claude.ai Pro）或 **ChatGPT**（Plus） | 数学推理强，支持上传 PDF 章节，长上下文 |
| **代码/模拟**（M10, M13） | **Codex**（本 app）或 **Claude Code** | 能直接读本地 BAMPS 代码、运行 Python/Julia |
| **大量 PDF 阅读**（M06, M07, M11） | **Gemini AI Studio** 或 **NotebookLM** | 1M+ token 上下文，可以一次喂入整本教材 |
| **需要联网搜索**（M06, M11, M14） | **ChatGPT**（带 web search）或 **Gemini** | 实时搜索最新论文和实验进展 |
| **可视化/前端**（orderlevelredro） | **Codex**（本 app）或 **VS Code + Cline** | 直接编辑项目文件、运行 dev server |
| **深度研究/写论文**（M12, M13） | **Claude**（长上下文 + 深度推理） | 能处理复杂论证链，适合讨论涌现/AI 哲学 |

### 具体建议

- **日常理论学习**：Claude Pro（$20/月）——数学推导最准确，物理直觉好，支持上传 PDF
- **BAMPS 代码**：Codex（本 app）——能读 `~/Documents/1/bac/src/` 里的代码并运行
- **读整本教材**：Gemini AI Studio（免费）——把 Kapusta 整本丢进去，问任意章节
- **快速查概念**：ChatGPT——带 web search，能查最新论文
- **写代码/做模拟**：Codex 或 Claude Code——能执行 Python、读写文件

---

## 通用上下文（每次对话开头粘贴）

```markdown
## 我的背景
- 清华大学物理系博三（2026秋入学），原导师徐喆（副教授，2026年6月去世）
- 方向：BAMPS（Boltzmann Approach to Multi-Parton Scatterings）输运模拟
- 本科论文：Enskog 方程的蒙特卡洛模拟（致理书院 物理02 2020级）
- 已修课程：量子力学(Sakurai)、QFT(余钊焕1807讲义)、有限温度场论(Kapusta/Le Bellac)、
  粒子宇宙学(鲜于中之)、高能物理实验专题、ML课程(12章)、人工智能与量子科学专题、
  近代物理新进展、基础物理助教(热学/电磁学)
- 核心技能：Boltzmann方程、MC模拟、输运理论、QCD唯象、Python/C++/CUDA编程
- 当前目标：补完理论基础 → 找到新导师/方向 → 发表第一篇论文 → 毕业
- 长期兴趣：跨层级涌现的定量理论、AI+物理、非平衡统计力学

## 学习方式偏好
- 苏格拉底式：先问我问题检查理解，再讲解
- 每个概念给物理直觉 + 数学推导 + 一个具体计算例子
- 不要跳过步骤，我宁可慢也不要糊弄过去
- 每节结束给一个检验问题
- 用中文讲解，公式和术语保留英文
```

---

## M01 · 经典力学与统计力学

### Claude / ChatGPT prompt（上传 PDF 时用）

```
请按照以下模块带我学习"经典力学与统计力学"，重点是 Boltzmann 方程的统计力学起源。

[粘贴上面的"通用上下文"]

## 本模块目标
1. 从 Liouville 方程 → BBGKY 层级 → Boltzmann 方程的完整推导
2. H 定理、细致平衡、熵增的微观解释
3. Chapman-Enskog 展开：从 Boltzmann → Euler → Navier-Stokes
4. Enskog 方程（稠密气体修正）

## 我已有的材料
- 王竹溪《统计物理学导论》
- 赵凯华《热学》（我做过助教）
- 非线性玻耳兹曼方程讲义
- 非均匀气体的数学理论（Chapman-Enskog）
- Landau & Binder《MC Simulations in Statistical Physics》
- 我的本科论文：Enskog 方程的 MC 模拟

## 请你
1. 先问我 3-5 个问题检查我对统计力学基础的掌握（系综、配分函数、Liouville 定理）
2. 根据我的回答调整深度
3. 重点讲 BBGKY → Boltzmann 的推导，每一步都要写清楚
4. 讲 H 定理时，解释 Stosszahlansatz 的物理含义和局限
5. 推导 Chapman-Enskog 到 Navier-Stokes 阶
6. 最后给 3 道计算题

## 关键问题（我希望你回答的）
- Stosszahlansatz 是不是一个"涌现假设"？它在哪里引入了不可逆性？
- Boltzmann 方程和 Liouville 方程的关系是什么？信息丢失在哪里发生？
- 从 Boltzmann 方程到流体力学，"涌现"的定量判据是什么？（Knudsen 数？）
```

### Codex prompt（需要读本地文件时）

```
请按照 ~/Documents/GitHub/orderlevelredro/STUDY_PLAN.md 中的 M01 模块带我学习。

请先读取以下文件了解我的背景：
- ~/Documents/1/books/非线性玻耳兹曼方程.pdf（如果可读）
- ~/Documents/1/B/Enskog方程的蒙特卡洛模拟计算_吴浩源_致理-物02_2020012594.pdf

然后：
1. 问我 3 个问题检查统计力学基础
2. 从 BBGKY 层级开始推导 Boltzmann 方程
3. 对比我本科论文中的 Enskog 方程 MC 方法和标准 Boltzmann 方程的区别
4. 用 Python 写一个简单的 DSMC 模拟，验证 H 定理
```

---

## M02 · 量子力学（二次量子化）

```
请按照以下模块带我学习"量子力学：二次量子化与多体基础"。

[粘贴"通用上下文"]

## 本模块目标
1. 二次量子化：产生/湮灭算符、Fock 空间、Wick 定理
2. 多体 Green 函数初步
3. 散射理论（Born 近似 → 粒子物理截面）

## 我已有的材料
- Sakurai《Modern Quantum Mechanics》3rd ed.（我的教材）
- 喀兴林《高等量子力学》
- 课件 L01-L07
- Coleman《Introduction to Many-Body Physics》

## 请你
1. 问我：全同粒子的对称化、角动量耦合、微扰论（检查基础）
2. 重点讲二次量子化：从单粒子 QM 到 Fock 空间的逻辑
3. 推导 Wick 定理，计算一个 4 点函数
4. 用二次量子化语言描述 BEC（为 M07 和 M12 埋伏笔）
5. 计算 Yukawa 势的 Born 散射截面

## 关键问题
- 二次量子化和"第一次量子化"的本质区别是什么？是物理还是数学？
- Wick 定理为什么有效？它和 Gaussian 积分有什么关系？
```

---

## M03 · 电动力学与经典场论

```
请按照以下模块带我学习"经典场论：从 Maxwell 到规范对称性"。

[粘贴"通用上下文"]

## 本模块目标
1. Maxwell 方程的协变形式、$F^{\mu\nu}$
2. Lagrangian 密度 → Euler-Lagrange → Noether 定理
3. $U(1)$ 规范不变性作为局域对称性
4. 为 M05（非阿贝尔规范场）做铺垫

## 我已有的材料
- 赵凯华《电磁学》（我做过助教）
- Schwichtenberg《No-Nonsense Electrodynamics》
- Schwichtenberg《Physics from Symmetry》

## 请你
1. 问我：Maxwell 方程、四维势、Lorentz 变换（检查基础）
2. 从 $\mathcal{L}_{EM} = -\frac{1}{4}F^2 - j \cdot A$ 推出 Maxwell 方程
3. 用 Noether 定理推导能量-动量张量和电荷守恒
4. 解释 $U(1)$ 规范变换的几何含义（纤维丛语言，定性即可）
5. 思考题：如果要把 $U(1)$ 推广到 $SU(3)$，需要做什么？

## 关键问题
- 规范对称性是"真实的对称性"还是"冗余的描述"？
- Noether 定理的逆定理成立吗？（守恒流一定来自对称性吗？）
```

---

## M04 · QFT I：正则量子化、路径积分、QED

```
请按照以下模块带我学习"量子场论 I"。

[粘贴"通用上下文"]

## 本模块目标
1. 标量场正则量子化 → 路径积分
2. Dirac 场、QED 拉氏量
3. Feynman 规则、树图散射
4. 单圈重整化、$\beta$ 函数

## 我已有的材料
- 余钊焕《量子场论讲义》(arXiv 1807)（我的课程教材）
- Lancaster & Blundell《QFT for the Gifted Amateur》
- Schwichtenberg《No-Nonsense QFT》
- Feynman《QED》
- Weinberg Vol.1
- 我的课程笔记 1807.pdf

## 请你
1. 先问我 5 个问题检查我对 1807 课程的掌握程度：
   - 标量场的 Feynman 传播子怎么推？
   - 路径积分和正则量子化等价吗？在哪里等价？
   - Dirac 方程的负能解怎么解释？
   - QED 的 Feynman 规则是什么？
   - 什么是重整化？为什么需要它？
2. 根据我的回答，跳过我已经会的，重点讲我不会的
3. 必须手推的：$e^+e^- \to \mu^+\mu^-$ 截面、QED 单圈 $\beta$ 函数
4. 讲重整化时，用物理图像（屏蔽电荷）而不只是数学操作

## 关键问题
- 路径积分是"真实的物理"还是"计算工具"？
- 重整化群告诉我们什么物理？（不只是"去掉无穷大"）
- QED 的 Landau 极点意味着什么？QCD 为什么不同？
```

---

## M05 · QFT II：非阿贝尔规范场与 QCD

```
请按照以下模块带我学习"非阿贝尔规范场论与 QCD"。

[粘贴"通用上下文"]

## 本模块目标
1. $SU(N)$ 规范场、Yang-Mills 拉氏量
2. QCD 拉氏量、Faddeev-Popov 鬼场
3. 渐近自由（$\beta$ 函数为负）
4. 色禁闭（Wilson 圈、定性理解）
5. 手征对称性破缺

## 我已有的材料
- Schwichtenberg《Physics from Symmetry》
- Schwichtenberg《基于对称性的现代物理学》（中译）
- Hautmann《An Introduction to QED and QCD》
- 余钊焕讲义（如果覆盖了非阿贝尔部分）

## 请你
1. 问我：$U(1)$ 规范场（M03）、QED Feynman 规则（M04）、$SU(3)$ 的 Gell-Mann 矩阵
2. 从 $U(1)$ 推广到 $SU(3)$：为什么需要胶子自相互作用？
3. 手推 QCD $\beta$ 函数到单圈，解释渐近自由的物理
4. 用 Wilson 圈论证禁闭（面积律 vs 周长律）
5. 手征对称性破缺：为什么 $m_\pi \ll m_N$？

## 关键问题
- 渐近自由和禁闭矛盾吗？（同一个理论的两个极限）
- Yang-Mills 质量间隙问题（千禧年问题）到底在问什么？
- QCD 在有限温度下，禁闭"消失"了——这意味着什么？（→ M07）
```

---

## M06 · 核物理与粒子物理

```
请按照以下模块带我学习"核物理与粒子物理：标准模型与重离子碰撞"。

[粘贴"通用上下文"]

## 本模块目标
1. 标准模型全景
2. 强子谱、夸克模型
3. 重离子碰撞物理动机和实验
4. QCD 相图

## 我已有的材料
- 粒子宇宙学 2025 课程笔记（鲜于中之）
- 高能物理实验专题（CMS/ATLAS）
- CP Violation (Bigi)、Higgs 课件
- BAMPS 相关 PRC 论文
- RMP: Neutron stars and dense matter EOS

## 请你
1. 问我：标准模型的规范群、粒子谱、Higgs 机制（检查基础）
2. 重点讲重离子碰撞的物理图像：为什么要撞？撞出来什么？怎么测量？
3. 画出 QCD 相图 $(T, \mu_B)$，标注已知和未知区域
4. 解释关键观测量：$v_2$, $R_{AA}$, J/$\psi$ 压低, CME
5. 读我的 PRC 论文（PhysRevC.71.064901），解释 BAMPS 在唯象链中的位置

## 关键问题
- QGP 是"新物质态"还是"高温强子气体"？判据是什么？
- 手征磁效应（CME）如果确认，为什么是诺贝尔奖级别的？
- 中子星内部可能是色超导——这和重离子碰撞有什么关系？
```

---

## M07 · 有限温度场论

```
请按照以下模块带我学习"有限温度量子场论"。

[粘贴"通用上下文"]

## 本模块目标
1. Matsubara（虚时）形式
2. Schwinger-Keldysh（实时）形式
3. HTL 近似、Debye 屏蔽
4. QCD 热力学、退禁闭、手征恢复

## 我已有的材料
- Kapusta & Gale（主教材，我有完整 PDF）
- Le Bellac、Laine & Vuorinen、Altland & Simons
- 课程笔记 Ch1-6 + 5 次作业（我做过）
- 我自己的笔记 cq.pdf

## 请你
1. 先问我 5 个问题检查我上课时的掌握程度：
   - Matsubara 频率是什么？玻色和费米有什么区别？
   - 有限温度传播子和零温传播子的关系？
   - 什么是 HTL？为什么需要它？
   - QCD 的 Debye 质量 $m_D \sim gT$ 怎么来的？
   - 实时形式和虚时形式什么时候必须用哪个？
2. 根据回答调整：如果虚时形式我已经会了，重点讲实时形式（Keldysh）
3. 必须手推：自由玻色/费米气体的压力、QED Debye 质量
4. 讲 QCD 相变时，对比格点 QCD 结果和微扰 HTL

## 关键问题
- 为什么有限 $\mu_B$ 有 sign problem？这对重离子物理意味着什么？
- 虚时形式能算实时动力学量吗？（解析延拓的困难）
- QCD 相变是真正的"相变"还是"crossover"？在什么条件下是相变？
```

---

## M08 · 非平衡统计力学

```
请按照以下模块带我学习"非平衡统计力学"。这是我最重要的模块。

[粘贴"通用上下文"]

## 本模块目标
1. Boltzmann 方程的完整结构（碰撞积分、弛豫时间、BGK）
2. 相对论 Boltzmann 方程
3. 线性响应：Kubo 公式、Green-Kubo 关系
4. Schwinger-Keldysh 非平衡 Green 函数
5. 涨落定理（Jarzynski, Crooks）
6. 开放量子系统（Lindblad）

## 我已有的材料
- De Groot & Mazur《Non-Equilibrium Thermodynamics》
- Harris《Introduction to the Theory of the Boltzmann Equation》
- 非线性玻耳兹曼方程讲义
- 非均匀气体的数学理论
- RMP 2025: Macroscopic stochastic thermodynamics
- RMP 2025: Statistical mechanics for neurons
- RMP 2025: Universality in driven open quantum matter

## 请你
1. 问我：Boltzmann 方程的形式、H 定理、弛豫时间近似（检查基础）
2. 重点讲：
   a. 从 Liouville → BBGKY → Boltzmann 的信息丢失在哪里
   b. 相对论推广：Jüttner 分布、协变碰撞积分
   c. Kubo 公式：$\eta = \int_0^\infty dt \langle T^{xy}(t)T^{xy}(0)\rangle$
   d. Keldysh 围道：为什么需要两个时间分支？
3. 讲涨落定理时，联系到 BAMPS 中的热化过程
4. 讲 Lindblad 方程时，联系到 QGP 中重夸克偶素的退相干

## 关键问题（这是我最关心的）
- Boltzmann 方程的不可逆性从哪里来？（Stosszahlansatz = 粗粒化 = 涌现？）
- 非平衡态有没有类似"自由能"的势函数？（没有——这正是困难所在）
- Keldysh 场论和 Boltzmann 方程的关系是什么？（量子 → 经典的极限）
- 涨落定理是不是"非平衡态的热力学第二定律"？
- 神经网络的训练过程能不能用非平衡统计力学描述？（→ M13）
```

---

## M09 · 相对论流体力学

```
请按照以下模块带我学习"相对论流体力学"。

[粘贴"通用上下文"]

## 本模块目标
1. 理想相对论流体、Bjorken 流
2. 黏性流体（Israel-Stewart）
3. 流体力学化 vs 热化
4. $\eta/s$ 和 KSS 下界
5. 从 Boltzmann 到流体的矩方法

## 我已有的材料
- Jaiswal et al. 2021 综述（Dynamics of QCD matter）
- 自旋流体力学论文
- PRL 127.052301（BAMPS 相关）
- BAMPS 源码中的 RHIC_Boltzmann

## 请你
1. 问我：能量-动量张量、理想流体方程、Bjorken 标度不变性
2. 推导 Bjorken 流解析解
3. 解释 Israel-Stewart 为什么需要（因果性）
4. 重点：从 Boltzmann 方程的矩方法推导流体力学方程
5. 讨论：流体力学化不需要热化——这对"涌现"意味着什么？

## 关键问题
- $\eta/s = 1/4\pi$ 是普适下界吗？BAMPS 算出来的值是多少？
- 流体力学是一个"有效场论"吗？它的"紫外截断"是什么？
- 如果系统从来没有热化，流体力学为什么还能工作？
```

---

## M10 · BAMPS 深入

### Codex / Claude Code prompt（需要读代码）

```
请按照 ~/Documents/GitHub/orderlevelredro/STUDY_PLAN.md 中的 M10 模块，
带我深入理解 BAMPS 的物理和算法。

请先读取以下文件：
- ~/Documents/1/bac/BAMPS.pdf（BAMPS 主文档）
- ~/Documents/1/bac/PRC/PhysRevC.71.064901.pdf（BAMPS 原始论文）
- ~/Documents/1/bac/src/ 目录结构

然后：
1. 问我：BAMPS 的碰撞积分怎么离散化？Test Particle 方法是什么？
2. 逐行解读 BAMPS 原始论文的关键公式
3. 对照源码，解释每个模块的物理含义
4. 帮我设计一个验证实验：
   - 均匀胶子气体 → 验证 Jüttner 分布
   - 改变截面 σ → 测量 η/s
   - Bjorken 膨胀 → 验证流体力学极限
5. 讨论扩展方向：加入电磁场（复现徐喆老师 2022 年 Ohm 定律工作）

## 关键问题
- Test Particle 方法的统计误差怎么控制？$N_{\text{test}}$ 怎么选？
- BAMPS 的 $2\leftrightarrow3$ 过程（Gunion-Bertsch）的矩阵元是什么？
- BAMPS 和流体力学代码（MUSIC）的匹配条件是什么？
- 如果把 BAMPS 的 MC 采样换成神经网络，会怎样？（→ M13）
```

---

## M11 · 重离子碰撞唯象

```
请按照以下模块带我学习"重离子碰撞唯象：从初始条件到实验观测量"。

[粘贴"通用上下文"]

## 本模块目标
1. 完整唯象链：初始条件 → 预平衡 → QGP → 强子化 → 再散射 → 探测器
2. 关键观测量：$v_n$, $R_{AA}$, CME, 净质子涨落
3. 贝叶斯参数提取
4. EIC 展望

## 我已有的材料
- 施舒哲 ML 综述 (arXiv:2303.15136)
- BAMPS 2025 年最新论文
- 粒子宇宙学笔记（早期宇宙 QCD 相变）
- RMP: Neutron stars and dense matter EOS

## 请你
1. 画出重离子碰撞的完整时空演化图
2. 对每个阶段，解释用什么模型、为什么
3. 重点讲贝叶斯分析：怎么用 MCMC 从实验数据提取 $\eta/s(T)$
4. 讨论：BAMPS 在唯象链中的优势和局限
5. 搜索 2025-2026 年重离子物理的最新进展

## 关键问题
- 贝叶斯提取的 $\eta/s$ 和 BAMPS 直接计算的 $\eta/s$ 一致吗？
- CME 的实验证据现在到什么程度了？（2026 年最新）
- EIC 能告诉我们什么 RHIC/LHC 不能告诉我们的？
```

---

## M12 · 涌现与多尺度物理

```
请按照以下模块和我讨论"涌现与多尺度物理"。这不是标准课程，是研究性讨论。

[粘贴"通用上下文"]

## 我想讨论的核心问题
Anderson 1972 年说 "More is Different"——每一层复杂度涌现出不可还原的新规律。
54 年过去了，没有人给出定量的涌现理论。

我想问：
1. 涌现能不能被定量化？有没有"涌现的序参量"？
2. QCD 禁闭、超导、湍流、神经网络中的智能涌现——是不是同一个数学结构？
3. Boltzmann 方程中的 Stosszahlansatz 是不是一种"涌现假设"？
4. 重整化群是涌现的数学语言吗？RG 不动点 = 涌现的宏观定律？

## 我已有的材料
- Goldenfeld《Lectures on Phase Transitions and the RG》（如果我有）
- Fradkin《Field Theories of Condensed Matter Physics》
- RMP: BCS-BEC crossover, Fracton matter, Kitaev spin liquids
- 我的 orderlevelredro 项目（跨标度物理图谱）
- Bootstrap 方法论文（backup/topics/bootstrap/）
- 张量网络 ↔ RBM 等价性论文

## 请你
1. 不要给我标准答案——这些问题没有标准答案
2. 和我讨论：提出你的观点，我提出我的，我们辩论
3. 帮我找到这些不同涌现现象之间的数学类比
4. 建议：如果我要把"涌现的定量理论"作为博士论文方向，
   最小的可操作子问题是什么？

## 我的直觉（请评价）
- 我觉得 Boltzmann 方程的 H 定理就是一种"涌现定理"：
  微观可逆 → 宏观不可逆，信息在粗粒化中丢失
- 我觉得神经网络的 grokking（突然学会泛化）类似于 QCD 的相变：
  存在一个临界点，之前和之后行为质变
- 我觉得张量网络的层级结构（MERA）就是涌现的几何表示
```

---

## M13 · AI + 物理

```
请按照以下模块带我学习"AI + 物理"的交叉前沿。

[粘贴"通用上下文"]

## 本模块两个方向

### A. AI for Physics（用 AI 解决物理问题）
- 神经网络量子态（NQS, Carleo & Troyer 2017）
- ML 求解格点 QCD（攻击 sign problem）
- PINN 求解 Boltzmann 方程
- AI 驱动材料发现（GNoME, 室温超导体搜索）

### B. Physics for AI（用物理理解 AI）
- Boltzmann 机 → Hopfield 网络 → 深度学习（2024 诺奖线）
- 统计力学 of learning（相变、泛化）
- RG ↔ 深度网络
- 扩散模型 ↔ Fokker-Planck 方程

## 我已有的材料
- 朱松纯《蒙特卡洛方法与人工智能》
- RBM ↔ Tensor Network 等价性论文
- Hinton Nobel Lecture: Boltzmann machines
- Hopfield Nobel Lecture: Physics is a point of view
- RMP: Statistical mechanics for neurons
- Flow Matching / Yang Song 扩散模型
- ML 课程 12 章（我学过）
- Tsinghua AI in HEP

## 请你
1. 先讲 Boltzmann 机的物理：为什么叫"Boltzmann"？和 Boltzmann 方程什么关系？
2. 推导 RBM 和张量网络的等价性（读那篇论文）
3. 用 PINN 求解 1D Burgers 方程（Boltzmann 方程的简化版），写代码
4. 讨论：BAMPS 的 Test Particle MC 和 MC Dropout 的数学联系
5. 讨论：扩散模型的 Fokker-Planck 方程和 QGP 热化的 Boltzmann 方程的类比

## 关键问题
- 为什么神经网络能"涌现"出智能？这和 QCD 涌现出禁闭是同一种涌现吗？
- 如果用 NQS 求解 QCD 多体问题，比格点 QCD 有什么优势？
- 朱松纯的"蒙特卡洛 → AI"框架，和 BAMPS 的 MC 方法有什么联系？
```

### Codex prompt（需要写代码）

```
请帮我用 Python 实现以下 AI+Physics 实验：

1. 用 PINN（Physics-Informed Neural Network）求解 1D Burgers 方程：
   $\partial_t u + u \partial_x u = \nu \partial_{xx} u$
   这是 Boltzmann 方程在流体力学极限下的简化版。

2. 用 RBM（Restricted Boltzmann Machine）拟合 2D Ising 模型的构型分布，
   验证 RBM 学到的权重矩阵是否对应 Ising 的耦合常数。

3. 如果时间允许，用 NQS 变分方法求 1D 横场 Ising 模型的基态能量。

请在 ~/Documents/diffusion/ 目录下创建代码文件。
```

---

## M14 · 量子模拟规范场论

```
请按照以下模块带我了解"量子模拟规范场论"的前沿。

[粘贴"通用上下文"]

## 本模块目标（了解性，不需要深入）
1. 格点规范理论的 Hamiltonian 形式（Kogut-Susskind）
2. 量子模拟方案：冷原子、离子阱、超导比特
3. 为什么经典计算机做不了实时 QCD（sign problem）
4. BAMPS 经典结果作为量子模拟的基准

## 请你
1. 写出 1+1 维 $U(1)$ 格点规范理论的 Hamiltonian
2. 解释 sign problem 为什么阻止了经典实时模拟
3. 讨论：BAMPS 的经典输运结果可以作为量子模拟的什么？
4. 搜索 2025-2026 年量子模拟规范场论的最新实验进展

## 关键问题
- 量子计算机真的能模拟实时 QCD 吗？需要什么规模的量子比特？
- 如果量子模拟成功了，BAMPS 这样的经典代码还有用吗？（有——作为基准）
```

---

## M15 · 非平衡 QFT 与开放量子系统

```
请按照以下模块带我学习"非平衡量子场论与开放量子系统"。

[粘贴"通用上下文"]

## 本模块目标
1. Schwinger-Keldysh 场论完整形式
2. 2PI 有效作用量
3. 开放量子系统：影响泛函、Lindblad 方程
4. QGP 中重夸克偶素的退相干

## 我已有的材料
- Kamenev《Field Theory of Non-Equilibrium Systems》（如果我有）
- RMP: Universality in driven open quantum matter
- RMP: Decoherence of solid-state spin qubits
- 施舒哲 2026: Bottomonium in open quantum system (arXiv:2607.06191)

## 请你
1. 从 M08 的 Keldysh 围道出发，写出完整的 CTP 路径积分
2. 推导 Caldeira-Leggett 模型的影响泛函
3. 从 SK 有效作用量推导 Lindblad 方程
4. 讨论：QGP 中 $J/\psi$ 解离和量子比特退相干的数学同构

## 关键问题
- 开放量子系统的"环境"在 QGP 中是什么？（热胶子浴）
- Lindblad 方程的 Markov 近似在 QGP 中成立吗？
- 非平衡 QFT 能不能描述"涌现"？（退相干 = 经典性的涌现？）
```

---

## 附加 Prompt：联系导师用

### 给施舒哲的邮件

```
施老师您好：

我是徐喆老师组的博士生吴浩源（2024级，学号2024311108）。
徐老师不幸去世后，我希望继续在重离子碰撞唯象方向完成博士学业。

我在徐老师组里做 BAMPS 输运模拟，已完成经典极限的验证
（均匀系统热化到 Jüttner 分布、输运系数 η/s 的数值测量、
Bjorken 膨胀的流体力学极限检验）。我注意到您最近在做
QGP 的量子计算和机器学习方法（如 arXiv:2303.15136 和
arXiv:2607.06191 的开放量子系统工作）。

我的 BAMPS 经典模拟经验可以为您的量子/ML 方法提供
经典基准测试。不知您是否有 15 分钟时间面谈？

此致
```

### 给何联毅的邮件

```
何老师您好：

我是徐喆老师组的博士生吴浩源。徐老师去世后我需要找新的导师。

我在 BAMPS 框架下做输运模拟，完成了经典极限验证。
我了解到您曾在法兰克福大学工作（2009-2013），和徐老师
（2005-2011 在法兰克福）有学术渊源。徐老师 2015 年的 PRL
（Thermalization of Gluons with BEC）和您现在做的
BCS-BEC 过渡有深刻的对偶关系。

我的 Boltzmann 方程/输运模拟背景是否有可能在您的
课题中发挥作用？不知能否约一个时间面谈？

此致
```

---

## 附加 Prompt：读论文用（Gemini / NotebookLM）

```
我上传了以下论文/教材章节。请：
1. 用 3 句话总结核心结论
2. 列出关键公式（不超过 5 个）
3. 解释这篇论文解决了什么问题、用了什么方法
4. 指出和我背景（Boltzmann 方程、输运理论、QCD 唯象）的联系
5. 提出 3 个我可以追问的问题

[上传 PDF]
```

---

*最后更新：2026-07-25*
*文件路径：~/Documents/GitHub/orderlevelredro/STUDY_PROMPTS.md*
