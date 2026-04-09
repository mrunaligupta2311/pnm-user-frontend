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
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ validation helpers
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const isStrongPassword = (password) => password.length >= 6;

  const handleSignup = () => {
    const { name, email, password, confirmPassword } = form;

    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Enter a valid email");
      return;
    }

    if (!isStrongPassword(password)) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    // 🔥 Fake API call (replace later)
    setTimeout(() => {
      setLoading(false);
      navigate("/location");
    }, 1000);
  };

  return (
    <div style={container}>
      
      {/* HEADER */}
      <div style={header}>
        <h2 style={title}>Create Account</h2>
        <p style={subtitle}>Signup to start using PNM</p>
      </div>

      {/* FORM */}
      <div style={card}>
        
        {/* NAME */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          style={input}
        />

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
          style={input}
        />

        {/* PASSWORD */}
        <div style={passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={{ ...input, paddingRight: "40px" }}
          />

          <span
            style={eyeIcon}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* CONFIRM PASSWORD */}
        <input
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          style={input}
        />

        {/* ERROR */}
        {error && <p style={errorText}>{error}</p>}

        {/* BUTTON */}
        <GradientButton
          fullWidth
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create Account"}
        </GradientButton>
      </div>

      {/* LOGIN LINK */}
      <p style={footerText}>
        Already have an account?{" "}
        <span style={link} onClick={() => navigate("/login")}>
          Login
        </span>
      </p>
    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  minHeight: "100dvh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: spacing.md,
  gap: spacing.md,
  background: "linear-gradient(180deg, #ffffff 0%, #eef2ff 100%)",
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
  maxWidth: "340px",
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
  color: "red",
  fontSize: "13px",
  textAlign: "center",
};

/* FOOTER */
const footerText = {
  fontSize: "14px",
  color: colors.muted,
};

const link = {
  color: colors.primary,
  fontWeight: 600,
  cursor: "pointer",
};