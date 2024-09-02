import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';
const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Get Data from Ether' }},
  { id: '2', position: { x: 0, y: 100 }, data: { label: 'Monte Carlo Simulator' } },
  { id: '3', position: { x: 0, y: 200 }, data: { label: 'Graph' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' }, 
  { id: 'e2-3', source: '2', target: '3' }, // Connection from the second node to the third node
];

const App: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: '50vw', height: '50vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Controls />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default App;
