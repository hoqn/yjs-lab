import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";
import { initialSpaceData } from "../mock/initial-space-data";
import { AwarenessState, SpaceData } from "./types";

function setupYjsSpaceConnection(roomName: string, ydoc: Y.Doc) {
  // const provider = new WebsocketProvider("ws://backend:3001", roomName, ydoc);
  const provider = new WebsocketProvider("ws://localhost:3001/space", roomName, ydoc);
  return provider;
}

async function initializeYjsSpaceDoc(ydoc: Y.Doc, spaceData: SpaceData): Promise<Y.Doc> {
  const yContext = ydoc.getMap("context");

  if (!yContext.has("contextId")) {
    yContext.set("contextId", spaceData.contextId);
  }
  if (!yContext.has("parentContextId")) {
    yContext.set("parentContextId", spaceData.parentContextId);
  }

  // const yNodes = new Y.Array();
  // const yEdges = new Y.Array();

  // yNodes.push(spaceData.nodes);
  // yEdges.push(spaceData.edges);

  if (!yContext.has("nodes")) {
    const yNodes = new Y.Map();
    Object.entries(spaceData.nodes).forEach(([key, value]) => {
      yNodes.set(key, value);
    });

    yContext.set("nodes", yNodes);
  }

  if (!yContext.has("edges")) {
    const yEdges = new Y.Map();
    Object.entries(spaceData.edges).forEach(([key, value]) => {
      yEdges.set(key, value);
    });

    yContext.set("edges", yEdges);
  }

  return ydoc;
}

function initializeYjsSpaceAwarenessState(provider: Y.AbstractConnector) {
  const state: AwarenessState = {
    id: provider.awareness.clientID,
    name: "Anonymous",
    color: "#" + Math.floor(Math.random() * 0xffffff).toString(16),
    cursor: { x: 0, y: 0 },
  };

  provider.awareness.setLocalState(state);
}

// FIXME: spaceId, contextId 용어가 혼용되어 있어 수정 필요
// TODO: Offline Support
export async function setupYjsSpace(spaceId: string, _allowOffline = false) {
  // TODO: fetch하는 책임을 이 함수에 두는 것이 적절한가 - 일단 mock 데이터만 가져옴
  const ydoc = new Y.Doc();
  const provider = setupYjsSpaceConnection(spaceId, ydoc);

  await initializeYjsSpaceDoc(ydoc, initialSpaceData);

  initializeYjsSpaceAwarenessState(provider);

  return { ydoc, provider };
}

// TODO: 다른 곳에 선언
// export async function fetchInitialSpaceData() {
//   // mocking fetch initial data
//   const data = initialSpaceData;
//   await new Promise((resolve) => setTimeout(resolve, 200));
//   return data;
// }
