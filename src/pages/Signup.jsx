 // src/pages/Signup.jsx
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

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSignup = () => {
    const { name, email, password, confirmPassword } = form;

    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Invalid email format");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/location");
    }, 900);
  };

  return (
    <div style={wrapper}>

      {/* HEADER */}
      <div style={header}>
        <h2 style={title}>Create Account</h2>
        <p style={subtitle}>Join PNM to get instant roadside help</p>
      </div>

      {/* CARD */}
      <div style={card}>

        {/* NAME */}
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          style={input}
        />

        {/* EMAIL */}
        <input
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          style={input}
        />

        {/* PASSWORD */}
        <div style={passwordWrap}>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={input}
          />

          <span
            style={eye}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* CONFIRM PASSWORD */}
        <input
          name="confirmPassword"
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          style={input}
        />

        {/* ERROR */}
        {error && <div style={errorBox}>{error}</div>}

        {/* BUTTON */}
        <GradientButton fullWidth onClick={handleSignup}>
          {loading ? "Creating Account..." : "Sign Up"}
        </GradientButton>

      </div>

      {/* LOGIN LINK */}
      <p style={footer}>
        Already have an account?{" "}
        <span style={link} onClick={() => navigate("/login")}>
          Login
        </span>
      </p>

    </div>
  );
}

/* ================= STYLES ================= */

const wrapper = {
  minHeight: "100dvh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: spacing.lg,
  background: "linear-gradient(180deg, #ffffff 0%, #eef2ff 100%)",
};

const header = {
  textAlign: "center",
  marginBottom: spacing.lg,
};

const title = {
  ...typography.title,
  fontSize: 24,
};

const subtitle = {
  ...typography.subtitle,
};

const card = {
  width: "100%",
  maxWidth: 360,
  padding: spacing.lg,
  borderRadius: radius.lg,
  background: "#fff",
  boxShadow: shadows.card,
  border: `1px solid ${colors.border}`,
  display: "flex",
  flexDirection: "column",
  gap: spacing.sm,
};

const input = {
  width: "100%",
  padding: "14px",
  borderRadius: radius.md,
  border: `1px solid ${colors.border}`,
  fontSize: "14px",
  outline: "none",
};

const passwordWrap = {
  position: "relative",
};

const eye = {
  position: "absolute",
  right: 12,
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
};

const errorBox = {
  fontSize: 13,
  padding: "10px",
  borderRadius: radius.md,
  background: "#fee2e2",
  color: "#b91c1c",
};

const footer = {
  marginTop: spacing.md,
  fontSize: 14,
  color: colors.muted,
};

const link = {
  color: colors.primary,
  fontWeight: 600,
  cursor: "pointer",
};