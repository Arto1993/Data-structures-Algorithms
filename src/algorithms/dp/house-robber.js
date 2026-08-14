/**
 * House Robber (1D Dynamic Programming) in JavaScript (ES6+)
 * 
 * Maximize stolen loot without robbing adjacent houses:
 * Recurrence: dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(N) or O(1) space optimized
 */

export class HouseRobber {
  static rob(nums = [2, 7, 9, 3, 1]) {
    if (!nums || nums.length === 0) return { maxLoot: 0, steps: [] };
    if (nums.length === 1) return { maxLoot: nums[0], steps: [] };

    const n = nums.length;
    const dp = new Array(n).fill(0);
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);

    const steps = [];

    steps.push({
      type: 'init',
      nums: [...nums],
      dp: [...dp],
      explanation: `Initialized House Robber: dp[0]=${dp[0]}, dp[1]=${dp[1]}.`
    });

    for (let i = 2; i < n; i++) {
      dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);

      steps.push({
        type: 'step',
        house: i,
        loot: nums[i],
        dp: [...dp],
        explanation: `House ${i} ($${nums[i]}): max(skip=${dp[i - 1]}, rob=${dp[i - 2]} + ${nums[i]} = ${dp[i - 2] + nums[i]}) ➔ dp[${i}] = $${dp[i]}.`
      });
    }

    steps.push({
      type: 'complete',
      maxLoot: dp[n - 1],
      dp: [...dp],
      explanation: `🎉 Maximum Loot = $${dp[n - 1]}.`
    });

    return { maxLoot: dp[n - 1], dp, steps };
  }
}
