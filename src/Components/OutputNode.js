import { useCallback } from "react";
import { Handle, Position } from "reactflow";

const handleStyle = { left: 10 };
const handleStyle1 = { right: 100 };

function OutputNode({ isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="input-node">
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
        id="on1"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default OutputNode;
