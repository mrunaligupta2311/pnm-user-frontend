 import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import Card from "../components/Card";
import GradientButton from "../components/GradientButton";
import { useApp } from "../context/AppContext";

export default function Complete() {
  const navigate = useNavigate();
  const { service, mechanic, vehicle, resetFlow } = useApp();

  const handleDone = () => {
    const old = JSON.parse(localStorage.getItem("pnm_history")) || [];

    const newBooking = {
      id: Date.now(),
      service: service?.title,
      mechanic: mechanic?.name,
      vehicle: vehicle?.number,
      price: service?.price,
      date: new Date().toLocaleString(),
      status: "Completed",
    };

    localStorage.setItem(
      "pnm_history",
      JSON.stringify([newBooking, ...old])
    );

    resetFlow();
    navigate("/history");
  };

  return (
    <PageLayout>
      <div style={container}>

        <h2>Service Completed 🎉</h2>

        <Card>

          <h3>Invoice Summary</h3>

          <Row label="Service" value={service?.title} />
          <Row label="Mechanic" value={mechanic?.name} />
          <Row label="Vehicle" value={vehicle?.number} />
          <Row label="Amount Paid" value={`₹${service?.price}`} />

          <p style={note}>
            Thank you for using our service 🙌
          </p>

        </Card>

        <GradientButton fullWidth onClick={handleDone}>
          Go to History
        </GradientButton>

      </div>
    </PageLayout>
  );
}

/* ================= UI HELPERS ================= */

function Row({ label, value }) {
  return (
    <div style={row}>
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  display: "flex",
  flexDirection: "column",
  gap: 16,
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: 14,
  marginTop: 6,
};

const note = {
  marginTop: 10,
  fontSize: 12,
  color: "#666",
};