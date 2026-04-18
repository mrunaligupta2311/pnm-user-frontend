 import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageLayout from "../components/PageLayout";
import GradientButton from "../components/GradientButton";
import Card from "../components/Card";
import { useApp } from "../context/AppContext";

export default function Vehicle() {
  const navigate = useNavigate();
  const { location, setVehicle } = useApp();

  const [selectedType, setSelectedType] = useState(null);
  const [number, setNumber] = useState("");

  if (!location) navigate("/location");

  const vehicles = [
    { type: "Bike", icon: "🏍️" },
    { type: "Car", icon: "🚗" },
    { type: "Auto", icon: "🛺" },
    { type: "Truck", icon: "🚚" },
  ];

  const handleContinue = () => {
    if (!selectedType || number.length < 6) {
      alert("Enter valid details");
      return;
    }

    setVehicle({ type: selectedType, number });
    navigate("/puncture");
  };

  return (
    <PageLayout>
      <h2>Select Your Vehicle</h2>

      <div style={grid}>
        {vehicles.map((v) => {
          const active = selectedType === v.type;

          return (
            <Card
              key={v.type}
              onClick={() => setSelectedType(v.type)}
              style={{
                border: active ? "2px solid #0f2a55" : "2px solid transparent",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 28 }}>{v.icon}</div>
              <p>{v.type}</p>
            </Card>
          );
        })}
      </div>

      <Card>
        <input
          value={number}
          onChange={(e) => setNumber(e.target.value.toUpperCase())}
          placeholder="Vehicle Number"
        />
      </Card>

      <GradientButton fullWidth onClick={handleContinue}>
        Continue
      </GradientButton>
    </PageLayout>
  );
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(2,1fr)",
  gap: 10,
};