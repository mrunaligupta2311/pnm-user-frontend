 import { useNavigate, useLocation } from "react-router-dom";
import { colors } from "../styles/theme";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { name: "Home", path: "/location", icon: "🏠" },
    { name: "Wallet", path: "/wallet", icon: "💰" },
    { name: "History", path: "/history", icon: "📄" },
    { name: "Profile", path: "/profile", icon: "👤" },
  ];

  return (
    <nav style={footer}>

      {tabs.map((t) => {
        const active = location.pathname === t.path;

        return (
          <div
            key={t.name}
            onClick={() => navigate(t.path)}
            style={{
              ...item,
              color: active ? colors.primary : "#888",
              transform: active ? "scale(1.05)" : "scale(1)",
            }}
          >
            <div style={{ fontSize: 18 }}>{t.icon}</div>
            <div style={{ fontSize: 11 }}>{t.name}</div>

            {active && <div style={dot} />}
          </div>
        );
      })}

    </nav>
  );
}

/* ================= STYLES ================= */

const footer = {
  position: "fixed",
  bottom: 0,
  width: "100%",
  maxWidth: 420,
  height: 64,
  background: "rgba(255,255,255,0.95)",
  backdropFilter: "blur(14px)",
  borderTop: "1px solid #eee",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  zIndex: 1000,
};

const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",
  transition: "0.2s",
  position: "relative",
};

const dot = {
  width: 4,
  height: 4,
  borderRadius: "50%",
  background: colors.primary,
  position: "absolute",
  bottom: -6,
};