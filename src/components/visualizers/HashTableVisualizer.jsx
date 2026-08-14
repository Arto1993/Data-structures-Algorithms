import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Search, Trash2, Key } from 'lucide-react';

export default function HashTableVisualizer({
  mode = 'chaining', // 'chaining' | 'twoSum' | 'anagrams'
  buckets = [],
  activeKey = null,
  activeHash = null,
  // Two Sum props
  nums = [],
  target = 9,
  currentIdx = null,
  complement = null,
  matchIndices = [],
  twoSumMap = {},
  // Group Anagrams props
  words = [],
  activeWord = null,
  anagramGroups = {},
  message = ''
}) {
  // --- 1. Two Sum Mode ---
  if (mode === 'twoSum') {
    return (
      <div className="two-sum-stage">
        {/* Top Input Array */}
        <div className="mono-panel-card">
          <div className="mono-panel-header">
            <span>INPUT ARRAY & POINTER</span>
            <span>Target Sum = <strong className="text-accent-brand">{target}</strong></span>
          </div>

          <div className="mono-cells-row">
            {nums.map((val, idx) => {
              const isCurrent = idx === currentIdx;
              const isMatched = matchIndices && matchIndices.includes(idx);

              return (
                <motion.div
                  key={`ts-num-${idx}`}
                  layout
                  className={`mono-cell ${isMatched ? 'resolved' : isCurrent ? 'active-scan' : ''}`}
                >
                  <span className="text-base">{val}</span>
                  <span className="mono-cell-idx">[{idx}]</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Calculation HUD */}
        <div className="two-sum-calc-card">
          <div className="two-sum-step-box">
            <span className="two-sum-step-title">TARGET</span>
            <span className="two-sum-step-val text-accent-brand">{target}</span>
          </div>
          <span className="text-text-muted font-bold text-lg">−</span>
          <div className="two-sum-step-box">
            <span className="two-sum-step-title">CURRENT NUM</span>
            <span className="two-sum-step-val text-slate-100">{currentIdx !== null ? nums[currentIdx] : '—'}</span>
          </div>
          <span className="text-text-muted font-bold text-lg">=</span>
          <div className="two-sum-step-box border-cyan-500/30">
            <span className="two-sum-step-title text-accent-cyan">NEEDED COMPLEMENT</span>
            <span className="two-sum-step-val text-accent-cyan">{complement !== null ? complement : '—'}</span>
          </div>
        </div>

        {/* Live Hash Map Table State */}
        <div className="hash-map-table">
          <div className="hash-map-header-row">
            <span>KEY (NUM VALUE)</span>
            <span>STORED VALUE (ARRAY INDEX)</span>
          </div>

          <div className="hash-map-entries-list">
            {Object.entries(twoSumMap).map(([numKey, indexVal]) => (
              <div key={`ts-map-${numKey}`} className="hash-map-entry-row">
                <span className="text-accent-brand font-bold">{numKey}</span>
                <span className="text-slate-300">index [{indexVal}]</span>
              </div>
            ))}
            {Object.keys(twoSumMap).length === 0 && (
              <div className="text-xs text-text-muted font-mono p-4 text-center">
                Hash Map is currently empty.
              </div>
            )}
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

  // --- 2. Group Anagrams Mode ---
  if (mode === 'anagrams') {
    return (
      <div className="anagram-stage">
        {/* Input Words Ribbon */}
        <div className="mono-panel-card">
          <div className="mono-panel-header">
            <span>INPUT WORD STREAM</span>
            <span>Grouping by sorted letter signature</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            {words.map((w, idx) => {
              const isActive = w === activeWord;
              return (
                <div
                  key={`word-in-${idx}`}
                  className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-amber-950/60 border-accent-brand text-accent-brand scale-110 shadow-md'
                      : 'bg-slate-900/80 border-white/10 text-slate-200'
                  }`}
                >
                  "{w}"
                </div>
              );
            })}
          </div>
        </div>

        {/* Anagram Group Buckets Grid */}
        <div className="anagram-groups-grid">
          {Object.entries(anagramGroups).map(([sortedKey, groupList]) => (
            <motion.div
              key={`ag-grp-${sortedKey}`}
              layout
              className="anagram-group-card"
            >
              <div className="flex items-center justify-between">
                <span className="anagram-key-badge">Key: "{sortedKey}"</span>
                <span className="text-[10px] text-text-muted font-mono">{groupList.length} words</span>
              </div>

              <div className="anagram-words-wrap">
                {groupList.map((wordItem, wIdx) => (
                  <span key={`w-item-${wIdx}`} className="anagram-word-pill">
                    "{wordItem}"
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
          {Object.keys(anagramGroups).length === 0 && (
            <div className="text-xs text-text-muted font-mono p-6 text-center col-span-3">
              Click "Group Anagram Clusters" to start.
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

  // --- 3. Separate Chaining Hash Table (Default) ---
  return (
    <div className="hash-stage-wrapper">
      {/* Live Hash Calculation Formula HUD */}
      <div className="hash-formula-hud">
        <span>HASH FUNCTION: <code className="text-accent-brand">hash(key) = (∑ charCode × 31) % 8</code></span>
        {activeKey && activeHash !== null && (
          <span>Computed: <code className="text-accent-brand">hash("{activeKey}") ➔ [{activeHash}]</code></span>
        )}
      </div>

      {/* 8-Bucket Grid with Separate Chaining */}
      <div className="hash-table-grid">
        {buckets.map((bucket, idx) => {
          const isActive = idx === activeHash;

          return (
            <div
              key={`ht-b-${idx}`}
              className={`hash-bucket-row ${isActive ? 'active' : ''}`}
            >
              {/* Bucket Index Badge */}
              <div className="bucket-idx-badge">
                <span>[{idx}]</span>
              </div>

              {/* Chained Linked List of Nodes */}
              <div className="flex items-center gap-1.5 flex-wrap flex-1 py-1">
                <AnimatePresence>
                  {bucket.map((entry, itemIdx) => {
                    const isEntryActive = entry.key === activeKey;

                    return (
                      <motion.div
                        key={`entry-${entry.key}-${itemIdx}`}
                        layout
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="flex items-center gap-1"
                      >
                        <div className={`hash-chain-node ${isEntryActive ? 'active-node' : ''}`}>
                          <span className="text-slate-100">"{entry.key}"</span>
                          <span className="text-text-muted px-1">:</span>
                          <span className={isEntryActive ? 'text-accent-brand' : 'text-accent-cyan'}>{String(entry.value)}</span>
                          <span className="text-[9px] text-text-muted/60 pl-1">●➔</span>
                        </div>

                        {itemIdx < bucket.length - 1 && (
                          <ArrowRight className="w-3.5 h-3.5 text-accent-brand/60" />
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {bucket.length === 0 && (
                  <span className="text-xs text-text-muted/40 font-mono italic pl-2">NULL</span>
                )}
              </div>
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
