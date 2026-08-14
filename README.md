# ⚡ Hard Data Structures & Algorithms (DSA) Master Suite & Interactive Visualizer

A comprehensive, production-grade JavaScript (ES6+) implementation of advanced and hard Data Structures & Algorithms, accompanied by an interactive, dark-themed web visualizer UI and an automated unit testing suite. Designed specifically for technical skills interviews, FAANG-level exams, and system engineering assessments.

---

## 🎯 Quick Start

### 1. Run Automated Unit Tests (CLI)
```bash
npm test
# or directly with Node:
node js/tests/all-tests.js
```

### 2. Launch the Interactive Web Visualizer
Open `index.html` directly in your browser or start a local server:
```bash
npx serve .
# or
python3 -m http.server 8080
```
Then navigate to `http://localhost:8080` or `http://localhost:3000`.

---

## 📊 Big-O Complexity Summary Table

| Data Structure / Algorithm | Average Time | Worst Time | Space (Auxiliary) | Key Interview Applications |
| :--- | :--- | :--- | :--- | :--- |
| **AVL Tree** | $O(\log N)$ | $O(\log N)$ | $O(N)$ | Self-balancing BST, strictly bounded height |
| **Trie (Prefix Tree)** | $O(L)$ | $O(L)$ | $O(\Sigma \cdot L \cdot N)$ | Autocomplete, prefix lookup, IP routing |
| **Segment Tree (Lazy)** | $O(\log N)$ | $O(\log N)$ | $O(4N)$ | Range queries (Sum/Min/Max) + Range updates |
| **Fenwick Tree (BIT)** | $O(\log N)$ | $O(\log N)$ | $O(N)$ | Cumulative frequency & dynamic prefix sums |
| **LRU Cache** | $O(1)$ | $O(1)$ | $O(C)$ | In-memory cache, page replacement |
| **LFU Cache** | $O(1)$ | $O(1)$ | $O(C)$ | Cache with frequency tiers + LRU tie-breaker |
| **Skip List** | $O(\log N)$ | $O(N)$ | $O(N)$ | Redis Sorted Sets, LevelDB, RocksDB |
| **Min/Max Binary Heap** | $O(\log N)$ | $O(\log N)$ | $O(N)$ | Priority Queues, Dijkstra, HeapSort, Top-K |
| **Disjoint Set (DSU)** | $O(\alpha(N)) \approx O(1)$ | $O(\alpha(N))$ | $O(N)$ | Kruskal MST, connected components, cycle check |
| **Dijkstra Shortest Path** | $O((V + E) \log V)$ | $O((V + E) \log V)$ | $O(V)$ | GPS navigation, network packet routing |
| **A\* Search Algorithm** | $O(E) \sim O(V \log V)$ | $O(V \log V)$ | $O(V)$ | Game AI pathfinding, heuristic grid routing |
| **Topological Sort (Kahn)** | $O(V + E)$ | $O(V + E)$ | $O(V)$ | Build systems (Webpack/Make), course schedules |
| **Kruskal's MST** | $O(E \log V)$ | $O(E \log V)$ | $O(V + E)$ | Network cabling, clustering, minimum wire cost |
| **0/1 Knapsack (DP)** | $O(N \cdot W)$ | $O(N \cdot W)$ | $O(W)$ | Budget optimization, subset sum |
| **LCS & Edit Distance** | $O(M \cdot N)$ | $O(M \cdot N)$ | $O(M \cdot N)$ | Git diff, spell checkers, DNA sequence alignment |
| **LIS (Patience Sorting)** | $O(N \log N)$ | $O(N \log N)$ | $O(N)$ | Box stacking, longest increasing chains |
| **3-Way QuickSort** | $O(N \log N)$ | $O(N^2)$ | $O(\log N)$ | General sorting with high duplicate density |
| **MergeSort** | $O(N \log N)$ | $O(N \log N)$ | $O(N)$ | Stable sorting, external sorting, linked lists |
| **Rotated Binary Search** | $O(\log N)$ | $O(\log N)$ | $O(1)$ | Shifted sorted array search |

---

## 🧠 Deep-Dive Architecture & Core Invariants

### 1. Self-Balancing Trees: AVL Tree
- **Balance Factor Formula**: `balance = height(left) - height(right)`. Valid range is $\{-1, 0, +1\}$.
- **The 4 Rotation Types**:
  1. **Left-Left (LL)**: Single Right Rotation on ancestor.
  2. **Right-Right (RR)**: Single Left Rotation on ancestor.
  3. **Left-Right (LR)**: Left Rotate left child, then Right Rotate ancestor.
  4. **Right-Left (RL)**: Right Rotate right child, then Left Rotate ancestor.

### 2. High-Performance Caching: LRU & LFU
- **LRU Cache**: Doubly Linked List + Hash Map. `[Head (MRU)] <-> ... <-> [Tail (LRU)]`. Both `get(key)` and `put(key, val)` execute in strict $O(1)$ time.
- **LFU Cache**: Frequency Buckets (`Map<freq, DoublyLinkedList>`) + `keyMap` + `minFreq` pointer. Evicts the lowest frequency node (with LRU tie-breaking) in strict $O(1)$ time.

### 3. Probabilistic Multi-Level Express Lanes: Skip List
- Uses a coin-flip geometric distribution ($p = 0.5$) to promote nodes into higher levels.
- Searches skip large segments of elements at higher levels before dropping to Level 0.

### 4. Advanced Graph Algorithms
- **Dijkstra**: Uses a Min-Priority Queue. Requires all edge weights $w \ge 0$.
- **A\* Pathfinding**: $f(n) = g(n) + h(n)$. Guaranteed optimal when $h(n)$ is admissible (e.g. Manhattan distance).
- **Topological Sort**: Kahn's algorithm maintains an in-degree array. If the number of processed nodes $< V$, the graph has a **cycle**.
- **Kruskal's MST**: Greedy edge sorting + Disjoint Set Union (DSU) with Path Compression & Union by Rank.

### 5. Dynamic Programming Highlights
- **0/1 Knapsack**: 1D array space optimization iterates capacity backwards $W \to wt$ to prevent double-counting.
- **Longest Increasing Subsequence (LIS)**: Uses Patience Sorting with Binary Search ($O(N \log N)$) instead of the naive $O(N^2)$ DP.

---

## 📁 Project Directory Layout

```
├── index.html                   # Interactive modern web playground
├── css/
│   └── style.css                # Polished dark-theme CSS design system
├── js/
│   ├── app.js                   # Main application coordinator
│   ├── visualizer/              # Dynamic SVG / Canvas animation engines
│   │   ├── tree-visualizer.js
│   │   ├── graph-visualizer.js
│   │   ├── dp-visualizer.js
│   │   ├── cache-visualizer.js
│   │   └── array-visualizer.js
│   ├── structures/              # Standalone data structures
│   │   ├── avl-tree.js
│   │   ├── trie.js
│   │   ├── segment-tree.js
│   │   ├── fenwick-tree.js
│   │   ├── min-max-heap.js
│   │   ├── disjoint-set.js
│   │   ├── lru-cache.js
│   │   ├── lfu-cache.js
│   │   └── skip-list.js
│   ├── algorithms/
│   │   ├── graph/
│   │   │   ├── dijkstra.js
│   │   │   ├── a-star.js
│   │   │   ├── topological-sort.js
│   │   │   └── kruskal-mst.js
│   │   ├── dp/
│   │   │   ├── knapsack.js
│   │   │   ├── lcs.js
│   │   │   ├── edit-distance.js
│   │   │   └── lis.js
│   │   └── sorting-searching/
│   │       ├── quick-sort.js
│   │       ├── merge-sort.js
│   │       └── binary-search.js
│   └── tests/
│       ├── test-framework.js    # Zero-dependency test runner
│       └── all-tests.js         # Comprehensive 31+ unit test cases
└── package.json
```

---

## 🧪 Verification & Testing
All modules are backed by automated unit tests covering edge cases, balance invariants, cycle detection, and optimal path reconstructions.
Run tests anytime via:
```bash
npm test
```
Or open the web visualizer and click **🧪 Run All Unit Tests** to view interactive real-time test execution.
# Data-structures-Algorithms
# Data-structures-Algorithms
