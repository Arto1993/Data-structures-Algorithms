/**
 * Singly Linked List Implementation in JavaScript (ES6+)
 * 
 * Linear data structure where elements are stored in nodes,
 * each pointing to the next node in the sequence.
 * 
 * Time Complexity:
 * - Insert at Head / Tail (with tail pointer): O(1)
 * - Delete at Head: O(1)
 * - Search / Delete by Value: O(N)
 * - Access by Index: O(N)
 * Space Complexity: O(N)
 */

export class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

export class SinglyLinkedList {
  constructor(initialValues = []) {
    this.head = null;
    this.tail = null;
    this.size = 0;

    for (const val of initialValues) {
      this.append(val);
    }
  }

  prepend(val) {
    const newNode = new ListNode(val, this.head);
    this.head = newNode;
    if (!this.tail) this.tail = newNode;
    this.size++;
    return this;
  }

  append(val) {
    const newNode = new ListNode(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
    return this;
  }

  deleteHead() {
    if (!this.head) return null;
    const val = this.head.val;
    this.head = this.head.next;
    this.size--;
    if (this.size === 0) this.tail = null;
    return val;
  }

  delete(val) {
    if (!this.head) return false;
    if (this.head.val === val) {
      this.head = this.head.next;
      this.size--;
      if (this.size === 0) this.tail = null;
      return true;
    }

    let curr = this.head;
    while (curr.next && curr.next.val !== val) {
      curr = curr.next;
    }

    if (curr.next) {
      if (curr.next === this.tail) this.tail = curr;
      curr.next = curr.next.next;
      this.size--;
      return true;
    }
    return false;
  }

  toArray() {
    const res = [];
    let curr = this.head;
    const visited = new Set();
    while (curr && !visited.has(curr)) {
      visited.add(curr);
      res.push(curr.val);
      curr = curr.next;
    }
    return res;
  }

  /**
   * Reverses the linked list in-place and records animation steps.
   */
  static reverseWithSteps(initialVals = [1, 2, 3, 4, 5]) {
    const list = new SinglyLinkedList(initialVals);
    const steps = [];

    steps.push({
      type: 'init',
      array: list.toArray(),
      prev: null,
      curr: 0,
      next: 1,
      explanation: `Initialized Linked List: [${list.toArray().join(' ➔ ')}]. Starting 3-pointer reversal (prev = null, curr = head).`
    });

    let prev = null;
    let curr = list.head;
    let idx = 0;

    while (curr) {
      const nextNode = curr.next;

      steps.push({
        type: 'step',
        array: list.toArray(),
        prevVal: prev ? prev.val : null,
        currVal: curr.val,
        nextVal: nextNode ? nextNode.val : null,
        currIdx: idx,
        explanation: `At node "${curr.val}": saving next pointer (${nextNode ? nextNode.val : 'null'}). Reversing pointer: ${curr.val} ➔ ${prev ? prev.val : 'null'}.`
      });

      curr.next = prev;
      prev = curr;
      curr = nextNode;
      idx++;
    }

    list.head = prev;

    steps.push({
      type: 'complete',
      array: list.toArray(),
      prevVal: prev ? prev.val : null,
      currVal: null,
      nextVal: null,
      explanation: `🎉 Linked List Reversed: [${list.toArray().join(' ➔ ')}]. New head is ${list.head ? list.head.val : 'null'}.`
    });

    return { list, steps };
  }

  /**
   * Fast & Slow pointer: Finds middle element and detects cycle (Floyd's Algorithm).
   */
  static fastSlowSteps(initialVals = [1, 2, 3, 4, 5, 6, 7]) {
    const list = new SinglyLinkedList(initialVals);
    const steps = [];

    let slow = list.head;
    let fast = list.head;
    let slowIdx = 0;
    let fastIdx = 0;

    steps.push({
      type: 'init',
      array: list.toArray(),
      slow: 0,
      fast: 0,
      explanation: `Initialized Fast & Slow pointers at head (index 0). Slow moves 1 step; Fast moves 2 steps.`
    });

    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
      slowIdx += 1;
      fastIdx = fast ? fastIdx + 2 : fastIdx + 1;

      steps.push({
        type: 'advance',
        array: list.toArray(),
        slow: slowIdx,
        fast: Math.min(list.size - 1, fastIdx),
        slowVal: slow ? slow.val : null,
        fastVal: fast ? fast.val : null,
        explanation: `Advanced pointers: Slow at [${slowIdx}] (val=${slow?.val}), Fast at [${Math.min(list.size - 1, fastIdx)}] (val=${fast?.val || 'end'}).`
      });
    }

    steps.push({
      type: 'complete',
      array: list.toArray(),
      slow: slowIdx,
      fast: Math.min(list.size - 1, fastIdx),
      slowVal: slow ? slow.val : null,
      explanation: `🎯 Middle Node Found: Value = ${slow?.val} at index [${slowIdx}].`
    });

    return { middle: slow?.val, steps };
  }

  /**
   * Merge Two Sorted Lists
   */
  static mergeTwoLists(l1Vals = [1, 3, 5], l2Vals = [2, 4, 6]) {
    const steps = [];
    const merged = [];
    let i = 0, j = 0;

    steps.push({
      type: 'init',
      l1: [...l1Vals],
      l2: [...l2Vals],
      merged: [],
      i: 0,
      j: 0,
      explanation: `Merging two sorted lists L1: [${l1Vals.join(' ➔ ')}] and L2: [${l2Vals.join(' ➔ ')}].`
    });

    while (i < l1Vals.length && j < l2Vals.length) {
      if (l1Vals[i] <= l2Vals[j]) {
        merged.push(l1Vals[i]);
        steps.push({
          type: 'take_l1',
          l1: [...l1Vals],
          l2: [...l2Vals],
          merged: [...merged],
          i: i + 1,
          j,
          explanation: `Compared L1[${i}] (${l1Vals[i]}) ≤ L2[${j}] (${l2Vals[j]}): Added ${l1Vals[i]} from L1 to merged list.`
        });
        i++;
      } else {
        merged.push(l2Vals[j]);
        steps.push({
          type: 'take_l2',
          l1: [...l1Vals],
          l2: [...l2Vals],
          merged: [...merged],
          i,
          j: j + 1,
          explanation: `Compared L2[${j}] (${l2Vals[j]}) < L1[${i}] (${l1Vals[i]}): Added ${l2Vals[j]} from L2 to merged list.`
        });
        j++;
      }
    }

    while (i < l1Vals.length) {
      merged.push(l1Vals[i]);
      i++;
    }
    while (j < l2Vals.length) {
      merged.push(l2Vals[j]);
      j++;
    }

    steps.push({
      type: 'complete',
      l1: [...l1Vals],
      l2: [...l2Vals],
      merged: [...merged],
      explanation: `🎉 Merge Complete: [${merged.join(' ➔ ')}].`
    });

    return { merged, steps };
  }
}
