 import { useState } from "react";
import PageLayout from "../components/PageLayout";
import Card from "../components/Card";

import {
  spacing,
  colors,
  radius,
  typography,
} from "../styles/theme";

export default function Settings() {
  const [settings, setSettings] = useState({
    requestUpdates: true,
    mechanicArrived: true,
    payments: true,
    offers: false,
    language: "en",
  });

  const toggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <PageLayout>
      <div style={container}>

        {/* HEADER */}
        <div style={header}>
          <h2 style={title}>Settings</h2>
          <p style={subtitle}>Control your app experience</p>
        </div>

        {/* NOTIFICATIONS */}
        <Card style={card}>
          <div style={sectionTitle}>Notifications</div>

          <div style={row}>
            <span>Request updates</span>
            <div style={switchWrap} onClick={() => toggle("requestUpdates")}>
              <div
                style={{
                  ...switchKnob,
                  marginLeft: settings.requestUpdates ? 18 : 2,
                  background: settings.requestUpdates ? colors.primary : "#ccc",
                }}
              />
            </div>
          </div>

          <div style={row}>
            <span>Mechanic arrival</span>
            <div style={switchWrap} onClick={() => toggle("mechanicArrived")}>
              <div
                style={{
                  ...switchKnob,
                  marginLeft: settings.mechanicArrived ? 18 : 2,
                  background: settings.mechanicArrived ? colors.primary : "#ccc",
                }}
              />
            </div>
          </div>

          <div style={row}>
            <span>Payment updates</span>
            <div style={switchWrap} onClick={() => toggle("payments")}>
              <div
                style={{
                  ...switchKnob,
                  marginLeft: settings.payments ? 18 : 2,
                  background: settings.payments ? colors.primary : "#ccc",
                }}
              />
            </div>
          </div>

          <div style={row}>
            <span>Offers & promotions</span>
            <div style={switchWrap} onClick={() => toggle("offers")}>
              <div
                style={{
                  ...switchKnob,
                  marginLeft: settings.offers ? 18 : 2,
                  background: settings.offers ? colors.primary : "#ccc",
                }}
              />
            </div>
          </div>
        </Card>

        {/* LANGUAGE */}
        <Card style={card}>
          <div style={sectionTitle}>Language</div>

          <select
            value={settings.language}
            onChange={(e) =>
              setSettings({ ...settings, language: e.target.value })
            }
            style={select}
          >
            <option value="en">English</option>
            <option value="hi">Hindi (coming soon)</option>
            <option value="gu">Gujarati (coming soon)</option>
          </select>
        </Card>

        {/* PRIVACY (PROFESSIONAL VERSION) */}
        <Card style={card}>
          <div style={sectionTitle}>Privacy & Data</div>

          <div style={privacyBox}>

            <div style={privacyItem}>
              <div style={privacyTitle}>Data Protection</div>
              <div style={privacyText}>
                All personal data is securely encrypted and stored using industry standards.
              </div>
            </div>

            <div style={privacyItem}>
              <div style={privacyTitle}>Service Usage</div>
              <div style={privacyText}>
                We use anonymized usage data to improve mechanic matching and service speed.
              </div>
            </div>

            <div style={privacyItem}>
              <div style={privacyTitle}>Location Access</div>
              <div style={privacyText}>
                Location is accessed only when you request a service and is not shared externally.
              </div>
            </div>

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
  gap: 16,
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

/* CARD */
const card = {
  padding: 14,
  borderRadius: radius.lg,
};

/* SECTION TITLE */
const sectionTitle = {
  fontSize: 13,
  fontWeight: 600,
  marginBottom: 12,
  color: colors.muted,
};

/* ROW */
const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 0",
  fontSize: 14,
};

/* SWITCH */
const switchWrap = {
  width: 38,
  height: 20,
  borderRadius: 20,
  background: "#eee",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  padding: 2,
};

const switchKnob = {
  width: 16,
  height: 16,
  borderRadius: "50%",
  transition: "0.2s",
};

/* SELECT */
const select = {
  width: "100%",
  padding: 12,
  borderRadius: radius.md,
  border: `1px solid ${colors.border}`,
  fontSize: 14,
  background: "#fff",
};

/* PRIVACY */
const privacyBox = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const privacyItem = {
  padding: 10,
  borderRadius: radius.md,
  background: "#f8f9fa",
  border: "1px solid #eee",
};

const privacyTitle = {
  fontSize: 13,
  fontWeight: 600,
  marginBottom: 4,
};

const privacyText = {
  fontSize: 12,
  color: colors.muted,
  lineHeight: 1.4,
};