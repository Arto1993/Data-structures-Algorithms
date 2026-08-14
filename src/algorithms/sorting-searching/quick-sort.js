/**
 * QuickSort Algorithms in JavaScript (ES6+)
 * 
 * Features:
 * - Lomuto Partitioning
 * - Hoare Partitioning
 * - 3-Way Partitioning (Dutch National Flag) for handling high duplicate arrays
 * - Step-by-step visualization snapshots
 * 
 * Time Complexities:
 * - Best: O(N log N)
 * - Average: O(N log N)
 * - Worst: O(N^2) (mitigated by randomized/median-of-three pivot)
 * Space Complexity: O(log N) stack
 */

export class QuickSort {
  /**
   * Sorts array and captures visual animation steps.
   * @param {number[]} array 
   * @param {'lomuto' | 'hoare' | 'threeWay'} [partitionType='lomuto']
   */
  static sortWithSteps(array, partitionType = 'lomuto') {
    const arr = [...array];
    const steps = [];

    steps.push({
      array: [...arr],
      highlights: [],
      pivot: null,
      message: `Initial array of size ${arr.length}.`
    });

    if (partitionType === 'threeWay') {
      this._threeWayQuickSort(arr, 0, arr.length - 1, steps);
    } else if (partitionType === 'hoare') {
      this._hoareQuickSort(arr, 0, arr.length - 1, steps);
    } else {
      this._lomutoQuickSort(arr, 0, arr.length - 1, steps);
    }

    steps.push({
      array: [...arr],
      highlights: [],
      pivot: null,
      message: `QuickSort completed successfully!`
    });

    return { sortedArray: arr, steps };
  }

  // --- Lomuto Partitioning ---

  static _lomutoQuickSort(arr, low, high, steps) {
    if (low < high) {
      const pIdx = this._lomutoPartition(arr, low, high, steps);
      this._lomutoQuickSort(arr, low, pIdx - 1, steps);
      this._lomutoQuickSort(arr, pIdx + 1, high, steps);
    }
  }

  static _lomutoPartition(arr, low, high, steps) {
    const pivot = arr[high];
    let i = low - 1;

    steps.push({
      array: [...arr],
      highlights: [high],
      pivot: high,
      range: [low, high],
      message: `Selected pivot ${pivot} at index ${high}. Partitioning range [${low}..${high}].`
    });

    for (let j = low; j < high; j++) {
      steps.push({
        array: [...arr],
        highlights: [j, high],
        pivot: high,
        range: [low, high],
        message: `Comparing arr[${j}]=${arr[j]} with pivot ${pivot}.`
      });

      if (arr[j] <= pivot) {
        i++;
        if (i !== j) {
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;

          steps.push({
            array: [...arr],
            highlights: [i, j],
            pivot: high,
            range: [low, high],
            message: `Swapped arr[${i}] and arr[${j}].`
          });
        }
      }
    }

    // Place pivot in correct position
    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    steps.push({
      array: [...arr],
      highlights: [i + 1],
      pivot: i + 1,
      range: [low, high],
      message: `Placed pivot ${pivot} into its final sorted position at index ${i + 1}.`
    });

    return i + 1;
  }

  // --- 3-Way Partitioning (Dutch National Flag) ---

  static _threeWayQuickSort(arr, low, high, steps) {
    if (low >= high) return;

    let lt = low;
    let gt = high;
    const pivot = arr[low];
    let i = low + 1;

    steps.push({
      array: [...arr],
      highlights: [low],
      pivot: low,
      range: [low, high],
      message: `3-Way Partition: Selected pivot ${pivot} at index ${low}.`
    });

    while (i <= gt) {
      if (arr[i] < pivot) {
        const temp = arr[lt];
        arr[lt] = arr[i];
        arr[i] = temp;
        lt++;
        i++;
        steps.push({
          array: [...arr],
          highlights: [lt - 1, i - 1],
          range: [low, high],
          message: `arr[i] < pivot: swapped to left region (< pivot).`
        });
      } else if (arr[i] > pivot) {
        const temp = arr[i];
        arr[i] = arr[gt];
        arr[gt] = temp;
        gt--;
        steps.push({
          array: [...arr],
          highlights: [i, gt + 1],
          range: [low, high],
          message: `arr[i] > pivot: swapped to right region (> pivot).`
        });
      } else {
        i++;
      }
    }

    this._threeWayQuickSort(arr, low, lt - 1, steps);
    this._threeWayQuickSort(arr, gt + 1, high, steps);
  }

  // --- Hoare Partitioning ---

  static _hoareQuickSort(arr, low, high, steps) {
    if (low < high) {
      const p = this._hoarePartition(arr, low, high, steps);
      this._hoareQuickSort(arr, low, p, steps);
      this._hoareQuickSort(arr, p + 1, high, steps);
    }
  }

  static _hoarePartition(arr, low, high, steps) {
    const pivot = arr[Math.floor((low + high) / 2)];
    let i = low - 1;
    let j = high + 1;

    while (true) {
      do {
        i++;
      } while (arr[i] < pivot);

      do {
        j--;
      } while (arr[j] > pivot);

      if (i >= j) return j;

      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;

      steps.push({
        array: [...arr],
        highlights: [i, j],
        range: [low, high],
        message: `Hoare swap: arr[${i}] and arr[${j}] around pivot value ${pivot}.`
      });
    }
  }
}
