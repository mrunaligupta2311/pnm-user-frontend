 import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";

export default function Requesting() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const accepted = Math.random() > 0.25;

      if (accepted) {
        navigate("/tracking");
      } else {
        alert("Mechanic declined. Try another.");
        navigate("/mechanics");
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <PageLayout>
      <div style={{ marginTop: 120, textAlign: "center" }}>
        <h2>Requesting Mechanic...</h2>
        <p style={{ color: "#666" }}>Connecting you to nearby mechanic</p>
      </div>
    </PageLayout>
  );
}