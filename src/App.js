import { ReactFlow, addEdge, Controls, Background, MiniMap } from "reactflow";
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
const initialNodes = [
  {
    id: "A",
    type: "group",
    data: { label: null },
    position: { x: 0, y: 0 },
    style: {
      width: 500,
      height: 300,
      backgroundColor: "rgba(240,240,240,0.25)",
    },
  },
  {
    id: "node-1",
    type: "TextUpdater",
    position: { x: 0, y: 0 },
    data: { value: 123 },
    parentNode: "A",
    extent: "parent",
  },
  {
    id: "node-2",
    type: "DefaultNode",
    targetPosition: "top",
    position: { x: 0, y: 200 },
    data: { label: "node 2" },
    parentNode: "A",
    extent: "parent",
  },
  {
    id: "node-3",
    type: "InputNode",
    targetPosition: "top",
    position: { x: 200, y: 200 },
    data: { label: "node 3" },
    parentNode: "A",
    extent: "parent",
  },
  {
    id: "node-4",
    type: "DefaultNode",
    targetPosition: "top",
    position: { x: 300, y: 300 },
    data: { label: "node 4" },
  },
  {
    id: "node-5",
    type: "HeadingNode",
    position: { x: 300, y: 300 },
    data: { value: 123 },
  },
  {
    id: "node-6",
    type: "HeadingNode",
    position: { x: 300, y: 300 },
    data: { value: 123 },
  },
];

const initialEdges = [
  {
    id: "edge-1",
    source: "node-1",
    target: "node-2",
    sourceHandle: "b",
    animated: true,
  },
  {
    id: "edge-2",
    source: "node-1",
    target: "node-3",
    sourceHandle: "a",
    animated: true,
  },
];

const nodeTypes = {
  TextUpdater: TextUpdaterNode,
  HeadingNode: HeadingNode,
  InputNode: InputNode,
  DefaultNode: DefaultNode,
  OutputNode: OutputNode,
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
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const getId = () => crypto.randomUUID();

  const onInit = (rfi) => setReactFlowInstance(rfi);

  const onDrop = async (event) => {
    event.preventDefault();

    if (reactFlowInstance) {
      const type = event.dataTransfer.getData("application/reactflow");
      const position2 = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      let newNode;
      if (type === "group") {
        newNode = {
          id: getId(),
          type,
          position: position2,
          data: { label: `${type} node` },
          style: {
            width: 500,
            height: 300,
            backgroundColor: "rgba(240,240,240,0.25)",
          },
        };
      } else {
        let flag = false;
        const isDroppedOnGroup = nodes.filter((node) => {
          if (node.type === "group") {
            const xVal =
              node.position.x < 0
                ? 500 - Math.abs(node.position.x)
                : node.position.x;
            const yVal =
              node.position.y < 0
                ? 300 - Math.abs(node.position.y)
                : node.position.y;

            console.log(
              `position.x ${position2.x}, xVal: ${xVal}, position.y: ${position2.y}, yVal: ${yVal}, node.position.x: ${node.position.x}, node.position.y: ${node.position.y}`
            );
            let f1 = false;
            let f2 = false;
            if (node.position.x < 0) {
              if (
                position2.x > node.position.x &&
                position2.x < node.position.x + 500
              ) {
                f1 = true;
              }
            }
            if (node.position.y < 0) {
              if (
                position2.y > node.position.y &&
                position2.y < node.position.y + 300
              ) {
                f2 = true;
              }
            }

            console.log(f1, " ", f2);

            if (f1 && f2) {
              flag = true;
              return node.id;
            }

            if (
              position2.x > xVal &&
              position2.x <
                (xVal < 0 ? node.position.x : node.position.x + 500) &&
              position2.y > yVal &&
              position2.y < (yVal < 0 ? node.position.y : node.position.y + 300)
            ) {
              console.log(
                position2.y > yVal &&
                  position2.y <
                    (yVal < 0 ? node.position.y : node.position.y + 500)
              );

              flag = true;
              return node.id;
            }
            return null;
          } else {
            return null;
          }
        });
        console.log(isDroppedOnGroup);

        if (flag) {
          console.log(position2);
          const position1 = {
            x: isDroppedOnGroup[0].position.x,
            y: isDroppedOnGroup[0].position.y,
          };
          console.log(position1);
          console.log(isDroppedOnGroup[0].position);
          newNode = {
            id: getId(),
            type,
            position: position1,
            data: { label: `${type} node` },
            parentNode: "A",
            extent: "parent",
          };
          console.log(newNode);
        } else {
          newNode = {
            id: getId(),
            type,
            position: position2,
            data: { label: `${type} node` },
          };
        }
      }

      setNodes((nds) => nds.concat(newNode));
    }
  };

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <>
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
          onInit={onInit}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
        >
          <Background
            style={{ backgroundColor: bgColor.hex }}
            color={dotColor.hex}
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
                onDragStart={(event) => onDragStart(event, "group")}
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
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
