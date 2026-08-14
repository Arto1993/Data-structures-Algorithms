import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function GraphVisualizer({
  mode = 'graph', // 'graph' | 'nodegraph' | 'grid'
  grid,
  onGridCellToggle,
  start = [7, 3],
  target = [7, 21],
  openSet = [],
  closedSet = [],
  path = [],
  nodes = [],
  edges = [],
  activeNode = null,
  highlightedEdges = [],
  nodeStates = {},
  distances = null,
  visitedNodes = [],
  shortestPath = [],
  showAdjacencyList = true,
  message = ''
}) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [drawMode, setDrawMode] = useState(1);

  // --- 1. 2D Grid Pathfinder Mode (A* / BFS Grid) ---
  if (mode === 'grid') {
    if (!grid || grid.length === 0) return null;
    const rows = grid.length;
    const cols = grid[0].length;

    const openSetLookup = new Set(openSet);
    const closedSetLookup = new Set(closedSet);
    const pathLookup = new Set(path.map(([r, c]) => `${r},${c}`));

    const handleMouseDown = (r, c) => {
      if ((r === start[0] && c === start[1]) || (r === target[0] && c === target[1])) return;
      setIsMouseDown(true);
      const newMode = grid[r][c] === 1 ? 0 : 1;
      setDrawMode(newMode);
      if (onGridCellToggle) onGridCellToggle(r, c, newMode);
    };

    const handleMouseEnter = (r, c) => {
      if (!isMouseDown) return;
      if ((r === start[0] && c === start[1]) || (r === target[0] && c === target[1])) return;
      if (grid[r][c] !== drawMode && onGridCellToggle) {
        onGridCellToggle(r, c, drawMode);
      }
    };

    return (
      <div 
        className="grid-pathfinder-wrapper"
        onMouseUp={() => setIsMouseDown(false)}
        onMouseLeave={() => setIsMouseDown(false)}
      >
        <div className="grid-legend">
          <span className="legend-item"><span className="legend-box start-box"></span> Start (🚀)</span>
          <span className="legend-item"><span className="legend-box target-box"></span> Target (🎯)</span>
          <span className="legend-item"><span className="legend-box wall-box"></span> Wall</span>
          <span className="legend-item"><span className="legend-box open-box"></span> Open Set</span>
          <span className="legend-item"><span className="legend-box closed-box"></span> Closed Set</span>
          <span className="legend-item"><span className="legend-box path-box"></span> Shortest Path</span>
        </div>

        <div 
          className="path-grid" 
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}
        >
          {grid.map((row, r) => 
            row.map((val, c) => {
              const key = `${r},${c}`;
              const isStart = r === start[0] && c === start[1];
              const isTarget = r === target[0] && c === target[1];
              const isWall = val === 1;
              const isPath = pathLookup.has(key) && !isStart && !isTarget;
              const isOpen = openSetLookup.has(key) && !isStart && !isTarget && !isPath;
              const isClosed = closedSetLookup.has(key) && !isStart && !isTarget && !isPath;

              let cellClass = 'grid-cell';
              let content = '';

              if (isStart) {
                cellClass += ' cell-start';
                content = '🚀';
              } else if (isTarget) {
                cellClass += ' cell-target';
                content = '🎯';
              } else if (isWall) {
                cellClass += ' cell-wall';
              } else if (isPath) {
                cellClass += ' cell-path';
                content = '•';
              } else if (isOpen) {
                cellClass += ' cell-open';
              } else if (isClosed) {
                cellClass += ' cell-closed';
              }

              return (
                <div
                  key={key}
                  onMouseDown={() => handleMouseDown(r, c)}
                  onMouseEnter={() => handleMouseEnter(r, c)}
                  className={cellClass}
                >
                  {content}
                </div>
              );
            })
          )}
        </div>

        <div className="grid-instruction-tip">
          💡 Click and drag on the grid to draw / erase walls in real time.
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

  // --- 2. Node-Link Graph Mode with Side-by-Side Adjacency List ---
  const width = showAdjacencyList ? 480 : 640;
  const height = 340;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = showAdjacencyList ? 110 : 130;

  // Extract raw node IDs
  const nodeList = nodes.map(n => (typeof n === 'object' ? n.id : n));
  const visitedSet = new Set(visitedNodes);
  const pathSet = new Set(shortestPath);

  // Compute node coordinates
  const nodeCoords = {};
  nodes.forEach((node, i) => {
    if (typeof node === 'object' && node.x !== undefined && node.y !== undefined) {
      const scaleX = showAdjacencyList ? (node.x / 640) * width : node.x;
      const scaleY = showAdjacencyList ? (node.y / 340) * height : node.y;
      nodeCoords[node.id] = { 
        x: Math.max(40, Math.min(width - 40, scaleX)), 
        y: Math.max(40, Math.min(height - 40, scaleY)) 
      };
    } else {
      const id = typeof node === 'object' ? node.id : node;
      const angle = (2 * Math.PI * i) / nodes.length - Math.PI / 2;
      nodeCoords[id] = {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      };
    }
  });

  // Build Adjacency List
  const adjacencyList = {};
  nodeList.forEach(id => { adjacencyList[id] = []; });
  edges.forEach(edge => {
    const u = edge.u !== undefined ? edge.u : edge.from;
    const v = edge.v !== undefined ? edge.v : edge.to;
    const w = edge.weight !== undefined ? edge.weight : null;
    if (adjacencyList[u]) {
      if (!adjacencyList[u].some(e => e.target === v)) {
        adjacencyList[u].push({ target: v, weight: w });
      }
    }
    if (!edge.directed && adjacencyList[v]) {
      if (!adjacencyList[v].some(e => e.target === u)) {
        adjacencyList[v].push({ target: u, weight: w });
      }
    }
  });

  const lastPathNode = shortestPath && shortestPath.length > 0 ? shortestPath[shortestPath.length - 1] : null;
  const totalShortestDist = lastPathNode && distances ? distances[lastPathNode] : null;

  return (
    <div className="graph-canvas-wrapper flex flex-col items-center w-full gap-3">
      {/* Top Shortest Path Found Banner */}
      {shortestPath && shortestPath.length > 1 && (
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="shortest-path-banner"
        >
          <div className="flex items-center gap-2">
            <span className="text-base">🎯</span>
            <span className="text-xs font-mono font-bold text-accent-emerald">SHORTEST PATH FOUND:</span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            {shortestPath.map((nodeId, idx) => (
              <React.Fragment key={`sp-${nodeId}-${idx}`}>
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-950/90 border border-emerald-400 text-emerald-300 font-mono font-bold text-xs shadow-md">
                  {nodeId}
                </span>
                {idx < shortestPath.length - 1 && (
                  <span className="text-emerald-400 font-extrabold text-xs">➔</span>
                )}
              </React.Fragment>
            ))}
          </div>
          {totalShortestDist !== null && totalShortestDist !== undefined && totalShortestDist !== Infinity && (
            <span className="text-xs font-mono text-slate-300">
              Total Distance = <strong className="text-emerald-300 font-bold">{totalShortestDist}</strong>
            </span>
          )}
        </motion.div>
      )}

      {/* Live Distance / Cost HUD */}
      {distances && Object.keys(distances).length > 0 && (
        <div className="flex items-center gap-2 flex-wrap justify-center px-4 py-1.5 bg-slate-900/80 border border-white/10 rounded-lg text-xs font-mono">
          <span className="text-text-muted font-sans font-semibold text-[11px] mr-1">DISTANCES:</span>
          {nodeList.map(id => {
            const d = distances[id];
            const isVisited = visitedSet.has(id);
            const isActive = activeNode === id;
            const isPath = pathSet.has(id);

            let badgeStyle = 'text-text-muted bg-white/5 border-white/10';
            if (isPath) badgeStyle = 'text-accent-emerald bg-emerald-950/50 border-emerald-500 font-bold';
            else if (isActive) badgeStyle = 'text-accent-brand bg-yellow-950/50 border-accent-brand font-bold';
            else if (isVisited) badgeStyle = 'text-accent-cyan bg-cyan-950/40 border-cyan-500/40';

            return (
              <span key={`dist-tab-${id}`} className={`px-2 py-0.5 rounded border text-[11px] ${badgeStyle}`}>
                {id}: {d === Infinity || d === undefined ? '∞' : d}
              </span>
            );
          })}
        </div>
      )}

      {/* Main Dual Grid: SVG Network + Adjacency List Structure Table */}
      <div className="graph-dual-layout w-full">
        {/* Left: SVG Network */}
        <div className="graph-svg-box">
          <div className="graph-box-header">
            <span>NETWORK TOPOLOGY VIEW</span>
            <span className="text-[10px] text-text-muted">|V|={nodeList.length}, |E|={edges.length}</span>
          </div>

          <svg viewBox={`0 0 ${width} ${height}`} className="graph-svg select-none">
            <defs>
              <marker
                id="arrow-marker"
                viewBox="0 0 10 10"
                refX="24"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748b" />
              </marker>
              <marker
                id="arrow-marker-active"
                viewBox="0 0 10 10"
                refX="24"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#FBE103" />
              </marker>
              <marker
                id="arrow-marker-path"
                viewBox="0 0 10 10"
                refX="24"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
              </marker>
            </defs>

            {/* Edges */}
            {edges.map((edge, idx) => {
              const u = edge.u !== undefined ? edge.u : edge.from;
              const v = edge.v !== undefined ? edge.v : edge.to;
              const w = edge.weight !== undefined ? edge.weight : '';
              const c1 = nodeCoords[u];
              const c2 = nodeCoords[v];
              if (!c1 || !c2) return null;

              const isHighlighted = highlightedEdges.some(e => 
                ((e.u === u || e.from === u) && (e.v === v || e.to === v)) ||
                (!edge.directed && (e.u === v || e.from === v) && (e.v === u || e.to === u))
              );

              let isShortestPathEdge = false;
              if (shortestPath && shortestPath.length > 1) {
                for (let i = 0; i < shortestPath.length - 1; i++) {
                  if (
                    (shortestPath[i] === u && shortestPath[i + 1] === v) ||
                    (!edge.directed && shortestPath[i] === v && shortestPath[i + 1] === u)
                  ) {
                    isShortestPathEdge = true;
                    break;
                  }
                }
              }

              const midX = (c1.x + c2.x) / 2;
              const midY = (c1.y + c2.y) / 2;

              let edgeClass = 'graph-edge';
              let marker = edge.directed ? 'url(#arrow-marker)' : undefined;

              if (isShortestPathEdge) {
                edgeClass += ' edge-shortest-path';
                if (edge.directed) marker = 'url(#arrow-marker-path)';
              } else if (isHighlighted) {
                edgeClass += ' edge-active';
                if (edge.directed) marker = 'url(#arrow-marker-active)';
              }

              return (
                <g key={`edge-${idx}-${u}-${v}`}>
                  <line 
                    x1={c1.x} y1={c1.y} 
                    x2={c2.x} y2={c2.y} 
                    className={edgeClass} 
                    markerEnd={marker}
                  />
                  {w !== '' && (
                    <g transform={`translate(${midX}, ${midY})`}>
                      <rect 
                        x="-10" y="-10" 
                        width="20" height="15" 
                        rx="4" 
                        fill="#090d16" 
                        stroke={isShortestPathEdge ? '#10b981' : isHighlighted ? '#FBE103' : 'rgba(255,255,255,0.15)'} 
                        strokeWidth="1"
                      />
                      <text 
                        y="0" 
                        className={`edge-weight-label ${isShortestPathEdge ? 'fill-emerald-400 font-bold' : ''}`} 
                        textAnchor="middle"
                        dy="1"
                      >
                        {w}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {nodeList.map(id => {
              const coords = nodeCoords[id];
              if (!coords) return null;
              const isActive = activeNode === id;
              const isVisited = visitedSet.has(id);
              const isPath = pathSet.has(id);
              const state = nodeStates[id];
              const distVal = distances ? distances[id] : null;

              let circleFill = '#131b2e';
              let circleStroke = '#38bdf8';
              let strokeWidth = '2';

              if (isPath) {
                circleFill = '#064e3b';
                circleStroke = '#10b981';
                strokeWidth = '3.5';
              } else if (isActive) {
                circleFill = '#78350f';
                circleStroke = '#FBE103';
                strokeWidth = '3';
              } else if (isVisited || state === 2) {
                circleFill = '#0f172a';
                circleStroke = '#0ea5e9';
              } else if (state === 1) {
                circleFill = '#1e1b4b';
                circleStroke = '#6366f1';
              }

              return (
                <motion.g 
                  key={`graph-node-${id}`} 
                  transform={`translate(${coords.x}, ${coords.y})`}
                  whileHover={{ scale: 1.15 }}
                >
                  <circle 
                    r="20" 
                    fill={circleFill} 
                    stroke={circleStroke} 
                    strokeWidth={strokeWidth}
                    className={`transition-colors duration-200 shadow-md ${isPath ? 'pulse-node' : ''}`} 
                  />
                  <text 
                    fill={isPath ? '#a7f3d0' : '#f8fafc'} 
                    fontFamily="Inter, sans-serif" 
                    fontWeight="700" 
                    fontSize="12.5" 
                    textAnchor="middle" 
                    dy="4"
                  >
                    {id}
                  </text>

                  {/* Distance Pill Badge */}
                  {distVal !== null && (
                    <g transform="translate(0, -26)">
                      <rect 
                        x="-17" y="-8" 
                        width="34" height="15" 
                        rx="4" 
                        fill="#0b0f19" 
                        stroke={isPath ? '#10b981' : isActive ? '#FBE103' : 'rgba(255,255,255,0.2)'} 
                        strokeWidth={isPath ? '1.5' : '1'}
                      />
                      <text 
                        fill={distVal === Infinity ? '#94a3b8' : isPath ? '#34d399' : '#FBE103'} 
                        fontSize="8.5" 
                        fontFamily="JetBrains Mono, monospace" 
                        fontWeight="700" 
                        textAnchor="middle" 
                        dy="3"
                      >
                        {distVal === Infinity ? '∞' : `d:${distVal}`}
                      </text>
                    </g>
                  )}
                </motion.g>
              );
            })}
          </svg>
        </div>

        {/* Right: Adjacency List Structure Table */}
        {showAdjacencyList && (
          <div className="graph-adj-card">
            <div className="graph-box-header">
              <span>ADJACENCY LIST STRUCTURE</span>
              <span className="text-[10px] text-accent-cyan">O(V + E) Storage</span>
            </div>

            <div className="adj-list-rows custom-scrollbar">
              {nodeList.map(nodeId => {
                const neighbors = adjacencyList[nodeId] || [];
                const isActive = activeNode === nodeId;
                const isVisited = visitedSet.has(nodeId);
                const isPath = pathSet.has(nodeId);

                return (
                  <div 
                    key={`adj-row-${nodeId}`}
                    className={`adj-row ${isPath ? 'path-row' : isActive ? 'active-row' : isVisited ? 'visited-row' : ''}`}
                  >
                    {/* Node Vertex Key */}
                    <div className={`adj-vertex-badge ${isPath ? 'bg-emerald-950 border-emerald-400 text-emerald-300' : ''}`}>
                      <span>{nodeId}</span>
                    </div>
                    <span className="adj-arrow">➔</span>

                    {/* Neighbors Array */}
                    <div className="adj-neighbors-list">
                      {neighbors.map((nbr, idx) => (
                        <span 
                          key={`nbr-${nodeId}-${nbr.target}-${idx}`} 
                          className="adj-neighbor-pill"
                        >
                          <strong className="text-slate-100">{nbr.target}</strong>
                          {nbr.weight !== null && <span className="text-[9px] text-accent-brand/80">({nbr.weight})</span>}
                        </span>
                      ))}
                      {neighbors.length === 0 && (
                        <span className="text-[11px] text-text-muted italic">Ø (No outgoing edges)</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
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
