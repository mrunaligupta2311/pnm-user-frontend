 // src/styles/theme.js

/* ================= COLORS ================= */
export const colors = {
  /* PRIMARY (Premium Violet System) */
  primary: "#4F46E5",
  primaryDark: "#4338CA",

  /* ACCENTS */
  accent: "#7C3AED",
  success: "#22C55E",
  danger: "#EF4444",
  warning: "#F59E0B",

  /* BACKGROUNDS */
  background: "#F9FAFB",
  surface: "#FFFFFF",
  backgroundGray: "#F3F4F6",

  /* BORDERS */
  border: "#E5E7EB",
  mutedBorder: "#D1D5DB",

  /* TEXT */
  text: "#111827",
  muted: "#6B7280",
  heading: "#0F172A",

  /* BASE */
  white: "#FFFFFF",
  black: "#000000",
};

/* ================= TYPOGRAPHY ================= */
export const typography = {
  title: {
    fontSize: "1.5rem",
    fontWeight: 700,
    lineHeight: 1.3,
    letterSpacing: "0.01em",
    color: colors.heading,
  },
  subtitle: {
    fontSize: "1rem",
    fontWeight: 500,
    lineHeight: 1.4,
    color: colors.muted,
  },
  body: {
    fontSize: "0.95rem",
    lineHeight: 1.6,
    color: colors.text,
  },
  small: {
    fontSize: "0.85rem",
    lineHeight: 1.5,
    color: colors.muted,
  },
};

/* ================= SHADOWS ================= */
export const shadows = {
  card: "0 10px 30px rgba(0,0,0,0.08)",
  soft: "0 6px 20px rgba(0,0,0,0.06)",
  strong: "0 16px 40px rgba(0,0,0,0.12)",
};
export const shadow = shadows;

/* ================= RADIUS ================= */
export const radius = {
  xs: "6px",
  sm: "10px",
  md: "14px",
  lg: "18px",
  xl: "24px",
  full: "999px",
};
export const radii = radius;

/* ================= SPACING ================= */
export const spacing = {
  xs: "6px",
  sm: "10px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  xxl: "40px",
};

/* ================= GRADIENTS ================= */
export const gradients = {
  primary: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
  accent: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
  success: "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",
};

/* ================= COMPONENT TOKENS ================= */
export const components = {
  input: {
    padding: "14px",
    borderRadius: radius.md,
    border: `1px solid ${colors.border}`,
    fontSize: "14px",
    outline: "none",
    background: colors.surface,
    boxShadow: shadows.soft,
    transition: "all 0.2s ease",
  },
  button: {
    borderRadius: radius.md,
    fontWeight: 600,
    cursor: "pointer",
  },
  cardGlass: {
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(14px)",
    border: `1px solid ${colors.border}`,
  },
};

/* ================= TRANSITIONS ================= */
export const transitions = {
  fast: "120ms cubic-bezier(0.4, 0, 0.2, 1)",
  normal: "220ms cubic-bezier(0.4, 0, 0.2, 1)",
  slow: "330ms cubic-bezier(0.4, 0, 0.2, 1)",
};

/* ================= Z-INDEX ================= */
export const zIndex = {
  header: 1000,
  overlay: 1500,
  modal: 2000,
};

/* ================= BREAKPOINTS ================= */
export const breakpoints = {
  xs: "320px",
  sm: "480px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
};

export const media = {
  xs: `(min-width: ${breakpoints.xs})`,
  sm: `(min-width: ${breakpoints.sm})`,
  md: `(min-width: ${breakpoints.md})`,
  lg: `(min-width: ${breakpoints.lg})`,
  xl: `(min-width: ${breakpoints.xl})`,
};