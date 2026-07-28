# study-env

学习模块的 LaTeX 编译与 Python 环境规范。

## LaTeX

```bash
# 中文文档 → xelatex
xelatex -interaction=nonstopmode <file>.tex

# 含 tikz-feynman 的 standalone 图 → xelatex（\diagram* 手动放置）
# 含 tikz-feynman 的 \diagram 自动布局 → lualatex（需 graphdrawing 库）

# 需要参考文献时
xelatex <file>.tex && bibtex <file> && xelatex <file>.tex && xelatex <file>.tex
```

中文 preamble 模板：
```latex
\usepackage{ctex}          % xelatex/lualatex 中文支持
\usepackage{amsmath,amssymb,physics,bm}
\usepackage{tikz-feynman}  % 费曼图（xelatex 用 \diagram*，lualatex 用 \diagram）
```

## Python

```bash
eval "$(/opt/homebrew/bin/conda shell.zsh hook)"
conda activate m01
```

已装：`numpy matplotlib sympy jupyter ipykernel pdf2image poppler`

matplotlib 中文：
```python
plt.rcParams['font.family'] = ['Arial Unicode MS', 'PingFang SC', 'sans-serif']
plt.rcParams['axes.unicode_minus'] = False
```

## Notebook 规范

- 统一 `.ipynb`，不写单独 `.py` 脚本
- Markdown cell = 理论说明，Code cell = 推导/可视化
- 生成后 `jupyter nbconvert --to notebook --execute` 验证
- Markdown 表格内 bra-ket 竖线用 `\vert`（非 `\mid`，非裸 `|`）
- Feynman 图（tikz-feynman PDF）：notebook 中用 PNG 预览 + PDF 链接
  ```markdown
  [fig_xxx.pdf](fig_xxx.pdf)       ← 链接（可下载/查看矢量图）
  ![alt](fig_xxx.png)              ← 预览（pdf2image 转换，dpi=150）
  ```
