 import { colors, radius, spacing, typography } from "../styles/theme";

export default function StatusBadge({
  status = "Pending",
  size = "sm", // sm | md
}) {
  const config = statusMap[status] || statusMap.default;

  return (
    <span
      style={{
        ...base,
        ...sizes[size],
        background: config.bg,
        color: config.text,
      }}
    >
      {status}
    </span>
  );
}

/* ================= STATUS MAP ================= */

const statusMap = {
  Completed: {
    bg: "rgba(34,197,94,0.12)",
    text: colors.success,
  },
  Pending: {
    bg: "rgba(245,158,11,0.12)",
    text: colors.warning,
  },
  Cancelled: {
    bg: "rgba(239,68,68,0.12)",
    text: colors.danger,
  },
  default: {
    bg: "rgba(107,114,128,0.12)",
    text: colors.muted,
  },
};

/* ================= BASE ================= */

const base = {
  borderRadius: radius.full,
  fontWeight: 500,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

/* ================= SIZES ================= */

const sizes = {
  sm: {
    padding: `${spacing.xs} ${spacing.sm}`,
    fontSize: "11px",
  },
  md: {
    padding: `${spacing.xs} ${spacing.md}`,
    fontSize: "12px",
  },
};