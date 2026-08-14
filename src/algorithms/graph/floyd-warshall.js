/**
 * Floyd-Warshall All-Pairs Shortest Path Algorithm in JavaScript (ES6+)
 * 
 * Computes shortest distances between every pair of vertices in a directed weighted graph.
 * 
 * Time Complexity: O(V^3)
 * Space Complexity: O(V^2) matrix
 */

export class FloydWarshall {
  static getDefaultGraph() {
    const nodes = [
      { id: 'A', x: 100, y: 90 },
      { id: 'B', x: 340, y: 90 },
      { id: 'C', x: 340, y: 260 },
      { id: 'D', x: 100, y: 260 }
    ];

    const edges = [
      { from: 'A', to: 'B', weight: 5, directed: true },
      { from: 'A', to: 'D', weight: 10, directed: true },
      { from: 'B', to: 'C', weight: 3, directed: true },
      { from: 'C', to: 'D', weight: 1, directed: true }
    ];

    return { nodes, edges };
  }

  static solve(
    nodeList = ['A', 'B', 'C', 'D'],
    edges = [
      { from: 'A', to: 'B', weight: 5 },
      { from: 'A', to: 'D', weight: 10 },
      { from: 'B', to: 'C', weight: 3 },
      { from: 'C', to: 'D', weight: 1 }
    ]
  ) {
    const rawNodes = nodeList.map(n => (typeof n === 'object' ? n.id : n));
    const n = rawNodes.length;

    const dist = Array.from({ length: n }, () => new Array(n).fill(Infinity));
    for (let i = 0; i < n; i++) dist[i][i] = 0;

    for (const e of edges) {
      const u = typeof e.from === 'string' ? rawNodes.indexOf(e.from) : (e.u !== undefined ? e.u : 0);
      const v = typeof e.to === 'string' ? rawNodes.indexOf(e.to) : (e.v !== undefined ? e.v : 0);
      if (u !== -1 && v !== -1) {
        dist[u][v] = e.weight;
      }
    }

    const steps = [];

    steps.push({
      type: 'init',
      matrix: dist.map(r => [...r]),
      k: null, i: null, j: null,
      explanation: `Initialized Floyd-Warshall ${n}×${n} all-pairs distance matrix from edge weights.`
    });

    for (let k = 0; k < n; k++) {
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (dist[i][k] !== Infinity && dist[k][j] !== Infinity && dist[i][k] + dist[k][j] < dist[i][j]) {
            const oldVal = dist[i][j];
            dist[i][j] = dist[i][k] + dist[k][j];

            steps.push({
              type: 'update',
              k, i, j,
              node: rawNodes[k],
              from: rawNodes[i],
              to: rawNodes[j],
              oldVal,
              newVal: dist[i][j],
              matrix: dist.map(r => [...r]),
              explanation: `Via vertex ${rawNodes[k]} (k=${k}): improved dist(${rawNodes[i]} ➔ ${rawNodes[j]}) = dist(${rawNodes[i]}➔${rawNodes[k]}) + dist(${rawNodes[k]}➔${rawNodes[j]}) = ${dist[i][j]}.`
            });
          }
        }
      }
    }

    steps.push({
      type: 'complete',
      matrix: dist.map(r => [...r]),
      k: null, i: null, j: null,
      explanation: `🎉 Floyd-Warshall Complete! All-pairs shortest paths computed in O(V³) time.`
    });

    return { matrix: dist, nodeNames: rawNodes, steps };
  }
}
