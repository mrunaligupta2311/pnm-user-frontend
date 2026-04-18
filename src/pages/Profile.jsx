 import { useState, useEffect } from "react";
import PageLayout from "../components/PageLayout";
import GradientButton from "../components/GradientButton";
import Card from "../components/Card";
import { useApp } from "../context/AppContext";

import {
  colors,
  radius,
  spacing,
  typography,
  shadows,
} from "../styles/theme";

export default function Profile() {
  const { user, setUser } = useApp();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    setName(user?.name || "");
    setPhone(user?.phone || "");
  }, [user]);

  const handleSave = () => {
    if (!name) return alert("Name required");

    setUser({
      ...user,
      name,
      phone,
    });

    alert("Profile updated");
  };

  return (
    <PageLayout>
      <div style={container}>

        {/* HEADER */}
        <div style={header}>
          <div style={avatar}>
            {name?.charAt(0) || "U"}
          </div>

          <h2 style={title}>{name || "User"}</h2>
          <p style={subtitle}>{user?.email || "No email linked"}</p>
        </div>

        {/* CARD */}
        <Card style={card}>

          <label style={label}>Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            style={input}
          />

          <label style={label}>Phone Number</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone"
            style={input}
          />

          <div style={{ marginTop: 10 }}>
            <GradientButton fullWidth onClick={handleSave}>
              Save Changes
            </GradientButton>
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
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: spacing.sm,
};

const avatar = {
  width: 64,
  height: 64,
  borderRadius: "50%",
  background: colors.primary,
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 22,
  fontWeight: 700,
  boxShadow: shadows.card,
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
  gap: spacing.sm,
};

const label = {
  fontSize: 13,
  color: colors.muted,
  marginTop: 6,
};

const input = {
  width: "100%",
  padding: "14px",
  borderRadius: radius.md,
  border: `1px solid ${colors.border}`,
  outline: "none",
  fontSize: 14,
  background: colors.surface,
};