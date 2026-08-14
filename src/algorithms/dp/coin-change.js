/**
 * Coin Change (Minimum Coins) via Dynamic Programming in JavaScript (ES6+)
 * 
 * Given coins [c1, c2, ...] and amount A, find minimum coins needed to make amount A.
 * Recurrence: dp[i] = min(dp[i], dp[i - coin] + 1)
 * 
 * Time Complexity: O(amount * number of coins)
 * Space Complexity: O(amount)
 */

export class CoinChange {
  static minCoins(coins = [1, 2, 5], amount = 11) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    const steps = [];

    steps.push({
      type: 'init',
      coins: [...coins],
      amount,
      dp: [...dp],
      explanation: `Initialized DP array of size ${amount + 1} with Infinity, dp[0] = 0.`
    });

    for (let a = 1; a <= amount; a++) {
      for (const coin of coins) {
        if (a - coin >= 0 && dp[a - coin] !== Infinity) {
          const oldVal = dp[a];
          dp[a] = Math.min(dp[a], dp[a - coin] + 1);

          steps.push({
            type: 'update',
            amountTarget: a,
            coin,
            dp: [...dp],
            explanation: `Amount ${a} using coin ${coin}: dp[${a}] = min(${oldVal === Infinity ? '∞' : oldVal}, dp[${a - coin}] + 1) = ${dp[a]}.`
          });
        }
      }
    }

    const minCount = dp[amount] === Infinity ? -1 : dp[amount];
    steps.push({
      type: 'complete',
      minCount,
      dp: [...dp],
      explanation: minCount !== -1
        ? `🎉 Minimum coins needed for amount ${amount}: ${minCount} coins.`
        : `⚠️ Cannot make amount ${amount} with given coins.`
    });

    return { minCount, dp, steps };
  }
}
