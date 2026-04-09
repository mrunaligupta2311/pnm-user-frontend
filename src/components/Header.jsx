 // src/components/Header.jsx
import { useState } from "react";
import { colors, radius, shadows, spacing } from "../styles/theme";

export default function Header() {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
      <header style={header}>
        <div style={inner}>
          {/* ✅ Logo left side */}
          <img src="/P.N.M.-icon.png" alt="PNM logo" style={logo} />

          {/* ✅ Customer Support right side */}
          <button
            style={supportBtn}
            onClick={() => setShowHelp(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = colors.primary + "22";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#f3f4f6";
            }}
          >
            Customer Support
          </button>
        </div>
      </header>

      {showHelp && (
        <div style={overlay} onClick={() => setShowHelp(false)}>
          <div style={modal} onClick={(e) => e.stopPropagation()}>
            <h3>Help</h3>
            <p style={{ fontSize: 13, color: "#555" }}>
              Go step by step to book a mechanic. Track everything live.
            </p>

            <button style={close} onClick={() => setShowHelp(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* STYLES */
const header = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: 56,
  display: "flex",
  justifyContent: "center",
  background: "#ffffffcc",
  backdropFilter: "blur(10px)",
  zIndex: 1000,
  borderBottom: `1px solid #e5e7eb`,
};

const inner = {
  width: "100%",
  maxWidth: "420px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 12px",
};

const logo = {
  height: 26,
};

const supportBtn = {
  padding: "6px 12px",
  borderRadius: radius.md,
  border: "none",
  background: "#f3f4f6",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: 600,
  transition: "all 0.25s ease",
};

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.3)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1500,
};

const modal = {
  background: "#fff",
  padding: spacing.md,
  borderRadius: radius.lg,
  width: "90%",
  maxWidth: 300,
  boxShadow: shadows.card,
};

const close = {
  marginTop: spacing.sm,
  padding: spacing.sm,
  border: "none",
  background: colors.primary,
  color: "#fff",
  borderRadius: radius.sm,
  cursor: "pointer",
};