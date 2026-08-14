import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileCode, Folder, FolderOpen, ChevronRight, ChevronDown, 
  Copy, Check, Download, Play, Search, Code2, Sparkles, X,
  Terminal, ShieldCheck, Cpu, Edit3, Eye, RotateCcw, ListFilter,
  ArrowDown, ArrowUp
} from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import { FILE_TREE, getFileContent, getAllFilesFlat } from '../data/sourceFiles';

export default function CodeEditorView({ onSwitchToVisualizer, initialFileId = 'avl-tree.js', onToggleViewMode }) {
  const allFiles = useMemo(() => getAllFilesFlat(), []);
  const [selectedFileId, setSelectedFileId] = useState(initialFileId);
  const [openTabs, setOpenTabs] = useState(['avl-tree.js', 'lru-cache.js', 'segment-tree.js']);
  const [collapsedFolders, setCollapsedFolders] = useState({});
  const [explorerSearch, setExplorerSearch] = useState('');
  
  // In-editor search & active line
  const [inEditorSearch, setInEditorSearch] = useState('');
  const [showFindBar, setShowFindBar] = useState(false);
  const [activeLine, setActiveLine] = useState(1);
  const [isLiveEditMode, setIsLiveEditMode] = useState(false);
  const [customFileContent, setCustomFileContent] = useState({});
  const [copied, setCopied] = useState(false);

  const editorViewportRef = useRef(null);

  const selectedFile = useMemo(() => {
    return allFiles.find(f => f.id === selectedFileId) || allFiles[0];
  }, [allFiles, selectedFileId]);

  // Current code content (custom edited or original)
  const currentCode = useMemo(() => {
    if (customFileContent[selectedFileId] !== undefined) {
      return customFileContent[selectedFileId];
    }
    return getFileContent(selectedFile.moduleKey);
  }, [customFileContent, selectedFileId, selectedFile]);

  // Split lines
  const lines = useMemo(() => {
    return currentCode.split('\n');
  }, [currentCode]);

  // Extract classes and methods for quick jump outline
  const outlineItems = useMemo(() => {
    const items = [];
    lines.forEach((line, idx) => {
      const classMatch = line.match(/class\s+([A-Za-z0-9_]+)/);
      if (classMatch) {
        items.push({ type: 'class', name: classMatch[1], line: idx + 1 });
      }
      const funcMatch = line.match(/(?:export\s+)?(?:async\s+)?function\s+([A-Za-z0-9_]+)/);
      if (funcMatch) {
        items.push({ type: 'function', name: `${funcMatch[1]}()`, line: idx + 1 });
      }
      const methodMatch = line.match(/^\s*(?:async\s+)?([A-Za-z0-9_]+)\s*\([^)]*\)\s*\{/);
      if (methodMatch && !['if', 'for', 'while', 'switch', 'catch'].includes(methodMatch[1])) {
        items.push({ type: 'method', name: `.${methodMatch[1]}()`, line: idx + 1 });
      }
    });
    return items;
  }, [lines]);

  // Syntax highlighted lines
  const highlightedLines = useMemo(() => {
    return lines.map((line) => {
      if (!line) return '&nbsp;';
      return Prism.highlight(line, Prism.languages.javascript, 'javascript');
    });
  }, [lines]);

  // Matches for in-editor search
  const searchMatches = useMemo(() => {
    if (!inEditorSearch.trim()) return [];
    const lower = inEditorSearch.toLowerCase();
    const matches = [];
    lines.forEach((line, idx) => {
      if (line.toLowerCase().includes(lower)) {
        matches.push(idx + 1);
      }
    });
    return matches;
  }, [lines, inEditorSearch]);

  const handleSelectFile = (file) => {
    setSelectedFileId(file.id);
    setActiveLine(1);
    if (!openTabs.includes(file.id)) {
      setOpenTabs([...openTabs, file.id]);
    }
  };

  const handleCloseTab = (e, fileId) => {
    e.stopPropagation();
    const nextTabs = openTabs.filter(id => id !== fileId);
    setOpenTabs(nextTabs);
    if (selectedFileId === fileId && nextTabs.length > 0) {
      setSelectedFileId(nextTabs[nextTabs.length - 1]);
    }
  };

  const toggleFolder = (folderKey) => {
    setCollapsedFolders(prev => ({ ...prev, [folderKey]: !prev[folderKey] }));
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    const blob = new Blob([currentCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedFile.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleResetCode = () => {
    setCustomFileContent(prev => {
      const next = { ...prev };
      delete next[selectedFileId];
      return next;
    });
  };

  const scrollToLine = (lineNum) => {
    setActiveLine(lineNum);
    if (editorViewportRef.current) {
      const lineElement = editorViewportRef.current.querySelector(`#code-line-${lineNum}`);
      if (lineElement) {
        lineElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // Keyboard shortcut Ctrl+F
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        setShowFindBar(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const mapFileToVisualizerId = (id) => {
    const map = {
      'avl-tree.js': 'avl-tree',
      'trie.js': 'trie',
      'segment-tree.js': 'segment-tree',
      'fenwick-tree.js': 'fenwick-tree',
      'min-max-heap.js': 'min-max-heap',
      'disjoint-set.js': 'disjoint-set',
      'lru-cache.js': 'lru-cache',
      'lfu-cache.js': 'lfu-cache',
      'skip-list.js': 'skip-list',
      'dijkstra.js': 'dijkstra',
      'a-star.js': 'a-star',
      'topological-sort.js': 'topological-sort',
      'kruskal-mst.js': 'kruskal-mst',
      'knapsack.js': 'knapsack',
      'lcs.js': 'lcs',
      'edit-distance.js': 'edit-distance',
      'lis.js': 'lis',
      'quick-sort.js': 'quick-sort',
      'merge-sort.js': 'merge-sort',
      'binary-search.js': 'binary-search'
    };
    return map[id] || 'avl-tree';
  };

  const filteredTree = FILE_TREE.map(group => ({
    ...group,
    files: group.files.filter(f => 
      f.name.toLowerCase().includes(explorerSearch.toLowerCase()) ||
      f.desc.toLowerCase().includes(explorerSearch.toLowerCase()) ||
      group.name.toLowerCase().includes(explorerSearch.toLowerCase())
    )
  })).filter(group => group.files.length > 0);

  return (
    <div className="code-editor-container">
      {/* Explorer Sidebar */}
      <aside className="editor-explorer-sidebar">
        <div className="explorer-header">
          <div className="explorer-title">
            <Code2 className="w-3.5 h-3.5 text-accent-brand" />
            <span>EXPLORER</span>
          </div>
          <span className="text-[10px] text-text-muted font-mono">{allFiles.length} files</span>
        </div>

        {/* File Search */}
        <div className="search-box-wrapper">
          <div className="search-input-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search files..."
              value={explorerSearch}
              onChange={(e) => setExplorerSearch(e.target.value)}
              className="search-input"
            />
            {explorerSearch && (
              <button 
                onClick={() => setExplorerSearch('')}
                className="clear-search-btn"
                title="Clear filter"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* File Tree List */}
        <div className="explorer-tree custom-scrollbar">
          {filteredTree.map(group => {
            const isCollapsed = collapsedFolders[group.folder];
            return (
              <div key={group.folder} className="explorer-folder-group">
                <button 
                  onClick={() => toggleFolder(group.folder)}
                  className="folder-row"
                >
                  {isCollapsed ? <ChevronRight className="w-3 h-3 text-text-muted" /> : <ChevronDown className="w-3 h-3 text-text-muted" />}
                  {isCollapsed ? <Folder className="w-3 h-3 text-accent-brand" /> : <FolderOpen className="w-3 h-3 text-accent-brand" />}
                  <span className="folder-name">{group.name}</span>
                </button>

                {!isCollapsed && (
                  <div className="folder-children">
                    {group.files.map(file => {
                      const isSelected = selectedFileId === file.id;
                      return (
                        <button
                          key={file.id}
                          onClick={() => handleSelectFile(file)}
                          className={`file-row ${isSelected ? 'active' : ''}`}
                          title={file.desc}
                        >
                          <FileCode className={`w-3.5 h-3.5 ${isSelected ? 'text-accent-brand' : 'text-accent-cyan'}`} />
                          <span className="file-name">{file.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      {/* Main Code Workspace */}
      <div className="editor-main-pane">
        {/* Tab Bar */}
        <div className="editor-tabs-bar">
          <div className="tabs-list custom-scrollbar">
            {openTabs.map(tabId => {
              const file = allFiles.find(f => f.id === tabId);
              if (!file) return null;
              const isActive = selectedFileId === tabId;
              const isModified = customFileContent[tabId] !== undefined;

              return (
                <div
                  key={tabId}
                  onClick={() => setSelectedFileId(tabId)}
                  className={`editor-tab ${isActive ? 'active' : ''}`}
                >
                  <FileCode className={`w-3.5 h-3.5 ${isActive ? 'text-accent-brand' : 'text-accent-cyan'}`} />
                  <span className="tab-title">
                    {file.name} {isModified && <span className="text-accent-brand">●</span>}
                  </span>
                  <button 
                    onClick={(e) => handleCloseTab(e, tabId)}
                    className="tab-close-btn"
                    title="Close Tab"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Action Tools Toolbar */}
          <div className="editor-top-actions">
            {onToggleViewMode && (
              <div className="view-mode-segmented mr-1">
                <button
                  onClick={() => onToggleViewMode('visualizer')}
                  className="segmented-btn"
                  title="Interactive Visualizer Studio"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Visualizer</span>
                </button>
                <button
                  onClick={() => onToggleViewMode('code-editor')}
                  className="segmented-btn active"
                  title="IDE Code Studio"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Code Studio</span>
                </button>
              </div>
            )}

            {/* Live Edit Toggle */}
            <button
              onClick={() => setIsLiveEditMode(!isLiveEditMode)}
              className={`btn btn-sm ${isLiveEditMode ? 'btn-success' : 'btn-secondary'}`}
              title="Toggle Live Editable Code Mode"
            >
              {isLiveEditMode ? <Eye className="w-3.5 h-3.5 text-accent-emerald" /> : <Edit3 className="w-3.5 h-3.5" />}
              <span>{isLiveEditMode ? 'Viewing Syntax' : 'Live Edit'}</span>
            </button>

            {/* Find in File Trigger */}
            <button
              onClick={() => setShowFindBar(!showFindBar)}
              className={`btn btn-sm ${showFindBar ? 'btn-active' : 'btn-secondary'}`}
              title="Find in File (Ctrl+F)"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Find</span>
            </button>

            {/* Reset if modified */}
            {customFileContent[selectedFileId] !== undefined && (
              <button
                onClick={handleResetCode}
                className="btn btn-sm btn-danger"
                title="Reset modifications to original code"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}

            {/* Visualize Button */}
            <button
              onClick={() => onSwitchToVisualizer(mapFileToVisualizerId(selectedFile.id))}
              className="btn btn-sm btn-primary"
              title="Run interactive visualizer for this data structure"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Visualize</span>
            </button>

            {/* Copy Button */}
            <button
              onClick={handleCopyCode}
              className="btn btn-sm btn-secondary"
              title="Copy entire source code"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-accent-emerald" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="btn btn-sm btn-secondary"
              title="Download raw JS file"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Find in File Bar */}
        <AnimatePresence>
          {showFindBar && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="editor-find-bar"
            >
              <div className="flex items-center gap-2 flex-1">
                <Search className="w-3.5 h-3.5 text-text-muted" />
                <input
                  type="text"
                  placeholder="Find in file (regex / keyword)..."
                  value={inEditorSearch}
                  onChange={(e) => setInEditorSearch(e.target.value)}
                  autoFocus
                  className="find-input"
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] text-text-muted font-mono">
                  {inEditorSearch ? `${searchMatches.length} matches` : '0 matches'}
                </span>
                {searchMatches.length > 0 && (
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => {
                        const next = searchMatches.find(m => m > activeLine) || searchMatches[0];
                        scrollToLine(next);
                      }}
                      className="find-nav-btn"
                      title="Next match"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                    <button 
                      onClick={() => {
                        const prev = [...searchMatches].reverse().find(m => m < activeLine) || searchMatches[searchMatches.length - 1];
                        scrollToLine(prev);
                      }}
                      className="find-nav-btn"
                      title="Previous match"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                  </div>
                )}
                <button 
                  onClick={() => { setShowFindBar(false); setInEditorSearch(''); }}
                  className="text-text-muted hover:text-text-primary text-xs"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Breadcrumb Path & Method Outline Bar */}
        <div className="editor-breadcrumbs">
          <div className="breadcrumb-path">
            <span className="text-text-muted">Data structures & Algorithms</span>
            <span className="crumb-sep">/</span>
            <span className="text-text-muted">{selectedFile.path.split('/')[0]}</span>
            <span className="crumb-sep">/</span>
            <span className="text-text-muted">{selectedFile.path.split('/')[1]}</span>
            <span className="crumb-sep">/</span>
            <span className="text-accent-brand font-semibold">{selectedFile.name}</span>
          </div>

          {/* Quick Method Outline Jump */}
          {outlineItems.length > 0 && (
            <div className="quick-outline-group">
              <ListFilter className="w-3 h-3 text-text-muted" />
              <select 
                onChange={(e) => scrollToLine(Number(e.target.value))}
                value={outlineItems.find(o => o.line === activeLine)?.line || ''}
                className="outline-select"
                title="Jump to Class or Method"
              >
                <option value="">Jump to Method / Class...</option>
                {outlineItems.map((item, idx) => (
                  <option key={`outline-${idx}`} value={item.line}>
                    {item.type === 'class' ? '🏛️' : '⚡'} {item.name} (L{item.line})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Editor Code Viewport */}
        <div ref={editorViewportRef} className="editor-code-viewport custom-scrollbar">
          {isLiveEditMode ? (
            /* Live Interactive Textarea Editor */
            <div className="live-editor-wrapper">
              <textarea
                value={currentCode}
                onChange={(e) => {
                  setCustomFileContent({
                    ...customFileContent,
                    [selectedFileId]: e.target.value
                  });
                }}
                spellCheck={false}
                className="live-code-textarea custom-scrollbar"
                placeholder="Type or edit JavaScript code here..."
              />
            </div>
          ) : (
            /* High-Contrast Interactive Syntax-Highlighted Editor */
            <div className="editor-code-grid">
              {/* Line Numbers Gutter */}
              <div className="line-numbers-gutter">
                {lines.map((_, index) => {
                  const lineNum = index + 1;
                  const isActive = activeLine === lineNum;
                  const isMatch = searchMatches.includes(lineNum);

                  return (
                    <div 
                      key={`gutter-${lineNum}`}
                      onClick={() => setActiveLine(lineNum)}
                      className={`line-number ${isActive ? 'active-gutter-line' : ''} ${isMatch ? 'match-gutter-line' : ''}`}
                    >
                      {lineNum}
                    </div>
                  );
                })}
              </div>

              {/* Code Content with Line-by-Line Highlight */}
              <div className="code-content-interactive">
                {lines.map((lineText, index) => {
                  const lineNum = index + 1;
                  const isActive = activeLine === lineNum;
                  const isMatch = searchMatches.includes(lineNum);

                  return (
                    <div
                      key={`line-row-${lineNum}`}
                      id={`code-line-${lineNum}`}
                      onClick={() => setActiveLine(lineNum)}
                      className={`code-line-row ${isActive ? 'active-code-line' : ''} ${isMatch ? 'match-code-line' : ''}`}
                    >
                      <span 
                        className="code-line-text"
                        dangerouslySetInnerHTML={{ __html: highlightedLines[index] }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Status Bar */}
        <footer className="editor-status-bar">
          <div className="status-left">
            <span className="status-item"><Terminal className="w-3 h-3 text-accent-brand" /> ES6 Module</span>
            <span className="status-item"><ShieldCheck className="w-3 h-3 text-accent-emerald" /> Strict Type Invariants</span>
            <span className="status-item"><Cpu className="w-3 h-3 text-accent-cyan" /> Zero Dependencies</span>
          </div>
          <div className="status-right">
            <span className="status-item">Ln {activeLine}, Col 1</span>
            <span className="status-item">{lines.length} lines</span>
            <span className="status-item">UTF-8</span>
            <span className="status-item">Spaces: 2</span>
            <span className="status-item text-accent-brand font-semibold">JavaScript</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
