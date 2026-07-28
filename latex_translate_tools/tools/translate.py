# -*- coding: utf-8 -*-
"""用 deepseek-v4-flash(关思考) 并发翻译 mask 切出的叶子；占位符校验+失败回退，保证格式不坏。"""
import os, re, sys, json, glob, time, threading
import urllib.request, urllib.error
from concurrent.futures import ThreadPoolExecutor, as_completed
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import mask

API = "https://api.deepseek.com/chat/completions"
MODEL = "deepseek-v4-flash"
ENV = "/Users/bjergsen/Documents/GitHub/.env"
WORKERS = 12

SYS = (
 "You are a professional translator of academic physics papers. Translate ONLY the natural-language parts of the "
 "given LaTeX fragment into Simplified Chinese. Output ONLY the translated fragment, with no explanation and no "
 "markdown code fences. STRICT RULES:\n"
 "1. Placeholders of the form @@@M<number>@@@ stand for formulas/citations/commands that must NOT be translated. "
 "They MUST appear in your output with exactly the same numbers, in the same order, unchanged. Never drop, rename, "
 "split or modify any @@@M...@@@ placeholder.\n"
 "2. Keep in English (do NOT translate) all abbreviations/acronyms, all named models/algorithms/methods, all person "
 "names, and standard physics terms, e.g. MPS, MPO, PEPS, LPDO, MPDO, ASPT, SPT, SSB, SWSSB, SNSSB, Lindbladian, "
 "Liouville, Renyi, Wightman, Markov, Ising, Haldane, GHZ, Pauli, Hamiltonian, ansatz, fidelity, entanglement, "
 "decoherence, crosstalk, stabilizer, surface code, classical shadow, XEB, QEC, NISQ, DMRG, TDVP, Adam, Frobenius, "
 "tensor, bond dimension, eigenvalue, eigenvector, correlator, string order, domain wall, toric code, anyon.\n"
 "3. Keep every LaTeX command (e.g. \\emph{...}, \\textbf{...}) and its braces unchanged; translate only the words inside.\n"
 "4. Preserve the original punctuation style and paragraph structure."
)

def load_key():
    for ln in open(ENV, encoding="utf-8"):
        if ln.strip().startswith("DEEPSEEK_API_KEY"):
            return ln.split("=", 1)[1].strip().strip('"').strip("'")
    raise SystemExit("DEEPSEEK_API_KEY not found in " + ENV)

def call(api_key, text, tries=3):
    body = json.dumps({"model": MODEL, "thinking": {"type": "disabled"},
                       "messages": [{"role": "system", "content": SYS}, {"role": "user", "content": text}],
                       "max_tokens": 4000, "temperature": 0}).encode()
    req = urllib.request.Request(API, data=body,
        headers={"Authorization": "Bearer " + api_key, "Content-Type": "application/json"}, method="POST")
    for _ in range(tries):
        try:
            with urllib.request.urlopen(req, timeout=120) as r:
                d = json.loads(r.read())
            return d["choices"][0]["message"].get("content", "")
        except Exception:
            time.sleep(1.5)
    return None

def validate(inp, out):
    if out is None: return False
    if set(re.findall(r'@@@M\d+@@@', inp)) != set(re.findall(r'@@@M\d+@@@', out)): return False
    if re.search(r'###T\d+###', out): return False
    return True

def translate_leaves(api_key, leaves):
    trans = {}; done = [0]; lock = threading.Lock()
    def work(tid):
        inp = leaves[tid]
        out = call(api_key, inp)
        if out: out = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]', '', out)
        if validate(inp, out): return tid, out, False
        out2 = call(api_key, inp)            # 占位符校验失败再试一次
        if validate(inp, out2): return tid, out2, False
        return tid, inp, True                # 回退原文
    with ThreadPoolExecutor(max_workers=WORKERS) as ex:
        futs = [ex.submit(work, tid) for tid in leaves]
        for f in as_completed(futs):
            tid, out, fb = f.result(); trans[tid] = out
            with lock:
                done[0] += 1
                if done[0] % 40 == 0 or done[0] == len(leaves):
                    print(f"  已处理 {done[0]}/{len(leaves)}", flush=True)
    return trans

def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    dry = "--dry" in sys.argv
    aid = args[0]
    f = sorted(glob.glob(f"src/{aid}/*.tex"))[0]
    text = open(f, encoding="utf-8").read()
    plan = mask.build_plan(text)
    if dry:
        trans = dict(plan["leaves"]); fb = 0
        print(f"[DRY] {aid} 叶子 {len(plan['leaves'])}")
    else:
        key = load_key()
        print(f"[翻译] {aid} 叶子 {len(plan['leaves'])} 并发 {WORKERS}")
        trans = translate_leaves(key, plan["leaves"])
        fb = sum(1 for tid in plan["leaves"] if trans[tid] == plan["leaves"][tid])
        print(f"  回退原文叶子数: {fb}")
    out = mask.apply_plan(plan, trans)
    out = mask.patch_head(out)
    dst = f"src/{aid}/main_zh_dry.tex" if dry else f"src/{aid}/main_zh.tex"
    open(dst, "w", encoding="utf-8").write(out)
    print(f"写出 {dst} ({len(out)} 字符)")

if __name__ == "__main__":
    main()
