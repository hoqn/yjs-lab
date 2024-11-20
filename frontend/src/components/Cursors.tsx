import { useEffect, useState } from "react";
import { useYjsAwareness } from "../hooks/useYjsAwareness";
import { Cursor } from "./Cursor";
import { AwarenessState } from "../yjs/types";

export default function Cursors() {
  const awareness = useYjsAwareness();

  // -> compare 함수를 어떻게 작성하지..? 복잡하게 비교해야 할 바에 그냥 일정 주기로 갱신하는 게 낫지 않을까...

  // const [userCursors, setUserCursors] = useState<{ userId: string; x: number; y: number }[]>([]);

  // useEffect(() => {
  //   setInterval(() => {
  //     if (!users) {
  //       return;
  //     }

  //     const userCursors = [...users].map(([key, { user }]) => ({
  //       userId: key.toString(),
  //       x: user.cursor.x,
  //       y: user.cursor.y,
  //     }));
  //     setUserCursors(userCursors);
  //   }, 200);
  // }, []);

  const [states, setStates] = useState<AwarenessState[]>([]);

  useEffect(() => {
    if (!awareness) {
      return;
    }

    const updateUsers = () => {
      const newStates = [...awareness.getStates().values()] as AwarenessState[];
      setStates(newStates);
    };

    awareness.on("change", updateUsers);
    return () => awareness.off("change", updateUsers);
  }, [awareness]);

  console.log(states);

  return (
    <div>
      {states.map(({ id, color, cursor }) => (
        <Cursor key={id} x={cursor.x} y={cursor.y} color={color} />
      ))}
    </div>
  );
}
