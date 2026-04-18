 import { colors, typography, spacing } from "../styles/theme";

export default function SectionHeader({
  title,
  subtitle,
  action, // optional right side (button / link)
}) {
  return (
    <div style={container}>
      
      {/* 🔥 Left */}
      <div style={left}>
        <h3 style={titleStyle}>{title}</h3>
        {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
      </div>

      {/* 🔥 Right */}
      {action && <div>{action}</div>}
    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: spacing.sm,
};

const left = {
  display: "flex",
  flexDirection: "column",
};

const titleStyle = {
  ...typography.title,
  fontSize: "1.05rem",
};

const subtitleStyle = {
  ...typography.small,
  marginTop: 2,
};