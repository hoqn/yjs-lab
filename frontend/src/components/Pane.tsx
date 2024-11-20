import { useCallback } from "react";
import { useYjsAwareness } from "../hooks/useYjsAwareness";
import Cursors from "./Cursors";

export function Pane({ children }: { children?: React.ReactNode }) {
  const awareness = useYjsAwareness();

  // 현재 커서 위치
  const handlePointerMove: React.PointerEventHandler = useCallback(
    (e) => {
      awareness?.setLocalStateField("cursor", {
        x: e.clientX,
        y: e.clientY,
      });
    },
    [awareness]
  );

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }} onPointerMove={handlePointerMove}>
      <div>{children}</div>
      <Cursors />
    </div>
  );
}
