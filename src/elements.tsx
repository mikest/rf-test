import { Elements } from "react-flow-renderer";

const elements: Elements<any> = [
  {
    id: "1",
    type: "input",
    data: { label: "One Node" },
    position: { x: 250, y: 0 },
  },
  {
    id: "2",
    data: { label: "Two Node", inputs: ["one", "two", "three"] },
    position: { x: 100, y: 100 },
  },
  {
    id: "3",
    data: { label: "Three Node" },
    position: { x: 400, y: 100 },
  },
  {
    id: "4",
    position: { x: 250, y: 200 },
    data: { label: "Four Node" },
  },
  {
    id: "5",
    data: { label: "Five  Node", inputs: ["one", "two", "three"] },
    position: { x: 250, y: 325 },
  },
  {
    id: "6",
    type: "output",
    data: { label: "Six Node" },
    position: { x: 100, y: 480 },
  },
  {
    id: "7",
    type: "output",
    data: { label: "Seven Node" },
    position: { x: 400, y: 450 },
  },
  { id: "e1-2", source: "1", target: "2" },
  { id: "e1-3", source: "1", target: "3" },
  { id: "e3-4", source: "3", target: "4" },
  { id: "e4-5", source: "4", target: "5" },
  { id: "e5-6", source: "5", target: "6" },
  { id: "e5-7", source: "5", target: "7" },
];

// which direction is data flowing?
// these are referenced from the perspective of NodeLayoutDirection.Vertical
// downwards becomes rightwards when using a horizontal layout.
export enum AnchorDirection {
  Downwards = "downwards",
  Upwards = "upwards",
  Rightwards = "rightwards",
  Leftwards = "leftwards",
}

export function edgeAndNodeCombinations(
  sourceName: string,
  direction: AnchorDirection,
  cx: number,
  cy: number
): Elements<any> {
  const off = 75;
  const label = sourceName[0];
  const elements: Elements<any> = [
    {
      id: sourceName,
      data: { anchorDirection: direction, outputs: ["1", "2", "3", "4"] },
      position: { x: cx - off, y: cy },
    },
    {
      id: `${label}left`,
      data: { anchorDirection: AnchorDirection.Leftwards },
      position: { x: cx - off * 2, y: cy + off },
    },
    {
      id: `${label}right`,
      data: { anchorDirection: AnchorDirection.Rightwards },
      position: { x: cx + off * 2, y: cy - off },
    },
    {
      id: `${label}up`,
      data: { anchorDirection: AnchorDirection.Upwards },
      position: { x: cx - off, y: cy - off * 2 },
    },
    {
      id: `${label}down`,
      data: { anchorDirection: AnchorDirection.Downwards },
      position: { x: cx + off, y: cy + off * 2 },
    },
    {
      id: `${label}1`,
      source: sourceName,
      sourceHandle: "1",
      target: `${label}left`,
    },
    {
      id: `${label}2`,
      source: sourceName,
      sourceHandle: "2",
      target: `${label}right`,
    },
    {
      id: `${label}3`,
      source: sourceName,
      sourceHandle: "3",
      target: `${label}up`,
    },
    {
      id: `${label}4`,
      source: sourceName,
      sourceHandle: "4",
      target: `${label}down`,
    },
  ];

  return elements;
}

export function initialElements(): Elements<any> {
  // create the combinations of all possible edge connections
  const allEdges = ([] as Elements<any>).concat(
    edgeAndNodeCombinations("leftwards", AnchorDirection.Leftwards, 1000, 100),
    edgeAndNodeCombinations(
      "rightwards",
      AnchorDirection.Rightwards,
      1500,
      100
    ),
    edgeAndNodeCombinations("upwards", AnchorDirection.Upwards, 1000, 500),
    edgeAndNodeCombinations("downwards", AnchorDirection.Downwards, 1500, 500)
  );

  return allEdges;
}

export default elements;
