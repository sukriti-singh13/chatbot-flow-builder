type Node = {
  id: string;
  data: Record<string, string>;
  position: {
    x: number;
    y: number;
  };
  type: string;
};
type Edge = {
  id: string;
  source: string;
  target: string;
};
export type TFlow = Node[];
export type TEdge = Edge[];
