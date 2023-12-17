import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import "./defaultNode.css";

function DefaultNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="default-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="inputs">
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
        id="df1"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default DefaultNode;
