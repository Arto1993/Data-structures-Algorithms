/**
 * Doubly Linked List Implementation in JavaScript (ES6+)
 * 
 * Nodes maintain both `next` and `prev` pointers for bidirectional traversal.
 * 
 * Time Complexity:
 * - Insert at Head/Tail: O(1)
 * - Delete given node: O(1)
 * - Search / Access: O(N)
 * Space Complexity: O(N)
 */

export class DoublyNode {
  constructor(val = 0, prev = null, next = null) {
    this.val = val;
    this.prev = prev;
    this.next = next;
  }
}

export class DoublyLinkedList {
  constructor(initialValues = []) {
    this.head = null;
    this.tail = null;
    this.size = 0;

    for (const val of initialValues) {
      this.append(val);
    }
  }

  prepend(val) {
    const newNode = new DoublyNode(val, null, this.head);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.size++;
    return this;
  }

  append(val) {
    const newNode = new DoublyNode(val, this.tail, null);
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

  delete(val) {
    let curr = this.head;
    while (curr) {
      if (curr.val === val) {
        if (curr === this.head) {
          this.head = curr.next;
          if (this.head) this.head.prev = null;
          else this.tail = null;
        } else if (curr === this.tail) {
          this.tail = curr.prev;
          if (this.tail) this.tail.next = null;
          else this.head = null;
        } else {
          curr.prev.next = curr.next;
          curr.next.prev = curr.prev;
        }
        this.size--;
        return true;
      }
      curr = curr.next;
    }
    return false;
  }

  toArray() {
    const res = [];
    let curr = this.head;
    while (curr) {
      res.push(curr.val);
      curr = curr.next;
    }
    return res;
  }
}
