import { memo } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="min-h-screen">
      <AppRoutes />
    </div>
  );
}

export default memo(App);
