import katex from 'katex';

if (typeof window !== 'undefined') {
  window.katex = katex;
}
if (typeof self !== 'undefined') {
  self.katex = katex;
}

export default katex;
