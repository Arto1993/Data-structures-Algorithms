/**
 * Disjoint Set Union (DSU / Union-Find) in JavaScript (ES6+)
 * 
 * Tracks a set of elements partitioned into a number of disjoint (non-overlapping) subsets.
 * Features:
 * - Path Compression (flattens tree during find)
 * - Union by Rank/Size (attaches smaller depth tree under root of deeper tree)
 * 
 * Time Complexity:
 * - Find: O(α(N)) amortized nearly O(1) (Inverse Ackermann function)
 * - Union: O(α(N)) amortized nearly O(1)
 * Space Complexity: O(N)
 */

export class DisjointSet {
  /**
   * @param {number} size Number of initial elements [0..size-1]
   */
  constructor(size = 0) {
    this.size = size;
    this.parent = new Array(size);
    this.rank = new Array(size).fill(0);
    this.setSize = new Array(size).fill(1);
    this.numSets = size;

    for (let i = 0; i < size; i++) {
      this.parent[i] = i; // Each node is its own parent initially
    }
  }

  /**
   * Finds the representative root of element i with Path Compression.
   * @param {number} i 
   * @returns {number}
   */
  find(i) {
    if (i < 0 || i >= this.size) {
      throw new Error(`Element ${i} out of bounds for DSU size ${this.size}`);
    }

    if (this.parent[i] === i) {
      return i;
    }

    // Path Compression: directly link current node to root
    this.parent[i] = this.find(this.parent[i]);
    return this.parent[i];
  }

  /**
   * Unites the set containing i with the set containing j.
   * Uses Union by Rank to maintain tree balance.
   * @param {number} i 
   * @param {number} j 
   * @returns {boolean} True if sets were merged, false if already in the same set
   */
  union(i, j) {
    const rootI = this.find(i);
    const rootJ = this.find(j);

    if (rootI === rootJ) {
      return false; // Already connected
    }

    // Union by Rank
    if (this.rank[rootI] < this.rank[rootJ]) {
      this.parent[rootI] = rootJ;
      this.setSize[rootJ] += this.setSize[rootI];
    } else if (this.rank[rootI] > this.rank[rootJ]) {
      this.parent[rootJ] = rootI;
      this.setSize[rootI] += this.setSize[rootJ];
    } else {
      this.parent[rootJ] = rootI;
      this.setSize[rootI] += this.setSize[rootJ];
      this.rank[rootI]++;
    }

    this.numSets--;
    return true;
  }

  /**
   * Returns whether i and j belong to the same component.
   * @param {number} i 
   * @param {number} j 
   * @returns {boolean}
   */
  connected(i, j) {
    return this.find(i) === this.find(j);
  }

  /**
   * Returns the size of the set containing element i.
   * @param {number} i 
   * @returns {number}
   */
  getComponentSize(i) {
    return this.setSize[this.find(i)];
  }

  /**
   * Returns a map of root -> Array of member elements.
   * @returns {Map<number, number[]>}
   */
  getGroups() {
    const groups = new Map();
    for (let i = 0; i < this.size; i++) {
      const root = this.find(i);
      if (!groups.has(root)) {
        groups.set(root, []);
      }
      groups.get(root).push(i);
    }
    return groups;
  }

  /**
   * State snapshot for visualizer
   */
  getState() {
    return {
      size: this.size,
      numSets: this.numSets,
      parent: [...this.parent],
      rank: [...this.rank],
      setSize: [...this.setSize],
      groups: Array.from(this.getGroups().entries()).map(([root, members]) => ({
        root,
        members,
        size: members.length
      }))
    };
  }

  /**
   * Connected Components & Cycle Detection with Step Snapshots
   */
  static connectedComponentsWithSteps(n = 6, edges = [[0, 1], [1, 2], [3, 4], [4, 5]]) {
    const dsu = new DisjointSet(n);
    const steps = [];

    steps.push({
      type: 'init',
      parent: [...dsu.parent],
      numSets: dsu.numSets,
      explanation: `Initialized DSU for ${n} vertices {0..${n - 1}} with ${n} disjoint components.`
    });

    for (const [u, v] of edges) {
      const merged = dsu.union(u, v);
      steps.push({
        type: 'union',
        u,
        v,
        merged,
        parent: [...dsu.parent],
        numSets: dsu.numSets,
        explanation: merged
          ? `Union(${u}, ${v}): Successfully merged set containing ${u} with set containing ${v}. Components: ${dsu.numSets}.`
          : `Union(${u}, ${v}): Vertex ${u} & ${v} already in same component (Cycle detected)!`
      });
    }

    const groups = dsu.getState().groups;
    steps.push({
      type: 'complete',
      parent: [...dsu.parent],
      numSets: dsu.numSets,
      groups,
      explanation: `🎉 Found ${dsu.numSets} Connected Components across ${n} vertices.`
    });

    return { numSets: dsu.numSets, groups, steps };
  }
}
