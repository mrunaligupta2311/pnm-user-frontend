 // src/components/Footer.jsx
import { useNavigate, useLocation } from "react-router-dom";
import { colors, radius } from "../styles/theme";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { name: "Home", path: "/location", icon: "🏠" },
    { name: "Wallet", path: "/wallet", icon: "💰" },
    { name: "History", path: "/history", icon: "🧾" },
    { name: "Profile", path: "/profile", icon: "👤" },
    { name: "Settings", path: "/settings", icon: "⚙️" },
  ];

  return (
    <div style={footer}>
      {tabs.map((tab) => {
        const active = location.pathname === tab.path;

        return (
          <div
            key={tab.name}
            onClick={() => navigate(tab.path)}
            style={{
              ...tabItem,
              color: active ? colors.primary : colors.muted,
            }}
          >
            <div style={{ fontSize: 20 }}>{tab.icon}</div>
            <div style={{ fontSize: 11, marginTop: 2 }}>{tab.name}</div>

            {active && <div style={activeDot} />}
          </div>
        );
      })}
    </div>
  );
}

/* ================= STYLES ================= */

const footer = {
  position: "sticky",
  bottom: 0,
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  padding: "8px 6px",
  background: "rgba(255,255,255,0.85)", // glassy effect
  backdropFilter: "blur(15px)",
  borderTop: "1px solid rgba(0,0,0,0.08)",
  boxShadow: "0 -2px 15px rgba(0,0,0,0.05)",
  borderRadius: radius.lg + " " + radius.lg + " 0 0",
  zIndex: 100,
};

const tabItem = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",
  position: "relative",
  padding: "6px 0",
  transition: "all 0.2s ease",
};

const activeDot = {
  position: "absolute",
  bottom: -2,
  width: 6,
  height: 6,
  borderRadius: "50%",
  background: "#0f2a55",
  boxShadow: "0 0 4px rgba(15,42,85,0.5)",
};