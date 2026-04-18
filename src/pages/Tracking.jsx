 import { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";

import PageLayout from "../components/PageLayout";
import Card from "../components/Card";
import { useApp } from "../context/AppContext";
import { colors } from "../styles/theme";

/* ================= FIT MAP ================= */
function FitBounds({ userPos, mechPos }) {
  const map = useMap();

  useEffect(() => {
    if (!userPos || !mechPos) return;
    map.fitBounds([userPos, mechPos], { padding: [60, 60] });
  }, [userPos, mechPos]);

  return null;
}

export default function Tracking() {
  const navigate = useNavigate();
  const { mechanic, vehicle, location, resetFlow } = useApp();

  const userPosition = useMemo(
    () =>
      location?.lat
        ? [location.lat, location.lng]
        : [22.3072, 73.1812],
    [location]
  );

  const [mechanicPos, setMechanicPos] = useState([22.312, 73.185]);
  const [statusIndex, setStatusIndex] = useState(0);
  const [showCancel, setShowCancel] = useState(false);

  const hasNavigated = useRef(false);

  const statusFlow = useMemo(
    () => [
      "Request Accepted",
      "Mechanic Assigned",
      "On the Way",
      "Arriving Soon",
      "Reached Location",
    ],
    []
  );

  /* ================= MOCK MOVEMENT ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      setMechanicPos((p) => [p[0] - 0.00012, p[1] - 0.00012]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  /* ================= STATUS ================= */
  useEffect(() => {
    if (statusIndex >= statusFlow.length - 1) return;

    const t = setTimeout(() => {
      setStatusIndex((s) => s + 1);
    }, 3000);

    return () => clearTimeout(t);
  }, [statusIndex]);

  /* ================= NAVIGATION ================= */
  useEffect(() => {
    if (statusIndex === statusFlow.length - 1 && !hasNavigated.current) {
      hasNavigated.current = true;

      const t = setTimeout(() => {
        navigate("/WorkProgress");
      }, 1500);

      return () => clearTimeout(t);
    }
  }, [statusIndex, navigate]);

  const handleCall = () => {
    if (!mechanic?.phone) return alert("Number not available");
    window.location.href = `tel:${mechanic.phone}`;
  };

  const handleCancel = () => {
    resetFlow();
    navigate("/mechanics");
  };

  return (
    <PageLayout>
      <div style={container}>

        {/* ================= MAP ================= */}
        <div style={mapBox}>
          <MapContainer
            center={userPosition}
            zoom={14}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <Marker position={userPosition} />
            <Marker position={mechanicPos} />

            <Polyline positions={[userPosition, mechanicPos]} />

            <FitBounds userPos={userPosition} mechPos={mechanicPos} />
          </MapContainer>

          <div style={statusChip}>
            {statusFlow[statusIndex]}
          </div>
        </div>

        {/* ================= INFO ================= */}
        <Card>
          <h3>{mechanic?.name || "Mechanic"}</h3>

          <p style={text}>🚗 Vehicle: <b>{vehicle?.type}</b></p>
          <p style={text}>🔢 Number: <b>{vehicle?.number}</b></p>
          <p style={text}>📍 Status: <b>{statusFlow[statusIndex]}</b></p>
          <p style={text}>📞 Phone: <b>{mechanic?.phone || "N/A"}</b></p>
        </Card>

        {/* ================= ACTIONS ================= */}
        <div style={row}>
          <button style={callBtn} onClick={handleCall}>
            Call
          </button>

          <button style={cancelBtn} onClick={() => setShowCancel(true)}>
            Cancel
          </button>
        </div>

        {/* ================= MODAL ================= */}
        {showCancel && (
          <div style={overlay} onClick={() => setShowCancel(false)}>
            <div style={modal} onClick={(e) => e.stopPropagation()}>
              <h3>Cancel Request?</h3>

              <p style={{ fontSize: 13, color: "#666" }}>
                Charges may apply if mechanic is en route.
              </p>

              <div style={{ display: "flex", gap: 10 }}>
                <button style={noBtn} onClick={() => setShowCancel(false)}>
                  No
                </button>

                <button style={yesBtn} onClick={handleCancel}>
                  Yes Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </PageLayout>
  );
}

/* ================= STYLES ================= */

const container = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const mapBox = {
  height: 260,
  borderRadius: 16,
  overflow: "hidden",
  position: "relative",
};

/* 🔥 FIX OVERLAP: move zoom controls down */
const globalFix = `
.leaflet-control-zoom {
  margin-top: 55px !important;
}
`;

if (typeof document !== "undefined") {
  let style = document.getElementById("leaflet-fix-style");
  if (!style) {
    style = document.createElement("style");
    style.id = "leaflet-fix-style";
    style.innerHTML = globalFix;
    document.head.appendChild(style);
  }
}

const statusChip = {
  position: "absolute",
  top: 12,
  left: 12,
  background: colors.primary,
  color: "#fff",
  padding: "6px 10px",
  borderRadius: 20,
  fontSize: 12,
  zIndex: 1000,
};

const text = {
  fontSize: 13,
  marginTop: 4,
};

const row = {
  display: "flex",
  gap: 10,
};

const callBtn = {
  flex: 1,
  padding: 12,
  background: "#22c55e",
  border: "none",
  borderRadius: 12,
  color: "#fff",
};

const cancelBtn = {
  flex: 1,
  padding: 12,
  background: "#ef4444",
  border: "none",
  borderRadius: 12,
  color: "#fff",
};

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const modal = {
  background: "#fff",
  padding: 16,
  borderRadius: 14,
  width: "85%",
  maxWidth: 320,
};

const noBtn = {
  flex: 1,
  padding: 10,
  borderRadius: 10,
  border: "1px solid #ccc",
};

const yesBtn = {
  flex: 1,
  padding: 10,
  borderRadius: 10,
  border: "none",
  background: "#ef4444",
  color: "#fff",
};