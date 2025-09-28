import React, { useState, useEffect, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

interface EdgeNode {
  id: number;
  position: Position;
  status: 'tilkoblet' | 'ustabil' | 'frakoblet';
  lastStatusChange: number;
}

interface DataPacket {
  id: number;
  from: Position;
  to: Position;
  progress: number;
  type: 'opplasting' | 'nedlasting';
}

interface Pod {
  id: number;
  position: Position;
  targetNodeId: number;
  isMoving: boolean;
  migrationProgress: number;
}

const EdgeComputingVisualization: React.FC = () => {
  const CANVAS_WIDTH = window.innerWidth;
  const CANVAS_HEIGHT = window.innerHeight;
  const EDGE_NODE_COUNT = 8;
  const CLOUD_RADIUS = 40;
  const EDGE_NODE_RADIUS = 15;
  const POD_SIZE = 8;

  // Generate a unique instance ID
  const [instanceId] = useState(() => Math.random().toString(36).substr(2, 9));

  // Cloud Core position (center)
  const cloudCore: Position = {
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2
  };

  const [edgeNodes, setEdgeNodes] = useState<EdgeNode[]>([]);
  const [dataPackets, setDataPackets] = useState<DataPacket[]>([]);
  const [pods, setPods] = useState<Pod[]>([]);
  const [animationTime, setAnimationTime] = useState(0);

  // Generate edge nodes positioned in a circle around cloud core
  const generateEdgeNodes = useCallback((): EdgeNode[] => {
    const nodes: EdgeNode[] = [];
    const radius = Math.min(CANVAS_WIDTH, CANVAS_HEIGHT) * 0.3;
    
    for (let i = 0; i < EDGE_NODE_COUNT; i++) {
      const angle = (i / EDGE_NODE_COUNT) * 2 * Math.PI;
      const node: EdgeNode = {
        id: i,
        position: {
          x: cloudCore.x + Math.cos(angle) * radius,
          y: cloudCore.y + Math.sin(angle) * radius
        },
        status: 'tilkoblet',
        lastStatusChange: Date.now()
      };
      nodes.push(node);
    }
    return nodes;
  }, [cloudCore.x, cloudCore.y, CANVAS_WIDTH, CANVAS_HEIGHT]);

  // Generate initial pods on edge nodes
  const generatePods = useCallback((nodes: EdgeNode[]): Pod[] => {
    const initialPods: Pod[] = [];
    for (let i = 0; i < 4; i++) {
      const nodeId = Math.floor(Math.random() * nodes.length);
      const node = nodes[nodeId];
      initialPods.push({
        id: i,
        position: { ...node.position },
        targetNodeId: nodeId,
        isMoving: false,
        migrationProgress: 0
      });
    }
    return initialPods;
  }, []);

  // Create data packets flowing between cloud and edge nodes
  const createDataPacket = useCallback((from: Position, to: Position, type: 'opplasting' | 'nedlasting'): DataPacket => {
    return {
      id: Math.random() * 10000,
      from: { ...from },
      to: { ...to },
      progress: 0,
      type
    };
  }, []);

  // Update node statuses randomly to simulate network instability
  const updateNodeStatuses = useCallback(() => {
    setEdgeNodes(prevNodes => {
      return prevNodes.map(node => {
        const timeSinceChange = Date.now() - node.lastStatusChange;
        
        // Change status every 3-8 seconds
        if (timeSinceChange > 3000 + Math.random() * 5000) {
          let newStatus: EdgeNode['status'];

          if (node.status === 'tilkoblet') {
            newStatus = Math.random() < 0.3 ? 'ustabil' : (Math.random() < 0.1 ? 'frakoblet' : 'tilkoblet');
          } else if (node.status === 'ustabil') {
            newStatus = Math.random() < 0.4 ? 'frakoblet' : 'tilkoblet';
          } else { // disconnected
            newStatus = Math.random() < 0.6 ? 'tilkoblet' : 'frakoblet';
          }
          
          return {
            ...node,
            status: newStatus,
            lastStatusChange: Date.now()
          };
        }
        
        return node;
      });
    });
  }, []);

  // Migrate pods from disconnected nodes
  const migratePods = useCallback(() => {
    setPods(prevPods => {
      return prevPods.map(pod => {
        const currentNode = edgeNodes.find(n => n.id === pod.targetNodeId);
        
        // If current node is disconnected and pod isn't already moving, start migration
        if (currentNode?.status === 'frakoblet' && !pod.isMoving) {
          const connectedNodes = edgeNodes.filter(n => n.status === 'tilkoblet');
          if (connectedNodes.length > 0) {
            const newTargetNode = connectedNodes[Math.floor(Math.random() * connectedNodes.length)];
            return {
              ...pod,
              isMoving: true,
              migrationProgress: 0,
              targetNodeId: newTargetNode.id
            };
          }
        }
        
        // Update migration progress
        if (pod.isMoving) {
          const newProgress = Math.min(pod.migrationProgress + 0.02, 1);
          const targetNode = edgeNodes.find(n => n.id === pod.targetNodeId);
          
          if (targetNode && newProgress < 1) {
            // Interpolate position during migration
            const startPos = pod.position;
            const endPos = targetNode.position;
            return {
              ...pod,
              migrationProgress: newProgress,
              position: {
                x: startPos.x + (endPos.x - startPos.x) * newProgress,
                y: startPos.y + (endPos.y - startPos.y) * newProgress
              }
            };
          } else if (targetNode && newProgress >= 1) {
            // Migration complete
            return {
              ...pod,
              isMoving: false,
              migrationProgress: 0,
              position: { ...targetNode.position }
            };
          }
        }
        
        return pod;
      });
    });
  }, [edgeNodes]);

  // Generate data packets periodically
  const generateDataPackets = useCallback(() => {
    const connectedNodes = edgeNodes.filter(n => n.status === 'tilkoblet');
    
    if (connectedNodes.length > 0 && Math.random() < 0.3) {
      const randomNode = connectedNodes[Math.floor(Math.random() * connectedNodes.length)];
      const isUpload = Math.random() < 0.5;
      
      const newPacket = createDataPacket(
        isUpload ? randomNode.position : cloudCore,
        isUpload ? cloudCore : randomNode.position,
        isUpload ? 'opplasting' : 'nedlasting'
      );
      
      setDataPackets(prev => [...prev, newPacket]);
    }
  }, [edgeNodes, cloudCore, createDataPacket]);

  // Update data packet positions
  const updateDataPackets = useCallback(() => {
    setDataPackets(prevPackets => {
      return prevPackets
        .map(packet => ({
          ...packet,
          progress: packet.progress + 0.015
        }))
        .filter(packet => packet.progress < 1);
    });
  }, []);

  // Initialize edge nodes and pods
  useEffect(() => {
    const nodes = generateEdgeNodes();
    const initialPods = generatePods(nodes);
    setEdgeNodes(nodes);
    setPods(initialPods);
  }, [generateEdgeNodes, generatePods]);

  // Animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationTime(prev => prev + 1);
      updateNodeStatuses();
      migratePods();
      generateDataPackets();
      updateDataPackets();
    }, 100);

    return () => clearInterval(interval);
  }, [updateNodeStatuses, migratePods, generateDataPackets, updateDataPackets]);

  // Get connection color based on node status
  const getConnectionColor = (status: EdgeNode['status']) => {
    switch (status) {
      case 'tilkoblet': return 'rgba(0, 255, 65, 0.8)';
      case 'ustabil': return 'rgba(255, 255, 0, 0.6)';
      case 'frakoblet': return 'rgba(255, 0, 0, 0.3)';
    }
  };

  // Get node color based on status
  const getNodeColor = (status: EdgeNode['status']) => {
    switch (status) {
      case 'tilkoblet': return 'rgba(0, 255, 65, 0.9)';
      case 'ustabil': return 'rgba(255, 255, 0, 0.8)';
      case 'frakoblet': return 'rgba(255, 0, 0, 0.7)';
    }
  };

  return (
    <div 
      key={instanceId} 
      style={{ 
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        pointerEvents: 'auto'
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
        {/* Background grid */}
        <defs>
          <pattern
            id={`edge-grid-pattern-${instanceId}`}
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <rect
              width="40"
              height="40"
              fill="transparent"
              stroke="rgba(255, 255, 255, 0.02)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#edge-grid-pattern-${instanceId})`} />

        {/* Connections from cloud core to edge nodes */}
        {edgeNodes.map(node => (
          <line
            key={`connection-${node.id}`}
            x1={cloudCore.x}
            y1={cloudCore.y}
            x2={node.position.x}
            y2={node.position.y}
            stroke={getConnectionColor(node.status)}
            strokeWidth={node.status === 'frakoblet' ? '1' : '2'}
            style={{
              filter: node.status === 'tilkoblet' 
                ? 'drop-shadow(0 0 3px rgba(0, 255, 65, 0.5))' 
                : undefined
            }}
          />
        ))}

        {/* Data packets */}
        {dataPackets.map(packet => {
          const currentX = packet.from.x + (packet.to.x - packet.from.x) * packet.progress;
          const currentY = packet.from.y + (packet.to.y - packet.from.y) * packet.progress;
          
          return (
            <circle
              key={`packet-${packet.id}`}
              cx={currentX}
              cy={currentY}
              r="3"
              fill={packet.type === 'opplasting' ? 'rgba(100, 150, 255, 0.8)' : 'rgba(255, 150, 100, 0.8)'}
              style={{
                filter: 'drop-shadow(0 0 4px currentColor)'
              }}
            />
          );
        })}

        {/* Cloud Core */}
        <circle
          cx={cloudCore.x}
          cy={cloudCore.y}
          r={CLOUD_RADIUS}
          fill="rgba(100, 150, 255, 0.3)"
          stroke="rgba(100, 150, 255, 1)"
          strokeWidth="3"
          style={{
            filter: 'drop-shadow(0 0 10px rgba(100, 150, 255, 0.6))'
          }}
        />
        <text
          x={cloudCore.x}
          y={cloudCore.y + 5}
          textAnchor="middle"
          fill="rgba(100, 150, 255, 1)"
          fontSize="14"
          fontFamily="monospace"
          fontWeight="bold"
        >
          CloudCore
        </text>

        {/* Edge Nodes */}
        {edgeNodes.map(node => (
          <g key={`edge-node-${node.id}`}>
            <circle
              cx={node.position.x}
              cy={node.position.y}
              r={EDGE_NODE_RADIUS}
              fill={getNodeColor(node.status)}
              stroke={getNodeColor(node.status)}
              strokeWidth="2"
              style={{
                filter: node.status === 'tilkoblet' 
                  ? 'drop-shadow(0 0 6px rgba(0, 255, 65, 0.6))' 
                  : undefined
              }}
            />
            <text
              x={node.position.x}
              y={node.position.y + 4}
              textAnchor="middle"
              fill="rgba(0, 0, 0, 0.8)"
              fontSize="10"
              fontFamily="monospace"
              fontWeight="bold"
            >
              E{node.id}
            </text>
          </g>
        ))}

        {/* Pods */}
        {pods.map(pod => (
          <rect
            key={`pod-${pod.id}`}
            x={pod.position.x - POD_SIZE/2}
            y={pod.position.y - POD_SIZE/2}
            width={POD_SIZE}
            height={POD_SIZE}
            fill={pod.isMoving ? 'rgba(255, 255, 0, 0.9)' : 'rgba(255, 255, 255, 0.8)'}
            stroke={pod.isMoving ? 'rgba(255, 255, 0, 1)' : 'rgba(255, 255, 255, 1)'}
            strokeWidth="1"
            rx="2"
            style={{
              filter: pod.isMoving 
                ? 'drop-shadow(0 0 4px rgba(255, 255, 0, 0.8))' 
                : 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.6))'
            }}
          />
        ))}

        {/* Legend */}
        <g transform="translate(20, 20)">
          <rect
            width="380"
            height="220"
            fill="rgba(0, 0, 0, 0.7)"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="1"
            rx="5"
          />
          <text x="15" y="25" fill="white" fontSize="22" fontFamily="monospace" fontWeight="bold">
            Edge Computing Nettverk
          </text>
          <text x="15" y="55" fill="rgba(100, 150, 255, 1)" fontSize="18" fontFamily="monospace">
            ● CloudCore (Datasenter)
          </text>
          <text x="15" y="80" fill="rgba(0, 255, 65, 1)" fontSize="18" fontFamily="monospace">
            ● Edge Noder (Tilkoblet)
          </text>
          <text x="15" y="105" fill="rgba(255, 255, 0, 1)" fontSize="18" fontFamily="monospace">
            ● Ustabil Tilkobling
          </text>
          <text x="15" y="130" fill="rgba(255, 0, 0, 1)" fontSize="18" fontFamily="monospace">
            ● Frakoblede Noder
          </text>
          <text x="15" y="155" fill="rgba(255, 255, 255, 1)" fontSize="18" fontFamily="monospace">
            ■ Pods (Containere)
          </text>
          <text x="15" y="185" fill="rgba(255, 255, 255, 0.7)" fontSize="14" fontFamily="monospace">
            Sanntid nettverkssimulering
          </text>
        </g>
      </svg>
    </div>
  );
};

export default EdgeComputingVisualization;