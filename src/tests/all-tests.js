/**
 * Comprehensive Automated Test Suite across all 11 Master Categories
 */

import { runner, describe, it, expect } from './test-framework.js';

// Structures
import { SinglyLinkedList } from '../structures/singly-linked-list.js';
import { Stack, Queue, Deque, MonotonicStack } from '../structures/stack-queue.js';
import { HashTable } from '../structures/hash-table.js';
import { BinarySearchTree } from '../structures/binary-tree.js';
import { AVLTree } from '../structures/avl-tree.js';
import { PriorityQueue } from '../structures/min-max-heap.js';
import { DisjointSet } from '../structures/disjoint-set.js';

// Algorithms
import { TwoPointers } from '../algorithms/arrays-strings/two-pointers.js';
import { SlidingWindow } from '../algorithms/arrays-strings/sliding-window.js';
import { PrefixSum } from '../algorithms/arrays-strings/prefix-sum.js';
import { KadaneAlgorithm } from '../algorithms/arrays-strings/kadane.js';
import { BinarySearch } from '../algorithms/sorting-searching/binary-search.js';

import { ElementarySorts } from '../algorithms/sorting-searching/elementary-sorts.js';
import { MergeSort } from '../algorithms/sorting-searching/merge-sort.js';
import { QuickSort } from '../algorithms/sorting-searching/quick-sort.js';
import { HeapSort } from '../algorithms/sorting-searching/heap-sort.js';
import { RadixSort } from '../algorithms/sorting-searching/radix-sort.js';
import { QuickSelect } from '../algorithms/sorting-searching/quick-select.js';

import { WeightedGraph, dijkstra, graphBFS, graphDFS } from '../algorithms/graph/dijkstra.js';
import { BellmanFord } from '../algorithms/graph/bellman-ford.js';
import { FloydWarshall } from '../algorithms/graph/floyd-warshall.js';
import { TopologicalSort } from '../algorithms/graph/topological-sort.js';

import { NQueens } from '../algorithms/backtracking/n-queens.js';
import { BacktrackingSets } from '../algorithms/backtracking/backtracking-subsets.js';
import { WordSearch } from '../algorithms/backtracking/word-search.js';

import { CoinChange } from '../algorithms/dp/coin-change.js';
import { HouseRobber } from '../algorithms/dp/house-robber.js';
import { Knapsack01 } from '../algorithms/dp/knapsack.js';
import { LongestCommonSubsequence } from '../algorithms/dp/lcs.js';
import { EditDistance } from '../algorithms/dp/edit-distance.js';
import { GridDP } from '../algorithms/dp/grid-paths.js';
import { LongestIncreasingSubsequence } from '../algorithms/dp/lis.js';

export function registerAllTests() {
  // 1. Complexity
  describe('1. Complexity Analysis', () => {
    it('verifies asymptotic growth ordering O(1) < O(log N) < O(N) < O(N log N) < O(N²)', () => {
      const n = 16;
      const o1 = 1;
      const oLogN = Math.log2(n); // 4
      const oN = n; // 16
      const oNLogN = n * Math.log2(n); // 64
      const oN2 = n * n; // 256
      expect(o1 < oLogN).toBe(true);
      expect(oLogN < oN).toBe(true);
      expect(oN < oNLogN).toBe(true);
      expect(oNLogN < oN2).toBe(true);
    });
  });

  // 2. Arrays & Strings
  describe('2. Arrays & Strings', () => {
    it('Two Pointers finds target sum pair in sorted array', () => {
      const sorted = [1, 2, 4, 6, 8, 11, 15];
      const res = TwoPointers.twoSumSorted(sorted, 10);
      expect(res.indices).toEqual([1, 4]); // 2 + 8 = 10
    });

    it('Sliding Window finds maximum sum subarray of size K', () => {
      const arr = [2, 1, 5, 1, 3, 2, 8, 4];
      const res = SlidingWindow.maxSumSubarray(arr, 3);
      expect(res.maxSum).toBe(14); // 2 + 8 + 4 = 14
    });

    it('Prefix Sum computes range queries in O(1)', () => {
      const arr = [3, 2, 4, 1, 5];
      const { prefix } = PrefixSum.compute(arr);
      expect(PrefixSum.queryRange(prefix, 1, 3)).toBe(7); // 2 + 4 + 1 = 7
    });

    it("Kadane's Algorithm finds maximum contiguous subarray sum", () => {
      const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
      const res = KadaneAlgorithm.maxSubArray(arr);
      expect(res.maxSoFar).toBe(6); // [4, -1, 2, 1]
    });

    it('Binary Search finds exact and rotated indices', () => {
      const sorted = [1, 3, 5, 7, 9, 11];
      expect(BinarySearch.search(sorted, 7).found).toBe(true);
      const rotated = [4, 5, 6, 7, 0, 1, 2];
      expect(BinarySearch.searchRotated(rotated, 0).index).toBe(4);
    });
  });

  // 3. Sorting
  describe('3. Sorting Algorithms', () => {
    const sample = [64, 34, 25, 12, 22, 11, 90];
    const expected = [...sample].sort((a, b) => a - b);

    it('Bubble Sort correctly sorts array', () => {
      expect(ElementarySorts.bubbleSort(sample).sorted).toEqual(expected);
    });

    it('Insertion Sort correctly sorts array', () => {
      expect(ElementarySorts.insertionSort(sample).sorted).toEqual(expected);
    });

    it('MergeSort correctly sorts array', () => {
      expect(MergeSort.sortWithSteps(sample).sortedArray).toEqual(expected);
    });

    it('QuickSort correctly sorts array (Lomuto & 3-Way)', () => {
      expect(QuickSort.sortWithSteps(sample, 'lomuto').sortedArray).toEqual(expected);
      expect(QuickSort.sortWithSteps(sample, 'threeWay').sortedArray).toEqual(expected);
    });

    it('HeapSort in-place correctly sorts array', () => {
      expect(HeapSort.sort(sample).sorted).toEqual(expected);
    });

    it('Radix Sort LSD correctly sorts array', () => {
      expect(RadixSort.sort(sample).sorted).toEqual(expected);
    });
  });

  // 4. Linked Lists
  describe('4. Linked Lists', () => {
    it('reverses linked list in-place in O(N)', () => {
      const { list } = SinglyLinkedList.reverseWithSteps([1, 2, 3, 4, 5]);
      expect(list.toArray()).toEqual([5, 4, 3, 2, 1]);
    });

    it('finds middle node via Fast & Slow pointers', () => {
      const res = SinglyLinkedList.fastSlowSteps([10, 20, 30, 40, 50]);
      expect(res.middle).toBe(30);
    });

    it('merges two sorted linked lists', () => {
      const res = SinglyLinkedList.mergeTwoLists([1, 3, 5], [2, 4, 6]);
      expect(res.merged).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  // 5. Stack & Queue
  describe('5. Stack & Queue', () => {
    it('maintains LIFO order for Stack', () => {
      const s = new Stack();
      s.push(10); s.push(20);
      expect(s.pop()).toBe(20);
      expect(s.peek()).toBe(10);
    });

    it('maintains FIFO order for Queue', () => {
      const q = new Queue();
      q.enqueue(10); q.enqueue(20);
      expect(q.dequeue()).toBe(10);
      expect(q.peek()).toBe(20);
    });

    it('Monotonic Stack computes Next Greater Elements in O(N)', () => {
      const arr = [2, 1, 2, 4, 3];
      const res = MonotonicStack.nextGreaterElements(arr);
      expect(res.result).toEqual([4, 2, 4, -1, -1]);
    });
  });

  // 6. Hash Tables
  describe('6. Hash Tables', () => {
    it('stores and retrieves key-values with collision chaining', () => {
      const ht = new HashTable(4);
      ht.put('apple', 100);
      ht.put('banana', 200);
      expect(ht.get('apple')).toBe(100);
      expect(ht.get('banana')).toBe(200);
    });

    it('Two Sum finds indices in O(N) via Hash Map', () => {
      const res = HashTable.twoSum([2, 7, 11, 15], 9);
      expect(res.indices).toEqual([0, 1]);
    });

    it('groups anagram clusters correctly', () => {
      const res = HashTable.groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']);
      expect(res.result.length).toBe(3);
    });

    it('Frequency Counter computes character occurrences in O(N)', () => {
      const res = HashTable.frequencyCounter(['a', 'b', 'a', 'c', 'b', 'a']);
      expect(res.freq).toEqual({ a: 3, b: 2, c: 1 });
    });
  });

  // 7. Trees
  describe('7. Trees & BST', () => {
    it('BST maintains Left < Root < Right and Inorder is sorted', () => {
      const bst = new BinarySearchTree();
      [50, 30, 70, 20, 40].forEach(v => bst.insert(v));
      const res = BinarySearchTree.traverseWithSteps(bst.root, 'inorder');
      expect(res.visited).toEqual([20, 30, 40, 50, 70]);
    });

    it('finds Lowest Common Ancestor (LCA) in BST', () => {
      const bst = new BinarySearchTree();
      [50, 30, 70, 20, 40, 60, 80].forEach(v => bst.insert(v));
      const res = BinarySearchTree.lowestCommonAncestor(bst.root, 20, 40);
      expect(res.lca).toBe(30);
      const resSteps = BinarySearchTree.lowestCommonAncestorWithSteps(bst.root, 20, 40);
      expect(resSteps.lca).toBe(30);
    });

    it('AVL Tree maintains strict balance factor |BF| <= 1', () => {
      const avl = new AVLTree();
      [10, 20, 30, 40, 50, 25].forEach(v => avl.insert(v));
      expect(avl.isBalanced()).toBe(true);
    });
  });

  // 8. Heaps
  describe('8. Heaps & Priority Queue', () => {
    it('MinHeap maintains root as minimum element', () => {
      const pq = new PriorityQueue((a, b) => a - b);
      [40, 10, 30, 5].forEach(v => pq.push(v));
      expect(pq.pop()).toBe(5);
      expect(pq.pop()).toBe(10);
    });

    it('Top K Frequent Elements finds top K in O(N log K)', () => {
      const res = PriorityQueue.topKFrequentWithSteps([1, 1, 1, 2, 2, 3], 2);
      expect(res.topK.length).toBe(2);
      expect(res.topK.includes(1)).toBe(true);
      expect(res.topK.includes(2)).toBe(true);
    });

    it('QuickSelect finds k-th smallest element in O(N)', () => {
      const arr = [64, 34, 25, 12, 22, 11, 90];
      expect(QuickSelect.select(arr, 0).value).toBe(11);
      expect(QuickSelect.select(arr, 3).value).toBe(25);
    });
  });

  // 9. Graphs
  describe('9. Graphs & Networks', () => {
    it("Dijkstra finds single-source shortest path", () => {
      const g = new WeightedGraph();
      ['A', 'B', 'C', 'D'].forEach(v => g.addVertex(v));
      g.addEdge('A', 'B', 1); g.addEdge('B', 'C', 2); g.addEdge('A', 'C', 4);
      const res = dijkstra(g, 'A', 'C');
      expect(res.distances['C']).toBe(3);
    });

    it('Bellman-Ford handles negative weights and detects cycles', () => {
      const g = BellmanFord.getDefaultGraph();
      const res = BellmanFord.solve(g.nodes, g.edges, 'A', 'D');
      expect(res.hasNegativeCycle).toBe(false);
      expect(res.distances['A']).toBe(0);
      expect(res.path.length).toBeGreaterThan(1);
    });

    it('Floyd-Warshall computes all-pairs shortest paths', () => {
      const g = FloydWarshall.getDefaultGraph();
      const res = FloydWarshall.solve(g.nodes, g.edges);
      expect(res.matrix[0][2]).toBe(8); // A(0)->B(1)(5) + B(1)->C(2)(3) = 8
    });

    it("Kahn's algorithm produces valid topological order", () => {
      const res = TopologicalSort.kahnsAlgorithm(4, [[0, 1], [0, 2], [1, 3], [2, 3]]);
      expect(res.order.length).toBe(4);
      expect(res.hasCycle).toBe(false);
    });

    it('Graph BFS & DFS traverse all reachable vertices', () => {
      const g = new WeightedGraph();
      ['A', 'B', 'C', 'D'].forEach(v => g.addVertex(v));
      g.addEdge('A', 'B', 1); g.addEdge('B', 'C', 2); g.addEdge('C', 'D', 3);
      const bfsRes = graphBFS(g, 'A');
      expect(bfsRes.order).toEqual(['A', 'B', 'C', 'D']);
      const dfsRes = graphDFS(g, 'A');
      expect(dfsRes.order).toEqual(['A', 'B', 'C', 'D']);
    });

    it('Disjoint Set computes connected components and cycle detection', () => {
      const res = DisjointSet.connectedComponentsWithSteps(6, [[0, 1], [1, 2], [3, 4]]);
      expect(res.numSets).toBe(3); // {0,1,2}, {3,4}, {5}
    });
  });

  // 10. Recursion & Backtracking
  describe('10. Recursion & Backtracking', () => {
    it('N-Queens finds all solutions for N=4', () => {
      const res = NQueens.solve(4);
      expect(res.solutions.length).toBe(2);
    });

    it('generates all 2^N subsets', () => {
      const res = BacktrackingSets.generateSubsets([1, 2, 3]);
      expect(res.result.length).toBe(8); // 2^3 = 8
    });

    it('Word Search finds word in 2D grid via DFS Backtracking', () => {
      const board = [
        ['A', 'B', 'C', 'E'],
        ['S', 'F', 'C', 'S'],
        ['A', 'D', 'E', 'E']
      ];
      const res = WordSearch.solve(board, 'ABCCED');
      expect(res.found).toBe(true);
    });
  });

  // 11. Dynamic Programming
  describe('11. Dynamic Programming', () => {
    it('Coin Change computes minimum coins needed', () => {
      const res = CoinChange.minCoins([1, 2, 5], 11);
      expect(res.minCount).toBe(3); // 5 + 5 + 1
    });

    it('House Robber maximizes loot without adjacent robberies', () => {
      const res = HouseRobber.rob([2, 7, 9, 3, 1]);
      expect(res.maxLoot).toBe(12); // 2 + 9 + 1 = 12
    });

    it('0/1 Knapsack maximizes total value under capacity', () => {
      const res = Knapsack01.solve([2, 3, 4, 5], [3, 4, 5, 6], 5);
      expect(res.maxValue).toBe(7); // items 1 & 2 (weight 2+3=5, value 3+4=7)
    });

    it('Longest Common Subsequence (LCS)', () => {
      const res = LongestCommonSubsequence.solve('ABCBDAB', 'BDCAB');
      expect(res.length).toBe(4);
    });

    it('Levenshtein Edit Distance', () => {
      const res = EditDistance.solve('horse', 'ros');
      expect(res.distance).toBe(3);
    });

    it('Grid Unique Paths computes total paths', () => {
      const res = GridDP.uniquePaths(3, 7);
      expect(res.totalPaths).toBe(28);
    });

    it('LIS O(N log N) patience sorting', () => {
      const res = LongestIncreasingSubsequence.solveFast([10, 9, 2, 5, 3, 7, 101, 18]);
      expect(res.length).toBe(4);
    });
  });
}

// Run immediately if in Node.js environment
if (typeof process !== 'undefined' && process.versions && process.versions.node) {
  registerAllTests();
  runner.run().then(() => {
    runner.printConsoleReport();
    if (runner.stats.failed > 0) {
      process.exit(1);
    }
  });
}
