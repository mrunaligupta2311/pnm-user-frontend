 // src/components/PageLayout.jsx
import React from "react";
import Header from "./Header";   // ✅ custom header
import Footer from "./Footer";   // ✅ custom footer
import { spacing, radius, shadows } from "../styles/theme";

export default function PageLayout({ children }) {
  return (
    <div style={wrapper}>
      {/* Header */}
      <Header />

      {/* Content */}
      <main style={content}>{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

/* ===== STYLES ===== */
const wrapper = {
  width: "100%",
  maxWidth: "420px",
  minHeight: "100dvh",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  background: "rgba(255,255,255,0.85)",
  backdropFilter: "blur(20px)",
  borderRadius: radius.xl,
  overflow: "hidden",
  border: "1px solid rgba(0,0,0,0.06)",
  boxShadow:
    "0 20px 60px rgba(15, 32, 57, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
};

const content = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  padding: spacing.md,
  overflowY: "auto",
  gap: spacing.md,
};