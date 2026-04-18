 import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import Card from "../components/Card";
import GradientButton from "../components/GradientButton";
import { useApp } from "../context/AppContext";
import { colors } from "../styles/theme";

export default function WorkProgress() {
  const navigate = useNavigate();
  const { service, mechanic } = useApp();

  const [state, setState] = useState("inspection");

  const [updated, setUpdated] = useState(null);

  /* ================= AUTO INSPECTION START ================= */
  useEffect(() => {
    const t = setTimeout(() => {
      setUpdated({
        original: service?.price || 0,
        extra: 70,
        reason: "Deep puncture detected, tyre needs reinforced patching",
      });

      setState("review");
    }, 2500);

    return () => clearTimeout(t);
  }, []);

  /* ================= ACCEPT ================= */
  const acceptChanges = () => {
    setState("working");

    setTimeout(() => {
      setState("done");
      navigate("/complete");
    }, 3000);
  };

  /* ================= REJECT ================= */
  const rejectChanges = () => {
    alert("Job cancelled. Visit charge may apply.");
    navigate("/mechanics");
  };

  return (
    <PageLayout>
      <div style={container}>

        {/* ================= TITLE ================= */}
        <h2 style={{ marginBottom: 4 }}>Work Progress</h2>
        <p style={{ fontSize: 13, color: "#666" }}>
          Live service updates from mechanic
        </p>

        {/* ================= MECHANIC CARD ================= */}
        <Card>
          <h3>{mechanic?.name || "Assigned Mechanic"}</h3>

          <p style={text}>🛠️ Service: Puncture Repair</p>
          <p style={text}>🚗 Vehicle: {service?.type || "N/A"}</p>
          <p style={text}>📍 Status: {state}</p>
        </Card>

        {/* ================= INSPECTION ================= */}
        {state === "inspection" && (
          <Card>
            <p>🔍 Mechanic is inspecting your vehicle...</p>
            <p style={{ fontSize: 12, color: "#777" }}>
              Please wait while we analyze damage.
            </p>
          </Card>
        )}

        {/* ================= REVIEW ================= */}
        {state === "review" && updated && (
          <Card>

            <h4>Inspection Complete</h4>

            <div style={priceBox}>
              <p>Base Price: ₹{updated.original}</p>
              <p style={{ color: colors.warning }}>
                Extra Charge: +₹{updated.extra}
              </p>
            </div>

            <p style={note}>{updated.reason}</p>

            <div style={totalBox}>
              Total:{" "}
              <b>₹{updated.original + updated.extra}</b>
            </div>

            <div style={btnRow}>
              <button style={rejectBtn} onClick={rejectChanges}>
                Reject
              </button>

              <button style={acceptBtn} onClick={acceptChanges}>
                Accept
              </button>
            </div>

          </Card>
        )}

        {/* ================= WORKING ================= */}
        {state === "working" && (
          <Card>
            <p>🔧 Work in progress...</p>
            <p style={{ fontSize: 12, color: "#777" }}>
              Mechanic is repairing your vehicle.
            </p>
          </Card>
        )}

        {/* ================= DONE ================= */}
        {state === "done" && (
          <Card>
            <p>✅ Service completed successfully</p>
          </Card>
        )}

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

const text = {
  fontSize: 13,
  marginTop: 4,
};

const note = {
  fontSize: 12,
  color: "#666",
  marginTop: 8,
};

const priceBox = {
  marginTop: 8,
  display: "flex",
  flexDirection: "column",
  gap: 4,
};

const totalBox = {
  marginTop: 10,
  fontSize: 14,
};

const btnRow = {
  display: "flex",
  gap: 10,
  marginTop: 12,
};

const acceptBtn = {
  flex: 1,
  padding: 12,
  background: "#22c55e",
  border: "none",
  borderRadius: 10,
  color: "#fff",
};

const rejectBtn = {
  flex: 1,
  padding: 12,
  background: "#ef4444",
  border: "none",
  borderRadius: 10,
  color: "#fff",
};