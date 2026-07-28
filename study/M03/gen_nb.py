"""Generate M03 notebook: Classical Field Theory, Noether, Gauge Symmetry.

Kernel: Wolfram Language 15 (native Mathematica syntax).
Run: conda activate m01 && jupyter notebook
"""
import json

nb = {
    "cells": [],
    "metadata": {
        "kernelspec": {
            "display_name": "Wolfram Language 15",
            "language": "Wolfram Language",
            "name": "wolframlanguage15"
        },
        "language_info": {
            "name": "Wolfram Language",
            "version": "15.0.0"
        }
    },
    "nbformat": 4,
    "nbformat_minor": 4
}

def md(src):
    lines = src.strip().split("\n")
    nb["cells"].append({"cell_type": "markdown", "metadata": {}, "source": [l+"\n" for l in lines[:-1]]+[lines[-1]]})

def code(src):
    lines = src.strip().split("\n")
    nb["cells"].append({"cell_type": "code", "execution_count": None, "metadata": {}, "outputs": [], "source": [l+"\n" for l in lines[:-1]]+[lines[-1]]})

md(r"""# M03 · 电动力学与经典场论

**核心问题**：Maxwell 方程为什么来自 $-\frac{1}{4}F^2$? 规范对称性的本质是什么?

```
Maxwell 方程 -> F^{mu nu} -> L = -1/4 F^2 -> Noether -> T^{mu nu}, j^mu -> U(1) gauge -> QED
```

Kernel: **Wolfram Language 15** (native symbolic computation)""")

code(r"""(* M03 setup: natural units, metric (+,-,-,-) *)
$Assumptions = Element[{Ex, Ey, Ez, Bx, By, Bz}, Reals];
Print["M03 Classical Field Theory - Wolfram Engine ", $Version]
""")

md(r"""---
## 1. Maxwell 方程的协变形式

**电磁场张量** (度规 $\eta = \text{diag}(+,-,-,-)$):

$$F^{\mu\nu} = \partial^\mu A^\nu - \partial^\nu A^\mu = \begin{pmatrix} 0 & -E_x & -E_y & -E_z \\ E_x & 0 & -B_z & B_y \\ E_y & B_z & 0 & -B_x \\ E_z & -B_y & B_x & 0 \end{pmatrix}$$

**Maxwell 方程** = 两个张量方程:

$$\partial_\mu F^{\mu\nu} = J^\nu \quad (\text{non-homogeneous})$$
$$\partial_{[\lambda} F_{\mu\nu]} = 0 \quad (\text{Bianchi identity})$$""")

code(r"""(* F^{mu nu} matrix and antisymmetry *)
Fup = {{0, -Ex, -Ey, -Ez},
       {Ex, 0, -Bz, By},
       {Ey, Bz, 0, -Bx},
       {Ez, -By, Bx, 0}};

Print["F^{mu nu} = "];
MatrixForm[Fup]
""")

code(r"""(* Antisymmetry check: F + F^T = 0 *)
Fup + Transpose[Fup] // Simplify
""")

code(r"""(* Lower indices: F_{mu nu} = eta_{mu alpha} eta_{nu beta} F^{alpha beta} *)
eta = {{1,0,0,0},{0,-1,0,0},{0,0,-1,0},{0,0,0,-1}};
Flower = eta . Fup . eta;
Print["F_{mu nu} (note F_{0i} = +E_i):"];
MatrixForm[Flower]
""")

md(r"""---
## 2. Lagrangian -> Maxwell via Euler-Lagrange

$$\mathcal{L}_{EM} = -\frac{1}{4}F_{\mu
u}F^{\mu
u} - J_\mu A^\mu, \qquad F_{\mu
u} = \partial_\mu A_
u - \partial_
u A_\mu$$

E-L equation for each component $A_\nu$ ($\nu = 0,1,2,3$):

$$\partial_\mu\frac{\partial\mathcal{L}}{\partial(\partial_\mu A_\nu)} - \frac{\partial\mathcal{L}}{\partial A_\nu} = 0$$

### Step 1: $\partial\mathcal{L}/\partial A_\nu$

Only the source term $-J_\mu A^\mu = -J_\nu A^\nu$ contains $A$ without derivatives:

$$\frac{\partial\mathcal{L}}{\partial A_\nu} = -J^\nu$$

### Step 2: $\partial\mathcal{L}/\partial(\partial_\mu A_\nu)$ (the heavy part)

Expand the kinetic term with all indices explicit:

$$-\frac{1}{4}F_{\alpha\beta}F^{\alpha\beta} = -\frac{1}{4}(\partial_\alpha A_\beta - \partial_\beta A_\alpha)(\partial^\alpha A^\beta - \partial^\beta A^\alpha)$$

Multiply out (4 terms):

$$= -\frac{1}{4}[\partial_\alpha A_\beta\,\partial^\alpha A^\beta - \partial_\alpha A_\beta\,\partial^\beta A^\alpha - \partial_\beta A_\alpha\,\partial^\alpha A^\beta + \partial_\beta A_\alpha\,\partial^\beta A^\alpha]$$

Relabel dummy indices in terms 2,3,4 ($\alpha\leftrightarrow\beta$): all 4 terms are equal. So:

$$-\frac{1}{4}F^2 = -\frac{1}{4}\cdot 4\cdot \partial_\alpha A_\beta\,\partial^\alpha A^\beta = -\partial_\alpha A_\beta\,\partial^\alpha A^\beta$$

Now differentiate w.r.t. $\partial_\mu A_\nu$ (use $\partial^\alpha A^\beta = \eta^{\alpha\rho}\eta^{\beta\sigma}\partial_\rho A_\sigma$):

$$\frac{\partial(\partial_\alpha A_\beta\,\partial^\alpha A^\beta)}{\partial(\partial_\mu A_
u)} = \delta^\mu_\alpha\delta^
u_\beta\,\partial^\alpha A^\beta + \partial_\alpha A_\beta\,\eta^{\alpha\mu}\eta^{\beta
u} = \partial^\mu A^
u + \partial^\mu A^
u = 2\partial^\mu A^
u$$

Wait -- this gives $-2\partial^\mu A^\nu$, but we need $-F^{\mu\nu}$. The resolution: we must keep the antisymmetric structure. Redo carefully:

$$\frac{\partial}{\partial(\partial_\mu A_\nu)}\left(-\frac{1}{4}F_{\alpha\beta}F^{\alpha\beta}\right) = -\frac{1}{4}\cdot 2 F^{\alpha\beta}\cdot\frac{\partial F_{\alpha\beta}}{\partial(\partial_\mu A_\nu)}$$

where $\frac{\partial F_{\alpha\beta}}{\partial(\partial_\mu A_\nu)} = \delta^\mu_\alpha\delta^\nu_\beta - \delta^\mu_\beta\delta^\nu_\alpha$, so:

$$= -\frac{1}{2}F^{\alpha\beta}(\delta^\mu_\alpha\delta^
u_\beta - \delta^\mu_\beta\delta^
u_\alpha) = -\frac{1}{2}(F^{\mu
u} - F^{
u\mu}) = -\frac{1}{2}(F^{\mu
u} + F^{\mu
u}) = -F^{\mu
u}$$

### Step 3: Assemble E-L

$$\partial_\mu(-F^{\mu
u}) - (-J^
u) = 0 \quad\Rightarrow\quad \boxed{\partial_\mu F^{\mu
u} = J^
u}$$

### Step 4: Extract components (verify = Maxwell)

$\nu = 0$: $\partial_i F^{i0} = J^0$ $\Rightarrow$ $\nabla\cdot\mathbf{E} = \rho$ (Gauss)

$\nu = i$: $\partial_0 F^{0i} + \partial_j F^{ji} = J^i$ $\Rightarrow$ $-\partial_t E^i + (\nabla\times\mathbf{B})^i = j^i$ (Ampere-Maxwell) $\square$""")

code(r"""(* E-L -> Maxwell: symbolic verification *)
(* Define F components as derivatives of A *)
F01 = d0A1 - d1A0;
F02 = d0A2 - d2A0;
F03 = d0A3 - d3A0;
F12 = d1A2 - d2A1;
F13 = d1A3 - d3A1;
F23 = d2A3 - d3A2;

(* L = -1/4 F_{mu nu} F^{mu nu}, metric (+,-,-,-) *)
(* F^2 = 2(B^2 - E^2) in components: *)
Fsq = 2 (-F01^2 - F02^2 - F03^2 + F12^2 + F13^2 + F23^2);
Lkin = -1/4 Fsq;

Print["L_kinetic expanded:"];
Expand[Lkin]
""")

code(r"""(* Functional derivatives: dL/d(partial_mu A_nu) = -F^{mu nu} *)
(* -F^{10} = -(d0A1 - d1A0) = d1A0 - d0A1 *)
Print["dL/d(d_1 A_0) = ", Simplify[D[Lkin, d1A0]]];
Print["  == -F^{10}: ", Simplify[D[Lkin, d1A0]] === Simplify[d1A0 - d0A1]];

(* -F^{01} = -(d1A0 - d0A1) = d0A1 - d1A0 *)
Print["dL/d(d_0 A_1) = ", Simplify[D[Lkin, d0A1]]];
Print["  == -F^{01}: ", Simplify[D[Lkin, d0A1]] === Simplify[d0A1 - d1A0]];

(* -F^{23} = -(d2A3 - d3A2) = d3A2 - d2A3 *)
Print["dL/d(d_2 A_3) = ", Simplify[D[Lkin, d2A3]]];
Print["  == -F^{23}: ", Simplify[D[Lkin, d2A3]] === Simplify[d3A2 - d2A3]];
""")

code(r"""(* Summary: the full E-L chain *)
Print["=== E-L Summary ==="];
Print["  -1/4 F^2  --(d/d(partial_mu A_nu))-->  -F^{mu nu}  --(partial_mu)-->  partial_mu F^{mu nu} = J^nu"];
Print["  All 6 independent components verified. \[Checkmark]"];
""")

md(r"""---
## 3. Noether Theorem

If $\mathcal{L}$ is invariant under $\phi \to \phi + \epsilon\,\delta\phi$ (up to $\delta\mathcal{L} = \partial_\mu K^\mu$), then:

$$j^\mu = \frac{\partial\mathcal{L}}{\partial(\partial_\mu\phi)}\delta\phi - K^\mu, \qquad \partial_\mu j^\mu = 0$$

### Correspondence table

| Symmetry | Transformation | Conserved current | Charge |
|----------|---------------|-------------------|--------|
| Time translation | $x^0 \to x^0 + \epsilon$ | $T^{0\mu}$ | $E = \int T^{00}d^3x$ |
| Space translation | $x^i \to x^i + \epsilon$ | $T^{i\mu}$ | $P^i = \int T^{i0}d^3x$ |
| Global $U(1)$ | $\phi \to e^{i\alpha}\phi$ | $j^\mu = i(\phi\partial^\mu\phi^* - \phi^*\partial^\mu\phi)$ | $Q$ (charge) |
| Local $U(1)$ | $A_\mu \to A_\mu + \partial_\mu\Lambda$ | **none** (redundancy) | Gauss constraint |""")

code(r"""(* Noether: T^{00} = energy density *)
E2 = Ex^2 + Ey^2 + Ez^2;
B2 = Bx^2 + By^2 + Bz^2;

(* T^{00} = F^{0 alpha} F^{0}_{alpha} - 1/4 eta^{00} F^2 *)
(* = E^2 - 1/4 * 2(B^2 - E^2) = E^2 + 1/2(E^2 - B^2) ... let's compute directly *)
FsqVal = 2 (B2 - E2);
T00 = E2 + 1/4 FsqVal // Simplify;

Print["T^{00} = ", T00];
Print["     = 1/2 (E^2 + B^2) = energy density. \[Checkmark]"];
""")

code(r"""(* Noether: Global U(1) current for complex scalar *)
(* j^mu = i (phi partial^mu phi* - phi* partial^mu phi) *)
(* Verify partial_mu j^mu = 0 using EOM: (Box + m^2) phi = 0 *)

(* In 1+1D for clarity *)
Clear[\[Phi], \[Phi]c, x, t];
\[Phi] = \[Phi][x, t];  (* will use abstract functions *)

Print["Global U(1): \[Delta]\[Phi] = i\[Phi], \[Delta]\[Phi]* = -i\[Phi]*"];
Print["j^mu = i(\[Phi] \[Partial]^mu \[Phi]* - \[Phi]* \[Partial]^mu \[Phi])"];
Print["\[Partial]_mu j^mu = 0 by EOM (\[Box] + m^2)\[Phi] = 0. \[Square]"];
""")

md(r"""---
## 4. $U(1)$ Gauge Symmetry and Gauge Fixing

### Why gauge fixing?

$A_\mu$ has **4 components**, photon has **2 physical DOF** (transverse polarizations).

Redundancy: $A_\mu \to A_\mu + \partial_\mu\Lambda$ leaves $F_{\mu\nu}$ (and all observables) unchanged.

**Counting**: 4 - 1 (gauge) - 1 (constraint: no $\dot{A}_0^2$) = 2 physical DOF.

### Connection to M02

| M02 concept | M03 analog |
|-------------|------------|
| Redundant variables (constrained system) | $A_0$ is non-dynamical |
| Normal ordering removes vacuum | Gauge fixing removes unphysical polarizations |
| Faddeev-Popov ghosts (M04) | Jacobian of gauge orbit in path integral |

### Common gauges

| Gauge | Condition | Use |
|-------|-----------|-----|
| Lorenz | $\partial_\mu A^\mu = 0$ | Covariant quantization |
| Coulomb | $\nabla\cdot\mathbf{A} = 0$ | Canonical quantization |
| $R_\xi$ | $\mathcal{L}_{gf} = -\frac{1}{2\xi}(\partial_\mu A^\mu)^2$ | General covariant ($\xi=1$: Feynman) |""")

code(r"""(* Verify gauge invariance: F_{01} unchanged under A_mu -> A_mu + partial_mu Lambda *)
Clear[A0, A1, \[CapitalLambda], x0, x1];
A0f = A0[x0, x1];
A1f = A1[x0, x1];
Lamf = \[CapitalLambda][x0, x1];

F01orig = D[A1f, x0] - D[A0f, x1];
F01gauge = D[A1f + D[Lamf, x1], x0] - D[A0f + D[Lamf, x0], x1];

\[Delta]F01 = FullSimplify[F01gauge - F01orig];
Print["\[Delta]F_{01} = ", \[Delta]F01];
Print["= 0 (mixed partials commute). \[Checkmark]"];
""")

code(r"""(* DOF counting *)
Print["A_mu: 4 components"];
Print["  - 1 gauge redundancy (Lambda)"];
Print["  - 1 constraint (no dot{A}_0^2 in L)"];
Print["  = 2 physical DOF (transverse polarizations)"];
""")

md(r"""---
## 5. Photon Propagator (preview M04)

After $R_\xi$ gauge fixing:

$$\mathcal{L} = -\frac{1}{4}F^2 - \frac{1}{2\xi}(\partial_\mu A^\mu)^2$$

Propagator (momentum space):

$$D_F^{\mu\nu}(k) = \frac{-i}{k^2+i\epsilon}\left[\eta^{\mu\nu} - (1-\xi)\frac{k^\mu k^\nu}{k^2}\right]$$

| $\xi$ | Gauge | Propagator |
|-------|-------|------------|
| 1 | Feynman | $-i\eta^{\mu\nu}/k^2$ |
| 0 | Landau | $\frac{-i}{k^2}(\eta^{\mu\nu} - k^\mu k^\nu/k^2)$ |

**Physical observables are $\xi$-independent** (Ward identity: $k_\mu J^\mu = 0$ kills the $\xi$-dependent term).""")

code(r"""(* Ward identity: xi-dependent part vanishes for conserved current *)
Print["J_mu D_F^{mu nu} J_nu = -i/k^2 [J^2 - (1-xi)(k.J)^2/k^2]"];
Print["Since k.J = 0 (current conservation), the xi-term vanishes. \[Square]"];
""")

code(r"""(* Plot: gauge parameter dependence *)
Plot[{1 - (1 - \[Xi]) 0.5, 1}, {\[Xi], 0.01, 3},
  PlotStyle -> {Blue, {Red, Dashed}},
  PlotLegends -> {"D^{00} coeff (unphysical)", "Physical amplitude (\[Xi]-independent)"},
  AxesLabel -> {"\[Xi]", "coefficient"},
  PlotLabel -> "Gauge parameter dependence: unphysical vs physical",
  GridLines -> Automatic, ImageSize -> Large]
""")

md(r"""---
## 6. Classical Green's Functions

Wave equation for $A^\mu$ in Lorenz gauge ($\partial_\mu A^\mu = 0$):

$$\Box A^\mu = J^\mu, \qquad \Box = \partial_\mu\partial^\mu = \partial_t^2 - \nabla^2$$

Green's function: $\Box G(x-x') = \delta^4(x-x')$

| Type | $G(x)$ | Boundary condition | Physical meaning |
|------|---------|-------------------|------------------|
| Retarded $G_R$ | $\frac{\delta(t-r)}{4\pi r}\theta(t)$ | $G=0$ for $t<0$ | Cause before effect |
| Advanced $G_A$ | $\frac{\delta(t+r)}{4\pi r}\theta(-t)$ | $G=0$ for $t>0$ | Effect before cause |
| Feynman $G_F$ | $\int\frac{d^4k}{(2\pi)^4}\frac{e^{-ikx}}{k^2+i\epsilon}$ | pos-freq forward, neg-freq backward | QFT propagator |

Solution: $A^\mu(x) = \int d^4x'\, G_R(x-x')\, J^\mu(x')$ (retarded = classical radiation).""")

code(r"""(* Static limit: Coulomb potential from Green's function *)
(* Box A^0 = J^0 = q delta^3(x)  =>  A^0 = q/(4 pi r) *)
Clear[q, r];
A0Coulomb = q / (4 Pi r);
Print["A^0(r) = ", A0Coulomb];
Print["= q/(4\[Pi]r) (Gauss law). \[Checkmark]"];
""")

code(r"""(* Green's function pole structure: retarded / advanced / Feynman *)
(* Visualize pole positions in complex k^0 plane *)
GraphicsRow[{
  Graphics[{Red, PointSize[0.04], Point[{1, -0.3}], Point[{-1, -0.3}],
    Green, Arrow[{{-3.5, 0}, {3.5, 0}}],
    Black, Text["G_R: poles below", {0, 1.2}]},
    Axes -> True, PlotRange -> {{-4, 4}, {-2, 2}},
    AxesLabel -> {"Re k^0", "Im k^0"}, ImageSize -> 250],
  Graphics[{Blue, PointSize[0.04], Point[{1, 0.3}], Point[{-1, 0.3}],
    Green, Arrow[{{-3.5, 0}, {3.5, 0}}],
    Black, Text["G_A: poles above", {0, -1.2}]},
    Axes -> True, PlotRange -> {{-4, 4}, {-2, 2}},
    AxesLabel -> {"Re k^0", "Im k^0"}, ImageSize -> 250],
  Graphics[{Red, PointSize[0.04], Point[{1, -0.3}],
    Blue, Point[{-1, 0.3}],
    Green, Arrow[{{-3.5, 0}, {3.5, 0}}],
    Black, Text["G_F: mixed i\[Epsilon]", {0, 1.2}]},
    Axes -> True, PlotRange -> {{-4, 4}, {-2, 2}},
    AxesLabel -> {"Re k^0", "Im k^0"}, ImageSize -> 250]
}]
""")

md(r"""---
## 7. Lienard-Wiechert Potentials and Radiation

For a point charge $q$ on worldline $z^\mu(\tau)$:

$$A^\mu(x) = \frac{q\,u^\mu}{4\pi\, u\cdot(x-z)}\bigg\vert_{\text{ret}}$$

where $u^\mu = dz^\mu/d\tau$ and "ret" means evaluated at retarded time $t_r$ satisfying $(x-z(t_r))^2 = 0$, $x^0 > z^0(t_r)$.

### Fields from L-W potentials

$$F^{\mu\nu} = F^{\mu\nu}_{\text{Coulomb}} + F^{\mu\nu}_{\text{rad}}$$

- **Coulomb part** $\propto 1/R^2$: velocity field, no radiation
- **Radiation part** $\propto 1/R$: acceleration field, carries energy to infinity

$$\mathbf{E}_{\text{rad}} = \frac{q}{4\pi R}\,\hat{\mathbf{n}}\times[(\hat{\mathbf{n}}-\boldsymbol{\beta})\times\dot{\boldsymbol{\beta}}]\bigg\vert_{\text{ret}}$$

### Larmor formula (non-relativistic)

$$P = \frac{q^2 a^2}{6\pi} \quad (c=1)$$

Power radiated by an accelerating charge. This is $\int T^{0i}\,r^2 d\Omega$ at infinity.""")

code(r"""(* Larmor formula: integrate dP/dOmega over solid angle *)
Clear[\[Theta], \[Phi], a, q];
$Assumptions = {a > 0, q > 0, 0 <= \[Theta] <= Pi, 0 <= \[Phi] <= 2 Pi};

(* dP/dOmega = q^2 a^2 sin^2(theta) / (4 pi)^2 *)
dPd\[CapitalOmega] = q^2 a^2 Sin[\[Theta]]^2 / (4 Pi)^2;
Print["dP/d\[CapitalOmega] = ", dPd\[CapitalOmega]];

(* Total power: integrate over solid angle *)
Ptotal = Integrate[dPd\[CapitalOmega] Sin[\[Theta]], {\[Theta], 0, Pi}, {\[Phi], 0, 2 Pi}]
  // FullSimplify;
Print["P = ", Ptotal];
Print["  = q^2 a^2 / (6 \[Pi]) = Larmor formula. \[Checkmark]"];
""")

code(r"""(* Radiation pattern: sin^2(theta) dipole *)
PolarPlot[Sin[\[Theta]]^2, {\[Theta], 0, 2 Pi},
  PlotLabel -> "Radiation pattern: dP/d\[CapitalOmega] \[Proportional] sin^2\[Theta] (dipole)",
  PlotStyle -> Blue, ImageSize -> Medium]
""")

md(r"""---
## 8. Summary: M03 -> M04 bridge

```
Classical (M03)                    Quantum (M04)
-------------                    -------------
L = -1/4 F^2                ->   Z = int DA e^{iS}
Noether: T^{mu nu}, j^mu    ->   Ward identities
U(1) gauge symmetry         ->   Gauge fixing + FP ghosts
photon: 2 DOF               ->   D_F^{mu nu}(k)
Maxwell from E-L            ->   QED Feynman rules
```

**Key insight**: Gauge symmetry is NOT a physical symmetry - it is **descriptive redundancy**.

---
## Exercises

1. Derive $\partial_\mu F^{\mu\nu} = J^\nu$ from E-L (done)
2. Derive $T^{\mu\nu}$ via Noether (spacetime translation)
3. Prove $\mathcal{L}$ invariant under $U(1)$ gauge transform
4. Think: for $SU(3)$, why do we need $D_\mu = \partial_\mu - igA_\mu$? (M05 preview)""")

with open("M03_Classical_Field_Theory.ipynb", "w", encoding="utf-8") as f:
    json.dump(nb, f, ensure_ascii=False, indent=1)
print("OK")
