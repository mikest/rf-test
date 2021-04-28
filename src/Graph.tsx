import React, { useState } from "react";
import ReactFlow, {
  removeElements,
  addEdge,
  Controls,
  Background,
  Elements,
} from "react-flow-renderer";
import CustomNode from "./CustomNode";

import { initialElements } from "./elements";

const NodeClassTypes = {
  default: CustomNode,
};

const onLoad = (reactFlowInstance: any) => {
  console.log("flow loaded:", reactFlowInstance);
  reactFlowInstance.fitView();
};

const Graph = () => {
  const [elements, setElements] = useState(initialElements());
  const onElementsRemove = (elementsToRemove: Elements<any>) =>
    setElements(
      (els: Elements<any>): Elements<any> =>
        removeElements(elementsToRemove, els)
    );
  const onConnect = (params: any) =>
    setElements((els: Elements<any>): Elements<any> => addEdge(params, els));

  return (
    <ReactFlow
      elements={elements}
      onElementsRemove={onElementsRemove}
      onConnect={onConnect}
      onLoad={onLoad}
      nodeTypes={NodeClassTypes}
      snapToGrid={true}
      snapGrid={[15, 15]}
      style={{ width: "100%", height: 800 }}
    >
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};

export default Graph;
