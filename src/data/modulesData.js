/**
 * Zealous™ DSA Master Suite - Complete Knowledge Base & Modular Architecture
 * Subgrouped into:
 *   1. Complexity Analysis
 *   2. Data Structures (Arrays, Stack, Queue, Hash Tables, Trees, Heaps, Graphs)
 *   3. Algorithms (Arrays & Strings, Sorting, Linked Lists, Stack & Hash, Tree & Heap, Graphs, Backtracking, DP)
 */

// Real Implementation Source Code Imports (Vite ?raw)
import dynamicArrayRaw from '../structures/dynamic-array.js?raw';
import stackQueueRaw from '../structures/stack-queue.js?raw';
import hashTableRaw from '../structures/hash-table.js?raw';
import binaryTreeRaw from '../structures/binary-tree.js?raw';
import avlTreeRaw from '../structures/avl-tree.js?raw';
import minMaxHeapRaw from '../structures/min-max-heap.js?raw';
import disjointSetRaw from '../structures/disjoint-set.js?raw';
import singlyLinkedListRaw from '../structures/singly-linked-list.js?raw';
import doublyLinkedListRaw from '../structures/doubly-linked-list.js?raw';

import twoPointersRaw from '../algorithms/arrays-strings/two-pointers.js?raw';
import slidingWindowRaw from '../algorithms/arrays-strings/sliding-window.js?raw';
import prefixSumRaw from '../algorithms/arrays-strings/prefix-sum.js?raw';
import kadaneRaw from '../algorithms/arrays-strings/kadane.js?raw';
import binarySearchRaw from '../algorithms/sorting-searching/binary-search.js?raw';
import elementarySortsRaw from '../algorithms/sorting-searching/elementary-sorts.js?raw';
import mergeSortRaw from '../algorithms/sorting-searching/merge-sort.js?raw';
import quickSortRaw from '../algorithms/sorting-searching/quick-sort.js?raw';
import heapSortRaw from '../algorithms/sorting-searching/heap-sort.js?raw';
import radixSortRaw from '../algorithms/sorting-searching/radix-sort.js?raw';
import quickSelectRaw from '../algorithms/sorting-searching/quick-select.js?raw';

import dijkstraRaw from '../algorithms/graph/dijkstra.js?raw';
import bellmanFordRaw from '../algorithms/graph/bellman-ford.js?raw';
import floydWarshallRaw from '../algorithms/graph/floyd-warshall.js?raw';
import topologicalSortRaw from '../algorithms/graph/topological-sort.js?raw';

import nQueensRaw from '../algorithms/backtracking/n-queens.js?raw';
import subsetsRaw from '../algorithms/backtracking/backtracking-subsets.js?raw';
import wordSearchRaw from '../algorithms/backtracking/word-search.js?raw';

import coinChangeRaw from '../algorithms/dp/coin-change.js?raw';
import houseRobberRaw from '../algorithms/dp/house-robber.js?raw';
import knapsackRaw from '../algorithms/dp/knapsack.js?raw';
import lcsRaw from '../algorithms/dp/lcs.js?raw';
import editDistanceRaw from '../algorithms/dp/edit-distance.js?raw';
import gridPathsRaw from '../algorithms/dp/grid-paths.js?raw';
import lisRaw from '../algorithms/dp/lis.js?raw';

const bigOCurvesRaw = `/**
 * Big-O Asymptotic Complexity Curves & Mathematical Growth Rates
 * 
 * Growth Hierarchy:
 * O(1) < O(log N) < O(N) < O(N log N) < O(N²) < O(2ᴺ) < O(N!)
 */

export function computeComplexityValues(n) {
  return {
    O_1: 1,
    O_logN: Math.log2(Math.max(1, n)),
    O_N: n,
    O_NlogN: n * Math.log2(Math.max(1, n)),
    O_N2: n * n,
    O_2N: n <= 24 ? Math.pow(2, n) : Infinity
  };
}

export function compareAsymptoticGrowth(n1 = 16, n2 = 32) {
  const v1 = computeComplexityValues(n1);
  const v2 = computeComplexityValues(n2);

  return {
    inputDoubled: { from: n1, to: n2 },
    linearMultiplier: v2.O_N / v1.O_N,         // 2x
    quadraticMultiplier: v2.O_N2 / v1.O_N2,     // 4x (Doubling N quadruples N²)
    exponentialMultiplier: v2.O_2N / v1.O_2N    // 65,536x (Doubling N squares 2ᴺ)
  };
}
`;

export const SUBGROUPS = [
  {
    id: 'complexity-group',
    title: '1. Complexity Analysis',
    icon: 'Activity',
    badge: 'Theory & Bounds',
    categories: [
      {
        id: 'complexity',
        title: 'Complexity Analysis',
        icon: 'Activity',
        items: [
          { id: 'big-o-curves', title: 'Big-O Growth Curves', icon: 'TrendingUp', tag: 'O(1) to O(N!)' }
        ]
      }
    ]
  },
  {
    id: 'data-structures-group',
    title: '2. Data Structures',
    icon: 'Database',
    badge: 'Structure & Methods',
    categories: [
      {
        id: 'data-structures',
        title: 'Core Data Structures',
        icon: 'Database',
        items: [
          { id: 'ds-arrays', title: 'Arrays (Dynamic & Fixed)', icon: 'AlignJustify', tag: 'Contiguous' },
          { id: 'ds-stack', title: 'Stack (LIFO)', icon: 'ArrowDown', tag: 'LIFO Tube' },
          { id: 'ds-queue', title: 'Queue & Deque (FIFO)', icon: 'ArrowRight', tag: 'FIFO Pipeline' },
          { id: 'ds-hash-tables', title: 'Hash Tables (Separate Chaining)', icon: 'Hash', tag: 'Key-Value O(1)' },
          { id: 'ds-trees', title: 'Trees & BST (AVL)', icon: 'Network', tag: 'Hierarchical' },
          { id: 'ds-heaps', title: 'Heaps & Priority Queue', icon: 'Mountain', tag: 'Min/Max Heap' },
          { id: 'ds-graphs', title: 'Graphs (Adjacency List)', icon: 'Share2', tag: 'Network' }
        ]
      }
    ]
  },
  {
    id: 'algorithms-group',
    title: '3. Algorithms',
    icon: 'Cpu',
    badge: 'Patterns & Solvers',
    categories: [
      {
        id: 'arrays-strings',
        title: 'Arrays',
        icon: 'MoveHorizontal',
        items: [
          // { id: 'two-pointers', title: 'Two Pointers (Two Sum)', icon: 'MoveHorizontal' },
          // { id: 'sliding-window', title: 'Sliding Window (Max K)', icon: 'Maximize2' },
          // { id: 'prefix-sum', title: 'Prefix Sum Array', icon: 'PlusSquare' },
          { id: 'kadane', title: "Kadane's Algorithm (Max Subarray)", icon: 'Zap' },
          { id: 'binary-search', title: 'Binary Search & Rotated', icon: 'Search' }
        ]
      },
      {
        id: 'sorting',
        title: 'Sorting Algorithms',
        icon: 'ArrowUpDown',
        items: [
          { id: 'bubble-sort', title: 'Bubble Sort (O(N²))', icon: 'Sparkles' },
          { id: 'selection-sort', title: 'Selection Sort', icon: 'CheckSquare' },
          { id: 'insertion-sort', title: 'Insertion Sort', icon: 'ArrowDownUp' },
          { id: 'merge-sort', title: 'MergeSort (Divide & Conquer)', icon: 'Shuffle' },
          { id: 'quick-sort', title: 'QuickSort (3-Way / Hoare)', icon: 'Zap' },
          { id: 'heap-sort', title: 'HeapSort (In-Place)', icon: 'Layers' },
          // { id: 'counting-sort', title: 'Counting Sort (Linear)', icon: 'BarChart2' },
          // { id: 'radix-sort', title: 'Radix Sort (Linear LSD)', icon: 'Binary' }
        ]
      },
      {
        id: 'linked-lists',
        title: 'Linked Lists',
        icon: 'Link',
        items: [
          { id: 'singly-linked-list', title: 'Singly Linked List', icon: 'ArrowRight' },
          { id: 'doubly-linked-list', title: 'Doubly Linked List', icon: 'MoveHorizontal' },
          // { id: 'reverse-linked-list', title: 'Reverse Linked List', icon: 'RotateCcw' },
          // { id: 'fast-slow-pointers', title: 'Fast & Slow (Cycle / Mid)', icon: 'Eye' },
          { id: 'merge-linked-lists', title: 'Merge Two Sorted Lists', icon: 'GitMerge' }
        ]
      },
      {
        id: 'stack-hash-patterns',
        title: 'Stack & Hash Patterns',
        icon: 'Key',
        items: [
          // { id: 'monotonic-stack', title: 'Monotonic Stack (Next Greater)', icon: 'BarChart' },
          { id: 'two-sum-hash', title: 'Two Sum (Hash Map)', icon: 'Key' },
          { id: 'group-anagrams', title: 'Group Anagrams', icon: 'Copy' },
          { id: 'frequency-counter', title: 'Frequency Counter Pattern', icon: 'BarChart' }
        ]
      },
      {
        id: 'tree-heap-algo',
        title: 'Tree & Heap Algorithms',
        icon: 'GitFork',
        items: [
          { id: 'tree-lca', title: 'Lowest Common Ancestor (LCA)', icon: 'CornerDownRight' },
          { id: 'top-k-elements', title: 'Top K Frequent Elements (Heap)', icon: 'BarChart' },
          { id: 'quick-select', title: 'QuickSelect (K-th Element)', icon: 'Target' }
        ]
      },
      {
        id: 'graph-algo',
        title: 'Graph Algorithms',
        icon: 'Share2',
        items: [
          { id: 'dijkstra', title: "Dijkstra's Shortest Path", icon: 'Milestone' },
          { id: 'bellman-ford', title: 'Bellman-Ford (Negative Weights)', icon: 'AlertTriangle' },
          // { id: 'floyd-warshall', title: 'Floyd-Warshall (All-Pairs)', icon: 'Grid' },
          // { id: 'topological-sort', title: 'Topological Sort & Cycles', icon: 'Workflow' },
          // { id: 'disjoint-set', title: 'Disjoint Set (Union-Find)', icon: 'Link2' }
        ]
      },
      {
        id: 'backtracking',
        title: 'Recursion & Backtracking',
        icon: 'RotateCw',
        items: [
          { id: 'n-queens', title: 'N-Queens (8x8 Chessboard)', icon: 'Crown' },
          { id: 'subsets-permutations', title: 'Subsets & Permutations', icon: 'Boxes' },
          // { id: 'word-search', title: 'Word Search (2D Grid DFS)', icon: 'Search' }
        ]
      },
      {
        id: 'dynamic-programming',
        title: 'Dynamic Programming',
        icon: 'Grid',
        items: [
          { id: 'coin-change', title: 'Coin Change (Min Coins)', icon: 'Coins' },
          { id: 'house-robber', title: 'House Robber (1D DP)', icon: 'Home' },
          // { id: 'knapsack', title: '0/1 Knapsack (2D DP)', icon: 'Briefcase' },
          // { id: 'lcs', title: 'Longest Common Subsequence', icon: 'Dna' },
          // { id: 'edit-distance', title: 'Edit Distance (Levenshtein)', icon: 'Edit3' },
          { id: 'grid-paths', title: 'Grid Unique Paths', icon: 'Compass' },
          // { id: 'lis', title: 'LIS (O(N log N) Fast)', icon: 'TrendingUp' }
        ]
      }
    ]
  }
];

export const CATEGORIES = SUBGROUPS.flatMap(g => g.categories);

export const MODULES = {
  // ==========================================
  // 1. COMPLEXITY ANALYSIS
  // ==========================================
  'big-o-curves': {
    title: 'Big-O Growth Curves & Asymptotic Analysis',
    category: '1. Complexity Analysis',
    description: 'Asymptotic notation (O, Ω, Θ), comparing growth rates from constant O(1) to factorial O(N!).',
    timeAvg: 'O(1) to O(N!)',
    timeWorst: 'Comparative',
    space: 'O(1)',
    code: bigOCurvesRaw,
    cheatsheet: `
      <h3>Asymptotic Hierarchy</h3>
      <ul>
        <li><code>O(1) < O(log N) < O(√N) < O(N) < O(N log N) < O(N²) < O(2ᴺ) < O(N!)</code></li>
        <li><strong>Big-O (O):</strong> Upper bound (worst-case asymptotic guarantee).</li>
        <li><strong>Big-Omega (Ω):</strong> Lower bound (best-case asymptotic baseline).</li>
        <li><strong>Big-Theta (Θ):</strong> Tight bound (exact asymptotic behavior when O and Ω match).</li>
      </ul>
    `
  },

  // ==========================================
  // 2. DATA STRUCTURES
  // ==========================================
  'ds-arrays': {
    title: 'Arrays (Dynamic & Fixed Contiguous Memory)',
    category: '2. Data Structures',
    description: 'A contiguous sequence of elements in memory. Direct index access via pointer arithmetic in O(1) time.',
    timeAvg: 'O(1) Access / O(N) Insert / O(N) Delete',
    timeWorst: 'O(N)',
    space: 'O(N) contiguous buffer',
    code: dynamicArrayRaw,
    cheatsheet: `
      <h3>Contiguous Memory & Direct Addressing</h3>
      <ul>
        <li><strong>Formula:</strong> <code>Address(arr[i]) = BaseAddress + i × sizeof(DataType)</code> (Executed in $O(1)$ CPU cycles).</li>
        <li><strong>Amortized Push:</strong> Doubling buffer capacity when full bounds cumulative cost: $\\sum (N / 2^i) < 2N = O(1)$ amortized.</li>
        <li><strong>Costly Operations:</strong> Insertion/Deletion at index $0$ takes $O(N)$ because all $N$ elements must be shifted.</li>
      </ul>
    `
  },
  'ds-stack': {
    title: 'Stack Data Structure (LIFO)',
    category: '2. Data Structures',
    description: 'Last-In First-Out (LIFO) abstract data type with strict O(1) end mutations.',
    timeAvg: 'O(1) Push / Pop / Peek',
    timeWorst: 'O(1)',
    space: 'O(N)',
    code: stackQueueRaw,
    cheatsheet: `
      <h3>LIFO Architecture</h3>
      <ul>
        <li><strong>Push / Pop / Peek:</strong> Strictly $O(1)$ constant time at top pointer index.</li>
        <li><strong>Use Cases:</strong> Function recursion call stacks, undo/redo buffers, expression parsing, DFS backtracking.</li>
      </ul>
    `
  },
  'ds-queue': {
    title: 'Queue & Deque Data Structure (FIFO)',
    category: '2. Data Structures',
    description: 'First-In First-Out (FIFO) pipeline with O(1) enqueue and dequeue operations.',
    timeAvg: 'O(1) Enqueue & Dequeue',
    timeWorst: 'O(1)',
    space: 'O(N)',
    code: stackQueueRaw,
    cheatsheet: `
      <h3>FIFO Pipeline Invariants</h3>
      <ul>
        <li><strong>Circular Buffer:</strong> <code>head = (head + 1) % capacity</code> avoids shifting array elements.</li>
        <li><strong>Use Cases:</strong> BFS traversals, task scheduling, asynchronous job queues, printer spoolers.</li>
      </ul>
    `
  },
  'ds-hash-tables': {
    title: 'Hash Tables (Separate Chaining)',
    category: '2. Data Structures',
    description: 'Key-value associative store mapping keys to indices via a rolling polynomial hash function with collision chaining.',
    timeAvg: 'O(1) Average Lookup / Put / Delete',
    timeWorst: 'O(N) with all collisions',
    space: 'O(N + M) buckets',
    code: hashTableRaw,
    cheatsheet: `
      <h3>Separate Chaining Invariants</h3>
      <ul>
        <li><strong>Hash Calculation:</strong> <code>hash(key) = (∑ charCode × 31) % bucketCount</code>.</li>
        <li><strong>Load Factor:</strong> $\\alpha = N / M$. When $\\alpha \\ge 0.75$, table automatically rehashes into doubled capacity.</li>
      </ul>
    `
  },
  'ds-trees': {
    title: 'Trees & Balanced BST (AVL)',
    category: '2. Data Structures',
    description: 'Hierarchical node network enforcing BST invariant (Left < Root < Right) and AVL rotations (|BalanceFactor| ≤ 1).',
    timeAvg: 'O(log N) Balanced Search / Insert / Delete',
    timeWorst: 'O(N) Skewed',
    space: 'O(N)',
    code: binaryTreeRaw,
    cheatsheet: `
      <h3>Hierarchical Tree Invariants</h3>
      <ul>
        <li><strong>BST Rule:</strong> <code>Left.val < Root.val < Right.val</code> for every subtree.</li>
        <li><strong>Inorder Traversal:</strong> Left $\\rightarrow$ Root $\\rightarrow$ Right yields strictly sorted elements in $O(N)$ time.</li>
        <li><strong>AVL Self-Balancing:</strong> Automatically restores balance via LL, RR, LR, RL pointer rotations.</li>
      </ul>
    `
  },
  'ds-heaps': {
    title: 'Heaps & Priority Queue',
    category: '2. Data Structures',
    description: 'Complete binary tree stored efficiently in a 1D array buffer without pointer overhead.',
    timeAvg: 'O(1) Peek / O(log N) Push & Pop',
    timeWorst: 'O(log N)',
    space: 'O(N) 1D buffer',
    code: minMaxHeapRaw,
    cheatsheet: `
      <h3>Zero-Pointer Array Heap Formulas</h3>
      <ul>
        <li><code>Parent(i) = ⌊(i - 1) / 2⌋</code></li>
        <li><code>LeftChild(i) = 2i + 1</code> | <code>RightChild(i) = 2i + 2</code></li>
        <li><strong>Linear Build-Heap:</strong> Bottom-up heapify runs in $O(N)$ time (faster than $N$ individual pushes).</li>
      </ul>
    `
  },
  'ds-graphs': {
    title: 'Graphs (Adjacency List & Network Topology)',
    category: '2. Data Structures',
    description: 'Vertices connected by weighted/unweighted directed/undirected edges represented as an Adjacency List Map.',
    timeAvg: 'O(V + E) Traversals / O(1) Edge Insertion',
    timeWorst: 'O(V + E)',
    space: 'O(V + E)',
    code: dijkstraRaw,
    cheatsheet: `
      <h3>Adjacency List vs Matrix</h3>
      <ul>
        <li><strong>Adjacency List:</strong> Space $O(V + E)$, iterating neighbors in $O(\\text{degree}(v))$. Optimal for sparse graphs.</li>
        <li><strong>Adjacency Matrix:</strong> Space $O(V^2)$, instant edge lookup in $O(1)$. Optimal for dense graphs.</li>
      </ul>
    `
  },

  // ==========================================
  // 3. ALGORITHMS: ARRAYS & STRINGS
  // ==========================================
  'two-pointers': {
    title: 'Two Pointers Technique',
    category: 'Arrays & Two Pointers',
    description: 'Linear search using converging or parallel pointers on sorted/structured collections in O(N) time.',
    timeAvg: 'O(N)',
    timeWorst: 'O(N)',
    space: 'O(1)',
    code: twoPointersRaw,
    cheatsheet: `
      <h3>Two Pointers Invariants</h3>
      <ul>
        <li><strong>Prerequisite:</strong> Array must be sorted (or monotonicity must hold).</li>
        <li><strong>Convergence:</strong> If <code>arr[L] + arr[R] < target</code>, increment <code>L</code>; if greater, decrement <code>R</code>.</li>
      </ul>
    `
  },
  'sliding-window': {
    title: 'Sliding Window Technique',
    category: 'Arrays & Two Pointers',
    description: 'Dynamic range maintenance over contiguous subarrays/substrings, reducing O(N*K) brute force to O(N).',
    timeAvg: 'O(N)',
    timeWorst: 'O(N)',
    space: 'O(1) or O(K)',
    code: slidingWindowRaw,
    cheatsheet: `
      <h3>Sliding Window Pattern</h3>
      <ul>
        <li><strong>Fixed Window:</strong> Slide right pointer and subtract left element exiting the window: <code>sum += arr[R] - arr[R-K]</code>.</li>
        <li><strong>Variable Window:</strong> Expand right pointer to find valid window; shrink left pointer to optimize.</li>
      </ul>
    `
  },
  'prefix-sum': {
    title: 'Prefix Sum Array',
    category: 'Arrays & Two Pointers',
    description: 'Precomputing cumulative sums to answer static range sum queries in O(1) constant time.',
    timeAvg: 'O(1) Query / O(N) Precomputation',
    timeWorst: 'O(1) Query',
    space: 'O(N)',
    code: prefixSumRaw,
    cheatsheet: `
      <h3>Prefix Range Formula</h3>
      <ul>
        <li><code>prefix[i] = prefix[i - 1] + arr[i]</code> (with <code>prefix[0] = 0</code>).</li>
        <li><code>RangeSum(L, R) = prefix[R + 1] - prefix[L]</code> in strictly $O(1)$ time.</li>
      </ul>
    `
  },
  'kadane': {
    title: "Kadane's Algorithm (Max Subarray)",
    category: 'Arrays & Two Pointers',
    description: 'Dynamic programming in O(1) space to find the maximum contiguous subarray sum in a single linear pass.',
    timeAvg: 'O(N)',
    timeWorst: 'O(N)',
    space: 'O(1)',
    code: kadaneRaw,
    cheatsheet: `
      <h3>Kadane Transition</h3>
      <ul>
        <li><code>currMax = Math.max(arr[i], currMax + arr[i])</code></li>
        <li><code>maxSoFar = Math.max(maxSoFar, currMax)</code></li>
      </ul>
    `
  },
  'binary-search': {
    title: 'Binary Search & Rotated Array Search',
    category: 'Arrays & Two Pointers',
    description: 'Logarithmic search halving search space every comparison on sorted and rotated sorted arrays.',
    timeAvg: 'O(log N)',
    timeWorst: 'O(log N)',
    space: 'O(1)',
    code: binarySearchRaw,
    cheatsheet: `
      <h3>Binary Search Guard</h3>
      <ul>
        <li>Use <code>mid = low + Math.floor((high - low) / 2)</code> to prevent 32-bit integer overflow.</li>
        <li>Rotated Array: One half is always sorted. Check if target lies within the sorted half.</li>
      </ul>
    `
  },

  // ==========================================
  // 3. ALGORITHMS: SORTING
  // ==========================================
  'bubble-sort': {
    title: 'Bubble Sort',
    category: 'Sorting Algorithms',
    description: 'Repeatedly swaps adjacent out-of-order elements, bubbling the maximum element to the end.',
    timeAvg: 'O(N²)',
    timeWorst: 'O(N²)',
    space: 'O(1)',
    code: elementarySortsRaw,
    cheatsheet: `<h3>Bubble Sort:</h3> In-place, stable, with early break optimization if no swaps occur.`
  },
  'selection-sort': {
    title: 'Selection Sort',
    category: 'Sorting Algorithms',
    description: 'Finds minimum element in unsorted partition and places it at the beginning. Guarantees at most N swaps.',
    timeAvg: 'O(N²)',
    timeWorst: 'O(N²)',
    space: 'O(1)',
    code: elementarySortsRaw,
    cheatsheet: `<h3>Selection Sort:</h3> Optimal when memory write operations are significantly more expensive than reads.`
  },
  'insertion-sort': {
    title: 'Insertion Sort',
    category: 'Sorting Algorithms',
    description: 'Builds sorted array one element at a time by shifting larger elements right. Adaptive O(N) on nearly-sorted data.',
    timeAvg: 'O(N²)',
    timeWorst: 'O(N²)',
    space: 'O(1)',
    code: elementarySortsRaw,
    cheatsheet: `<h3>Insertion Sort:</h3> Extremely fast for small arrays ($N \\le 16$) and nearly sorted collections.`
  },
  'merge-sort': {
    title: 'MergeSort (Divide & Conquer)',
    category: 'Sorting Algorithms',
    description: 'Guaranteed Θ(N log N) stable sorting dividing array into halves, sorting recursively, and merging.',
    timeAvg: 'Θ(N log N)',
    timeWorst: 'Θ(N log N)',
    space: 'O(N) buffer',
    code: mergeSortRaw,
    cheatsheet: `
      <h3>MergeSort Invariants</h3>
      <ul>
        <li>Recurrence: $T(N) = 2T(N/2) + O(N) = \\Theta(N \\log N)$.</li>
        <li>Guaranteed performance; strictly stable for reference types.</li>
      </ul>
    `
  },
  'quick-sort': {
    title: 'QuickSort (Lomuto & 3-Way DNF)',
    category: 'Sorting Algorithms',
    description: 'In-place divide-and-conquer partitioning around a pivot. Dutch National Flag handles duplicate keys in O(N).',
    timeAvg: 'O(N log N)',
    timeWorst: 'O(N²)',
    space: 'O(log N) stack',
    code: quickSortRaw,
    cheatsheet: `
      <h3>QuickSort Partitioning</h3>
      <ul>
        <li><strong>Lomuto Partition:</strong> Single directional scan; simple but degrades on duplicates.</li>
        <li><strong>3-Way DNF Partition:</strong> Divides into <code>[< pivot | == pivot | > pivot]</code> in a single pass.</li>
      </ul>
    `
  },
  'heap-sort': {
    title: 'HeapSort (In-Place Max-Heap)',
    category: 'Sorting Algorithms',
    description: 'Guaranteed O(N log N) in-place sorting building a Max-Heap and repeatedly extracting maximum element to end.',
    timeAvg: 'O(N log N)',
    timeWorst: 'O(N log N)',
    space: 'O(1)',
    code: heapSortRaw,
    cheatsheet: `
      <h3>HeapSort Phases</h3>
      <ul>
        <li><strong>Phase 1:</strong> Build-Heap in $O(N)$ bottom-up linear time.</li>
        <li><strong>Phase 2:</strong> $N$ successive extracts with Sift-Down in $O(N \\log N)$ strictly in-place.</li>
      </ul>
    `
  },
  'counting-sort': {
    title: 'Counting Sort (Non-Comparison)',
    category: 'Sorting Algorithms',
    description: 'Linear integer sorting counting frequencies of each key within range [0..K]. Bypasses Ω(N log N) barrier.',
    timeAvg: 'O(N + K)',
    timeWorst: 'O(N + K)',
    space: 'O(K)',
    code: elementarySortsRaw,
    cheatsheet: `<h3>Counting Sort:</h3> Linear runtime $O(N + K)$ when key range $K$ is comparable to $N$.`
  },
  'radix-sort': {
    title: 'Radix Sort (LSD)',
    category: 'Sorting Algorithms',
    description: 'Sorts integers digit-by-digit from Least Significant Digit (LSD) to MSD using stable counting sort passes.',
    timeAvg: 'O(d · (N + K))',
    timeWorst: 'O(d · (N + K))',
    space: 'O(N + K)',
    code: radixSortRaw,
    cheatsheet: `<h3>Radix Sort:</h3> Linear non-comparison sorting across $d$ digit passes.`
  },

  // ==========================================
  // 3. ALGORITHMS: LINKED LISTS
  // ==========================================
  'singly-linked-list': {
    title: 'Singly Linked List',
    category: 'Linked Lists',
    description: 'Linear node sequence connected by forward references with O(1) head insertions.',
    timeAvg: 'O(1) Insert Head / O(N) Traversal',
    timeWorst: 'O(N)',
    space: 'O(N)',
    code: singlyLinkedListRaw,
    cheatsheet: `<h3>Singly Linked List:</h3> Dynamic non-contiguous memory allocation without resizing overhead.`
  },
  'doubly-linked-list': {
    title: 'Doubly Linked List',
    category: 'Linked Lists',
    description: 'Nodes with next and prev references allowing bidirectional traversal and O(1) node deletion given pointer.',
    timeAvg: 'O(1) Insert / Delete',
    timeWorst: 'O(N) Search',
    space: 'O(N)',
    code: doublyLinkedListRaw,
    cheatsheet: `<h3>Doubly Linked List:</h3> Enables $O(1)$ remove given node pointer; foundation for LRU Cache.`
  },
  'reverse-linked-list': {
    title: 'Reverse Linked List',
    category: 'Linked Lists',
    description: 'Reverses pointer directions in-place in O(N) time and O(1) auxiliary space using 3 pointers (prev, curr, next).',
    timeAvg: 'O(N)',
    timeWorst: 'O(N)',
    space: 'O(1)',
    code: singlyLinkedListRaw,
    cheatsheet: `
      <h3>3-Pointer Invariant</h3>
      <pre>next = curr.next; curr.next = prev; prev = curr; curr = next;</pre>
    `
  },
  'fast-slow-pointers': {
    title: 'Fast & Slow Pointers (Floyd Cycle & Middle)',
    category: 'Linked Lists',
    description: 'Tortoise & Hare pointer algorithm finding middle node and detecting cycles in O(N) time and O(1) space.',
    timeAvg: 'O(N)',
    timeWorst: 'O(N)',
    space: 'O(1)',
    code: singlyLinkedListRaw,
    cheatsheet: `<h3>Fast & Slow:</h3> Slow moves 1 step, Fast moves 2 steps. When Fast hits end, Slow is at middle.`
  },
  'merge-linked-lists': {
    title: 'Merge Two Sorted Linked Lists',
    category: 'Linked Lists',
    description: 'Slices and splices existing node pointers of two sorted lists into one sorted list in O(N) time without allocating nodes.',
    timeAvg: 'O(N + M)',
    timeWorst: 'O(N + M)',
    space: 'O(1)',
    code: singlyLinkedListRaw,
    cheatsheet: `<h3>Dummy Head Technique:</h3> Simplifies edge cases when building resulting merged list head.`
  },

  // ==========================================
  // 3. ALGORITHMS: STACK & HASH PATTERNS
  // ==========================================
  'monotonic-stack': {
    title: 'Monotonic Stack (Next Greater Element)',
    category: 'Stack & Hash Patterns',
    description: 'Maintains elements in strictly monotonic order to solve Next Greater / Previous Smaller element queries in O(N) amortized time.',
    timeAvg: 'O(N)',
    timeWorst: 'O(N)',
    space: 'O(N)',
    code: stackQueueRaw,
    cheatsheet: `
      <h3>Monotonic Stack Pattern</h3>
      <ul>
        <li>While stack is non-empty and <code>arr[i] > arr[stack.top()]</code>, pop and resolve result for top.</li>
        <li>Each index is pushed and popped at most once $\\Rightarrow$ amortized $O(N)$ linear time.</li>
      </ul>
    `
  },
  'two-sum-hash': {
    title: 'Two Sum (Hash Map Lookup)',
    category: 'Stack & Hash Patterns',
    description: 'Calculates complement (target - num) and queries Hash Map in O(1) average time, solving Two Sum in O(N).',
    timeAvg: 'O(N)',
    timeWorst: 'O(N)',
    space: 'O(N)',
    code: hashTableRaw,
    cheatsheet: `<h3>Complement Lookup:</h3> <code>if (map.has(target - val)) return [map.get(target - val), i];</code>`
  },
  'group-anagrams': {
    title: 'Group Anagrams',
    category: 'Stack & Hash Patterns',
    description: 'Groups words with identical character frequencies by mapping sorted string canonical keys to arrays.',
    timeAvg: 'O(N · K log K)',
    timeWorst: 'O(N · K log K)',
    space: 'O(N · K)',
    code: hashTableRaw,
    cheatsheet: `<h3>Canonical Key:</h3> Sort word characters or use 26-element character count tuple as hash key.`
  },
  'frequency-counter': {
    title: 'Frequency Counter Pattern',
    category: 'Stack & Hash Patterns',
    description: 'Counts element frequencies using a Hash Map to compare distributions in O(N) linear time.',
    timeAvg: 'O(N)',
    timeWorst: 'O(N)',
    space: 'O(N)',
    code: hashTableRaw,
    cheatsheet: `<h3>Frequency Map:</h3> <code>freq[val] = (freq[val] || 0) + 1</code>`
  },

  // ==========================================
  // 3. ALGORITHMS: TREE & HEAP
  // ==========================================
  'tree-lca': {
    title: 'Lowest Common Ancestor (LCA)',
    category: 'Tree & Heap Algorithms',
    description: 'Finds deepest shared ancestor node of two given vertices in Binary Trees and BSTs in O(H) time.',
    timeAvg: 'O(log N) Balanced / O(N) Worst',
    timeWorst: 'O(N)',
    space: 'O(H)',
    code: binaryTreeRaw,
    cheatsheet: `
      <h3>BST LCA Decision</h3>
      <ul>
        <li>If both $p, q < \\text{root.val}$, search LEFT subtree.</li>
        <li>If both $p, q > \\text{root.val}$, search RIGHT subtree.</li>
        <li>Otherwise, current root is the split point and LCA!</li>
      </ul>
    `
  },
  'top-k-elements': {
    title: 'Top K Frequent Elements (Heap)',
    category: 'Tree & Heap Algorithms',
    description: 'Finds K most frequent elements using a bounded Min-Heap of size K in O(N log K) time.',
    timeAvg: 'O(N log K)',
    timeWorst: 'O(N log K)',
    space: 'O(N)',
    code: minMaxHeapRaw,
    cheatsheet: `<h3>Bounded Min-Heap:</h3> Retain only top $K$ largest frequencies; whenever heap exceeds size $K$, pop minimum.`
  },
  'quick-select': {
    title: 'QuickSelect (K-th Element in O(N))',
    category: 'Tree & Heap Algorithms',
    description: "Hoare's selection algorithm finding k-th smallest element in O(N) average time by pruning half partition.",
    timeAvg: 'O(N)',
    timeWorst: 'O(N²)',
    space: 'O(1)',
    code: quickSelectRaw,
    cheatsheet: `
      <h3>QuickSelect Recurrence</h3>
      <p>$T(N) = T(N/2) + O(N) = O(N)$ average time (geometric series decay).</p>
    `
  },

  // ==========================================
  // 3. ALGORITHMS: GRAPHS
  // ==========================================
  'dijkstra': {
    title: "Dijkstra's Shortest Path",
    category: 'Graph Algorithms',
    description: 'Finds single-source shortest paths in weighted graphs with non-negative edges using a Min-Priority Queue in O((V + E) log V).',
    timeAvg: 'O((V + E) log V)',
    timeWorst: 'O((V + E) log V)',
    space: 'O(V)',
    code: dijkstraRaw,
    cheatsheet: `
      <h3>Dijkstra Relaxation Invariant</h3>
      <ul>
        <li><code>if (dist[u] + weight < dist[v]) { dist[v] = dist[u] + weight; pq.push(v); }</code></li>
        <li>Non-negative edge weight requirement guarantees greedy optimality upon vertex extraction.</li>
      </ul>
    `
  },
  'bellman-ford': {
    title: 'Bellman-Ford Algorithm (Negative Weights)',
    category: 'Graph Algorithms',
    description: 'Finds shortest paths with arbitrary (including negative) edge weights and detects negative weight cycles in O(V * E).',
    timeAvg: 'O(V · E)',
    timeWorst: 'O(V · E)',
    space: 'O(V)',
    code: bellmanFordRaw,
    cheatsheet: `
      <h3>Bellman-Ford Invariants</h3>
      <ul>
        <li>Relax all $|E|$ edges $|V| - 1$ times. Shortest path contains at most $|V| - 1$ edges.</li>
        <li>If any edge can still be relaxed on the $|V|$-th iteration, a negative weight cycle exists!</li>
      </ul>
    `
  },
  'floyd-warshall': {
    title: 'Floyd-Warshall (All-Pairs Shortest Path)',
    category: 'Graph Algorithms',
    description: 'Dynamic programming matrix finding shortest paths between all pairs of vertices in O(V³) time.',
    timeAvg: 'O(V³)',
    timeWorst: 'O(V³)',
    space: 'O(V²) matrix',
    code: floydWarshallRaw,
    cheatsheet: `
      <h3>Floyd-Warshall Recurrence</h3>
      <p><code>dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j])</code> for intermediate vertex $k \\in [0..V-1]$.</p>
    `
  },
  'topological-sort': {
    title: 'Topological Sort & Cycle Detection',
    category: 'Graph Algorithms',
    description: "Orders vertices in Directed Acyclic Graphs (DAGs) using Kahn's algorithm (BFS In-Degrees) or DFS Post-Order.",
    timeAvg: 'O(V + E)',
    timeWorst: 'O(V + E)',
    space: 'O(V)',
    code: topologicalSortRaw,
    cheatsheet: `
      <h3>Kahn's Algorithm Invariant</h3>
      <ul>
        <li>Calculate in-degrees; enqueue all vertices with <code>inDegree === 0</code>.</li>
        <li>If total processed vertices $< |V|$, the graph contains a directed cycle!</li>
      </ul>
    `
  },
  'disjoint-set': {
    title: 'Disjoint Set Union (DSU / Union-Find)',
    category: 'Graph Algorithms',
    description: 'Maintains dynamic partitions of elements with Path Compression and Union by Rank in amortized O(α(N)) nearly O(1) time.',
    timeAvg: 'O(α(N)) ≈ O(1)',
    timeWorst: 'O(α(N))',
    space: 'O(N)',
    code: disjointSetRaw,
    cheatsheet: `
      <h3>Path Compression & Rank</h3>
      <ul>
        <li><code>find(i): parent[i] = find(parent[i])</code> flattens tree structure to depth $\\le 2$.</li>
        <li>Inverse Ackermann function $\\alpha(N) < 5$ for all physical values of $N$.</li>
      </ul>
    `
  },

  // ==========================================
  // 3. ALGORITHMS: BACKTRACKING
  // ==========================================
  'n-queens': {
    title: 'N-Queens Backtracking Solver',
    category: 'Recursion & Backtracking',
    description: 'Places N non-attacking queens on an N×N chessboard by pruning conflicting columns and diagonal attacks.',
    timeAvg: 'O(N!)',
    timeWorst: 'O(N!)',
    space: 'O(N)',
    code: nQueensRaw,
    cheatsheet: `
      <h3>Diagonal Threat Formulas</h3>
      <ul>
        <li>Major Diagonal: <code>(row - col)</code> is constant.</li>
        <li>Minor Anti-Diagonal: <code>(row + col)</code> is constant.</li>
      </ul>
    `
  },
  'subsets-permutations': {
    title: 'Subsets & Permutations Generator',
    category: 'Recursion & Backtracking',
    description: 'Generates 2ᴺ Power Sets and N! Permutations using recursive state space decision trees.',
    timeAvg: 'O(2ᴺ) Subsets | O(N!) Permutations',
    timeWorst: 'O(2ᴺ) / O(N!)',
    space: 'O(N)',
    code: subsetsRaw,
    cheatsheet: `<h3>Decision Tree:</h3> At each index, choose to either include or exclude the current element, recursing forward.`
  },
  'word-search': {
    title: 'Word Search (2D Grid DFS Backtracking)',
    category: 'Recursion & Backtracking',
    description: 'Searches for target word along 4-directional adjacent cells in 2D grid using in-place cell masking and backtracking.',
    timeAvg: 'O(N · M · 3ᴸ)',
    timeWorst: 'O(N · M · 3ᴸ)',
    space: 'O(L) stack depth',
    code: wordSearchRaw,
    cheatsheet: `<h3>In-Place Mark & Unmark:</h3> <code>board[r][c] = '#'; dfs(); board[r][c] = originalChar;</code>`
  },

  // ==========================================
  // 3. ALGORITHMS: DYNAMIC PROGRAMMING
  // ==========================================
  'coin-change': {
    title: 'Coin Change (Fewest Coins)',
    category: 'Dynamic Programming',
    description: 'Finds minimum coin count to make target amount using 1D bottom-up dynamic programming in O(Amount * Coins).',
    timeAvg: 'O(Amount · Coins)',
    timeWorst: 'O(Amount · Coins)',
    space: 'O(Amount)',
    code: coinChangeRaw,
    cheatsheet: `
      <h3>Coin Change DP Recurrence</h3>
      <p><code>dp[a] = Math.min(dp[a], dp[a - coin] + 1)</code> with base case <code>dp[0] = 0</code>.</p>
    `
  },
  'house-robber': {
    title: 'House Robber (1D Optimal Substructure)',
    category: 'Dynamic Programming',
    description: 'Maximizes loot without robbing adjacent houses using O(1) space optimized dynamic programming.',
    timeAvg: 'O(N)',
    timeWorst: 'O(N)',
    space: 'O(1)',
    code: houseRobberRaw,
    cheatsheet: `<h3>State Transition:</h3> <code>dp[i] = Math.max(dp[i - 1], dp[i - 2] + loot[i])</code>`
  },
  'knapsack': {
    title: '0/1 Knapsack Problem',
    category: 'Dynamic Programming',
    description: 'Maximizes total item value within weight capacity W using 2D pseudo-polynomial dynamic programming in O(N * W).',
    timeAvg: 'O(N · W)',
    timeWorst: 'O(N · W)',
    space: 'O(N · W) or O(W)',
    code: knapsackRaw,
    cheatsheet: `
      <h3>Knapsack Transition</h3>
      <pre>dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weights[i]] + values[i]);</pre>
    `
  },
  'lcs': {
    title: 'Longest Common Subsequence (LCS)',
    category: 'Dynamic Programming',
    description: 'Computes length of longest common subsequence between two strings using 2D table in O(M * N) time.',
    timeAvg: 'O(M · N)',
    timeWorst: 'O(M · N)',
    space: 'O(M · N)',
    code: lcsRaw,
    cheatsheet: `
      <h3>LCS Transition</h3>
      <p>If <code>s1[i] === s2[j]</code>: <code>dp[i][j] = 1 + dp[i-1][j-1]</code>; else <code>Math.max(dp[i-1][j], dp[i][j-1])</code>.</p>
    `
  },
  'edit-distance': {
    title: 'Edit Distance (Levenshtein)',
    category: 'Dynamic Programming',
    description: 'Finds minimum insertions, deletions, and replacements to transform word1 into word2 in O(M * N) time.',
    timeAvg: 'O(M · N)',
    timeWorst: 'O(M · N)',
    space: 'O(M · N)',
    code: editDistanceRaw,
    cheatsheet: `
      <h3>Edit Distance Transition</h3>
      <p><code>dp[i][j] = 1 + Math.min(Insert: dp[i][j-1], Delete: dp[i-1][j], Replace: dp[i-1][j-1])</code>.</p>
    `
  },
  'grid-paths': {
    title: 'Grid Unique Paths',
    category: 'Dynamic Programming',
    description: 'Computes total distinct paths from top-left to bottom-right moving only right and down in O(M * N) time.',
    timeAvg: 'O(M · N)',
    timeWorst: 'O(M · N)',
    space: 'O(M · N) or O(N)',
    code: gridPathsRaw,
    cheatsheet: `<h3>Grid Path Addition:</h3> <code>dp[r][c] = dp[r - 1][c] + dp[r][c - 1]</code>`
  },
  'lis': {
    title: 'Longest Increasing Subsequence (Patience Sort)',
    category: 'Dynamic Programming',
    description: 'Finds length of LIS in O(N log N) time using Patience Sorting and Binary Search on tails array.',
    timeAvg: 'O(N log N)',
    timeWorst: 'O(N log N)',
    space: 'O(N)',
    code: lisRaw,
    cheatsheet: `
      <h3>Patience Sorting LIS</h3>
      <ul>
        <li>For each element, binary search for its position in <code>tails</code> array.</li>
        <li>If element $>$ all tails, append; else overwrite first tail $\\ge$ element. Length of <code>tails</code> is LIS.</li>
      </ul>
    `
  }
};
