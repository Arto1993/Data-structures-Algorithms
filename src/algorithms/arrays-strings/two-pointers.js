/**
 * Two Pointers Algorithms in JavaScript (ES6+)
 * 
 * 1. Two Sum (Sorted Array): Converging pointers L and R in O(N) time and O(1) space.
 * 2. Valid Palindrome: Comparing characters from outside inward.
 */

export class TwoPointers {
  /**
   * Two Sum in Sorted Array (Converging Pointers)
   */
  static twoSumSorted(arr = [1, 2, 4, 6, 8, 11, 15], target = 10) {
    let left = 0;
    let right = arr.length - 1;
    const steps = [];

    steps.push({
      type: 'init',
      array: [...arr],
      left,
      right,
      target,
      sum: arr[left] + arr[right],
      explanation: `Initialized Two Pointers on sorted array. L=0 (${arr[left]}), R=${right} (${arr[right]}). Target = ${target}.`
    });

    while (left < right) {
      const sum = arr[left] + arr[right];

      steps.push({
        type: 'compare',
        array: [...arr],
        left,
        right,
        target,
        sum,
        explanation: `Checking sum: arr[${left}] (${arr[left]}) + arr[${right}] (${arr[right]}) = ${sum}. Target is ${target}.`
      });

      if (sum === target) {
        steps.push({
          type: 'found',
          array: [...arr],
          left,
          right,
          target,
          sum,
          explanation: `🎯 MATCH FOUND: indices [${left}, ${right}] (values ${arr[left]} + ${arr[right]} = ${target}).`
        });
        return { indices: [left, right], steps };
      } else if (sum < target) {
        steps.push({
          type: 'move_left',
          array: [...arr],
          left: left + 1,
          right,
          target,
          explanation: `Sum ${sum} < target ${target}: Incrementing Left pointer (L: ${left} ➔ ${left + 1}) to increase sum.`
        });
        left++;
      } else {
        steps.push({
          type: 'move_right',
          array: [...arr],
          left,
          right: right - 1,
          target,
          explanation: `Sum ${sum} > target ${target}: Decrementing Right pointer (R: ${right} ➔ ${right - 1}) to decrease sum.`
        });
        right--;
      }
    }

    return { indices: [], steps };
  }
}
