 // src/components/GradientButton.jsx
import React from "react";
import { gradients, radius, transitions, shadow } from "../styles/theme";

export default function GradientButton({ children, onClick, fullWidth, style }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: fullWidth ? "100%" : "auto",
        padding: "14px 20px",
        borderRadius: radius.md,
        border: "none",
        background: gradients.primary,
        color: "#fff",
        fontSize: "15px",
        fontWeight: 600,
        cursor: "pointer",
        transition: transitions.normal,
        textAlign: "center",
        boxShadow: shadow.button,
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = shadow.button;
      }}
    >
      {children}
    </button>
  );
}