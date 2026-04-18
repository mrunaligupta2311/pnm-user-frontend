 import { colors, radius, shadows, spacing, transitions } from "../styles/theme";

export default function Card({
  children,
  style = {},
  onClick,
  variant = "default", // default | glass | elevated
  padding = "md", // sm | md | lg
}) {
  const isClickable = !!onClick;

  return (
    <div
      onClick={onClick}
      style={{
        ...baseCard,
        ...variants[variant],
        padding: paddings[padding],
        cursor: isClickable ? "pointer" : "default",
        ...(isClickable && interactive),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ================= BASE ================= */

const baseCard = {
  borderRadius: radius.lg,
  transition: transitions.normal,
  border: `1px solid ${colors.border}`,
  background: colors.surface,
};

/* ================= VARIANTS ================= */

const variants = {
  default: {
    boxShadow: shadows.card,
  },

  glass: {
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(14px)",
    boxShadow: shadows.soft,
  },

  elevated: {
    boxShadow: shadows.strong,
  },
};

/* ================= PADDING ================= */

const paddings = {
  sm: spacing.sm,
  md: spacing.md,
  lg: spacing.lg,
};

/* ================= INTERACTIONS ================= */

const interactive = {
  transform: "translateY(0)",
};
