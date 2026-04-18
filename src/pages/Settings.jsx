 import PageLayout from "../components/PageLayout";
import Card from "../components/Card";

import {
  spacing,
  colors,
  radius,
  typography,
} from "../styles/theme";

export default function Settings() {
  return (
    <PageLayout>
      <div style={container}>

        {/* HEADER */}
        <div style={header}>
          <h2 style={title}>Settings</h2>
          <p style={subtitle}>Manage your app preferences</p>
        </div>

        {/* SECTION CARD */}
        <Card style={card}>

          <div style={item}>
            <span>🔔</span>
            <span>Notifications</span>
          </div>

          <div style={item}>
            <span>🌐</span>
            <span>Language</span>
          </div>

          <div style={item}>
            <span>🔒</span>
            <span>Privacy</span>
          </div>

          <div style={item}>
            <span>ℹ️</span>
            <span>About App</span>
          </div>

        </Card>

      </div>
    </PageLayout>
  );
}

/* ================= STYLES ================= */

const container = {
  display: "flex",
  flexDirection: "column",
  gap: spacing.lg,
};

const header = {
  textAlign: "center",
};

const title = {
  ...typography.title,
};

const subtitle = {
  ...typography.subtitle,
};

const card = {
  display: "flex",
  flexDirection: "column",
  padding: 0,
  overflow: "hidden",
};

const item = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "14px",
  borderBottom: `1px solid ${colors.border}`,
  cursor: "pointer",
  transition: "0.2s",
  fontSize: 14,
};

item[":hover"] = {
  background: colors.backgroundGray,
};