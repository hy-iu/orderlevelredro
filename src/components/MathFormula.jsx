import React, { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import 'katex/dist/contrib/mhchem';

export function InlineMath({ math, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && math) {
      try {
        katex.render(math, containerRef.current, {
          displayMode: false,
          throwOnError: false,
          strict: false,
          trust: true
        });
      } catch (err) {
        if (containerRef.current) {
          containerRef.current.textContent = math;
        }
      }
    }
  }, [math]);

  return <span ref={containerRef} className={`inline-block ${className}`} />;
}

export function BlockMath({ math, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && math) {
      try {
        katex.render(math, containerRef.current, {
          displayMode: true,
          throwOnError: false,
          strict: false,
          trust: true
        });
      } catch (err) {
        if (containerRef.current) {
          containerRef.current.textContent = math;
        }
      }
    }
  }, [math]);

  return <div ref={containerRef} className={`overflow-x-auto my-1 text-center ${className}`} />;
}

export function AutoMathText({ text, className = '' }) {
  if (!text) return null;

  // Check if string contains LaTeX commands (like \approx, \times, \lambda, \Delta, \hbar, 10^{-2}, etc.)
  const hasLatex = /[\\^_{}]/.test(text) || text.includes('\\approx') || text.includes('\\times') || text.includes('\\text');

  if (hasLatex) {
    return <InlineMath math={text} className={className} />;
  }

  return <span className={className}>{text}</span>;
}
