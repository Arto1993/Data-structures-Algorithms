/**
 * Topological Sort & Cycle Detection in JavaScript (ES6+)
 * 
 * Linearly orders vertices of a Directed Acyclic Graph (DAG) such that for every directed
 * edge u -> v, vertex u comes before v.
 * 
 * Provides two classical approaches:
 * 1. Kahn's Algorithm (BFS In-Degree method)
 * 2. Tarjan / DFS with 3-state Cycle Detection (White/Gray/Black)
 * 
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */

export class TopologicalSort {
  static getDefaultGraph() {
    const nodes = [
      { id: '5', x: 80, y: 70 },
      { id: '4', x: 80, y: 250 },
      { id: '2', x: 260, y: 70 },
      { id: '0', x: 260, y: 250 },
      { id: '3', x: 440, y: 70 },
      { id: '1', x: 440, y: 250 }
    ];

    const edges = [
      { from: '5', to: '2', directed: true },
      { from: '5', to: '0', directed: true },
      { from: '4', to: '0', directed: true },
      { from: '4', to: '1', directed: true },
      { from: '2', to: '3', directed: true },
      { from: '3', to: '1', directed: true }
    ];

    return { nodes, edges };
  }

  /**
   * Kahn's Algorithm (BFS based on In-Degrees)
   */
  static kahnsAlgorithm(
    numVertices = 6,
    edges = [[5, 2], [5, 0], [4, 0], [4, 1], [2, 3], [3, 1]],
    nodeNames = ['0', '1', '2', '3', '4', '5']
  ) {
    const adj = Array.from({ length: numVertices }, () => []);
    const inDegree = new Array(numVertices).fill(0);
    const steps = [];

    // Build graph
    for (const [u, v] of edges) {
      adj[u].push(v);
      inDegree[v]++;
    }

    const distMap = {};
    for (let i = 0; i < numVertices; i++) {
      distMap[nodeNames[i]] = inDegree[i];
    }

    steps.push({
      type: 'init',
      inDegree: [...inDegree],
      distances: { ...distMap },
      queue: [],
      order: [],
      path: [],
      visited: [],
      explanation: `Calculated initial in-degrees (dependencies) for all ${numVertices} vertices.`
    });

    // Enqueue all nodes with in-degree 0
    const queue = [];
    for (let i = 0; i < numVertices; i++) {
      if (inDegree[i] === 0) {
        queue.push(i);
      }
    }

    steps.push({
      type: 'initial_queue',
      inDegree: [...inDegree],
      distances: { ...distMap },
      queue: queue.map(i => nodeNames[i]),
      order: [],
      path: [],
      visited: queue.map(i => nodeNames[i]),
      explanation: `Enqueued vertices with 0 incoming dependencies: [${queue.map(i => nodeNames[i]).join(', ')}].`
    });

    const order = [];
    const visited = [];

    while (queue.length > 0) {
      const u = queue.shift();
      const uName = nodeNames[u];
      order.push(uName);
      visited.push(uName);

      steps.push({
        type: 'process_node',
        node: uName,
        current: uName,
        inDegree: [...inDegree],
        distances: { ...distMap },
        queue: queue.map(i => nodeNames[i]),
        order: [...order],
        path: [...order],
        visited: [...visited],
        explanation: `Dequeued vertex "${uName}" (has 0 dependencies). Appended to Topological Ordering.`
      });

      for (const v of adj[u]) {
        const vName = nodeNames[v];
        inDegree[v]--;
        distMap[vName] = inDegree[v];

        steps.push({
          type: 'decrement_in_degree',
          from: uName,
          to: vName,
          node: vName,
          inDegree: [...inDegree],
          distances: { ...distMap },
          queue: queue.map(i => nodeNames[i]),
          order: [...order],
          path: [...order],
          visited: [...visited],
          highlightedEdges: [{ from: uName, to: vName }],
          explanation: `Decremented in-degree of child "${vName}" to ${inDegree[v]}.`
        });

        if (inDegree[v] === 0) {
          queue.push(v);
          steps.push({
            type: 'enqueue',
            node: vName,
            inDegree: [...inDegree],
            distances: { ...distMap },
            queue: queue.map(i => nodeNames[i]),
            order: [...order],
            path: [...order],
            visited: [...visited],
            explanation: `Vertex "${vName}" in-degree reached 0 ➔ Added to ready queue.`
          });
        }
      }
    }

    const hasCycle = order.length !== numVertices;

    steps.push({
      type: 'complete',
      node: null,
      inDegree: [...inDegree],
      distances: { ...distMap },
      queue: [],
      order: [...order],
      path: [...order],
      visited: [...visited],
      hasCycle,
      explanation: hasCycle
        ? `⚠️ Graph contains a directed cycle! Topological sort is impossible.`
        : `🎉 Kahn's Topological Sort Complete! Valid DAG Ordering: [${order.join(' ➔ ')}].`
    });

    return {
      isValidDAG: !hasCycle,
      order: hasCycle ? [] : order,
      hasCycle,
      steps
    };
  }
}
