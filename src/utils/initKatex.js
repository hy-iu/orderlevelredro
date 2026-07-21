import katex from 'katex';

if (typeof window !== 'undefined') {
  window.katex = katex;
}
if (typeof self !== 'undefined') {
  self.katex = katex;
}

// Side-effect import mhchem
import 'katex/dist/contrib/mhchem.js';

export default katex;
