 import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GradientButton from "../components/GradientButton";
import {
  typography,
  colors,
  radius,
  shadows,
  spacing,
} from "../styles/theme";

export default function Login() {
  const navigate = useNavigate();

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
      setError("Enter a valid email address");
      return;
    }

    setLoading(true);

    // 🔥 Simulated API
    setTimeout(() => {
      setLoading(false);
      navigate("/home"); // ✅ mechanic flow
    }, 1000);
  };

  return (
    <div style={wrapper}>
      <div style={container}>
        
        {/* HEADER */}
        <div style={header}>
          <h2 style={title}>Welcome Back</h2>
          <p style={subtitle}>Login to continue to PNM Mechanic</p>
        </div>

        {/* FORM */}
        <div style={card}>
          
          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={input}
          />

          {/* PASSWORD */}
          <div style={passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ ...input, paddingRight: "40px" }}
            />

            <span
              style={eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {/* ERROR */}
          {error && <p style={errorText}>{error}</p>}

          {/* BUTTON */}
          <GradientButton
            fullWidth
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </GradientButton>
        </div>

        {/* SIGNUP */}
        <p style={signupText}>
          Don’t have an account?{" "}
          <span style={link} onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </p>

      </div>
    </div>
  );
}

/* ================= STYLES ================= */

/* 🔥 MOBILE WRAPPER */
const wrapper = {
  minHeight: "100dvh",
  display: "flex",
  justifyContent: "center",
  background: "linear-gradient(180deg, #ffffff 0%, #eef2ff 100%)",
};

/* 🔥 MOBILE WIDTH CONTROL */
const container = {
  width: "100%",
  maxWidth: "420px",
  padding: spacing.lg,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: spacing.lg,
};

/* HEADER */
const header = {
  textAlign: "center",
};

const title = {
  ...typography.title,
  fontSize: "24px",
  fontWeight: "700",
  color: colors.heading,
};

const subtitle = {
  ...typography.subtitle,
  color: colors.muted,
};

/* CARD */
const card = {
  width: "100%",
  padding: spacing.lg,
  borderRadius: radius.lg,
  background: "#fff",
  boxShadow: shadows.card,
  border: `1px solid ${colors.border}`,
  display: "flex",
  flexDirection: "column",
  gap: spacing.sm,
};

/* INPUT */
const input = {
  width: "100%",
  padding: "14px",
  borderRadius: radius.md,
  border: `1px solid ${colors.border}`,
  fontSize: "14px",
  outline: "none",
  transition: "0.2s",
};

/* PASSWORD */
const passwordWrapper = {
  position: "relative",
};

const eyeIcon = {
  position: "absolute",
  right: 12,
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
  fontSize: "14px",
};

/* ERROR */
const errorText = {
  color: "#ef4444",
  fontSize: "13px",
  textAlign: "center",
};

/* SIGNUP */
const signupText = {
  textAlign: "center",
  fontSize: "14px",
  color: colors.muted,
};

const link = {
  color: colors.primary,
  fontWeight: 600,
  cursor: "pointer",
};