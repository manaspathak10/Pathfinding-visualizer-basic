export function dfs(grid, startNode, finishNode) 
{
	
	const visitedNodesInOrder = [];
  const dfsstack=[]
  dfsstack.push(startNode);
  startNode.distance = 0;
  while(dfsstack.length)
  {
  	const currNode=dfsstack.pop();
  	if(currNode.isWall || currNode.isVisited) continue;
  	if(currNode==finishNode) return visitedNodesInOrder;
  	currNode.isVisited=true;
  	let nextNode;
  	const {row,col}=currNode;
  	if(row>0)
  	{
  		nextNode=grid[row-1][col];
  		if(!nextNode.isVisited)
  		{
  			nextNode.previousNode=currNode;
  			dfsstack.push(nextNode);
  		}
  	}

  	if(row<grid.length-1)
  	{
  		nextNode=grid[row+1][col];
  		if(!nextNode.isVisited)
  		{
  			nextNode.previousNode=currNode;
  			dfsstack.push(nextNode);
  		}
  	}
  	if(col>0)
  	{
  		nextNode=grid[row][col-1];
  		if(!nextNode.isVisited)
  		{
  			nextNode.previousNode=currNode;
  			dfsstack.push(nextNode);
  		}
  	}
  	if(col<grid[0].length-1)
  	{
  		nextNode=grid[row][col+1];
  		if(!nextNode.isVisited)
  		{
  			nextNode.previousNode=currNode;
  			dfsstack.push(nextNode);
  		}
  	}
  }


}



// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrderz(finishNode) 
{
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
