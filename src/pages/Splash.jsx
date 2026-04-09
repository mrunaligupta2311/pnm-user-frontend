 // src/pages/Splash.jsx
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import GradientButton from "../components/GradientButton";
import { colors, typography, shadows, radius, spacing } from "../styles/theme";

export default function Splash() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  // ✅ subtle entry animation trigger
  useEffect(() => {
    setTimeout(() => setLoaded(true), 200);
  }, []);

  return (
    <div style={container}>
      
      {/* TOP SECTION */}
      <div style={topSection}>
        {/* Logo */}
        <div
          style={{
            ...logoBox,
            transform: loaded ? "scale(1)" : "scale(0.85)",
            opacity: loaded ? 1 : 0,
          }}
        >
          PNM
        </div>

        {/* Title */}
        <h1
          style={{
            ...title,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(10px)",
          }}
        >
          Puncture Near Me
        </h1>

        {/* Subtitle */}
        <p
          style={{
            ...subtitle,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(10px)",
          }}
        >
          Fast, reliable mechanic service at your fingertips
        </p>
      </div>

      {/* BOTTOM CTA */}
      <div style={bottomSection}>
        <GradientButton fullWidth onClick={() => navigate("/login")}>
          Get Started
        </GradientButton>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  minHeight: "100dvh",
  width: "100%",
  maxWidth: "420px",
  margin: "0 auto",
  padding: spacing.lg,

  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  /* 🔥 PREMIUM BACKGROUND */
  background: "linear-gradient(180deg, #ffffff 0%, #eef2ff 100%)",
};

/* TOP */
const topSection = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "15vh",
  gap: spacing.md,
  textAlign: "center",
};

/* LOGO */
const logoBox = {
  width: 110,
  height: 110,
  borderRadius: 24,
  background: "linear-gradient(135deg, #0f2a55, #1d4ed8)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: 34,
  fontWeight: "700",
  color: "#fff",
  boxShadow: "0 20px 40px rgba(29,78,216,0.25)",
  transition: "all 0.4s ease",
};

/* TITLE */
const title = {
  ...typography.title,
  fontSize: "26px",
  fontWeight: "700",
  color: colors.heading,
  transition: "all 0.4s ease",
};

/* SUBTITLE */
const subtitle = {
  ...typography.subtitle,
  fontSize: "15px",
  color: colors.muted,
  maxWidth: "280px",
  lineHeight: 1.5,
  transition: "all 0.4s ease",
};

/* BOTTOM CTA */
const bottomSection = {
  marginBottom: spacing.lg,
};