/**
 * A* Pathfinding Algorithm in JavaScript (ES6+)
 * 
 * An informed search algorithm that uses heuristics: f(n) = g(n) + h(n)
 * - g(n): exact cost from start to node n
 * - h(n): estimated heuristic cost from n to target
 * - f(n): total estimated cost of path through n
 * 
 * Guaranteed to find the optimal path if h(n) is admissible (never overestimates).
 * 
 * Time Complexity: O(E) to O(V log V) depending on heuristic accuracy
 * Space Complexity: O(V)
 */

import { PriorityQueue } from '../../structures/min-max-heap.js';

export const Heuristics = {
  manhattan: (r1, c1, r2, c2) => Math.abs(r1 - r2) + Math.abs(c1 - c2),
  euclidean: (r1, c1, r2, c2) => Math.hypot(r1 - r2, c1 - c2),
  chebyshev: (r1, c1, r2, c2) => Math.max(Math.abs(r1 - r2), Math.abs(c1 - c2))
};

/**
 * Executes A* algorithm on a 2D Grid.
 * @param {number[][]} grid 0 = empty, 1 = obstacle / wall
 * @param {[number, number]} start [row, col]
 * @param {[number, number]} target [row, col]
 * @param {string} [heuristicType='manhattan']
 * @param {boolean} [allowDiagonals=false]
 */
export function aStarGrid(grid, start, target, heuristicType = 'manhattan', allowDiagonals = false) {
  const rows = grid.length;
  const cols = grid[0].length;
  const [startR, startC] = start;
  const [targetR, targetC] = target;

  const hFn = Heuristics[heuristicType] || Heuristics.manhattan;

  const getKey = (r, c) => `${r},${c}`;
  const startKey = getKey(startR, startC);
  const targetKey = getKey(targetR, targetC);

  const gScore = {}; // key -> cost
  const fScore = {}; // key -> f(n)
  const cameFrom = {}; // key -> [r, c]

  const closedSet = new Set();
  const openSet = new Set([startKey]);
  const steps = [];

  const pq = new PriorityQueue((a, b) => a.f - b.f);

  gScore[startKey] = 0;
  fScore[startKey] = hFn(startR, startC, targetR, targetC);

  pq.push({ r: startR, c: startC, f: fScore[startKey] });

  steps.push({
    type: 'init',
    current: [startR, startC],
    openSet: Array.from(openSet),
    closedSet: Array.from(closedSet),
    explanation: `A* initialized. Start: (${startR}, ${startC}), Target: (${targetR}, ${targetC}). Initial h-score: ${fScore[startKey].toFixed(2)}.`
  });

  // Neighbor directions
  let dirs = [
    [-1, 0], [1, 0], [0, -1], [0, 1]
  ];
  if (allowDiagonals) {
    dirs = [...dirs, [-1, -1], [-1, 1], [1, -1], [1, 1]];
  }

  let found = false;

  while (!pq.isEmpty()) {
    const current = pq.pop();
    const currKey = getKey(current.r, current.c);

    if (closedSet.has(currKey)) continue;

    openSet.delete(currKey);
    closedSet.add(currKey);

    steps.push({
      type: 'examine_node',
      current: [current.r, current.c],
      f: fScore[currKey],
      g: gScore[currKey],
      h: (fScore[currKey] - gScore[currKey]).toFixed(2),
      openSet: Array.from(openSet),
      closedSet: Array.from(closedSet),
      explanation: `Exploring node (${current.r}, ${current.c}) [g=${gScore[currKey]}, h=${(fScore[currKey] - gScore[currKey]).toFixed(1)}, f=${fScore[currKey].toFixed(1)}].`
    });

    if (current.r === targetR && current.c === targetC) {
      found = true;
      steps.push({
        type: 'target_reached',
        current: [current.r, current.c],
        openSet: Array.from(openSet),
        closedSet: Array.from(closedSet),
        explanation: `Target (${targetR}, ${targetC}) reached! Reconstructing shortest optimal path.`
      });
      break;
    }

    for (const [dr, dc] of dirs) {
      const nr = current.r + dr;
      const nc = current.c + dc;
      const neighborKey = getKey(nr, nc);

      // Bounds check and obstacle check
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
      if (grid[nr][nc] === 1) continue; // Obstacle wall
      if (closedSet.has(neighborKey)) continue;

      const isDiagonal = dr !== 0 && dc !== 0;
      const stepCost = isDiagonal ? Math.SQRT2 : 1;
      const tentativeG = gScore[currKey] + stepCost;

      if (gScore[neighborKey] === undefined || tentativeG < gScore[neighborKey]) {
        cameFrom[neighborKey] = [current.r, current.c];
        gScore[neighborKey] = tentativeG;
        const h = hFn(nr, nc, targetR, targetC);
        fScore[neighborKey] = tentativeG + h;

        if (!openSet.has(neighborKey)) {
          openSet.add(neighborKey);
          pq.push({ r: nr, c: nc, f: fScore[neighborKey] });

          steps.push({
            type: 'add_open',
            node: [nr, nc],
            g: tentativeG.toFixed(2),
            h: h.toFixed(2),
            f: fScore[neighborKey].toFixed(2),
            openSet: Array.from(openSet),
            closedSet: Array.from(closedSet),
            explanation: `Added neighbor (${nr}, ${nc}) to Open Set with f=${fScore[neighborKey].toFixed(2)} (g=${tentativeG.toFixed(2)}, h=${h.toFixed(2)}).`
          });
        }
      }
    }
  }

  // Reconstruct path
  const path = [];
  if (found) {
    let curr = [targetR, targetC];
    while (curr) {
      path.unshift(curr);
      const k = getKey(curr[0], curr[1]);
      if (k === startKey) break;
      curr = cameFrom[k];
    }

    steps.push({
      type: 'path_complete',
      current: [targetR, targetC],
      openSet: Array.from(openSet),
      closedSet: Array.from(closedSet),
      path: [...path],
      explanation: `🎉 Shortest Path Found! Total Length: ${path.length} steps, Cost: ${gScore[targetKey]?.toFixed(1)}.`
    });
  }

  return {
    found,
    path,
    steps,
    totalCost: found ? gScore[targetKey] : Infinity
  };
}
