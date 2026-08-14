/**
 * Fenwick Tree (Binary Indexed Tree / BIT) in JavaScript (ES6+)
 * 
 * A space-efficient tree structure represented as a 1D array that maintains prefix sums
 * and supports point updates in O(log N) using bit manipulation: `i & (-i)`.
 * 
 * Complexities:
 * - Build: O(N) or O(N log N)
 * - Point Update: O(log N)
 * - Prefix Sum Query: O(log N)
 * - Range Sum Query [L, R]: O(log N)
 * Space Complexity: O(N)
 */

export class FenwickTree {
  /**
   * @param {number[] | number} sizeOrArray Size of tree or initial array (0-indexed)
   */
  constructor(sizeOrArray = 0) {
    if (Array.isArray(sizeOrArray)) {
      this.size = sizeOrArray.length;
      this.tree = new Array(this.size + 1).fill(0);
      this.values = [...sizeOrArray];

      // O(N) build algorithm
      for (let i = 0; i < this.size; i++) {
        this.tree[i + 1] = this.values[i];
      }
      for (let i = 1; i <= this.size; i++) {
        const parent = i + (i & -i);
        if (parent <= this.size) {
          this.tree[parent] += this.tree[i];
        }
      }
    } else {
      this.size = sizeOrArray;
      this.tree = new Array(this.size + 1).fill(0);
      this.values = new Array(this.size).fill(0);
    }
  }

  /**
   * Adds delta to the element at 0-based index.
   * @param {number} index 0-based index
   * @param {number} delta Amount to add
   */
  update(index, delta) {
    if (index < 0 || index >= this.size) {
      throw new Error(`Index ${index} out of bounds for Fenwick Tree size ${this.size}`);
    }
    this.values[index] += delta;

    let i = index + 1; // Convert to 1-based index
    while (i <= this.size) {
      this.tree[i] += delta;
      i += i & -i; // Move to parent covering larger range
    }
  }

  /**
   * Sets value at 0-based index.
   * @param {number} index 
   * @param {number} value 
   */
  set(index, value) {
    const delta = value - this.values[index];
    this.update(index, delta);
  }

  /**
   * Computes prefix sum from index 0 to index (inclusive, 0-based).
   * @param {number} index 
   * @returns {number} Sum of elements array[0..index]
   */
  queryPrefix(index) {
    if (index < 0) return 0;
    if (index >= this.size) index = this.size - 1;

    let sum = 0;
    let i = index + 1; // 1-based index
    while (i > 0) {
      sum += this.tree[i];
      i -= i & -i; // Strip lowest set bit to jump to previous interval
    }
    return sum;
  }

  /**
   * Computes range sum of elements in range [L, R] (inclusive, 0-based).
   * @param {number} L 
   * @param {number} R 
   * @returns {number}
   */
  queryRange(L, R) {
    if (L < 0 || R >= this.size || L > R) {
      throw new Error(`Invalid range [${L}, ${R}] for size ${this.size}`);
    }
    return this.queryPrefix(R) - this.queryPrefix(L - 1);
  }

  /**
   * Export detailed node state for visualizer inspection
   */
  getVisualizationState() {
    const nodes = [];
    for (let i = 1; i <= this.size; i++) {
      const lsb = i & -i;
      const coverageStart = i - lsb; // 0-based start
      const coverageEnd = i - 1;     // 0-based end
      nodes.push({
        index1: i,
        index0: i - 1,
        val: this.tree[i],
        originalVal: this.values[i - 1],
        lsb: lsb,
        binary: i.toString(2).padStart(Math.max(4, Math.ceil(Math.log2(this.size + 1))), '0'),
        rangeStr: `[${coverageStart}..${coverageEnd}]`
      });
    }
    return {
      size: this.size,
      rawValues: [...this.values],
      nodes: nodes
    };
  }
}
