/**
 * Longest Common Subsequence (LCS) in JavaScript (ES6+)
 * 
 * Finds the longest subsequence common to all sequences in two strings.
 * Subsequences are not required to occupy consecutive positions within the original sequences.
 * 
 * Recurrence:
 * If s1[i-1] == s2[j-1] -> DP[i][j] = 1 + DP[i-1][j-1]
 * Else                  -> DP[i][j] = max(DP[i-1][j], DP[i][j-1])
 * 
 * Time Complexity: O(M * N)
 * Space Complexity: O(M * N)
 */

export class LongestCommonSubsequence {
  /**
   * Calculates LCS matrix and records step-by-step state.
   * @param {string} str1 
   * @param {string} str2 
   */
  static solve(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    const steps = [];

    for (let i = 1; i <= m; i++) {
      const c1 = str1[i - 1];
      for (let j = 1; j <= n; j++) {
        const c2 = str2[j - 1];

        if (c1 === c2) {
          dp[i][j] = 1 + dp[i - 1][j - 1];
          steps.push({
            i,
            j,
            c1,
            c2,
            match: true,
            val: dp[i][j],
            dpState: dp.map(r => [...r]),
            explanation: `MATCH '${c1}' == '${c2}': take diagonal 1 + dp[${i-1}][${j-1}] = ${dp[i][j]}.`
          });
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
          steps.push({
            i,
            j,
            c1,
            c2,
            match: false,
            val: dp[i][j],
            dpState: dp.map(r => [...r]),
            explanation: `MISMATCH '${c1}' != '${c2}': max(top dp[${i-1}][${j}]=${dp[i-1][j]}, left dp[${i}][${j-1}]=${dp[i][j-1]}) = ${dp[i][j]}.`
          });
        }
      }
    }

    // Reconstruct LCS string and backtrack path coordinates
    const pathCoordinates = [];
    let i = m;
    let j = n;
    const lcsChars = [];

    while (i > 0 && j > 0) {
      pathCoordinates.push([i, j]);
      if (str1[i - 1] === str2[j - 1]) {
        lcsChars.unshift(str1[i - 1]);
        i--;
        j--;
      } else if (dp[i - 1][j] >= dp[i][j - 1]) {
        i--;
      } else {
        j--;
      }
    }
    pathCoordinates.push([0, 0]);

    return {
      length: dp[m][n],
      sequence: lcsChars.join(''),
      dpTable: dp,
      str1,
      str2,
      pathCoordinates,
      steps
    };
  }
}
