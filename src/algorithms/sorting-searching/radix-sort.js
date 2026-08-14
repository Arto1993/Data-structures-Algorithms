/**
 * Radix Sort (LSD) Algorithm in JavaScript (ES6+)
 * 
 * A non-comparative integer sorting algorithm that sorts data with integer keys
 * by grouping keys by individual digits sharing the same significant position.
 * 
 * Time Complexity: O(d * (N + k)) where d = max digits, k = base/radix (10)
 * Space Complexity: O(N + k)
 * Invariant: Stable sorting at each digit position (Least Significant Digit -> Most Significant Digit).
 */

export class RadixSort {
  /**
   * Sorts an array using LSD Radix Sort with Counting Sort subroutine.
   * @param {number[]} inputArr 
   * @returns {{ sorted: number[], steps: Array<object> }}
   */
  static sort(inputArr) {
    if (!inputArr || inputArr.length <= 1) {
      return { sorted: [...inputArr], steps: [] };
    }

    let arr = [...inputArr];
    const steps = [];
    const maxNum = Math.max(...arr.map(Math.abs));
    const maxDigits = maxNum === 0 ? 1 : Math.floor(Math.log10(maxNum)) + 1;

    steps.push({
      type: 'init',
      array: [...arr],
      highlights: [],
      digitExp: 1,
      digitPlace: 'Units (1s)',
      explanation: `Initialized Radix Sort on [${arr.join(', ')}]. Max element: ${maxNum} (${maxDigits} digits). Base = 10.`
    });

    let exp = 1;
    let pass = 1;

    while (Math.floor(maxNum / exp) > 0) {
      const digitName = exp === 1 ? 'Units (1s)' : exp === 10 ? 'Tens (10s)' : exp === 100 ? 'Hundreds (100s)' : `10^${pass-1}s`;
      
      steps.push({
        type: 'start_pass',
        array: [...arr],
        highlights: [],
        digitExp: exp,
        digitPlace: digitName,
        explanation: `➡️ Pass ${pass}/${maxDigits}: Sorting by ${digitName} digit position.`
      });

      // Buckets for visualization
      const buckets = Array.from({ length: 10 }, () => []);
      for (let i = 0; i < arr.length; i++) {
        const digit = Math.floor(arr[i] / exp) % 10;
        buckets[digit].push(arr[i]);
      }

      steps.push({
        type: 'bucket_distribution',
        array: [...arr],
        highlights: Array.from({ length: arr.length }, (_, i) => i),
        digitExp: exp,
        digitPlace: digitName,
        buckets: buckets.map(b => [...b]),
        explanation: `Distributed elements into 10 decimal buckets [0..9] based on their ${digitName} digit.`
      });

      // Flatten buckets back stably
      const nextArr = [];
      for (let d = 0; d < 10; d++) {
        for (const val of buckets[d]) {
          nextArr.push(val);
        }
      }
      arr = nextArr;

      steps.push({
        type: 'pass_complete',
        array: [...arr],
        highlights: Array.from({ length: arr.length }, (_, i) => i),
        digitExp: exp,
        digitPlace: digitName,
        explanation: `Collected buckets stably: [${arr.join(', ')}]. Stably ordered by ${digitName} digit.`
      });

      exp *= 10;
      pass++;
    }

    steps.push({
      type: 'complete',
      array: [...arr],
      highlights: [],
      explanation: `🎉 Radix Sort Complete! Array sorted in linear O(d · (N+k)) time: [${arr.join(', ')}].`
    });

    return {
      sorted: arr,
      steps
    };
  }
}
