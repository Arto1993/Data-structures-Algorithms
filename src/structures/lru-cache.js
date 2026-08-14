/**
 * LRU Cache (Least Recently Used) in JavaScript (ES6+)
 * 
 * Uses a Hash Map combined with a Doubly Linked List with dummy head & tail
 * to achieve strict O(1) time complexity for both get and put operations.
 * 
 * Structure:
 * [Head] <-> [Most Recently Used] <-> ... <-> [Least Recently Used] <-> [Tail]
 * 
 * Time Complexity:
 * - get(key): O(1)
 * - put(key, value): O(1)
 * Space Complexity: O(Capacity)
 */

class DNode {
  constructor(key = null, value = null) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

export class LRUCache {
  /**
   * @param {number} capacity 
   */
  constructor(capacity) {
    if (capacity <= 0) throw new Error("Capacity must be greater than 0");
    this.capacity = capacity;
    this.map = new Map(); // key -> DNode
    this.size = 0;

    // Sentinel dummy nodes
    this.head = new DNode();
    this.tail = new DNode();
    this.head.next = this.tail;
    this.tail.prev = this.head;

    this.logs = [];
  }

  _removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  _addToHead(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }

  _moveToHead(node) {
    this._removeNode(node);
    this._addToHead(node);
  }

  _popTail() {
    const lruNode = this.tail.prev;
    this._removeNode(lruNode);
    return lruNode;
  }

  /**
   * Retrieves value for key and marks it as Most Recently Used.
   * @param {*} key 
   * @returns {*} Value or null if not found
   */
  get(key) {
    this.logs = [];
    if (!this.map.has(key)) {
      this.logs.push(`CACHE MISS: Key "${key}" not found.`);
      return null;
    }

    const node = this.map.get(key);
    this._moveToHead(node);
    this.logs.push(`CACHE HIT: Key "${key}" found with value "${node.value}". Moved to MRU head.`);
    return node.value;
  }

  /**
   * Inserts or updates key-value pair. Evicts LRU item if capacity is exceeded.
   * @param {*} key 
   * @param {*} value 
   */
  put(key, value) {
    this.logs = [];
    if (this.map.has(key)) {
      const node = this.map.get(key);
      node.value = value;
      this._moveToHead(node);
      this.logs.push(`UPDATED: Key "${key}" updated to value "${value}". Moved to MRU head.`);
      return this.logs;
    }

    const newNode = new DNode(key, value);
    this.map.set(key, newNode);
    this._addToHead(newNode);
    this.size++;
    this.logs.push(`INSERTED: Key "${key}" with value "${value}" added to MRU head.`);

    if (this.size > this.capacity) {
      const evicted = this._popTail();
      this.map.delete(evicted.key);
      this.size--;
      this.logs.push(`CAPACITY EXCEEDED (${this.capacity}): Evicted LRU key "${evicted.key}" (val: "${evicted.value}").`);
    }

    return this.logs;
  }

  /**
   * State snapshot for visualization
   */
  getState() {
    const list = [];
    let curr = this.head.next;
    while (curr !== this.tail) {
      list.push({ key: curr.key, value: curr.value });
      curr = curr.next;
    }
    return {
      capacity: this.capacity,
      size: this.size,
      items: list, // MRU to LRU order
      keys: Array.from(this.map.keys())
    };
  }

  clear() {
    this.map.clear();
    this.size = 0;
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.logs = [];
  }
}
