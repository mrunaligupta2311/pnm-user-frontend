 import { useState } from "react";
import PageLayout from "../components/PageLayout";
import GradientButton from "../components/GradientButton";
import Card from "../components/Card";
import { typography, colors, spacing, radius, shadows } from "../styles/theme";

export default function Profile() {
  const [user, setUser] = useState({
    name: "Mrunali Gupta",
    email: "mrunali@example.com",
    phone: "+91 9876543210",
  });

  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!user.name || !user.email || !user.phone) {
      alert("Please fill all fields");
      return;
    }

    setEditing(false);
    alert("Profile updated ✅");
  };

  const handleLogout = () => {
    if (window.confirm("Logout from account?")) {
      alert("Logged out");
    }
  };

  return (
    <PageLayout>
      <div style={container}>
        
        {/* ✅ PROFILE HEADER */}
        <div style={headerCard}>
          <div style={avatar}>{user.name.charAt(0)}</div>
          <h2 style={name}>{user.name}</h2>
          <p style={email}>{user.email}</p>
        </div>

        {/* ✅ INFO CARD */}
        <Card style={card}>
          
          <div style={field}>
            <label style={label}>Full Name</label>
            <input
              name="name"
              value={user.name}
              onChange={handleChange}
              disabled={!editing}
              style={input(editing)}
            />
          </div>

          <div style={field}>
            <label style={label}>Email Address</label>
            <input
              name="email"
              value={user.email}
              onChange={handleChange}
              disabled={!editing}
              style={input(editing)}
            />
          </div>

          <div style={field}>
            <label style={label}>Phone Number</label>
            <input
              name="phone"
              value={user.phone}
              onChange={handleChange}
              disabled={!editing}
              style={input(editing)}
            />
          </div>

        </Card>

        {/* ✅ ACTIONS */}
        <div style={actions}>
          {!editing ? (
            <GradientButton fullWidth onClick={() => setEditing(true)}>
              Edit Profile
            </GradientButton>
          ) : (
            <GradientButton fullWidth onClick={handleSave}>
              Save Changes
            </GradientButton>
          )}

          <button style={logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>

      </div>
    </PageLayout>
  );
}

/* ================= STYLES ================= */

const container = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: spacing.lg,
  padding: spacing.lg,

  /* ✅ FIX OVERLAP */
  paddingTop: "80px",   // header space
  paddingBottom: "80px", // footer space

  background: "#f8fafc",
};

/* HEADER CARD */
const headerCard = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: spacing.lg,
  borderRadius: radius.xl,
  background: "#fff",
  boxShadow: shadows.strong,
};

const avatar = {
  width: 90,
  height: 90,
  borderRadius: "50%",
  background: "linear-gradient(135deg, #4f46e5, #3b82f6)",
  color: "#fff",
  fontSize: 32,
  fontWeight: 700,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 12px 30px rgba(79,70,229,0.3)",
};

const name = {
  ...typography.title,
  marginTop: spacing.sm,
};

const email = {
  ...typography.small,
  color: colors.muted,
};

/* CARD */
const card = {
  padding: spacing.lg,
  borderRadius: radius.xl,
  boxShadow: shadows.card,
  background: "#fff",
  display: "flex",
  flexDirection: "column",
  gap: spacing.md,
};

/* FIELD */
const field = {
  display: "flex",
  flexDirection: "column",
};

const label = {
  fontSize: 12,
  fontWeight: 600,
  color: colors.muted,
  marginBottom: 4,
};

/* INPUT */
const input = (editing) => ({
  padding: "14px",
  borderRadius: radius.md,
  border: `1px solid ${colors.border}`,
  fontSize: 14,
  outline: "none",
  background: editing ? "#fff" : "#f1f5f9",
});

/* ACTIONS */
const actions = {
  display: "flex",
  flexDirection: "column",
  gap: spacing.sm,
};

const logoutBtn = {
  padding: "14px",
  borderRadius: radius.md,
  border: `1px solid ${colors.danger}`,
  background: "#fff",
  color: colors.danger,
  fontWeight: 600,
  cursor: "pointer",
};