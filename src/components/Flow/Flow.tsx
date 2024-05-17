import React, { useState } from 'react';
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';
import { TEdge, TFlow } from './Flow.types';

const initialNodes: TFlow = [];
const initialEdges: TEdge = [];

const Flow=()=> {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  return (
    <div style={{ width: '100%', height: 'calc(100vh - 7vh)' }}>
      <ReactFlow nodes={initialNodes} edges={initialEdges} />
    </div>
  );
}
export default Flow;
