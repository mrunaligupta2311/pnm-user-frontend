 import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import GradientButton from "../components/GradientButton";
import Card from "../components/Card";
import { typography, colors, radius, spacing, shadows } from "../styles/theme";

export default function Complete() {
  const navigate = useNavigate();

  const serviceSummary = {
    vehicle: "Car",
    mechanic: "Sharma Garage",
    cost: "₹1100",
    duration: "30 mins",
    date: "03-Apr-2026",
  };

  return (
    <PageLayout>
      <div style={container}>
        
        {/* ✅ SUCCESS ICON */}
        <div style={successWrapper}>
          <div style={successCircle}>
            ✓
          </div>
          <h2 style={title}>Service Completed</h2>
          <p style={subtitle}>Your request has been successfully finished</p>
        </div>

        {/* ✅ SUMMARY CARD */}
        <Card style={card}>
          <div style={row}>
            <span style={label}>Vehicle</span>
            <span style={value}>{serviceSummary.vehicle}</span>
          </div>

          <div style={row}>
            <span style={label}>Mechanic</span>
            <span style={value}>{serviceSummary.mechanic}</span>
          </div>

          <div style={row}>
            <span style={label}>Total Paid</span>
            <span style={highlight}>₹{serviceSummary.cost}</span>
          </div>

          <div style={divider} />

          <div style={row}>
            <span style={label}>Duration</span>
            <span style={value}>{serviceSummary.duration}</span>
          </div>

          <div style={row}>
            <span style={label}>Date</span>
            <span style={value}>{serviceSummary.date}</span>
          </div>
        </Card>

        {/* ✅ ACTION BUTTONS */}
        <div style={actionBox}>
          <GradientButton
            fullWidth
            onClick={() => navigate("/history")}
          >
            View History
          </GradientButton>

          <button
            onClick={() => navigate("/vehicle")}
            style={secondaryBtn}
          >
            Book Another Service
          </button>
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
  padding: spacing.lg,
  gap: spacing.lg,
  marginTop: 56,
  marginBottom: 70,
  background: "#f9fafb",
};

/* SUCCESS SECTION */
const successWrapper = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
};

const successCircle = {
  width: 80,
  height: 80,
  borderRadius: "50%",
  background: "linear-gradient(135deg, #22c55e, #16a34a)",
  color: "#fff",
  fontSize: 36,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 10px 30px rgba(34,197,94,0.3)",
};

const title = {
  ...typography.title,
  marginTop: spacing.md,
};

const subtitle = {
  ...typography.small,
  color: colors.muted,
  marginTop: 4,
};

/* CARD */
const card = {
  padding: spacing.lg,
  borderRadius: radius.xl,
  boxShadow: shadows.strong,
  background: "#fff",
  display: "flex",
  flexDirection: "column",
  gap: spacing.md,
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const label = {
  ...typography.subtitle,
  color: colors.muted,
};

const value = {
  ...typography.subtitle,
  fontWeight: 600,
};

const highlight = {
  fontSize: 18,
  fontWeight: "700",
  color: colors.primary,
};

const divider = {
  height: 1,
  background: colors.border,
  opacity: 0.6,
};

/* ACTIONS */
const actionBox = {
  display: "flex",
  flexDirection: "column",
  gap: spacing.sm,
};

const secondaryBtn = {
  width: "100%",
  padding: "14px",
  borderRadius: radius.md,
  border: `1px solid ${colors.border}`,
  background: "#fff",
  fontWeight: 600,
  cursor: "pointer",
};