import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StackQueueVisualizer({
  mode = 'stack', // 'stack' | 'queue' | 'deque' | 'monotonic'
  items = [],
  monotonicInput = [],
  monotonicResult = [],
  currentIdx = null,
  resolvedIdx = null,
  message = ''
}) {
  // --- Monotonic Stack Mode ---
  if (mode === 'monotonic') {
    return (
      <div className="mono-stage-wrapper">
        {/* Top Panel: Input Array Strip */}
        <div className="mono-panel-card">
          <div className="mono-panel-header">
            <span>INPUT ARRAY</span>
            <span>
              {currentIdx !== null ? (
                <>Examining index <strong className="text-accent-brand">[{currentIdx}]</strong> (val={monotonicInput[currentIdx]})</>
              ) : (
                <span className="text-text-muted">Click Play or Run to start</span>
              )}
            </span>
          </div>

          <div className="mono-cells-row">
            {monotonicInput.map((val, idx) => {
              const isCurrent = idx === currentIdx;
              const isResolved = idx === resolvedIdx;

              return (
                <motion.div
                  key={`mono-in-${idx}`}
                  layout
                  className={`mono-cell ${isCurrent ? 'active-scan' : isResolved ? 'resolved' : ''}`}
                >
                  <span className="text-base">{val}</span>
                  <span className="mono-cell-idx">[{idx}]</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Middle Grid: Monotonic Decreasing Stack + Next Greater Result */}
        <div className="mono-middle-grid">
          {/* Monotonic Decreasing Stack Container */}
          <div className="mono-panel-card">
            <div className="mono-panel-header">
              <span className="text-accent-brand">MONOTONIC STACK (LIFO)</span>
              <span className="text-[10px] text-text-muted">Decreasing Order</span>
            </div>

            <div className="mono-stack-tube">
              <AnimatePresence>
                {items.map((itemObj, i) => {
                  const idxVal = typeof itemObj === 'object' ? itemObj.idx : itemObj;
                  const numVal = typeof itemObj === 'object' ? itemObj.val : monotonicInput[idxVal];
                  const isTop = i === items.length - 1;

                  return (
                    <motion.div
                      key={`stk-idx-${idxVal}-${i}`}
                      initial={{ y: -16, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className={`mono-stack-item ${isTop ? 'top-stack' : ''}`}
                    >
                      <span>Index [{idxVal}]</span>
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-white/10 text-slate-100 font-bold">
                        val = {numVal}
                      </span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              {items.length === 0 && (
                <span className="text-xs text-text-muted font-mono py-8">Stack is Empty</span>
              )}
            </div>
          </div>

          {/* Next Greater Result Output Array */}
          <div className="mono-panel-card">
            <div className="mono-panel-header">
              <span className="text-accent-emerald">NEXT GREATER RESULT</span>
              <span className="text-[10px] text-text-muted">O(N) Output</span>
            </div>

            <div className="mono-cells-row">
              {monotonicInput.map((_, idx) => {
                const resVal = monotonicResult[idx];
                const hasValue = resVal !== undefined && resVal !== -1;
                const isJustResolved = idx === resolvedIdx;

                return (
                  <motion.div
                    key={`res-${idx}`}
                    layout
                    className={`mono-result-cell ${hasValue || isJustResolved ? 'has-val' : 'unresolved'}`}
                  >
                    <span>{resVal !== undefined ? resVal : '—'}</span>
                    <span className="mono-cell-idx">[{idx}]</span>
                  </motion.div>
                );
              })}
            </div>
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

  // --- Vertical Stack (LIFO) Mode ---
  if (mode === 'stack') {
    return (
      <div className="flex flex-col items-center w-full gap-4 py-3">
        <div className="flex items-center gap-4">
          <div className="stack-vertical-tube">
            <AnimatePresence>
              {items.map((val, idx) => {
                const isTop = idx === items.length - 1;
                return (
                  <motion.div
                    key={`stk-${val}-${idx}`}
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -30, opacity: 0 }}
                    className={`stack-item-card ${isTop ? 'top-item' : ''}`}
                  >
                    <span>{val}</span>
                    {isTop && <span className="text-[10px] text-accent-brand font-bold ml-1.5">★ (TOP)</span>}
                  </motion.div>
                );
              })}
            </AnimatePresence>
            {items.length === 0 && <span className="text-xs text-text-muted font-mono py-12">Stack Empty</span>}
          </div>

          <div className="flex flex-col gap-2 text-xs font-mono text-text-muted">
            <div>• <strong className="text-accent-brand">LIFO:</strong> Last-In First-Out</div>
            <div>• <strong className="text-slate-200">Push / Pop:</strong> O(1) at Top</div>
            <div>• <strong className="text-slate-200">Size:</strong> {items.length} items</div>
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

  // --- Horizontal Queue (FIFO) Mode ---
  return (
    <div className="flex flex-col items-center w-full gap-4 py-4">
      <div className="flex items-center gap-3 flex-wrap justify-center">
        <span className="px-2.5 py-1 rounded bg-amber-950/40 border border-accent-brand/40 text-accent-brand font-mono text-xs font-bold">
          FRONT [📤 Dequeue] ➔
        </span>

        <div className="queue-horizontal-pipe">
          <AnimatePresence>
            {items.map((val, idx) => {
              const isFront = idx === 0;
              const isRear = idx === items.length - 1;

              return (
                <motion.div
                  key={`q-${val}-${idx}`}
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -30, opacity: 0 }}
                  className={`queue-item-card ${isFront ? 'front-item' : isRear ? 'rear-item' : ''}`}
                >
                  <span>{val}</span>
                  <span className="text-[9px] text-text-muted/60 pl-1 font-normal">[{idx}]</span>
                </motion.div>
              );
            })}
          </AnimatePresence>
          {items.length === 0 && <span className="text-xs text-text-muted font-mono px-6">Queue Empty</span>}
        </div>

        <span className="px-2.5 py-1 rounded bg-cyan-950/40 border border-accent-cyan/40 text-accent-cyan font-mono text-xs font-bold">
          ➔ [📥 Enqueue] REAR
        </span>
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
