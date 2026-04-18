 import { Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Loader from "./Loader";

export default function ProtectedRoute({
  children,
  require = [],
  redirectTo = "/location",
}) {
  const app = useApp();

  /* 🔥 OPTIONAL: if later async state aaye */
  if (!app) {
    return <Loader fullScreen text="Checking access..." />;
  }

  /* 🔥 CHECK REQUIRED STATES */
  const missingKey = require.find((key) => !app[key]);

  if (missingKey) {
    console.warn(`Missing required state: ${missingKey}`);

    return (
      <Navigate
        to={redirectTo}
        replace
        state={{ missing: missingKey }}
      />
    );
  }

  return children;
}