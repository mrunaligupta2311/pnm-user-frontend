 import { colors, typography, spacing } from "../styles/theme";

export default function EmptyState({
  title = "Nothing here",
  subtitle = "Try something else or come back later",
  icon = "📭",
  action, // optional button
}) {
  return (
    <div style={container}>
      
      {/* 🔥 Icon */}
      <div style={iconBox}>
        <span style={iconStyle}>{icon}</span>
      </div>

      {/* 🔥 Text */}
      <h3 style={titleStyle}>{title}</h3>
      <p style={subtitleStyle}>{subtitle}</p>

      {/* 🔥 Optional Action */}
      {action && <div style={actionWrapper}>{action}</div>}
    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: spacing.xl,
  gap: spacing.sm,
};

const iconBox = {
  width: 64,
  height: 64,
  borderRadius: 999,
  background: "rgba(124, 58, 237, 0.1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: spacing.sm,
};

const iconStyle = {
  fontSize: 28,
};

const titleStyle = {
  ...typography.title,
  fontSize: "1.1rem",
};

const subtitleStyle = {
  ...typography.small,
  maxWidth: 240,
};

const actionWrapper = {
  marginTop: spacing.md,
};