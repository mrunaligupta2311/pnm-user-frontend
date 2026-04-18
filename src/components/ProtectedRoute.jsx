 // src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function ProtectedRoute({ children, require = [] }) {
  const app = useApp();

  /* 🔥 CHECK REQUIRED STATES */
  for (let key of require) {
    if (!app[key]) {
      return <Navigate to="/location" replace />;
    }
  }

  return children;
}