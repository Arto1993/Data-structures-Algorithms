/**
 * Stack, Queue, Deque, and Monotonic Stack in JavaScript (ES6+)
 * 
 * Fundamental linear structures with strict access policies:
 * - Stack: LIFO (Last-In First-Out)
 * - Queue: FIFO (First-In First-Out)
 * - Deque: Double-Ended Queue (O(1) front/rear operations)
 * - Monotonic Stack: Stack maintaining monotonic increasing/decreasing order
 */

export class Stack {
  constructor() {
    this.items = [];
  }

  push(val) {
    this.items.push(val);
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  toArray() {
    return [...this.items];
  }
}

export class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(val) {
    this.items.push(val);
  }

  dequeue() {
    return this.items.shift();
  }

  peek() {
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  toArray() {
    return [...this.items];
  }
}

export class Deque {
  constructor() {
    this.items = [];
  }

  pushFront(val) {
    this.items.unshift(val);
  }

  pushBack(val) {
    this.items.push(val);
  }

  popFront() {
    return this.items.shift();
  }

  popBack() {
    return this.items.pop();
  }

  peekFront() {
    return this.items[0];
  }

  peekBack() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  toArray() {
    return [...this.items];
  }
}

export class MonotonicStack {
  /**
   * Solves Next Greater Element problem using Monotonic Decreasing Stack.
   * Time Complexity: O(N) linear scan
   * Space Complexity: O(N)
   * @param {number[]} arr 
   */
  static nextGreaterElements(arr = [2, 1, 2, 4, 3]) {
    const n = arr.length;
    const result = new Array(n).fill(-1);
    const stack = []; // Stores indices
    const steps = [];

    const getStackSnapshot = () => stack.map(idx => ({ idx, val: arr[idx] }));

    steps.push({
      type: 'init',
      input: [...arr],
      stack: getStackSnapshot(),
      result: [...result],
      currentIdx: null,
      resolvedIdx: null,
      explanation: `Initialized Monotonic Stack on [${arr.join(', ')}]. Stack is empty; all result values default to -1.`
    });

    for (let i = 0; i < n; i++) {
      const currentVal = arr[i];

      steps.push({
        type: 'examine',
        input: [...arr],
        stack: getStackSnapshot(),
        result: [...result],
        currentIdx: i,
        currentVal,
        resolvedIdx: null,
        explanation: `At index [${i}] (val=${currentVal}): Checking against top of monotonic stack.`
      });

      // Pop elements from stack that are smaller than currentVal
      while (stack.length > 0 && arr[stack[stack.length - 1]] < currentVal) {
        const topIdx = stack.pop();
        const topVal = arr[topIdx];
        result[topIdx] = currentVal;

        steps.push({
          type: 'resolved',
          input: [...arr],
          stack: getStackSnapshot(),
          result: [...result],
          currentIdx: i,
          currentVal,
          resolvedIdx: topIdx,
          poppedVal: topVal,
          explanation: `🎯 RESOLVED: Element ${topVal} at index [${topIdx}] is smaller than ${currentVal} at [${i}]. Next Greater for index [${topIdx}] is ${currentVal}.`
        });
      }

      stack.push(i);

      steps.push({
        type: 'push',
        input: [...arr],
        stack: getStackSnapshot(),
        result: [...result],
        currentIdx: i,
        currentVal,
        resolvedIdx: null,
        explanation: `Pushed index [${i}] (${currentVal}) onto monotonic decreasing stack.`
      });
    }

    steps.push({
      type: 'complete',
      input: [...arr],
      stack: getStackSnapshot(),
      result: [...result],
      currentIdx: null,
      resolvedIdx: null,
      explanation: `🎉 Complete: Next Greater Elements = [${result.join(', ')}]. Remaining stack elements have no greater element (-1).`
    });

    return { result, steps };
  }
}
