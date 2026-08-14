import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, XCircle, RotateCcw, FlaskConical } from 'lucide-react';
import { runner, TestRunner } from '../tests/test-framework.js';
import { registerAllTests } from '../tests/all-tests.js';

export default function TestRunnerModal({ isOpen, onClose }) {
  const [report, setReport] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const runTests = async () => {
    setIsRunning(true);
    setReport(null);

    // Reset runner suites & register
    runner.suites = [];
    registerAllTests();

    const result = await runner.run();
    setReport(result);
    setIsRunning(false);
  };

  useEffect(() => {
    if (isOpen) {
      runTests();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay active">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="modal-dialog"
      >
        <div className="modal-header">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <FlaskConical className="w-5 h-5 text-accent-brand" />
            <span>Automated Unit Test Suite</span>
          </h2>
          <button onClick={onClose} className="close-modal-btn">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="modal-body">
          <div className="test-summary-header">
            {isRunning ? (
              <span className="text-sm font-semibold flex items-center gap-2">
                <span className="animate-spin">⏳</span> Running all test suites...
              </span>
            ) : report ? (
              <span className="test-summary-counts">
                Passed: <strong className="text-accent-emerald">{report.stats.passed}</strong> / {report.stats.total}
                <span className="text-text-muted font-normal text-xs ml-2">({report.stats.durationMs}ms)</span>
              </span>
            ) : null}

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isRunning}
              onClick={runTests}
              className="btn btn-sm btn-primary"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Re-run Tests</span>
            </motion.button>
          </div>

          <div className="test-results-container custom-scrollbar">
            {report && report.suites.map((suite, sIdx) => (
              <div key={`suite-${sIdx}`} className="test-suite-card">
                <div className="suite-title-row">
                  <span className="font-semibold text-sm">{suite.name}</span>
                  <span className="text-xs text-accent-emerald font-bold">
                    {suite.passed}/{suite.tests.length} passed
                  </span>
                </div>
                {suite.tests.map((test, tIdx) => (
                  <div key={`test-${sIdx}-${tIdx}`} className="suite-test-item">
                    <span className={`flex items-center gap-2 ${test.passed ? 'test-passed' : 'test-failed'}`}>
                      {test.passed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      <span>{test.description}</span>
                    </span>
                    <span className="text-text-muted text-xs">{test.duration}ms</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
