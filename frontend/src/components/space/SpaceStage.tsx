import { Fragment, useEffect, useState } from "react";
import * as Y from "yjs";
import { useYShared } from "../../hooks/useYShared";
import { Edge, Node, SpaceData } from "../../yjs/types";
import { setupYjsSpace } from "../../yjs/y-space";

type SpaceStageProps = {
  spaceId: string;
};

export function SpaceStage({ spaceId }: SpaceStageProps) {
  const [ydoc, setYDoc] = useState<Y.Doc | null>(null);
  const [provider, setProvider] = useState<Y.AbstractConnector | null>(null);

  const [yContext, setYContext] = useState<Y.Map<any> | null>(null);

  // TODO 코드 개선
  const yNodes = yContext?.get("nodes") as Y.Map<Node> | undefined;
  const yEdges = yContext?.get("edges") as Y.Map<Edge> | undefined;
  const nodes = useYShared(yNodes) as SpaceData["nodes"] | undefined;
  const edges = useYShared(yEdges) as SpaceData["edges"] | undefined;

  useEffect(() => {
    async function initializeYjsSpaceDoc() {
      const { ydoc, provider } = await setupYjsSpace(spaceId);

      setYDoc(ydoc);
      setProvider(provider);
    }

    initializeYjsSpaceDoc();

    return () => {
      setYDoc(null);
      setProvider(null);
      setYContext(null);
      provider?.destroy();
    };
  }, [spaceId]);

  useEffect(() => {
    if (!ydoc || !provider) {
      return;
    }

    const handleOnSync = (_isSynced: boolean) => {
      const yContext = ydoc.getMap("context");
      setYContext(yContext);
      console.log("sync");
    };
    provider.on("sync", handleOnSync);

    return () => {
      provider.off("sync", handleOnSync);
    };
  }, [ydoc, provider]);

  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "#EAEAEA", position: "relative" }}>
      <button
        onClick={() => {
          ydoc?.transact(() => {
            // TODO - uuid 라이브러리 사용하도록 수정
            const uid = Math.random().toString(36).slice(2, 8);
            yNodes?.set(uid, {
              id: uid,
              pointX: Math.random() * 400 - 200,
              pointY: Math.random() * 400 - 200,
              type: "note",
            });
          });
        }}
      >
        Spawn
      </button>
      <svg viewBox="-500 -500 1000 1000">
        {/* Edges */}
        {nodes &&
          edges &&
          Object.entries(edges).map(([edgeId, { from, to }]) => {
            const fromNode = nodes[from];
            const toNode = nodes[to];

            return (
              <line
                key={edgeId}
                x1={fromNode.pointX}
                y1={fromNode.pointY}
                x2={toNode.pointX}
                y2={toNode.pointY}
                stroke="royalblue"
                strokeWidth={2}
              />
            );
          })}
        {/* Nodes */}
        {nodes &&
          Object.values(nodes).map((node) => (
            <Fragment key={node.id}>
              <circle
                key={node.id}
                cx={node.pointX}
                cy={node.pointY}
                r={32}
                fill="royalblue"
                onClick={() => {
                  yNodes?.delete(node.id);
                }}
              />
              <text x={node.pointX} y={node.pointY} fill="white" textAnchor="middle" dominantBaseline="central">
                {node.content}
              </text>
            </Fragment>
          ))}
      </svg>
    </div>
  );
}
