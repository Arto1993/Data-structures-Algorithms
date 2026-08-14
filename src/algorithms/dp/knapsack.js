/**
 * 0/1 Knapsack Problem in JavaScript (ES6+)
 * 
 * Given weights and values of N items and a max capacity W:
 * Find the maximum value that can be put in a knapsack of capacity W.
 * 
 * Recurrence:
 * DP[i][w] = max(DP[i-1][w], DP[i-1][w - weights[i-1]] + values[i-1]) if w >= weights[i-1]
 *          = DP[i-1][w] otherwise
 * 
 * Time Complexity: O(N * W)
 * Space Complexity: O(N * W) for 2D table, O(W) space-optimized
 */

export class Knapsack01 {
  static solve(weights, values, capacity) {
    return this.solve2D(weights, values, capacity);
  }

  /**
   * Solves 0/1 Knapsack with complete 2D matrix calculation and animation steps.
   * @param {number[]} weights 
   * @param {number[]} values 
   * @param {number} capacity 
   */
  static solve2D(weights, values, capacity) {
    const n = weights.length;
    // DP Table: (n + 1) rows x (capacity + 1) cols
    const dp = Array.from({ length: n + 1 }, () => new Array(capacity + 1).fill(0));
    const steps = [];

    // Animation step generation
    for (let i = 1; i <= n; i++) {
      const wt = weights[i - 1];
      const val = values[i - 1];

      for (let w = 0; w <= capacity; w++) {
        if (wt <= w) {
          const take = dp[i - 1][w - wt] + val;
          const leave = dp[i - 1][w];
          dp[i][w] = Math.max(take, leave);

          steps.push({
            i,
            w,
            item: { index: i - 1, weight: wt, value: val },
            take,
            leave,
            decision: take > leave ? 'take' : 'leave',
            result: dp[i][w],
            dpState: dp.map(row => [...row]),
            explanation: `Item ${i} (w=${wt}, v=${val}) at capacity ${w}: compare TAKE (${val} + dp[${i-1}][${w-wt}]=${take}) vs LEAVE (dp[${i-1}][${w}]=${leave}) -> max is ${dp[i][w]}.`
          });
        } else {
          dp[i][w] = dp[i - 1][w];
          steps.push({
            i,
            w,
            item: { index: i - 1, weight: wt, value: val },
            decision: 'cannot_fit',
            result: dp[i][w],
            dpState: dp.map(row => [...row]),
            explanation: `Item ${i} (w=${wt}) exceeds capacity ${w} -> carry over value dp[${i-1}][${w}]=${dp[i][w]}.`
          });
        }
      }
    }

    // Backtrack to find selected items
    const selectedItems = [];
    let currW = capacity;
    for (let i = n; i > 0 && currW > 0; i--) {
      if (dp[i][currW] !== dp[i - 1][currW]) {
        // Item was included
        selectedItems.unshift(i - 1);
        currW -= weights[i - 1];
      }
    }

    return {
      maxValue: dp[n][capacity],
      dpTable: dp,
      selectedItemIndices: selectedItems,
      selectedItems: selectedItems.map(idx => ({ index: idx, weight: weights[idx], value: values[idx] })),
      steps
    };
  }

  /**
   * Space-optimized 1D array O(W) space
   */
  static solve1DOptimized(weights, values, capacity) {
    const dp = new Array(capacity + 1).fill(0);
    const n = weights.length;

    for (let i = 0; i < n; i++) {
      const wt = weights[i];
      const val = values[i];
      // Traverse backwards to prevent using the same item multiple times
      for (let w = capacity; w >= wt; w--) {
        dp[w] = Math.max(dp[w], dp[w - wt] + val);
      }
    }

    return { maxValue: dp[capacity], dp1D: dp };
  }
}
