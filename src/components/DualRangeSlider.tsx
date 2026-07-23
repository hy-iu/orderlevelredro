import React, { useRef, useCallback, useEffect } from 'react';

interface DualRangeSliderProps {
  minLimit: number;
  maxLimit: number;
  minVal: number;
  maxVal: number;
  onChange: (range: [number, number]) => void;
  unit?: string;
  accentColor?: string;
}

export const DualRangeSlider: React.FC<DualRangeSliderProps> = ({
  minLimit,
  maxLimit,
  minVal,
  maxVal,
  onChange,
  unit = '',
  accentColor = '#0284c7'
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingThumbRef = useRef<'min' | 'max' | null>(null);

  const minPercent = Math.max(0, Math.min(100, ((minVal - minLimit) / (maxLimit - minLimit)) * 100));
  const maxPercent = Math.max(0, Math.min(100, ((maxVal - minLimit) / (maxLimit - minLimit)) * 100));

  // Input Textbox Handlers
  const handleMinInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (!isNaN(val)) {
      const clamped = Math.max(minLimit, Math.min(val, maxVal));
      onChange([clamped, maxVal]);
    }
  };

  const handleMaxInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (!isNaN(val)) {
      const clamped = Math.min(maxLimit, Math.max(val, minVal));
      onChange([minVal, clamped]);
    }
  };

  // Convert clientX to integer scale value within [minLimit, maxLimit]
  const getValueFromX = useCallback((clientX: number) => {
    if (!trackRef.current) return minLimit;
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return Math.round(minLimit + ratio * (maxLimit - minLimit));
  }, [minLimit, maxLimit]);

  // Track Pointer Down: Determine nearest thumb to drag
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const val = getValueFromX(e.clientX);
    const distToMin = Math.abs(val - minVal);
    const distToMax = Math.abs(val - maxVal);

    if (distToMin < distToMax) {
      draggingThumbRef.current = 'min';
      const clamped = Math.min(val, maxVal);
      onChange([clamped, maxVal]);
    } else {
      draggingThumbRef.current = 'max';
      const clamped = Math.max(val, minVal);
      onChange([minVal, clamped]);
    }
  };

  // Global Drag Events
  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      if (!draggingThumbRef.current) return;
      const val = getValueFromX(e.clientX);

      if (draggingThumbRef.current === 'min') {
        const clampedMin = Math.max(minLimit, Math.min(val, maxVal));
        onChange([clampedMin, maxVal]);
      } else if (draggingThumbRef.current === 'max') {
        const clampedMax = Math.min(maxLimit, Math.max(val, minVal));
        onChange([minVal, clampedMax]);
      }
    };

    const onPointerUp = () => {
      draggingThumbRef.current = null;
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [getValueFromX, minLimit, maxLimit, minVal, maxVal, onChange]);

  return (
    <div className="w-full space-y-1.5 select-none font-serif text-xs">
      {/* Values Readout & Textbox Inputs */}
      <div className="flex items-center justify-between gap-2 text-slate-800 dark:text-slate-200">
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Min:</span>
          <input
            type="number"
            min={minLimit}
            max={maxVal}
            value={minVal}
            onChange={handleMinInput}
            className="w-12 px-1 py-0.5 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 font-mono text-[11px] focus:outline-none focus:border-cyan-600"
          />
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">10^{minVal}{unit}</span>
        </div>

        <div className="flex items-center gap-1 justify-end">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Max:</span>
          <input
            type="number"
            min={minVal}
            max={maxLimit}
            value={maxVal}
            onChange={handleMaxInput}
            className="w-12 px-1 py-0.5 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 font-mono text-[11px] focus:outline-none focus:border-cyan-600"
          />
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">10^{maxVal}{unit}</span>
        </div>
      </div>

      {/* Dual Range Track & Thumbs */}
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        className="relative w-full h-5 flex items-center cursor-pointer touch-none"
      >
        {/* Dimmed Background Track (两边暗) */}
        <div className="absolute w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
          {/* Highlighted Selected Middle Bar (中间亮) */}
          <div
            className="h-full rounded-full"
            style={{
              left: `${minPercent}%`,
              width: `${Math.max(0, maxPercent - minPercent)}%`,
              backgroundColor: accentColor,
              position: 'absolute'
            }}
          />
        </div>

        {/* Custom Visual Min Thumb (左手柄) */}
        <div
          className="absolute w-4 h-4 bg-white dark:bg-slate-200 border-2 rounded-full shadow-md transform -translate-x-1/2 cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
          style={{
            left: `${minPercent}%`,
            borderColor: accentColor,
            zIndex: 30
          }}
        />

        {/* Custom Visual Max Thumb (右手柄) */}
        <div
          className="absolute w-4 h-4 bg-white dark:bg-slate-200 border-2 rounded-full shadow-md transform -translate-x-1/2 cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
          style={{
            left: `${maxPercent}%`,
            borderColor: accentColor,
            zIndex: 30
          }}
        />
      </div>
    </div>
  );
};

export default DualRangeSlider;
