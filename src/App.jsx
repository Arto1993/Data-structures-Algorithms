import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ControlsBar from './components/ControlsBar';
import CodeCheatsheet from './components/CodeCheatsheet';
import TestRunnerModal from './components/TestRunnerModal';
import CodeEditorView from './components/CodeEditorView';
import BigOMetricsBadge from './components/BigOMetricsBadge';

// Specialized Visualizers
import TreeVisualizer from './components/visualizers/TreeVisualizer';
import GraphVisualizer from './components/visualizers/GraphVisualizer';
import DPVisualizer from './components/visualizers/DPVisualizer';
import ArrayVisualizer from './components/visualizers/ArrayVisualizer';
import HeapVisualizer from './components/visualizers/HeapVisualizer';
import LinkedListVisualizer from './components/visualizers/LinkedListVisualizer';
import StackQueueVisualizer from './components/visualizers/StackQueueVisualizer';
import HashTableVisualizer from './components/visualizers/HashTableVisualizer';
import BacktrackingVisualizer from './components/visualizers/BacktrackingVisualizer';
import ComplexityChartVisualizer from './components/visualizers/ComplexityChartVisualizer';

// Data
import { MODULES } from './data/modulesData';

// Structures & Algorithms
import { SinglyLinkedList } from './structures/singly-linked-list';
import { Stack, Queue, Deque, MonotonicStack } from './structures/stack-queue';
import { HashTable } from './structures/hash-table';
import { BinarySearchTree } from './structures/binary-tree';
import { AVLTree } from './structures/avl-tree';
import { PriorityQueue } from './structures/min-max-heap';
import { DisjointSet } from './structures/disjoint-set';

import { TwoPointers } from './algorithms/arrays-strings/two-pointers';
import { SlidingWindow } from './algorithms/arrays-strings/sliding-window';
import { PrefixSum } from './algorithms/arrays-strings/prefix-sum';
import { KadaneAlgorithm } from './algorithms/arrays-strings/kadane';
import { BinarySearch } from './algorithms/sorting-searching/binary-search';

import { ElementarySorts } from './algorithms/sorting-searching/elementary-sorts';
import { MergeSort } from './algorithms/sorting-searching/merge-sort';
import { QuickSort } from './algorithms/sorting-searching/quick-sort';
import { HeapSort } from './algorithms/sorting-searching/heap-sort';
import { RadixSort } from './algorithms/sorting-searching/radix-sort';
import { QuickSelect } from './algorithms/sorting-searching/quick-select';

import { WeightedGraph, dijkstra, graphBFS, graphDFS } from './algorithms/graph/dijkstra';
import { BellmanFord } from './algorithms/graph/bellman-ford';
import { FloydWarshall } from './algorithms/graph/floyd-warshall';
import { TopologicalSort } from './algorithms/graph/topological-sort';

import { NQueens } from './algorithms/backtracking/n-queens';
import { BacktrackingSets } from './algorithms/backtracking/backtracking-subsets';
import { WordSearch } from './algorithms/backtracking/word-search';

import { CoinChange } from './algorithms/dp/coin-change';
import { HouseRobber } from './algorithms/dp/house-robber';
import { Knapsack01 } from './algorithms/dp/knapsack';
import { LongestCommonSubsequence } from './algorithms/dp/lcs';
import { EditDistance } from './algorithms/dp/edit-distance';
import { GridDP } from './algorithms/dp/grid-paths';
import { LongestIncreasingSubsequence } from './algorithms/dp/lis';

const generateBigOCurveSteps = () => {
  const steps = [];
  for (let n = 1; n <= 32; n++) {
    steps.push({
      type: 'curve_scan',
      n,
      explanation: `Asymptotic Scanning at N = ${n}: O(1)=1, O(log N)=${Math.log2(n).toFixed(1)}, O(N)=${n}, O(N log N)=${(n * Math.log2(n)).toFixed(1)}, O(N²)=${n * n}, O(2ᴺ)=${n <= 20 ? Math.pow(2, n) : '16M+'}`
    });
  }
  return steps;
};

export default function App() {
  const [currentModule, setCurrentModule] = useState('big-o-curves');
  const [viewMode, setViewMode] = useState('visualizer'); // 'visualizer' | 'code-editor'
  const [editorFileId, setEditorFileId] = useState('two-pointers.js');
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);

  // Playback & Step State
  const [steps, setSteps] = useState(() => generateBigOCurveSteps());
  const [stepIndex, setStepIndex] = useState(15); // Start at N=16
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(600);
  const playTimerRef = useRef(null);

  // Dynamic Array & Input State (Matching Screenshot Array [1, 4, 7, 3, 8, 5, 2, 6])
  const [sortArray, setSortArray] = useState([1, 4, 7, 3, 8, 5, 2, 6]);
  const [customInput, setCustomInput] = useState('10');

  // --- Data Structure Interactive States ---
  // 1. Arrays (ds-arrays)
  const [dsArray, setDsArray] = useState([12, 24, 36, 48, 60]);
  const [dsCapacity, setDsCapacity] = useState(8);
  const [dsActiveIdx, setDsActiveIdx] = useState(null);
  const [dsOpType, setDsOpType] = useState('access');
  const [arrayIdxInput, setArrayIdxInput] = useState('2');
  const [arrayValInput, setArrayValInput] = useState('99');

  // 2. Stack (ds-stack & stack)
  const [stackItems, setStackItems] = useState([10, 20, 30, 40]);

  // 3. Queue (ds-queue & queue)
  const [queueItems, setQueueItems] = useState([10, 20, 30, 40]);

  // 4. Hash Tables (ds-hash-tables & hash-map)
  const [hashTable] = useState(() => {
    const ht = new HashTable(8);
    ht.put('apple', 10);
    ht.put('banana', 20);
    ht.put('cherry', 30);
    ht.put('date', 40);
    return ht;
  });
  const [hashTableState, setHashTableState] = useState(() => hashTable.getState());
  const [hashKeyInput, setHashKeyInput] = useState('orange');
  const [hashValInput, setHashValInput] = useState('55');

  // 5. Trees (ds-trees & binary-search-tree)
  const [bst, setBst] = useState(() => {
    const tree = new BinarySearchTree();
    [50, 30, 70, 20, 40, 60, 80].forEach(v => tree.insert(v));
    return tree;
  });
  const [bstState, setBstState] = useState(() => bst.toJSON());
  const [treeMode, setTreeMode] = useState('bst'); // 'bst' | 'avl'
  const [avlTree, setAvlTree] = useState(() => {
    const t = new AVLTree();
    [20, 10, 30, 5, 15, 25, 40].forEach(v => t.insert(v));
    return t;
  });
  const [avlState, setAvlState] = useState(() => avlTree.toJSON());

  // 6. Heaps (ds-heaps)
  const [heapArray, setHeapArray] = useState([10, 15, 20, 17, 25, 30, 40]);
  const [isMinHeap, setIsMinHeap] = useState(true);
  const [heapActiveIndices, setHeapActiveIndices] = useState([]);
  const [heapSwappingIndices, setHeapSwappingIndices] = useState([]);

  // 7. Graphs (ds-graphs)
  const defaultGraphNodes = [
    { id: 'A', x: 80, y: 150 },
    { id: 'B', x: 220, y: 70 },
    { id: 'C', x: 220, y: 230 },
    { id: 'D', x: 380, y: 70 },
    { id: 'E', x: 380, y: 230 },
    { id: 'F', x: 520, y: 150 }
  ];
  const defaultGraphEdges = [
    { from: 'A', to: 'B', weight: 4 },
    { from: 'A', to: 'C', weight: 2 },
    { from: 'B', to: 'C', weight: 1 },
    { from: 'B', to: 'D', weight: 5 },
    { from: 'C', to: 'D', weight: 8 },
    { from: 'C', to: 'E', weight: 10 },
    { from: 'D', to: 'E', weight: 2 },
    { from: 'D', to: 'F', weight: 6 },
    { from: 'E', to: 'F', weight: 3 }
  ];
  const [graphNodes, setGraphNodes] = useState(defaultGraphNodes);
  const [graphEdges, setGraphEdges] = useState(defaultGraphEdges);

  // Linked list
  const [linkedListNodes] = useState([10, 20, 30, 40, 50]);

  // Step Animation Ticker
  useEffect(() => {
    if (isPlaying && steps.length > 0) {
      const delay = Math.max(80, 1600 - speed);
      playTimerRef.current = setTimeout(() => {
        setStepIndex(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, delay);
    }
    return () => clearTimeout(playTimerRef.current);
  }, [isPlaying, stepIndex, steps, speed]);

  // Handlers for module selection
  const handleSelectModule = (modId) => {
    setCurrentModule(modId);
    setDsActiveIdx(null);
    if (modId === 'big-o-curves') {
      const curveSteps = generateBigOCurveSteps();
      setSteps(curveSteps);
      setStepIndex(15);
    } else if (modId === 'bellman-ford') {
      const g = BellmanFord.getDefaultGraph();
      setGraphNodes(g.nodes);
      setGraphEdges(g.edges);
      const res = BellmanFord.solve(g.nodes, g.edges, 'A', 'D');
      setSteps(res.steps);
      setStepIndex(0);
    } else if (modId === 'floyd-warshall') {
      const g = FloydWarshall.getDefaultGraph();
      setGraphNodes(g.nodes);
      setGraphEdges(g.edges);
      const res = FloydWarshall.solve(g.nodes, g.edges);
      setSteps(res.steps);
      setStepIndex(0);
    } else if (modId === 'topological-sort') {
      const g = TopologicalSort.getDefaultGraph();
      setGraphNodes(g.nodes);
      setGraphEdges(g.edges);
      const res = TopologicalSort.kahnsAlgorithm(6, [[5, 2], [5, 0], [4, 0], [4, 1], [2, 3], [3, 1]], ['0', '1', '2', '3', '4', '5']);
      setSteps(res.steps);
      setStepIndex(0);
    } else if (modId === 'dijkstra') {
      setGraphNodes(defaultGraphNodes);
      setGraphEdges(defaultGraphEdges);
      const g = new WeightedGraph();
      ['A', 'B', 'C', 'D', 'E', 'F'].forEach(v => g.addVertex(v));
      g.addEdge('A', 'B', 4); g.addEdge('A', 'C', 2);
      g.addEdge('B', 'C', 1); g.addEdge('B', 'D', 5);
      g.addEdge('C', 'D', 8); g.addEdge('C', 'E', 10);
      g.addEdge('D', 'E', 2); g.addEdge('D', 'F', 6);
      g.addEdge('E', 'F', 3);
      const res = dijkstra(g, 'A', 'F');
      setSteps(res.steps);
      setStepIndex(0);
    } else if (modId === 'monotonic-stack') {
      const res = MonotonicStack.nextGreaterElements([2, 1, 2, 4, 3]);
      setSteps(res.steps);
      setStepIndex(0);
    } else if (modId === 'two-sum-hash') {
      const res = HashTable.twoSum([2, 7, 11, 15], 9);
      setSteps(res.steps);
      setStepIndex(0);
    } else if (modId === 'group-anagrams') {
      const res = HashTable.groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']);
      setSteps(res.steps);
      setStepIndex(0);
    } else {
      setSteps([]);
      setStepIndex(0);
    }
    setIsPlaying(false);
  };

  const handleStepForward = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(prev => prev + 1);
      setIsPlaying(false);
    }
  };

  const handleStepBack = () => {
    if (stepIndex > 0) {
      setStepIndex(prev => prev - 1);
      setIsPlaying(false);
    }
  };

  const handleReset = () => {
    setStepIndex(0);
    setIsPlaying(false);
  };

  const handleSeek = (newIdx) => {
    setStepIndex(newIdx);
    setIsPlaying(false);
  };

  const generateArray = (type = 'random') => {
    let newArr;
    if (type === 'reversed') newArr = [90, 80, 70, 60, 50, 40, 30, 20, 10];
    else if (type === 'nearly') newArr = [10, 20, 35, 30, 50, 60, 70, 85, 95];
    else newArr = Array.from({ length: 9 }, () => Math.floor(Math.random() * 85) + 10);
    setSortArray(newArr);
    setSteps([]);
    setStepIndex(0);
    setIsPlaying(false);
  };

  // ==========================================
  // DATA STRUCTURE OPERATIONAL METHODS
  // ==========================================

  // --- 1. Arrays (ds-arrays) ---
  const runArrayAccess = () => {
    const idx = parseInt(arrayIdxInput) || 0;
    if (idx < 0 || idx >= dsArray.length) {
      alert(`Index ${idx} is out of bounds [0..${dsArray.length - 1}]`);
      return;
    }
    setDsActiveIdx(idx);
    setDsOpType('access');
    const val = dsArray[idx];
    const addr = `0x${(0x1000 + idx * 4).toString(16).toUpperCase()}`;
    const accessSteps = [
      {
        array: [...dsArray],
        activeIdx: idx,
        opType: 'access',
        explanation: `🔍 Accessing index [${idx}]: Calculated Memory Address = 0x1000 + (${idx} × 4 bytes) = ${addr}. Retrieved val = ${val} in O(1) constant time.`
      }
    ];
    setSteps(accessSteps);
    setStepIndex(0);
  };

  const runArrayPush = () => {
    const val = parseInt(arrayValInput) || Math.floor(Math.random() * 90) + 10;
    const oldLen = dsArray.length;
    let newCap = dsCapacity;
    const pushSteps = [];

    if (oldLen >= dsCapacity) {
      newCap = dsCapacity * 2;
      setDsCapacity(newCap);
      pushSteps.push({
        array: [...dsArray],
        capacity: newCap,
        activeIdx: oldLen,
        opType: 'push',
        explanation: `⚠️ Array Full! Resizing buffer: capacity doubled from ${dsCapacity} ➔ ${newCap}. Allocated contiguous block.`
      });
    }

    const newArr = [...dsArray, val];
    setDsArray(newArr);
    setDsActiveIdx(newArr.length - 1);
    setDsOpType('push');

    pushSteps.push({
      array: newArr,
      capacity: newCap,
      activeIdx: newArr.length - 1,
      opType: 'push',
      explanation: `➕ Pushed element ${val} at index [${newArr.length - 1}]. Array size is now ${newArr.length} / ${newCap}. O(1) amortized.`
    });

    setSteps(pushSteps);
    setStepIndex(pushSteps.length - 1);
  };

  const runArrayPop = () => {
    if (dsArray.length === 0) return;
    const popped = dsArray[dsArray.length - 1];
    const newArr = dsArray.slice(0, -1);
    setDsArray(newArr);
    setDsActiveIdx(null);
    setDsOpType('pop');
    setSteps([
      {
        array: newArr,
        capacity: dsCapacity,
        activeIdx: null,
        opType: 'pop',
        explanation: `➖ Popped last element ${popped} from index [${newArr.length}]. New size = ${newArr.length}. O(1) time.`
      }
    ]);
    setStepIndex(0);
  };

  const runArrayInsertAt = () => {
    const idx = Math.max(0, Math.min(dsArray.length, parseInt(arrayIdxInput) || 0));
    const val = parseInt(arrayValInput) || 99;
    const insertSteps = [];
    let currentArr = [...dsArray];
    let newCap = dsCapacity;

    if (currentArr.length >= dsCapacity) {
      newCap = dsCapacity * 2;
      setDsCapacity(newCap);
    }

    insertSteps.push({
      array: [...currentArr],
      capacity: newCap,
      activeIdx: idx,
      opType: 'insert',
      explanation: `📥 Insert ${val} at index [${idx}]: Initiating right-shift of elements from [${currentArr.length - 1}] down to [${idx}].`
    });

    const finalArr = [...currentArr.slice(0, idx), val, ...currentArr.slice(idx)];
    setDsArray(finalArr);
    setDsActiveIdx(idx);
    setDsOpType('insert');

    insertSteps.push({
      array: finalArr,
      capacity: newCap,
      activeIdx: idx,
      opType: 'insert',
      explanation: `✅ Inserted ${val} at [${idx}]. Shifted ${currentArr.length - idx} elements in O(N) linear time.`
    });

    setSteps(insertSteps);
    setStepIndex(insertSteps.length - 1);
  };

  const runArrayDeleteAt = () => {
    const idx = parseInt(arrayIdxInput) || 0;
    if (idx < 0 || idx >= dsArray.length) {
      alert(`Index ${idx} is invalid for delete.`);
      return;
    }
    const removedVal = dsArray[idx];
    const newArr = dsArray.filter((_, i) => i !== idx);
    setDsArray(newArr);
    setDsActiveIdx(idx < newArr.length ? idx : null);
    setDsOpType('delete');

    setSteps([
      {
        array: newArr,
        capacity: dsCapacity,
        activeIdx: idx < newArr.length ? idx : null,
        opType: 'delete',
        explanation: `🗑️ Deleted element ${removedVal} from [${idx}]. Shifted ${newArr.length - idx} elements left to close gap in O(N) time.`
      }
    ]);
    setStepIndex(0);
  };

  const runArraySearch = () => {
    const target = parseInt(arrayValInput) || 36;
    const searchSteps = [];
    let foundIdx = -1;

    for (let i = 0; i < dsArray.length; i++) {
      const isMatch = dsArray[i] === target;
      searchSteps.push({
        array: [...dsArray],
        capacity: dsCapacity,
        activeIdx: i,
        opType: 'search',
        explanation: `🔍 Scanning index [${i}] (val=${dsArray[i]}): ${isMatch ? `🎉 MATCH FOUND! arr[${i}] === ${target}` : `Not equal to ${target}. Advancing scan.`}`
      });
      if (isMatch) {
        foundIdx = i;
        break;
      }
    }

    if (foundIdx === -1) {
      searchSteps.push({
        array: [...dsArray],
        capacity: dsCapacity,
        activeIdx: null,
        opType: 'search',
        explanation: `❌ Search completed: Element ${target} was not found in array after ${dsArray.length} comparisons.`
      });
    }

    setSteps(searchSteps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  // --- 2. Heaps (ds-heaps) ---
  const runHeapPush = () => {
    const val = parseInt(customInput) || Math.floor(Math.random() * 50) + 1;
    const arr = [...heapArray, val];
    const heapSteps = [];

    heapSteps.push({
      heap: [...arr],
      active: [arr.length - 1],
      swapping: [],
      explanation: `➕ Placed new value ${val} at next available heap leaf index [${arr.length - 1}]. Initiating Sift-Up.`
    });

    let i = arr.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      const shouldSwap = isMinHeap ? arr[i] < arr[p] : arr[i] > arr[p];
      if (shouldSwap) {
        heapSteps.push({
          heap: [...arr],
          active: [i, p],
          swapping: [i, p],
          explanation: `🔄 Sift-Up Violation: Child [${i}] (${arr[i]}) ${isMinHeap ? '<' : '>'} Parent [${p}] (${arr[p]}). Swapping!`
        });
        [arr[i], arr[p]] = [arr[p], arr[i]];
        i = p;
      } else {
        break;
      }
    }

    setHeapArray(arr);
    setHeapActiveIndices([]);
    setHeapSwappingIndices([]);
    heapSteps.push({
      heap: [...arr],
      active: [i],
      swapping: [],
      explanation: `✅ Sift-Up Complete! Heap invariant restored in O(log N) comparisons. Value settled at [${i}].`
    });

    setSteps(heapSteps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runHeapExtract = () => {
    if (heapArray.length === 0) return;
    const arr = [...heapArray];
    const root = arr[0];
    const heapSteps = [];

    if (arr.length === 1) {
      setHeapArray([]);
      setSteps([{ heap: [], active: [], swapping: [], explanation: `Extracted only element ${root}. Heap is now empty.` }]);
      setStepIndex(0);
      return;
    }

    const last = arr.pop();
    arr[0] = last;

    heapSteps.push({
      heap: [...arr],
      active: [0],
      swapping: [],
      explanation: `📤 Extracted root ${root}. Moved last leaf ${last} to root [0]. Initiating Sift-Down.`
    });

    let i = 0;
    const n = arr.length;
    while (2 * i + 1 < n) {
      let candidate = 2 * i + 1;
      const right = 2 * i + 2;

      if (right < n) {
        const rightBetter = isMinHeap ? arr[right] < arr[candidate] : arr[right] > arr[candidate];
        if (rightBetter) candidate = right;
      }

      const parentViolated = isMinHeap ? arr[candidate] < arr[i] : arr[candidate] > arr[i];
      if (parentViolated) {
        heapSteps.push({
          heap: [...arr],
          active: [i, candidate],
          swapping: [i, candidate],
          explanation: `🔄 Sift-Down: Parent [${i}] (${arr[i]}) violated by child [${candidate}] (${arr[candidate]}). Swapping!`
        });
        [arr[i], arr[candidate]] = [arr[candidate], arr[i]];
        i = candidate;
      } else {
        break;
      }
    }

    setHeapArray(arr);
    setHeapActiveIndices([]);
    setHeapSwappingIndices([]);
    heapSteps.push({
      heap: [...arr],
      active: [i],
      swapping: [],
      explanation: `✅ Sift-Down Complete! Root restored in O(log N) time. Extracted root was ${root}.`
    });

    setSteps(heapSteps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const toggleHeapType = () => {
    const newIsMin = !isMinHeap;
    setIsMinHeap(newIsMin);
    // Heapify current array under new comparator
    const arr = [...heapArray];
    const n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      let curr = i;
      while (2 * curr + 1 < n) {
        let best = 2 * curr + 1;
        const right = 2 * curr + 2;
        if (right < n) {
          if (newIsMin ? arr[right] < arr[best] : arr[right] > arr[best]) best = right;
        }
        if (newIsMin ? arr[best] < arr[curr] : arr[best] > arr[curr]) {
          [arr[curr], arr[best]] = [arr[best], arr[curr]];
          curr = best;
        } else break;
      }
    }
    setHeapArray(arr);
    setSteps([
      {
        heap: arr,
        active: [0],
        swapping: [],
        explanation: `🔄 Toggled to ${newIsMin ? 'MIN-HEAP' : 'MAX-HEAP'}. In-place Heapify completed in O(N) time.`
      }
    ]);
    setStepIndex(0);
  };

  const runHeapifyArray = () => {
    const rawArr = [45, 12, 89, 3, 27, 60, 18, 95];
    const arr = [...rawArr];
    const n = arr.length;
    const heapSteps = [];

    heapSteps.push({
      heap: [...arr],
      active: [],
      swapping: [],
      explanation: `⚡ In-Place Heapify: Building ${isMinHeap ? 'Min-Heap' : 'Max-Heap'} from arbitrary array in linear O(N) time.`
    });

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      let curr = i;
      while (2 * curr + 1 < n) {
        let best = 2 * curr + 1;
        const right = 2 * curr + 2;
        if (right < n) {
          if (isMinHeap ? arr[right] < arr[best] : arr[right] > arr[best]) best = right;
        }
        if (isMinHeap ? arr[best] < arr[curr] : arr[best] > arr[curr]) {
          heapSteps.push({
            heap: [...arr],
            active: [curr, best],
            swapping: [curr, best],
            explanation: `Sifting down node [${curr}] (${arr[curr]}) with child [${best}] (${arr[best]}).`
          });
          [arr[curr], arr[best]] = [arr[best], arr[curr]];
          curr = best;
        } else break;
      }
    }

    setHeapArray(arr);
    heapSteps.push({
      heap: [...arr],
      active: [0],
      swapping: [],
      explanation: `🎉 Linear O(N) Heapify finished! Valid ${isMinHeap ? 'Min-Heap' : 'Max-Heap'} constructed.`
    });

    setSteps(heapSteps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  // --- 3. Trees Traversals & Interactive Operations ---
  const runTreeInsert = () => {
    const val = parseInt(customInput) || Math.floor(Math.random() * 80) + 10;
    if (treeMode === 'avl') {
      const res = avlTree.insertWithSteps(val);
      setSteps(res.steps);
      setAvlState(avlTree.toJSON());
    } else {
      bst.insert(val);
      setBstState(bst.toJSON());
      setSteps([
        {
          currentNode: val,
          explanation: `🌲 Inserted node (${val}) into Binary Search Tree maintaining Left < Root < Right.`
        }
      ]);
    }
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runTreeSearch = () => {
    const target = parseInt(customInput) || 40;
    const searchSteps = [];
    let curr = bst.root;
    let found = false;

    while (curr) {
      if (curr.val === target) {
        searchSteps.push({
          currentNode: curr.val,
          explanation: `🎯 MATCH FOUND: Located node (${curr.val}) in BST! Comparison matches target ${target}.`
        });
        found = true;
        break;
      } else if (target < curr.val) {
        searchSteps.push({
          currentNode: curr.val,
          explanation: `Target ${target} < Node ${curr.val}: Branching LEFT (Left < Root).`
        });
        curr = curr.left;
      } else {
        searchSteps.push({
          currentNode: curr.val,
          explanation: `Target ${target} > Node ${curr.val}: Branching RIGHT (Root < Right).`
        });
        curr = curr.right;
      }
    }

    if (!found) {
      searchSteps.push({
        currentNode: null,
        explanation: `❌ Target ${target} not found in BST (reached NULL leaf).`
      });
    }

    setSteps(searchSteps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  // --- 4. Hash Tables (ds-hash-tables) ---
  const runHashPut = () => {
    const k = hashKeyInput.trim() || 'apple';
    const v = hashValInput.trim() || '10';
    const res = hashTable.putWithSteps(k, v);
    setHashTableState(hashTable.getState());
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runHashGet = () => {
    const k = hashKeyInput.trim() || 'apple';
    const res = hashTable.getWithSteps(k);
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runHashDelete = () => {
    const k = hashKeyInput.trim() || 'apple';
    const res = hashTable.deleteWithSteps(k);
    setHashTableState(hashTable.getState());
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runHashCollisionDemo = () => {
    const res = HashTable.collisionDemo();
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  // --- 5. Algorithm Handlers ---
  const runTwoPointers = () => {
    const sorted = [1, 2, 4, 6, 8, 11, 15];
    const target = parseInt(customInput) || 10;
    const res = TwoPointers.twoSumSorted(sorted, target);
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runSlidingWindow = () => {
    const res = SlidingWindow.maxSumSubarray(sortArray, 3);
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runPrefixSum = () => {
    const res = PrefixSum.compute(sortArray);
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runKadane = () => {
    const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
    const res = KadaneAlgorithm.maxSubArray(arr);
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runBinarySearch = (isRotated = false) => {
    const target = parseInt(customInput) || (isRotated ? 0 : 7);
    if (isRotated) {
      const rotated = [4, 5, 6, 7, 0, 1, 2];
      const res = BinarySearch.searchRotated(rotated, target);
      setSteps(res.steps);
    } else {
      const sorted = [1, 3, 5, 7, 9, 11, 13, 15, 17];
      const res = BinarySearch.search(sorted, target);
      setSteps(res.steps);
    }
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runBubbleSort = () => {
    const res = ElementarySorts.bubbleSort(sortArray);
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runSelectionSort = () => {
    const res = ElementarySorts.selectionSort(sortArray);
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runInsertionSort = () => {
    const res = ElementarySorts.insertionSort(sortArray);
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runCountingSort = () => {
    const arr = sortArray.map(x => Math.abs(x) % 20);
    const res = ElementarySorts.countingSort(arr);
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runMergeSort = () => {
    const res = MergeSort.sortWithSteps(sortArray);
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runQuickSort = (type = 'lomuto') => {
    const res = QuickSort.sortWithSteps(sortArray, type);
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runHeapSort = () => {
    const res = HeapSort.sort(sortArray);
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runRadixSort = () => {
    const arr = sortArray.map(Math.abs);
    const res = RadixSort.sort(arr);
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runQuickSelect = () => {
    const k = Math.max(0, Math.min(sortArray.length - 1, parseInt(customInput) || 3));
    const res = QuickSelect.select(sortArray, k);
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runReverseLinkedList = () => {
    const res = SinglyLinkedList.reverseWithSteps([10, 20, 30, 40, 50]);
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runFastSlowPointers = () => {
    const res = SinglyLinkedList.fastSlowSteps([10, 20, 30, 40, 50, 60, 70]);
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runMergeLists = () => {
    const res = SinglyLinkedList.mergeTwoLists([1, 3, 5], [2, 4, 6]);
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runMonotonicStack = (customArr = null) => {
    let arr = customArr;
    if (!arr) {
      if (customInput && customInput.includes(',')) {
        arr = customInput.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
      }
      if (!arr || arr.length === 0) arr = [2, 1, 2, 4, 3];
    }
    const res = MonotonicStack.nextGreaterElements(arr);
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runTwoSumHash = () => {
    const nums = [2, 7, 11, 15];
    const target = parseInt(customInput) || 9;
    const res = HashTable.twoSum(nums, target);
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runGroupAnagrams = () => {
    const words = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];
    const res = HashTable.groupAnagrams(words);
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runBSTTraverse = (type = 'inorder') => {
    const res = BinarySearchTree.traverseWithSteps(bst.root, type);
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runTreeLCA = () => {
    const p = 20;
    const q = 40;
    const res = BinarySearchTree.lowestCommonAncestorWithSteps(bst.root, p, q);
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runTopKElements = () => {
    const nums = [1, 1, 1, 2, 2, 3, 4, 2, 1, 5];
    const k = parseInt(customInput) || 2;
    const res = PriorityQueue.topKFrequentWithSteps(nums, k);
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runGraphBFS = () => {
    const g = new WeightedGraph();
    ['A', 'B', 'C', 'D', 'E', 'F'].forEach(v => g.addVertex(v));
    g.addEdge('A', 'B', 4); g.addEdge('A', 'C', 2);
    g.addEdge('B', 'C', 1); g.addEdge('B', 'D', 5);
    g.addEdge('C', 'D', 8); g.addEdge('C', 'E', 10);
    g.addEdge('D', 'E', 2); g.addEdge('D', 'F', 6);
    g.addEdge('E', 'F', 3);
    const res = graphBFS(g, 'A');
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runGraphDFS = () => {
    const g = new WeightedGraph();
    ['A', 'B', 'C', 'D', 'E', 'F'].forEach(v => g.addVertex(v));
    g.addEdge('A', 'B', 4); g.addEdge('A', 'C', 2);
    g.addEdge('B', 'C', 1); g.addEdge('B', 'D', 5);
    g.addEdge('C', 'D', 8); g.addEdge('C', 'E', 10);
    g.addEdge('D', 'E', 2); g.addEdge('D', 'F', 6);
    g.addEdge('E', 'F', 3);
    const res = graphDFS(g, 'A');
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runDisjointSet = () => {
    const res = DisjointSet.connectedComponentsWithSteps(6, [[0, 1], [1, 2], [3, 4], [4, 5]]);
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runDijkstra = () => {
    const g = new WeightedGraph();
    ['A', 'B', 'C', 'D', 'E', 'F'].forEach(v => g.addVertex(v));
    g.addEdge('A', 'B', 4); g.addEdge('A', 'C', 2);
    g.addEdge('B', 'C', 1); g.addEdge('B', 'D', 5);
    g.addEdge('C', 'D', 8); g.addEdge('C', 'E', 10);
    g.addEdge('D', 'E', 2); g.addEdge('D', 'F', 6);
    g.addEdge('E', 'F', 3);
    const res = dijkstra(g, 'A', 'F');
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runBellmanFord = () => {
    const g = BellmanFord.getDefaultGraph();
    setGraphNodes(g.nodes);
    setGraphEdges(g.edges);
    const res = BellmanFord.solve(g.nodes, g.edges, 'A', 'D');
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runFloydWarshall = () => {
    const g = FloydWarshall.getDefaultGraph();
    setGraphNodes(g.nodes);
    setGraphEdges(g.edges);
    const res = FloydWarshall.solve(g.nodes, g.edges);
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runTopologicalSort = () => {
    const g = TopologicalSort.getDefaultGraph();
    setGraphNodes(g.nodes);
    setGraphEdges(g.edges);
    const res = TopologicalSort.kahnsAlgorithm(6, [[5, 2], [5, 0], [4, 0], [4, 1], [2, 3], [3, 1]], ['0', '1', '2', '3', '4', '5']);
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runNQueens = () => {
    const res = NQueens.solve(4);
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runSubsets = () => {
    const res = BacktrackingSets.generateSubsets([1, 2, 3]);
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runWordSearch = () => {
    const board = [
      ['A', 'B', 'C', 'E'],
      ['S', 'F', 'C', 'S'],
      ['A', 'D', 'E', 'E']
    ];
    const targetWord = (customInput && customInput.trim().toUpperCase()) || 'ABCCED';
    const res = WordSearch.solve(board, targetWord);
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runFrequencyCounter = () => {
    const arr = ['a', 'b', 'a', 'c', 'b', 'a', 'd', 'b'];
    const res = HashTable.frequencyCounter(arr);
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runCoinChange = () => {
    const res = CoinChange.minCoins([1, 2, 5], 11);
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runHouseRobber = () => {
    const res = HouseRobber.rob([2, 7, 9, 3, 1]);
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runKnapsack = () => {
    const res = Knapsack01.solveWithSteps([2, 3, 4, 5], [3, 4, 5, 6], 5);
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runLcs = () => {
    const res = LongestCommonSubsequence.solveWithSteps('ABCBDAB', 'BDCAB');
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runEditDist = () => {
    const res = EditDistance.solveWithSteps('horse', 'ros');
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runGridPaths = () => {
    const res = GridDP.uniquePaths(4, 5);
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const runLis = () => {
    const res = LongestIncreasingSubsequence.solveFast([10, 9, 2, 5, 3, 7, 101, 18]);
    setSteps(res.steps);
    setStepIndex(0);
    setIsPlaying(true);
  };

  // Universal Default Runner on Play
  const runCurrentModuleDefault = () => {
    switch (currentModule) {
      case 'big-o-curves':
        setSteps(generateBigOCurveSteps());
        setStepIndex(0);
        setIsPlaying(true);
        break;
      case 'ds-arrays': runArraySearch(); break;
      case 'ds-stack': setStackItems(prev => [...prev, Math.floor(Math.random() * 50) + 10]); break;
      case 'ds-queue': setQueueItems(prev => [...prev, Math.floor(Math.random() * 50) + 10]); break;
      case 'ds-hash-tables': runHashCollisionDemo(); break;
      case 'ds-trees': runBSTTraverse('inorder'); break;
      case 'ds-heaps': runHeapPush(); break;
      case 'ds-graphs': runGraphBFS(); break;

      case 'two-pointers': runTwoPointers(); break;
      case 'sliding-window': runSlidingWindow(); break;
      case 'prefix-sum': runPrefixSum(); break;
      case 'kadane': runKadane(); break;
      case 'binary-search': runBinarySearch(false); break;
      case 'bubble-sort': runBubbleSort(); break;
      case 'selection-sort': runSelectionSort(); break;
      case 'insertion-sort': runInsertionSort(); break;
      case 'merge-sort': runMergeSort(); break;
      case 'quick-sort': runQuickSort('lomuto'); break;
      case 'heap-sort': runHeapSort(); break;
      case 'counting-sort': runCountingSort(); break;
      case 'radix-sort': runRadixSort(); break;
      case 'singly-linked-list': runReverseLinkedList(); break;
      case 'doubly-linked-list': runReverseLinkedList(); break;
      case 'reverse-linked-list': runReverseLinkedList(); break;
      case 'fast-slow-pointers': runFastSlowPointers(); break;
      case 'merge-linked-lists': runMergeLists(); break;
      case 'monotonic-stack': runMonotonicStack(); break;
      case 'hash-map': runHashCollisionDemo(); break;
      case 'frequency-counter': runFrequencyCounter(); break;
      case 'two-sum-hash': runTwoSumHash(); break;
      case 'group-anagrams': runGroupAnagrams(); break;
      case 'binary-search-tree': runBSTTraverse('inorder'); break;
      case 'avl-tree': runTreeInsert(); break;
      case 'tree-lca': runTreeLCA(); break;
      case 'min-max-heap': runHeapSort(); break;
      case 'top-k-elements': runTopKElements(); break;
      case 'quick-select': runQuickSelect(); break;
      case 'graph-bfs-dfs': runGraphBFS(); break;
      case 'dijkstra': runDijkstra(); break;
      case 'bellman-ford': runBellmanFord(); break;
      case 'floyd-warshall': runFloydWarshall(); break;
      case 'disjoint-set': runDisjointSet(); break;
      case 'topological-sort': runTopologicalSort(); break;
      case 'n-queens': runNQueens(); break;
      case 'subsets-permutations': runSubsets(); break;
      case 'word-search': runWordSearch(); break;
      case 'coin-change': runCoinChange(); break;
      case 'house-robber': runHouseRobber(); break;
      case 'knapsack': runKnapsack(); break;
      case 'lcs': runLcs(); break;
      case 'edit-distance': runEditDist(); break;
      case 'grid-paths': runGridPaths(); break;
      case 'lis': runLis(); break;
      default: break;
    }
  };

  const handlePlayPause = () => {
    if (steps.length === 0) {
      runCurrentModuleDefault();
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const currentStep = steps[stepIndex] || null;
  const moduleData = MODULES[currentModule] || MODULES['big-o-curves'];

  // Current N for curves
  const currentCurvesN = currentModule === 'big-o-curves' && currentStep?.n ? currentStep.n : 16;

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar 
        currentModule={currentModule}
        onSelectModule={handleSelectModule}
        onOpenTestModal={() => setIsTestModalOpen(true)}
      />

      {/* Main Studio Canvas */}
      <main className="main-content">
        <Header 
          module={moduleData}
          viewMode={viewMode}
          onToggleViewMode={setViewMode}
        />

        {viewMode === 'code-editor' ? (
          <CodeEditorView 
            initialFileId={editorFileId}
            viewMode={viewMode}
            onToggleViewMode={setViewMode}
          />
        ) : (
          <div className="content-body">
            {/* Live Asymptotic Big-O Formula Bar */}
            <BigOMetricsBadge 
              moduleId={currentModule}
              stepIndex={stepIndex}
              totalSteps={steps.length}
              currentStep={currentStep}
              customParams={{ arrayLength: sortArray.length, k: 3 }}
            />

            {/* Universal Controls Bar with Play, Pause, Step Scrubber, and Speed Controls */}
            <ControlsBar 
              stepIndex={stepIndex}
              totalSteps={steps.length}
              isPlaying={isPlaying}
              speed={speed}
              viewMode={viewMode}
              onToggleViewMode={setViewMode}
              onPlayPause={handlePlayPause}
              onStepForward={handleStepForward}
              onStepBack={handleStepBack}
              onReset={handleReset}
              onSpeedChange={setSpeed}
              onSeek={handleSeek}
            >
              {/* Category 1: Complexity */}
              {currentModule === 'big-o-curves' && (
                <button onClick={() => { setSteps(generateBigOCurveSteps()); setStepIndex(0); setIsPlaying(true); }} className="btn btn-primary">
                  📈 Scan All N Curves
                </button>
              )}

              {/* Category 2: Core Data Structures Interactive Controls */}
              {currentModule === 'ds-arrays' && (
                <div className="flex items-center gap-2 flex-wrap">
                  <input type="number" value={arrayIdxInput} onChange={(e) => setArrayIdxInput(e.target.value)} className="input-field w-16" placeholder="Idx" title="Index" />
                  <input type="number" value={arrayValInput} onChange={(e) => setArrayValInput(e.target.value)} className="input-field w-20" placeholder="Val" title="Value" />
                  <button onClick={runArrayAccess} className="btn btn-primary" title="O(1) Direct Access">🔍 Access [i]</button>
                  <button onClick={runArrayPush} className="btn btn-secondary" title="O(1) Amortized Push">➕ Push</button>
                  <button onClick={runArrayPop} className="btn btn-secondary" title="O(1) Pop">➖ Pop</button>
                  <button onClick={runArrayInsertAt} className="btn btn-secondary" title="O(N) Insert at Index">📥 Insert(i, v)</button>
                  <button onClick={runArrayDeleteAt} className="btn btn-secondary" title="O(N) Delete at Index">🗑️ Delete(i)</button>
                  <button onClick={runArraySearch} className="btn btn-secondary" title="O(N) Linear Search">🔎 Search(v)</button>
                  <button onClick={() => { setDsArray([10, 25, 42, 68, 85]); setDsCapacity(8); setDsActiveIdx(null); }} className="btn btn-secondary">🎲 Reset</button>
                </div>
              )}

              {currentModule === 'ds-stack' && (
                <div className="flex items-center gap-2 flex-wrap">
                  <input type="number" value={customInput} onChange={(e) => setCustomInput(e.target.value)} className="input-field w-20" placeholder="Val" />
                  <button onClick={() => setStackItems(prev => [...prev, parseInt(customInput) || Math.floor(Math.random() * 80) + 10])} className="btn btn-primary">⬇️ Push(val)</button>
                  <button onClick={() => setStackItems(prev => prev.slice(0, -1))} className="btn btn-secondary">⬆️ Pop()</button>
                  <button onClick={() => {
                    if (stackItems.length > 0) {
                      setSteps([{ explanation: `👁️ Peek Top: Element is (${stackItems[stackItems.length - 1]}) at index [${stackItems.length - 1}]. O(1) time.` }]);
                    }
                  }} className="btn btn-secondary">👁️ Peek()</button>
                  <button onClick={() => setStackItems([])} className="btn btn-secondary">🧹 Clear</button>
                  <button onClick={() => setStackItems([10, 20, 30, 40])} className="btn btn-secondary">🎲 Sample</button>
                </div>
              )}

              {currentModule === 'ds-queue' && (
                <div className="flex items-center gap-2 flex-wrap">
                  <input type="number" value={customInput} onChange={(e) => setCustomInput(e.target.value)} className="input-field w-20" placeholder="Val" />
                  <button onClick={() => setQueueItems(prev => [...prev, parseInt(customInput) || Math.floor(Math.random() * 80) + 10])} className="btn btn-primary">📥 Enqueue(val)</button>
                  <button onClick={() => setQueueItems(prev => prev.slice(1))} className="btn btn-secondary">📤 Dequeue()</button>
                  <button onClick={() => {
                    if (queueItems.length > 0) {
                      setSteps([{ explanation: `👁️ Front Element: (${queueItems[0]}) at Head [0]. O(1) time.` }]);
                    }
                  }} className="btn btn-secondary">👁️ Peek Front</button>
                  <button onClick={() => setQueueItems([])} className="btn btn-secondary">🧹 Clear</button>
                  <button onClick={() => setQueueItems([10, 20, 30, 40])} className="btn btn-secondary">🎲 Sample</button>
                </div>
              )}

              {currentModule === 'ds-hash-tables' && (
                <div className="flex items-center gap-2 flex-wrap">
                  <input type="text" value={hashKeyInput} onChange={(e) => setHashKeyInput(e.target.value)} className="input-field w-20" placeholder="Key" />
                  <input type="text" value={hashValInput} onChange={(e) => setHashValInput(e.target.value)} className="input-field w-16" placeholder="Val" />
                  <button onClick={runHashPut} className="btn btn-primary">📥 Put(k, v)</button>
                  <button onClick={runHashGet} className="btn btn-secondary">🔍 Get(k)</button>
                  <button onClick={runHashDelete} className="btn btn-secondary">🗑️ Delete(k)</button>
                  <button onClick={runHashCollisionDemo} className="btn btn-secondary">💥 Collision Demo</button>
                </div>
              )}

              {currentModule === 'ds-trees' && (
                <div className="flex items-center gap-2 flex-wrap">
                  <input type="number" value={customInput} onChange={(e) => setCustomInput(e.target.value)} className="input-field w-20" placeholder="Val" />
                  <button onClick={runTreeInsert} className="btn btn-primary">➕ Insert Node</button>
                  <button onClick={runTreeSearch} className="btn btn-secondary">🔍 Search Node</button>
                  <button onClick={() => runBSTTraverse('inorder')} className="btn btn-secondary">🌲 Inorder (Sorted)</button>
                  <button onClick={() => runBSTTraverse('preorder')} className="btn btn-secondary">Preorder</button>
                  <button onClick={() => runBSTTraverse('postorder')} className="btn btn-secondary">Postorder</button>
                  <button onClick={() => runBSTTraverse('bfs')} className="btn btn-secondary">BFS Level-Order</button>
                  <button onClick={() => {
                    const newBst = new BinarySearchTree();
                    [50, 30, 70, 20, 40, 60, 80].forEach(v => newBst.insert(v));
                    setBst(newBst);
                    setBstState(newBst.toJSON());
                  }} className="btn btn-secondary">🔄 Rebuild Tree</button>
                </div>
              )}

              {currentModule === 'ds-heaps' && (
                <div className="flex items-center gap-2 flex-wrap">
                  <input type="number" value={customInput} onChange={(e) => setCustomInput(e.target.value)} className="input-field w-20" placeholder="Val" />
                  <button onClick={runHeapPush} className="btn btn-primary">➕ Insert (Sift-Up)</button>
                  <button onClick={runHeapExtract} className="btn btn-secondary">📤 Extract Root (Sift-Down)</button>
                  <button onClick={toggleHeapType} className="btn btn-secondary">🔄 Toggle {isMinHeap ? 'Max-Heap' : 'Min-Heap'}</button>
                  <button onClick={runHeapifyArray} className="btn btn-secondary">⚡ O(N) Heapify</button>
                  <button onClick={() => {
                    setHeapArray([10, 15, 20, 17, 25, 30, 40]);
                    setHeapActiveIndices([]);
                    setHeapSwappingIndices([]);
                  }} className="btn btn-secondary">🎲 Reset</button>
                </div>
              )}

              {currentModule === 'ds-graphs' && (
                <div className="flex items-center gap-2 flex-wrap">
                  <button onClick={runGraphBFS} className="btn btn-primary">🌊 Run BFS (Queue)</button>
                  <button onClick={runGraphDFS} className="btn btn-secondary">🌲 Run DFS (Stack)</button>
                  <button onClick={() => {
                    const newId = String.fromCharCode(65 + graphNodes.length);
                    if (graphNodes.length < 8) {
                      const newNode = { id: newId, x: 100 + Math.random() * 350, y: 80 + Math.random() * 180 };
                      setGraphNodes(prev => [...prev, newNode]);
                      setGraphEdges(prev => [...prev, { from: 'A', to: newId, weight: Math.floor(Math.random() * 9) + 1 }]);
                    }
                  }} className="btn btn-secondary">➕ Add Vertex</button>
                  <button onClick={() => {
                    setGraphNodes(defaultGraphNodes);
                    setGraphEdges(defaultGraphEdges);
                    setSteps([]);
                  }} className="btn btn-secondary">🔄 Reset Graph</button>
                </div>
              )}

              {/* Category 3: Algorithm Modules Controls */}
              {currentModule === 'two-pointers' && (
                <>
                  <input type="number" value={customInput} onChange={(e) => setCustomInput(e.target.value)} className="input-field w-20" placeholder="Target" />
                  <button onClick={runTwoPointers} className="btn btn-primary">🎯 Converge Two Pointers</button>
                </>
              )}

              {currentModule === 'sliding-window' && (
                <>
                  <button onClick={runSlidingWindow} className="btn btn-primary">🪟 Slide Window (k=3)</button>
                  <button onClick={() => generateArray('random')} className="btn btn-secondary">🎲 Random</button>
                </>
              )}

              {currentModule === 'prefix-sum' && (
                <button onClick={runPrefixSum} className="btn btn-primary">➕ Compute Prefix Array</button>
              )}

              {currentModule === 'kadane' && (
                <button onClick={runKadane} className="btn btn-primary">⚡ Run Kadane's Max Subarray</button>
              )}

              {currentModule === 'binary-search' && (
                <>
                  <input type="number" value={customInput} onChange={(e) => setCustomInput(e.target.value)} className="input-field w-20" placeholder="Target" />
                  <button onClick={() => runBinarySearch(false)} className="btn btn-primary">🔍 Standard Search</button>
                  <button onClick={() => runBinarySearch(true)} className="btn btn-secondary">🔄 Rotated Array Search</button>
                </>
              )}

              {currentModule === 'bubble-sort' && (
                <>
                  <button onClick={runBubbleSort} className="btn btn-primary">🫧 Run Bubble Sort</button>
                  <button onClick={() => generateArray('random')} className="btn btn-secondary">🎲 Random</button>
                </>
              )}

              {currentModule === 'selection-sort' && (
                <>
                  <button onClick={runSelectionSort} className="btn btn-primary">🎯 Run Selection Sort</button>
                  <button onClick={() => generateArray('random')} className="btn btn-secondary">🎲 Random</button>
                </>
              )}

              {currentModule === 'insertion-sort' && (
                <>
                  <button onClick={runInsertionSort} className="btn btn-primary">📥 Run Insertion Sort</button>
                  <button onClick={() => generateArray('random')} className="btn btn-secondary">🎲 Random</button>
                </>
              )}

              {currentModule === 'merge-sort' && (
                <>
                  <button onClick={runMergeSort} className="btn btn-primary">🔀 Run MergeSort</button>
                  <button onClick={() => generateArray('random')} className="btn btn-secondary">🎲 Random</button>
                </>
              )}

              {currentModule === 'quick-sort' && (
                <>
                  <button onClick={() => runQuickSort('lomuto')} className="btn btn-primary">⚡ Lomuto QuickSort</button>
                  <button onClick={() => runQuickSort('threeWay')} className="btn btn-secondary">🇳🇱 3-Way DNF</button>
                  <button onClick={() => generateArray('random')} className="btn btn-secondary">🎲 Random</button>
                </>
              )}

              {currentModule === 'heap-sort' && (
                <>
                  <button onClick={runHeapSort} className="btn btn-primary">⚡ Run HeapSort (In-Place)</button>
                  <button onClick={() => generateArray('random')} className="btn btn-secondary">🎲 Random</button>
                </>
              )}

              {currentModule === 'counting-sort' && (
                <>
                  <button onClick={runCountingSort} className="btn btn-primary">📊 Run Counting Sort (O(N+K))</button>
                  <button onClick={() => generateArray('random')} className="btn btn-secondary">🎲 Random</button>
                </>
              )}

              {currentModule === 'radix-sort' && (
                <>
                  <button onClick={runRadixSort} className="btn btn-primary">🔢 Run Radix Sort (LSD)</button>
                  <button onClick={() => generateArray('random')} className="btn btn-secondary">🎲 Random</button>
                </>
              )}

              {currentModule === 'doubly-linked-list' && (
                <button onClick={runReverseLinkedList} className="btn btn-primary">↔️ Traverse Doubly Linked List</button>
              )}

              {currentModule === 'reverse-linked-list' && (
                <button onClick={runReverseLinkedList} className="btn btn-primary">🔄 Reverse Linked List (3-Pointer)</button>
              )}

              {currentModule === 'fast-slow-pointers' && (
                <button onClick={runFastSlowPointers} className="btn btn-primary">🐢🐇 Find Middle Element</button>
              )}

              {currentModule === 'merge-linked-lists' && (
                <button onClick={runMergeLists} className="btn btn-primary">🔀 Merge Two Sorted Lists</button>
              )}

              {currentModule === 'stack' && (
                <div className="flex items-center gap-2">
                  <input type="number" value={customInput} onChange={(e) => setCustomInput(e.target.value)} className="input-field w-16" placeholder="Val" />
                  <button onClick={() => setStackItems(prev => [...prev, parseInt(customInput) || 50])} className="btn btn-primary">⬇️ Push</button>
                  <button onClick={() => setStackItems(prev => prev.slice(0, -1))} className="btn btn-secondary">⬆️ Pop</button>
                </div>
              )}

              {currentModule === 'queue' && (
                <div className="flex items-center gap-2">
                  <input type="number" value={customInput} onChange={(e) => setCustomInput(e.target.value)} className="input-field w-16" placeholder="Val" />
                  <button onClick={() => setQueueItems(prev => [...prev, parseInt(customInput) || 50])} className="btn btn-primary">📥 Enqueue</button>
                  <button onClick={() => setQueueItems(prev => prev.slice(1))} className="btn btn-secondary">📤 Dequeue</button>
                </div>
              )}

              {currentModule === 'monotonic-stack' && (
                <div className="flex items-center gap-2 flex-wrap">
                  <button onClick={() => runMonotonicStack([2, 1, 2, 4, 3])} className="btn btn-primary">
                    📈 Standard [2,1,2,4,3]
                  </button>
                  <button onClick={() => runMonotonicStack([73, 74, 75, 71, 69, 72, 76, 73])} className="btn btn-secondary">
                    🌡️ Daily Temps
                  </button>
                  <button onClick={() => runMonotonicStack([4, 5, 2, 25])} className="btn btn-secondary">
                    🔢 [4, 5, 2, 25]
                  </button>
                </div>
              )}

              {currentModule === 'hash-map' && (
                <div className="flex items-center gap-2 flex-wrap">
                  <input type="text" value={hashKeyInput} onChange={(e) => setHashKeyInput(e.target.value)} className="input-field w-20" placeholder="Key" />
                  <input type="text" value={hashValInput} onChange={(e) => setHashValInput(e.target.value)} className="input-field w-16" placeholder="Val" />
                  <button onClick={runHashPut} className="btn btn-primary">📥 Put(k, v)</button>
                  <button onClick={runHashGet} className="btn btn-secondary">🔍 Get(k)</button>
                  <button onClick={runHashDelete} className="btn btn-secondary">🗑️ Delete(k)</button>
                  <button onClick={runHashCollisionDemo} className="btn btn-secondary">💥 Collision Demo</button>
                </div>
              )}

              {currentModule === 'frequency-counter' && (
                <button onClick={runFrequencyCounter} className="btn btn-primary">📊 Compute Frequency Counter</button>
              )}

              {currentModule === 'two-sum-hash' && (
                <>
                  <input type="number" value={customInput} onChange={(e) => setCustomInput(e.target.value)} className="input-field w-20" placeholder="Target" />
                  <button onClick={runTwoSumHash} className="btn btn-primary">🔍 Find Two Sum Target</button>
                </>
              )}

              {currentModule === 'group-anagrams' && (
                <button onClick={runGroupAnagrams} className="btn btn-primary">🔠 Group Anagram Clusters</button>
              )}

              {currentModule === 'binary-search-tree' && (
                <>
                  <button onClick={() => runBSTTraverse('inorder')} className="btn btn-primary">🌲 Inorder (Sorted)</button>
                  <button onClick={() => runBSTTraverse('preorder')} className="btn btn-secondary">Preorder</button>
                  <button onClick={() => runBSTTraverse('bfs')} className="btn btn-secondary">BFS Level-Order</button>
                </>
              )}

              {currentModule === 'avl-tree' && (
                <>
                  <input type="number" value={customInput} onChange={(e) => setCustomInput(e.target.value)} className="input-field w-16" placeholder="Val" />
                  <button onClick={runTreeInsert} className="btn btn-primary">🌲 Insert & Balance</button>
                </>
              )}

              {currentModule === 'tree-lca' && (
                <button onClick={runTreeLCA} className="btn btn-primary">🎯 Find LCA (P=20, Q=40)</button>
              )}

              {currentModule === 'min-max-heap' && (
                <>
                  <button onClick={runHeapSort} className="btn btn-primary">⚡ Build & Sift Heap</button>
                  <button onClick={() => generateArray('random')} className="btn btn-secondary">🎲 Random</button>
                </>
              )}

              {currentModule === 'top-k-elements' && (
                <>
                  <input type="number" value={customInput} onChange={(e) => setCustomInput(e.target.value)} className="input-field w-16" placeholder="K=2" />
                  <button onClick={runTopKElements} className="btn btn-primary">📊 Find Top K Elements</button>
                </>
              )}

              {currentModule === 'graph-bfs-dfs' && (
                <>
                  <button onClick={runGraphBFS} className="btn btn-primary">🌊 Run BFS (Queue)</button>
                  <button onClick={runGraphDFS} className="btn btn-secondary">🌲 Run DFS (Stack)</button>
                </>
              )}

              {currentModule === 'disjoint-set' && (
                <button onClick={runDisjointSet} className="btn btn-primary">🔗 Connected Components (DSU)</button>
              )}

              {currentModule === 'dijkstra' && (
                <button onClick={runDijkstra} className="btn btn-primary">📍 Find Shortest Path (A ➔ F)</button>
              )}

              {currentModule === 'bellman-ford' && (
                <button onClick={runBellmanFord} className="btn btn-primary">⚠️ Run Bellman-Ford</button>
              )}

              {currentModule === 'floyd-warshall' && (
                <button onClick={runFloydWarshall} className="btn btn-primary">🌐 Run Floyd-Warshall (All-Pairs)</button>
              )}

              {currentModule === 'topological-sort' && (
                <button onClick={runTopologicalSort} className="btn btn-primary">📊 Kahn's Topological Sort</button>
              )}

              {currentModule === 'n-queens' && (
                <button onClick={runNQueens} className="btn btn-primary">👑 Backtrack 4-Queens</button>
              )}

              {currentModule === 'subsets-permutations' && (
                <button onClick={runSubsets} className="btn btn-primary">📦 Generate 2ᴺ Power Set</button>
              )}

              {currentModule === 'word-search' && (
                <>
                  <input type="text" value={customInput} onChange={(e) => setCustomInput(e.target.value)} className="input-field w-24" placeholder="ABCCED" />
                  <button onClick={runWordSearch} className="btn btn-primary">🔍 Backtrack Word Search</button>
                </>
              )}

              {currentModule === 'coin-change' && (
                <button onClick={runCoinChange} className="btn btn-primary">🪙 Find Minimum Coins (DP)</button>
              )}

              {currentModule === 'house-robber' && (
                <button onClick={runHouseRobber} className="btn btn-primary">🏠 Maximize Loot (1D DP)</button>
              )}

              {currentModule === 'knapsack' && (
                <button onClick={runKnapsack} className="btn btn-primary">🎒 Solve 0/1 Knapsack</button>
              )}

              {currentModule === 'lcs' && (
                <button onClick={runLcs} className="btn btn-primary">🧬 Animate LCS Matrix</button>
              )}

              {currentModule === 'edit-distance' && (
                <button onClick={runEditDist} className="btn btn-primary">✍️ Animate Edit Distance</button>
              )}

              {currentModule === 'grid-paths' && (
                <button onClick={runGridPaths} className="btn btn-primary">🧭 Animate Unique Paths</button>
              )}

              {currentModule === 'lis' && (
                <button onClick={runLis} className="btn btn-primary">📈 Animate O(N log N) Patience Sorting</button>
              )}
            </ControlsBar>

            {/* Stage Canvas Area */}
            <section className="visualizer-stage">
              <div className="canvas-wrapper">
                {/* 1. Complexity */}
                {currentModule === 'big-o-curves' && (
                  <ComplexityChartVisualizer 
                    sliderN={currentCurvesN}
                    onSliderChange={(newN) => {
                      setStepIndex(newN - 1);
                      setIsPlaying(false);
                    }}
                  />
                )}

                {/* 2. Core Data Structures */}
                {currentModule === 'ds-arrays' && (
                  <ArrayVisualizer
                    mode="dataStructure"
                    array={currentStep?.array || dsArray}
                    capacity={currentStep?.capacity || dsCapacity}
                    activeIdx={currentStep?.activeIdx !== undefined ? currentStep.activeIdx : dsActiveIdx}
                    opType={currentStep?.opType || dsOpType}
                    message={currentStep?.explanation || 'Interactive Contiguous Dynamic Array Buffer'}
                  />
                )}

                {currentModule === 'ds-stack' && (
                  <StackQueueVisualizer
                    mode="stack"
                    items={stackItems}
                    message={currentStep?.explanation || 'LIFO Vertical Stack Tube (Top Pointer Access)'}
                  />
                )}

                {currentModule === 'ds-queue' && (
                  <StackQueueVisualizer
                    mode="queue"
                    items={queueItems}
                    message={currentStep?.explanation || 'FIFO Horizontal Pipeline (Front Dequeue & Rear Enqueue)'}
                  />
                )}

                {currentModule === 'ds-hash-tables' && (
                  <HashTableVisualizer
                    mode="chaining"
                    buckets={currentStep?.buckets || hashTableState.buckets}
                    activeKey={currentStep?.key}
                    activeHash={currentStep?.hashIdx}
                    message={currentStep?.explanation || '8-Bucket Hash Table with Separate Chaining & Rolling Hash'}
                  />
                )}

                {currentModule === 'ds-trees' && (
                  <TreeVisualizer
                    type={treeMode}
                    treeData={treeMode === 'avl' ? avlState : bstState}
                    highlights={currentStep?.currentNode !== undefined ? [currentStep.currentNode] : []}
                    message={currentStep?.explanation || 'Binary Search Tree & Balanced AVL. Use traversal buttons above.'}
                  />
                )}

                {currentModule === 'ds-heaps' && (
                  <HeapVisualizer
                    heap={currentStep?.heap || heapArray}
                    isMinHeap={isMinHeap}
                    activeIndices={currentStep?.active || heapActiveIndices}
                    swappingIndices={currentStep?.swapping || heapSwappingIndices}
                    message={currentStep?.explanation || 'Dual Synchronized Min/Max Heap: Complete Binary Tree & 1D Array Buffer.'}
                  />
                )}

                {currentModule === 'ds-graphs' && (
                  <GraphVisualizer
                    mode="graph"
                    nodes={graphNodes}
                    edges={graphEdges}
                    activeNode={currentStep?.node || currentStep?.current || currentStep?.from}
                    highlightedEdges={
                      currentStep?.from && currentStep?.to
                        ? [{ from: currentStep.from, to: currentStep.to }]
                        : currentStep?.highlightedEdges || []
                    }
                    visitedNodes={currentStep?.visited || []}
                    shortestPath={currentStep?.path || []}
                    distances={currentStep?.distances}
                    showAdjacencyList={true}
                    message={currentStep?.explanation || 'Graph Data Structure with side-by-side Adjacency List.'}
                  />
                )}

                {/* 3. Algorithms: Arrays & Strings & Sorting */}
                {(currentModule === 'two-pointers' ||
                  currentModule === 'sliding-window' ||
                  currentModule === 'prefix-sum' ||
                  currentModule === 'kadane' ||
                  currentModule === 'bubble-sort' ||
                  currentModule === 'selection-sort' ||
                  currentModule === 'insertion-sort' ||
                  currentModule === 'merge-sort' ||
                  currentModule === 'quick-sort' ||
                  currentModule === 'heap-sort' ||
                  currentModule === 'counting-sort' ||
                  currentModule === 'quick-select') && (
                  <ArrayVisualizer
                    mode="bars"
                    array={currentStep?.array || sortArray}
                    highlights={currentStep?.highlights || (currentStep?.left !== undefined && currentStep?.right !== undefined ? [currentStep.left, currentStep.right] : [])}
                    pivot={currentStep?.pivot !== undefined ? currentStep.pivot : null}
                    minIdx={currentStep?.minIdx !== undefined ? currentStep.minIdx : null}
                    comparingIdx={currentStep?.comparingIdx !== undefined ? currentStep.comparingIdx : null}
                    range={currentStep?.window || (currentStep?.windowStart !== undefined ? [currentStep.windowStart, currentStep.windowEnd] : null)}
                    heapSize={currentStep?.heapSize !== undefined ? currentStep.heapSize : null}
                    sortedBoundary={currentStep?.sortedBoundary !== undefined ? currentStep.sortedBoundary : null}
                    sortedIndices={currentStep?.sortedIndices || null}
                    title={currentStep?.title || null}
                    subtitle={currentStep?.subtitle || null}
                    legend={currentStep?.legend || null}
                    message={currentStep?.explanation || currentStep?.message || 'Click action button above to start.'}
                  />
                )}

                {currentModule === 'radix-sort' && (
                  <ArrayVisualizer
                    mode={currentStep?.buckets ? "radix" : "bars"}
                    array={currentStep?.array || sortArray}
                    buckets={currentStep?.buckets || null}
                    digitPlace={currentStep?.digitPlace || null}
                    message={currentStep?.explanation || 'Click "Run Radix Sort (LSD)" to start.'}
                  />
                )}

                {currentModule === 'binary-search' && (
                  <ArrayVisualizer
                    mode="binarySearch"
                    array={[1, 3, 5, 7, 9, 11, 13, 15, 17]}
                    low={currentStep?.low}
                    high={currentStep?.high}
                    mid={currentStep?.mid}
                    target={parseInt(customInput) || 7}
                    message={currentStep?.explanation || currentStep?.message || 'Click "Standard Search"'}
                  />
                )}

                {/* 3. Linked Lists */}
                {(currentModule === 'singly-linked-list' || currentModule === 'doubly-linked-list' || currentModule === 'reverse-linked-list' || currentModule === 'fast-slow-pointers' || currentModule === 'merge-linked-lists') && (
                  <LinkedListVisualizer
                    nodes={currentStep?.array || currentStep?.merged || linkedListNodes}
                    isDoubly={currentModule === 'doubly-linked-list'}
                    activePointers={
                      currentStep?.currIdx !== undefined
                        ? { [currentStep.currIdx]: ['Curr'], ...(currentStep.currIdx > 0 ? { [currentStep.currIdx - 1]: ['Prev'] } : {}) }
                        : currentStep?.slow !== undefined
                        ? { [currentStep.slow]: ['Slow'], [currentStep.fast]: ['Fast'] }
                        : { 0: ['Head'], [linkedListNodes.length - 1]: ['Tail'] }
                    }
                    highlightedIndices={currentStep?.currIdx !== undefined ? [currentStep.currIdx] : []}
                    message={currentStep?.explanation || 'Click action button above to animate.'}
                  />
                )}

                {/* 3. Stack & Queue patterns */}
                {currentModule === 'stack' && (
                  <StackQueueVisualizer mode="stack" items={stackItems} message="LIFO Vertical Stack Tube" />
                )}

                {currentModule === 'queue' && (
                  <StackQueueVisualizer mode="queue" items={queueItems} message="FIFO Horizontal Pipeline" />
                )}

                {currentModule === 'monotonic-stack' && (
                  <StackQueueVisualizer
                    mode="monotonic"
                    items={currentStep?.stack || []}
                    monotonicInput={currentStep?.input || [2, 1, 2, 4, 3]}
                    monotonicResult={currentStep?.result || []}
                    currentIdx={currentStep?.currentIdx}
                    resolvedIdx={currentStep?.resolvedIdx}
                    message={currentStep?.explanation || 'Click "Standard [2,1,2,4,3]"'}
                  />
                )}

                {/* 3. Hash Tables patterns */}
                {currentModule === 'hash-map' && (
                  <HashTableVisualizer
                    mode="chaining"
                    buckets={currentStep?.buckets || hashTableState.buckets}
                    activeKey={currentStep?.key}
                    activeHash={currentStep?.hashIdx}
                    message={currentStep?.explanation || '8-Bucket Hash Table with Separate Chaining'}
                  />
                )}

                {currentModule === 'frequency-counter' && (
                  <HashTableVisualizer
                    mode="anagrams"
                    words={currentStep?.input || ['a', 'b', 'a', 'c', 'b', 'a', 'd', 'b']}
                    activeWord={currentStep?.item}
                    anagramGroups={
                      currentStep?.freq
                        ? Object.fromEntries(Object.entries(currentStep.freq).map(([k, v]) => [k, Array(v).fill(k)]))
                        : { a: ['a', 'a', 'a'], b: ['b', 'b', 'b'], c: ['c'], d: ['d'] }
                    }
                    message={currentStep?.explanation || 'Frequency Counter mapping values to occurrence frequencies'}
                  />
                )}

                {currentModule === 'two-sum-hash' && (
                  <HashTableVisualizer
                    mode="twoSum"
                    nums={currentStep?.nums || [2, 7, 11, 15]}
                    target={currentStep?.target || (parseInt(customInput) || 9)}
                    currentIdx={currentStep?.currentIdx}
                    complement={currentStep?.complement}
                    matchIndices={currentStep?.indices}
                    twoSumMap={currentStep?.map || {}}
                    message={currentStep?.explanation || 'Two Sum Hash Map lookup in O(N)'}
                  />
                )}

                {currentModule === 'group-anagrams' && (
                  <HashTableVisualizer
                    mode="anagrams"
                    words={currentStep?.words || ['eat', 'tea', 'tan', 'ate', 'nat', 'bat']}
                    activeWord={currentStep?.activeWord}
                    anagramGroups={currentStep?.groups || {}}
                    message={currentStep?.explanation || 'Group Anagrams by canonical sorted keys'}
                  />
                )}

                {/* 3. Trees & BST algorithms */}
                {currentModule === 'binary-search-tree' && (
                  <TreeVisualizer
                    type="bst"
                    treeData={bstState}
                    highlights={currentStep?.currentNode !== undefined ? [currentStep.currentNode] : []}
                    message={currentStep?.explanation || 'Click traversal buttons above to animate.'}
                  />
                )}

                {currentModule === 'avl-tree' && (
                  <TreeVisualizer
                    type="avl"
                    treeData={avlState}
                    highlights={currentStep?.rotations ? [currentStep.value] : []}
                    message={currentStep?.explanation || 'Balanced AVL Tree. Insert a value above.'}
                  />
                )}

                {currentModule === 'tree-lca' && (
                  <TreeVisualizer
                    type="bst"
                    treeData={bstState}
                    highlights={currentStep?.currentNode !== undefined ? [currentStep.currentNode] : []}
                    message={currentStep?.explanation || 'Click "Find LCA (P=20, Q=40)" to trace common ancestor.'}
                  />
                )}

                {/* 3. Heaps algorithms */}
                {currentModule === 'top-k-elements' && (
                  <ArrayVisualizer
                    mode="bars"
                    array={currentStep?.heap?.map(x => x.val) || [1, 2]}
                    highlights={[]}
                    message={currentStep?.explanation || 'Top K Frequent Elements streaming into bounded Min-Heap'}
                  />
                )}

                {/* 3. Graphs algorithms */}
                {(currentModule === 'graph-bfs-dfs' || currentModule === 'disjoint-set' || currentModule === 'dijkstra' || currentModule === 'bellman-ford' || currentModule === 'topological-sort') && (
                  <GraphVisualizer
                    mode="graph"
                    nodes={graphNodes}
                    edges={graphEdges}
                    activeNode={currentStep?.node || currentStep?.current || currentStep?.from}
                    highlightedEdges={
                      currentStep?.highlightedEdges && currentStep.highlightedEdges.length > 0
                        ? currentStep.highlightedEdges
                        : currentStep?.from && currentStep?.to
                        ? [{ from: currentStep.from, to: currentStep.to }]
                        : []
                    }
                    visitedNodes={currentStep?.visited || []}
                    shortestPath={currentStep?.path || (currentStep?.order && currentStep.order.length > 1 ? currentStep.order : [])}
                    distances={currentStep?.distances}
                    showAdjacencyList={true}
                    message={currentStep?.explanation || 'Click button above to start graph algorithm.'}
                  />
                )}

                {currentModule === 'floyd-warshall' && (
                  <div className="flex flex-col items-center w-full gap-4">
                    <GraphVisualizer
                      mode="graph"
                      nodes={graphNodes}
                      edges={graphEdges}
                      activeNode={currentStep?.node}
                      highlightedEdges={
                        currentStep?.from && currentStep?.to
                          ? [{ from: currentStep.from, to: currentStep.to }]
                          : []
                      }
                      showAdjacencyList={false}
                      message={currentStep?.explanation || 'Click "Run Floyd-Warshall"'}
                    />
                    <DPVisualizer
                      matrix={
                        currentStep?.matrix
                          ? currentStep.matrix.map(row => row.map(v => v === Infinity ? '∞' : v))
                          : [['0', '5', '8', '9'], ['∞', '0', '3', '4'], ['∞', '∞', '0', '1'], ['∞', '∞', '∞', '0']]
                      }
                      rowHeaders={['From A (0)', 'From B (1)', 'From C (2)', 'From D (3)']}
                      colHeaders={['To A (0)', 'To B (1)', 'To C (2)', 'To D (3)']}
                      activeCell={currentStep && currentStep.i !== null && currentStep.j !== null && currentStep.i !== undefined ? [currentStep.i, currentStep.j] : null}
                      formulaText={currentStep?.explanation || 'dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])'}
                    />
                  </div>
                )}

                {/* 3. Backtracking algorithms */}
                {currentModule === 'n-queens' && (
                  <BacktrackingVisualizer
                    mode="n-queens"
                    board={currentStep?.board || Array.from({ length: 4 }, () => new Array(4).fill('.'))}
                    currentRow={currentStep?.row}
                    currentCol={currentStep?.col}
                    solutionCount={currentStep?.solutionCount || 0}
                    message={currentStep?.explanation || 'Click "Backtrack 4-Queens" to solve.'}
                  />
                )}

                {currentModule === 'subsets-permutations' && (
                  <BacktrackingVisualizer
                    mode="subsets"
                    subsets={currentStep?.result || []}
                    message={currentStep?.explanation || 'Click "Generate 2ᴺ Power Set"'}
                  />
                )}

                {currentModule === 'word-search' && (
                  <BacktrackingVisualizer
                    mode="word-search"
                    board={
                      currentStep?.board || [
                        ['A', 'B', 'C', 'E'],
                        ['S', 'F', 'C', 'S'],
                        ['A', 'D', 'E', 'E']
                      ]
                    }
                    word={currentStep?.word || 'ABCCED'}
                    wordPath={currentStep?.path || []}
                    message={currentStep?.explanation || 'Click "Backtrack Word Search" to solve.'}
                  />
                )}

                {/* 3. Dynamic Programming algorithms */}
                {currentModule === 'coin-change' && (
                  <DPVisualizer
                    matrix={[currentStep?.dp || new Array(12).fill(0)]}
                    rowHeaders={['Min Coins']}
                    colHeaders={Array.from({ length: 12 }, (_, i) => `A=${i}`)}
                    activeCell={currentStep?.amountTarget !== undefined ? [0, currentStep.amountTarget] : null}
                    formulaText={currentStep?.explanation || 'Click "Find Minimum Coins (DP)"'}
                  />
                )}

                {currentModule === 'house-robber' && (
                  <DPVisualizer
                    matrix={[currentStep?.dp || [2, 7, 11, 11, 12]]}
                    rowHeaders={['Max Loot $']}
                    colHeaders={['H0 ($2)', 'H1 ($7)', 'H2 ($9)', 'H3 ($3)', 'H4 ($1)']}
                    activeCell={currentStep?.house !== undefined ? [0, currentStep.house] : null}
                    formulaText={currentStep?.explanation || 'Click "Maximize Loot (1D DP)"'}
                  />
                )}

                {currentModule === 'knapsack' && (
                  <DPVisualizer
                    matrix={currentStep?.dpState || Array.from({ length: 5 }, () => new Array(6).fill(0))}
                    rowHeaders={['Base (0)', 'Item 1 (w:2, v:3)', 'Item 2 (w:3, v:4)', 'Item 3 (w:4, v:5)', 'Item 4 (w:5, v:6)']}
                    colHeaders={['W=0', 'W=1', 'W=2', 'W=3', 'W=4', 'W=5']}
                    activeCell={currentStep ? [currentStep.i, currentStep.w] : null}
                    formulaText={currentStep?.explanation || 'Click "Solve 0/1 Knapsack"'}
                  />
                )}

                {currentModule === 'lcs' && (
                  <DPVisualizer
                    matrix={currentStep?.dpState || Array.from({ length: 8 }, () => new Array(6).fill(0))}
                    rowHeaders={['Ø', 'A', 'B', 'C', 'B', 'D', 'A', 'B']}
                    colHeaders={['Ø', 'B', 'D', 'C', 'A', 'B']}
                    activeCell={currentStep ? [currentStep.i, currentStep.j] : null}
                    formulaText={currentStep?.explanation || 'Click "Animate LCS Matrix"'}
                  />
                )}

                {currentModule === 'edit-distance' && (
                  <DPVisualizer
                    matrix={currentStep?.dpState || Array.from({ length: 6 }, () => new Array(4).fill(0))}
                    rowHeaders={['Ø', 'h', 'o', 'r', 's', 'e']}
                    colHeaders={['Ø', 'r', 'o', 's']}
                    activeCell={currentStep && currentStep.i !== undefined ? [currentStep.i, currentStep.j] : null}
                    formulaText={currentStep?.explanation || 'Click "Animate Edit Distance"'}
                  />
                )}

                {currentModule === 'grid-paths' && (
                  <DPVisualizer
                    matrix={currentStep?.matrix || Array.from({ length: 4 }, () => new Array(5).fill(1))}
                    rowHeaders={['R0', 'R1', 'R2', 'R3']}
                    colHeaders={['C0', 'C1', 'C2', 'C3', 'C4']}
                    activeCell={currentStep?.r !== undefined ? [currentStep.r, currentStep.c] : null}
                    formulaText={currentStep?.explanation || 'Click "Animate Unique Paths"'}
                  />
                )}

                {currentModule === 'lis' && (
                  <ArrayVisualizer
                    mode="bars"
                    array={currentStep?.tails || [10, 9, 2, 5, 3, 7, 101, 18]}
                    highlights={currentStep ? [currentStep.pos] : []}
                    message={currentStep?.explanation || 'Click "Animate O(N log N) Patience Sorting"'}
                  />
                )}
              </div>
            </section>

            {/* Code & Interview Cheatsheet Tabs */}
            <CodeCheatsheet 
              code={moduleData.code}
              cheatsheetHtml={moduleData.cheatsheet}
            />
          </div>
        )}
      </main>

      {/* In-browser Test Runner Modal */}
      <TestRunnerModal 
        isOpen={isTestModalOpen}
        onClose={() => setIsTestModalOpen(false)}
      />
    </div>
  );
}
