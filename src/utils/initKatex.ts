import katexModule from 'katex';

let katex = katexModule;

if (typeof window !== 'undefined') {
  if ((window as any).katex) {
    katex = (window as any).katex;
  } else {
    (window as any).katex = katexModule;
  }
}

if (typeof self !== 'undefined') {
  (self as any).katex = katex;
}

// Side-effect import mhchem for bundled environments fallback
try {
  import('katex/dist/contrib/mhchem.js' as any);
} catch (e) {
  // Ignore if already registered by CDN
}

export default katex;
