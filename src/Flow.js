import ReactFlow, { Controls, Background } from "reactflow";

function Flow() {
  return (
    <div style={{ height: "100%" }}>
      <ReactFlow>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
