import { useMemo } from 'react';
import {
  getConnectedEdges,
  Handle,
  HandleProps,
  ReactFlowState,
  useNodeId,
  useStore,
} from 'reactflow';

const selector = (s: ReactFlowState) => ({
  nodeInternals: s.nodeInternals,
  edges: s.edges,
});

const CustomHandle = ({
  connectableNodes = 1,
  ...props
}: {
  className?: string;
  connectableNodes?: number;
} & HandleProps) => {
  const { nodeInternals, edges } = useStore(selector);
  const nodeId = useNodeId();

/* Determines if a node can be connected to more nodes
 - Returns false if there's no nodeId or if the node doesn't exist
 - Gets the edges connected to the node
 - Counts edges where the node is the source
 - Returns true if the current connected nodes are fewer than the allowed connectable nodes */
  const isHandleConnectable = useMemo(() => {
    if (!nodeId) return false;
    const node = nodeInternals.get(nodeId);
    if (!node) return false;
    const connectedEdges = getConnectedEdges([node], edges);
    const currentConnectedNodes = connectedEdges.filter(
      (edge) => edge.source === nodeId 
    ).length;
    return currentConnectedNodes < connectableNodes;
  }, [nodeInternals, edges, nodeId, connectableNodes]);

  return <Handle {...props} isConnectable={isHandleConnectable} />;
};

export default CustomHandle;
