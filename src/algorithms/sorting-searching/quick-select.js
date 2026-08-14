/**
 * QuickSelect Algorithm (Hoare's Selection) in JavaScript (ES6+)
 * 
 * Finds the k-th smallest (or k-th largest) element in an unsorted array in O(N) average time.
 * Unlike QuickSort which recurses on both halves, QuickSelect only recurses on the partition containing index k.
 * 
 * Time Complexity: O(N) Average, O(N^2) Worst
 * Space Complexity: O(1) Auxiliary (iterative/tail-recursive in-place)
 */

export class QuickSelect {
  /**
   * Finds the k-th smallest element (0-indexed) in arr.
   * @param {number[]} inputArr 
   * @param {number} k 0 <= k < arr.length
   * @returns {{ value: number, index: number, steps: Array<object> }}
   */
  static select(inputArr, k = 0) {
    const arr = [...inputArr];
    const n = arr.length;
    const targetK = Math.max(0, Math.min(n - 1, k));
    const steps = [];

    steps.push({
      type: 'init',
      array: [...arr],
      highlights: [],
      targetK,
      low: 0,
      high: n - 1,
      explanation: `Initialized QuickSelect to find ${targetK + 1}-th smallest element (index k=${targetK}) in [${arr.join(', ')}].`
    });

    let left = 0;
    let right = n - 1;

    while (left <= right) {
      if (left === right) {
        steps.push({
          type: 'single_element',
          array: [...arr],
          highlights: [left],
          targetK,
          low: left,
          high: right,
          explanation: `Narrowed down to single element at index [${left}]. K-th smallest element is ${arr[left]}.`
        });
        break;
      }

      // Partition using Lomuto with rightmost pivot
      const pivotVal = arr[right];
      let pIndex = left;

      steps.push({
        type: 'partition_start',
        array: [...arr],
        highlights: [right],
        pivot: right,
        targetK,
        low: left,
        high: right,
        explanation: `Partitioning window [${left}..${right}] around pivot ${pivotVal} at index [${right}].`
      });

      for (let i = left; i < right; i++) {
        if (arr[i] <= pivotVal) {
          if (i !== pIndex) {
            [arr[i], arr[pIndex]] = [arr[pIndex], arr[i]];
            steps.push({
              type: 'swap',
              array: [...arr],
              highlights: [i, pIndex],
              pivot: right,
              targetK,
              low: left,
              high: right,
              explanation: `Swapped [${i}] (${arr[i]}) with [${pIndex}] (${arr[pIndex]}) because ${arr[pIndex]} <= pivot (${pivotVal}).`
            });
          }
          pIndex++;
        }
      }

      // Place pivot in its correct sorted position
      [arr[pIndex], arr[right]] = [arr[right], arr[pIndex]];

      steps.push({
        type: 'pivot_placed',
        array: [...arr],
        highlights: [pIndex],
        pivot: pIndex,
        targetK,
        low: left,
        high: right,
        explanation: `Pivot ${arr[pIndex]} placed at its final sorted index [${pIndex}]. Target k = ${targetK}.`
      });

      if (pIndex === targetK) {
        steps.push({
          type: 'found',
          array: [...arr],
          highlights: [pIndex],
          pivot: pIndex,
          targetK,
          explanation: `🎯 EXACT MATCH: Pivot index [${pIndex}] matches target k=${targetK}. Value is ${arr[pIndex]}.`
        });
        break;
      } else if (pIndex < targetK) {
        steps.push({
          type: 'prune_left',
          array: [...arr],
          highlights: [pIndex],
          targetK,
          low: pIndex + 1,
          high: right,
          explanation: `Since pivot index ${pIndex} < target k (${targetK}), PRUNING left half [${left}..${pIndex}]. Searching right window [${pIndex + 1}..${right}].`
        });
        left = pIndex + 1;
      } else {
        steps.push({
          type: 'prune_right',
          array: [...arr],
          highlights: [pIndex],
          targetK,
          low: left,
          high: pIndex - 1,
          explanation: `Since pivot index ${pIndex} > target k (${targetK}), PRUNING right half [${pIndex}..${right}]. Searching left window [${left}..${pIndex - 1}].`
        });
        right = pIndex - 1;
      }
    }

    return {
      value: arr[targetK],
      index: targetK,
      sortedSegment: arr,
      steps
    };
  }
}
