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
