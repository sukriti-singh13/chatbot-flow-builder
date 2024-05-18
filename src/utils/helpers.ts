import { Edge, Node } from 'reactflow';

export const isFlowValid = (nodes: Node[], edges: Edge[]): boolean => {
  const nodesLength = nodes.length;
  if (nodesLength < 2) return false;

  const edgesLength = edges.length;
  if (edgesLength < 1) return false;

  let emptyTargetHandles = 0;

  nodes.forEach((node) => {
    const targetHandle = edges.filter((edge) => edge.target === node.id);
    if (targetHandle.length === 0) {
      emptyTargetHandles++;
    }
  });

  if (emptyTargetHandles > 1) {
    return false;
  }

  return true;
};
