/**
 * Trie (Prefix Tree) Implementation in JavaScript (ES6+)
 * 
 * An efficient information re-trie-val data structure used for prefix matching,
 * dictionary lookups, autocomplete, and IP routing.
 * 
 * Time Complexities:
 * - Insert: O(L) where L is string length
 * - Search: O(L)
 * - StartsWith (Prefix Search): O(L)
 * - Wildcard Search (e.g. "b.t"): O(26^D * L)
 * - Delete: O(L)
 * Space Complexity: O(Alphabet_Size * L * N)
 */

export class TrieNode {
  constructor(char = '') {
    this.char = char;
    this.children = new Map(); // Key: char, Value: TrieNode
    this.isEndOfWord = false;
    this.word = null; // Full word if end of word
    this.frequency = 0; // Usage / frequency counter for autocomplete ranking
  }
}

export class Trie {
  constructor() {
    this.root = new TrieNode();
    this.totalWords = 0;
  }

  /**
   * Inserts a word into the Trie.
   * @param {string} word 
   * @param {number} [frequency=1]
   */
  insert(word, frequency = 1) {
    if (!word || typeof word !== 'string') return;
    const cleanWord = word.trim().toLowerCase();
    if (!cleanWord) return;

    let current = this.root;
    for (const char of cleanWord) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode(char));
      }
      current = current.children.get(char);
    }

    if (!current.isEndOfWord) {
      this.totalWords++;
    }
    current.isEndOfWord = true;
    current.word = cleanWord;
    current.frequency += frequency;
  }

  /**
   * Returns true if the word is in the trie.
   * @param {string} word 
   * @returns {boolean}
   */
  search(word) {
    if (!word) return false;
    const node = this._findNode(word.trim().toLowerCase());
    return node !== null && node.isEndOfWord;
  }

  /**
   * Returns true if there is any word in the trie that starts with the given prefix.
   * @param {string} prefix 
   * @returns {boolean}
   */
  startsWith(prefix) {
    if (!prefix) return true;
    return this._findNode(prefix.trim().toLowerCase()) !== null;
  }

  /**
   * Helper to traverse down to the node corresponding to the string.
   */
  _findNode(str) {
    let current = this.root;
    for (const char of str) {
      if (!current.children.has(char)) {
        return null;
      }
      current = current.children.get(char);
    }
    return current;
  }

  /**
   * Autocomplete feature: returns list of words matching prefix, sorted by frequency or alphabetically.
   * @param {string} prefix 
   * @param {number} [limit=10]
   * @returns {Array<{word: string, frequency: number}>}
   */
  autocomplete(prefix, limit = 10) {
    const cleanPrefix = (prefix || '').trim().toLowerCase();
    const startNode = cleanPrefix ? this._findNode(cleanPrefix) : this.root;
    if (!startNode) return [];

    const results = [];
    const dfs = (node) => {
      if (!node) return;
      if (node.isEndOfWord) {
        results.push({ word: node.word, frequency: node.frequency });
      }
      // Sort children alphabetically for consistent traversal
      const sortedKeys = Array.from(node.children.keys()).sort();
      for (const char of sortedKeys) {
        dfs(node.children.get(char));
      }
    };

    dfs(startNode);
    return results.sort((a, b) => b.frequency - a.frequency).slice(0, limit);
  }

  /**
   * Wildcard search supporting '.' character representing any single letter (e.g. "b.d" matches "bad", "bed")
   * @param {string} pattern 
   * @returns {string[]}
   */
  searchWildcard(pattern) {
    const results = [];
    const cleanPattern = (pattern || '').trim().toLowerCase();

    const dfs = (node, index) => {
      if (!node) return;
      if (index === cleanPattern.length) {
        if (node.isEndOfWord) results.push(node.word);
        return;
      }

      const char = cleanPattern[index];
      if (char === '.') {
        for (const childNode of node.children.values()) {
          dfs(childNode, index + 1);
        }
      } else {
        if (node.children.has(char)) {
          dfs(node.children.get(char), index + 1);
        }
      }
    };

    dfs(this.root, 0);
    return results;
  }

  /**
   * Deletes a word from the Trie, pruning unused nodes up the tree.
   * @param {string} word 
   * @returns {boolean} Whether word was found and deleted
   */
  delete(word) {
    if (!word) return false;
    const cleanWord = word.trim().toLowerCase();

    const _deleteHelper = (node, index) => {
      if (index === cleanWord.length) {
        if (!node.isEndOfWord) return false; // Word doesn't exist
        node.isEndOfWord = false;
        node.word = null;
        this.totalWords--;
        // If node has no other children, it can be deleted by caller
        return node.children.size === 0;
      }

      const char = cleanWord[index];
      if (!node.children.has(char)) return false;

      const childNode = node.children.get(char);
      const shouldDeleteChild = _deleteHelper(childNode, index + 1);

      if (shouldDeleteChild) {
        node.children.delete(char);
        // Return true if current node is not an end of word and has no other children
        return !node.isEndOfWord && node.children.size === 0;
      }

      return false;
    };

    return _deleteHelper(this.root, 0) !== undefined;
  }

  /**
   * Returns all words stored in the Trie.
   */
  getAllWords() {
    return this.autocomplete('', Infinity).map(item => item.word);
  }

  /**
   * Generates a hierarchical JSON tree for SVG/Canvas visualization.
   */
  toHierarchy(node = this.root, char = 'ROOT') {
    return {
      name: char === 'ROOT' ? '●' : char,
      isEndOfWord: node.isEndOfWord,
      word: node.word,
      frequency: node.frequency,
      children: Array.from(node.children.entries()).map(([k, v]) => this.toHierarchy(v, k))
    };
  }

  clear() {
    this.root = new TrieNode();
    this.totalWords = 0;
  }
}
