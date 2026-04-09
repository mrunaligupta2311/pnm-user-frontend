 // src/pages/Support.jsx
import { useState } from "react";
import PageLayout from "../components/PageLayout";
import { typography, colors, spacing } from "../styles/theme";
import GradientButton from "../components/GradientButton";

export default function Support() {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    alert(`Message sent: ${message}`);
    setMessage("");
    // In production: send message to backend
  };

  const handleCall = () => {
    // US client example number
    window.location.href = "tel:+1234567890";
  };

  return (
    <PageLayout>
      <div style={container}>
        <h2 style={{ ...typography.title, textAlign: "center", marginBottom: spacing.md }}>
          Support
        </h2>

        <p style={{ ...typography.body, textAlign: "center", marginBottom: spacing.md }}>
          Need help? Chat or call our support team.
        </p>

        {/* Chat box */}
        <div style={chatBox}>
          <textarea
            style={textarea}
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <GradientButton fullWidth onClick={handleSend}>
            Send Message
          </GradientButton>
        </div>

        {/* Call support */}
        <div style={{ marginTop: spacing.md }}>
          <GradientButton fullWidth onClick={handleCall}>
            Call Support
          </GradientButton>
        </div>
      </div>
    </PageLayout>
  );
}

/* ===== STYLES ===== */
const container = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  padding: spacing.md,
  gap: spacing.md,
};

const chatBox = {
  display: "flex",
  flexDirection: "column",
  gap: spacing.sm,
};

const textarea = {
  width: "100%",
  padding: spacing.md,
  borderRadius: 14,
  border: `1px solid ${colors.border}`,
  resize: "none",
  fontSize: 14,
  minHeight: "100px",
};