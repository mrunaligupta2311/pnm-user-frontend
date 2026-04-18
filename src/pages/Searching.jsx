 import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import Loader from "../components/Loader";
import { useApp } from "../context/AppContext";

import {
  colors,
  typography,
  spacing,
} from "../styles/theme";

export default function Searching() {
  const navigate = useNavigate();
  const { service } = useApp();

  const [status, setStatus] = useState("Analyzing service request...");

  useEffect(() => {
    if (!service) {
      navigate("/puncture");
      return;
    }

    const steps = [
      "Analyzing service request...",
      "Locating nearby mechanics...",
      "Checking availability...",
      "Ranking best matches...",
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
      navigate("/mechanics");
    }, 2600);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <PageLayout showHeader={false} showFooter={false}>
      <div style={container}>

        {/* CARD */}
        <div style={card}>

          <Loader text="Searching..." />

          <h2 style={title}>Finding Mechanics</h2>

          <p style={statusText}>{status}</p>

          {/* DOTS */}
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
};

const card = {
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: spacing.sm,
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