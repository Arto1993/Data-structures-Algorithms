import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Database, CheckCircle2 } from 'lucide-react';
import { calculateLiveComplexity } from '../utils/complexityCalculator';

export default function BigOMetricsBadge({
  moduleId,
  stepIndex = 0,
  totalSteps = 0,
  currentStep = null,
  customParams = {}
}) {
  const metrics = calculateLiveComplexity({
    moduleId,
    stepIndex,
    totalSteps,
    currentStep,
    customParams
  });

  return (
    <div className="big-o-minimal-bar">
      {/* Left: Formula Badge & Equation */}
      <div className="big-o-left">
        <span className="big-o-pill">{metrics.formula}</span>
        <span className="big-o-equation">{metrics.equation}</span>
      </div>

      {/* Center: Live Step Metric & Mini Progress */}
      <div className="big-o-center">
        <span className="big-o-step-count">
          <Zap className="w-3 h-3 text-accent-brand" />
          <span>{metrics.liveOps}</span>
        </span>
        {totalSteps > 1 && (
          <div className="big-o-mini-track" title={`Bound progress: ${metrics.progressPercent}%`}>
            <motion.div 
              className="big-o-mini-fill" 
              animate={{ width: `${metrics.progressPercent}%` }}
              transition={{ duration: 0.15 }}
            />
          </div>
        )}
      </div>

      {/* Right: Space & Operational Invariant */}
      <div className="big-o-right">
        <span className="big-o-status-tag">
          <CheckCircle2 className="w-3 h-3 text-accent-emerald" />
          <span>{metrics.statusBadge}</span>
        </span>
        <span className="big-o-space-pill" title="Auxiliary Space Complexity">
          <Database className="w-2.5 h-2.5 text-accent-cyan" />
          <span>{metrics.spaceBound}</span>
        </span>
      </div>
    </div>
  );
}
