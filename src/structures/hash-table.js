/**
 * Hash Table (Map / Set) with Separate Chaining Collision Resolution in JavaScript (ES6+)
 * 
 * Time Complexity:
 * - Insert / Search / Delete: O(1) Average, O(N) Worst Case (if all collide)
 * Space Complexity: O(N + Capacity)
 */

export class HashTable {
  constructor(capacity = 8) {
    this.capacity = capacity;
    this.size = 0;
    this.buckets = Array.from({ length: capacity }, () => []);
  }

  _hash(key) {
    let hash = 0;
    const str = String(key);
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 31 + str.charCodeAt(i)) % this.capacity;
    }
    return Math.abs(hash);
  }

  put(key, value) {
    const idx = this._hash(key);
    const bucket = this.buckets[idx];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket[i].value = value;
        return idx;
      }
    }

    bucket.push({ key, value });
    this.size++;
    return idx;
  }

  get(key) {
    const idx = this._hash(key);
    const bucket = this.buckets[idx];
    for (const item of bucket) {
      if (item.key === key) return item.value;
    }
    return undefined;
  }

  has(key) {
    return this.get(key) !== undefined;
  }

  delete(key) {
    const idx = this._hash(key);
    const bucket = this.buckets[idx];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }

  getState() {
    return {
      capacity: this.capacity,
      size: this.size,
      buckets: this.buckets.map(b => b.map(item => ({ ...item })))
    };
  }

  putWithSteps(key, value) {
    const steps = [];
    const hashIdx = this._hash(key);

    steps.push({
      type: 'hash_calc',
      key,
      value,
      hashIdx,
      buckets: this.buckets.map(b => b.map(item => ({ ...item }))),
      explanation: `Hashing key "${key}": hash("${key}") % ${this.capacity} = ${hashIdx}. Accessing bucket [${hashIdx}].`
    });

    const isCollision = this.buckets[hashIdx].length > 0;
    this.put(key, value);

    steps.push({
      type: 'inserted',
      key,
      value,
      hashIdx,
      isCollision,
      buckets: this.buckets.map(b => b.map(item => ({ ...item }))),
      explanation: isCollision
        ? `💥 COLLISION RESOLVED via Chaining: Inserted {"${key}": ${value}} into bucket [${hashIdx}] linked list.`
        : `✓ Inserted {"${key}": ${value}} at bucket [${hashIdx}].`
    });

    return { steps, state: this.getState() };
  }

  getWithSteps(key) {
    const steps = [];
    const hashIdx = this._hash(key);

    steps.push({
      type: 'hash_calc',
      key,
      hashIdx,
      buckets: this.buckets.map(b => b.map(item => ({ ...item }))),
      explanation: `Searching key "${key}": hash("${key}") % ${this.capacity} = ${hashIdx}. Checking bucket [${hashIdx}].`
    });

    const bucket = this.buckets[hashIdx];
    let foundVal = undefined;
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        foundVal = bucket[i].value;
        break;
      }
    }

    if (foundVal !== undefined) {
      steps.push({
        type: 'found',
        key,
        value: foundVal,
        hashIdx,
        buckets: this.buckets.map(b => b.map(item => ({ ...item }))),
        explanation: `🎯 FOUND: Key "${key}" exists in bucket [${hashIdx}] with value ${foundVal}.`
      });
    } else {
      steps.push({
        type: 'not_found',
        key,
        hashIdx,
        buckets: this.buckets.map(b => b.map(item => ({ ...item }))),
        explanation: `❌ NOT FOUND: Key "${key}" does not exist in bucket [${hashIdx}].`
      });
    }

    return { steps, foundVal };
  }

  deleteWithSteps(key) {
    const steps = [];
    const hashIdx = this._hash(key);

    steps.push({
      type: 'hash_calc',
      key,
      hashIdx,
      buckets: this.buckets.map(b => b.map(item => ({ ...item }))),
      explanation: `Deleting key "${key}": hash("${key}") % ${this.capacity} = ${hashIdx}.`
    });

    const deleted = this.delete(key);

    steps.push({
      type: deleted ? 'deleted' : 'not_found',
      key,
      hashIdx,
      buckets: this.buckets.map(b => b.map(item => ({ ...item }))),
      explanation: deleted
        ? `🗑️ DELETED: Removed key "${key}" from bucket [${hashIdx}] chain.`
        : `❌ CANNOT DELETE: Key "${key}" was not found in bucket [${hashIdx}].`
    });

    return { steps, state: this.getState() };
  }

  static collisionDemo() {
    const ht = new HashTable(8);
    const steps = [];
    const pairs = [
      ['apple', 10],
      ['banana', 20],
      ['cherry', 30],
      ['peach', 40],
      ['mango', 50],
      ['kiwi', 60]
    ];

    for (const [k, v] of pairs) {
      const { steps: pSteps } = ht.putWithSteps(k, v);
      steps.push(...pSteps);
    }

    return { steps, state: ht.getState() };
  }

  /**
   * Two Sum using Hash Map lookup in O(N) time.
   */
  static twoSum(nums = [2, 7, 11, 15], target = 9) {
    const map = new Map();
    const steps = [];

    steps.push({
      type: 'init',
      nums: [...nums],
      target,
      map: {},
      currentIdx: null,
      complement: null,
      explanation: `Searching for Two Sum target = ${target} in [${nums.join(', ')}]. Hash map is empty.`
    });

    for (let i = 0; i < nums.length; i++) {
      const complement = target - nums[i];
      const mapSnapshot = Object.fromEntries(map);

      steps.push({
        type: 'check',
        nums: [...nums],
        target,
        currentIdx: i,
        val: nums[i],
        complement,
        map: mapSnapshot,
        explanation: `At index [${i}] (val=${nums[i]}): Target (${target}) - ${nums[i]} = Needed complement (${complement}). Checking map...`
      });

      if (map.has(complement)) {
        const matchIdx = map.get(complement);
        const finalMap = { ...mapSnapshot, [nums[i]]: i };

        steps.push({
          type: 'found',
          nums: [...nums],
          target,
          currentIdx: i,
          matchIdx,
          indices: [matchIdx, i],
          values: [complement, nums[i]],
          complement,
          map: finalMap,
          explanation: `🎯 MATCH FOUND! Indices [${matchIdx}, ${i}] (values ${complement} + ${nums[i]} = ${target}).`
        });
        return { indices: [matchIdx, i], steps };
      }

      map.set(nums[i], i);
    }

    return { indices: [], steps };
  }

  /**
   * Group Anagrams using sorted key hashing
   */
  static groupAnagrams(words = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat']) {
    const map = new Map();
    const steps = [];

    steps.push({
      type: 'init',
      words: [...words],
      activeWord: null,
      activeKey: null,
      groups: {},
      explanation: `Grouping anagrams for: [${words.join(', ')}].`
    });

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const key = word.split('').sort().join('');

      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key).push(word);

      const groupsObj = {};
      for (const [k, group] of map.entries()) {
        groupsObj[k] = [...group];
      }

      steps.push({
        type: 'add_word',
        words: [...words],
        activeWord: word,
        activeKey: key,
        wordIdx: i,
        groups: groupsObj,
        explanation: `Word "${word}" sorted key ➔ "${key}". Appended to group "${key}": [${map.get(key).join(', ')}].`
      });
    }

    const result = Array.from(map.values());
    steps.push({
      type: 'complete',
      words: [...words],
      activeWord: null,
      activeKey: null,
      result,
      groups: Object.fromEntries(map),
      explanation: `🎉 Group Anagrams Complete: Found ${result.length} unique anagram clusters.`
    });

    return { result, steps };
  }

  /**
   * Frequency Counter Pattern
   */
  static frequencyCounter(arr = ['a', 'b', 'a', 'c', 'b', 'a']) {
    const freq = {};
    const steps = [];

    steps.push({
      type: 'init',
      input: [...arr],
      freq: {},
      explanation: `Initialized Frequency Counter for array [${arr.join(', ')}].`
    });

    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      freq[item] = (freq[item] || 0) + 1;

      steps.push({
        type: 'count',
        input: [...arr],
        currentIdx: i,
        item,
        count: freq[item],
        freq: { ...freq },
        explanation: `At index [${i}] (item="${item}"): Increment count ➔ freq["${item}"] = ${freq[item]}.`
      });
    }

    steps.push({
      type: 'complete',
      input: [...arr],
      freq: { ...freq },
      explanation: `🎉 Frequency Counter Complete: ${JSON.stringify(freq)}`
    });

    return { freq, steps };
  }
}
