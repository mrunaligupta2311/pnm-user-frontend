 // src/pages/Mechanics.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import Card from "../components/Card";
import GradientButton from "../components/GradientButton";
import { typography, colors, shadows, radius, spacing } from "../styles/theme";

export default function Mechanics() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  // 🔥 Realistic data structure (future API ready)
  const mechanics = [
    {
      id: 1,
      name: "Sharma Garage",
      distance: "2.5 km",
      rating: 4.7,
      eta: "10 mins",
      status: "Available",
    },
    {
      id: 2,
      name: "Ravi Motors",
      distance: "3.1 km",
      rating: 4.5,
      eta: "15 mins",
      status: "Busy",
    },
    {
      id: 3,
      name: "AutoFix",
      distance: "1.8 km",
      rating: 4.8,
      eta: "8 mins",
      status: "Available",
    },
  ];

  // 🔥 Smart pricing logic
  const getPrice = (rating, distance) => {
    const base = 80;
    const ratingFactor = rating * 40;
    const distanceFactor = parseFloat(distance) * 10;
    return Math.round(base + ratingFactor + distanceFactor);
  };

  const handleSelect = (id) => setSelected(id);

  const handleContinue = () => {
    if (!selected) return;

    const chosen = mechanics.find((m) => m.id === selected);

    // future: pass data to next page
    navigate("/cost", { state: { mechanic: chosen } });
  };

  return (
    <PageLayout>
      <div style={container}>
        {/* HEADER */}
        <h2 style={title}>Nearby Mechanics</h2>
        <p style={subtitle}>Choose the best mechanic for your service</p>

        {/* LIST */}
        <div style={list}>
          {mechanics.map((m) => {
            const isSelected = selected === m.id;
            const price = getPrice(m.rating, m.distance);

            return (
              <Card
                key={m.id}
                onClick={() => handleSelect(m.id)}
                style={{
                  ...card,
                  border: isSelected
                    ? `2px solid ${colors.primary}`
                    : `1px solid ${colors.border}`,
                  background: isSelected ? `${colors.primary}10` : "#fff",
                  boxShadow: isSelected ? shadows.card : shadows.soft,
                  transform: isSelected ? "scale(1.02)" : "scale(1)",
                }}
              >
                {/* TOP ROW */}
                <div style={row}>
                  <div>
                    <p style={name}>{m.name}</p>
                    <p style={meta}>
                      {m.distance} • {m.eta}
                    </p>
                  </div>

                  <div
                    style={{
                      ...status,
                      background:
                        m.status === "Available"
                          ? "#e6f7ec"
                          : "#fff4e5",
                      color:
                        m.status === "Available"
                          ? "#1a7f37"
                          : "#b26a00",
                    }}
                  >
                    {m.status}
                  </div>
                </div>

                {/* SECOND ROW */}
                <div style={rowBetween}>
                  <p style={rating}>⭐ {m.rating}</p>

                  <p style={priceText}>₹{price}</p>
                </div>

                {/* SELECT STATE */}
                {isSelected && (
                  <p style={selectedText}>✓ Selected</p>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* 🔥 STICKY ACTION BAR */}
      <div style={actionBar}>
        <GradientButton
          fullWidth
          onClick={handleContinue}
          style={{
            opacity: selected ? 1 : 0.5,
            pointerEvents: selected ? "auto" : "none",
          }}
        >
          {selected ? "Continue" : "Select a mechanic"}
        </GradientButton>
      </div>
    </PageLayout>
  );
}

/* ================= STYLES ================= */

const container = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  padding: spacing.md,
  gap: spacing.sm,
  marginTop: 56,
};

const title = {
  ...typography.title,
  textAlign: "center",
};

const subtitle = {
  ...typography.subtitle,
  textAlign: "center",
  color: colors.muted,
  marginBottom: spacing.sm,
};

const list = {
  display: "flex",
  flexDirection: "column",
  gap: spacing.sm,
};

/* CARD */
const card = {
  padding: spacing.md,
  borderRadius: radius.lg,
  cursor: "pointer",
  transition: "all 0.2s ease",
};

/* ROWS */
const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const rowBetween = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: spacing.xs,
};

/* TEXT */
const name = {
  ...typography.subtitle,
  fontWeight: 600,
};

const meta = {
  ...typography.small,
  color: colors.muted,
};

const rating = {
  ...typography.small,
};

const priceText = {
  ...typography.subtitle,
  color: colors.primary,
  fontWeight: 700,
};

/* STATUS BADGE */
const status = {
  fontSize: "11px",
  padding: "4px 8px",
  borderRadius: 20,
  fontWeight: 600,
};

/* SELECT TEXT */
const selectedText = {
  marginTop: spacing.xs,
  fontSize: "12px",
  color: colors.primary,
  fontWeight: 600,
};

/* ACTION BAR */
const actionBar = {
  position: "sticky",
  bottom: 0,
  padding: spacing.md,
  borderTop: `1px solid ${colors.border}`,
  background: "rgba(255,255,255,0.95)",
  backdropFilter: "blur(10px)",
};