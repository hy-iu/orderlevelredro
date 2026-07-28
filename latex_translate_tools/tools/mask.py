# -*- coding: utf-8 -*-
"""LaTeX 格式保护切分器 v3：OPAQUE/未知命令读参数前跳过空白换行；orcidlink 用 providecommand 兜底。"""
import re, sys

M_OPEN, M_CLOSE, T_OPEN, T_CLOSE = "@@@M", "@@@", "###T", "###"

OPAQUE_ENV = {"equation","equation*","align","align*","gather","gather*","multline","multline*",
              "eqnarray","eqnarray*","cases","array","tabular","tabular*","thebibliography",
              "acknowledgments","acknowledgements"}
BLOCK_CMD = {"title","section","subsection","subsubsection","paragraph","subparagraph","caption"}
INLINE_CMD = {"emph","textbf","textit","textsc","underline"}
OPAQUE_CMD = {
 "cite":(1,1),"citep":(1,1),"citet":(1,1),"citealp":(1,1),"citealt":(1,1),"nocite":(0,1),
 "ref":(0,1),"eqref":(0,1),"autoref":(0,1),"label":(0,1),"orcidlink":(0,1),"email":(0,1),
 "url":(0,1),"href":(0,2),"bibliography":(0,1),"bibliographystyle":(0,1),
 "texttt":(0,1),"mbox":(0,1),"textcolor":(0,2),"colorbox":(0,2),"fcolorbox":(0,3),
 "ket":(0,1),"bra":(0,1),"braket":(0,1),"ketbra":(0,1),"sbra":(0,1),"sket":(0,1),"sbraket":(0,1),
 "author":(0,1),"affiliation":(0,1),"thanks":(0,1),"footnote":(0,1),"includegraphics":(1,1),
}
WS = " \t\n\r"

def base(name):
    return name[:-1] if len(name) > 1 and name.endswith("*") else name

class Scanner:
    def __init__(self):
        self.mstore = []; self.leaves = {}; self.tid = 0
    def m(self, s):
        i = len(self.mstore); self.mstore.append(s); return f"{M_OPEN}{i}{M_CLOSE}"
    def reg(self, s):
        bare = re.sub(rf"{M_OPEN}\d+{M_CLOSE}", "", s)
        return s if bare.strip() == "" else (lambda tid: (self.leaves.__setitem__(tid, s) or f"{T_OPEN}{tid}{T_CLOSE}"))(self.tid) and f"{T_OPEN}{self.tid-1}{T_CLOSE}"
    def skip_ws(self, s, i):
        while i < len(s) and s[i] in WS: i += 1
        return i
    def read_brace(self, s, i):
        if i >= len(s) or s[i] != "{": return None, i
        depth = 0; j = i
        while j < len(s):
            c = s[j]
            if c == "\\" and j+1 < len(s): j += 2; continue
            if c == "{": depth += 1
            elif c == "}":
                depth -= 1
                if depth == 0: return s[i+1:j], j+1
            j += 1
        return s[i+1:], len(s)
    def read_opt(self, s, i):
        if i < len(s) and s[i] == "[":
            depth = 0; j = i
            while j < len(s):
                c = s[j]
                if c == "\\" and j+1 < len(s): j += 2; continue
                if c == "[": depth += 1
                elif c == "]":
                    depth -= 1
                    if depth == 0: return s[i+1:j], j+1
                j += 1
            return s[i+1:], len(s)
        return None, i
    def read_cmdname(self, s, i):
        j = i+1
        if j < len(s) and (s[j].isalpha() or s[j] == "@"):
            k = j
            while k < len(s) and (s[k].isalpha() or s[k] == "@"): k += 1
            name = s[j:k]
            if k < len(s) and s[k] == "*": return name+"*", k+1
            return name, k
        if j < len(s): return s[j], j+1
        return "", j
    def find_end(self, s, env, start):
        depth = 1; i = start; tb = f"\\begin{{{env}}}"; te = f"\\end{{{env}}}"
        while i < len(s):
            if s[i] == "\\":
                if s.startswith(tb, i): depth += 1; i += len(tb); continue
                if s.startswith(te, i):
                    depth -= 1
                    if depth == 0: return i+len(te)
                    i += len(te); continue
            i += 1
        return len(s)
    def consume_opaque_args(self, s, after, name):
        optn, brn = OPAQUE_CMD.get(base(name), (1, 1)); j = after
        if optn: j = self.skip_ws(s, j); _, j = self.read_opt(s, j)
        for _ in range(brn):
            j = self.skip_ws(s, j)
            if j < len(s) and s[j] == "{": _, j = self.read_brace(s, j)
        return j
    def scan_inline(self, s):
        out = []; i = 0; n = len(s)
        while i < n:
            if s[i] == "\\" and s.startswith("\\begin{", i):
                _, a = self.read_brace(s, i+6); j = self.find_end(s, _, a); out.append(self.m(s[i:j])); i = j; continue
            if s[i] == "\\" and s.startswith("\\end{", i):
                _, a = self.read_brace(s, i+4); out.append(self.m(s[i:a])); i = a; continue
            if s[i] == "\\":
                name, after = self.read_cmdname(s, i); bn = base(name)
                if bn in INLINE_CMD:
                    inner, a2 = self.read_brace(s, after)
                    if inner is None: out.append(self.m(s[i:after])); i = after
                    else: out.append("\\"+name+"{"); out.append(self.scan_inline(inner)); out.append("}"); i = a2
                    continue
                if bn in BLOCK_CMD:
                    j = after
                    if j < n and s[j] == "{": _, j = self.read_brace(s, j)
                    out.append(self.m(s[i:j])); i = j; continue
                if bn in OPAQUE_CMD:
                    j = self.consume_opaque_args(s, after, name); out.append(self.m(s[i:j])); i = j; continue
                j = after; j = self.skip_ws(s, j); _, j2 = self.read_opt(s, j)
                if j2 != j: j = j2
                j = self.skip_ws(s, j)
                if j < n and s[j] == "{": _, j = self.read_brace(s, j)
                out.append(self.m(s[i:j])); i = j; continue
            if s[i] == "$":
                if s.startswith("$$", i):
                    j = s.find("$$", i+2); j = j+2 if j != -1 else n
                else:
                    j = i+1
                    while j < n and s[j] != "$": j += 2 if s[j] == "\\" and j+1 < n else 1
                    j = min(j+1, n)
                out.append(self.m(s[i:j])); i = j; continue
            if s.startswith("\\(", i):
                j = s.find("\\)", i+2); j = j+2 if j != -1 else n; out.append(self.m(s[i:j])); i = j; continue
            if s.startswith("\\[", i):
                j = s.find("\\]", i+2); j = j+2 if j != -1 else n; out.append(self.m(s[i:j])); i = j; continue
            if s[i] == "%":
                j = s.find("\n", i); j = j if j != -1 else n; out.append(self.m(s[i:j])); i = j; continue
            out.append(s[i]); i += 1
        return "".join(out)
    def scan_blocks(self, s):
        out = []; buf = []; i = 0; n = len(s)
        def flush():
            nonlocal buf
            if not buf: return
            seg = "".join(buf); buf = []; out.append(self.reg(seg))
        while i < n:
            if s.startswith("\\begin{", i):
                env, after = self.read_brace(s, i+6); flush()
                if env in OPAQUE_ENV:
                    j = self.find_end(s, env, after); out.append(self.m(s[i:j])); i = j
                else:
                    out.append(self.m(s[i:after])); j = self.find_end(s, env, after); endpos = j - len(f"\\end{{{env}}}")
                    out.append(self.scan_blocks(s[after:endpos])); out.append(self.m(s[endpos:j])); i = j
                continue
            if s.startswith("\\end{", i):
                flush(); _, a = self.read_brace(s, i+4); out.append(self.m(s[i:a])); i = a; continue
            if s[i] == "\\":
                name, after = self.read_cmdname(s, i); bn = base(name)
                if bn in BLOCK_CMD:
                    flush(); inner, a2 = self.read_brace(s, after)
                    if inner is None: out.append(self.m(s[i:after])); i = after
                    else: out.append("\\"+name+"{"); out.append(self.reg(self.scan_inline(inner))); out.append("}"); i = a2
                    continue
                if bn in INLINE_CMD:
                    inner, a2 = self.read_brace(s, after)
                    if inner is None: buf.append(self.m(s[i:after])); i = after
                    else: buf.append("\\"+name+"{"); buf.append(self.scan_inline(inner)); buf.append("}"); i = a2
                    continue
                if bn in OPAQUE_CMD:
                    j = self.consume_opaque_args(s, after, name); buf.append(self.m(s[i:j])); i = j; continue
                j = after; j = self.skip_ws(s, j); _, j2 = self.read_opt(s, j)
                if j2 != j: j = j2
                j = self.skip_ws(s, j)
                if j < n and s[j] == "{": _, j = self.read_brace(s, j)
                buf.append(self.m(s[i:j])); i = j; continue
            if s[i] == "$":
                if s.startswith("$$", i):
                    j = s.find("$$", i+2); j = j+2 if j != -1 else n
                else:
                    j = i+1
                    while j < n and s[j] != "$": j += 2 if s[j] == "\\" and j+1 < n else 1
                    j = min(j+1, n)
                buf.append(self.m(s[i:j])); i = j; continue
            if s.startswith("\\(", i):
                j = s.find("\\)", i+2); j = j+2 if j != -1 else n; buf.append(self.m(s[i:j])); i = j; continue
            if s.startswith("\\[", i):
                j = s.find("\\]", i+2); j = j+2 if j != -1 else n; buf.append(self.m(s[i:j])); i = j; continue
            if s[i] == "%":
                j = s.find("\n", i); j = j if j != -1 else n; buf.append(self.m(s[i:j])); i = j; continue
            if s[i] == "\n":
                k = i+1
                while k < n and s[k] in " \t": k += 1
                if k < n and s[k] == "\n":
                    flush(); m = k+1
                    while m < n and s[m] in " \t\n": m += 1
                    out.append(self.m(s[i:m])); i = m; continue
                buf.append(s[i]); i += 1; continue
            buf.append(s[i]); i += 1
        flush()
        return "".join(out)

# 修正 reg：上面 lambda 写法有误，重写为清晰版
def _reg(self, s):
    bare = re.sub(rf"{M_OPEN}\d+{M_CLOSE}", "", s)
    if bare.strip() == "":
        return s
    tid = self.tid; self.tid += 1; self.leaves[tid] = s
    return f"{T_OPEN}{tid}{T_CLOSE}"
Scanner.reg = _reg

def build_plan(text):
    bd = text.find("\\begin{document}"); ed = text.find("\\end{document}")
    if bd == -1: bd = 0
    if ed == -1: ed = len(text)
    body_start = bd + len("\\begin{document}")
    sc = Scanner(); body_tpl = sc.scan_blocks(text[body_start:ed])
    return {"pre": text[:body_start], "body_tpl": body_tpl, "post": text[ed:],
            "leaves": sc.leaves, "mstore": sc.mstore}

def apply_plan(plan, trans):
    body = plan["body_tpl"]
    body = re.sub(rf"{T_OPEN}(\d+){T_CLOSE}", lambda m: trans.get(int(m.group(1)), plan["leaves"][int(m.group(1))]), body)
    body = re.sub(rf"{M_OPEN}(\d+){M_CLOSE}", lambda m: plan["mstore"][int(m.group(1))], body)
    return plan["pre"] + body + plan["post"]

CJK_HEAD = r"""
% ===== 中文支持（xelatex）=====
\usepackage{fontspec}
\setmainfont{Times New Roman}
\usepackage{xeCJK}
\setCJKmainfont{Songti SC}[BoldFont=Heiti SC]
\setCJKsansfont{PingFang SC}
\setCJKmonofont{PingFang SC}
\providecommand{\orcidlink}[1]{}
\renewcommand{\orcidlink}[1]{}
% ===== end =====
"""

def patch_head(text):
    text = re.sub(r"(?m)^\s*\\pdfoutput=\d+\s*$", "% pdfoutput removed", text)
    text = re.sub(r",\s*txfonts\b", "", text)
    text = re.sub(r"\btxfonts\s*,", "", text)
    text = re.sub(r"\\usepackage(\[[^\]]*\])?\{txfonts\}\s*", "", text)
    text = text.replace("\\begin{document}", CJK_HEAD + "\n\\begin{document}", 1)
    return text

if __name__ == "__main__":
    path = sys.argv[1]; text = open(path, encoding="utf-8").read()
    plan = build_plan(text); back = apply_plan(plan, dict(plan["leaves"]))
    bd = text.find("\\begin{document}") + 18; ed = text.find("\\end{document}")
    orig = text[bd:ed]; b2 = back[back.find("\\begin{document}")+18:back.find("\\end{document}")]
    print("往返无损:", orig == b2, " 叶子:", len(plan["leaves"]), " M:", len(plan["mstore"]))
    if orig != b2:
        for k,(a,bv) in enumerate(zip(orig,b2)):
            if a != bv: print(f"  差异@{k} orig={repr(orig[k-15:k+15])} back={repr(b2[k-15:k+15])}"); break
        if len(orig)!=len(b2): print("  长度差", len(orig)-len(b2))
    bad = sum(1 for s2 in plan["leaves"].values() if re.search(r'(?<!\\)\$|\\cite|\\ref\b|\\label|\\begin|\\end\b', re.sub(r'@@@M\d+@@@','',s2)))
    print("残留可疑叶子:", bad)
