/**
 * Dijkstra's Shortest Path Algorithm in JavaScript (ES6+)
 * 
 * Finds the shortest path from a starting node to all other nodes (or target node)
 * in a weighted graph with non-negative edge weights using a Priority Queue (MinHeap).
 * 
 * Time Complexity: O((V + E) log V) with Binary Heap
 * Space Complexity: O(V)
 */

import { PriorityQueue } from '../../structures/min-max-heap.js';

export class WeightedGraph {
  constructor() {
    this.adjacencyList = new Map(); // Node -> Array<{node, weight}>
    this.nodes = new Set();
  }

  addVertex(v) {
    if (!this.adjacencyList.has(v)) {
      this.adjacencyList.set(v, []);
      this.nodes.add(v);
    }
  }

  addEdge(u, v, weight, directed = false) {
    this.addVertex(u);
    this.addVertex(v);
    this.adjacencyList.get(u).push({ node: v, weight });
    if (!directed) {
      this.adjacencyList.get(v).push({ node: u, weight });
    }
  }

  getNeighbors(u) {
    return this.adjacencyList.get(u) || [];
  }
}

/**
 * Executes Dijkstra's algorithm and records animation steps for visualization.
 * @param {WeightedGraph} graph 
 * @param {string|number} startNode 
 * @param {string|number} [targetNode=null] 
 */
export function dijkstra(graph, startNode, targetNode = null) {
  const distances = {};
  const previous = {};
  const visited = new Set();
  const steps = []; // Animation snapshots

  // Min-Priority Queue ordered by cumulative distance
  const pq = new PriorityQueue((a, b) => a.dist - b.dist);

  for (const node of graph.nodes) {
    distances[node] = Infinity;
    previous[node] = null;
  }

  distances[startNode] = 0;
  pq.push({ node: startNode, dist: 0 });

  steps.push({
    type: 'init',
    node: startNode,
    current: startNode,
    distances: { ...distances },
    visited: Array.from(visited),
    path: [],
    explanation: `Initialized distances: Start node "${startNode}" set to distance 0; all other nodes set to Infinity.`
  });

  while (!pq.isEmpty()) {
    const { node: u, dist: currentDist } = pq.pop();

    if (visited.has(u)) continue;
    visited.add(u);

    // Reconstruct current intermediate path from startNode to u
    const currentPathToU = [];
    let tempCurr = u;
    while (tempCurr !== null && tempCurr !== undefined) {
      currentPathToU.unshift(tempCurr);
      tempCurr = previous[tempCurr];
    }

    steps.push({
      type: 'visit_node',
      node: u,
      current: u,
      currentDist,
      distances: { ...distances },
      visited: Array.from(visited),
      path: currentPathToU.length > 1 ? [...currentPathToU] : [],
      explanation: `Extracted vertex "${u}" with minimum known distance ${currentDist}. Visited: [${Array.from(visited).join(', ')}].`
    });

    if (targetNode !== null && u === targetNode) {
      break;
    }

    const neighbors = graph.getNeighbors(u);
    for (const edge of neighbors) {
      const v = edge.node;
      const weight = edge.weight;

      if (!visited.has(v)) {
        const newDist = distances[u] + weight;
        if (newDist < distances[v]) {
          const oldDist = distances[v];
          distances[v] = newDist;
          previous[v] = u;
          pq.push({ node: v, dist: newDist });

          steps.push({
            type: 'relax_edge',
            node: u,
            from: u,
            to: v,
            weight,
            oldDist,
            newDist,
            distances: { ...distances },
            visited: Array.from(visited),
            path: [],
            explanation: `Relaxed edge (${u} ➔ ${v}, w=${weight}): updated distance to "${v}" from ${oldDist === Infinity ? '∞' : oldDist} to ${newDist}.`
          });
        }
      }
    }
  }

  // Reconstruct final shortest path to targetNode
  const path = [];
  if (targetNode !== null && distances[targetNode] !== Infinity) {
    let curr = targetNode;
    while (curr !== null && curr !== undefined) {
      path.unshift(curr);
      curr = previous[curr];
    }
  }

  // Add final path completion step
  if (path.length > 0) {
    steps.push({
      type: 'path_complete',
      node: targetNode,
      current: targetNode,
      distances: { ...distances },
      visited: Array.from(visited),
      path: [...path],
      explanation: `🎉 Shortest Path Found: ${path.join(' ➔ ')} (Total Distance = ${distances[targetNode]})`
    });
  }

  return {
    distances,
    previous,
    path,
    steps
  };
}

export function graphBFS(graph, startNode = 'A') {
  const visited = new Set();
  const queue = [startNode];
  const order = [];
  const steps = [];

  visited.add(startNode);
  steps.push({
    type: 'init',
    node: startNode,
    visited: Array.from(visited),
    path: [],
    explanation: `Starting BFS at vertex "${startNode}".`
  });

  while (queue.length > 0) {
    const u = queue.shift();
    order.push(u);

    steps.push({
      type: 'visit_node',
      node: u,
      visited: Array.from(visited),
      path: [...order],
      explanation: `Dequeued & visited vertex "${u}". BFS Order: [${order.join(' ➔ ')}].`
    });

    const neighbors = graph.getNeighbors(u);
    for (const edge of neighbors) {
      const v = edge.node;
      if (!visited.has(v)) {
        visited.add(v);
        queue.push(v);
      }
    }
  }

  steps.push({
    type: 'complete',
    node: null,
    visited: Array.from(visited),
    path: [...order],
    explanation: `🎉 BFS Traversal Complete! Final Order: [${order.join(' ➔ ')}].`
  });

  return { order, steps };
}

export function graphDFS(graph, startNode = 'A') {
  const visited = new Set();
  const order = [];
  const steps = [];

  steps.push({
    type: 'init',
    node: startNode,
    visited: [],
    path: [],
    explanation: `Starting DFS at vertex "${startNode}".`
  });

  const dfs = (u) => {
    visited.add(u);
    order.push(u);

    steps.push({
      type: 'visit_node',
      node: u,
      visited: Array.from(visited),
      path: [...order],
      explanation: `DFS reached vertex "${u}". Order: [${order.join(' ➔ ')}].`
    });

    const neighbors = graph.getNeighbors(u);
    for (const edge of neighbors) {
      const v = edge.node;
      if (!visited.has(v)) {
        dfs(v);
      }
    }
  };

  dfs(startNode);

  steps.push({
    type: 'complete',
    node: null,
    visited: Array.from(visited),
    path: [...order],
    explanation: `🎉 DFS Traversal Complete! Final Order: [${order.join(' ➔ ')}].`
  });

  return { order, steps };
}
