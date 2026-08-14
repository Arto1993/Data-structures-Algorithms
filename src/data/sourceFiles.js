/**
 * Loads all data structure and algorithm JS files as raw source code for the Visual Code Editor
 */

const allRawModules = import.meta.glob([
  '../structures/*.js',
  '../algorithms/**/*.js',
  '../tests/*.js'
], { query: '?raw', import: 'default', eager: true });

export const FILE_TREE = [
  {
    folder: 'structures',
    name: 'Data Structures',
    icon: 'Layers',
    files: [
      { id: 'dynamic-array.js', name: 'dynamic-array.js', path: 'src/structures/dynamic-array.js', moduleKey: '../structures/dynamic-array.js', desc: 'Dynamic Array (Resizable Contiguous Buffer)', type: 'structure' },
      { id: 'singly-linked-list.js', name: 'singly-linked-list.js', path: 'src/structures/singly-linked-list.js', moduleKey: '../structures/singly-linked-list.js', desc: 'Singly Linked List with pointer reversal & merge', type: 'structure' },
      { id: 'doubly-linked-list.js', name: 'doubly-linked-list.js', path: 'src/structures/doubly-linked-list.js', moduleKey: '../structures/doubly-linked-list.js', desc: 'Doubly Linked List with bidirectional pointers', type: 'structure' },
      { id: 'stack-queue.js', name: 'stack-queue.js', path: 'src/structures/stack-queue.js', moduleKey: '../structures/stack-queue.js', desc: 'Stack, Queue, Deque, and Monotonic Stack', type: 'structure' },
      { id: 'hash-table.js', name: 'hash-table.js', path: 'src/structures/hash-table.js', moduleKey: '../structures/hash-table.js', desc: 'Hash Table with separate chaining collision resolution', type: 'structure' },
      { id: 'binary-tree.js', name: 'binary-tree.js', path: 'src/structures/binary-tree.js', moduleKey: '../structures/binary-tree.js', desc: 'BST with Pre/In/Postorder DFS, BFS, and LCA', type: 'structure' },
      { id: 'min-max-heap.js', name: 'min-max-heap.js', path: 'src/structures/min-max-heap.js', moduleKey: '../structures/min-max-heap.js', desc: 'Min/Max Binary Heap & Priority Queue', type: 'structure' },
      { id: 'avl-tree.js', name: 'avl-tree.js', path: 'src/structures/avl-tree.js', moduleKey: '../structures/avl-tree.js', desc: 'Self-balancing BST with 4 rotation cases', type: 'structure' },
      { id: 'disjoint-set.js', name: 'disjoint-set.js', path: 'src/structures/disjoint-set.js', moduleKey: '../structures/disjoint-set.js', desc: 'Disjoint Set Union (Union-Find) with Rank & Path Compression', type: 'structure' }
    ]
  },
  {
    folder: 'algorithms/arrays-strings',
    name: 'Arrays & Strings',
    icon: 'AlignJustify',
    files: [
      { id: 'two-pointers.js', name: 'two-pointers.js', path: 'src/algorithms/arrays-strings/two-pointers.js', moduleKey: '../algorithms/arrays-strings/two-pointers.js', desc: 'Two Sum sorted array converging pointers', type: 'algorithm' },
      { id: 'sliding-window.js', name: 'sliding-window.js', path: 'src/algorithms/arrays-strings/sliding-window.js', moduleKey: '../algorithms/arrays-strings/sliding-window.js', desc: 'Max sum subarray of size K rolling window', type: 'algorithm' },
      { id: 'prefix-sum.js', name: 'prefix-sum.js', path: 'src/algorithms/arrays-strings/prefix-sum.js', moduleKey: '../algorithms/arrays-strings/prefix-sum.js', desc: 'Prefix sum array for O(1) range queries', type: 'algorithm' },
      { id: 'kadane.js', name: 'kadane.js', path: 'src/algorithms/arrays-strings/kadane.js', moduleKey: '../algorithms/arrays-strings/kadane.js', desc: "Kadane's algorithm for maximum subarray sum", type: 'algorithm' },
      { id: 'binary-search.js', name: 'binary-search.js', path: 'src/algorithms/sorting-searching/binary-search.js', moduleKey: '../algorithms/sorting-searching/binary-search.js', desc: 'Logarithmic search & rotated sorted array find', type: 'algorithm' }
    ]
  },
  {
    folder: 'algorithms/sorting',
    name: 'Sorting Algorithms',
    icon: 'ArrowUpDown',
    files: [
      { id: 'elementary-sorts.js', name: 'elementary-sorts.js', path: 'src/algorithms/sorting-searching/elementary-sorts.js', moduleKey: '../algorithms/sorting-searching/elementary-sorts.js', desc: 'Bubble Sort, Selection Sort, Insertion Sort, Counting Sort', type: 'algorithm' },
      { id: 'merge-sort.js', name: 'merge-sort.js', path: 'src/algorithms/sorting-searching/merge-sort.js', moduleKey: '../algorithms/sorting-searching/merge-sort.js', desc: 'Divide and conquer stable sorting O(N log N)', type: 'algorithm' },
      { id: 'quick-sort.js', name: 'quick-sort.js', path: 'src/algorithms/sorting-searching/quick-sort.js', moduleKey: '../algorithms/sorting-searching/quick-sort.js', desc: 'Lomuto, Hoare, and 3-Way Dutch National Flag QuickSort', type: 'algorithm' },
      { id: 'heap-sort.js', name: 'heap-sort.js', path: 'src/algorithms/sorting-searching/heap-sort.js', moduleKey: '../algorithms/sorting-searching/heap-sort.js', desc: 'In-place binary Max-Heap sorting algorithm', type: 'algorithm' },
      { id: 'radix-sort.js', name: 'radix-sort.js', path: 'src/algorithms/sorting-searching/radix-sort.js', moduleKey: '../algorithms/sorting-searching/radix-sort.js', desc: 'Linear LSD integer sort with decimal counting buckets', type: 'algorithm' },
      { id: 'quick-select.js', name: 'quick-select.js', path: 'src/algorithms/sorting-searching/quick-select.js', moduleKey: '../algorithms/sorting-searching/quick-select.js', desc: 'O(N) Hoare selection for k-th smallest element', type: 'algorithm' }
    ]
  },
  {
    folder: 'algorithms/graph',
    name: 'Graph Algorithms',
    icon: 'Share2',
    files: [
      { id: 'dijkstra.js', name: 'dijkstra.js', path: 'src/algorithms/graph/dijkstra.js', moduleKey: '../algorithms/graph/dijkstra.js', desc: 'Single-source shortest path with priority queue', type: 'algorithm' },
      { id: 'bellman-ford.js', name: 'bellman-ford.js', path: 'src/algorithms/graph/bellman-ford.js', moduleKey: '../algorithms/graph/bellman-ford.js', desc: 'Shortest path with negative weights and cycle check', type: 'algorithm' },
      { id: 'floyd-warshall.js', name: 'floyd-warshall.js', path: 'src/algorithms/graph/floyd-warshall.js', moduleKey: '../algorithms/graph/floyd-warshall.js', desc: 'All-Pairs shortest path dynamic programming matrix', type: 'algorithm' },
      { id: 'topological-sort.js', name: 'topological-sort.js', path: 'src/algorithms/graph/topological-sort.js', moduleKey: '../algorithms/graph/topological-sort.js', desc: 'Kahn BFS in-degree and DFS 3-state cycle detection', type: 'algorithm' }
    ]
  },
  {
    folder: 'algorithms/dp',
    name: 'Dynamic Programming',
    icon: 'Grid',
    files: [
      { id: 'coin-change.js', name: 'coin-change.js', path: 'src/algorithms/dp/coin-change.js', moduleKey: '../algorithms/dp/coin-change.js', desc: 'Coin change minimum coins DP tabulation', type: 'algorithm' },
      { id: 'house-robber.js', name: 'house-robber.js', path: 'src/algorithms/dp/house-robber.js', moduleKey: '../algorithms/dp/house-robber.js', desc: '1D DP non-adjacent element maximization', type: 'algorithm' },
      { id: 'knapsack.js', name: 'knapsack.js', path: 'src/algorithms/dp/knapsack.js', moduleKey: '../algorithms/dp/knapsack.js', desc: '0/1 Knapsack 2D Matrix solver and item backtrack', type: 'algorithm' },
      { id: 'lcs.js', name: 'lcs.js', path: 'src/algorithms/dp/lcs.js', moduleKey: '../algorithms/dp/lcs.js', desc: 'Longest Common Subsequence matrix transition', type: 'algorithm' },
      { id: 'edit-distance.js', name: 'edit-distance.js', path: 'src/algorithms/dp/edit-distance.js', moduleKey: '../algorithms/dp/edit-distance.js', desc: 'Levenshtein edit distance (Insert, Delete, Replace)', type: 'algorithm' },
      { id: 'grid-paths.js', name: 'grid-paths.js', path: 'src/algorithms/dp/grid-paths.js', moduleKey: '../algorithms/dp/grid-paths.js', desc: 'Grid Unique Paths and Minimum Path Sum DP', type: 'algorithm' },
      { id: 'lis.js', name: 'lis.js', path: 'src/algorithms/dp/lis.js', moduleKey: '../algorithms/dp/lis.js', desc: 'O(N log N) Patience Sorting + Binary Search LIS', type: 'algorithm' }
    ]
  },
  {
    folder: 'algorithms/backtracking',
    name: 'Recursion & Backtracking',
    icon: 'RotateCw',
    files: [
      { id: 'n-queens.js', name: 'n-queens.js', path: 'src/algorithms/backtracking/n-queens.js', moduleKey: '../algorithms/backtracking/n-queens.js', desc: 'N-Queens 8x8 chessboard solver with state tree pruning', type: 'algorithm' },
      { id: 'backtracking-subsets.js', name: 'backtracking-subsets.js', path: 'src/algorithms/backtracking/backtracking-subsets.js', moduleKey: '../algorithms/backtracking/backtracking-subsets.js', desc: 'Power Set 2^N subsets and N! permutations', type: 'algorithm' },
      { id: 'word-search.js', name: 'word-search.js', path: 'src/algorithms/backtracking/word-search.js', moduleKey: '../algorithms/backtracking/word-search.js', desc: 'Word Search 2D grid DFS backtracking', type: 'algorithm' }
    ]
  },
  {
    folder: 'tests',
    name: 'Test Suites',
    icon: 'FlaskConical',
    files: [
      { id: 'test-framework.js', name: 'test-framework.js', path: 'src/tests/test-framework.js', moduleKey: '../tests/test-framework.js', desc: 'Zero-dependency BDD test runner and assertion library', type: 'test' },
      { id: 'all-tests.js', name: 'all-tests.js', path: 'src/tests/all-tests.js', moduleKey: '../tests/all-tests.js', desc: 'Automated unit tests across all 11 Master Categories', type: 'test' }
    ]
  }
];

export function getAllFilesFlat() {
  const flat = [];
  for (const group of FILE_TREE) {
    for (const file of group.files) {
      flat.push({ ...file, groupName: group.name });
    }
  }
  return flat;
}

export function getFileContent(fileId) {
  const flat = getAllFilesFlat();
  const found = flat.find(f => f.id === fileId || f.name === fileId || f.path.endsWith(fileId));
  if (found) {
    return getSourceCode(found.moduleKey);
  }
  return getSourceCode(fileId);
}

export function getSourceCode(moduleKey) {
  if (allRawModules[moduleKey]) {
    return allRawModules[moduleKey];
  }
  for (const [key, code] of Object.entries(allRawModules)) {
    if (key.endsWith(moduleKey)) return code;
  }
  return '// Source file not found';
}
