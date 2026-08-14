import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BacktrackingVisualizer({
  mode = 'n-queens', // 'n-queens' | 'subsets' | 'word-search'
  board = [],
  currentRow = null,
  currentCol = null,
  solutionCount = 0,
  subsets = [],
  // Word search props
  word = '',
  wordPath = [],
  message = ''
}) {
  // --- 1. Word Search 2D Grid Mode ---
  if (mode === 'word-search' && board.length > 0) {
    const rows = board.length;
    const cols = board[0].length;
    const pathLookup = new Set(wordPath.map(([r, c]) => `${r},${c}`));

    return (
      <div className="flex flex-col items-center w-full gap-4 py-3 select-none">
        {/* Header HUD */}
        <div className="mono-panel-card max-w-md">
          <div className="mono-panel-header">
            <span>TARGET WORD</span>
            <span className="text-accent-brand font-bold text-sm tracking-wider">"{word}"</span>
          </div>
          <div className="flex items-center gap-1">
            {word.split('').map((char, i) => {
              const isMatched = i < wordPath.length;
              return (
                <span
                  key={`ws-ch-${i}`}
                  className={`px-2 py-0.5 rounded font-mono text-xs font-bold border ${
                    isMatched
                      ? 'bg-emerald-950/60 border-accent-emerald text-accent-emerald'
                      : 'bg-slate-900 border-white/10 text-text-muted'
                  }`}
                >
                  {char}
                </span>
              );
            })}
          </div>
        </div>

        {/* 2D Board Grid */}
        <div
          className="grid gap-1.5 p-3 bg-slate-950 border-2 border-slate-700 rounded-xl shadow-xl"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        >
          {board.map((row, r) =>
            row.map((cell, c) => {
              const inPath = pathLookup.has(`${r},${c}`);
              const isHead = wordPath.length > 0 && wordPath[wordPath.length - 1][0] === r && wordPath[wordPath.length - 1][1] === c;

              return (
                <motion.div
                  key={`ws-cell-${r}-${c}`}
                  layout
                  className={`w-12 h-12 flex flex-col items-center justify-center rounded-lg font-mono text-base font-bold border transition-all ${
                    isHead
                      ? 'bg-amber-950/60 border-accent-brand text-accent-brand scale-110 shadow-lg'
                      : inPath
                      ? 'bg-emerald-950/50 border-accent-emerald text-accent-emerald'
                      : 'bg-slate-900/80 border-white/10 text-slate-200'
                  }`}
                >
                  <span>{cell}</span>
                  <span className="text-[8px] text-text-muted font-normal">[{r},{c}]</span>
                </motion.div>
              );
            })
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

  // --- 2. N-Queens Chessboard Mode ---
  if (mode === 'n-queens' && board.length > 0) {
    const n = board.length;

    return (
      <div className="flex flex-col items-center w-full gap-4 py-3 select-none">
        <div 
          className="chessboard-grid"
          style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}
        >
          {board.map((row, r) =>
            row.map((cell, c) => {
              const isQueen = cell === 'Q';
              const isCurrent = r === currentRow && c === currentCol;
              const isDarkSquare = (r + c) % 2 === 1;

              return (
                <motion.div
                  key={`cell-${r}-${c}`}
                  className={`chess-cell ${
                    isQueen
                      ? 'queen-square'
                      : isCurrent
                      ? 'active-scan'
                      : isDarkSquare
                      ? 'dark-square'
                      : 'light-square'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {isQueen ? (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-xl"
                    >
                      👑
                    </motion.span>
                  ) : isCurrent ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-accent-cyan animate-ping" />
                  ) : (
                    <span className="text-[9px] text-text-muted/30">
                      {r},{c}
                    </span>
                  )}
                </motion.div>
              );
            })
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

  // --- 3. Subsets / Combinations Tree Output Mode ---
  return (
    <div className="flex flex-col items-center w-full gap-4 py-4">
      <div className="flex items-center gap-2 flex-wrap justify-center max-w-2xl">
        <AnimatePresence>
          {subsets.map((set, idx) => (
            <motion.div
              key={`subset-${idx}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-accent-brand/40 text-accent-brand font-mono text-xs font-bold shadow"
            >
              [{set.join(', ')}]
            </motion.div>
          ))}
        </AnimatePresence>
        {subsets.length === 0 && (
          <span className="text-xs text-text-muted font-mono py-8">Click "Generate 2ᴺ Power Set"</span>
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
