/**
 * LFU Cache (Least Frequently Used) in JavaScript (ES6+)
 * 
 * Evicts the item with lowest access frequency.
 * If there is a tie in frequency, it evicts the least recently used item among them.
 * Implemented in strict O(1) time complexity using:
 * 1. Key Map: key -> LFUNode
 * 2. Frequency Map: freq -> DoublyLinkedList
 * 3. minFreq tracking pointer
 * 
 * Time Complexity:
 * - get(key): O(1)
 * - put(key, value): O(1)
 * Space Complexity: O(Capacity)
 */

class LFUNode {
  constructor(key = null, value = null) {
    this.key = key;
    this.value = value;
    this.freq = 1;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = new LFUNode();
    this.tail = new LFUNode();
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.size = 0;
  }

  addHead(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
    this.size++;
  }

  remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
    this.size--;
  }

  popTail() {
    if (this.size === 0) return null;
    const node = this.tail.prev;
    this.remove(node);
    return node;
  }

  isEmpty() {
    return this.size === 0;
  }
}

export class LFUCache {
  /**
   * @param {number} capacity 
   */
  constructor(capacity) {
    this.capacity = capacity;
    this.size = 0;
    this.minFreq = 0;
    this.keyMap = new Map(); // key -> LFUNode
    this.freqMap = new Map(); // freq (int) -> DoublyLinkedList
    this.logs = [];
  }

  _updateFrequency(node) {
    const oldFreq = node.freq;
    const oldList = this.freqMap.get(oldFreq);
    oldList.remove(node);

    // If the old frequency list is empty and it was the minFreq, increment minFreq
    if (oldList.isEmpty() && this.minFreq === oldFreq) {
      this.minFreq++;
    }

    node.freq++;
    if (!this.freqMap.has(node.freq)) {
      this.freqMap.set(node.freq, new DoublyLinkedList());
    }
    this.freqMap.get(node.freq).addHead(node);
  }

  /**
   * Retrieves value and increments frequency.
   * @param {*} key 
   * @returns {*}
   */
  get(key) {
    this.logs = [];
    if (this.capacity === 0 || !this.keyMap.has(key)) {
      this.logs.push(`CACHE MISS: Key "${key}" not in LFU.`);
      return null;
    }

    const node = this.keyMap.get(key);
    this._updateFrequency(node);
    this.logs.push(`CACHE HIT: Key "${key}" (value: "${node.value}") freq incremented to ${node.freq}.`);
    return node.value;
  }

  /**
   * Inserts or updates key-value pair.
   * @param {*} key 
   * @param {*} value 
   */
  put(key, value) {
    this.logs = [];
    if (this.capacity <= 0) return this.logs;

    if (this.keyMap.has(key)) {
      const node = this.keyMap.get(key);
      node.value = value;
      this._updateFrequency(node);
      this.logs.push(`UPDATED: Key "${key}" set to "${value}", freq updated to ${node.freq}.`);
      return this.logs;
    }

    if (this.size >= this.capacity) {
      // Evict from minFreq list
      const minList = this.freqMap.get(this.minFreq);
      const evicted = minList.popTail();
      if (evicted) {
        this.keyMap.delete(evicted.key);
        this.size--;
        this.logs.push(`LFU EVICTION: Evicted key "${evicted.key}" (val: "${evicted.value}", freq: ${evicted.freq}).`);
      }
    }

    const newNode = new LFUNode(key, value);
    this.keyMap.set(key, newNode);
    this.minFreq = 1;

    if (!this.freqMap.has(1)) {
      this.freqMap.set(1, new DoublyLinkedList());
    }
    this.freqMap.get(1).addHead(newNode);
    this.size++;
    this.logs.push(`INSERTED: Key "${key}" (val: "${value}", freq: 1).`);

    return this.logs;
  }

  /**
   * Detailed state snapshot for visualizer
   */
  getState() {
    const buckets = [];
    const sortedFreqs = Array.from(this.freqMap.keys()).sort((a, b) => a - b);

    for (const freq of sortedFreqs) {
      const list = this.freqMap.get(freq);
      if (list && !list.isEmpty()) {
        const items = [];
        let curr = list.head.next;
        while (curr !== list.tail) {
          items.push({ key: curr.key, value: curr.value, freq: curr.freq });
          curr = curr.next;
        }
        buckets.push({
          freq,
          isMin: freq === this.minFreq,
          items
        });
      }
    }

    return {
      capacity: this.capacity,
      size: this.size,
      minFreq: this.minFreq,
      buckets
    };
  }

  clear() {
    this.keyMap.clear();
    this.freqMap.clear();
    this.size = 0;
    this.minFreq = 0;
    this.logs = [];
  }
}
