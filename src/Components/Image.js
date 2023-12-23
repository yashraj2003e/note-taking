import { Handle, NodeResizer, Position } from "reactflow";
import image from "../GTA6-Logo-PNG.png";
import "./Image.css";
import { useEffect, useRef } from "react";
function ImageNode({ isConnectable }) {
  const nodeResizerRef = useRef(null);

  useEffect(() => {
    if (nodeResizerRef.current) {
      const width = nodeResizerRef.current.clientWidth;
      const height = nodeResizerRef.current.clientHeight;
      console.log("Width:", width, "Height:", height);
    }
  });

  return (
    <>
      <div className="image-node-div">
        <div className="image-node">
          <NodeResizer minWidth={100} minHeight={30} />
          <img alt={"gta 6"} src={image} />
        </div>
        <Handle
          type="source"
          id="in1"
          position={Position.Bottom}
          isConnectable={isConnectable}
        />
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
        />
        <Handle
          type="target"
          position={Position.Left}
          isConnectable={isConnectable}
        />
        <Handle
          type="source"
          id="in2"
          position={Position.Right}
          isConnectable={isConnectable}
        />
      </div>
    </>
  );
}

export default ImageNode;
