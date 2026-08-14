/**
 * Binary Search & Variations in JavaScript (ES6+)
 * 
 * 1. Standard Binary Search
 * 2. Lower Bound (first index >= target)
 * 3. Upper Bound (first index > target)
 * 4. Search in Rotated Sorted Array (e.g. [4, 5, 6, 7, 0, 1, 2])
 * 
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */

export class BinarySearch {
  /**
   * Standard exact match binary search with step logs.
   * @param {number[]} arr Sorted array
   * @param {number} target 
   */
  static search(arr, target) {
    let low = 0;
    let high = arr.length - 1;
    const steps = [];

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      steps.push({
        low,
        high,
        mid,
        midVal: arr[mid],
        message: `Range [${low}..${high}], Mid: arr[${mid}] = ${arr[mid]}.`
      });

      if (arr[mid] === target) {
        steps.push({
          low,
          high,
          mid,
          found: true,
          message: `Target ${target} found at index ${mid}!`
        });
        return { found: true, index: mid, steps };
      }

      if (arr[mid] < target) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    steps.push({ found: false, index: -1, message: `Target ${target} not in array.` });
    return { found: false, index: -1, steps };
  }

  /**
   * Lower Bound: First position where arr[index] >= target.
   * @param {number[]} arr 
   * @param {number} target 
   */
  static lowerBound(arr, target) {
    let low = 0;
    let high = arr.length; // Range [0..N]
    const steps = [];

    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      steps.push({ low, high, mid, midVal: arr[mid], message: `Checking mid arr[${mid}] = ${arr[mid]}` });

      if (arr[mid] >= target) {
        high = mid; // Candidate found, search left
      } else {
        low = mid + 1;
      }
    }

    return { index: low, steps };
  }

  /**
   * Upper Bound: First position where arr[index] > target.
   * @param {number[]} arr 
   * @param {number} target 
   */
  static upperBound(arr, target) {
    let low = 0;
    let high = arr.length;
    const steps = [];

    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      steps.push({ low, high, mid, midVal: arr[mid], message: `Checking mid arr[${mid}] = ${arr[mid]}` });

      if (arr[mid] > target) {
        high = mid;
      } else {
        low = mid + 1;
      }
    }

    return { index: low, steps };
  }

  /**
   * Search in Rotated Sorted Array in O(log N).
   * @param {number[]} arr 
   * @param {number} target 
   */
  static searchRotated(arr, target) {
    let low = 0;
    let high = arr.length - 1;
    const steps = [];

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      steps.push({
        low,
        high,
        mid,
        midVal: arr[mid],
        message: `Rotated Search range [${low}..${high}], Mid: arr[${mid}]=${arr[mid]}`
      });

      if (arr[mid] === target) {
        return { found: true, index: mid, steps };
      }

      // Check if left half is normally sorted
      if (arr[low] <= arr[mid]) {
        if (target >= arr[low] && target < arr[mid]) {
          high = mid - 1; // Target lies in sorted left half
        } else {
          low = mid + 1; // Target in right half
        }
      } else {
        // Right half is normally sorted
        if (target > arr[mid] && target <= arr[high]) {
          low = mid + 1; // Target lies in sorted right half
        } else {
          high = mid - 1; // Target in left half
        }
      }
    }

    return { found: false, index: -1, steps };
  }
}
