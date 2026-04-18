 import "leaflet/dist/leaflet.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { register } from "./serviceWorker";
import { AppProvider } from "./context/AppContext";

/* ================= ROOT ================= */
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const root = createRoot(rootElement);

/* ================= SERVICE WORKER ================= */
if (import.meta.env.PROD) {
  register();
}

/* ================= RENDER ================= */
root.render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>
);