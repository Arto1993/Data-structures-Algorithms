/**
 * Dynamic Array (Resizable Contiguous Buffer) Implementation in JavaScript (ES6+)
 * 
 * Features:
 * - O(1) Direct Indexed Memory Access: Address = BaseAddress + index * sizeof(DataType)
 * - O(1) Amortized Append (Push) with Geometric Doubling
 * - O(1) Pop from end
 * - O(N) In-Place Insert and Delete with Element Shifting
 * - O(N) Linear Search
 * 
 * Space Complexity: O(N) contiguous buffer
 */

export class DynamicArray {
  /**
   * @param {number} initialCapacity 
   */
  constructor(initialCapacity = 4) {
    this.capacity = Math.max(1, initialCapacity);
    this.length = 0;
    this.buffer = new Array(this.capacity).fill(null);
    this.baseAddress = 0x1000;
    this.elementBytes = 4; // 4-byte Int32
  }

  /**
   * Returns the memory address of an element at a given index.
   * Direct O(1) pointer arithmetic formula: Base + index * sizeof(T)
   * @param {number} index 
   * @returns {string} Hexadecimal address string
   */
  getMemoryAddress(index) {
    if (index < 0 || index >= this.capacity) {
      throw new RangeError(`Index ${index} is out of bounds for buffer capacity ${this.capacity}`);
    }
    const offset = index * this.elementBytes;
    return `0x${(this.baseAddress + offset).toString(16).toUpperCase()}`;
  }

  /**
   * Direct Random Access at index [i] in O(1) constant time.
   * @param {number} index 
   * @returns {*}
   */
  get(index) {
    if (index < 0 || index >= this.length) {
      throw new RangeError(`Index ${index} out of bounds [0..${this.length - 1}]`);
    }
    return this.buffer[index];
  }

  /**
   * Modifies element at index [i] in O(1) constant time.
   * @param {number} index 
   * @param {*} value 
   */
  set(index, value) {
    if (index < 0 || index >= this.length) {
      throw new RangeError(`Index ${index} out of bounds [0..${this.length - 1}]`);
    }
    this.buffer[index] = value;
  }

  /**
   * Appends an element to the end of the array.
   * Amortized O(1) Time Complexity (Σ (N / 2ⁱ) < 2N ops).
   * @param {*} value 
   */
  push(value) {
    if (this.length >= this.capacity) {
      this._resize(this.capacity * 2);
    }
    this.buffer[this.length] = value;
    this.length++;
    return this.length;
  }

  /**
   * Removes and returns the last element in O(1) constant time.
   * Shrinks buffer if size falls below capacity / 4.
   * @returns {*}
   */
  pop() {
    if (this.length === 0) {
      throw new Error('Cannot pop from an empty dynamic array');
    }
    const removedValue = this.buffer[this.length - 1];
    this.buffer[this.length - 1] = null;
    this.length--;

    // Optional shrink to prevent memory leaks
    if (this.length > 0 && this.length <= Math.floor(this.capacity / 4)) {
      this._resize(Math.floor(this.capacity / 2));
    }

    return removedValue;
  }

  /**
   * Inserts an element at a specific index in O(N) time.
   * Shifts elements from index up to length - 1 one slot to the right.
   * @param {number} index 
   * @param {*} value 
   */
  insert(index, value) {
    if (index < 0 || index > this.length) {
      throw new RangeError(`Insert index ${index} out of bounds [0..${this.length}]`);
    }

    if (this.length >= this.capacity) {
      this._resize(this.capacity * 2);
    }

    // Shift elements right
    for (let i = this.length; i > index; i--) {
      this.buffer[i] = this.buffer[i - 1];
    }

    this.buffer[index] = value;
    this.length++;
  }

  /**
   * Deletes the element at a specific index in O(N) time.
   * Shifts elements from index + 1 up to length - 1 one slot to the left.
   * @param {number} index 
   * @returns {*} Removed element
   */
  delete(index) {
    if (index < 0 || index >= this.length) {
      throw new RangeError(`Delete index ${index} out of bounds [0..${this.length - 1}]`);
    }

    const removedValue = this.buffer[index];

    // Shift elements left
    for (let i = index; i < this.length - 1; i++) {
      this.buffer[i] = this.buffer[i + 1];
    }

    this.buffer[this.length - 1] = null;
    this.length--;

    if (this.length > 0 && this.length <= Math.floor(this.capacity / 4)) {
      this._resize(Math.floor(this.capacity / 2));
    }

    return removedValue;
  }

  /**
   * Searches for a value using linear scan in O(N) time.
   * @param {*} target 
   * @returns {number} Index if found, or -1
   */
  indexOf(target) {
    for (let i = 0; i < this.length; i++) {
      if (this.buffer[i] === target) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Internal resize: allocates new contiguous buffer and copies elements.
   * @private
   * @param {number} newCapacity 
   */
  _resize(newCapacity) {
    const newBuffer = new Array(newCapacity).fill(null);
    for (let i = 0; i < this.length; i++) {
      newBuffer[i] = this.buffer[i];
    }
    this.buffer = newBuffer;
    this.capacity = newCapacity;
  }

  /**
   * Returns a clean array representation of active elements.
   * @returns {Array}
   */
  toArray() {
    return this.buffer.slice(0, this.length);
  }
}
