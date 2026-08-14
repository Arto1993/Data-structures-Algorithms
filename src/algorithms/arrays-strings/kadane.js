/**
 * Kadane's Algorithm for Maximum Subarray Sum in JavaScript (ES6+)
 * 
 * Dynamic Programming technique finding the contiguous subarray with the largest sum in O(N) time and O(1) space.
 * Recurrence: currentMax = max(arr[i], currentMax + arr[i])
 */

export class KadaneAlgorithm {
  static maxSubArray(arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]) {
    let maxSoFar = arr[0];
    let currentMax = arr[0];
    let start = 0, end = 0, tempStart = 0;
    const steps = [];

    steps.push({
      type: 'init',
      array: [...arr],
      idx: 0,
      currentMax,
      maxSoFar,
      start: 0,
      end: 0,
      explanation: `Initialized Kadane's Algorithm: currentMax = ${currentMax}, globalMax = ${maxSoFar} at index 0.`
    });

    for (let i = 1; i < arr.length; i++) {
      const val = arr[i];

      if (val > currentMax + val) {
        currentMax = val;
        tempStart = i;
      } else {
        currentMax = currentMax + val;
      }

      if (currentMax > maxSoFar) {
        maxSoFar = currentMax;
        start = tempStart;
        end = i;
      }

      steps.push({
        type: 'step',
        array: [...arr],
        idx: i,
        val,
        currentMax,
        maxSoFar,
        start,
        end,
        window: [start, end],
        explanation: `At index [${i}] (${val}): currentMax = max(${val}, ${currentMax - val} + ${val}) = ${currentMax} | globalMax = ${maxSoFar}.`
      });
    }

    steps.push({
      type: 'complete',
      array: [...arr],
      maxSoFar,
      start,
      end,
      subarray: arr.slice(start, end + 1),
      explanation: `🎉 Maximum Subarray Sum = ${maxSoFar} for subarray [${arr.slice(start, end + 1).join(', ')}] (indices [${start}..${end}]).`
    });

    return { maxSoFar, start, end, subarray: arr.slice(start, end + 1), steps };
  }
}
