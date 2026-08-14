/**
 * Minimum Spanning Tree (MST) Algorithms in JavaScript (ES6+)
 * 
 * 1. Kruskal's Algorithm (Greedy edge-sorting with Disjoint Set Union)
 * 2. Prim's Algorithm (Greedy node-growing with Priority Queue)
 * 
 * Time Complexities:
 * - Kruskal: O(E log E) or O(E log V)
 * - Prim: O((V + E) log V)
 * Space: O(V + E)
 */

import { DisjointSet } from '../../structures/disjoint-set.js';
import { PriorityQueue } from '../../structures/min-max-heap.js';

export class MSTAlgorithms {
  /**
   * Kruskal's Algorithm for MST
   * @param {number} numVertices 
   * @param {Array<{u: number, v: number, weight: number}>} edgeList 
   */
  static kruskal(numVertices, edgeList) {
    const sortedEdges = [...edgeList].sort((a, b) => a.weight - b.weight);
    const dsu = new DisjointSet(numVertices);
    const mstEdges = [];
    let totalWeight = 0;
    const steps = [];

    steps.push({
      type: 'init',
      sortedEdges: sortedEdges.map(e => ({ ...e })),
      explanation: `Sorted all ${edgeList.length} edges by ascending weight.`
    });

    for (const edge of sortedEdges) {
      const { u, v, weight } = edge;
      const rootU = dsu.find(u);
      const rootV = dsu.find(v);

      if (rootU !== rootV) {
        // Safe to include edge without creating cycle
        dsu.union(u, v);
        mstEdges.push(edge);
        totalWeight += weight;

        steps.push({
          type: 'edge_accepted',
          edge,
          mstEdges: [...mstEdges],
          totalWeight,
          dsuState: dsu.getState(),
          explanation: `ACCEPTED edge (${u} - ${v}, w=${weight}): Connects disjoint components {${rootU}} and {${rootV}}.`
        });

        if (mstEdges.length === numVertices - 1) {
          break; // Spanning tree complete
        }
      } else {
        steps.push({
          type: 'edge_rejected',
          edge,
          mstEdges: [...mstEdges],
          totalWeight,
          dsuState: dsu.getState(),
          explanation: `REJECTED edge (${u} - ${v}, w=${weight}): Both vertices already in same component {${rootU}} (would form cycle).`
        });
      }
    }

    const isConnected = mstEdges.length === numVertices - 1;

    return {
      mstEdges,
      totalWeight,
      isConnected,
      steps
    };
  }

  /**
   * Prim's Algorithm for MST
   * @param {number} numVertices 
   * @param {Map<number, Array<{node: number, weight: number}>>} adjacencyList 
   * @param {number} [startNode=0]
   */
  static prim(numVertices, adjacencyList, startNode = 0) {
    const visited = new Set();
    const pq = new PriorityQueue((a, b) => a.weight - b.weight);
    const mstEdges = [];
    let totalWeight = 0;
    const steps = [];

    visited.add(startNode);
    steps.push({
      type: 'init',
      current: startNode,
      visited: Array.from(visited),
      explanation: `Initialized Prim's MST starting from node ${startNode}.`
    });

    // Add all edges from startNode to PQ
    const startNeighbors = adjacencyList.get(startNode) || [];
    for (const neighbor of startNeighbors) {
      pq.push({ from: startNode, to: neighbor.node, weight: neighbor.weight });
    }

    while (!pq.isEmpty() && visited.size < numVertices) {
      const edge = pq.pop();
      const { from, to, weight } = edge;

      if (visited.has(to)) {
        steps.push({
          type: 'skip_edge',
          edge,
          visited: Array.from(visited),
          explanation: `Skipped edge (${from} - ${to}, w=${weight}): Vertex ${to} is already in MST tree.`
        });
        continue;
      }

      visited.add(to);
      mstEdges.push({ u: from, v: to, weight });
      totalWeight += weight;

      steps.push({
        type: 'add_vertex',
        edge: { u: from, v: to, weight },
        mstEdges: [...mstEdges],
        totalWeight,
        visited: Array.from(visited),
        explanation: `Added vertex ${to} to MST via minimum cut edge (${from} - ${to}, w=${weight}). Total weight: ${totalWeight}.`
      });

      const neighbors = adjacencyList.get(to) || [];
      for (const next of neighbors) {
        if (!visited.has(next.node)) {
          pq.push({ from: to, to: next.node, weight: next.weight });
        }
      }
    }

    return {
      mstEdges,
      totalWeight,
      isConnected: visited.size === numVertices,
      steps
    };
  }
}
