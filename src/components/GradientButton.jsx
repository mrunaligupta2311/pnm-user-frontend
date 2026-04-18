 import { colors, radius, spacing, shadows, transitions, gradients } from "../styles/theme";

export default function GradientButton({
  children,
  onClick,
  fullWidth = false,
  disabled = false,
  loading = false,
  size = "md", // sm | md | lg
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        ...base,
        ...sizes[size],
        width: fullWidth ? "100%" : "auto",
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      onMouseDown={(e) => {
        if (!disabled) e.currentTarget.style.transform = "scale(0.96)";
      }}
      onMouseUp={(e) => {
        if (!disabled) e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}

/* ================= BASE ================= */

const base = {
  border: "none",
  borderRadius: radius.md,
  background: gradients.primary,
  color: "#fff",
  fontWeight: 600,
  transition: transitions.fast,
  boxShadow: "0 8px 25px rgba(79, 70, 229, 0.25)",
};

/* ================= SIZES ================= */

const sizes = {
  sm: {
    padding: `${spacing.xs} ${spacing.sm}`,
    fontSize: "13px",
  },
  md: {
    padding: `${spacing.sm} ${spacing.md}`,
    fontSize: "14px",
  },
  lg: {
    padding: `${spacing.md}`,
    fontSize: "15px",
  },
};