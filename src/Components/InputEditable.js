import { useCallback } from "react";
import { Handle, Position } from "reactflow";

function InputNode({ isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="input-node">
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
    </div>
  );
}

export default InputNode;
