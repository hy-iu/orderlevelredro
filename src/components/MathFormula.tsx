import React, { useEffect, useRef } from 'react';
import katex from '../utils/initKatex';
import 'katex/dist/katex.min.css';

interface MathProps {
  math: string;
  className?: string;
}

interface AutoMathProps {
  text?: string;
  className?: string;
}

export const InlineMath: React.FC<MathProps> = ({ math, className = '' }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

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
};

export const BlockMath: React.FC<MathProps> = ({ math, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

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
};

export const AutoMathText: React.FC<AutoMathProps> = ({ text, className = '' }) => {
  if (!text) return null;

  // Check if string contains LaTeX commands
  const hasLatex = /[\\^_{}]/.test(text) || text.includes('\\approx') || text.includes('\\times') || text.includes('\\text');

  if (hasLatex) {
    return <InlineMath math={text} className={className} />;
  }

  return <span className={className}>{text}</span>;
};
