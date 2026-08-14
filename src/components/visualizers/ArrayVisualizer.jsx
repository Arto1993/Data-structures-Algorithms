import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ArrayVisualizer({
  mode = 'bars', // 'bars' | 'binarySearch' | 'radix' | 'dataStructure'
  array = [],
  capacity = null,
  highlights = [],
  pivot = null,
  minIdx = null,
  comparingIdx = null,
  range = null,
  low = null,
  high = null,
  mid = null,
  target = null,
  targetK = null,
  heapSize = null,
  sortedBoundary = null,
  sortedIndices = null,
  buckets = null,
  activeIdx = null,
  opType = null, // 'access' | 'insert' | 'delete' | 'search' | 'push' | 'pop'
  baseAddress = 0x1000,
  title = null,
  subtitle = null,
  legend = null,
  message = ''
}) {
  // --- 1. Core Data Structure Memory Layout Mode ---
  if (mode === 'dataStructure') {
    const totalCapacity = capacity || Math.max(array.length, 8);
    const slots = [];
    for (let i = 0; i < totalCapacity; i++) {
      slots.push({
        index: i,
        value: i < array.length ? array[i] : null,
        address: `0x${(baseAddress + i * 4).toString(16).toUpperCase()}`,
        isFilled: i < array.length,
        isActive: activeIdx === i || highlights.includes(i)
      });
    }

    return (
      <div className="array-visualizer-wrapper flex flex-col items-center w-full gap-4">
        {/* Top Invariant & Address Calculation Card */}
        <div className="ds-memory-hud">
          <div className="hud-metric">
            <span className="hud-label">SIZE (LENGTH)</span>
            <span className="hud-val text-accent-brand">{array.length}</span>
          </div>
          <div className="hud-metric">
            <span className="hud-label">ALLOCATED CAPACITY</span>
            <span className="hud-val text-accent-cyan">{totalCapacity}</span>
          </div>
          <div className="hud-metric">
            <span className="hud-label">ELEMENT TYPE</span>
            <span className="hud-val text-slate-200">Int32 (4 Bytes)</span>
          </div>
          <div className="hud-formula">
            <span className="hud-label">DIRECT MEMORY ADDRESS FORMULA:</span>
            <code className="text-accent-brand font-mono text-xs">
              {activeIdx !== null && activeIdx >= 0 && activeIdx < totalCapacity
                ? `Address(arr[${activeIdx}]) = 0x${baseAddress.toString(16).toUpperCase()} + ${activeIdx} × 4 = 0x${(baseAddress + activeIdx * 4).toString(16).toUpperCase()} ★ O(1)`
                : `Address(arr[i]) = BaseAddress + i × sizeof(DataType)`}
            </code>
          </div>
        </div>

        {/* Contiguous Memory Buffer Slots */}
        <div className="ds-buffer-container">
          <div className="ds-buffer-grid">
            <AnimatePresence>
              {slots.map(slot => {
                let cellStyle = 'ds-slot';
                let tag = null;

                if (slot.isActive) {
                  cellStyle += ' ds-slot-active';
                  if (opType === 'access') tag = 'ACCESS [O(1)]';
                  else if (opType === 'insert') tag = 'INSERT';
                  else if (opType === 'delete') tag = 'DELETE';
                  else if (opType === 'search') tag = 'SEARCH';
                  else tag = 'ACTIVE';
                } else if (slot.isFilled) {
                  cellStyle += ' ds-slot-filled';
                } else {
                  cellStyle += ' ds-slot-empty';
                }

                return (
                  <motion.div
                    key={`ds-cell-${slot.index}`}
                    layout
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.85, opacity: 0 }}
                    className={cellStyle}
                  >
                    {/* Operation Tag */}
                    {tag && (
                      <span className="ds-slot-tag">{tag}</span>
                    )}

                    {/* Value */}
                    <span className="ds-slot-val">
                      {slot.isFilled ? slot.value : '·'}
                    </span>

                    {/* Index */}
                    <span className="ds-slot-idx">[{slot.index}]</span>

                    {/* Hex Address */}
                    <span className="ds-slot-addr">{slot.address}</span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {message && (
          <div className="step-log-badge">
            <span className="log-dot"></span>
            <span>{message}</span>
          </div>
        )}
      </div>
    );
  }

  // --- 2. Radix Sort Decimal Buckets Mode ---
  if (mode === 'radix' && buckets) {
    return (
      <div className="array-visualizer-wrapper flex flex-col items-center w-full gap-4">
        {/* Main Array Top Bar */}
        <div className="flex items-center gap-1.5 flex-wrap justify-center p-3 bg-slate-900/70 border border-white/10 rounded-lg">
          <span className="text-[11px] font-mono text-text-muted mr-2 font-bold">CURRENT ARRAY:</span>
          {array.map((val, idx) => (
            <motion.div
              key={`radix-arr-${idx}`}
              layout
              className="px-2.5 py-1 bg-slate-800 border border-white/15 rounded text-xs font-mono font-bold text-text-primary"
            >
              {val}
            </motion.div>
          ))}
        </div>

        {/* 10 Decimal Buckets [0..9] */}
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2 w-full max-w-4xl px-2">
          {buckets.map((bucketItems, bucketIdx) => (
            <div 
              key={`bucket-${bucketIdx}`}
              className="flex flex-col items-center p-2 rounded-lg bg-slate-900/90 border border-white/10 min-h-[90px]"
            >
              <div className="text-[10px] font-mono font-bold text-accent-brand mb-1.5 pb-1 border-b border-white/10 w-full text-center">
                BUCKET {bucketIdx}
              </div>
              <div className="flex flex-col gap-1 w-full items-center">
                <AnimatePresence>
                  {bucketItems.map((val, itemIdx) => (
                    <motion.div
                      key={`b-item-${val}-${itemIdx}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="px-2 py-0.5 bg-accent-brand/15 border border-accent-brand/40 text-accent-brand font-mono text-xs font-bold rounded text-center w-full"
                    >
                      {val}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {bucketItems.length === 0 && (
                  <span className="text-[10px] text-text-muted mt-2">—</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {message && (
          <div className="step-log-badge">
            <span className="log-dot"></span>
            <span>{message}</span>
          </div>
        )}
      </div>
    );
  }

  // --- 3. Bars Mode (Screenshot-Matched High Polish Design) ---
  if (mode === 'bars') {
    if (!array || array.length === 0) return null;
    const maxVal = Math.max(...array.map(Math.abs), 1);

    // Dynamic Legend Builder if not explicitly provided
    let computedLegend = legend;
    if (!computedLegend) {
      computedLegend = [];
      const effectiveMin = minIdx !== null ? minIdx : pivot;
      const effectiveComp = comparingIdx !== null ? comparingIdx : (highlights.length > 0 && highlights[0] !== effectiveMin ? highlights[0] : (highlights.length > 1 ? highlights[1] : null));

      if (effectiveMin !== null && array[effectiveMin] !== undefined) {
        computedLegend.push({
          label: `Minimum: ${array[effectiveMin]}`,
          color: 'min'
        });
      }
      if (effectiveComp !== null && array[effectiveComp] !== undefined && effectiveComp !== effectiveMin) {
        computedLegend.push({
          label: `Comparing: ${array[effectiveComp]}`,
          color: 'comparing'
        });
      }
      if (sortedBoundary !== null && sortedBoundary > 0) {
        computedLegend.push({
          label: `${sortedBoundary} Sorted`,
          color: 'sorted'
        });
      }
    }

    const displayTitle = title || (message.includes(':') ? message.split(':')[0] : 'Sorting & Array Visualizer');
    const displaySubtitle = subtitle || (message.includes(':') ? message.split(':').slice(1).join(':').trim() : message);

    return (
      <div className="array-visualizer-wrapper">
        {/* Screenshot-Style Step Info Header */}
        <div className="bar-chart-header">
          {displayTitle && (
            <h3 className="bar-chart-title">{displayTitle}</h3>
          )}
          {displaySubtitle && (
            <p className="bar-chart-subtitle">{displaySubtitle}</p>
          )}
          {computedLegend && computedLegend.length > 0 && (
            <div className="bar-chart-legend">
              {computedLegend.map((item, i) => {
                const dotColor = item.color || 'blue';
                return (
                  <div key={`legend-${i}`} className="legend-item">
                    <span className={`legend-dot legend-dot-${dotColor}`} />
                    <span className="legend-label">{item.label}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Screenshot-Style Dark Chart Box */}
        <div className="screenshot-chart-container">
          <div className="screenshot-bars-row">
            {array.map((val, idx) => {
              const absVal = Math.abs(val);
              // Calculate height percentage with minimum visible height for value display
              const heightPercent = Math.max(16, Math.min(100, Math.round((absVal / maxVal) * 100)));
              
              const isMin = minIdx === idx;
              const isPivot = pivot === idx;
              const isTargetK = targetK === idx;
              const isComparing = comparingIdx === idx || (highlights.includes(idx) && !isMin && !isPivot);
              const inRange = range ? idx >= range[0] && idx <= range[1] : true;
              const inHeap = heapSize !== null ? idx < heapSize : true;
              const isSorted = (sortedBoundary !== null && idx < sortedBoundary) || (sortedIndices && sortedIndices.includes(idx));

              let barModifier = 'screenshot-bar-default';
              let badge = null;

              if (isTargetK) {
                barModifier = 'screenshot-bar-swap';
                badge = 'K';
              } else if (isMin || isPivot) {
                barModifier = 'screenshot-bar-min';
                badge = isPivot ? 'P' : 'MIN';
              } else if (isComparing) {
                barModifier = 'screenshot-bar-comparing';
              } else if (isSorted) {
                barModifier = 'screenshot-bar-sorted';
              } else if (!inRange || !inHeap) {
                barModifier = 'screenshot-bar-dimmed';
              }

              return (
                <div key={`bar-col-${idx}`} className="screenshot-bar-col">
                  {badge && (
                    <span className="screenshot-pointer-badge">
                      {badge}
                    </span>
                  )}
                  <div className="screenshot-bar-track">
                    <motion.div
                      layout
                      className={`screenshot-bar ${barModifier}`}
                      initial={{ height: 0 }}
                      animate={{ height: `${heightPercent}%` }}
                      transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    >
                      {/* Number displayed inside the bar near top */}
                      <span className="screenshot-bar-val">{val}</span>
                    </motion.div>
                  </div>
                  {/* Subtle Baseline Line */}
                  <div className="screenshot-col-baseline" />
                  {/* Index / Position Number below baseline */}
                  <span className="screenshot-bar-idx">{idx + 1}</span>
                </div>
              );
            })}
          </div>
        </div>

        {message && !title && (
          <div className="step-log-badge">
            <span className="log-dot"></span>
            <span>{message}</span>
          </div>
        )}
      </div>
    );
  }

  // --- 4. Binary Search Cells Mode ---
  if (mode === 'binarySearch') {
    return (
      <div className="array-visualizer-wrapper">
        <div className="search-cells-container">
          {array.map((val, idx) => {
            const isMid = idx === mid;
            const isLow = idx === low;
            const isHigh = idx === high;
            const inRange = (low === null || high === null) ? true : (idx >= low && idx <= high);
            const isTargetMatch = val === target && isMid;

            let cellClass = 'search-cell';
            if (isTargetMatch) cellClass += ' cell-match';
            else if (isMid) cellClass += ' cell-mid';
            else if (!inRange) cellClass += ' cell-excluded';

            let badges = [];
            if (isLow) badges.push('L');
            if (isMid) badges.push('M');
            if (isHigh) badges.push('H');

            return (
              <div key={`bs-${idx}`} className="search-cell-column">
                <div className="pointer-badge-row">
                  {badges.length > 0 ? badges.join('/') : ''}
                </div>
                <motion.div 
                  layout 
                  className={cellClass}
                  whileHover={{ scale: 1.06 }}
                >
                  {val}
                </motion.div>
                <div className="bar-idx-label">[{idx}]</div>
              </div>
            );
          })}
        </div>

        {message && (
          <div className="step-log-badge">
            <span className="log-dot"></span>
            <span>{message}</span>
          </div>
        )}
      </div>
    );
  }

  return null;
}
