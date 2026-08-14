import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TreeVisualizer({ 
  type = 'bst', 
  data, 
  treeData,
  highlights = [], 
  highlightedValues = [], 
  message = '' 
}) {
  const rootData = data || treeData;
  const activeHighlights = highlights.length > 0 ? highlights : highlightedValues;

  if (!rootData) {
    return (
      <div className="empty-visualizer">
        <div className="empty-icon">🌳</div>
        <div className="empty-title">Tree is Empty</div>
        <p>Use the controls above to insert nodes or animate traversals.</p>
      </div>
    );
  }

  // --- Trie Visualizer ---
  if (type === 'trie') {
    const { nodes, links, width, height } = layoutTrieTree(rootData);
    const svgWidth = Math.max(width + 100, 700);
    const svgHeight = Math.max(height + 100, 420);

    return (
      <div className="tree-canvas-wrapper flex-col">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="tree-svg">
          <g transform={`translate(${svgWidth / 2 - width / 2}, 30)`}>
            {links.map((link, idx) => (
              <line key={`trie-link-${idx}`} x1={link.x1} y1={link.y1} x2={link.x2} y2={link.y2} className="tree-edge" />
            ))}
            {nodes.map((node, idx) => (
              <g key={`trie-node-${idx}`} className={`tree-node-group trie-node ${node.isEndOfWord ? 'trie-end-word' : ''}`} transform={`translate(${node.x}, ${node.y})`}>
                <circle r="18" className="tree-node-circle" />
                <text className="tree-node-text" dy="5">{node.name}</text>
                {node.isEndOfWord && (
                  <text className="trie-word-label" dy="32">{node.word} ★</text>
                )}
              </g>
            ))}
          </g>
        </svg>
        {message && (
          <div className="step-log-badge">
            <span className="log-dot"></span>
            <span>{message}</span>
          </div>
        )}
      </div>
    );
  }

  // --- Binary Tree / BST / AVL / LCA Layout ---
  // Clone object to avoid mutating state coordinates
  const clonedRoot = JSON.parse(JSON.stringify(rootData));
  const { nodes, links, width, height } = layoutBinaryTree(clonedRoot);
  const svgWidth = Math.max(width + 120, 760);
  const svgHeight = Math.max(height + 100, 420);

  return (
    <div className="tree-canvas-wrapper flex-col w-full">
      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="tree-svg select-none">
        <defs>
          <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          <linearGradient id="highlightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>

        <g transform={`translate(${Math.max(20, svgWidth / 2 - width / 2)}, 40)`}>
          {/* Tree Links */}
          {links.map((link, idx) => (
            <motion.line
              key={`link-${idx}-${link.x1}-${link.y1}`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              x1={link.x1}
              y1={link.y1}
              x2={link.x2}
              y2={link.y2}
              className="tree-edge"
              strokeWidth="2.5"
            />
          ))}

          {/* Tree Nodes */}
          <AnimatePresence>
            {nodes.map((node) => {
              const isHighlighted = activeHighlights.includes(node.value);
              const showBalance = type === 'avl' && node.balance !== undefined;
              const balanceClass = Math.abs(node.balance) > 1 ? 'imbalance' : 'balanced';

              return (
                <motion.g
                  key={`node-${node.value}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1, x: node.x, y: node.y }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`tree-node-group ${isHighlighted ? 'highlighted' : ''}`}
                >
                  <circle
                    r="22"
                    className={`tree-node-circle ${isHighlighted ? 'pulse-node fill-amber-500 stroke-amber-300' : ''}`}
                  />
                  <text className="tree-node-text font-mono font-bold" dy="5">
                    {node.value}
                  </text>

                  {/* AVL Balance Badge */}
                  {showBalance && (
                    <g transform="translate(16, -14)" className="badge-group">
                      <circle r="9" className={`balance-badge ${balanceClass}`} />
                      <text className="balance-text font-mono text-[9px]" dy="3">
                        {node.balance >= 0 ? `+${node.balance}` : node.balance}
                      </text>
                    </g>
                  )}

                  {/* Height Indicator */}
                  {node.height !== undefined && type === 'avl' && (
                    <text className="height-text font-mono text-[10px]" dy="36">
                      h:{node.height}
                    </text>
                  )}
                </motion.g>
              );
            })}
          </AnimatePresence>
        </g>
      </svg>

      {message && (
        <motion.div 
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="step-log-badge"
        >
          <span className="log-dot"></span>
          <span>{message}</span>
        </motion.div>
      )}
    </div>
  );
}

// Tree layout calculations
function layoutBinaryTree(root) {
  const nodes = [];
  const links = [];
  let curX = 30;

  const getNodeVal = (node) => (node.value !== undefined ? node.value : node.val);

  const computeX = (node, depth) => {
    if (!node) return;
    computeX(node.left, depth + 1);

    node._x = curX;
    node._y = depth * 80;
    curX += 62;

    computeX(node.right, depth + 1);
  };

  computeX(root, 0);

  const collectElements = (node) => {
    if (!node) return;
    const val = getNodeVal(node);
    nodes.push({
      value: val,
      x: node._x,
      y: node._y,
      height: node.height,
      balance: node.balance !== undefined ? node.balance : 0
    });

    if (node.left) {
      links.push({ x1: node._x, y1: node._y, x2: node.left._x, y2: node.left._y });
      collectElements(node.left);
    }
    if (node.right) {
      links.push({ x1: node._x, y1: node._y, x2: node.right._x, y2: node.right._y });
      collectElements(node.right);
    }
  };

  collectElements(root);

  return {
    nodes,
    links,
    width: curX + 40,
    height: (nodes.reduce((max, n) => Math.max(max, n.y), 0)) + 60
  };
}

function layoutTrieTree(root) {
  const nodes = [];
  const links = [];
  let curX = 20;

  const assignCoords = (node, depth) => {
    if (!node) return;
    if (!node.children || node.children.length === 0) {
      node._x = curX;
      node._y = depth * 65;
      curX += 48;
      return;
    }

    for (const child of node.children) {
      assignCoords(child, depth + 1);
    }

    const firstChild = node.children[0];
    const lastChild = node.children[node.children.length - 1];
    node._x = (firstChild._x + lastChild._x) / 2;
    node._y = depth * 65;
  };

  assignCoords(root, 0);

  const traverse = (node) => {
    if (!node) return;
    nodes.push({
      name: node.name,
      isEndOfWord: node.isEndOfWord,
      word: node.word,
      x: node._x,
      y: node._y
    });

    if (node.children) {
      for (const child of node.children) {
        links.push({ x1: node._x, y1: node._y, x2: child._x, y2: child._y });
        traverse(child);
      }
    }
  };

  traverse(root);

  return {
    nodes,
    links,
    width: curX + 40,
    height: (nodes.reduce((max, n) => Math.max(max, n.y), 0)) + 60
  };
}
