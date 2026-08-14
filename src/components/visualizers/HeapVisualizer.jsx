import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeapVisualizer({
  heap = [],
  isMinHeap = true,
  activeIndices = [],
  swappingIndices = [],
  message = ''
}) {
  const n = heap.length;
  const maxVal = Math.max(...heap, 1);

  // Compute complete binary tree coordinates
  const width = 640;
  const height = 240;

  // Level-based coordinate assignment
  const getNodeCoordinates = (index) => {
    if (index >= n) return null;
    const level = Math.floor(Math.log2(index + 1));
    const levelStart = Math.pow(2, level) - 1;
    const posInLevel = index - levelStart;
    const totalInLevel = Math.pow(2, level);

    const levelY = 35 + level * 55;
    const spacing = width / (totalInLevel + 1);
    const levelX = spacing * (posInLevel + 1);

    return { x: levelX, y: levelY, level };
  };

  const nodesWithCoords = heap.map((val, idx) => {
    const coords = getNodeCoordinates(idx);
    return {
      index: idx,
      value: val,
      ...coords
    };
  });

  // Edges between parent and children
  const edges = [];
  for (let i = 0; i < n; i++) {
    const leftChild = 2 * i + 1;
    const rightChild = 2 * i + 2;

    const parentCoords = getNodeCoordinates(i);
    if (leftChild < n) {
      const leftCoords = getNodeCoordinates(leftChild);
      edges.push({
        from: i,
        to: leftChild,
        x1: parentCoords.x,
        y1: parentCoords.y,
        x2: leftCoords.x,
        y2: leftCoords.y
      });
    }
    if (rightChild < n) {
      const rightCoords = getNodeCoordinates(rightChild);
      edges.push({
        from: i,
        to: rightChild,
        x1: parentCoords.x,
        y1: parentCoords.y,
        x2: rightCoords.x,
        y2: rightCoords.y
      });
    }
  }

  return (
    <div className="heap-visualizer-wrapper flex flex-col items-center w-full gap-4">
      {/* Top Heap Invariant HUD */}
      <div className="heap-hud-bar">
        <div className="flex items-center gap-3">
          <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold ${
            isMinHeap 
              ? 'bg-emerald-950/70 border border-emerald-500/40 text-accent-emerald' 
              : 'bg-amber-950/70 border border-amber-500/40 text-accent-brand'
          }`}>
            {isMinHeap ? '★ MIN-HEAP (Parent ≤ Children)' : '★ MAX-HEAP (Parent ≥ Children)'}
          </span>
          <span className="text-xs font-mono text-text-muted">
            Root: <strong className="text-slate-100">{heap.length > 0 ? heap[0] : 'None'}</strong> | Size: <strong className="text-accent-cyan">{n}</strong>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-2 text-[11px] font-mono text-text-muted">
          <span>Parent: <code>⌊(i-1)/2⌋</code></span>
          <span>•</span>
          <span>Left: <code>2i+1</code></span>
          <span>•</span>
          <span>Right: <code>2i+2</code></span>
        </div>
      </div>

      {/* Synchronized Dual Visualization: 1. Complete Binary Tree + 2. Contiguous 1D Array */}
      <div className="heap-dual-container w-full">
        {/* Visual 1: Complete Binary Tree SVG */}
        <div className="heap-tree-card">
          <div className="heap-card-title">
            <span>HIERARCHICAL TREE VIEW</span>
            <span className="text-[10px] text-text-muted">Complete Binary Tree</span>
          </div>

          <svg viewBox={`0 0 ${width} ${height}`} className="heap-svg select-none">
            {/* Tree Branch Edges */}
            {edges.map((edge, idx) => (
              <line
                key={`hedge-${edge.from}-${edge.to}`}
                x1={edge.x1}
                y1={edge.y1}
                x2={edge.x2}
                y2={edge.y2}
                className="tree-edge"
                strokeWidth="2"
              />
            ))}

            {/* Tree Nodes */}
            <AnimatePresence>
              {nodesWithCoords.map((node) => {
                const isActive = activeIndices.includes(node.index);
                const isSwapping = swappingIndices.includes(node.index);
                const isRoot = node.index === 0;

                return (
                  <motion.g
                    key={`hnode-${node.index}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1, x: node.x, y: node.y }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    className="heap-node-group"
                  >
                    <circle
                      r="18"
                      className={`heap-node-circle ${
                        isSwapping
                          ? 'fill-rose-600 stroke-rose-300 pulse-node'
                          : isActive
                          ? 'fill-amber-500 stroke-amber-300 pulse-node'
                          : isRoot
                          ? 'fill-emerald-600 stroke-emerald-300'
                          : 'fill-slate-800 stroke-cyan-500/50'
                      }`}
                    />
                    <text className="heap-node-val font-mono font-bold text-xs" dy="4">
                      {node.value}
                    </text>
                    <text className="heap-node-idx-sub font-mono text-[9px] fill-slate-400" dy="28">
                      [{node.index}]
                    </text>
                  </motion.g>
                );
              })}
            </AnimatePresence>

            {heap.length === 0 && (
              <text x={width / 2} y={height / 2} textAnchor="middle" fill="#64748b" fontSize="13" fontFamily="monospace">
                Heap is Empty
              </text>
            )}
          </svg>
        </div>

        {/* Visual 2: 1D Contiguous Array Memory Buffer */}
        <div className="heap-array-card">
          <div className="heap-card-title">
            <span>1D CONTIGUOUS ARRAY STORAGE</span>
            <span className="text-[10px] text-text-muted">Zero-Pointer Representation</span>
          </div>

          <div className="heap-cells-wrap custom-scrollbar">
            <AnimatePresence>
              {heap.map((val, idx) => {
                const isActive = activeIndices.includes(idx);
                const isSwapping = swappingIndices.includes(idx);
                const isRoot = idx === 0;

                return (
                  <motion.div
                    key={`harr-${idx}-${val}`}
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className={`heap-array-cell ${
                      isSwapping
                        ? 'swapping'
                        : isActive
                        ? 'active'
                        : isRoot
                        ? 'root-cell'
                        : ''
                    }`}
                  >
                    {isRoot && <span className="cell-root-tag">ROOT</span>}
                    <span className="cell-num">{val}</span>
                    <span className="cell-idx">[{idx}]</span>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {heap.length === 0 && (
              <span className="text-xs text-text-muted font-mono p-4">Array Buffer Empty</span>
            )}
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
