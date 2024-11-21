import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// 80 -> API 요청을 보내면 3001 socket 연결을 해요
// 그리고 여기서 Y.Doc을 초기화해서 client로 보내요
// 3000
// 3001

createRoot(document.getElementById("root")!).render(
  <>
    <App />
  </>
);
