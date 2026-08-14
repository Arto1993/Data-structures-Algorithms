/**
 * Binary Tree & BST (Binary Search Tree) in JavaScript (ES6+)
 * 
 * Includes DFS (Preorder, Inorder, Postorder), BFS (Level-Order),
 * Tree Height/Depth, and Lowest Common Ancestor (LCA).
 */

export class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

export class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(val) {
    const newNode = new TreeNode(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let curr = this.root;
    while (true) {
      if (val === curr.val) return this; // Ignore duplicates
      if (val < curr.val) {
        if (!curr.left) {
          curr.left = newNode;
          return this;
        }
        curr = curr.left;
      } else {
        if (!curr.right) {
          curr.right = newNode;
          return this;
        }
        curr = curr.right;
      }
    }
  }

  search(val) {
    let curr = this.root;
    while (curr) {
      if (curr.val === val) return true;
      if (val < curr.val) curr = curr.left;
      else curr = curr.right;
    }
    return false;
  }

  getHeight(node = this.root) {
    if (!node) return 0;
    return 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
  }

  /**
   * Generates step-by-step tree traversal animations
   */
  static traverseWithSteps(rootNode, type = 'inorder') {
    const steps = [];
    const visited = [];

    steps.push({
      type: 'init',
      traversalType: type,
      visited: [],
      currentNode: null,
      explanation: `Starting ${type.toUpperCase()} traversal on Binary Search Tree.`
    });

    const dfs = (node) => {
      if (!node) return;

      if (type === 'preorder') {
        visited.push(node.val);
        steps.push({
          type: 'visit',
          currentNode: node.val,
          visited: [...visited],
          explanation: `Preorder: Visited root node "${node.val}". Output: [${visited.join(', ')}].`
        });
      }

      dfs(node.left);

      if (type === 'inorder') {
        visited.push(node.val);
        steps.push({
          type: 'visit',
          currentNode: node.val,
          visited: [...visited],
          explanation: `Inorder: Visited node "${node.val}". Output: [${visited.join(', ')}].`
        });
      }

      dfs(node.right);

      if (type === 'postorder') {
        visited.push(node.val);
        steps.push({
          type: 'visit',
          currentNode: node.val,
          visited: [...visited],
          explanation: `Postorder: Visited node "${node.val}". Output: [${visited.join(', ')}].`
        });
      }
    };

    const bfs = (root) => {
      if (!root) return;
      const queue = [root];
      while (queue.length > 0) {
        const curr = queue.shift();
        visited.push(curr.val);

        steps.push({
          type: 'visit',
          currentNode: curr.val,
          visited: [...visited],
          explanation: `BFS Level-Order: Visited node "${curr.val}". Output: [${visited.join(', ')}].`
        });

        if (curr.left) queue.push(curr.left);
        if (curr.right) queue.push(curr.right);
      }
    };

    if (type === 'bfs') bfs(rootNode);
    else dfs(rootNode);

    steps.push({
      type: 'complete',
      traversalType: type,
      visited: [...visited],
      currentNode: null,
      explanation: `🎉 ${type.toUpperCase()} Traversal Complete! Final Order: [${visited.join(', ')}].`
    });

    return { visited, steps };
  }

  /**
   * Lowest Common Ancestor (LCA) in a BST
   */
  static lowestCommonAncestor(root, pVal, qVal) {
    let curr = root;
    const path = [];

    while (curr) {
      path.push(curr.val);
      if (pVal < curr.val && qVal < curr.val) {
        curr = curr.left;
      } else if (pVal > curr.val && qVal > curr.val) {
        curr = curr.right;
      } else {
        return { lca: curr.val, path };
      }
    }
    return { lca: null, path };
  }

  static lowestCommonAncestorWithSteps(root, pVal = 20, qVal = 40) {
    let curr = root;
    const steps = [];
    const path = [];

    steps.push({
      type: 'init',
      currentNode: curr?.val,
      pVal,
      qVal,
      path: [],
      explanation: `Finding LCA for P=${pVal} and Q=${qVal} starting at root (${curr?.val}).`
    });

    while (curr) {
      path.push(curr.val);
      steps.push({
        type: 'step',
        currentNode: curr.val,
        pVal,
        qVal,
        path: [...path],
        explanation: `At node ${curr.val}: Checking if both ${pVal} and ${qVal} are on the left, right, or split.`
      });

      if (pVal < curr.val && qVal < curr.val) {
        curr = curr.left;
      } else if (pVal > curr.val && qVal > curr.val) {
        curr = curr.right;
      } else {
        steps.push({
          type: 'found',
          currentNode: curr.val,
          lca: curr.val,
          pVal,
          qVal,
          path: [...path],
          explanation: `🎯 SPLIT POINT REACHED! Node ${curr.val} is the Lowest Common Ancestor (LCA) of ${pVal} and ${qVal}.`
        });
        return { lca: curr.val, path, steps };
      }
    }

    return { lca: null, path, steps };
  }

  toJSON(node = this.root) {
    if (!node) return null;
    return {
      value: node.val,
      left: this.toJSON(node.left),
      right: this.toJSON(node.right)
    };
  }
}
