import React, { useCallback, useRef, useState } from 'react';
import './Flow.scss';
import ReactFlow, {
  // ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  // Controls,
  // Handle,
  XYPosition,
  ReactFlowInstance,
  Edge,
  Connection,
  Node,
} from 'reactflow';
import 'reactflow/dist/style.css';
import NodePanel from '../NodePanel/NodePanel';
import CustomNode from '../CustomNode/CustomNode';
import Setting from '../Setting/Setting';
import { TFlow } from './Flow.types';


const nodeTypes = { textUpdater: CustomNode };
let id = 0;
const getId = () => `dndnode_${id++}`;
const Flow = ({setToast}:TFlow) => {
  const reactFlowWrapper = useRef(null);
  const [selectedNode, setSelectedNode] = useState<Node>();
  const [showSettigs, setShowSettings] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
 
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      }) as XYPosition;
      const newNode: Node = {
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
    _: React.MouseEvent<Element, MouseEvent>,
    node: Node
  ) => {
    setSelectedNode(node);
    setShowSettings(true);
  };
  const onTextChange = (text: string) => {
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
  };
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
        {showSettigs ? (
          <Setting
            setShowSettings={setShowSettings}
            onTextChange={onTextChange}
          />
        ) : (
          <NodePanel />
        )}
      </div>
    </div>
  );
};
export default Flow;
