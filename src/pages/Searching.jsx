  // src/pages/Searching.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import Card from "../components/Card";
import { typography, colors, spacing, radius, shadows } from "../styles/theme";

export default function Searching() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/mechanics");
    }, 3000); // 3s demo for search
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageLayout>
      <div style={container}>
        <Card style={card}>
          <h2 style={{ ...typography.title, marginBottom: spacing.sm }}>Finding Mechanics Nearby...</h2>
          <div style={loaderWrapper}>
            <div style={dot}></div>
            <div style={dot}></div>
            <div style={dot}></div>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
}

/* ===== STYLES ===== */
const container = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: spacing.md,
};

const card = {
  padding: spacing.lg,
  borderRadius: radius.lg,
  boxShadow: shadows.card,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
};

const loaderWrapper = {
  display: "flex",
  gap: spacing.sm,
  marginTop: spacing.md,
};

const dot = {
  width: 12,
  height: 12,
  borderRadius: "50%",
  backgroundColor: colors.primary,
  animation: "bounce 0.6s infinite alternate",
};
