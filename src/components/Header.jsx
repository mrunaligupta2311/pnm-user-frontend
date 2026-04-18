 import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { colors, radius, shadows } from "../styles/theme";

export default function Header() {
  const navigate = useNavigate();
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    const handler = () => setCanInstall(!!window.deferredPrompt);
    handler();
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    const prompt = window.deferredPrompt;
    if (!prompt) return;

    prompt.prompt();
    await prompt.userChoice;
    window.deferredPrompt = null;
    setCanInstall(false);
  };

  return (
    <header style={header}>
      <div style={inner}>

        {/* LEFT - LOGO */}
        <div style={logo} onClick={() => navigate("/location")}>
          PNM
        </div>

        {/* RIGHT ACTIONS */}
        <div style={actions}>

          {canInstall && (
            <button style={installBtn} onClick={handleInstall}>
              Install
            </button>
          )}

          <button style={supportBtn} onClick={() => navigate("/support")}>
            Help
          </button>

        </div>

      </div>
    </header>
  );
}

/* ================= STYLES ================= */

const header = {
  position: "fixed",
  top: 0,
  width: "100%",
  maxWidth: 420,
  height: 56,
  background: "rgba(255,255,255,0.9)",
  backdropFilter: "blur(14px)",
  borderBottom: "1px solid #eee",
  zIndex: 1000,
  display: "flex",
  justifyContent: "center",
};

const inner = {
  width: "100%",
  padding: "0 14px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const logo = {
  fontWeight: 800,
  fontSize: 16,
  color: colors.primary,
  cursor: "pointer",
};

const actions = {
  display: "flex",
  gap: 8,
};

const installBtn = {
  padding: "6px 10px",
  borderRadius: radius.full,
  border: "none",
  background: colors.primary,
  color: "#fff",
  fontSize: 12,
};

const supportBtn = {
  padding: "6px 10px",
  borderRadius: radius.full,
  border: "1px solid #ddd",
  background: "#fff",
  fontSize: 12,
};