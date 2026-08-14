/**
 * Skip List Implementation in JavaScript (ES6+)
 * 
 * A probabilistic data structure that allows O(log N) search, insertion, and deletion
 * within an ordered sequence of elements by maintaining multiple linked hierarchy layers (express lanes).
 * 
 * Used in Redis Sorted Sets, LevelDB, and RocksDB.
 * 
 * Complexities:
 * - Search: O(log N) average, O(N) worst case
 * - Insert: O(log N) average
 * - Delete: O(log N) average
 * Space: O(N)
 */

class SkipListNode {
  constructor(value, level) {
    this.value = value;
    this.forward = new Array(level + 1).fill(null);
  }
}

export class SkipList {
  /**
   * @param {number} [maxLevel=16] Maximum allowable level
   * @param {number} [p=0.5] Probability of level promotion (coin flip)
   */
  constructor(maxLevel = 8, p = 0.5) {
    this.maxLevel = maxLevel;
    this.p = p;
    this.level = 0; // Current maximum level among all inserted elements
    this.header = new SkipListNode(-Infinity, maxLevel);
    this.size = 0;
    this.logs = [];
  }

  _randomLevel() {
    let lvl = 0;
    while (Math.random() < this.p && lvl < this.maxLevel - 1) {
      lvl++;
    }
    return lvl;
  }

  /**
   * Searches for a value in the Skip List.
   * Traverses high-level express lanes first, then drops down to lower levels.
   * @param {number} target 
   * @returns {{found: boolean, path: Array<{level: number, value: number}>}}
   */
  search(target) {
    let curr = this.header;
    const path = [];

    for (let i = this.level; i >= 0; i--) {
      while (curr.forward[i] !== null && curr.forward[i].value < target) {
        curr = curr.forward[i];
        path.push({ level: i, value: curr.value });
      }
      path.push({ level: i, value: curr.value === -Infinity ? 'HEADER' : curr.value });
    }

    curr = curr.forward[0];
    const found = curr !== null && curr.value === target;
    return { found, node: found ? curr : null, path };
  }

  /**
   * Inserts a value into the Skip List.
   * @param {number} value 
   */
  insert(value) {
    this.logs = [];
    const update = new Array(this.maxLevel).fill(null);
    let curr = this.header;

    // 1. Locate insertion predecessors at each level
    for (let i = this.level; i >= 0; i--) {
      while (curr.forward[i] !== null && curr.forward[i].value < value) {
        curr = curr.forward[i];
      }
      update[i] = curr;
    }

    curr = curr.forward[0];

    // If duplicate
    if (curr !== null && curr.value === value) {
      this.logs.push(`Value ${value} already exists in Skip List.`);
      return this.logs;
    }

    // 2. Generate random height level for new node
    const newLevel = this._randomLevel();

    // If newLevel is higher than current list level, initialize pointers
    if (newLevel > this.level) {
      for (let i = this.level + 1; i <= newLevel; i++) {
        update[i] = this.header;
      }
      this.level = newLevel;
    }

    // 3. Create new node and splice into pointers
    const newNode = new SkipListNode(value, newLevel);
    for (let i = 0; i <= newLevel; i++) {
      newNode.forward[i] = update[i].forward[i];
      update[i].forward[i] = newNode;
    }

    this.size++;
    this.logs.push(`Inserted ${value} with generated level height ${newLevel} (Max list level: ${this.level}).`);
    return this.logs;
  }

  /**
   * Deletes a value from the Skip List.
   * @param {number} value 
   * @returns {boolean}
   */
  delete(value) {
    this.logs = [];
    const update = new Array(this.maxLevel).fill(null);
    let curr = this.header;

    for (let i = this.level; i >= 0; i--) {
      while (curr.forward[i] !== null && curr.forward[i].value < value) {
        curr = curr.forward[i];
      }
      update[i] = curr;
    }

    curr = curr.forward[0];

    if (curr !== null && curr.value === value) {
      // Re-link pointers bypassing node
      for (let i = 0; i <= this.level; i++) {
        if (update[i].forward[i] !== curr) break;
        update[i].forward[i] = curr.forward[i];
      }

      // Update current maximum level if top levels became empty
      while (this.level > 0 && this.header.forward[this.level] === null) {
        this.level--;
      }

      this.size--;
      this.logs.push(`Successfully removed ${value} from Skip List.`);
      return true;
    }

    this.logs.push(`Value ${value} not found for deletion.`);
    return false;
  }

  /**
   * Snapshot matrix for multi-lane visualization
   */
  getState() {
    // Collect all distinct values at bottom level (Level 0)
    const allValues = [];
    let curr = this.header.forward[0];
    while (curr !== null) {
      allValues.push(curr.value);
      curr = curr.forward[0];
    }

    // For each level, build lane array
    const lanes = [];
    for (let l = this.level; l >= 0; l--) {
      const laneNodes = [];
      let c = this.header.forward[l];
      while (c !== null) {
        laneNodes.push(c.value);
        c = c.forward[l];
      }
      lanes.push({
        level: l,
        nodes: laneNodes
      });
    }

    return {
      size: this.size,
      currentMaxLevel: this.level,
      allValues,
      lanes
    };
  }

  clear() {
    this.level = 0;
    this.header = new SkipListNode(-Infinity, this.maxLevel);
    this.size = 0;
    this.logs = [];
  }
}
