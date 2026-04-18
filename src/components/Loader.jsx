 import { colors, spacing, typography } from "../styles/theme";

export default function Loader({
  text = "Loading...",
  fullScreen = false,
  size = 32, // 24 | 32 | 40
}) {
  return (
    <div style={{ ...container, ...(fullScreen && overlay) }}>
      
      {/* 🔥 Spinner */}
      <div
        style={{
          ...spinner,
          width: size,
          height: size,
          borderWidth: size / 8,
        }}
      />

      {/* 🔥 Text */}
      {text && <p style={label}>{text}</p>}
    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: spacing.md,
  gap: spacing.sm,
};

const spinner = {
  border: `3px solid ${colors.border}`,
  borderTop: `3px solid ${colors.primary}`,
  borderRadius: "50%",
  animation: "spin 0.8s linear infinite",
};

const label = {
  ...typography.small,
};

/* 🔥 Fullscreen overlay */
const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(255,255,255,0.6)",
  backdropFilter: "blur(4px)",
  zIndex: 2000,
};