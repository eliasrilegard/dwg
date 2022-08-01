/**
 * A Directed Weighted Graph implementation in TypeScript
 */
 export default class DWG<Vertex, Weight> {
  private readonly adjList: Map<Vertex, Map<Vertex, Weight>>;

  constructor() {
    this.adjList = new Map();
  }

  /**
   * The number of vertices in the graph
   */
  get vertexCount(): number {
    return this.adjList.size;
  }

  /**
   * The number of edges in the graph
   */
  get edgeCount(): number {
    let sum = 0;
    for (const edgeMap of this.adjList.values()) sum += edgeMap.size;
    return sum;
  }

  /**
   * Adds a vertex to the graph. If a vertex already exists in the graph, it will
   * be replaced and ALL edges attached (inbound and outgoing) will be removed.
   * @param v The vertex to be added
   * @returns The graph
   */
  addVertex(v: Vertex): DWG<Vertex, Weight> {
    if (this.adjList.has(v)) this.removeVertex(v);
    this.adjList.set(v, new Map());
    return this;
  }

  /**
   * Adds a directed edge to the graph.
   * If the edge already happens to exist, it will be overwritten.
   * @param v1 The vertex of origin
   * @param v2 The destination vertex
   * @param w The weight attached
   * @returns The graph
   */
  addEdge(v1: Vertex, v2: Vertex, w: Weight): DWG<Vertex, Weight> {
    if (!this.adjList.has(v1)) throw new ReferenceError('First vertex doesn\'t exist in the graph');
    if (!this.adjList.has(v2)) throw new ReferenceError('Second vertex doesn\'t exist in the graph');
    const edgeMap = this.adjList.get(v1)!;
    edgeMap.set(v2, w);
    return this;
  }

  /**
   * Removes the edge between the given vertices
   * @param v1 The origin vertex
   * @param v2 The destination vertex
   * @returns `true` if the edge existed and has been removed, `false` if the edge does not exist
   */
  removeEdge(v1: Vertex, v2: Vertex): boolean {
    if (!this.adjList.has(v1)) throw new ReferenceError('First vertex doesn\'t exist in the graph');
    if (!this.adjList.has(v2)) throw new ReferenceError('Second vertex doesn\'t exist in the graph');
    const edgeMap = this.adjList.get(v1)!;
    return edgeMap.delete(v2);
  }

  /**
   * Removes a vertex and ALL edges (inbound and outgoing) associated with it
   * @param v The vertex to be removed
   * @returns `true` if the vertex existed and has been removed, `false` if the vertex does not exist
   */
  removeVertex(v: Vertex): boolean {
    if (!this.adjList.has(v)) return false;
    for (const [vertex, edgeMap] of this.adjList.entries()) {
      if (vertex === v) continue;
      edgeMap.delete(v);
    }
    this.adjList.delete(v);
    return true;
  }

  /**
   * Finds all vertices according to a filter function.
   * @param filterFn The function to determine if a vertex is filtered out or not
   * @returns An array of all vertices that passed the filter function
   */
  find(filterFn: (v: Vertex) => boolean): Array<Vertex> {
    const result: Array<Vertex> = [];
    for (const vertex of this.adjList.keys()) {
      if (filterFn(vertex)) result.push(vertex);
    }
    return result;
  }

  /**
   * Gets all outgoing edges from a given vertex.
   * @param v The vertex for which to search from
   * @returns An array of vertex-weight pairs
   */
  getEdges(v: Vertex): Array<[Vertex, Weight]> {
    const result: Array<[Vertex, Weight]> = [];
    const edges = this.adjList.get(v);
    if (!edges) return [];
    for (const edge of edges.entries()) result.push(edge);
    return result;
  }

  /**
   * Gets the weight of an edge between two vertices.
   * Note that input order matters for which edge is returned!
   * @param v1 The first vertex
   * @param v2 The second vertex
   * @returns The weight of the edge between the vertices
   */
  getWeight(v1: Vertex, v2: Vertex): Weight {
    if (!this.adjList.has(v1)) throw new ReferenceError('First vertex doesn\'t exist in the graph');
    if (!this.adjList.has(v2)) throw new ReferenceError('Second vertex doesn\'t exist in the graph');
    const edgeMap = this.adjList.get(v1)!;
    if (!edgeMap.has(v2)) throw new ReferenceError('No such edge exists in the graph');
    return edgeMap.get(v2)!;
  }

  /**
   * Returns whether the graph contains a given vertex or not.
   * @param v The vertex to check
   * @returns `true` if the vertex is in the graph, `false` if not
   */
  has(v: Vertex): boolean {
    return this.adjList.has(v);
  }

  /**
   * Gets an array representation of all vertices.
   * @returns An array of all vertices
   */
  getAllVertices(): Array<Vertex> {
    return [...this.adjList.keys()];
  }
}