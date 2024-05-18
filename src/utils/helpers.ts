import { Edge, Node } from 'reactflow';

/**
 * Checks if a flow is valid based on the provided nodes and edges.
 * A flow is considered valid if it meets the following criteria:
 * - It has at least 2 nodes.
 * - It has at least 1 edge.
 * - There has to be only node without any target edge.
 *
 * @param nodes - An array of nodes in the flow.
 * @param edges - An array of edges in the flow.
 * @returns A boolean indicating whether the flow is valid or not.
 */
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

  if (emptyTargetHandles !== 1) {
    return false;
  }

  return true;
};

export const getSelectedNode = ({
  nodes,
  nodeId,
}: {
  nodes: Node[];
  nodeId: string | undefined;
}): Node | undefined => {
  if (!nodeId) {
    return undefined;
  }
  return nodes.find((node) => node.id === nodeId);
};
