 import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { AppProvider } from "./context/AppContext";
import ProtectedRoute from "./components/ProtectedRoute";

/* PAGES */
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Location from "./pages/Location";
import Vehicle from "./pages/Vehicle";
import PunctureDetails from "./pages/PunctureDetails";
import Mechanics from "./pages/Mechanics";
import Cost from "./pages/Cost";
import Requesting from "./pages/Requesting";
import Tracking from "./pages/Tracking";
import Complete from "./pages/Complete";

import History from "./pages/History";
import Profile from "./pages/Profile";
import Wallet from "./pages/Wallet";
import Settings from "./pages/Settings";
import Support from "./pages/Support";

export default function App() {
  /* PWA */
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      window.deferredPrompt = e;
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  return (
    <AppProvider>
      <Router>
        <Routes>

          {/* AUTH */}
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* FLOW */}
          <Route path="/location" element={<Location />} />

          <Route
            path="/vehicle"
            element={
              <ProtectedRoute require={["location"]}>
                <Vehicle />
              </ProtectedRoute>
            }
          />

          <Route
            path="/puncture"
            element={
              <ProtectedRoute require={["vehicle"]}>
                <PunctureDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mechanics"
            element={
              <ProtectedRoute require={["service"]}>
                <Mechanics />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cost"
            element={
              <ProtectedRoute require={["mechanic"]}>
                <Cost />
              </ProtectedRoute>
            }
          />

          <Route path="/requesting" element={<Requesting />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/complete" element={<Complete />} />

          {/* USER */}
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/support" element={<Support />} />

          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Router>
    </AppProvider>
  );
}