 import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import GradientButton from "../components/GradientButton";
import { useApp } from "../context/AppContext";

export default function Complete() {
  const navigate = useNavigate();
  const { service, mechanic, resetFlow } = useApp();

  const handleDone = () => {
    resetFlow();
    navigate("/history");
  };

  return (
    <PageLayout>
      <div style={{ marginTop: 100, textAlign: "center", padding: 16 }}>
        <h2>Service Completed 🎉</h2>

        <p>{service?.title}</p>
        <p>Mechanic: {mechanic?.name}</p>

        <GradientButton fullWidth onClick={handleDone}>
          Go to History
        </GradientButton>
      </div>
    </PageLayout>
  );
}