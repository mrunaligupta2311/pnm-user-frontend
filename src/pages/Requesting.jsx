 import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import Loader from "../components/Loader";

import {
  colors,
  typography,
  spacing,
  radius,
} from "../styles/theme";

export default function Requesting() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Finding nearby mechanics...");

  useEffect(() => {
    const steps = [
      "Finding nearby mechanics...",
      "Checking availability...",
      "Sending request...",
      "Waiting for response...",
    ];

    let i = 0;

    const interval = setInterval(() => {
      i++;
      if (i < steps.length) {
        setStatus(steps[i]);
      }
    }, 600);

    const timer = setTimeout(() => {
      clearInterval(interval);

      const accepted = Math.random() > 0.25;

      if (accepted) {
        navigate("/tracking");
      } else {
        alert("Mechanic declined. Try another.");
        navigate("/mechanics");
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <PageLayout showHeader={false} showFooter={false}>
      <div style={container}>

        {/* ANIMATION */}
        <div style={card}>
          <Loader text="Connecting..." />

          <h2 style={title}>Requesting Mechanic</h2>

          <p style={statusText}>{status}</p>

          {/* DOTS ANIMATION */}
          <div style={dots}>
            <span style={dot}></span>
            <span style={dot}></span>
            <span style={dot}></span>
          </div>

        </div>

      </div>
    </PageLayout>
  );
}

/* ================= STYLES ================= */

const container = {
  minHeight: "80vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: spacing.lg,
};

const card = {
  width: "100%",
  maxWidth: 320,
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  gap: spacing.sm,
  alignItems: "center",
};

const title = {
  ...typography.title,
  fontSize: 20,
};

const statusText = {
  fontSize: 13,
  color: colors.muted,
};

const dots = {
  display: "flex",
  gap: 6,
  marginTop: 10,
};

const dot = {
  width: 6,
  height: 6,
  borderRadius: "50%",
  background: colors.primary,
  animation: "pulse 1s infinite",
};