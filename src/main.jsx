import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Імпортуйте BrowserRouter
import App from "./components/App/App";
// import "./index.css";
import "modern-normalize";
import { StrictMode } from "react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
