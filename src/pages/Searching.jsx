 import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import { useApp } from "../context/AppContext";

export default function Searching() {
  const navigate = useNavigate();
  const { service } = useApp();

  useEffect(() => {
    if (!service) {
      navigate("/puncture");
      return;
    }

    const timer = setTimeout(() => {
      navigate("/mechanics");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <PageLayout>
      <div style={{ marginTop: 100, textAlign: "center" }}>
        <h2>Finding nearby mechanics...</h2>
        <p style={{ color: "#666" }}>Please wait</p>
      </div>
    </PageLayout>
  );
}