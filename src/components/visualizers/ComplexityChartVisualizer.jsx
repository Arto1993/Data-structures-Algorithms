import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ComplexityChartVisualizer({
  sliderN = 16,
  onSliderChange = null,
  message = ''
}) {
  const [internalN, setInternalN] = useState(16);
  const n = onSliderChange ? sliderN : internalN;
  const setN = onSliderChange || setInternalN;

  // Exact math values
  const vO1 = 1;
  const vLogN = Number(Math.log2(Math.max(1, n)).toFixed(2));
  const vN = n;
  const vNLogN = Number((n * Math.log2(Math.max(1, n))).toFixed(1));
  const vN2 = n * n;
  const v2N = n <= 24 ? Math.pow(2, n) : '16,777,216+';

  // SVG Curves Generation (Coordinates: X: [0..32] -> [40..560], Y: [0..250] -> [200..20])
  const svgWidth = 600;
  const svgHeight = 220;
  const padding = { left: 45, right: 30, top: 20, bottom: 30 };
  const plotWidth = svgWidth - padding.left - padding.right;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  const maxPlotN = 32;
  const maxPlotY = 160;

  const toX = (valN) => padding.left + (valN / maxPlotN) * plotWidth;
  const toY = (valY) => padding.top + plotHeight - Math.min(plotHeight, (valY / maxPlotY) * plotHeight);

  // Generate curve path points
  const pointsO1 = [];
  const pointsLogN = [];
  const pointsN = [];
  const pointsNLogN = [];
  const pointsN2 = [];
  const points2N = [];

  for (let x = 1; x <= maxPlotN; x += 0.5) {
    pointsO1.push(`${toX(x)},${toY(1)}`);
    pointsLogN.push(`${toX(x)},${toY(Math.log2(x) * 8)}`);
    pointsN.push(`${toX(x)},${toY(x * 2.5)}`);
    pointsNLogN.push(`${toX(x)},${toY(x * Math.log2(x) * 1.0)}`);
    pointsN2.push(`${toX(x)},${toY((x * x) / 5.5)}`);
    if (x <= 8) {
      points2N.push(`${toX(x)},${toY(Math.pow(2, x) / 1.6)}`);
    }
  }

  const cursorX = toX(Math.min(maxPlotN, n));

  return (
    <div className="complexity-chart-wrapper">
      {/* Top Controls: Slider & Quick Presets */}
      <div className="complexity-controls-strip">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-text-secondary">INPUT SIZE N:</span>
          <input
            type="range"
            min="1"
            max="32"
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            className="step-timeline-slider w-44"
          />
          <span className="px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-accent-brand font-mono font-bold text-xs">
            N = {n}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {[4, 8, 16, 24, 32].map(presetN => (
            <button
              key={`preset-${presetN}`}
              onClick={() => setN(presetN)}
              className={`preset-pill ${n === presetN ? 'active' : ''}`}
            >
              N={presetN}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Coordinate Chart */}
      <div className="complexity-svg-container">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="complexity-svg-plot">
          {/* Grid lines */}
          <line x1={padding.left} y1={padding.top + plotHeight} x2={svgWidth - padding.right} y2={padding.top + plotHeight} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <line x1={padding.left} y1={padding.top} x2={padding.left} y2={padding.top + plotHeight} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

          {/* Y Axis Labels */}
          <text x={padding.left - 8} y={padding.top + 10} fill="#94a3b8" fontSize="9" textAnchor="end" fontFamily="monospace">Ops</text>
          <text x={padding.left - 8} y={padding.top + plotHeight} fill="#94a3b8" fontSize="9" textAnchor="end" fontFamily="monospace">0</text>

          {/* X Axis Labels */}
          <text x={svgWidth - padding.right} y={padding.top + plotHeight + 18} fill="#94a3b8" fontSize="9" textAnchor="end" fontFamily="monospace">N (Input Size) ➔</text>
          <text x={padding.left} y={padding.top + plotHeight + 16} fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">1</text>
          <text x={toX(16)} y={padding.top + plotHeight + 16} fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">16</text>
          <text x={toX(32)} y={padding.top + plotHeight + 16} fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">32</text>

          {/* Growth Rate Curves */}
          <path d={`M ${pointsO1.join(' L ')}`} fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="4 2" />
          <path d={`M ${pointsLogN.join(' L ')}`} fill="none" stroke="#06b6d4" strokeWidth="2.5" />
          <path d={`M ${pointsN.join(' L ')}`} fill="none" stroke="#fbe103" strokeWidth="2.5" />
          <path d={`M ${pointsNLogN.join(' L ')}`} fill="none" stroke="#f59e0b" strokeWidth="2.5" />
          <path d={`M ${pointsN2.join(' L ')}`} fill="none" stroke="#f43f5e" strokeWidth="2.5" />
          <path d={`M ${points2N.join(' L ')}`} fill="none" stroke="#a855f7" strokeWidth="2.5" />

          {/* Active Scanning Indicator Line at N */}
          <line x1={cursorX} y1={padding.top} x2={cursorX} y2={padding.top + plotHeight} stroke="#fbe103" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
          <circle cx={cursorX} cy={padding.top + plotHeight} r="4" fill="#fbe103" />

          {/* Legend Chips in Graph */}
          <g transform={`translate(${padding.left + 15}, ${padding.top + 8})`} fontSize="9" fontFamily="monospace">
            <circle cx="0" cy="0" r="3" fill="#10b981" />
            <text x="6" y="3" fill="#10b981">O(1)</text>

            <circle cx="45" cy="0" r="3" fill="#06b6d4" />
            <text x="51" y="3" fill="#06b6d4">O(log N)</text>

            <circle cx="110" cy="0" r="3" fill="#fbe103" />
            <text x="116" y="3" fill="#fbe103">O(N)</text>

            <circle cx="160" cy="0" r="3" fill="#f59e0b" />
            <text x="166" y="3" fill="#f59e0b">O(N log N)</text>

            <circle cx="230" cy="0" r="3" fill="#f43f5e" />
            <text x="236" y="3" fill="#f43f5e">O(N²)</text>

            <circle cx="280" cy="0" r="3" fill="#a855f7" />
            <text x="286" y="3" fill="#a855f7">O(2ᴺ)</text>
          </g>
        </svg>
      </div>

      {/* 6 Structured Stat Cards Grid */}
      <div className="complexity-cards-grid">
        <div className="complexity-card border-emerald-500/30">
          <div className="card-top">
            <span className="card-badge bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">O(1)</span>
            <span className="card-type">Constant</span>
          </div>
          <span className="card-val text-emerald-400">{vO1}</span>
          <span className="card-sub">Instant Access</span>
        </div>

        <div className="complexity-card border-cyan-500/30">
          <div className="card-top">
            <span className="card-badge bg-cyan-950/60 text-cyan-400 border border-cyan-500/30">O(log₂ N)</span>
            <span className="card-type">Logarithmic</span>
          </div>
          <span className="card-val text-cyan-400">{vLogN}</span>
          <span className="card-sub">Binary Search</span>
        </div>

        <div className="complexity-card border-yellow-500/30">
          <div className="card-top">
            <span className="card-badge bg-yellow-950/60 text-accent-brand border border-yellow-500/30">O(N)</span>
            <span className="card-type">Linear</span>
          </div>
          <span className="card-val text-accent-brand">{vN}</span>
          <span className="card-sub">Single Scan</span>
        </div>

        <div className="complexity-card border-amber-500/30">
          <div className="card-top">
            <span className="card-badge bg-amber-950/60 text-amber-400 border border-amber-500/30">O(N log₂ N)</span>
            <span className="card-type">Linearithmic</span>
          </div>
          <span className="card-val text-amber-400">{vNLogN}</span>
          <span className="card-sub">Merge / QuickSort</span>
        </div>

        <div className="complexity-card border-rose-500/30">
          <div className="card-top">
            <span className="card-badge bg-rose-950/60 text-rose-400 border border-rose-500/30">O(N²)</span>
            <span className="card-type">Quadratic</span>
          </div>
          <span className="card-val text-rose-400">{vN2}</span>
          <span className="card-sub">Nested Loops</span>
        </div>

        <div className="complexity-card border-purple-500/30">
          <div className="card-top">
            <span className="card-badge bg-purple-950/60 text-purple-400 border border-purple-500/30">O(2ᴺ)</span>
            <span className="card-type">Exponential</span>
          </div>
          <span className="card-val text-purple-400">{v2N}</span>
          <span className="card-sub">Power Set / Brute</span>
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
