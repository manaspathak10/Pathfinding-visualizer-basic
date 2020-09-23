// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid);
  }
}
// class PriorityQueue {
//   constructor(maxSize) {
//      // Set default max size if not provided
//      if (isNaN(maxSize)) {
//         maxSize = 10;
//       }
//      this.maxSize = maxSize;
//      // Init an array that'll contain the queue values.
//      this.container = [];
//   }
//   // Helper function to display all values while developing
//   display() {
//      console.log(this.container);
//   }
//   // Checks if queue is empty
//   isEmpty() {
//      return this.container.length === 0;
//   }
//   // checks if queue is full
//   isFull() {
//      return this.container.length >= this.maxSize;
//   }
//   enqueue(data, priority) {
//      // Check if Queue is full
//      if (this.isFull()) {
//         console.log("Queue Overflow!");
//         return;
//      }
//      let currElem = new this.Element(data, priority);
//      let addedFlag = false;
//      // Since we want to add elements to end, we'll just push them.
//      for (let i = 0; i < this.container.length; i++) {
//         if (currElem.priority < this.container[i].priority) {
//            this.container.splice(i, 0, currElem);
//            addedFlag = true; break;
//         }
//      }
//      if (!addedFlag) {
//         this.container.push(currElem);
//      }
//   }
//   dequeue() {
//   // Check if empty
//   if (this.isEmpty()) {
//      console.log("Queue Underflow!");
//      return;
//   }
//   return this.container.pop();
// }
// peek() {
//   if (this.isEmpty()) {
//     console.log("Queue Underflow!");
//     return;
//   }
//   return this.container[this.container.length - 1];
// }
// clear() {
//   this.container = [];
// }

// // Create an inner class that we'll use to create new nodes in the queue
// // Each element has some data and a priority
// PriorityQueue.prototype.Element = class {
//   constructor(data, priority) {
//     this.data = data;
//     this.priority = priority;
//   }
// };
// export function dijkstra(grid, startNode, finishNode) {
//   const visitedNodesInOrder = [];
//   startNode.distance = 0;
//   const unvisitedNodes = getAllNodes(grid);
//   let pq = new PriorityQueue();
//   pq.enqueue(startNode, 0);
//   while (!pq.isEmpty()) {
//     const closestNode = pq.dequeue();
//     // If we encounter a wall, we skip it.
//     if (closestNode.isWall || closestNode.isVisited) continue;
//     // If the closest node is at a distance of infinity,
//     // we must be trapped and should therefore stop.

//     if (closestNode.distance === Infinity) return visitedNodesInOrder;
//     closestNode.isVisited = true;
//     visitedNodesInOrder.push(closestNode);
//     if (closestNode === finishNode) return visitedNodesInOrder;
//     updateUnvisitedNeighbors(closestNode, grid);
//   }
// }

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
