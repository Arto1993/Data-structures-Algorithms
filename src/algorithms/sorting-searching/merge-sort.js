/**
 * MergeSort Algorithm in JavaScript (ES6+)
 * 
 * Classic Divide-and-Conquer sorting algorithm.
 * Guarantees stable O(N log N) performance in all cases.
 * 
 * Time Complexities:
 * - Best: O(N log N)
 * - Average: O(N log N)
 * - Worst: O(N log N)
 * Space Complexity: O(N) auxiliary
 */

export class MergeSort {
  /**
   * Sorts array and captures visual animation steps.
   * @param {number[]} array 
   */
  static sortWithSteps(array) {
    const arr = [...array];
    const steps = [];

    steps.push({
      array: [...arr],
      highlights: [],
      range: [0, arr.length - 1],
      message: `Initial array of size ${arr.length}.`
    });

    this._mergeSortHelper(arr, 0, arr.length - 1, steps);

    steps.push({
      array: [...arr],
      highlights: [],
      range: [0, arr.length - 1],
      message: `MergeSort completed successfully!`
    });

    return { sortedArray: arr, steps };
  }

  static _mergeSortHelper(arr, left, right, steps) {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    steps.push({
      array: [...arr],
      highlights: [mid],
      range: [left, right],
      message: `Divide step: Split range [${left}..${right}] into [${left}..${mid}] and [${mid + 1}..${right}].`
    });

    this._mergeSortHelper(arr, left, mid, steps);
    this._mergeSortHelper(arr, mid + 1, right, steps);
    this._merge(arr, left, mid, right, steps);
  }

  static _merge(arr, left, mid, right, steps) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    let i = 0;
    let j = 0;
    let k = left;

    steps.push({
      array: [...arr],
      highlights: [left, right],
      range: [left, right],
      message: `Merging sub-arrays: [${leftArr.join(', ')}] and [${rightArr.join(', ')}].`
    });

    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        steps.push({
          array: [...arr],
          highlights: [k],
          range: [left, right],
          message: `Placed ${leftArr[i]} (from left sub-array) at index ${k}.`
        });
        i++;
      } else {
        arr[k] = rightArr[j];
        steps.push({
          array: [...arr],
          highlights: [k],
          range: [left, right],
          message: `Placed ${rightArr[j]} (from right sub-array) at index ${k}.`
        });
        j++;
      }
      k++;
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      steps.push({
        array: [...arr],
        highlights: [k],
        range: [left, right],
        message: `Placed remaining left element ${leftArr[i]} at index ${k}.`
      });
      i++;
      k++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      steps.push({
        array: [...arr],
        highlights: [k],
        range: [left, right],
        message: `Placed remaining right element ${rightArr[j]} at index ${k}.`
      });
      j++;
      k++;
    }
  }
}
