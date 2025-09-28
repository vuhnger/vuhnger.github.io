import React, { useState, useEffect, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

interface Node {
  id: number;
  position: Position;
}

interface Edge {
  from: Node;
  to: Node;
  weight: number;
  inMST?: boolean;
  isHighlighted?: boolean;
}

const MSTVisualization: React.FC = () => {
  const CANVAS_WIDTH = window.innerWidth;
  const CANVAS_HEIGHT = window.innerHeight;
  const NODE_COUNT = 12;
  const NODE_RADIUS = 8;

  // Generate a unique instance ID to prevent multiple instances
  const [instanceId] = useState(() => Math.random().toString(36).substr(2, 9));

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [mstEdges, setMstEdges] = useState<Edge[]>([]);
  const [currentEdge, setCurrentEdge] = useState<Edge | null>(null);
  const [isBuilding, setIsBuilding] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Generate random nodes positioned in center area
  const generateNodes = useCallback((): Node[] => {
    const centerX = CANVAS_WIDTH / 2;
    const centerY = CANVAS_HEIGHT / 2;
    const rangeX = Math.min(CANVAS_WIDTH * 0.3, 400);
    const rangeY = Math.min(CANVAS_HEIGHT * 0.3, 300);
    
    const newNodes: Node[] = [];
    
    for (let i = 0; i < NODE_COUNT; i++) {
      let position: Position;
      let attempts = 0;
      
      // Ensure nodes don't overlap
      do {
        position = {
          x: centerX + (Math.random() - 0.5) * rangeX * 2,
          y: centerY + (Math.random() - 0.5) * rangeY * 2
        };
        attempts++;
      } while (
        attempts < 50 && 
        newNodes.some(node => 
          Math.sqrt(
            Math.pow(node.position.x - position.x, 2) + 
            Math.pow(node.position.y - position.y, 2)
          ) < NODE_RADIUS * 4
        )
      );
      
      newNodes.push({
        id: i,
        position
      });
    }
    
    return newNodes;
  }, [CANVAS_WIDTH, CANVAS_HEIGHT]);

  // Calculate distance between two nodes
  const calculateDistance = useCallback((node1: Node, node2: Node): number => {
    return Math.sqrt(
      Math.pow(node1.position.x - node2.position.x, 2) + 
      Math.pow(node1.position.y - node2.position.y, 2)
    );
  }, []);

  // Generate all possible edges with weights
  const generateEdges = useCallback((nodeList: Node[]): Edge[] => {
    const edgeList: Edge[] = [];
    
    for (let i = 0; i < nodeList.length; i++) {
      for (let j = i + 1; j < nodeList.length; j++) {
        const edge: Edge = {
          from: nodeList[i],
          to: nodeList[j],
          weight: calculateDistance(nodeList[i], nodeList[j])
        };
        edgeList.push(edge);
      }
    }
    
    // Sort edges by weight (for Kruskal's algorithm)
    return edgeList.sort((a, b) => a.weight - b.weight);
  }, [calculateDistance]);

  // Union-Find data structure for Kruskal's algorithm
  class UnionFind {
    parent: number[];
    rank: number[];
    
    constructor(size: number) {
      this.parent = Array.from({length: size}, (_, i) => i);
      this.rank = Array(size).fill(0);
    }
    
    find(x: number): number {
      if (this.parent[x] !== x) {
        this.parent[x] = this.find(this.parent[x]);
      }
      return this.parent[x];
    }
    
    union(x: number, y: number): boolean {
      const rootX = this.find(x);
      const rootY = this.find(y);
      
      if (rootX === rootY) return false;
      
      if (this.rank[rootX] < this.rank[rootY]) {
        this.parent[rootX] = rootY;
      } else if (this.rank[rootX] > this.rank[rootY]) {
        this.parent[rootY] = rootX;
      } else {
        this.parent[rootY] = rootX;
        this.rank[rootX]++;
      }
      
      return true;
    }
  }

  // Kruskal's algorithm with visualization
  const buildMST = useCallback(async () => {
    if (isBuilding || nodes.length === 0 || edges.length === 0) return;
    
    setIsBuilding(true);
    setMstEdges([]);
    setCurrentEdge(null);
    setIsCompleted(false);
    
    const uf = new UnionFind(nodes.length);
    const mst: Edge[] = [];
    
    for (const edge of edges) {
      // Highlight current edge being considered
      setCurrentEdge(edge);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Check if adding this edge creates a cycle
      if (uf.union(edge.from.id, edge.to.id)) {
        // Add edge to MST
        const mstEdge = { ...edge, inMST: true };
        mst.push(mstEdge);
        setMstEdges([...mst]);
        
        // Stop when we have n-1 edges
        if (mst.length === nodes.length - 1) {
          break;
        }
        
        await new Promise(resolve => setTimeout(resolve, 500));
      } else {
        // Edge would create a cycle, skip it
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }
    
    setCurrentEdge(null);
    setIsCompleted(true);
    
    // Show completed MST glowing yellow for 3 seconds
    setTimeout(() => {
      setIsCompleted(false);
      // Generate new nodes and restart
      setTimeout(() => {
        const newNodes = generateNodes();
        const newEdges = generateEdges(newNodes);
        setNodes(newNodes);
        setEdges(newEdges);
        setMstEdges([]);
        setIsBuilding(false);
      }, 1000);
    }, 3000);
  }, [isBuilding, nodes, edges, generateNodes, generateEdges]);

  // Initialize nodes and edges
  useEffect(() => {
    if (nodes.length === 0) {
      const initialNodes = generateNodes();
      const initialEdges = generateEdges(initialNodes);
      setNodes(initialNodes);
      setEdges(initialEdges);
    }
  }, [nodes.length, generateNodes, generateEdges]);

  // Auto-start MST building
  useEffect(() => {
    if (nodes.length > 0 && edges.length > 0 && !isBuilding) {
      const timeout = setTimeout(() => {
        buildMST();
      }, 2000);
      
      return () => clearTimeout(timeout);
    }
  }, [nodes, edges, isBuilding, buildMST]);

  return (
    <div 
      key={instanceId} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: -1,
        pointerEvents: 'none'
      }}
    >
      <svg
        width="100%"
        height="100%"
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden'
        }}
      >
        {/* Background grid pattern */}
        <defs>
          <pattern
            id={`mst-grid-pattern-${instanceId}`}
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <rect
              width="30"
              height="30"
              fill="rgba(0, 0, 0, 0.3)"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#mst-grid-pattern-${instanceId})`} />

        {/* All edges (faded) */}
        {edges.map((edge, index) => (
          <line
            key={`all-edge-${index}`}
            x1={edge.from.position.x}
            y1={edge.from.position.y}
            x2={edge.to.position.x}
            y2={edge.to.position.y}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1"
          />
        ))}

        {/* MST edges */}
        {mstEdges.map((edge, index) => (
          <line
            key={`mst-edge-${index}`}
            x1={edge.from.position.x}
            y1={edge.from.position.y}
            x2={edge.to.position.x}
            y2={edge.to.position.y}
            stroke={isCompleted ? "rgba(255, 255, 0, 1)" : "rgba(0, 255, 65, 0.8)"}
            strokeWidth={isCompleted ? "4" : "3"}
            style={{
              filter: isCompleted 
                ? 'drop-shadow(0 0 8px rgba(255, 255, 0, 0.8))' 
                : 'drop-shadow(0 0 4px rgba(0, 255, 65, 0.6))'
            }}
          />
        ))}

        {/* Current edge being considered */}
        {currentEdge && (
          <line
            x1={currentEdge.from.position.x}
            y1={currentEdge.from.position.y}
            x2={currentEdge.to.position.x}
            y2={currentEdge.to.position.y}
            stroke="rgba(255, 100, 100, 0.8)"
            strokeWidth="2"
            style={{
              filter: 'drop-shadow(0 0 4px rgba(255, 100, 100, 0.6))'
            }}
          />
        )}

        {/* Nodes */}
        {nodes.map((node) => (
          <circle
            key={`node-${node.id}`}
            cx={node.position.x}
            cy={node.position.y}
            r={NODE_RADIUS}
            fill={isCompleted ? "rgba(255, 255, 0, 0.9)" : "rgba(255, 255, 255, 0.8)"}
            stroke={isCompleted ? "rgba(255, 255, 0, 1)" : "rgba(255, 255, 255, 1)"}
            strokeWidth="2"
            style={{
              filter: isCompleted 
                ? 'drop-shadow(0 0 6px rgba(255, 255, 0, 0.8))' 
                : 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.6))'
            }}
          />
        ))}

        {/* Node labels */}
        {nodes.map((node) => (
          <text
            key={`label-${node.id}`}
            x={node.position.x}
            y={node.position.y + 4}
            textAnchor="middle"
            fill={isCompleted ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.7)"}
            fontSize="12"
            fontFamily="monospace"
            fontWeight="bold"
          >
            {node.id}
          </text>
        ))}
      </svg>
    </div>
  );
};

export default MSTVisualization;