 // src/main.jsx
import "leaflet/dist/leaflet.css"; // must be first
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { register } from "./serviceWorker";

/* ================= ROOT ================= */
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const root = createRoot(rootElement);

/* ================= SERVICE WORKER ================= */
// Only enable in production
if (import.meta.env.PROD) {
  register();
}

/* ================= RENDER ================= */
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);