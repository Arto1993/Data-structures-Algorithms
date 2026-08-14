import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, PlayCircle, Code2, Gauge } from 'lucide-react';

export default function ControlsBar({
  children,
  isPlaying = false,
  stepIndex = 0,
  totalSteps = 0,
  onPlayPause,
  onStepForward,
  onStepBack,
  onReset,
  onSeek,
  speed = 600,
  onSpeedChange,
  viewMode = 'visualizer',
  onToggleViewMode
}) {
  const isSlow = speed <= 300;
  const isNormal = speed > 300 && speed <= 800;
  const isFast = speed > 800;

  const hasSteps = totalSteps > 0;

  return (
    <section className="control-bar">
      {/* Left: Mode Switcher & Module Actions */}
      <div className="flex items-center gap-3 flex-wrap">
        {onToggleViewMode && (
          <div className="view-mode-segmented">
            <button
              onClick={() => onToggleViewMode('visualizer')}
              className={`segmented-btn ${viewMode === 'visualizer' ? 'active' : ''}`}
              title="Interactive Visualizer Studio"
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Visualizer</span>
            </button>
            <button
              onClick={() => onToggleViewMode('code-editor')}
              className={`segmented-btn ${viewMode === 'code-editor' ? 'active' : ''}`}
              title="IDE Code Editor & Invariants"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Code Studio</span>
            </button>
          </div>
        )}

        <div className="action-controls-group">
          {children}
        </div>
      </div>

      {/* Right: Universal Playback Scrubber, Step Navigation & Speed Controls */}
      <div className="playback-controls-wrapper">
        {/* Step Scrubber */}
        <div className="step-scrubber-group">
          <span className="step-index-label">
            {hasSteps ? (
              <>Step <strong className="text-accent-brand">{stepIndex + 1}</strong> / {totalSteps}</>
            ) : (
              <span className="text-text-muted">Ready</span>
            )}
          </span>
          <input
            type="range"
            min="0"
            max={hasSteps ? totalSteps - 1 : 10}
            value={hasSteps ? stepIndex : 0}
            onChange={(e) => hasSteps && onSeek && onSeek(Number(e.target.value))}
            disabled={!hasSteps}
            className="step-timeline-slider"
            title="Drag to jump to step"
          />
        </div>

        {/* Playback Buttons Group */}
        <div className="playback-btns-group">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStepBack}
            disabled={!hasSteps || stepIndex === 0}
            className="btn btn-sm btn-secondary"
            title="Step Back"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPlayPause}
            className="btn btn-sm btn-primary"
            title={isPlaying ? "Pause Animation" : "Play Animation"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStepForward}
            disabled={!hasSteps || stepIndex >= totalSteps - 1}
            className="btn btn-sm btn-secondary"
            title="Step Forward"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReset}
            className="btn btn-sm btn-secondary"
            title="Reset Animation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </motion.button>
        </div>

        {/* Speed Presets Pill */}
        <div className="speed-presets-pill" title="Playback Speed">
          <button
            onClick={() => onSpeedChange && onSpeedChange(200)}
            className={`speed-preset-btn ${isSlow ? 'active' : ''}`}
            title="Slow (0.5x)"
          >
            0.5x
          </button>
          <button
            onClick={() => onSpeedChange && onSpeedChange(600)}
            className={`speed-preset-btn ${isNormal ? 'active' : ''}`}
            title="Normal (1.0x)"
          >
            1.0x
          </button>
          <button
            onClick={() => onSpeedChange && onSpeedChange(1100)}
            className={`speed-preset-btn ${isFast ? 'active' : ''}`}
            title="Fast (2.0x)"
          >
            2.0x
          </button>
        </div>
      </div>
    </section>
  );
}
