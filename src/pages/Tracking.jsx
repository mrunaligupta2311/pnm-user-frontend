 // src/pages/Tracking.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import GradientButton from "../components/GradientButton";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { colors, radius, spacing, shadows } from "../styles/theme";

export default function Tracking() {
  const navigate = useNavigate();
  const timerRef = useRef(null);

  const mechanic = {
    name: "Sharma Garage",
    phone: "+919876543210",
    location: [22.3072, 73.1812],
  };

  const statusFlow = [
    "Accepted",
    "On the way",
    "Arriving",
    "Arrived",
    "Work Started",
    "Completed",
  ];

  const [statusIndex, setStatusIndex] = useState(0);
  const [showCall, setShowCall] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [message, setMessage] = useState("");

  /* ===== STATUS FLOW ===== */
  useEffect(() => {
    if (statusIndex >= statusFlow.length - 1) {
      timerRef.current = setTimeout(() => {
        navigate("/complete");
      }, 3000);
      return () => clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setStatusIndex((prev) => prev + 1);
    }, 4000);

    return () => clearTimeout(timerRef.current);
  }, [statusIndex]);

  /* ===== ACTIONS ===== */
  const handleCancel = () => {
    if (window.confirm("Cancel request?")) {
      navigate("/mechanics");
    }
  };

  const handleSendMsg = () => {
    if (!message.trim()) return;
    alert("Message sent");
    setMessage("");
    setShowMsg(false);
  };

  return (
    <PageLayout>
      <div style={container}>

        {/* 🔥 MAP */}
        <div style={mapWrapper}>
          <MapContainer
            center={mechanic.location}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={mechanic.location}>
              <Popup>{mechanic.name}</Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* 🔥 PREMIUM TIMELINE */}
        <div style={timeline}>
          {statusFlow.map((label, i) => {
            const active = i <= statusIndex;
            const current = i === statusIndex;

            return (
              <div key={i} style={stepContainer}>
                {/* Circle + Line */}
                <div style={stepTop}>
                  <div
                    style={{
                      ...circle,
                      background: active ? colors.primary : "#e5e7eb",
                      transform: current ? "scale(1.3)" : "scale(1)",
                    }}
                  />

                  {i !== statusFlow.length - 1 && (
                    <div
                      style={{
                        ...line,
                        background:
                          i < statusIndex ? colors.primary : "#e5e7eb",
                      }}
                    />
                  )}
                </div>

                {/* 🔥 STATUS TEXT BELOW */}
                <p
                  style={{
                    ...stepLabel,
                    color: current ? colors.primary : "#6b7280",
                    fontWeight: current ? 600 : 400,
                  }}
                >
                  {label}
                </p>
              </div>
            );
          })}
        </div>

        {/* 🔥 BOTTOM SHEET */}
        <div style={bottomSheet}>
          <p style={name}>{mechanic.name}</p>

          <div style={buttonRow}>
            <button style={actionBtn} onClick={() => setShowCall(true)}>
              📞 Call
            </button>

            <button style={actionBtn} onClick={() => setShowMsg(true)}>
              💬 Message
            </button>
          </div>

          <GradientButton fullWidth onClick={handleCancel} style={cancelBtn}>
            Cancel Request
          </GradientButton>
        </div>

        {/* 📞 CALL MODAL */}
        {showCall && (
          <Modal onClose={() => setShowCall(false)}>
            <p style={modalTitle}>Call {mechanic.name}</p>
            <p style={phone}>{mechanic.phone}</p>

            <div style={modalRow}>
              <a href={`tel:${mechanic.phone}`} style={callBtn}>
                Call Now
              </a>

              <button style={closeBtn} onClick={() => setShowCall(false)}>
                Close
              </button>
            </div>
          </Modal>
        )}

        {/* 💬 MESSAGE MODAL */}
        {showMsg && (
          <Modal onClose={() => setShowMsg(false)}>
            <p style={modalTitle}>Send Message</p>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type message..."
              style={textarea}
            />

            <div style={modalRow}>
              <button style={sendBtn} onClick={handleSendMsg}>
                Send
              </button>

              <button style={closeBtn} onClick={() => setShowMsg(false)}>
                Close
              </button>
            </div>
          </Modal>
        )}
      </div>
    </PageLayout>
  );
}

/* ===== MODAL ===== */
function Modal({ children, onClose }) {
  return (
    <div style={overlay} onClick={onClose}>
      <div style={modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

/* ===== STYLES ===== */

const container = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  background: "#f9fafb",
  marginTop: 56,
  marginBottom: 70,
};

/* MAP */
const mapWrapper = {
  height: "42vh",
};

/* TIMELINE */
const timeline = {
  display: "flex",
  justifyContent: "space-between",
  padding: "16px",
  background: "#fff",
};

const stepContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flex: 1,
};

const stepTop = {
  display: "flex",
  alignItems: "center",
  width: "100%",
};

const circle = {
  width: 10,
  height: 10,
  borderRadius: "50%",
};

const line = {
  flex: 1,
  height: 2,
};

const stepLabel = {
  fontSize: 11,
  marginTop: 6,
  textAlign: "center",
};

/* BOTTOM */
const bottomSheet = {
  padding: 16,
  background: "#fff",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
};

const name = {
  fontSize: 16,
  fontWeight: 600,
  marginBottom: 10,
};

const buttonRow = {
  display: "flex",
  gap: 10,
  marginBottom: 12,
};

const actionBtn = {
  flex: 1,
  padding: "12px",
  borderRadius: 10,
  border: "1px solid #ddd",
  background: "#fff",
  cursor: "pointer",
};

const cancelBtn = {
  background: colors.danger,
};

/* MODAL */
const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 2000,
};

const modal = {
  background: "#fff",
  padding: 20,
  borderRadius: 12,
  width: "90%",
  maxWidth: 320,
  boxShadow: shadows.strong,
};

const modalTitle = { fontWeight: 600 };
const phone = { textAlign: "center", marginTop: 5 };

const modalRow = {
  display: "flex",
  gap: 10,
  marginTop: 10,
};

const callBtn = {
  flex: 1,
  padding: 10,
  background: "#22c55e",
  color: "#fff",
  borderRadius: 8,
  textAlign: "center",
  textDecoration: "none",
};

const sendBtn = {
  flex: 1,
  padding: 10,
  background: "#3b82f6",
  color: "#fff",
  border: "none",
  borderRadius: 8,
};

const closeBtn = {
  flex: 1,
  padding: 10,
  background: "#ddd",
  border: "none",
  borderRadius: 8,
};

const textarea = {
  width: "100%",
  marginTop: 10,
  padding: 10,
  borderRadius: 8,
  border: "1px solid #ccc",
};