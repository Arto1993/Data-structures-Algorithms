/**
 * Subsets, Permutations, and Combinations via Backtracking in JavaScript (ES6+)
 * 
 * Demonstrates:
 * - Subsets: 2^N state space tree (include / exclude decisions)
 * - Permutations: N! branching tree (swapping / visited set)
 * - Combinations: nCr selection tree
 */

export class BacktrackingSets {
  /**
   * Generates all 2^N subsets (Power Set)
   */
  static generateSubsets(nums = [1, 2, 3]) {
    const result = [];
    const current = [];
    const steps = [];

    steps.push({
      type: 'init',
      nums: [...nums],
      current: [],
      result: [],
      explanation: `Starting Subsets generation on [${nums.join(', ')}]. Total expected subsets = 2^${nums.length} = ${Math.pow(2, nums.length)}.`
    });

    const backtrack = (start) => {
      result.push([...current]);

      steps.push({
        type: 'add_subset',
        current: [...current],
        resultCount: result.length,
        explanation: `Added subset [${current.join(', ')}] (Total: ${result.length}).`
      });

      for (let i = start; i < nums.length; i++) {
        current.push(nums[i]);
        backtrack(i + 1);
        current.pop();
      }
    };

    backtrack(0);
    return { result, steps };
  }

  /**
   * Generates all N! permutations
   */
  static generatePermutations(nums = [1, 2, 3]) {
    const result = [];
    const current = [];
    const visited = new Set();
    const steps = [];

    const backtrack = () => {
      if (current.length === nums.length) {
        result.push([...current]);
        steps.push({
          type: 'add_perm',
          current: [...current],
          resultCount: result.length,
          explanation: `Found permutation [${current.join(', ')}] (Total: ${result.length}).`
        });
        return;
      }

      for (let i = 0; i < nums.length; i++) {
        if (visited.has(nums[i])) continue;

        visited.add(nums[i]);
        current.push(nums[i]);

        backtrack();

        current.pop();
        visited.delete(nums[i]);
      }
    };

    backtrack();
    return { result, steps };
  }
}
