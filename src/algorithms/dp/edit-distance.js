/**
 * Levenshtein Edit Distance in JavaScript (ES6+)
 * 
 * Computes minimum number of single-character edits (insertions, deletions, or substitutions)
 * required to change one word into the other.
 * 
 * Recurrence:
 * If s1[i-1] == s2[j-1] -> DP[i][j] = DP[i-1][j-1]
 * Else                  -> DP[i][j] = 1 + min(
 *                                        DP[i-1][j],   // Delete
 *                                        DP[i][j-1],   // Insert
 *                                        DP[i-1][j-1]  // Replace
 *                                     )
 * 
 * Time Complexity: O(M * N)
 * Space Complexity: O(M * N)
 */

export class EditDistance {
  /**
   * Calculates Levenshtein matrix and alignment operations.
   * @param {string} word1 
   * @param {string} word2 
   */
  static solve(word1, word2) {
    const m = word1.length;
    const n = word2.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    const steps = [];

    // Base cases
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    steps.push({
      type: 'init_base',
      dpState: dp.map(r => [...r]),
      explanation: `Initialized base cases: empty string transitions (deletions on rows, insertions on columns).`
    });

    for (let i = 1; i <= m; i++) {
      const c1 = word1[i - 1];
      for (let j = 1; j <= n; j++) {
        const c2 = word2[j - 1];

        if (c1 === c2) {
          dp[i][j] = dp[i - 1][j - 1];
          steps.push({
            i,
            j,
            c1,
            c2,
            op: 'MATCH',
            val: dp[i][j],
            dpState: dp.map(r => [...r]),
            explanation: `Characters MATCH ('${c1}' == '${c2}'): No edit cost needed -> dp[${i}][${j}] = dp[${i-1}][${j-1}] = ${dp[i][j]}.`
          });
        } else {
          const insertCost = dp[i][j - 1];
          const deleteCost = dp[i - 1][j];
          const replaceCost = dp[i - 1][j - 1];

          const minCost = Math.min(insertCost, deleteCost, replaceCost);
          dp[i][j] = 1 + minCost;

          let chosenOp = 'REPLACE';
          if (minCost === insertCost) chosenOp = 'INSERT';
          else if (minCost === deleteCost) chosenOp = 'DELETE';

          steps.push({
            i,
            j,
            c1,
            c2,
            op: chosenOp,
            val: dp[i][j],
            dpState: dp.map(r => [...r]),
            explanation: `MISMATCH ('${c1}' != '${c2}'): Min of Insert(${insertCost}), Delete(${deleteCost}), Replace(${replaceCost}) + 1 = ${dp[i][j]} (${chosenOp}).`
          });
        }
      }
    }

    // Reconstruct edit operations alignment
    const operations = [];
    let i = m;
    let j = n;
    const pathCoordinates = [];

    while (i > 0 || j > 0) {
      pathCoordinates.push([i, j]);
      if (i > 0 && j > 0 && word1[i - 1] === word2[j - 1]) {
        operations.unshift({ type: 'MATCH', char1: word1[i - 1], char2: word2[j - 1] });
        i--;
        j--;
      } else if (i > 0 && j > 0 && dp[i][j] === dp[i - 1][j - 1] + 1) {
        operations.unshift({ type: 'REPLACE', from: word1[i - 1], to: word2[j - 1] });
        i--;
        j--;
      } else if (j > 0 && dp[i][j] === dp[i][j - 1] + 1) {
        operations.unshift({ type: 'INSERT', char: word2[j - 1] });
        j--;
      } else if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) {
        operations.unshift({ type: 'DELETE', char: word1[i - 1] });
        i--;
      } else {
        break;
      }
    }
    pathCoordinates.push([0, 0]);

    return {
      distance: dp[m][n],
      dpTable: dp,
      word1,
      word2,
      pathCoordinates,
      operations,
      steps
    };
  }
}
