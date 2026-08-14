/**
 * Dynamic Big-O Complexity Calculator & Breakdown Engine
 * Calculates real-time theoretical and operational Big-O metrics for DSA Visualizer
 */

export function calculateLiveComplexity({
  moduleId,
  stepIndex = 0,
  totalSteps = 0,
  currentStep = null,
  customParams = {}
}) {
  const stepNum = stepIndex + 1;
  const progressPercent = totalSteps > 0 ? Math.min(100, Math.round((stepNum / totalSteps) * 100)) : 0;

  switch (moduleId) {
    // ==========================================
    // 1. COMPLEXITY ANALYSIS
    // ==========================================
    case 'big-o-curves':
      return {
        formula: `O(1) < O(log N) < O(N) < O(N log N) < O(N²) < O(2ᴺ)`,
        equation: `Comparative Asymptotic Analysis Matrix`,
        liveOps: `Interactive Slider N`,
        progressPercent: 100,
        ratioLabel: `Strict Asymptotic Hierarchy`,
        statusBadge: `Asymptotic Suite`,
        spaceBound: `O(1)`
      };

    // ==========================================
    // 2. DATA STRUCTURES
    // ==========================================
    case 'ds-arrays':
      return {
        formula: `O(1) Access / O(N) Insert & Delete`,
        equation: `Address = Base + index × 4 bytes (Contiguous Heap)`,
        liveOps: `Direct Random Access`,
        progressPercent: 100,
        ratioLabel: `O(1) Amortized Push with Geometric Doubling`,
        statusBadge: `Contiguous Buffer`,
        spaceBound: `O(N) memory buffer`
      };

    case 'ds-stack':
      return {
        formula: `O(1) Push / Pop / Peek`,
        equation: `LIFO (Last-In First-Out) Top Pointer Access`,
        liveOps: `Constant Time Top Access`,
        progressPercent: 100,
        ratioLabel: `Strict O(1) End Mutation Guarantee`,
        statusBadge: `LIFO Chamber`,
        spaceBound: `O(N) dynamic storage`
      };

    case 'ds-queue':
      return {
        formula: `O(1) Enqueue & Dequeue`,
        equation: `FIFO (First-In First-Out) Circular Pointer Math`,
        liveOps: `Head & Tail Pointer Indices`,
        progressPercent: 100,
        ratioLabel: `(index + 1) % Capacity Circular Array`,
        statusBadge: `FIFO Pipeline`,
        spaceBound: `O(N) sequential buffer`
      };

    case 'ds-hash-tables':
      return {
        formula: `O(1) Average Put / Get / Delete`,
        equation: `hash(key) = (∑ charCode × 31) % 8`,
        liveOps: `Separate Chaining Collision Handling`,
        progressPercent: 100,
        ratioLabel: `Uniform Distribution & Load Factor α ≤ 0.75`,
        statusBadge: `Key-Value Store`,
        spaceBound: `O(N + M) buckets`
      };

    case 'ds-trees':
      return {
        formula: `O(log₂ N) Balanced BST / AVL`,
        equation: `BST Invariant: Left < Root < Right`,
        liveOps: `Hierarchical Branching`,
        progressPercent: 100,
        ratioLabel: `Height h ≈ ⌈log₂(N)⌉ with AVL Balance Factor |BF| ≤ 1`,
        statusBadge: `Hierarchical Tree`,
        spaceBound: `O(h) recursion stack`
      };

    case 'ds-heaps':
      return {
        formula: `O(1) Peek / O(log₂ N) Push & Pop`,
        equation: `Parent ⌊(i-1)/2⌋ ➔ Children 2i+1, 2i+2`,
        liveOps: `Heap Invariant Sift-Up & Sift-Down`,
        progressPercent: 100,
        ratioLabel: `Build-Heap (Heapify) runs in O(N) linear time`,
        statusBadge: `Priority Queue`,
        spaceBound: `O(N) 1D array buffer`
      };

    case 'ds-graphs':
      return {
        formula: `O(V + E) BFS & DFS Traversals`,
        equation: `Adjacency List: |V| Vertices + |E| Edges`,
        liveOps: `O(1) Vertex & Edge Insertions`,
        progressPercent: 100,
        ratioLabel: `Space-Efficient Sparse Graph Representation`,
        statusBadge: `Network Graph`,
        spaceBound: `O(V + E) list storage`
      };

    // ==========================================
    // 3. ALGORITHMS: ARRAYS & STRINGS
    // ==========================================
    case 'two-pointers': {
      const n = customParams.arrayLength || 7;
      return {
        formula: `O(N) Converging Pointers`,
        equation: `Max ${n} pointer decrements / increments`,
        liveOps: `Step ${stepNum} / ${totalSteps || n}`,
        progressPercent,
        ratioLabel: `Optimal Inward Scanning`,
        statusBadge: progressPercent === 100 ? `Search Resolved` : `Pointers Active`,
        spaceBound: `O(1) auxiliary space`
      };
    }

    case 'sliding-window': {
      const n = customParams.arrayLength || 8;
      const k = customParams.k || 3;
      return {
        formula: `O(N) Rolling Window`,
        equation: `${n} elements with window size k=${k}`,
        liveOps: `Step ${stepNum} / ${totalSteps || n - k + 1}`,
        progressPercent,
        ratioLabel: `Each item enters and leaves window exactly once`,
        statusBadge: progressPercent === 100 ? `Max Subarray Found` : `Window Sliding`,
        spaceBound: `O(1) space`
      };
    }

    case 'prefix-sum': {
      const n = customParams.arrayLength || 7;
      return {
        formula: `O(1) Range Query / O(N) Build`,
        equation: `prefix[R + 1] - prefix[L] in O(1)`,
        liveOps: `Step ${stepNum} / ${totalSteps || n}`,
        progressPercent,
        ratioLabel: `Subarray sum subtraction math`,
        statusBadge: progressPercent === 100 ? `Prefix Table Ready` : `Accumulating Sums`,
        spaceBound: `O(N) prefix array`
      };
    }

    case 'kadane': {
      const n = customParams.arrayLength || 9;
      return {
        formula: `O(N) Dynamic Programming`,
        equation: `currMax = max(arr[i], currMax + arr[i])`,
        liveOps: `Step ${stepNum} / ${totalSteps || n}`,
        progressPercent,
        ratioLabel: `Optimal contiguous substructure`,
        statusBadge: progressPercent === 100 ? `Max Subarray Proved` : `Evaluating Subarrays`,
        spaceBound: `O(1) space`
      };
    }

    case 'binary-search': {
      const n = 9;
      const logN = Math.ceil(Math.log2(n));
      return {
        formula: `O(log₂ N)`,
        equation: `⌈log₂(${n})⌉ = ${logN} max iterations`,
        liveOps: `Step ${stepNum} / ${totalSteps || logN}`,
        progressPercent,
        ratioLabel: `Search space halved every iteration`,
        statusBadge: progressPercent === 100 ? 'Binary Search Finished' : `Dividing Search Space`,
        spaceBound: `O(1) iterative space`
      };
    }

    // ==========================================
    // 3. ALGORITHMS: SORTING
    // ==========================================
    case 'bubble-sort':
    case 'insertion-sort': {
      const n = customParams.arrayLength || 9;
      return {
        formula: `O(N²) Quadratic Sort`,
        equation: `${n} × (${n} - 1) / 2 ≈ ${Math.round((n * (n - 1)) / 2)} comparisons`,
        liveOps: `Step ${stepNum} / ${totalSteps || Math.round((n * (n - 1)) / 2)}`,
        progressPercent,
        ratioLabel: `Adaptive in-place sorting`,
        statusBadge: progressPercent === 100 ? `Sorted` : `Comparing Adjacent`,
        spaceBound: `O(1) in-place`
      };
    }

    case 'selection-sort': {
      const n = customParams.arrayLength || 9;
      return {
        formula: `O(N²) Selection Sort`,
        equation: `Guarantees at most ${n} element swaps`,
        liveOps: `Step ${stepNum} / ${totalSteps || n}`,
        progressPercent,
        ratioLabel: `Minimal swaps optimal for expensive writes`,
        statusBadge: progressPercent === 100 ? `Sorted` : `Selecting Minimum`,
        spaceBound: `O(1) in-place`
      };
    }

    case 'merge-sort': {
      const n = customParams.arrayLength || 7;
      const nLogN = Math.round(n * Math.ceil(Math.log2(n)));
      return {
        formula: `Θ(N log₂ N)`,
        equation: `${n} × ⌈log₂(${n})⌉ = ${nLogN} ops`,
        liveOps: `Step ${stepNum} / ${totalSteps || nLogN}`,
        progressPercent,
        ratioLabel: `Optimal Divide & Conquer (Guaranteed)`,
        statusBadge: progressPercent === 100 ? 'Sorted in Θ(N log N)' : `Divide & Merge (Step ${stepNum})`,
        spaceBound: `O(N) auxiliary buffer space`
      };
    }

    case 'quick-sort': {
      const n = customParams.arrayLength || 9;
      const nLogN = Math.round(n * Math.log2(n));
      return {
        formula: `O(N log₂ N)`,
        equation: `${n} × log₂(${n}) ≈ ${nLogN} ops`,
        liveOps: `Step ${stepNum} / ${totalSteps || nLogN}`,
        progressPercent,
        ratioLabel: `Theoretical Avg: ~${nLogN} ops | Worst O(N²): ${n * n} ops`,
        statusBadge: progressPercent === 100 ? 'Completed in O(N log N)' : `Partition Phase (Step ${stepNum})`,
        spaceBound: `O(log N) stack frames`
      };
    }

    case 'heap-sort': {
      const n = customParams.arrayLength || 7;
      const nLogN = Math.round(n * Math.ceil(Math.log2(n)));
      return {
        formula: `O(N log₂ N) Guaranteed`,
        equation: `Build-Heap: O(${n}) + Sort: ${n}·log₂(${n}) ≈ ${nLogN} ops`,
        liveOps: `Step ${stepNum} / ${totalSteps || nLogN}`,
        progressPercent,
        ratioLabel: `Strict In-Place Max-Heap: Zero Stack Overhead`,
        statusBadge: progressPercent === 100 ? 'HeapSort Complete' : `Sift-Down / Extract (Step ${stepNum})`,
        spaceBound: `O(1) strictly in-place`
      };
    }

    case 'counting-sort': {
      const n = customParams.arrayLength || 7;
      return {
        formula: `O(N + K) Linear Integer Sort`,
        equation: `Direct frequency mapping bypasses comparison bound`,
        liveOps: `Step ${stepNum} / ${totalSteps || n}`,
        progressPercent,
        ratioLabel: `Non-Comparison Linear Integer Algorithm`,
        statusBadge: progressPercent === 100 ? 'Counting Sort Complete' : `Counting Frequencies`,
        spaceBound: `O(K) frequency count array`
      };
    }

    case 'radix-sort': {
      const n = customParams.arrayLength || 8;
      const d = 3;
      const k = 10;
      return {
        formula: `O(d · (N + k)) Linear Sort`,
        equation: `${d} passes × (${n} items + ${k} base digits) = ${d * (n + k)} ops`,
        liveOps: `Step ${stepNum} / ${totalSteps || d * 2}`,
        progressPercent,
        ratioLabel: `Bypasses Ω(N log N) comparison barrier`,
        statusBadge: progressPercent === 100 ? 'Radix Sort Complete' : `Bucket Distribution`,
        spaceBound: `O(N + k) counting buckets`
      };
    }

    // ==========================================
    // 3. ALGORITHMS: LINKED LISTS
    // ==========================================
    case 'singly-linked-list':
    case 'doubly-linked-list':
    case 'reverse-linked-list':
    case 'fast-slow-pointers':
    case 'merge-linked-lists': {
      const n = 5;
      return {
        formula: `O(N) Linear Pointer Traversal`,
        equation: `Iterating through ${n} node references`,
        liveOps: `Step ${stepNum} / ${totalSteps || n}`,
        progressPercent,
        ratioLabel: `Constant O(1) auxiliary pointer manipulation`,
        statusBadge: progressPercent === 100 ? `List Operation Complete` : `Traversing Pointers`,
        spaceBound: `O(1) auxiliary space`
      };
    }

    // ==========================================
    // 3. ALGORITHMS: STACK & HASH PATTERNS
    // ==========================================
    case 'stack':
    case 'queue':
      return {
        formula: `O(1) Push / Pop / Peek`,
        equation: `Constant Time End Manipulations`,
        liveOps: `Direct LIFO / FIFO access`,
        progressPercent: 100,
        ratioLabel: `Strict pointer access`,
        statusBadge: `Optimal Pipeline`,
        spaceBound: `O(N) dynamic storage`
      };

    case 'monotonic-stack': {
      const n = customParams.arrayLength || 5;
      return {
        formula: `O(N) Amortized Linear`,
        equation: `Each item pushed/popped at most once (≤ 2N ops)`,
        liveOps: `Step ${stepNum} / ${totalSteps || 2 * n}`,
        progressPercent,
        ratioLabel: `Maintains strictly monotonic order`,
        statusBadge: progressPercent === 100 ? `Range Query Solved` : `Stack Active`,
        spaceBound: `O(N) index stack`
      };
    }

    case 'hash-map':
    case 'two-sum-hash':
    case 'group-anagrams':
    case 'frequency-counter':
      return {
        formula: `O(1) Average Lookup`,
        equation: `hash(key) % capacity in O(1)`,
        liveOps: `Step ${stepNum} / ${totalSteps || 1}`,
        progressPercent,
        ratioLabel: `Separate chaining handles collisions`,
        statusBadge: `Constant Latency`,
        spaceBound: `O(N) bucket capacity`
      };

    // ==========================================
    // 3. ALGORITHMS: TREE & HEAP
    // ==========================================
    case 'binary-search-tree':
    case 'avl-tree':
    case 'tree-lca': {
      const n = 7;
      const logN = Math.ceil(Math.log2(n));
      return {
        formula: `O(log₂ N) Balanced BST`,
        equation: `Height h ≈ ⌈log₂(${n})⌉ = ${logN}`,
        liveOps: `Step ${stepNum} / ${totalSteps || logN}`,
        progressPercent,
        ratioLabel: `Hierarchical left < root < right invariant`,
        statusBadge: progressPercent === 100 ? `Tree Traversal Complete` : `Tree Active`,
        spaceBound: `O(h) recursion stack`
      };
    }

    case 'min-max-heap':
    case 'top-k-elements':
      return {
        formula: `O(1) Peek | O(log N) Push/Pop`,
        equation: `Parent ⌊(i-1)/2⌋ ➔ Children 2i+1, 2i+2`,
        liveOps: `Heap Invariant Maintained`,
        progressPercent: 100,
        ratioLabel: `Build-Heap takes linear O(N) time`,
        statusBadge: `Optimal Priority Queue`,
        spaceBound: `O(N) 1D array`
      };

    case 'quick-select': {
      const n = customParams.arrayLength || 9;
      return {
        formula: `O(N) Average Selection`,
        equation: `T(N) = T(N/2) + O(N) = O(N)`,
        liveOps: `Step ${stepNum} / ${totalSteps || 8}`,
        progressPercent,
        ratioLabel: `Prunes half partition every recursive step`,
        statusBadge: progressPercent === 100 ? 'Target Element Selected' : `Hoare Partitioning`,
        spaceBound: `O(1) in-place`
      };
    }

    // ==========================================
    // 3. ALGORITHMS: GRAPHS
    // ==========================================
    case 'graph-bfs-dfs':
    case 'topological-sort':
      return {
        formula: `O(V + E) Linear Graph Search`,
        equation: `Visiting |V|=6 vertices, |E|=7 edges`,
        liveOps: `Step ${stepNum} / ${totalSteps || 10}`,
        progressPercent,
        ratioLabel: `Graph traversal with visited set`,
        statusBadge: progressPercent === 100 ? `Traversal Finished` : `Exploring Edges`,
        spaceBound: `O(V) recursion / queue`
      };

    case 'dijkstra': {
      const v = 6;
      const e = 8;
      const comp = Math.round((v + e) * Math.log2(v));
      return {
        formula: `O((V + E) log₂ V)`,
        equation: `(${v} + ${e}) × log₂(${v}) ≈ ${comp} ops`,
        liveOps: `Step ${stepNum} / ${totalSteps || comp}`,
        progressPercent,
        ratioLabel: `Priority Queue edge relaxation`,
        statusBadge: progressPercent === 100 ? 'Shortest Path Illuminated' : `Min-Heap Relaxing`,
        spaceBound: `O(V) distance map + priority queue`
      };
    }

    case 'bellman-ford': {
      const v = 5, e = 8;
      return {
        formula: `O(V · E) Bellman-Ford`,
        equation: `(${v} - 1) iterations × ${e} edges = ${4 * e} edge checks`,
        liveOps: `Step ${stepNum} / ${totalSteps || 4 * e}`,
        progressPercent,
        ratioLabel: `Detects negative weight cycles`,
        statusBadge: progressPercent === 100 ? `Distances Settled` : `Relaxing All Edges`,
        spaceBound: `O(V) distance array`
      };
    }

    case 'floyd-warshall': {
      const v = 4;
      return {
        formula: `O(V³) All-Pairs Shortest Path`,
        equation: `${v}³ = ${v * v * v} triple nested matrix iterations`,
        liveOps: `Step ${stepNum} / ${totalSteps || v * v * v}`,
        progressPercent,
        ratioLabel: `All-Pairs dynamic programming matrix`,
        statusBadge: progressPercent === 100 ? `All-Pairs Complete` : `Evaluating Intermediate k`,
        spaceBound: `O(V²) distance matrix`
      };
    }

    case 'disjoint-set':
      return {
        formula: `O(α(N)) ≈ O(1) DSU`,
        equation: `Inverse Ackermann α(N) < 5`,
        liveOps: `Near-constant time Union & Find`,
        progressPercent: 100,
        ratioLabel: `Path compression + rank heuristic`,
        statusBadge: `Optimal Disjoint Forest`,
        spaceBound: `O(N) parent/rank arrays`
      };

    // ==========================================
    // 3. ALGORITHMS: BACKTRACKING
    // ==========================================
    case 'n-queens': {
      const n = 4;
      return {
        formula: `O(N!) Backtracking Search`,
        equation: `State space tree with pruning: ${n}! = 24 permutations`,
        liveOps: `Step ${stepNum} / ${totalSteps || 24}`,
        progressPercent,
        ratioLabel: `Prunes attacking diagonal/column branches`,
        statusBadge: progressPercent === 100 ? `All Solutions Found` : `Backtracking on Board`,
        spaceBound: `O(N) recursion stack & board`
      };
    }

    case 'subsets-permutations': {
      const n = 3;
      return {
        formula: `O(2ᴺ) Subsets | O(N!) Permutations`,
        equation: `2^${n} = ${Math.pow(2, n)} power set branches`,
        liveOps: `Step ${stepNum} / ${totalSteps || Math.pow(2, n)}`,
        progressPercent,
        ratioLabel: `Decision tree inclusion/exclusion`,
        statusBadge: progressPercent === 100 ? `Power Set Generated` : `Exploring Decisions`,
        spaceBound: `O(N) recursion depth`
      };
    }

    case 'word-search': {
      return {
        formula: `O(N · 3ᴸ) 2D Grid DFS`,
        equation: `DFS Backtracking without cell reuse`,
        liveOps: `Step ${stepNum} / ${totalSteps || 12}`,
        progressPercent,
        ratioLabel: `In-place grid mark & unmark`,
        statusBadge: progressPercent === 100 ? 'Word Search Complete' : 'Backtracking Path',
        spaceBound: `O(L) recursion stack`
      };
    }

    // ==========================================
    // 3. ALGORITHMS: DYNAMIC PROGRAMMING
    // ==========================================
    case 'coin-change': {
      const amount = 11;
      return {
        formula: `O(Amount · Coins) 1D DP`,
        equation: `Table size ${amount + 1} × 3 coins = ${(amount + 1) * 3} iterations`,
        liveOps: `Step ${stepNum} / ${totalSteps || (amount + 1) * 3}`,
        progressPercent,
        ratioLabel: `dp[a] = min(dp[a], dp[a - c] + 1)`,
        statusBadge: progressPercent === 100 ? `Fewest Coins Found` : `Filling DP Table`,
        spaceBound: `O(Amount) array`
      };
    }

    case 'house-robber': {
      const n = 5;
      return {
        formula: `O(N) 1D Dynamic Programming`,
        equation: `dp[i] = max(dp[i-1], dp[i-2] + loot[i])`,
        liveOps: `Step ${stepNum} / ${totalSteps || n}`,
        progressPercent,
        ratioLabel: `Linear scan with O(1) space optimization`,
        statusBadge: progressPercent === 100 ? `Max Loot Found` : `Robbing Decisions`,
        spaceBound: `O(1) space optimized`
      };
    }

    case 'knapsack': {
      const n = 4, w = 5;
      return {
        formula: `O(N · W) Pseudo-Polynomial`,
        equation: `${n} items × ${w} capacity = ${n * w} subproblems`,
        liveOps: `Step ${stepNum} / ${totalSteps || (n + 1) * (w + 1)}`,
        progressPercent,
        ratioLabel: `2D state table memoization`,
        statusBadge: progressPercent === 100 ? 'DP Matrix Solved' : `Evaluating Items`,
        spaceBound: `O(N · W) 2D Table`
      };
    }

    case 'lcs':
    case 'edit-distance':
    case 'grid-paths': {
      const m = 6, n = 5;
      return {
        formula: `O(M · N) 2D Dynamic Programming`,
        equation: `${m} × ${n} = ${m * n} table cells`,
        liveOps: `Step ${stepNum} / ${totalSteps || m * n}`,
        progressPercent,
        ratioLabel: `Optimal Substructure Transitions`,
        statusBadge: progressPercent === 100 ? 'Matrix Solved' : `Filling 2D DP Grid`,
        spaceBound: `O(M · N) matrix`
      };
    }

    case 'lis': {
      const n = 8;
      const nLogN = Math.round(n * Math.log2(n));
      return {
        formula: `O(N log₂ N) Patience Sorting`,
        equation: `${n} numbers × log₂(${n}) ≈ ${nLogN} ops`,
        liveOps: `Step ${stepNum} / ${totalSteps || n}`,
        progressPercent,
        ratioLabel: `Binary search lower bound on tails array`,
        statusBadge: progressPercent === 100 ? 'LIS Solved in O(N log N)' : `Patience Sorting`,
        spaceBound: `O(N) tails array`
      };
    }

    default:
      return {
        formula: `O(N)`,
        equation: `Linear runtime bound`,
        liveOps: `Step ${stepNum} / ${totalSteps || 1}`,
        progressPercent,
        ratioLabel: `Standard complexity`,
        statusBadge: `Active`,
        spaceBound: `O(1)`
      };
  }
}
