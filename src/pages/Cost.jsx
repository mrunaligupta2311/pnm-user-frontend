 import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import GradientButton from "../components/GradientButton";
import Card from "../components/Card";
import { useApp } from "../context/AppContext";

export default function Cost() {
  const navigate = useNavigate();
  const { service, mechanic, vehicle } = useApp();

  if (!service || !mechanic) return null;

  const punctureCost = service.basePrice || service.price || 0;
  const platformFee = 20;
  const visitCharge = mechanic.charge || 0;

  const vehicleExtra =
    vehicle?.type?.toLowerCase() === "car" ? 100 : 0;

  const total =
    punctureCost + platformFee + vehicleExtra + visitCharge;

  return (
    <PageLayout>
      <div style={container}>
        <h2>Cost Breakdown</h2>

        <Card style={card}>
          <Row label="Puncture Cost" value={punctureCost} />
          <Row label="Vehicle Charge" value={vehicleExtra} />
          <Row label="Platform Fee" value={platformFee} />
          <Row label="Visit Charge" value={visitCharge} />

          <hr style={{ margin: "10px 0" }} />

          <h3>Total: ₹{total}</h3>

          <p style={note}>
            ⚠️ Visit charge is FREE if work is completed.
            If cancelled, it will be charged.
          </p>
        </Card>

        <GradientButton fullWidth onClick={() => navigate("/requesting")}>
          Request Mechanic
        </GradientButton>
      </div>
    </PageLayout>
  );
}

/* ============ UI HELPERS ============ */

function Row({ label, value }) {
  return (
    <div style={row}>
      <span>{label}</span>
      <b>₹{value}</b>
    </div>
  );
}

/* ============ STYLES ============ */

const container = {
  display: "flex",
  flexDirection: "column",
  gap: 16,
};

const card = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: 14,
};

const note = {
  fontSize: 12,
  color: "#666",
  marginTop: 10,
};