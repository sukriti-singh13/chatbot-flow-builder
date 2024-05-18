import React, { useCallback, useRef, useState } from 'react';
import './Flow.scss';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Handle,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { TEdge, TFlow } from './Flow.types';
import NodePanel from '../NodePanel/NodePanel';
import CustomNode from '../CustomNode/CustomNode';
import Setting from '../Setting/Setting';

const initialNodes: TFlow = [];
const initialEdges: TEdge = [];
const nodeTypes = { textUpdater: CustomNode };
let id = 0;
const getId = () => `dndnode_${id++}`;
const Flow = () => {
  const reactFlowWrapper = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [showSettigs, setShowSettings] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type: 'textUpdater',
        position,
        data: { label: `Message ${id} ` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );
  // const onEdgesChange = useCallback(
  //   (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
  //   [],
  // );
  const onNodeSelection = (
    event: React.MouseEvent<Element, MouseEvent>,
    node
  ) => {
    setSelectedNode(node);
    setShowSettings(true);
  };
const onTextChange = (text:string) => {
  if (!selectedNode) return;
    const newNodes = nodes.map((node) => {
      if (node.id === selectedNode.id) {
        return {
          ...node,
          data: {
            ...node.data,
            label: text,
          },
        };
      }
      return node;
    });
    setNodes(newNodes);

}
  return (
    <div className='main_layout'>
      <div className='left_panel' ref={reactFlowWrapper}>
        <ReactFlow
          onNodeClick={(event, node) => onNodeSelection(event, node)}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
        />
      </div>
      <div className='right_panel'>
        {showSettigs ? <Setting setShowSettings={setShowSettings} onTextChange={onTextChange}/> : <NodePanel />}
      </div>
    </div>
  );
};
export default Flow;
