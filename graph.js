class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    // add array of vertices to graph
    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    // connect two vertices
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let node of this.nodes) {
      if (node.adjacent.has(vertex)) {
        node.adjacent.delete(vertex);
      }
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const visited = new Set();
    const result = [];

    function traverse(vertex) {
      // base case: if vertex is empty (null) return null
      if (!vertex) {
        return null;
      }
      // visit node and mark as visited by adding it to the visited array.
      visited.add(vertex);
      // push vertex value into result array
      result.push(vertex.value);

      // visit neighbors using forEach callback function.
      vertex.adjacent.forEach(neighbor => {
        // if the neighbor node has not been visited yet then return recursive call to continue traversing
        if (!visited.has(neighbor)) {
          return traverse(neighbor);
        }
      });
    }
    traverse(start);

    return result;
  }

  depthFirstSearchIterative(start) {
    // create empty stack
    const stack = [start];
    const result = [];
    const visited = new Set();
    let currentVertex;

    // visit start node 
    visited.add(start);

    // while there are still neighbors to visit, decriments once for every stack.pop()
    while(stack.length) {
      // assign last value of stack to currentVertex and remove it from the array.
      currentVertex = stack.pop();
      // add value of current vertex to result array
      result.push(currentVertex.value);

      // visit neighbors and push onto stack
      currentVertex.adjacent.forEach(neighbor => {
        // if neighbor is not in visited array then execute:
        if(!visited.has(neighbor)) {
          // 1. Add neighbor to visited
          visited.add(neighbor);
          // 2. push neighbor on to stack (increments stack while loop)
          stack.push(neighbor);
        }
      });
    }
    return result;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    // create empty queue
    const queue = [start];
    const result = [];
    const visited = new Set();
    let currentVertex;

    // add start node to visited array
    visited.add(start)

    // while there is still remaining vertices in queue. 
    while(queue.length) {
      // remove first value of queue and assign it to currentVertex. Decrements queue.length
      currentVertex = queue.shift();
      // push currentVertex value into result array
      result.push(currentVertex.value);

      // visit neighbors using forEach callback 
      currentVertex.adjacent.forEach(neighbor => {
        // if neighbor vertex is not in visited array execute:
        if (!visited.has(neighbor)) {
          // 1. Add neighbor to visited
          visited.add(neighbor);
          // 2. Push neighbor into queue. Increments queue.length
          queue.push(neighbor);
        }
      });
    }
    return result;
  }

  shortestPath(start, end) {
    // if only one vertex return array with start.value
    if (start === end) {
      return [start.value];
    }

    // initialize queue with start array of vertex
    var queue = [start];
    // create new set for visited
    let visited = new Set();
    // create predecessors object
    let predecessors = {};
    // create path array
    let path = [];

    // while there are values in the queue
    while (queue.length) {
      // decrement queue and remove first value and assign value to currentVertex
      let currentVertex = queue.shift();

      // if currentVertex is the end execute:
      if (currentVertex === end) {
        // 1. assign predecessors end value to stop
        let stop = predecessors[end.value];
        // 2. while stop is not null continue looping:
        while (stop) {
          // a) push stop onto path array
          path.push(stop);
          // b) assign stop vertex to stop
          stop = predecessors[stop];
        }
        // 3. insert start value to path array
        path.unshift(start.value);
        // 4. reverse path array.
        path.reverse();
        // return updated path array. 
        return path;
      }

      // add currentVertex to visited
      visited.add(currentVertex);
      // loop through adjacent vertices
      for(let vertex of currentVertex.adjacent) {
        // if vertex has not been visited execute
        if (!visited.has(vertex)) {
          // assign current vertex's value to vertex.value in predecessors array
          predecessors[vertex.value] = currentVertex.value;
          // push vertex neighbors on queue.length++
          queue.push(vertex);
        }
      }
    }
  }
}

module.exports = {Graph, Node};