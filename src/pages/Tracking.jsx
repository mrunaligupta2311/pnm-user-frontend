 import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import PageLayout from "../components/PageLayout";
import { useApp } from "../context/AppContext";

export default function Tracking() {
  const navigate = useNavigate();
  const { mechanic } = useApp();

  const [position, setPosition] = useState([22.3072, 73.1812]);
  const [step, setStep] = useState(0);

  const flow = [
    "Accepted",
    "On the way",
    "Arriving",
    "Arrived",
    "Work Started",
    "Completed",
  ];

  /* MOVE */
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => [
        prev[0] + 0.0003,
        prev[1] + 0.0003,
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  /* STATUS */
  useEffect(() => {
    if (step >= flow.length - 1) {
      setTimeout(() => navigate("/complete"), 2500);
      return;
    }

    const t = setTimeout(() => setStep((s) => s + 1), 3500);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <PageLayout>
      <div style={{ marginTop: 56 }}>
        <MapContainer center={position} zoom={13} style={{ height: "50vh" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position} />
        </MapContainer>

        <div style={{ padding: 20, textAlign: "center" }}>
          <h3>{mechanic?.name || "Mechanic"}</h3>
          <p>{flow[step]}</p>
        </div>
      </div>
    </PageLayout>
  );
}