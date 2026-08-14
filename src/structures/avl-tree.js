/**
 * AVL Tree Implementation in JavaScript (ES6+)
 * 
 * An AVL tree is a self-balancing Binary Search Tree (BST) where the difference
 * between heights of left and right subtrees (balance factor) cannot exceed 1 for any node.
 * 
 * Time Complexities:
 * - Search: O(log N)
 * - Insert: O(log N)
 * - Delete: O(log N)
 * Space Complexity: O(N)
 */

export class AVLNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
    this.id = `avl-${value}-${Math.random().toString(36).substr(2, 5)}`;
  }
}

export class AVLTree {
  constructor() {
    this.root = null;
    this.size = 0;
    this.logs = [];
  }

  // --- Helper Methods ---

  getHeight(node) {
    return node ? node.height : 0;
  }

  getBalanceFactor(node) {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  updateHeight(node) {
    if (node) {
      node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    }
  }

  /**
   * Right Rotation (LL Case):
   *        y                               x
   *       / \     Right Rotation          / \
   *      x   T3   -------------->        T1  y
   *     / \                                 / \
   *    T1  T2                              T2  T3
   */
  rotateRight(y) {
    const x = y.left;
    const T2 = x.right;

    // Perform rotation
    x.right = y;
    y.left = T2;

    // Update heights (order matters: y first, then x)
    this.updateHeight(y);
    this.updateHeight(x);

    this.logs.push(`Performed Right Rotation on Node(${y.value}) with Pivot Node(${x.value})`);
    return x;
  }

  /**
   * Left Rotation (RR Case):
   *        y                               x
   *       / \     Left Rotation           / \
   *      T1  x   -------------->         y   T3
   *         / \                         / \
   *        T2  T3                      T1  T2
   */
  rotateLeft(y) {
    const x = y.right;
    const T2 = x.left;

    // Perform rotation
    x.left = y;
    y.right = T2;

    // Update heights
    this.updateHeight(y);
    this.updateHeight(x);

    this.logs.push(`Performed Left Rotation on Node(${y.value}) with Pivot Node(${x.value})`);
    return x;
  }

  // --- Core Operations ---

  insert(value) {
    this.logs = [];
    this.root = this._insertNode(this.root, value);
    return this.logs;
  }

  _insertNode(node, value) {
    // 1. Standard BST insertion
    if (!node) {
      this.size++;
      this.logs.push(`Inserted Node(${value})`);
      return new AVLNode(value);
    }

    if (value < node.value) {
      node.left = this._insertNode(node.left, value);
    } else if (value > node.value) {
      node.right = this._insertNode(node.right, value);
    } else {
      // Duplicate values not allowed in this BST
      this.logs.push(`Value ${value} already exists in AVL tree.`);
      return node;
    }

    // 2. Update height of current ancestor node
    this.updateHeight(node);

    // 3. Get balance factor to check if node became unbalanced
    const balance = this.getBalanceFactor(node);

    // 4. If unbalanced, apply one of 4 rotation cases:

    // Case 1: Left-Left (LL) -> Single Right Rotation
    if (balance > 1 && value < node.left.value) {
      this.logs.push(`Imbalance detected at Node(${node.value}) [Balance: ${balance}]. Case: Left-Left.`);
      return this.rotateRight(node);
    }

    // Case 2: Right-Right (RR) -> Single Left Rotation
    if (balance < -1 && value > node.right.value) {
      this.logs.push(`Imbalance detected at Node(${node.value}) [Balance: ${balance}]. Case: Right-Right.`);
      return this.rotateLeft(node);
    }

    // Case 3: Left-Right (LR) -> Left Rotate left child, then Right Rotate node
    if (balance > 1 && value > node.left.value) {
      this.logs.push(`Imbalance detected at Node(${node.value}) [Balance: ${balance}]. Case: Left-Right (LR).`);
      node.left = this.rotateLeft(node.left);
      return this.rotateRight(node);
    }

    // Case 4: Right-Left (RL) -> Right Rotate right child, then Left Rotate node
    if (balance < -1 && value < node.right.value) {
      this.logs.push(`Imbalance detected at Node(${node.value}) [Balance: ${balance}]. Case: Right-Left (RL).`);
      node.right = this.rotateRight(node.right);
      return this.rotateLeft(node);
    }

    return node;
  }

  delete(value) {
    this.logs = [];
    const prevSize = this.size;
    this.root = this._deleteNode(this.root, value);
    if (this.size < prevSize) {
      this.logs.push(`Successfully removed ${value} from AVL tree.`);
    } else {
      this.logs.push(`Value ${value} not found in AVL tree.`);
    }
    return this.logs;
  }

  _deleteNode(node, value) {
    if (!node) return null;

    if (value < node.value) {
      node.left = this._deleteNode(node.left, value);
    } else if (value > node.value) {
      node.right = this._deleteNode(node.right, value);
    } else {
      // Node found
      // Node with only one child or no child
      if (!node.left || !node.right) {
        const temp = node.left ? node.left : node.right;
        if (!temp) {
          // No child
          node = null;
        } else {
          // One child
          node = temp;
        }
        this.size--;
      } else {
        // Node with two children: Get in-order successor (min value in right subtree)
        const successor = this._getMinValueNode(node.right);
        node.value = successor.value;
        node.right = this._deleteNode(node.right, successor.value);
      }
    }

    if (!node) return null;

    // Update height
    this.updateHeight(node);

    // Check balance
    const balance = this.getBalanceFactor(node);

    // Rebalance if necessary
    // Left-Left
    if (balance > 1 && this.getBalanceFactor(node.left) >= 0) {
      this.logs.push(`Post-delete rebalance: Left-Left rotation on Node(${node.value})`);
      return this.rotateRight(node);
    }

    // Left-Right
    if (balance > 1 && this.getBalanceFactor(node.left) < 0) {
      this.logs.push(`Post-delete rebalance: Left-Right rotation on Node(${node.value})`);
      node.left = this.rotateLeft(node.left);
      return this.rotateRight(node);
    }

    // Right-Right
    if (balance < -1 && this.getBalanceFactor(node.right) <= 0) {
      this.logs.push(`Post-delete rebalance: Right-Right rotation on Node(${node.value})`);
      return this.rotateLeft(node);
    }

    // Right-Left
    if (balance < -1 && this.getBalanceFactor(node.right) > 0) {
      this.logs.push(`Post-delete rebalance: Right-Left rotation on Node(${node.value})`);
      node.right = this.rotateRight(node.right);
      return this.rotateLeft(node);
    }

    return node;
  }

  _getMinValueNode(node) {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  search(value) {
    let current = this.root;
    const path = [];
    while (current) {
      path.push(current.value);
      if (value === current.value) {
        return { found: true, node: current, path };
      }
      current = value < current.value ? current.left : current.right;
    }
    return { found: false, node: null, path };
  }

  // --- Traversals & Export for Visualizer ---

  inOrder(node = this.root, result = []) {
    if (node) {
      this.inOrder(node.left, result);
      result.push(node.value);
      this.inOrder(node.right, result);
    }
    return result;
  }

  preOrder(node = this.root, result = []) {
    if (node) {
      result.push(node.value);
      this.preOrder(node.left, result);
      this.preOrder(node.right, result);
    }
    return result;
  }

  levelOrder() {
    const result = [];
    if (!this.root) return result;
    const queue = [this.root];
    while (queue.length > 0) {
      const current = queue.shift();
      result.push({
        value: current.value,
        height: current.height,
        balance: this.getBalanceFactor(current)
      });
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
    return result;
  }

  isBalanced(node = this.root) {
    if (!node) return true;
    const balance = Math.abs(this.getBalanceFactor(node));
    if (balance > 1) return false;
    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  toJSON(node = this.root) {
    if (!node) return null;
    return {
      value: node.value,
      height: node.height,
      balance: this.getBalanceFactor(node),
      left: this.toJSON(node.left),
      right: this.toJSON(node.right)
    };
  }

  clear() {
    this.root = null;
    this.size = 0;
    this.logs = [];
  }
}
