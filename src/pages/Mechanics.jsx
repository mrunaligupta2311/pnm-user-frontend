 import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import Card from "../components/Card";
import GradientButton from "../components/GradientButton";
import { useApp } from "../context/AppContext";

export default function Mechanics() {
  const navigate = useNavigate();
  const { setMechanic } = useApp();

  const mechanics = [
    { id: 1, name: "Sharma Garage", rating: 4.5, distance: 1.2, charge: 80 },
    { id: 2, name: "QuickFix Auto", rating: 4.2, distance: 2.5, charge: 60 },
    { id: 3, name: "Speed Mechanic", rating: 4.8, distance: 1.8, charge: 100 },
  ];

  const handleSelect = (m) => {
    setMechanic(m);
    navigate("/cost");
  };

  return (
    <PageLayout>
      <div style={{ marginTop: 56, padding: 16 }}>
        <h2>Select Mechanic</h2>

        {mechanics.map((m) => (
          <Card key={m.id}>
            <h3>{m.name}</h3>
            <p>⭐ {m.rating} • {m.distance} km</p>
            <p>Visit Charge: ₹{m.charge}</p>

            <GradientButton fullWidth onClick={() => handleSelect(m)}>
              Select
            </GradientButton>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
}