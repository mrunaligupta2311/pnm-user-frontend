 import { useState, useRef, useEffect } from "react";
import PageLayout from "../components/PageLayout";
import Card from "../components/Card";

import {
  spacing,
  colors,
  radius,
} from "../styles/theme";

export default function Support() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const chatRef = useRef(null);

  const send = () => {
    if (!text.trim()) return;

    const userMsg = { text, from: "user" };

    setMessages((prev) => [...prev, userMsg]);
    setText("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "We received your request. Our support team will respond shortly.",
          from: "bot",
        },
      ]);
    }, 700);
  };

  /* auto scroll */
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <PageLayout>

      <div style={container}>

        {/* HEADER */}
        <h2 style={title}>Support</h2>
        <p style={subtitle}>We usually respond within minutes</p>

        {/* CHAT AREA */}
        <Card style={chatBox}>

          <div ref={chatRef} style={messagesBox}>

            {messages.length === 0 && (
              <p style={empty}>Start a conversation 👋</p>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  ...bubble,
                  alignSelf: m.from === "user" ? "flex-end" : "flex-start",
                  background:
                    m.from === "user" ? colors.primary : "#f1f5f9",
                  color: m.from === "user" ? "#fff" : colors.text,
                }}
              >
                {m.text}
              </div>
            ))}

          </div>

        </Card>

        {/* INPUT AREA */}
        <div style={inputBar}>

          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message..."
            style={input}
          />

          <button style={btn} onClick={send}>
            Send
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
  gap: spacing.md,
};

const title = {
  fontSize: 20,
  fontWeight: 700,
  textAlign: "center",
};

const subtitle = {
  fontSize: 12,
  color: colors.muted,
  textAlign: "center",
};

const chatBox = {
  padding: 0,
  height: "55vh",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

const messagesBox = {
  flex: 1,
  padding: spacing.md,
  display: "flex",
  flexDirection: "column",
  gap: 10,
  overflowY: "auto",
};

const bubble = {
  maxWidth: "75%",
  padding: "10px 12px",
  borderRadius: radius.lg,
  fontSize: 13,
  lineHeight: 1.4,
};

const empty = {
  textAlign: "center",
  fontSize: 12,
  color: colors.muted,
  marginTop: 20,
};

/* INPUT BAR */
const inputBar = {
  display: "flex",
  gap: 8,
  padding: spacing.sm,
  background: "#fff",
  borderRadius: radius.lg,
  border: `1px solid #e5e7eb`,
};

const input = {
  flex: 1,
  border: "none",
  outline: "none",
  fontSize: 14,
};

const btn = {
  background: colors.primary,
  color: "#fff",
  border: "none",
  padding: "10px 14px",
  borderRadius: radius.md,
  cursor: "pointer",
};