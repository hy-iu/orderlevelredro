import katexModule from 'katex';

let katex = katexModule;

if (typeof window !== 'undefined') {
  if (window.katex) {
    katex = window.katex;
  } else {
    window.katex = katexModule;
  }
}
if (typeof self !== 'undefined') {
  self.katex = katex;
}

// Side-effect import mhchem for bundled environments fallback
try {
  import('katex/dist/contrib/mhchem.js');
} catch (e) {
  // Ignore if already registered by CDN
}

export default katex;
