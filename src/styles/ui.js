// src/styles/ui.js
import { colors, radius, spacing, shadows, transitions } from "./theme";

/* ================= PAGE WRAPPER ================= */
export const page = {
  minHeight: "100dvh",
  width: "100%",
  maxWidth: "420px",
  margin: "0 auto",
  background: colors.background,
  display: "flex",
  flexDirection: "column",
};

/* ================= PAGE CONTENT ================= */
export const content = {
  flex: 1,
  padding: spacing.md,
  paddingTop: "72px",
  paddingBottom: "84px",
  display: "flex",
  flexDirection: "column",
  gap: spacing.md,
};

/* ================= CARD SYSTEM ================= */
export const card = {
  background: colors.surface,
  borderRadius: radius.lg,
  padding: spacing.md,
  boxShadow: shadows.card,
  border: `1px solid ${colors.border}`,
};

/* ================= INPUT SYSTEM ================= */
export const input = {
  width: "100%",
  padding: "14px",
  borderRadius: radius.md,
  border: `1px solid ${colors.border}`,
  background: colors.surface,
  fontSize: "14px",
  outline: "none",
  transition: transitions.normal,
};

/* ================= PRIMARY BUTTON ================= */
export const buttonPrimary = {
  width: "100%",
  padding: "14px",
  borderRadius: radius.md,
  border: "none",
  background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: shadows.soft,
  transition: transitions.normal,
};

/* ================= SECONDARY BUTTON ================= */
export const buttonSecondary = {
  padding: "12px",
  borderRadius: radius.md,
  border: `1px solid ${colors.border}`,
  background: colors.surface,
  cursor: "pointer",
};

/* ================= OVERLAY ================= */
export const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 2000,
};

/* ================= MODAL ================= */
export const modal = {
  width: "90%",
  maxWidth: "340px",
  background: colors.surface,
  borderRadius: radius.lg,
  padding: spacing.md,
  boxShadow: shadows.strong,
};