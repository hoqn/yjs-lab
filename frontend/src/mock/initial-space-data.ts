import { SpaceData } from "../yjs/types";

// export const initialSpaceData: SpaceData = {
//   contextId: "bello",
//   parentContextId: undefined,
//   edges: [
//     { from: "0", to: "1" },
//     { from: "0", to: "2" },
//   ],
//   nodes: [
//     { id: "0", pointX: 0, pointY: 0, type: "head", content: "Hello" },
//     { id: "1", pointX: 100, pointY: 100, type: "note", content: "World" },
//     { id: "2", pointX: 0, pointY: 100, type: "note", content: "Bello" },
//   ],
// };

export const initialSpaceData: SpaceData = {
  contextId: "bello",
  parentContextId: undefined,
  edges: {
    // "0": ["1", "2"],
    // "1": ["0"],
    // "2": ["1"], // NOTE: 이런 식으로는 데이터가 무결한지 확인하기 어려움. 관련한 대책 필요

    "0": { from: "0", to: "1" },
    "1": { from: "0", to: "2" },
  },
  nodes: {
    "0": { id: "0", pointX: 0, pointY: 0, type: "head", content: "Hello" },
    "1": { id: "1", pointX: 100, pointY: 100, type: "note", content: "World" },
    "2": { id: "2", pointX: 0, pointY: 100, type: "note", content: "Bello" },
  },
};
