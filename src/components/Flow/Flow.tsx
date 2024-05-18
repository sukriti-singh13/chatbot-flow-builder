import React, { useCallback, useRef, useState } from 'react';
import './Flow.scss';
import ReactFlow, {
  // ReactFlowProvider,
  addEdge,
  // Controls,
  // Handle,
  XYPosition,
  ReactFlowInstance,
  Edge,
  Connection,
  Node,
  NodeChange,
  EdgeChange,
} from 'reactflow';
import 'reactflow/dist/style.css';
import NodePanel from '../NodePanel/NodePanel';
import CustomNode from '../CustomNode/CustomNode';
import Setting from '../Setting/Setting';
import { getSelectedNode } from '../../utils/helpers';

const nodeTypes = { textUpdater: CustomNode };
let id = 0;
const getId = () => `dndnode_${id++}`;
const Flow = ({
  nodes,
  setNodes,
  onNodesChange,
  edges,
  setEdges,
  onEdgesChange,
}: {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  onNodesChange: (changes: NodeChange[]) => void;
  edges: Edge[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  onEdgesChange: (changes: EdgeChange[]) => void;
}) => {
  const reactFlowWrapper = useRef(null);
  const [selectedNodeId, setSelectedNodeId] = useState<Node['id']>();
  const [showSettigs, setShowSettings] = useState(false);

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

      /* Convert the screen position of the drop event to the flow position
     using the reactFlowInstance's screenToFlowPosition method.*/
      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      }) as XYPosition;

      /* Create a new node with a unique id, type 'textUpdater',
     the calculated position, and  data. */
      const newNode: Node = {
        id: getId(),
        type: 'textUpdater',
        position,
        data: { label: `Message ${id}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );
  const onNodeSelection = (
    _: React.MouseEvent<Element, MouseEvent>,
    node: Node
  ) => {
    setSelectedNodeId(node.id);
    setShowSettings(true);
  };

  const selectedNode = getSelectedNode({ nodes, nodeId: selectedNodeId });

  const onTextChange = (text: string) => {
    if (!selectedNodeId) return;
    const newNodes = nodes.map((node) => {
      if (node.id === selectedNode?.id) {
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
            key={selectedNode?.id}
            selectedNodeText={selectedNode?.data.label}
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
