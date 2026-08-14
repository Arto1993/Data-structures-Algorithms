import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, BookOpen, Copy, Check, ChevronDown, ChevronUp, FileCode2 } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';

export default function CodeCheatsheet({ code = '', cheatsheetHtml = '' }) {
  const [activeTab, setActiveTab] = useState('code'); // 'code' | 'cheatsheet'
  const [isExpanded, setIsExpanded] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Syntax highlight line by line with Prism.js
  const highlightedLines = useMemo(() => {
    if (!code) return [];
    const lines = code.split('\n');
    return lines.map(line => {
      if (!line) return '';
      return Prism.highlight(line, Prism.languages.javascript, 'javascript');
    });
  }, [code]);

  return (
    <section className="tabs-container">
      {/* Top Header & Tab Navigation Bar */}
      <div className="tab-nav-header">
        {/* Segmented Tab Switcher */}
        <div className="view-mode-segmented">
          <button 
            onClick={() => setActiveTab('code')}
            className={`segmented-btn ${activeTab === 'code' ? 'active' : ''}`}
            title="Core JavaScript implementation"
          >
            <Code className="w-3.5 h-3.5" />
            <span>Implementation (JS)</span>
          </button>

          <button 
            onClick={() => setActiveTab('cheatsheet')}
            className={`segmented-btn ${activeTab === 'cheatsheet' ? 'active' : ''}`}
            title="Interview invariants, tips & edge cases"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Interview Guide & Notes</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {activeTab === 'code' && (
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCopy}
              className="btn btn-sm btn-secondary"
              title="Copy source code to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-accent-emerald" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </motion.button>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="icon-toggle-btn"
            title={isExpanded ? "Collapse panel" : "Expand panel"}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expandable Tab Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="tab-content-area"
          >
            {activeTab === 'code' && (
              <div className="cheatsheet-code-wrapper">
                <div className="cheatsheet-code-content select-text">
                  <table className="cheatsheet-code-table">
                    <tbody>
                      {highlightedLines.map((lineHtml, idx) => (
                        <tr key={`cs-line-${idx}`} className="code-table-row">
                          <td className="code-table-gutter select-none">
                            {idx + 1}
                          </td>
                          <td 
                            className="code-table-line font-mono"
                            dangerouslySetInnerHTML={{ __html: lineHtml || ' ' }}
                          />
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'cheatsheet' && (
              <div className="cheatsheet-notes-wrapper">
                <div 
                  className="cheatsheet-styled-content"
                  dangerouslySetInnerHTML={{ __html: cheatsheetHtml }}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
