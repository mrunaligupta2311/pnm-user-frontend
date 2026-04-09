 // src/styles/theme.js

/* ================= COLORS ================= */
export const colors = {
  primary: "#0f2a55",
  primaryDark: "#091f45",

  secondary: "#c69d1f",
  accent: "#f5c742",

  success: "#28a45f",
  danger: "#d9413b",
  warning: "#f2a91f",

  background: "#f7f9fc",
  surface: "#ffffff",
  backgroundGray: "#eef2f8",

  border: "#d4dce8",
  mutedBorder: "#adb8c5",

  text: "#132137",
  muted: "#526477",
  heading: "#0f2039",

  white: "#ffffff",
  black: "#000000",
};

/* ================= TYPOGRAPHY ================= */
export const typography = {
  title: {
    fontSize: "1.4rem",
    fontWeight: 700,
    lineHeight: 1.3,
    letterSpacing: "0.02em",
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
  card: "0 10px 22px rgba(12, 24, 45, 0.14)",
  soft: "0 6px 18px rgba(12, 24, 45, 0.10)",
  strong: "0 16px 38px rgba(12, 24, 45, 0.2)",
};
export const shadow = shadows; // backward compatibility

/* ================= RADIUS ================= */
export const radius = {
  xs: "6px",
  sm: "10px",
  md: "14px",
  lg: "18px",
  xl: "24px",
  full: "999px",
};
export const radii = radius; // backward compatibility

/* ================= SPACING ================= */
export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "14px",
  lg: "20px",
  xl: "28px",
  xxl: "36px",
};

/* ================= GRADIENTS ================= */
export const gradients = {
  primary: "linear-gradient(135deg, #16386a 0%, #0f2a55 100%)",
  accent: "linear-gradient(135deg, #f4c148 0%, #c69d1f 100%)",
  success: "linear-gradient(135deg, #2db36d 0%, #1d8c52 100%)",
};

/* ================= COMPONENT TOKENS (NEW) ================= */
export const components = {
  input: {
    padding: "14px",
    borderRadius: radius.md,
    border: `1px solid ${colors.border}`,
    fontSize: "14px",
    outline: "none",
    background: colors.surface,
    boxShadow: shadows.soft,
  },
  button: {
    borderRadius: radius.md,
    fontWeight: 600,
    cursor: "pointer",
  },
  cardGlass: {
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(12px)",
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