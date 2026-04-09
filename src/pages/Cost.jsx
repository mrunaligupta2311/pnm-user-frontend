 // src/pages/Cost.jsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import Card from "../components/Card";
import GradientButton from "../components/GradientButton";
import { typography, colors, spacing, radius, shadows } from "../styles/theme";

export default function Cost() {
  const navigate = useNavigate();
  const location = useLocation();

  const [paymentMethod, setPaymentMethod] = useState("UPI");

  // 🔥 Get data from previous page (fallback safe)
  const mechanic = location.state?.mechanic || {
    name: "Sharma Garage",
    distance: "2.5 km",
    rating: 4.7,
  };

  const serviceDetails = {
    mechanic: mechanic.name,
    vehicle: "Car",
    distance: mechanic.distance,
    punctureFee: 1000,
    platformFee: 100,
  };

  const total =
    serviceDetails.punctureFee + serviceDetails.platformFee;

  const handleConfirm = () => {
    navigate("/requesting", {
      state: {
        ...serviceDetails,
        total,
        paymentMethod,
      },
    });
  };

  return (
    <PageLayout>
      <div style={container}>
        {/* HEADER */}
        <h2 style={title}>Cost Summary</h2>
        <p style={subtitle}>Review details before confirming</p>

        {/* 🔥 SERVICE CARD */}
        <Card style={card}>
          <div style={row}>
            <span style={label}>Mechanic</span>
            <span style={value}>{serviceDetails.mechanic}</span>
          </div>

          <div style={row}>
            <span style={label}>Vehicle</span>
            <span style={value}>{serviceDetails.vehicle}</span>
          </div>

          <div style={row}>
            <span style={label}>Distance</span>
            <span style={value}>{serviceDetails.distance}</span>
          </div>

          <div style={divider} />

          <div style={row}>
            <span style={label}>Service Fee</span>
            <span style={value}>
              ₹{serviceDetails.punctureFee}
            </span>
          </div>

          <div style={row}>
            <span style={label}>Platform Fee</span>
            <span style={value}>
              ₹{serviceDetails.platformFee}
            </span>
          </div>

          <div style={divider} />

          <div style={totalRow}>
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </Card>

        {/* 🔥 PAYMENT SECTION */}
        <div style={paymentBox}>
          <p style={paymentTitle}>Payment Method</p>

          <div style={paymentOptions}>
            {[
              { id: "UPI", icon: "💳" },
              { id: "Wallet", icon: "👛" },
              { id: "Cash", icon: "💵" },
            ].map((method) => {
              const isActive = paymentMethod === method.id;

              return (
                <div
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  style={{
                    ...paymentCard,
                    border: isActive
                      ? `2px solid ${colors.primary}`
                      : `1px solid ${colors.border}`,
                    background: isActive
                      ? `${colors.primary}10`
                      : "#fff",
                  }}
                >
                  <span style={paymentIcon}>{method.icon}</span>
                  <span style={paymentLabel}>{method.id}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 🔥 STICKY CTA */}
      <div style={actionBar}>
        <GradientButton fullWidth onClick={handleConfirm}>
          Confirm & Request Mechanic • ₹{total}
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
  gap: spacing.md,
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
};

/* CARD */
const card = {
  padding: spacing.lg,
  borderRadius: radius.lg,
  boxShadow: shadows.card,
  display: "flex",
  flexDirection: "column",
  gap: spacing.sm,
};

/* ROW */
const row = {
  display: "flex",
  justifyContent: "space-between",
};

/* TEXT */
const label = {
  ...typography.small,
  color: colors.muted,
};

const value = {
  ...typography.subtitle,
  fontWeight: 600,
};

/* DIVIDER */
const divider = {
  height: "1px",
  background: colors.border,
  margin: `${spacing.sm} 0`,
};

/* TOTAL */
const totalRow = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "18px",
  fontWeight: 700,
  color: colors.heading,
};

/* PAYMENT */
const paymentBox = {
  padding: spacing.md,
  borderRadius: radius.lg,
  background: "#f9fafb",
};

const paymentTitle = {
  ...typography.small,
  marginBottom: spacing.sm,
};

const paymentOptions = {
  display: "flex",
  gap: spacing.sm,
};

const paymentCard = {
  flex: 1,
  padding: spacing.sm,
  borderRadius: radius.md,
  textAlign: "center",
  cursor: "pointer",
  transition: "all 0.2s ease",
};

const paymentIcon = {
  fontSize: "18px",
  display: "block",
};

const paymentLabel = {
  fontSize: "12px",
  marginTop: "4px",
};

/* ACTION BAR */
const actionBar = {
  position: "sticky",
  bottom: 0,
  padding: spacing.md,
  background: "rgba(255,255,255,0.95)",
  borderTop: `1px solid ${colors.border}`,
  backdropFilter: "blur(10px)",
};