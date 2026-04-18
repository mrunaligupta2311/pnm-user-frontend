 // src/pages/Splash.jsx
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import GradientButton from "../components/GradientButton";

import {
  colors,
  typography,
  radius,
  spacing,
} from "../styles/theme";

export default function Splash() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={container}>

      {/* BACKGROUND BLUR SHAPES */}
      <div style={bg1}></div>
      <div style={bg2}></div>

      {/* CENTER CONTENT */}
      <div style={center}>

        {/* LOGO */}
        <div
          style={{
            ...logo,
            transform: loaded ? "translateY(0) scale(1)" : "translateY(20px) scale(0.9)",
            opacity: loaded ? 1 : 0,
          }}
        >
          PNM
        </div>

        {/* TITLE */}
        <h1
          style={{
            ...title,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(12px)",
          }}
        >
          Puncture Near Me
        </h1>

        {/* SUBTITLE */}
        <p
          style={{
            ...subtitle,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(12px)",
          }}
        >
          Instant roadside assistance. Anytime. Anywhere.
        </p>

      </div>

      {/* CTA */}
      <div style={bottom}>
        <GradientButton fullWidth onClick={() => navigate("/login")}>
          Get Started
        </GradientButton>

        <p style={hint}>Fast • Reliable • Verified Mechanics</p>
      </div>

    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  minHeight: "100dvh",
  width: "100%",
  maxWidth: 420,
  margin: "0 auto",
  padding: spacing.lg,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  background: "linear-gradient(180deg, #ffffff 0%, #eef2ff 100%)",
  position: "relative",
  overflow: "hidden",
};

/* BACKGROUND ELEMENTS */
const bg1 = {
  position: "absolute",
  width: 200,
  height: 200,
  borderRadius: "50%",
  background: "rgba(15,42,85,0.08)",
  top: -40,
  right: -40,
  filter: "blur(40px)",
};

const bg2 = {
  position: "absolute",
  width: 180,
  height: 180,
  borderRadius: "50%",
  background: "rgba(29,78,216,0.08)",
  bottom: -40,
  left: -40,
  filter: "blur(40px)",
};

/* CENTER */
const center = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  gap: spacing.md,
};

/* LOGO */
const logo = {
  width: 110,
  height: 110,
  borderRadius: radius.xl,
  background: "linear-gradient(135deg, #0f2a55, #1d4ed8)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 34,
  fontWeight: 800,
  color: "#fff",
  boxShadow: "0 20px 50px rgba(29,78,216,0.25)",
  transition: "all 0.5s ease",
};

/* TITLE */
const title = {
  ...typography.title,
  fontSize: 26,
  transition: "all 0.5s ease",
};

/* SUBTITLE */
const subtitle = {
  ...typography.subtitle,
  maxWidth: 280,
  lineHeight: 1.5,
  transition: "all 0.5s ease",
};

/* BOTTOM */
const bottom = {
  marginBottom: spacing.lg,
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const hint = {
  fontSize: 12,
  textAlign: "center",
  color: colors.muted,
};