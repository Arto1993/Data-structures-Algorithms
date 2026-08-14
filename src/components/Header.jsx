import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ShieldAlert, Database } from 'lucide-react';

export default function Header({ moduleData }) {
  if (!moduleData) return null;

  return (
    <header className="top-bar">
      <div className="module-info">
        <div className="flex items-center gap-3">
          <motion.h1 
            key={moduleData.title}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-bold text-text-primary flex items-center gap-2.5"
          >
            {moduleData.title}
          </motion.h1>
          <span className="module-badge">
            {moduleData.category}
          </span>
        </div>
        <p className="module-desc text-text-secondary text-xs mt-1">
          {moduleData.description}
        </p>
      </div>

      <div className="complexity-cards">
        <motion.div 
          whileHover={{ y: -2 }}
          className="complexity-card"
        >
          <div className="complexity-label flex items-center justify-center gap-1">
            <Clock className="w-3 h-3 text-text-muted" />
            <span>Time (Avg)</span>
          </div>
          <div className="complexity-val text-accent-emerald">{moduleData.timeAvg}</div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -2 }}
          className="complexity-card"
        >
          <div className="complexity-label flex items-center justify-center gap-1">
            <ShieldAlert className="w-3 h-3 text-text-muted" />
            <span>Time (Worst)</span>
          </div>
          <div className="complexity-val text-accent-amber">{moduleData.timeWorst}</div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -2 }}
          className="complexity-card"
        >
          <div className="complexity-label flex items-center justify-center gap-1">
            <Database className="w-3 h-3 text-text-muted" />
            <span>Space</span>
          </div>
          <div className="complexity-val text-accent-brand">{moduleData.space}</div>
        </motion.div>
      </div>
    </header>
  );
}
