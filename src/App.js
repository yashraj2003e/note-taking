import {
  ReactFlow,
  addEdge,
  Controls,
  Background,
  MiniMap,
  MarkerType,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import { useState, useCallback, useEffect } from "react";
import { applyEdgeChanges, applyNodeChanges } from "reactflow";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";
import { ColorPicker, useColor } from "react-color-palette";
import TextUpdaterNode from "./Components/TextUpdaterNode.js";
import "react-color-palette/css";
import "./Components/text-updater-node.css";
import HeadingNode from "./Components/Heading.js";
import "./Components/heading-node.css";
import "./Components/inputEditable.css";
import InputNode from "./Components/InputEditable.js";
import DefaultNode from "./Components/DefaultNode.js";
import OutputNode from "./Components/OutputNode.js";
import ImageNode from "./Components/Image.js";
import CustomNode from "./CustomNode.js";
import FloatingEdge from "./FloatingEdge.js";
import CustomConnectionLine from "./CustomConnectionLine.js";
import "./Components/OutputNode.css";
import "./style.css";

const initialNodes = [
  {
    id: "A",
    type: "group",
    position: { x: 0, y: 0 },
    style: {
      width: 500,
      height: 300,
      backgroundColor: "rgba(240,240,240,0.25)",
    },
  },
];

const edgeTypes = {
  floating: FloatingEdge,
};

const initialEdges = [
  {
    id: "edge-1",
    source: "node-1",
    target: "node-2",
    sourceHandle: "b",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#FF0072",
    },
    style: {
      strokeWidth: 2,
      stroke: "#FF0072",
    },
    animated: true,
  },
  {
    id: "edge-2",
    source: "node-1",
    target: "node-3",
    sourceHandle: "a",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#FF0072",
    },
    style: {
      strokeWidth: 2,
      stroke: "#FF0072",
    },
    animated: true,
  },
];

const nodeTypes = {
  custom: CustomNode,
  TextUpdater: TextUpdaterNode,
  HeadingNode: HeadingNode,
  InputNode: InputNode,
  DefaultNode: DefaultNode,
  OutputNode: OutputNode,
  ImageNode: ImageNode,
};

const connectionLineStyle = {
  strokeWidth: 3,
  stroke: "black",
};

function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [bgColor, setBgColor] = useColor("Black");
  const [dotColor, setDotsColor] = useColor("Black");
  const [isPalleteVisibile, setIsPaletteVisible] = useState(false);
  const [isDotPalleteVisibile, setIsDotPaletteVisible] = useState(false);
  const [sideBarVisibility, setSideBarVisibility] = useState(false);
  const [reactFlowInstance, setReactFlowInstance] = useState();

  useEffect(() => {
    document.title = "Notes";
    return () => (document.title = "React");
  }, []);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => {
      console.log(changes);
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges]
  );

  const onConnect = useCallback(
    (params) => {
      params = {
        ...params,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: "#FF0072",
        },
        style: {
          strokeWidth: 2,
          stroke: "#FF0072",
        },
        animated: true,
      };
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const getId = () => crypto.randomUUID();

  const onInit = (rfi) => setReactFlowInstance(rfi);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      let val = "";
      if (event.target.classList.contains("react-flow__node-group")) {
        val = event.target.attributes[2].nodeValue;
      } else {
        console.log(0);
      }

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      let newNode = "";
      let xx = 0;
      let yy = 0;
      if (val !== "") {
        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });
        const ff1 = nodes.filter((node) => (node.id === "A" ? node : null));
        console.log(ff1[0].positionAbsolute);
        const ff = ff1[0].position;
        xx = ff.x;
        yy = ff.y;
        console.log(ff);
        newNode = {
          id: getId(),
          type,
          position: { x: xx, y: yy },
          parentNode: val,
          extent: "parent",
          data: { label: `${type} node` },
        };
        console.log(newNode);
      } else {
        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });
        newNode = {
          id: getId(),
          type,
          position,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: "#FF0072",
          },
          style: {
            strokeWidth: 2,
            stroke: "#FF0072",
          },
          data: { label: `${type} node` },
        };
      }

      setNodes((nds) => nds.concat(newNode));
    },
    [nodes, reactFlowInstance]
  );

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const onConnectEnd = useCallback((event) => {
    // console.log(event.target.attributes[2].nodeValue);
  }, []);

  return (
    <ReactFlowProvider>
      <div
        style={{
          height: "100%",
          width: sideBarVisibility ? "100vw" : "100vw",
          background: bgColor.hex,
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onNodesChange={onNodesChange}
          nodeTypes={nodeTypes}
          // attributionPosition="top-right"
          onConnectEnd={onConnectEnd}
          edgeTypes={edgeTypes}
          connectionLineStyle={connectionLineStyle}
          onInit={onInit}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          connectionLineComponent={CustomConnectionLine}
          fitView
        >
          <Background
            style={{ backgroundColor: bgColor.hex }}
            color={dotColor.hex}
            variant="dots"
          />
          <Controls />
          <MiniMap
            style={{ marginRight: sideBarVisibility ? "19vw" : "1vw" }}
          />
        </ReactFlow>
      </div>

      <div className="side-bar">
        {!sideBarVisibility ? (
          <FaChevronCircleLeft
            className="show-button"
            onClick={() => setSideBarVisibility((value) => !value)}
          />
        ) : (
          <div className="side-bar-visible">
            <FaChevronCircleRight
              className="show-button hide-button"
              onClick={() => setSideBarVisibility((value) => !value)}
              style={{ color: "wheat" }}
            />
            <div className="main-elements">
              <h3 onClick={() => setIsPaletteVisible((val) => !val)}>
                {isPalleteVisibile ? (
                  <SlArrowDown
                    size={"1rem"}
                    style={{ marginRight: "0.5rem" }}
                  />
                ) : (
                  <SlArrowRight
                    size={"1rem"}
                    style={{ marginRight: "0.2rem" }}
                  />
                )}
                Background Color
              </h3>
              {isPalleteVisibile && (
                <ColorPicker
                  color={bgColor}
                  onChange={setBgColor}
                  hideAlpha={true}
                />
              )}
              <h3 onClick={() => setIsDotPaletteVisible((val) => !val)}>
                {isDotPalleteVisibile ? (
                  <SlArrowDown
                    size={"1rem"}
                    style={{ marginRight: "0.5rem" }}
                  />
                ) : (
                  <SlArrowRight
                    size={"1rem"}
                    style={{ marginRight: "0.2rem" }}
                  />
                )}
                Dots Color
              </h3>
              {isDotPalleteVisibile && (
                <ColorPicker
                  color={dotColor}
                  onChange={setDotsColor}
                  hideAlpha={true}
                />
              )}
              <button
                onDragStart={(event) => onDragStart(event, "custom")}
                draggable
              >
                Add a Group Node +
              </button>
              <button
                onDragStart={(event) => onDragStart(event, "HeadingNode")}
                draggable
              >
                Add a Heading Node +
              </button>
              <button
                onDragStart={(event) => onDragStart(event, "DefaultNode")}
                draggable
              >
                Add a Default Node +
              </button>
              <button
                onDragStart={(event) => onDragStart(event, "InputNode")}
                draggable
              >
                Add an Input Node +
              </button>
              <button
                onDragStart={(event) => onDragStart(event, "OutputNode")}
                draggable
              >
                Add an Output Node +
              </button>
              <button
                onDragStart={(event) => onDragStart(event, "TextUpdater")}
                draggable
              >
                Add an Large Text Node +
              </button>
              <button
                onDragStart={(event) => onDragStart(event, "ImageNode")}
                draggable
              >
                Add an Image +
              </button>
            </div>
          </div>
        )}
      </div>
    </ReactFlowProvider>
  );
}

export default App;
