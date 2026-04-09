// src/pages/Requesting.jsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import Card from "../components/Card";
import { typography, colors, spacing, radius, shadows } from "../styles/theme";

export default function Requesting() {
  const navigate = useNavigate();
  const location = useLocation();

  const [status, setStatus] = useState("requesting"); 
  // requesting | accepted | rejected | timeout

  const [seconds, setSeconds] = useState(10);

  const mechanic = location.state?.mechanic || {
    name: "Sharma Garage",
  };

  // ⏱ Countdown timer
  useEffect(() => {
    if (status !== "requesting") return;

    if (seconds === 0) {
      setStatus("timeout");
      return;
    }

    const timer = setTimeout(() => {
      setSeconds((s) => s - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds, status]);

  // 🎲 Simulate response (random)
  useEffect(() => {
    if (status !== "requesting") return;

    const responseTimer = setTimeout(() => {
      const random = Math.random();

      if (random > 0.6) {
        setStatus("accepted");
      } else {
        setStatus("rejected");
      }
    }, Math.random() * 8000 + 1000); // 1s–9s random

    return () => clearTimeout(responseTimer);
  }, [status]);

  // 🚀 Navigation after result
  useEffect(() => {
    if (status === "accepted") {
      setTimeout(() => navigate("/tracking"), 1500);
    }

    if (status === "rejected" || status === "timeout") {
      setTimeout(() => navigate("/mechanics"), 2000);
    }
  }, [status]);

  return (
    <PageLayout>
      <div style={container}>
        <Card style={card}>
          {/* STATUS TEXT */}
          <h2 style={getTitleStyle(status)}>
            {status === "requesting" && "Requesting Mechanic..."}
            {status === "accepted" && "Mechanic Accepted ✅"}
            {status === "rejected" && "Request Rejected ❌"}
            {status === "timeout" && "No Response ⏱"}
          </h2>

          {/* SUB TEXT */}
          <p style={subtitle}>
            {status === "requesting" &&
              `Waiting for ${mechanic.name} to respond (${seconds}s)`}
            {status === "accepted" &&
              `${mechanic.name} is on the way`}
            {status === "rejected" &&
              "Please select another mechanic"}
            {status === "timeout" &&
              "Mechanic did not respond in time"}
          </p>

          {/* 🔥 BLINK ANIMATION DOT */}
          <div style={loaderWrapper}>
            <div style={dot}></div>
            <div style={dot}></div>
            <div style={dot}></div>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
}

/* ================= STYLES ================= */

const container = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: spacing.md,
};

const card = {
  padding: spacing.lg,
  borderRadius: radius.lg,
  boxShadow: shadows.card,
  textAlign: "center",
  width: "100%",
  maxWidth: "320px",
};

/* 🎨 Dynamic Title Color */
const getTitleStyle = (status) => ({
  ...typography.title,
  color:
    status === "accepted"
      ? "#1a7f37"
      : status === "rejected"
      ? "#d32f2f"
      : status === "timeout"
      ? "#b26a00"
      : colors.heading,
});

/* TEXT */
const subtitle = {
  ...typography.subtitle,
  color: colors.muted,
  marginTop: spacing.sm,
};

/* LOADER */
const loaderWrapper = {
  display: "flex",
  justifyContent: "center",
  gap: spacing.sm,
  marginTop: spacing.md,
};

const dot = {
  width: 10,
  height: 10,
  borderRadius: "50%",
  background: colors.primary,
  animation: "bounce 0.6s infinite alternate",
};