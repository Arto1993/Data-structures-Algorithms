/**
 * Min/Max Binary Heap & Priority Queue in JavaScript (ES6+)
 * 
 * A complete binary tree satisfying the heap property.
 * Supports custom comparator functions for flexible MinHeap, MaxHeap,
 * or object priority queuing.
 * 
 * Complexities:
 * - Insert (push): O(log N)
 * - Extract (pop): O(log N)
 * - Peek (top): O(1)
 * - Heapify (Build from array): O(N)
 * - Remove arbitrary element: O(N)
 * Space Complexity: O(N)
 */

export class PriorityQueue {
  /**
   * @param {Function} [comparator=(a, b) => a - b] Comparator function.
   * Return < 0 if a has higher priority than b (e.g. MinHeap: a - b, MaxHeap: b - a).
   */
  constructor(comparator = (a, b) => (a < b ? -1 : a > b ? 1 : 0)) {
    this.heap = [];
    this.comparator = comparator;
    this.stepLogs = [];
  }

  // Static Factory Methods for convenience
  static createMinHeap(keyExtractor = (x) => x) {
    return new PriorityQueue((a, b) => {
      const ka = keyExtractor(a);
      const kb = keyExtractor(b);
      return ka < kb ? -1 : ka > kb ? 1 : 0;
    });
  }

  static createMaxHeap(keyExtractor = (x) => x) {
    return new PriorityQueue((a, b) => {
      const ka = keyExtractor(a);
      const kb = keyExtractor(b);
      return ka > kb ? -1 : ka < kb ? 1 : 0;
    });
  }

  get size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  peek() {
    return this.isEmpty() ? null : this.heap[0];
  }

  _parent(i) {
    return Math.floor((i - 1) / 2);
  }

  _leftChild(i) {
    return 2 * i + 1;
  }

  _rightChild(i) {
    return 2 * i + 2;
  }

  _swap(i, j) {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }

  _compare(i, j) {
    return this.comparator(this.heap[i], this.heap[j]) < 0;
  }

  /**
   * Sift-Up (Bubble-Up): Move element at index i up until heap invariant is restored.
   */
  _siftUp(i) {
    while (i > 0 && this._compare(i, this._parent(i))) {
      const p = this._parent(i);
      this.stepLogs.push(`Sift-Up swap: index ${i} (${JSON.stringify(this.heap[i])}) with parent index ${p} (${JSON.stringify(this.heap[p])})`);
      this._swap(i, p);
      i = p;
    }
  }

  /**
   * Sift-Down (Sink-Down): Move element at index i down until heap invariant is restored.
   */
  _siftDown(i) {
    const n = this.heap.length;
    while (this._leftChild(i) < n) {
      let candidate = this._leftChild(i);
      const right = this._rightChild(i);

      if (right < n && this._compare(right, candidate)) {
        candidate = right;
      }

      if (this._compare(candidate, i)) {
        this.stepLogs.push(`Sift-Down swap: index ${i} (${JSON.stringify(this.heap[i])}) with child index ${candidate} (${JSON.stringify(this.heap[candidate])})`);
        this._swap(i, candidate);
        i = candidate;
      } else {
        break;
      }
    }
  }

  /**
   * Inserts a new element into the heap.
   * @param {*} value 
   */
  push(value) {
    this.stepLogs = [];
    this.heap.push(value);
    this._siftUp(this.heap.length - 1);
    return this.stepLogs;
  }

  /**
   * Removes and returns the highest priority element (root).
   * @returns {*}
   */
  pop() {
    if (this.isEmpty()) return null;
    this.stepLogs = [];

    const root = this.heap[0];
    const bottom = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = bottom;
      this._siftDown(0);
    }

    return root;
  }

  /**
   * In-place O(N) Bottom-Up Heap Construction from array.
   * @param {Array} array 
   */
  heapify(array) {
    this.heap = [...array];
    this.stepLogs = [];
    const n = this.heap.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      this._siftDown(i);
    }
  }

  /**
   * Exports tree representation for hierarchical visualizers
   */
  toHierarchy(index = 0) {
    if (index >= this.heap.length) return null;
    return {
      value: this.heap[index],
      index: index,
      left: this.toHierarchy(this._leftChild(index)),
      right: this.toHierarchy(this._rightChild(index))
    };
  }

  toArray() {
    return [...this.heap];
  }

  clear() {
    this.heap = [];
    this.stepLogs = [];
  }

  /**
   * Top K Frequent Elements using Min-Heap of size K in O(N log K)
   */
  static topKFrequentWithSteps(nums = [1, 1, 1, 2, 2, 3], k = 2) {
    const freq = {};
    for (const n of nums) freq[n] = (freq[n] || 0) + 1;

    const pq = new PriorityQueue((a, b) => a.count - b.count);
    const steps = [];

    steps.push({
      type: 'init',
      nums: [...nums],
      k,
      freq: { ...freq },
      heap: [],
      explanation: `Frequencies: ${JSON.stringify(freq)}. Maintaining Min-Heap of max size K = ${k}.`
    });

    const entries = Object.entries(freq).map(([val, count]) => ({ val: Number(val), count }));

    for (const entry of entries) {
      pq.push(entry);
      steps.push({
        type: 'push',
        entry,
        heap: pq.toArray(),
        explanation: `Pushed item ${entry.val} (count=${entry.count}) into Min-Heap. Size = ${pq.size}.`
      });

      if (pq.size > k) {
        const popped = pq.pop();
        steps.push({
          type: 'evict',
          popped,
          heap: pq.toArray(),
          explanation: `Heap exceeded size K=${k}! Evicted minimum element ${popped.val} (count=${popped.count}).`
        });
      }
    }

    const topK = pq.toArray().map(e => e.val);
    steps.push({
      type: 'complete',
      topK,
      heap: pq.toArray(),
      explanation: `🎉 Top ${k} Frequent Elements: [${topK.join(', ')}].`
    });

    return { topK, steps };
  }
}
