/**
 * Segment Tree with Lazy Propagation in JavaScript (ES6+)
 * 
 * A tree data structure used for storing information about intervals or segments.
 * Allows querying which segments contain a given point, and answering range queries (sum, min, max)
 * in O(log N) time, with range updates via Lazy Propagation in O(log N).
 * 
 * Complexities:
 * - Build: O(N)
 * - Point Query / Range Query: O(log N)
 * - Point Update: O(log N)
 * - Range Update (with Lazy Propagation): O(log N)
 * Space: O(4N)
 */

export class SegmentTree {
  /**
   * @param {number[]} array Initial numbers array
   * @param {'sum' | 'min' | 'max'} mode Query aggregation type
   */
  constructor(array = [], mode = 'sum') {
    this.mode = mode;
    this.n = array.length;
    this.originalArray = [...array];
    this.tree = new Array(4 * Math.max(this.n, 1)).fill(0);
    this.lazy = new Array(4 * Math.max(this.n, 1)).fill(0);

    if (this.n > 0) {
      this._build(0, 0, this.n - 1);
    }
  }

  _merge(leftVal, rightVal) {
    if (this.mode === 'min') return Math.min(leftVal, rightVal);
    if (this.mode === 'max') return Math.max(leftVal, rightVal);
    return leftVal + rightVal; // default 'sum'
  }

  _getDefaultValue() {
    if (this.mode === 'min') return Infinity;
    if (this.mode === 'max') return -Infinity;
    return 0;
  }

  _build(node, start, end) {
    if (start === end) {
      this.tree[node] = this.originalArray[start];
      return;
    }

    const mid = Math.floor((start + end) / 2);
    const leftChild = 2 * node + 1;
    const rightChild = 2 * node + 2;

    this._build(leftChild, start, mid);
    this._build(rightChild, mid + 1, end);

    this.tree[node] = this._merge(this.tree[leftChild], this.tree[rightChild]);
  }

  _applyLazy(node, start, end) {
    if (this.lazy[node] !== 0) {
      const pendingVal = this.lazy[node];
      if (this.mode === 'sum') {
        this.tree[node] += (end - start + 1) * pendingVal;
      } else {
        this.tree[node] += pendingVal;
      }

      // Propagate to children if not leaf
      if (start !== end) {
        this.lazy[2 * node + 1] += pendingVal;
        this.lazy[2 * node + 2] += pendingVal;
      }

      this.lazy[node] = 0;
    }
  }

  /**
   * Query range [L, R] inclusive.
   * @param {number} L 
   * @param {number} R 
   * @returns {number}
   */
  query(L, R) {
    if (L < 0 || R >= this.n || L > R) {
      throw new Error(`Invalid range query [${L}, ${R}] for array of length ${this.n}`);
    }
    return this._query(0, 0, this.n - 1, L, R);
  }

  _query(node, start, end, L, R) {
    this._applyLazy(node, start, end);

    // Completely outside query range
    if (start > R || end < L) {
      return this._getDefaultValue();
    }

    // Completely inside query range
    if (L <= start && end <= R) {
      return this.tree[node];
    }

    // Partially inside
    const mid = Math.floor((start + end) / 2);
    const leftRes = this._query(2 * node + 1, start, mid, L, R);
    const rightRes = this._query(2 * node + 2, mid + 1, end, L, R);

    return this._merge(leftRes, rightRes);
  }

  /**
   * Point Update: Set or Add value at index.
   * @param {number} index 
   * @param {number} value 
   */
  updatePoint(index, value) {
    if (index < 0 || index >= this.n) {
      throw new Error(`Index ${index} out of bounds for size ${this.n}`);
    }
    this.originalArray[index] = value;
    this._updatePoint(0, 0, this.n - 1, index, value);
  }

  _updatePoint(node, start, end, index, value) {
    this._applyLazy(node, start, end);

    if (start === end) {
      this.tree[node] = value;
      return;
    }

    const mid = Math.floor((start + end) / 2);
    const leftChild = 2 * node + 1;
    const rightChild = 2 * node + 2;

    if (index <= mid) {
      this._updatePoint(leftChild, start, mid, index, value);
      this._applyLazy(rightChild, mid + 1, end);
    } else {
      this._updatePoint(rightChild, mid + 1, end, index, value);
      this._applyLazy(leftChild, start, mid);
    }

    this.tree[node] = this._merge(this.tree[leftChild], this.tree[rightChild]);
  }

  /**
   * Range Update: Add delta to all elements in range [L, R].
   * @param {number} L 
   * @param {number} R 
   * @param {number} delta 
   */
  updateRange(L, R, delta) {
    if (L < 0 || R >= this.n || L > R) {
      throw new Error(`Invalid range update [${L}, ${R}] for size ${this.n}`);
    }
    for (let i = L; i <= R; i++) {
      this.originalArray[i] += delta;
    }
    this._updateRange(0, 0, this.n - 1, L, R, delta);
  }

  _updateRange(node, start, end, L, R, delta) {
    this._applyLazy(node, start, end);

    // Out of range
    if (start > R || end < L) return;

    // Fully in range
    if (L <= start && end <= R) {
      this.lazy[node] += delta;
      this._applyLazy(node, start, end);
      return;
    }

    const mid = Math.floor((start + end) / 2);
    this._updateRange(2 * node + 1, start, mid, L, R, delta);
    this._updateRange(2 * node + 2, mid + 1, end, L, R, delta);

    this.tree[node] = this._merge(this.tree[2 * node + 1], this.tree[2 * node + 2]);
  }

  /**
   * Hierarchical export for visualization tree
   */
  toHierarchy(node = 0, start = 0, end = this.n - 1) {
    if (start > end || this.n === 0) return null;

    const obj = {
      index: node,
      range: `[${start}..${end}]`,
      val: this.tree[node],
      lazy: this.lazy[node],
      isLeaf: start === end
    };

    if (start !== end) {
      const mid = Math.floor((start + end) / 2);
      obj.children = [
        this.toHierarchy(2 * node + 1, start, mid),
        this.toHierarchy(2 * node + 2, mid + 1, end)
      ].filter(Boolean);
    }

    return obj;
  }
}
