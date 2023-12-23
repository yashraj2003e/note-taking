import { useCallback } from "react";
import { Handle, Position } from "reactflow";

function OutputNode({ isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="output-node1">
      <div className="outputs1">
        <input
          id="text"
          name="text"
          onChange={onChange}
          className="nodrag"
          placeholder="Edit this box"
        />
      </div>
      <Handle
        type="source"
        id="on1"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default OutputNode;
