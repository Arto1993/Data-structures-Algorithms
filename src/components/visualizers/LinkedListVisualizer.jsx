import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, ArrowDown } from 'lucide-react';

export default function LinkedListVisualizer({
  nodes = [],
  activePointers = {}, // e.g. { 0: ['Head', 'Slow'], 2: ['Curr'], 4: ['Fast', 'Tail'] }
  highlightedIndices = [],
  isDoubly = false,
  message = ''
}) {
  return (
    <div className="linked-list-stage">
      {/* Visual Connected Node Chain */}
      <div className="ll-nodes-chain">
        <AnimatePresence>
          {nodes.map((val, idx) => {
            const isHighlighted = highlightedIndices.includes(idx);
            const pointerList = activePointers[idx] || [];

            return (
              <motion.div
                key={`ll-node-${val}-${idx}`}
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="ll-node-wrapper"
              >
                {/* Single Node Block */}
                <div className="ll-node-col">
                  {/* Top Pointer Badge Indicators */}
                  <div className="ll-pointer-tags-row">
                    {pointerList.map((pName, pIdx) => (
                      <motion.div
                        key={`ptr-${pIdx}`}
                        initial={{ y: -4, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="ll-pointer-pill"
                      >
                        <span>{pName}</span>
                        <ArrowDown className="w-2.5 h-2.5 ml-0.5 inline-block" />
                      </motion.div>
                    ))}
                  </div>

                  {/* 2-Part or 3-Part Node Box (Val + Next/Prev Pointers) */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`ll-node-box ${isHighlighted ? 'highlighted' : ''}`}
                  >
                    {/* Prev Pointer in Doubly List */}
                    {isDoubly && (
                      <span className="text-[10px] font-mono text-accent-cyan pr-1.5 border-r border-white/10 select-none">
                        ◂●
                      </span>
                    )}

                    {/* Node Value */}
                    <div className="flex items-center gap-1.5 px-2">
                      <span className="text-base text-slate-100">{val}</span>
                      <span className="node-idx">[{idx}]</span>
                    </div>

                    {/* Next Pointer Dot */}
                    <div className="flex items-center pl-1.5 border-l border-white/10 text-accent-brand select-none text-xs font-bold">
                      ●➔
                    </div>
                  </motion.div>
                </div>

                {/* Connecting Directional Arrow */}
                {idx < nodes.length - 1 && (
                  <div className="ll-arrow-divider">
                    {isDoubly ? (
                      <div className="flex flex-col items-center">
                        <ArrowRight className="w-4 h-4 text-accent-brand" />
                        <ArrowLeft className="w-4 h-4 text-accent-cyan -mt-1" />
                      </div>
                    ) : (
                      <ArrowRight className="w-5 h-5 text-accent-brand" />
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Empty List Indicator */}
        {nodes.length === 0 && (
          <div className="text-xs text-text-muted font-mono py-8">
            Linked List is Empty (NULL)
          </div>
        )}

        {/* NULL Terminator */}
        {nodes.length > 0 && (
          <div className="flex items-center pl-2 text-rose-400 font-mono text-xs font-bold">
            ➔ <span className="px-2 py-1 ml-1 rounded bg-rose-950/40 border border-rose-500/30 text-rose-300">NULL</span>
          </div>
        )}
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
