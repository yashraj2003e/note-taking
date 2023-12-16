import { useCallback } from "react";
import { Handle, Position } from "reactflow";

const handleStyle = { left: 10 };
const handleStyle1 = { right: 100 };

function HeadingNode({ data, isConnectable }) {
  return (
    <div className="heading-node">
      <div className="inputs">
        <h1>
          <i># This is Yashraj</i>
        </h1>
      </div>
    </div>
  );
}

export default HeadingNode;
