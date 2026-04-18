 import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageLayout from "../components/PageLayout";
import GradientButton from "../components/GradientButton";
import Card from "../components/Card";
import { useApp } from "../context/AppContext";

export default function Vehicle() {
  const navigate = useNavigate();
  const { location, setVehicle } = useApp();

  if (!location) navigate("/location");

  /* ================= STATE ================= */
  const [vehicleType, setVehicleType] = useState(null);
  const [customVehicle, setCustomVehicle] = useState("");

  const [stateCode, setStateCode] = useState("GJ");
  const [rto, setRto] = useState("06");
  const [series, setSeries] = useState("");
  const [number, setNumber] = useState("");

  const [isTemp, setIsTemp] = useState(false);
  const [tempNumber, setTempNumber] = useState("");

  /* ================= VEHICLES ================= */
  const vehicles = [
    { type: "Bike", icon: "🏍️" },
    { type: "Car", icon: "🚗" },
    { type: "Scooty", icon: "🛵" },
    { type: "Auto", icon: "🛺" },
    { type: "Van", icon: "🚐" },
    { type: "Truck", icon: "🚚" },
    { type: "Bus", icon: "🚌" },
    { type: "EV", icon: "⚡" },
    { type: "Other", icon: "➕" },
  ];

  const states = ["GJ", "MH", "DL", "RJ", "UP", "HR", "TN"];

  /* ================= FORMAT ================= */
  const formatNumber = () => {
    if (isTemp) return tempNumber;

    return `${stateCode} ${rto} ${series.toUpperCase()} ${number}`;
  };

  /* ================= CONTINUE ================= */
  const handleContinue = () => {
    if (!vehicleType) return alert("Select vehicle type");

    if (vehicleType === "Other" && !customVehicle.trim()) {
      return alert("Enter vehicle name");
    }

    if (isTemp) {
      if (!tempNumber) return alert("Enter temporary number");
    } else {
      if (!stateCode || !rto || !series || !number)
        return alert("Fill complete vehicle number");
    }

    setVehicle({
      type: vehicleType === "Other" ? customVehicle : vehicleType,
      number: formatNumber(),
      isTemp,
    });

    navigate("/puncture");
  };

  const continueText =
    vehicleType === "Other"
      ? "Continue with Custom Vehicle"
      : vehicleType
      ? `Continue with ${vehicleType}`
      : "Continue";

  return (
    <PageLayout>
      <div style={container}>

        <h2 style={title}>Select Vehicle</h2>

        {/* ================= VEHICLE GRID ================= */}
        <div style={grid}>
          {vehicles.map((v) => (
            <Card
              key={v.type}
              onClick={() => setVehicleType(v.type)}
              style={{
                textAlign: "center",
                border:
                  vehicleType === v.type
                    ? "2px solid #4F46E5"
                    : "1px solid #e5e7eb",
                cursor: "pointer",
              }}
            >
              <div style={{ fontSize: 26 }}>{v.icon}</div>
              <p>{v.type}</p>
            </Card>
          ))}
        </div>

        {/* ================= CUSTOM VEHICLE ================= */}
        {vehicleType === "Other" && (
          <Card>
            <p style={label}>Enter Vehicle Name</p>
            <input
              value={customVehicle}
              onChange={(e) => setCustomVehicle(e.target.value)}
              placeholder="e.g. Electric Rickshaw / Crane / JCB"
              style={inputFull}
            />
          </Card>
        )}

        {/* ================= TOGGLE ================= */}
        <div style={toggleRow}>
          <button
            style={{
              ...toggleBtn,
              background: !isTemp ? "#4F46E5" : "#eee",
              color: !isTemp ? "#fff" : "#000",
            }}
            onClick={() => setIsTemp(false)}
          >
            Regular Vehicle
          </button>

          <button
            style={{
              ...toggleBtn,
              background: isTemp ? "#4F46E5" : "#eee",
              color: isTemp ? "#fff" : "#000",
            }}
            onClick={() => setIsTemp(true)}
          >
            Temporary / New
          </button>
        </div>

        {/* ================= REGULAR VEHICLE ================= */}
        {!isTemp && (
          <Card>
            <p style={label}>Vehicle Number Format</p>

            <div style={row}>
              <select
                value={stateCode}
                onChange={(e) => setStateCode(e.target.value)}
                style={inputSmall}
              >
                {states.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>

              <input
                value={rto}
                onChange={(e) => setRto(e.target.value)}
                placeholder="06"
                style={inputSmall}
                maxLength={2}
              />

              <input
                value={series}
                onChange={(e) => setSeries(e.target.value)}
                placeholder="AB"
                style={inputSmall}
                maxLength={2}
              />

              <input
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="6024"
                style={inputSmall}
                maxLength={4}
              />
            </div>

            <p style={preview}>
              Preview: <b>{formatNumber()}</b>
            </p>
          </Card>
        )}

        {/* ================= TEMP VEHICLE ================= */}
        {isTemp && (
          <Card>
            <p style={label}>Temporary Vehicle Number</p>

            <input
              value={tempNumber}
              onChange={(e) => setTempNumber(e.target.value.toUpperCase())}
              placeholder="TEMP-AX1234"
              style={inputFull}
            />
          </Card>
        )}

        {/* ================= CTA ================= */}
        <GradientButton fullWidth onClick={handleContinue}>
          {continueText}
        </GradientButton>

      </div>
    </PageLayout>
  );
}

/* ================= STYLES ================= */

const container = {
  display: "flex",
  flexDirection: "column",
  gap: 14,
};

const title = {
  fontSize: 20,
  fontWeight: 700,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(2,1fr)",
  gap: 10,
};

const toggleRow = {
  display: "flex",
  gap: 10,
};

const toggleBtn = {
  flex: 1,
  padding: 10,
  border: "none",
  borderRadius: 10,
  cursor: "pointer",
};

const row = {
  display: "flex",
  gap: 8,
  marginTop: 10,
};

const inputSmall = {
  flex: 1,
  padding: 10,
  border: "1px solid #ddd",
  borderRadius: 10,
  textAlign: "center",
};

const inputFull = {
  width: "100%",
  padding: 12,
  border: "1px solid #ddd",
  borderRadius: 10,
};

const label = {
  fontSize: 13,
  color: "#666",
};

const preview = {
  marginTop: 10,
  fontSize: 13,
  color: "#444",
};