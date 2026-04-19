 import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import PageLayout from "../components/PageLayout";
import Card from "../components/Card";
import { useApp } from "../context/AppContext";

import {
  colors,
  radius,
  typography,
  shadows,
} from "../styles/theme";

export default function Profile() {
  const navigate = useNavigate();
  const { user, setUser } = useApp();
  const fileRef = useRef(null);

  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const userId =
    user?.id ||
    "PNM-" + Math.random().toString(36).substring(2, 8).toUpperCase();

  useEffect(() => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setPhone(user?.phone || "");
    setPhoto(user?.photo || null);
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!name.trim()) return alert("Name required");

    setUser({
      ...user,
      id: userId,
      name,
      email,
      phone,
      photo,
    });

    alert("Profile updated");
  };

  return (
    <PageLayout>
      <div style={container}>

        {/* ================= HEADER ================= */}
        <div style={headerCard}>

          <div
            style={avatarWrapper}
            onClick={() => fileRef.current.click()}
          >
            {photo ? (
              <img src={photo} alt="profile" style={avatarImg} />
            ) : (
              <div style={avatarFallback}>
                {(name || "U").charAt(0).toUpperCase()}
              </div>
            )}

            <div style={editBadge}>✎</div>
          </div>

          <input
            type="file"
            ref={fileRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
            accept="image/*"
          />

          <h2 style={title}>{name || "Your Name"}</h2>

          <p style={subtitle}>User ID: {userId}</p>
        </div>

        {/* ================= EDIT CARD ================= */}
        <Card>
          <div style={sectionHeader}>Edit Profile</div>

          <label style={label}>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={input}
          />

          <label style={label}>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={input}
          />

          <label style={label}>Mobile Number</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={input}
          />

          <div style={{ marginTop: 14 }}>
            <button style={saveBtn} onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </Card>

        {/* ================= SETTINGS (OUTSIDE CARD) ================= */}
        <div style={settingsBox}>
          <button
            style={settingsBtn}
            onClick={() => navigate("/settings")}
          >
            ⚙️ Settings
          </button>
        </div>

      </div>
    </PageLayout>
  );
}

/* ================= STYLES ================= */

const container = {
  display: "flex",
  flexDirection: "column",
  gap: 16,
  paddingBottom: 10,
};

/* HEADER */
const headerCard = {
  background: "#fff",
  borderRadius: 16,
  padding: 16,
  textAlign: "center",
  boxShadow: shadows.soft,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 6,
};

/* AVATAR */
const avatarWrapper = {
  position: "relative",
  width: 82,
  height: 82,
  cursor: "pointer",
};

const avatarImg = {
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  objectFit: "cover",
};

const avatarFallback = {
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  background: colors.primary,
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 24,
  fontWeight: 700,
};

const editBadge = {
  position: "absolute",
  bottom: 0,
  right: 0,
  background: "#fff",
  borderRadius: "50%",
  padding: 5,
  fontSize: 12,
  boxShadow: shadows.soft,
};

/* TEXT */
const title = {
  ...typography.title,
  margin: 0,
};

const subtitle = {
  fontSize: 12,
  color: colors.muted,
  margin: 0,
};

/* SECTION */
const sectionHeader = {
  fontSize: 14,
  fontWeight: 600,
  marginBottom: 10,
};

/* INPUT */
const label = {
  fontSize: 12,
  color: colors.muted,
  marginTop: 10,
};

const input = {
  width: "100%",
  padding: 12,
  borderRadius: radius.md,
  border: `1px solid ${colors.border}`,
  marginTop: 4,
  fontSize: 14,
  outline: "none",
};

/* BUTTONS */
const saveBtn = {
  width: "100%",
  padding: "12px",
  borderRadius: radius.md,
  border: "none",
  background: colors.primary,
  color: "#fff",
  fontSize: 14,
  fontWeight: 600,
};

/* SETTINGS OUTSIDE */
const settingsBox = {
  marginTop: 4,
};

const settingsBtn = {
  width: "100%",
  padding: "12px",
  borderRadius: radius.md,
  border: `1px solid ${colors.border}`,
  background: "#f5f5f5",
  color: "#333",
  fontSize: 14,
  fontWeight: 500,
};