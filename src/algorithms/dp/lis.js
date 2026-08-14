/**
 * Longest Increasing Subsequence (LIS) in JavaScript (ES6+)
 * 
 * 1. O(N log N) Patience Sorting with Binary Search + Subsequence Reconstruction
 * 2. O(N^2) Dynamic Programming approach
 * 
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */

export class LongestIncreasingSubsequence {
  /**
   * O(N log N) Optimal algorithm with Binary Search and path reconstruction.
   * @param {number[]} nums 
   */
  static solveFast(nums) {
    if (nums.length === 0) return { length: 0, subsequence: [], steps: [] };

    const n = nums.length;
    const tails = []; // tails[i] stores smallest tail of all increasing subsequences of length i+1
    const tailIndices = []; // indices in nums corresponding to tails
    const parent = new Array(n).fill(-1); // parent pointers for reconstruction
    const steps = [];

    for (let i = 0; i < n; i++) {
      const x = nums[i];

      // Binary search for insertion / replacement position in tails
      let left = 0;
      let right = tails.length; // upper bound

      while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (tails[mid] < x) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }

      const isExtend = left === tails.length;
      tails[left] = x;
      tailIndices[left] = i;

      if (left > 0) {
        parent[i] = tailIndices[left - 1];
      }

      steps.push({
        num: x,
        index: i,
        pos: left,
        isExtend,
        tails: [...tails],
        explanation: isExtend
          ? `Value ${x} extended maximum LIS length to ${tails.length}.`
          : `Value ${x} lowered the end value for LIS length ${left + 1} from previous value to ${x}.`
      });
    }

    // Reconstruct subsequence
    const subsequence = [];
    let curr = tailIndices[tails.length - 1];
    while (curr !== -1) {
      subsequence.unshift(nums[curr]);
      curr = parent[curr];
    }

    return {
      length: tails.length,
      subsequence,
      tails,
      steps
    };
  }

  /**
   * Classic O(N^2) Dynamic Programming
   * @param {number[]} nums 
   */
  static solveDP(nums) {
    if (nums.length === 0) return { length: 0, dp: [] };

    const n = nums.length;
    const dp = new Array(n).fill(1);
    let maxLen = 1;

    for (let i = 1; i < n; i++) {
      for (let j = 0; j < i; j++) {
        if (nums[j] < nums[i]) {
          dp[i] = Math.max(dp[i], dp[j] + 1);
        }
      }
      maxLen = Math.max(maxLen, dp[i]);
    }

    return { length: maxLen, dp };
  }
}
