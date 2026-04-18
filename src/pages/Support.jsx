 import { useState } from "react";
import PageLayout from "../components/PageLayout";
import { spacing } from "../styles/theme";

export default function Support() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;

    const userMsg = { text, from: "user" };

    setMessages((prev) => [...prev, userMsg]);
    setText("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "We will help you shortly.", from: "bot" },
      ]);
    }, 800);
  };

  return (
    <PageLayout>
      <div style={container}>
        <h2>Support</h2>

        <div style={chatBox}>
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                textAlign: m.from === "user" ? "right" : "left",
                marginBottom: 8,
              }}
            >
              {m.text}
            </div>
          ))}
        </div>

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
          style={input}
        />

        <button onClick={send}>Send</button>
      </div>
    </PageLayout>
  );
}

const container = {
  padding: spacing.md,
  marginTop: 56,
};

const chatBox = {
  height: 300,
  overflowY: "auto",
  marginBottom: 10,
};

const input = {
  width: "100%",
  padding: 10,
};