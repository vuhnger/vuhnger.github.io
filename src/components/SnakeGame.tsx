import React, { useState, useEffect, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

const SnakeGame: React.FC = () => {
  const GRID_SIZE = 20;
  // Use full viewport dimensions
  const CANVAS_WIDTH = window.innerWidth;
  const CANVAS_HEIGHT = window.innerHeight;
  const GRID_WIDTH = Math.floor(CANVAS_WIDTH / GRID_SIZE);
  const GRID_HEIGHT = Math.floor(CANVAS_HEIGHT / GRID_SIZE);

  // Generate random starting position for snake
  const generateRandomStartPosition = useCallback(() => {
    return {
      x: Math.floor(Math.random() * GRID_WIDTH),
      y: Math.floor(Math.random() * GRID_HEIGHT)
    };
  }, [GRID_WIDTH, GRID_HEIGHT]);

  const [snake, setSnake] = useState<Position[]>([generateRandomStartPosition()]);
  const [food, setFood] = useState<Position[]>([]); // Start empty, will be populated by generateFood
  const [direction, setDirection] = useState<Position>({ x: 1, y: 0 });
  const [gameRunning, setGameRunning] = useState(true);
  const [pathToClosestFood, setPathToClosestFood] = useState<Position[]>([]);

  // A* pathfinding algorithm
  const findPathToClosestFood = useCallback((snakeHead: Position, foodPositions: Position[], snakeBody: Position[]) => {
    // Find closest food
    let closestFood = foodPositions[0];
    let minDistance = Math.abs(snakeHead.x - closestFood.x) + Math.abs(snakeHead.y - closestFood.y);
    
    for (const food of foodPositions) {
      const distance = Math.abs(snakeHead.x - food.x) + Math.abs(snakeHead.y - food.y);
      if (distance < minDistance) {
        minDistance = distance;
        closestFood = food;
      }
    }

    // A* implementation
    interface Node {
      pos: Position;
      g: number; // Distance from start
      h: number; // Heuristic distance to goal
      f: number; // Total cost
      parent: Node | null;
    }

    const openSet: Node[] = [];
    const closedSet: Set<string> = new Set();
    
    const startNode: Node = {
      pos: snakeHead,
      g: 0,
      h: Math.abs(snakeHead.x - closestFood.x) + Math.abs(snakeHead.y - closestFood.y),
      f: 0,
      parent: null
    };
    startNode.f = startNode.g + startNode.h;
    
    openSet.push(startNode);
    
    const getKey = (pos: Position) => `${pos.x},${pos.y}`;
    const isValidPosition = (pos: Position) => {
      return pos.x >= 0 && pos.x < GRID_WIDTH && 
             pos.y >= 0 && pos.y < GRID_HEIGHT &&
             !snakeBody.some(segment => segment.x === pos.x && segment.y === pos.y);
    };
    
    while (openSet.length > 0) {
      // Find node with lowest f score
      let currentIndex = 0;
      for (let i = 1; i < openSet.length; i++) {
        if (openSet[i].f < openSet[currentIndex].f) {
          currentIndex = i;
        }
      }
      
      const current = openSet.splice(currentIndex, 1)[0];
      const currentKey = getKey(current.pos);
      
      if (current.pos.x === closestFood.x && current.pos.y === closestFood.y) {
        // Reconstruct path
        const path: Position[] = [];
        let node: Node | null = current;
        while (node && node.parent) {
          path.unshift(node.pos);
          node = node.parent;
        }
        return path;
      }
      
      closedSet.add(currentKey);
      
      // Check neighbors
      const neighbors = [
        { x: current.pos.x + 1, y: current.pos.y },
        { x: current.pos.x - 1, y: current.pos.y },
        { x: current.pos.x, y: current.pos.y + 1 },
        { x: current.pos.x, y: current.pos.y - 1 }
      ];
      
      for (const neighborPos of neighbors) {
        const neighborKey = getKey(neighborPos);
        
        if (!isValidPosition(neighborPos) || closedSet.has(neighborKey)) {
          continue;
        }
        
        const tentativeG = current.g + 1;
        const existingNode = openSet.find(node => getKey(node.pos) === neighborKey);
        
        if (!existingNode) {
          const neighbor: Node = {
            pos: neighborPos,
            g: tentativeG,
            h: Math.abs(neighborPos.x - closestFood.x) + Math.abs(neighborPos.y - closestFood.y),
            f: 0,
            parent: current
          };
          neighbor.f = neighbor.g + neighbor.h;
          openSet.push(neighbor);
        } else if (tentativeG < existingNode.g) {
          existingNode.g = tentativeG;
          existingNode.f = existingNode.g + existingNode.h;
          existingNode.parent = current;
        }
      }
    }
    
    return []; // No path found
  }, [GRID_WIDTH, GRID_HEIGHT]);

  // Generate random food positions
  const generateFood = useCallback(() => {
    const foodPositions = [];
    for (let i = 0; i < 8; i++) {
      foodPositions.push({
        x: Math.floor(Math.random() * GRID_WIDTH),
        y: Math.floor(Math.random() * GRID_HEIGHT),
      });
    }
    return foodPositions;
  }, [GRID_WIDTH, GRID_HEIGHT]);

  // Initialize food on first render
  useEffect(() => {
    if (food.length === 0) {
      setFood(generateFood());
    }
  }, [food.length, generateFood]);

  // Handle keyboard input
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!gameRunning) return;
    
    // Prevent default behavior for arrow keys to stop scrolling
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
    }
    
    switch (e.key) {
      case 'ArrowUp':
        setDirection(prev => prev.y !== 1 ? { x: 0, y: -1 } : prev);
        break;
      case 'ArrowDown':
        setDirection(prev => prev.y !== -1 ? { x: 0, y: 1 } : prev);
        break;
      case 'ArrowLeft':
        setDirection(prev => prev.x !== 1 ? { x: -1, y: 0 } : prev);
        break;
      case 'ArrowRight':
        setDirection(prev => prev.x !== -1 ? { x: 1, y: 0 } : prev);
        break;
    }
  }, [gameRunning]);

  // Game loop
  useEffect(() => {
    if (!gameRunning) return;

    const gameInterval = setInterval(() => {
      setSnake(currentSnake => {
        const newSnake = [...currentSnake];
        const head = { ...newSnake[0] };
        
        // Move head
        head.x += direction.x;
        head.y += direction.y;

        // Check wall collision
        if (head.x < 0 || head.x >= GRID_WIDTH || head.y < 0 || head.y >= GRID_HEIGHT) {
          // Auto restart game with random positions
          setTimeout(() => {
            setSnake([generateRandomStartPosition()]);
            setFood(generateFood());
            setDirection({ x: 1, y: 0 });
            setGameRunning(true);
          }, 100);
          return currentSnake;
        }

        // Check self collision
        if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          // Auto restart game with random positions
          setTimeout(() => {
            setSnake([generateRandomStartPosition()]);
            setFood(generateFood());
            setDirection({ x: 1, y: 0 });
            setGameRunning(true);
          }, 100);
          return currentSnake;
        }

        newSnake.unshift(head);

        // Check food collision with any of the food items
        const eatenFoodIndex = food.findIndex(f => head.x === f.x && head.y === f.y);
        if (eatenFoodIndex !== -1) {
          // Remove only the eaten food and add a new one
          setFood(currentFood => {
            const newFood = [...currentFood];
            newFood[eatenFoodIndex] = {
              x: Math.floor(Math.random() * GRID_WIDTH),
              y: Math.floor(Math.random() * GRID_HEIGHT),
            };
            return newFood;
          });
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 50); // Double speed: 100ms -> 50ms

    return () => clearInterval(gameInterval);
  }, [direction, food, gameRunning, generateFood, findPathToClosestFood]);

  // Update path whenever snake or food changes
  useEffect(() => {
    if (snake.length > 0 && food.length > 0) {
      const newPath = findPathToClosestFood(snake[0], food, snake);
      setPathToClosestFood(newPath);
    }
  }, [snake, food, findPathToClosestFood]);

  // Add event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden'
      }}
    >
      <svg
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        {/* Grid lines */}
        <defs>
          <pattern
            id="grid"
            width={GRID_SIZE}
            height={GRID_SIZE}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${GRID_SIZE} 0 L 0 0 0 ${GRID_SIZE}`}
              fill="none"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* A* Path Overlay */}
        {pathToClosestFood.map((pathPos, index) => (
          <rect
            key={`path-${index}`}
            x={pathPos.x * GRID_SIZE}
            y={pathPos.y * GRID_SIZE}
            width={GRID_SIZE}
            height={GRID_SIZE}
            fill="rgba(255, 255, 255, 0.15)"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="1"
            style={{
              opacity: Math.max(0.1, 1 - (index * 0.05)) // Fade out along path
            }}
          />
        ))}

        {/* Snake */}
        {snake.map((segment, index) => (
          <rect
            key={index}
            x={segment.x * GRID_SIZE}
            y={segment.y * GRID_SIZE}
            width={GRID_SIZE - 1}
            height={GRID_SIZE - 1}
            fill="#00ff41"
            stroke="#00ff41"
            strokeWidth="1"
            style={{
              filter: 'drop-shadow(0 0 3px #00ff41)',
            }}
          />
        ))}

        {/* Food */}
        {food.map((foodItem, index) => (
          <circle
            key={index}
            cx={foodItem.x * GRID_SIZE + GRID_SIZE / 2}
            cy={foodItem.y * GRID_SIZE + GRID_SIZE / 2}
            r={GRID_SIZE / 3}
            fill="#ff4444"
            style={{
              filter: 'drop-shadow(0 0 3px #ff4444)',
            }}
          />
        ))}
      </svg>

    </div>
  );
};

export default SnakeGame;