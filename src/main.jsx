import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import "./styles/media.css"

import "bootstrap/dist/css/bootstrap.min.css";
import AppRouter from "./routes/AppRouter.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
