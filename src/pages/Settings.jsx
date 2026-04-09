import { useState } from "react";
import PageLayout from "../components/PageLayout";
import Card from "../components/Card";
import GradientButton from "../components/GradientButton";
import { typography, colors, spacing, radius, shadows } from "../styles/theme";

export default function Settings() {
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [password, setPassword] = useState({
    current: "",
    new: "",
  });

  const handleSavePassword = () => {
    if (!password.current || !password.new) {
      alert("Fill both fields");
      return;
    }

    alert("Password updated ✅");
    setPassword({ current: "", new: "" });
  };

  return (
    <PageLayout>
      <div style={container}>

        {/* ✅ TITLE */}
        <h2 style={title}>Settings</h2>

        {/* ✅ THEME */}
        <Card style={card}>
          <p style={sectionTitle}>Appearance</p>

          <div style={rowBetween}>
            <span>Theme</span>
            <div style={toggleRow}>
              <button
                onClick={() => setTheme("light")}
                style={toggleBtn(theme === "light")}
              >
                Light
              </button>
              <button
                onClick={() => setTheme("dark")}
                style={toggleBtn(theme === "dark")}
              >
                Dark
              </button>
            </div>
          </div>
        </Card>

        {/* ✅ NOTIFICATIONS */}
        <Card style={card}>
          <p style={sectionTitle}>Notifications</p>

          <div style={rowBetween}>
            <span>Enable Notifications</span>

            <div
              onClick={() => setNotifications(!notifications)}
              style={{
                ...switchTrack,
                background: notifications ? colors.primary : "#ccc",
              }}
            >
              <div
                style={{
                  ...switchThumb,
                  transform: notifications
                    ? "translateX(22px)"
                    : "translateX(2px)",
                }}
              />
            </div>
          </div>
        </Card>

        {/* ✅ PASSWORD */}
        <Card style={card}>
          <p style={sectionTitle}>Security</p>

          <input
            type="password"
            placeholder="Current Password"
            value={password.current}
            onChange={(e) =>
              setPassword({ ...password, current: e.target.value })
            }
            style={input}
          />

          <input
            type="password"
            placeholder="New Password"
            value={password.new}
            onChange={(e) =>
              setPassword({ ...password, new: e.target.value })
            }
            style={input}
          />

          <GradientButton fullWidth onClick={handleSavePassword}>
            Update Password
          </GradientButton>
        </Card>

        {/* ✅ APP INFO */}
        <Card style={card}>
          <p style={sectionTitle}>App</p>

          <div style={rowBetween}>
            <span>Version</span>
            <span style={muted}>1.0.0</span>
          </div>

          <div style={rowBetween}>
            <span>Support</span>
            <span style={link}>Contact</span>
          </div>
        </Card>

      </div>
    </PageLayout>
  );
}

/* ================= STYLES ================= */

const container = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: spacing.md,
  padding: spacing.lg,

  /* ✅ NO OVERLAP FIX */
  paddingTop: "80px",
  paddingBottom: "80px",

  background: "#f8fafc",
};

/* TITLE */
const title = {
  ...typography.title,
  textAlign: "center",
};

/* CARD */
const card = {
  padding: spacing.lg,
  borderRadius: radius.xl,
  background: "#fff",
  boxShadow: shadows.card,
  display: "flex",
  flexDirection: "column",
  gap: spacing.sm,
};

/* SECTION */
const sectionTitle = {
  ...typography.subtitle,
  fontWeight: 600,
  marginBottom: spacing.sm,
};

/* ROW */
const rowBetween = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

/* TOGGLE BUTTON */
const toggleRow = {
  display: "flex",
  gap: 8,
};

const toggleBtn = (active) => ({
  padding: "6px 12px",
  borderRadius: radius.md,
  border: `1px solid ${active ? colors.primary : colors.border}`,
  background: active ? colors.primary : "#fff",
  color: active ? "#fff" : colors.text,
  cursor: "pointer",
  fontSize: 12,
  fontWeight: 600,
});

/* SWITCH */
const switchTrack = {
  width: 44,
  height: 24,
  borderRadius: 999,
  position: "relative",
  cursor: "pointer",
  transition: "0.3s",
};

const switchThumb = {
  width: 20,
  height: 20,
  borderRadius: "50%",
  background: "#fff",
  position: "absolute",
  top: 2,
  left: 0,
  transition: "0.3s",
};

/* INPUT */
const input = {
  padding: "12px",
  borderRadius: radius.md,
  border: `1px solid ${colors.border}`,
  fontSize: 14,
  outline: "none",
};

/* EXTRA */
const muted = {
  color: colors.muted,
  fontSize: 13,
};

const link = {
  color: colors.primary,
  fontWeight: 600,
  cursor: "pointer",
};