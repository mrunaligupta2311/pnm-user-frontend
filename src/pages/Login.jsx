 import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GradientButton from "../components/GradientButton";
import PageLayout from "../components/PageLayout";
import { useApp } from "../context/AppContext";

import {
  typography,
  colors,
  radius,
  shadows,
  spacing,
} from "../styles/theme";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useApp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleLogin = () => {
    setError("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Enter valid email");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setUser({
        name: "User",
        email,
        isLoggedIn: true,
      });

      setLoading(false);
      navigate("/location");
    }, 800);
  };

  return (
    <PageLayout showHeader={false} showFooter={false}>
      <div style={container}>
        
        <div style={header}>
          <h2 style={title}>Welcome Back</h2>
          <p style={subtitle}>Login to continue</p>
        </div>

        <div style={card}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={input}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />

          <div style={passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ ...input, paddingRight: 40 }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />

            <span
              style={eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {error && <p style={errorText}>{error}</p>}

          <GradientButton fullWidth onClick={handleLogin}>
            {loading ? "Loading..." : "Login"}
          </GradientButton>
        </div>

        <p style={signupText}>
          Don’t have account?{" "}
          <span style={link} onClick={() => navigate("/signup")}>
            Signup
          </span>
        </p>

      </div>
    </PageLayout>
  );
}

/* ================= STYLES ================= */

const container = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: spacing.lg,
  minHeight: "80vh",
};

const header = {
  textAlign: "center",
};

const title = {
  ...typography.title,
  fontSize: 22,
};

const subtitle = {
  ...typography.subtitle,
};

const card = {
  padding: spacing.lg,
  borderRadius: radius.lg,
  background: colors.surface,
  boxShadow: shadows.card,
  display: "flex",
  flexDirection: "column",
  gap: spacing.sm,
};

const input = {
  width: "100%",
  padding: "14px",
  borderRadius: radius.md,
  border: `1px solid ${colors.border}`,
  fontSize: 14,
};

const passwordWrapper = {
  position: "relative",
};

const eyeIcon = {
  position: "absolute",
  right: 12,
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
};

const errorText = {
  color: colors.danger,
  fontSize: 13,
  textAlign: "center",
};

const signupText = {
  textAlign: "center",
  fontSize: 14,
  color: colors.muted,
};

const link = {
  color: colors.primary,
  fontWeight: 600,
  cursor: "pointer",
};