import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";

import "./assets/styles/globals.css";
import "./assets/styles/Home.module.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
