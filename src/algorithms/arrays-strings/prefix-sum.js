/**
 * Prefix Sum Array Algorithm in JavaScript (ES6+)
 * 
 * Allows range sum queries sum(L, R) in O(1) time after O(N) preprocessing:
 * sum(L, R) = prefix[R + 1] - prefix[L]
 */

export class PrefixSum {
  static compute(arr = [3, 2, 4, 1, 5, 2, 7]) {
    const prefix = [0];
    const steps = [];

    steps.push({
      type: 'init',
      array: [...arr],
      prefix: [0],
      currentIdx: -1,
      explanation: `Initialized Prefix Sum array with base prefix[0] = 0.`
    });

    for (let i = 0; i < arr.length; i++) {
      const nextSum = prefix[prefix.length - 1] + arr[i];
      prefix.push(nextSum);

      steps.push({
        type: 'step',
        array: [...arr],
        prefix: [...prefix],
        currentIdx: i,
        explanation: `prefix[${i + 1}] = prefix[${i}] (${prefix[i]}) + arr[${i}] (${arr[i]}) = ${nextSum}.`
      });
    }

    return { prefix, steps };
  }

  static queryRange(prefix, L, R) {
    return prefix[R + 1] - prefix[L];
  }
}
