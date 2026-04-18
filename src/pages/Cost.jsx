 import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import GradientButton from "../components/GradientButton";
import Card from "../components/Card";
import { useApp } from "../context/AppContext";

export default function Cost() {
  const navigate = useNavigate();
  const { service, mechanic, vehicle } = useApp();

  if (!service || !mechanic) return null;

  const vehicleExtra =
    vehicle?.type?.toLowerCase() === "car" ? 100 : 0;

  const platformFee = 20;

  const total =
    service.price + mechanic.charge + platformFee + vehicleExtra;

  return (
    <PageLayout>
      <div style={{ marginTop: 56, padding: 16 }}>
        <h2>Cost Breakdown</h2>

        <Card>
          <p>Service: ₹{service.price}</p>
          <p>Vehicle Charge: ₹{vehicleExtra}</p>
          <p>Mechanic Visit: ₹{mechanic.charge}</p>
          <p>Platform Fee: ₹{platformFee}</p>

          <hr />

          <h3>Total: ₹{total}</h3>
        </Card>

        <p style={{ fontSize: 12, color: "#666" }}>
          Agar kaam nahi karwaya to visit charge lagega.  
          Kaam karwaya to visit free hoga.
        </p>

        <GradientButton fullWidth onClick={() => navigate("/requesting")}>
          Request Mechanic
        </GradientButton>
      </div>
    </PageLayout>
  );
}