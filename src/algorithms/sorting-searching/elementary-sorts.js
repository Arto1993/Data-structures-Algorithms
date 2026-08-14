/**
 * Elementary & Counting Sorting Algorithms in JavaScript (ES6+)
 * 
 * 1. Bubble Sort (O(N^2))
 * 2. Selection Sort (O(N^2))
 * 3. Insertion Sort (O(N^2) worst, O(N) best)
 * 4. Counting Sort (O(N + K) non-comparative)
 */

export class ElementarySorts {
  /**
   * Bubble Sort
   */
  static bubbleSort(inputArr) {
    const arr = [...inputArr];
    const n = arr.length;
    const steps = [];

    steps.push({
      type: 'init',
      array: [...arr],
      highlights: [],
      sortedBoundary: 0,
      title: 'Bubble Sort Initialized',
      subtitle: `Array size: ${n} · 0 Sorted`,
      legend: [],
      explanation: `Initialized Bubble Sort on [${arr.join(', ')}].`
    });

    for (let i = 0; i < n - 1; i++) {
      let swapped = false;
      for (let j = 0; j < n - i - 1; j++) {
        steps.push({
          type: 'compare',
          array: [...arr],
          highlights: [j, j + 1],
          minIdx: j,
          comparingIdx: j + 1,
          sortedBoundary: i > 0 ? i : 0,
          title: `Pass ${i + 1}: Adjacent Pair Comparison`,
          subtitle: `Comparison ${j + 1}/${n - 1 - i} · ${i} Bubble-Sorted`,
          legend: [
            { label: `Left: ${arr[j]}`, color: 'min' },
            { label: `Right: ${arr[j + 1]}`, color: 'comparing' }
          ],
          explanation: `Comparing arr[${j}] (${arr[j]}) with arr[${j + 1}] (${arr[j + 1]}).`
        });

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swapped = true;

          steps.push({
            type: 'swap',
            array: [...arr],
            highlights: [j, j + 1],
            minIdx: j + 1,
            comparingIdx: j,
            sortedBoundary: i > 0 ? i : 0,
            title: `Pass ${i + 1}: Swapped Pair`,
            subtitle: `Swapped (${arr[j]} <-> ${arr[j + 1]})`,
            legend: [
              { label: `Swapped: ${arr[j + 1]}`, color: 'comparing' },
              { label: `Swapped: ${arr[j]}`, color: 'min' }
            ],
            explanation: `Swapped arr[${j}] and arr[${j + 1}] (${arr[j]} <-> ${arr[j + 1]}).`
          });
        }
      }
      if (!swapped) break;
    }

    steps.push({
      type: 'complete',
      array: [...arr],
      highlights: [],
      sortedBoundary: n,
      title: '🎉 Bubble Sort Complete',
      subtitle: `All ${n} elements sorted`,
      legend: [
        { label: `${n} Sorted`, color: 'sorted' }
      ],
      explanation: `🎉 Bubble Sort Complete: [${arr.join(', ')}].`
    });

    return { sorted: arr, sortedArray: arr, steps };
  }

  /**
   * Selection Sort (Screenshot-Matched Flow & Armenian/English Metadata)
   */
  static selectionSort(inputArr) {
    const arr = [...inputArr];
    const n = arr.length;
    const steps = [];

    steps.push({
      type: 'init',
      array: [...arr],
      highlights: [],
      sortedBoundary: 0,
      title: 'Անցում 1՝ զննեք չտեսակավորված վերջնամասը',
      subtitle: `Array size: ${n} · 0 տեսակավորված`,
      legend: [],
      explanation: `Initialized Selection Sort on [${arr.join(', ')}].`
    });

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;

      steps.push({
        type: 'pass-start',
        array: [...arr],
        highlights: [i],
        minIdx: i,
        sortedBoundary: i,
        title: `Անցում ${i + 1}՝ զննեք չտեսակավորված վերջնամասը`,
        subtitle: `Համեմատություն 0/${n - 1 - i} · ${i} տեսակավորված`,
        legend: [
          { label: `Նվազագույնը ${arr[minIdx]}`, color: 'min' }
        ],
        explanation: `Pass ${i + 1}: Scanning unsorted partition starting at index ${i + 1} (initial min = ${arr[i]}).`
      });

      for (let j = i + 1; j < n; j++) {
        const isNewMin = arr[j] < arr[minIdx];

        steps.push({
          type: 'compare',
          array: [...arr],
          highlights: [minIdx, j],
          minIdx: minIdx,
          comparingIdx: j,
          sortedBoundary: i,
          title: `Անցում ${i + 1}՝ զննեք չտեսակավորված վերջնամասը`,
          subtitle: `Համեմատություն ${j - i}/${n - 1 - i} · ${i} տեսակավորված`,
          legend: [
            { label: `Նվազագույնը ${arr[minIdx]}`, color: 'min' },
            { label: `Համեմատվում է ${arr[j]}`, color: 'comparing' }
          ],
          explanation: `Comparing current minimum arr[${minIdx}] (${arr[minIdx]}) with arr[${j}] (${arr[j]}).${isNewMin ? ` Found new minimum (${arr[j]})!` : ''}`
        });

        if (isNewMin) {
          minIdx = j;
          steps.push({
            type: 'new-min',
            array: [...arr],
            highlights: [minIdx],
            minIdx: minIdx,
            sortedBoundary: i,
            title: `Անցում ${i + 1}՝ նոր նվազագույն`,
            subtitle: `Նոր նվազագույն արժեք՝ ${arr[minIdx]} (դիրք ${minIdx + 1}) · ${i} տեսակավորված`,
            legend: [
              { label: `Նվազագույնը ${arr[minIdx]}`, color: 'min' }
            ],
            explanation: `Updated minimum element to arr[${minIdx}] = ${arr[minIdx]}.`
          });
        }
      }

      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        steps.push({
          type: 'swap',
          array: [...arr],
          highlights: [i, minIdx],
          sortedBoundary: i + 1,
          title: `Անցում ${i + 1}՝ տեղադրում ենք նվազագույնը`,
          subtitle: `Տեղադրվեց ${arr[i]} արժեքը ${i + 1}-րդ դիրքում · ${i + 1} տեսակավորված`,
          legend: [
            { label: `${i + 1} տեսակավորված`, color: 'sorted' }
          ],
          explanation: `Placed minimum element (${arr[i]}) at position [${i}].`
        });
      } else {
        steps.push({
          type: 'in-place',
          array: [...arr],
          highlights: [i],
          sortedBoundary: i + 1,
          title: `Անցում ${i + 1}՝ արժեքն արդեն իր տեղում է`,
          subtitle: `${arr[i]} արժեքը ճիշտ դիրքում է · ${i + 1} տեսակավորված`,
          legend: [
            { label: `${i + 1} տեսակավորված`, color: 'sorted' }
          ],
          explanation: `Element (${arr[i]}) was already in correct sorted position.`
        });
      }
    }

    steps.push({
      type: 'complete',
      array: [...arr],
      highlights: [],
      sortedBoundary: n,
      title: '🎉 Տեսակավորումն ավարտված է',
      subtitle: `Բոլոր ${n} տարրերը տեսակավորված են (O(N²) բարդությամբ)`,
      legend: [
        { label: `${n} տեսակավորված`, color: 'sorted' }
      ],
      explanation: `🎉 Selection Sort Complete: [${arr.join(', ')}].`
    });

    return { sorted: arr, sortedArray: arr, steps };
  }

  /**
   * Insertion Sort
   */
  static insertionSort(inputArr) {
    const arr = [...inputArr];
    const n = arr.length;
    const steps = [];

    steps.push({
      type: 'init',
      array: [...arr],
      highlights: [],
      sortedBoundary: 1,
      title: 'Insertion Sort Initialized',
      subtitle: `First element is trivially sorted · 1 Sorted`,
      legend: [{ label: '1 Sorted', color: 'sorted' }],
      explanation: `Initialized Insertion Sort on [${arr.join(', ')}].`
    });

    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;

      steps.push({
        type: 'select-key',
        array: [...arr],
        highlights: [i],
        minIdx: i,
        sortedBoundary: i,
        title: `Pass ${i}: Select Next Key`,
        subtitle: `Key: ${key} at position [${i + 1}] · ${i} in sorted partition`,
        legend: [
          { label: `Key: ${key}`, color: 'min' },
          { label: `${i} Sorted`, color: 'sorted' }
        ],
        explanation: `Picked element ${key} to insert into sorted left partition.`
      });

      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        steps.push({
          type: 'shift',
          array: [...arr],
          highlights: [j, j + 1],
          comparingIdx: j + 1,
          minIdx: j,
          sortedBoundary: i,
          title: `Pass ${i}: Shift Element Right`,
          subtitle: `Shifted ${arr[j + 1]} right (${arr[j + 1]} > ${key})`,
          legend: [
            { label: `Shifted: ${arr[j + 1]}`, color: 'comparing' },
            { label: `Key: ${key}`, color: 'min' }
          ],
          explanation: `Shifted ${arr[j + 1]} to position [${j + 1}].`
        });
        j--;
      }
      arr[j + 1] = key;

      steps.push({
        type: 'insert',
        array: [...arr],
        highlights: [j + 1],
        sortedBoundary: i + 1,
        title: `Pass ${i}: Insert Key into Position`,
        subtitle: `Placed key ${key} at position [${j + 2}] · ${i + 1} Sorted`,
        legend: [
          { label: `Placed: ${key}`, color: 'sorted' }
        ],
        explanation: `Inserted element ${key} into sorted left partition at index [${j + 1}].`
      });
    }

    steps.push({
      type: 'complete',
      array: [...arr],
      highlights: [],
      sortedBoundary: n,
      title: '🎉 Insertion Sort Complete',
      subtitle: `All ${n} elements sorted in O(N²) worst / O(N) best time`,
      legend: [{ label: `${n} Sorted`, color: 'sorted' }],
      explanation: `🎉 Insertion Sort Complete: [${arr.join(', ')}].`
    });

    return { sorted: arr, sortedArray: arr, steps };
  }

  /**
   * Counting Sort
   */
  static countingSort(inputArr) {
    const arr = [...inputArr];
    const maxVal = Math.max(...arr, 0);
    const count = new Array(maxVal + 1).fill(0);
    const steps = [];

    for (const num of arr) count[num]++;

    let idx = 0;
    for (let val = 0; val <= maxVal; val++) {
      while (count[val] > 0) {
        arr[idx++] = val;
        count[val]--;
      }
    }

    steps.push({
      type: 'complete',
      array: [...arr],
      sortedBoundary: arr.length,
      title: '🎉 Counting Sort Complete',
      subtitle: `Sorted in linear O(N + K) non-comparative time`,
      legend: [{ label: `${arr.length} Sorted`, color: 'sorted' }],
      explanation: `🎉 Counting Sort Complete in linear O(N + K) time: [${arr.join(', ')}].`
    });

    return { sorted: arr, sortedArray: arr, steps };
  }
}
