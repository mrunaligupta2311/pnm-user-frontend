 import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import Card from "../components/Card";
import GradientButton from "../components/GradientButton";
import { useApp } from "../context/AppContext";
import { typography, spacing, colors } from "../styles/theme";

export default function PunctureDetails() {
  const navigate = useNavigate();
  const { setService, vehicle } = useApp();

  const services = [
    {
      id: "puncture",
      title: "Tyre Puncture Repair",
      desc: "Quick repair for flat tyres",
      basePrice: 99,
    },
    {
      id: "battery",
      title: "Battery Jumpstart",
      desc: "Dead battery assistance",
      basePrice: 149,
    },
    {
      id: "towing",
      title: "Towing Service",
      desc: "Vehicle towing support",
      basePrice: 499,
    },
  ];

  const handleSelect = (s) => {
    const vehicleExtra = vehicle?.type?.toLowerCase() === "car" ? 100 : 0;

    setService({
      ...s,
      price: s.basePrice + vehicleExtra,
    });

    navigate("/mechanics");
  };

  return (
    <PageLayout>
      <div style={container}>
        <h2 style={title}>Select Service</h2>

        {services.map((s) => (
          <Card key={s.id}>
            <div style={row}>
              <div>
                <h3>{s.title}</h3>
                <p style={desc}>{s.desc}</p>
              </div>

              <p style={price}>₹{s.basePrice}</p>
            </div>

            <GradientButton fullWidth onClick={() => handleSelect(s)}>
              Select
            </GradientButton>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
}

const container = {
  padding: spacing.md,
  marginTop: 56,
  display: "flex",
  flexDirection: "column",
  gap: spacing.md,
};

const title = {
  ...typography.title,
  textAlign: "center",
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 10,
};

const desc = {
  fontSize: 12,
  color: colors.muted,
};

const price = {
  fontWeight: 600,
};