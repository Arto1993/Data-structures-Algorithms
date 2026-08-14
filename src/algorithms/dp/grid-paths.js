/**
 * Grid Dynamic Programming (Unique Paths & Min Path Sum) in JavaScript (ES6+)
 * 
 * 2D Grid DP where movement is restricted to Right and Down:
 * Recurrence: dp[r][c] = dp[r-1][c] + dp[r][c-1] (for Unique Paths)
 * 
 * Time Complexity: O(M * N)
 * Space Complexity: O(M * N)
 */

export class GridDP {
  static uniquePaths(m = 4, n = 5) {
    const dp = Array.from({ length: m }, () => new Array(n).fill(1));
    const steps = [];

    steps.push({
      type: 'init',
      m, n,
      matrix: dp.map(r => [...r]),
      explanation: `Initialized ${m}x${n} grid: 1st row and 1st column initialized to 1 path.`
    });

    for (let r = 1; r < m; r++) {
      for (let c = 1; c < n; c++) {
        dp[r][c] = dp[r - 1][c] + dp[r][c - 1];

        steps.push({
          type: 'step',
          r, c,
          fromTop: dp[r - 1][c],
          fromLeft: dp[r][c - 1],
          matrix: dp.map(row => [...row]),
          explanation: `At cell (${r}, ${c}): dp[${r}][${c}] = top (${dp[r-1][c]}) + left (${dp[r][c-1]}) = ${dp[r][c]} paths.`
        });
      }
    }

    steps.push({
      type: 'complete',
      totalPaths: dp[m - 1][n - 1],
      matrix: dp.map(r => [...r]),
      explanation: `🎉 Total Unique Paths from (0,0) to (${m-1},${n-1}) = ${dp[m - 1][n - 1]}.`
    });

    return { totalPaths: dp[m - 1][n - 1], matrix: dp, steps };
  }
}
