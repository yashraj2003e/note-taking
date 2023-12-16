import ReactFlow, { Controls, Background, addEdge, MiniMap } from "reactflow";
import "reactflow/dist/style.css";
import { useState, useCallback, useEffect } from "react";
import { applyEdgeChanges, applyNodeChanges } from "reactflow";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";
import { ColorPicker, useColor } from "react-color-palette";
import TextUpdaterNode from "./TextUpdaterNode.js";
import "react-color-palette/css";
import "./text-updater-node.css";
import HeadingNode from "./Heading.js";
import "./heading-node.css";

const initialNodes = [
  {
    id: "A",
    type: "group",
    data: { label: null },
    position: { x: 0, y: 0 },
    style: {
      width: 370,
      height: 240,
      backgroundColor: "rgba(240,240,240,0.25)",
    },
  },
  {
    id: "node-1",
    type: "textUpdater",
    position: { x: 0, y: 0 },
    data: { value: 123 },
    parentNode: "A",
    extent: "parent",
  },
  {
    id: "node-2",
    type: "output",
    targetPosition: "top",
    position: { x: 0, y: 200 },
    data: { label: "node 2" },
    parentNode: "A",
    extent: "parent",
  },
  {
    id: "node-3",
    type: "output",
    targetPosition: "top",
    position: { x: 200, y: 200 },
    data: { label: "node 3" },
    parentNode: "A",
    extent: "parent",
  },
  {
    id: "node-4",
    targetPosition: "top",
    position: { x: 300, y: 300 },
    data: { label: "node 4" },
  },
  {
    id: "node-5",
    type: "headingNode",
    position: { x: 300, y: 300 },
    data: { value: 123 },
  },
  {
    id: "node-6",
    type: "headingNode",
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

const nodeTypes = { textUpdater: TextUpdaterNode, headingNode: HeadingNode };

function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [bgColor, setBgColor] = useColor("Black");
  const [dotColor, setDotsColor] = useColor("Black");
  const [isPalleteVisibile, setIsPaletteVisible] = useState(false);
  const [isDotPalleteVisibile, setIsDotPaletteVisible] = useState(false);
  const [sideBarVisibility, setSideBarVisibility] = useState(false);

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

  return (
    <>
      <div
        style={{ height: "100%", width: sideBarVisibility ? "100vw" : "100vw" }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onNodesChange={onNodesChange}
          nodeTypes={nodeTypes}
          attributionPosition="top-right"
          onConnect={onConnect}
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
                onClick={(event) => {
                  setNodes((nodes) => [
                    ...nodes,
                    {
                      id: crypto.randomUUID().toString(),
                      type: "custom",
                      data: { label: "Worldaaa" },
                      position: {
                        x: 0,
                        y: 0,
                      },
                    },
                  ]);
                  console.log(event.clientX);
                  console.log(event.clientY);
                }}
              >
                Add a Node +
              </button>
              <button
                onClick={() => {
                  setNodes((nodes) => [
                    ...nodes,
                    {
                      id: crypto.randomUUID().toString(),
                      type: "headingNode",
                      position: { x: 0, y: 0 },
                    },
                  ]);
                }}
              >
                Add Heading +
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
