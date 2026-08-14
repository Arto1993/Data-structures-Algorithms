/**
 * HeapSort Algorithm in JavaScript (ES6+)
 * 
 * An in-place, comparison-based sorting algorithm using a Binary Max-Heap.
 * 
 * Phases:
 * 1. Build Max-Heap in O(N) time from unordered array.
 * 2. Repeatedly extract max (root) to the end of the unsorted partition and sift-down the new root in O(log N).
 * 
 * Time Complexity: O(N log N) Best, Average, Worst
 * Space Complexity: O(1) Auxiliary (strictly in-place)
 */

export class HeapSort {
  /**
   * Performs HeapSort and records step-by-step snapshots for visualization.
   * @param {number[]} inputArr 
   * @returns {{ sorted: number[], steps: Array<object> }}
   */
  static sort(inputArr) {
    const arr = [...inputArr];
    const n = arr.length;
    const steps = [];

    steps.push({
      type: 'init',
      array: [...arr],
      highlights: [],
      heapSize: n,
      explanation: `Initialized array for HeapSort: [${arr.join(', ')}]. Starting Phase 1: Build Max-Heap in O(N).`
    });

    const siftDown = (size, rootIdx) => {
      let largest = rootIdx;
      const left = 2 * rootIdx + 1;
      const right = 2 * rootIdx + 2;

      steps.push({
        type: 'compare_children',
        array: [...arr],
        highlights: [rootIdx, left < size ? left : -1, right < size ? right : -1].filter(i => i >= 0),
        heapSize: size,
        root: rootIdx,
        explanation: `Checking heap property at parent [${rootIdx}] (val=${arr[rootIdx]}) against children.`
      });

      if (left < size && arr[left] > arr[largest]) {
        largest = left;
      }
      if (right < size && arr[right] > arr[largest]) {
        largest = right;
      }

      if (largest !== rootIdx) {
        steps.push({
          type: 'swap_violation',
          array: [...arr],
          highlights: [rootIdx, largest],
          heapSize: size,
          explanation: `Max-heap violation: child [${largest}] (${arr[largest]}) > parent [${rootIdx}] (${arr[rootIdx]}). Swapping.`
        });

        // Swap
        [arr[rootIdx], arr[largest]] = [arr[largest], arr[rootIdx]];

        steps.push({
          type: 'after_swap',
          array: [...arr],
          highlights: [rootIdx, largest],
          heapSize: size,
          explanation: `Swapped. Recursively sifting down subtree at index [${largest}].`
        });

        siftDown(size, largest);
      }
    };

    // Phase 1: Build Max-Heap (bottom-up from last non-leaf node)
    const firstNonLeaf = Math.floor(n / 2) - 1;
    for (let i = firstNonLeaf; i >= 0; i--) {
      siftDown(n, i);
    }

    steps.push({
      type: 'heap_built',
      array: [...arr],
      highlights: [0],
      heapSize: n,
      explanation: `✅ Max-Heap built: Max element (${arr[0]}) is at the root. Starting Phase 2: Extraction & Sorting.`
    });

    // Phase 2: Extract max elements one by one
    for (let i = n - 1; i > 0; i--) {
      steps.push({
        type: 'extract_max',
        array: [...arr],
        highlights: [0, i],
        heapSize: i + 1,
        sortedBoundary: i,
        explanation: `Moving current maximum [0] (${arr[0]}) to final sorted position [${i}].`
      });

      // Move root to end
      [arr[0], arr[i]] = [arr[i], arr[0]];

      steps.push({
        type: 'placed_max',
        array: [...arr],
        highlights: [i],
        heapSize: i,
        sortedBoundary: i,
        explanation: `Element ${arr[i]} locked into sorted position. Sifting down new root ${arr[0]} in reduced heap (size=${i}).`
      });

      siftDown(i, 0);
    }

    steps.push({
      type: 'complete',
      array: [...arr],
      highlights: [],
      heapSize: 0,
      sortedBoundary: 0,
      explanation: `🎉 HeapSort Complete! Array fully sorted in-place: [${arr.join(', ')}].`
    });

    return {
      sorted: arr,
      steps
    };
  }
}
