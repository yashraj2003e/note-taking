import { useCallback } from "react";
import { Handle, Position } from "reactflow";

const handleStyle = { left: 10 };
const handleStyle1 = { right: 100 };

function TextUpdaterNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="inputs">
        <textarea
          id="text"
          name="text"
          onChange={onChange}
          className="nodrag"
        />
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="c"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default TextUpdaterNode;
