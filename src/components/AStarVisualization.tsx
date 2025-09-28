import React, { useState, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

interface AStarNode extends Position {
  g: number; // Distance from start
  h: number; // Heuristic (distance to goal)
  f: number; // g + h
  parent?: AStarNode;
}

const AStarVisualization: React.FC = () => {
  const GRID_SIZE = 20;
  const CANVAS_WIDTH = window.innerWidth;
  const CANVAS_HEIGHT = window.innerHeight;
  const GRID_WIDTH = Math.floor(CANVAS_WIDTH / GRID_SIZE);
  const GRID_HEIGHT = Math.floor(CANVAS_HEIGHT / GRID_SIZE);
  
  // Generate a unique instance ID to prevent multiple instances
  const [instanceId] = useState(() => Math.random().toString(36).substr(2, 9));

  // Random start and goal positions - only in center area of screen
  const getRandomPosition = (): Position => {
    const centerX = Math.floor(GRID_WIDTH / 2);
    const centerY = Math.floor(GRID_HEIGHT / 2);
    const range = Math.min(Math.floor(GRID_WIDTH / 4), Math.floor(GRID_HEIGHT / 4)); // Quarter of screen size
    
    return {
      x: centerX + Math.floor(Math.random() * (range * 2)) - range,
      y: centerY + Math.floor(Math.random() * (range * 2)) - range
    };
  };

  const [START, setSTART] = useState<Position>({ x: -1, y: -1 });
  const [GOAL, setGOAL] = useState<Position>({ x: -1, y: -1 });

  const [finalPath, setFinalPath] = useState<Position[]>([]);
  const [currentPath, setCurrentPath] = useState<Position[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const heuristic = (pos: Position, goal: Position): number => {
    return Math.abs(pos.x - goal.x) + Math.abs(pos.y - goal.y);
  };

  const getNeighbors = (pos: Position): Position[] => {
    const neighbors: Position[] = [];
    const directions = [
      { x: 0, y: -1 }, // Up
      { x: 1, y: 0 },  // Right
      { x: 0, y: 1 },  // Down
      { x: -1, y: 0 }  // Left
    ];

    for (const dir of directions) {
      const newPos = { x: pos.x + dir.x, y: pos.y + dir.y };
      if (newPos.x >= 0 && newPos.x < GRID_WIDTH && 
          newPos.y >= 0 && newPos.y < GRID_HEIGHT) {
        neighbors.push(newPos);
      }
    }
    return neighbors;
  };

  const reconstructPath = (node: AStarNode): Position[] => {
    const path: Position[] = [];
    let current: AStarNode | undefined = node;
    while (current) {
      path.unshift({ x: current.x, y: current.y });
      current = current.parent;
    }
    return path;
  };



  // A* with current path visualization
  const runAStar = async () => {
    setIsSearching(true);
    setFinalPath([]);
    setCurrentPath([]);

    // Generate new random positions but don't update state yet
    let newStart = getRandomPosition();
    let newGoal = getRandomPosition();
    
    // Ensure start and goal are not too close
    while (Math.abs(newStart.x - newGoal.x) + Math.abs(newStart.y - newGoal.y) < 8) {
      newGoal = getRandomPosition();
    }
    
    const start = newStart;
    const goal = newGoal;

    const openSet: AStarNode[] = [];
    const closedSet: Set<string> = new Set();

    // Start node
    const startNode: AStarNode = {
      ...start,
      g: 0,
      h: heuristic(start, goal),
      f: heuristic(start, goal)
    };
    openSet.push(startNode);

    let iterations = 0;
    const maxIterations = 1000; // Prevent infinite loops

    while (openSet.length > 0 && iterations < maxIterations) {
      iterations++;
      
      // Find node with lowest f score
      openSet.sort((a, b) => a.f - b.f);
      const currentAStarNode = openSet.shift()!;
      
      const nodeKey = `${currentAStarNode.x},${currentAStarNode.y}`;
      if (closedSet.has(nodeKey)) continue;
      
      closedSet.add(nodeKey);
      
      // Show current path being evaluated
      const pathToCurrentNode = reconstructPath(currentAStarNode);
      setCurrentPath(pathToCurrentNode);
      
      // Add delay to see the search progress
      await new Promise(resolve => setTimeout(resolve, 200));

      // Check if we reached the goal
      if (currentAStarNode.x === goal.x && currentAStarNode.y === goal.y) {
        const finalPath = reconstructPath(currentAStarNode);
        
        // Update state with new positions AND path
        setSTART(start);
        setGOAL(goal);
        setFinalPath(finalPath);
        setIsSearching(false);
        
        // Clear everything after showing the result
        setTimeout(() => {
          setFinalPath([]);
          setCurrentPath([]);
          setSTART({ x: -1, y: -1 });
          setGOAL({ x: -1, y: -1 });
        }, 3000);
        
        return;
      }

      // Explore neighbors
      const neighbors = getNeighbors(currentAStarNode);
      for (const neighbor of neighbors) {
        const neighborKey = `${neighbor.x},${neighbor.y}`;
        if (closedSet.has(neighborKey)) continue;

        const g = currentAStarNode.g + 1;
        const h = heuristic(neighbor, goal);
        const f = g + h;

        const existingNode = openSet.find(n => n.x === neighbor.x && n.y === neighbor.y);
        if (!existingNode || g < existingNode.g) {
          const neighborNode: AStarNode = {
            ...neighbor,
            g,
            h,
            f,
            parent: currentAStarNode
          };

          if (!existingNode) {
            openSet.push(neighborNode);
          } else {
            Object.assign(existingNode, neighborNode);
          }
        }
      }
    }

    setIsSearching(false);
  };

  // Auto-restart the search every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSearching) {
        runAStar();
      }
    }, 8000);

    // Start immediately
    runAStar();

    return () => clearInterval(interval);
  }, [isSearching]);

  // Clear everything before each render to prevent ghosts
  useEffect(() => {
    return () => {
      // Cleanup on unmount
      setFinalPath([]);
      setCurrentPath([]);
    };
  }, []);

  return (
    <div key={instanceId} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
      <style>
        {`
          @keyframes pulse-${instanceId} {
            0% { opacity: 0.6; }
            100% { opacity: 1; }
          }
        `}
      </style>
      <svg
        key={`astar-${instanceId}-${finalPath.length}-${currentPath.length}`}
        width="100%"
        height="100%"
        viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
        preserveAspectRatio="xMinYMin meet"
        style={{
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          overflow: 'hidden'
        }}
      >
      {/* Grid pattern - identical to Snake game */}
      <defs>
        <pattern
          id="astar-grid-pattern"
          width={GRID_SIZE}
          height={GRID_SIZE}
          patternUnits="userSpaceOnUse"
        >
          <rect
            width={GRID_SIZE}
            height={GRID_SIZE}
            fill="rgba(0, 0, 0, 0.4)"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#astar-grid-pattern)" />

      {/* Current path being searched - subtle blue */}
      {currentPath
        .filter(pathPos => pathPos.x >= 0 && pathPos.x < GRID_WIDTH && pathPos.y >= 0 && pathPos.y < GRID_HEIGHT)
        .map((pathPos, index) => (
          <rect
            key={`current-${index}`}
            x={pathPos.x * GRID_SIZE}
            y={pathPos.y * GRID_SIZE}
            width={GRID_SIZE}
            height={GRID_SIZE}
            fill="rgba(100, 150, 255, 0.3)"
            stroke="rgba(100, 150, 255, 0.6)"
            strokeWidth="1"
            style={{
              opacity: Math.max(0.2, 1 - (index * 0.02))
            }}
          />
        ))}

      {/* Final optimal path - subtle gold trail */}
      {finalPath
        .filter(pathPos => pathPos.x >= 0 && pathPos.x < GRID_WIDTH && pathPos.y >= 0 && pathPos.y < GRID_HEIGHT)
        .map((pathPos, index) => (
          <rect
            key={`path-${index}`}
            x={pathPos.x * GRID_SIZE}
            y={pathPos.y * GRID_SIZE}
            width={GRID_SIZE}
            height={GRID_SIZE}
            fill="rgba(255, 215, 0, 0.4)"
            stroke="rgba(255, 215, 0, 0.7)"
            strokeWidth="1"
            style={{
              opacity: Math.max(0.3, 1 - (index * 0.01))
            }}
          />
        ))}




      </svg>
    </div>
  );
};export default AStarVisualization;