import { useState } from "react";

export default function ChatSheet({ open, onClose }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;

    setMessages((m) => [...m, { text, from: "user" }]);
    setText("");

    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { text: "Mechanic will reply soon.", from: "bot" },
      ]);
    }, 800);
  };

  if (!open) return null;

  return (
    <div style={overlay} onClick={onClose}>
      <div style={sheet} onClick={(e) => e.stopPropagation()}>

        <h3>Chat</h3>

        <div style={chatBox}>
          {messages.map((m, i) => (
            <p key={i} style={{ textAlign: m.from === "user" ? "right" : "left" }}>
              {m.text}
            </p>
          ))}
        </div>

        <div style={inputRow}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type..."
            style={input}
          />

          <button onClick={send} style={sendBtn}>Send</button>
        </div>

      </div>
    </div>
  );
}

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
};

const sheet = {
  position: "absolute",
  bottom: 0,
  width: "100%",
  background: "#fff",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  padding: 16,
};

const chatBox = {
  height: 200,
  overflowY: "auto",
  marginBottom: 10,
};

const inputRow = {
  display: "flex",
  gap: 10,
};

const input = {
  flex: 1,
  padding: 10,
  border: "1px solid #ddd",
  borderRadius: 10,
};

const sendBtn = {
  padding: "10px 14px",
  background: "#0f2a55",
  color: "#fff",
  border: "none",
  borderRadius: 10,
};