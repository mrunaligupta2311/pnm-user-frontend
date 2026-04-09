 // src/pages/Vehicle.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import Card from "../components/Card";
import GradientButton from "../components/GradientButton";
import { typography, colors, radius, shadows, spacing } from "../styles/theme";

const vehicles = [
  { id: "bike", label: "Bike / Scooty", icon: "🛵" },
  { id: "car", label: "Car", icon: "🚗" },
  { id: "auto", label: "Auto / Riksha", icon: "🛺" },
  { id: "truck", label: "Truck", icon: "🚚" },
  { id: "bus", label: "Bus", icon: "🚌" },
  { id: "heavy", label: "Heavy Vehicle", icon: "🚛" },
];

export default function Vehicle() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const handleSelect = (id) => {
    setSelected(id);
  };

  const handleContinue = () => {
    if (!selected) return;
    navigate("/searching");
  };

  const selectedVehicle = vehicles.find((v) => v.id === selected);

  return (
    <PageLayout>
      <div style={container}>
        {/* HEADER */}
        <div style={header}>
          <h2 style={title}>Select Your Vehicle</h2>
          <p style={subtitle}>Choose your vehicle type for better service</p>
        </div>

        {/* GRID */}
        <div style={grid}>
          {vehicles.map((v) => {
            const isSelected = selected === v.id;

            return (
              <Card
                key={v.id}
                onClick={() => handleSelect(v.id)}
                style={{
                  ...card,
                  border: isSelected
                    ? `2px solid ${colors.primary}`
                    : `1px solid ${colors.border}`,
                  background: isSelected ? `${colors.primary}12` : "#fff",
                  boxShadow: isSelected ? shadows.card : shadows.soft,
                  transform: isSelected ? "scale(1.04)" : "scale(1)",
                }}
              >
                <span style={icon}>{v.icon}</span>

                <p
                  style={{
                    ...typography.subtitle,
                    fontWeight: 600,
                    color: isSelected ? colors.primary : colors.heading,
                    textAlign: "center",
                  }}
                >
                  {v.label}
                </p>

                <p
                  style={{
                    ...typography.small,
                    marginTop: 4,
                    color: isSelected ? colors.primary : colors.muted,
                  }}
                >
                  {isSelected ? "Selected ✓" : "Tap to select"}
                </p>
              </Card>
            );
          })}
        </div>

        {/* FOOTER BUTTON */}
        <div style={footer}>
          <GradientButton
            fullWidth
            onClick={handleContinue}
            style={{
              opacity: selected ? 1 : 0.5,
              pointerEvents: selected ? "auto" : "none",
            }}
          >
            {selectedVehicle
              ? `Continue with ${selectedVehicle.label}`
              : "Select a vehicle"}
          </GradientButton>
        </div>
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
  gap: spacing.md,
  marginTop: 56,
};

/* HEADER */
const header = {
  textAlign: "center",
};

const title = {
  ...typography.title,
};

const subtitle = {
  ...typography.subtitle,
  color: colors.muted,
  marginTop: 4,
};

/* GRID (RESPONSIVE) */
const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
  gap: spacing.md,
};

/* CARD */
const card = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: spacing.lg,
  borderRadius: radius.lg,
  cursor: "pointer",
  transition: "all 0.25s ease",
  minHeight: "120px",
};

/* ICON */
const icon = {
  fontSize: "34px",
  marginBottom: spacing.sm,
};

/* FOOTER */
const footer = {
  marginTop: "auto",
  paddingTop: spacing.sm,
};