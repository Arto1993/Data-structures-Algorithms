/**
 * Bellman-Ford Shortest Path & Negative Cycle Detection in JavaScript (ES6+)
 * 
 * Computes single-source shortest paths in weighted graphs with arbitrary (including negative) weights.
 * Relaxes all edges |V| - 1 times, then checks for negative-weight cycles.
 * 
 * Time Complexity: O(V * E)
 * Space Complexity: O(V)
 */

export class BellmanFord {
  /**
   * Default sample graph with negative edges for animation
   */
  static getDefaultGraph() {
    const nodes = [
      { id: 'A', x: 80, y: 170 },
      { id: 'B', x: 220, y: 80 },
      { id: 'C', x: 220, y: 260 },
      { id: 'D', x: 380, y: 80 },
      { id: 'E', x: 420, y: 240 }
    ];

    const edges = [
      { from: 'A', to: 'B', weight: -1, directed: true },
      { from: 'A', to: 'C', weight: 4, directed: true },
      { from: 'B', to: 'C', weight: 3, directed: true },
      { from: 'B', to: 'D', weight: 2, directed: true },
      { from: 'B', to: 'E', weight: 2, directed: true },
      { from: 'D', to: 'C', weight: 5, directed: true },
      { from: 'D', to: 'B', weight: 1, directed: true },
      { from: 'E', to: 'D', weight: -3, directed: true }
    ];

    return { nodes, edges };
  }

  /**
   * Runs Bellman-Ford algorithm from startNode to targetNode.
   * @param {Array<string|object>} nodeList Array of node IDs or node objects
   * @param {Array<{from: string, to: string, weight: number}>} edges 
   * @param {string} startNode 
   * @param {string} targetNode
   */
  static solve(
    nodeList = ['A', 'B', 'C', 'D', 'E'],
    edges = [
      { from: 'A', to: 'B', weight: -1, directed: true },
      { from: 'A', to: 'C', weight: 4, directed: true },
      { from: 'B', to: 'C', weight: 3, directed: true },
      { from: 'B', to: 'D', weight: 2, directed: true },
      { from: 'B', to: 'E', weight: 2, directed: true },
      { from: 'D', to: 'C', weight: 5, directed: true },
      { from: 'D', to: 'B', weight: 1, directed: true },
      { from: 'E', to: 'D', weight: -3, directed: true }
    ],
    startNode = 'A',
    targetNode = 'D'
  ) {
    const rawNodes = nodeList.map(n => (typeof n === 'object' ? n.id : n));
    const numVertices = rawNodes.length;

    const distances = {};
    const previous = {};
    const visited = new Set();
    const steps = [];

    for (const id of rawNodes) {
      distances[id] = Infinity;
      previous[id] = null;
    }
    distances[startNode] = 0;
    visited.add(startNode);

    steps.push({
      type: 'init',
      node: startNode,
      distances: { ...distances },
      visited: Array.from(visited),
      path: [],
      highlightedEdges: [],
      explanation: `Initialized Bellman-Ford: Start vertex "${startNode}" set to 0; all other vertices set to Infinity.`
    });

    // Relax all edges |V| - 1 times
    for (let iter = 1; iter <= numVertices - 1; iter++) {
      let anyRelaxed = false;

      for (const edge of edges) {
        const u = edge.from !== undefined ? edge.from : edge.u;
        const v = edge.to !== undefined ? edge.to : edge.v;
        const weight = edge.weight;

        if (distances[u] !== Infinity && distances[u] + weight < distances[v]) {
          const oldDist = distances[v];
          distances[v] = distances[u] + weight;
          previous[v] = u;
          visited.add(u);
          visited.add(v);
          anyRelaxed = true;

          // Reconstruct current intermediate path from startNode to v
          const currPath = [];
          let trace = v;
          while (trace !== null && trace !== undefined) {
            currPath.unshift(trace);
            trace = previous[trace];
          }

          steps.push({
            type: 'relax',
            iteration: iter,
            node: v,
            from: u,
            to: v,
            weight,
            oldDist,
            newDist: distances[v],
            distances: { ...distances },
            visited: Array.from(visited),
            path: currPath.length > 1 ? [...currPath] : [],
            highlightedEdges: [{ from: u, to: v, u, v }],
            explanation: `[Pass ${iter}/${numVertices - 1}] Relaxed edge (${u} ➔ ${v}, w=${weight}): improved dist[${v}] from ${oldDist === Infinity ? '∞' : oldDist} ➔ ${distances[v]}.`
          });
        }
      }

      if (!anyRelaxed) {
        steps.push({
          type: 'early_exit',
          node: null,
          distances: { ...distances },
          visited: Array.from(visited),
          path: [],
          highlightedEdges: [],
          explanation: `Pass ${iter}: No edges relaxed. Shortest distances converged early!`
        });
        break;
      }
    }

    // Check for negative weight cycles (V-th relaxation attempt)
    let hasNegativeCycle = false;
    let cycleEdge = null;
    for (const edge of edges) {
      const u = edge.from !== undefined ? edge.from : edge.u;
      const v = edge.to !== undefined ? edge.to : edge.v;
      const weight = edge.weight;

      if (distances[u] !== Infinity && distances[u] + weight < distances[v]) {
        hasNegativeCycle = true;
        cycleEdge = { from: u, to: v, weight };
        break;
      }
    }

    // Reconstruct shortest path to targetNode
    const finalPath = [];
    if (!hasNegativeCycle && targetNode && distances[targetNode] !== Infinity) {
      let curr = targetNode;
      while (curr !== null && curr !== undefined) {
        finalPath.unshift(curr);
        curr = previous[curr];
      }
    }

    steps.push({
      type: 'complete',
      node: targetNode,
      distances: { ...distances },
      visited: Array.from(visited),
      path: [...finalPath],
      highlightedEdges: cycleEdge ? [{ from: cycleEdge.from, to: cycleEdge.to }] : [],
      hasNegativeCycle,
      explanation: hasNegativeCycle
        ? `⚠️ Negative-weight cycle detected on edge (${cycleEdge.from} ➔ ${cycleEdge.to})! Shortest paths are unbounded (-∞).`
        : `🎉 Bellman-Ford Complete! Shortest Path to ${targetNode}: ${finalPath.join(' ➔ ')} (Total Distance = ${distances[targetNode]})`
    });

    return { distances, previous, path: finalPath, hasNegativeCycle, steps };
  }
}
