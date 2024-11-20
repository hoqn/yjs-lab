import * as Y from "yjs";

/*
Y.doc {
  "context": Y.Map  {
    "SpaceId": string
    "parentContextId": string
    "nodes": Y.Array [
      object { pointX, pointY, id, type },
      object { pointX, pointY, id, type },
      ...
    ]
    "edges": Y.Array [
      object { from: uuid, to: uuid },
      object { from: uuid, to: uuid },
      ...
    ]
  }
}
*/

export type Node = {
  id: string;
  pointX: number;
  pointY: number;
  type: "head" | "note" | "url" | "image" | "subspace";

  // ?
  content?: string;
};

export type Edge = {
  from: Node["id"];
  to: Node["id"];
};

// export type SharedSpaceData = /* Y.Map */ {
//   contextId: string;
//   parentContextId?: string;

//   edges: Y.Array<Edge>; // -> JSON.stringify([......]): text
//   nodes: Y.Array<Node>;

//   // edges: Y.Map<Y.Array<Node["id"]>>; // -> 엣지를 어떻게 관리하지?
//   // // #1. <edgeId, { from, to }> => 이런 경우, Node에서 edges를 다뤄야 할 듯?
//   // // MEMO #2. <from, [ to1, to2, ... ]>, <to, [ from1, from2, ... ]> => 우선 Edge의 id는 도입되지 않았으므로 이 방법으로 접근

//   nodes: Y.Map<Node>;
// };

// honeyflow.life/space/{uuid} -> BE  { uuid, PK는 snowflake인 레코드를 조회해서 } ->

// 데이터베이스에 저장되는 형태
// Node { PK id(snowflake), "urlPath"(unique, indexing) }

[{}, { id: "4123" }, {}];

// shared type -> websocket

// ===

export type YSpaceData = {
  contextId: string;
  parentContextId?: string;
  edges: Y.Map<Edge>;
  nodes: Y.Map<Node>;
};

export type SpaceData = {
  contextId: string;
  parentContextId?: string;
  edges: Record<string, Edge>; // <edgeId, {}>
  nodes: Record<Node["id"], Node>;
};

// ===

export type AwarenessState = {
  id: number;
  name: string;
  color: string;
  cursor: { x: number; y: number };
};
