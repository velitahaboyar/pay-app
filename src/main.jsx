import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/bootstrap-5.3.3-minified.css"
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import "bootstrap-icons/font/bootstrap-icons.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
