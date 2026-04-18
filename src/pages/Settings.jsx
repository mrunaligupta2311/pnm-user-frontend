 import PageLayout from "../components/PageLayout";
import { spacing } from "../styles/theme";

export default function Settings() {
  return (
    <PageLayout>
      <div style={container}>
        <h2>Settings</h2>

        <div style={item}>🔔 Notifications</div>
        <div style={item}>🌐 Language</div>
        <div style={item}>🔒 Privacy</div>
        <div style={item}>ℹ️ About</div>
      </div>
    </PageLayout>
  );
}

const container = {
  padding: spacing.md,
  marginTop: 56,
};

const item = {
  padding: 14,
  borderBottom: "1px solid #eee",
  cursor: "pointer",
};