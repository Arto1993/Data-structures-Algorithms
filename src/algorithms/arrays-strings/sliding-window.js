/**
 * Sliding Window Algorithm in JavaScript (ES6+)
 * 
 * 1. Maximum Sum Subarray of Fixed Size K (O(N))
 * 2. Longest Substring Without Repeating Characters (Dynamic Window)
 */

export class SlidingWindow {
  /**
   * Maximum Sum Subarray of Size K
   */
  static maxSumSubarray(arr = [2, 1, 5, 1, 3, 2, 8, 4], k = 3) {
    const n = arr.length;
    const steps = [];

    if (n < k) return { maxSum: 0, steps: [] };

    let windowSum = 0;
    for (let i = 0; i < k; i++) {
      windowSum += arr[i];
    }

    let maxSum = windowSum;
    let bestStart = 0;

    steps.push({
      type: 'init_window',
      array: [...arr],
      k,
      windowStart: 0,
      windowEnd: k - 1,
      windowSum,
      maxSum,
      explanation: `Initialized first window [0..${k - 1}] elements [${arr.slice(0, k).join(', ')}]. Window Sum = ${windowSum}.`
    });

    for (let i = k; i < n; i++) {
      const startIdx = i - k + 1;
      const leavingVal = arr[i - k];
      const enteringVal = arr[i];

      windowSum = windowSum - leavingVal + enteringVal;

      const isNewMax = windowSum > maxSum;
      if (isNewMax) {
        maxSum = windowSum;
        bestStart = startIdx;
      }

      steps.push({
        type: 'slide',
        array: [...arr],
        k,
        windowStart: startIdx,
        windowEnd: i,
        leavingVal,
        enteringVal,
        windowSum,
        maxSum,
        bestStart,
        explanation: `Slid window to [${startIdx}..${i}]: Subtracted ${leavingVal}, Added ${enteringVal} ➔ Window Sum = ${windowSum}${isNewMax ? ' (🎉 NEW MAXIMUM!)' : ''}.`
      });
    }

    steps.push({
      type: 'complete',
      array: [...arr],
      k,
      windowStart: bestStart,
      windowEnd: bestStart + k - 1,
      maxSum,
      explanation: `🎉 Optimal Subarray Found: [${arr.slice(bestStart, bestStart + k).join(', ')}] with Max Sum = ${maxSum}.`
    });

    return { maxSum, bestStart, steps };
  }
}
