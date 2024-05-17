import React, { useState } from 'react';
import ReactFlow from 'reactflow';

import 'reactflow/dist/style.css';
import { TEdge, TFlow } from './Flow';

const initialNodes:TFlow=[]
const initialEdges:TEdge=[]


export default function App() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
  return (
    <div style={{ width: '100%', height: 'calc(100vh - 7vh)' }}>
      <ReactFlow nodes={initialNodes} edges={initialEdges} />
    </div>
  );
}
