 // src/components/Card.jsx
import { colors, radius, shadows, spacing } from "../styles/theme";

export default function Card({ children, style = {}, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "rgba(255,255,255,0.8)", // glassy look
        backdropFilter: "blur(15px)",
        borderRadius: radius.lg,
        padding: spacing.md,
        border: `1px solid ${colors.border}`,
        boxShadow: shadows.card,
        transition: "all 0.25s ease, transform 0.2s ease",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow =
          "0 15px 35px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.6)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = shadows.card;
      }}
    >
      {children}
    </div>
  );
}