 import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PageLayout from "../components/PageLayout";
import Card from "../components/Card";
import GradientButton from "../components/GradientButton";
import { typography, colors, radius, spacing, shadows } from "../styles/theme";

export default function History() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");

  const historyList = [
    {
      id: 1,
      vehicle: "Car",
      mechanic: "Sharma Garage",
      cost: "₹1100",
      date: "03-Apr-2026",
      status: "Completed",
    },
    {
      id: 2,
      vehicle: "Bike",
      mechanic: "Ravi Motors",
      cost: "₹300",
      date: "28-Mar-2026",
      status: "Completed",
    },
    {
      id: 3,
      vehicle: "Auto",
      mechanic: "AutoFix",
      cost: "₹500",
      date: "25-Mar-2026",
      status: "Cancelled",
    },
  ];

  const filteredList =
    filter === "All"
      ? historyList
      : historyList.filter((item) => item.status === filter);

  return (
    <PageLayout>
      <div style={container}>
        
        {/* ✅ HEADER */}
        <h2 style={title}>Service History</h2>

        {/* ✅ FILTERS */}
        <div style={filterRow}>
          {["All", "Completed", "Cancelled"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                ...filterBtn,
                background: filter === f ? colors.primary : "#fff",
                color: filter === f ? "#fff" : colors.text,
                border:
                  filter === f
                    ? `1px solid ${colors.primary}`
                    : `1px solid ${colors.border}`,
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* ✅ LIST */}
        <div style={list}>
          {filteredList.length === 0 ? (
            <div style={emptyBox}>
              <p style={emptyText}>No services found</p>
            </div>
          ) : (
            filteredList.map((item) => {
              const isCancelled = item.status === "Cancelled";

              return (
                <Card key={item.id} style={card}>
                  
                  {/* TOP ROW */}
                  <div style={rowBetween}>
                    <p style={vehicle}>{item.vehicle}</p>
                    <span
                      style={{
                        ...statusBadge,
                        background: isCancelled
                          ? `${colors.danger}22`
                          : `${colors.success}22`,
                        color: isCancelled
                          ? colors.danger
                          : colors.success,
                      }}
                    >
                      {item.status}
                    </span>
                  </div>

                  {/* DETAILS */}
                  <p style={detail}>Mechanic: {item.mechanic}</p>
                  <p style={detail}>Date: {item.date}</p>

                  {/* BOTTOM */}
                  <div style={rowBetween}>
                    <p style={cost}>{item.cost}</p>

                    <button
                      onClick={() => navigate("/complete")}
                      style={viewBtn}
                    >
                      View Details
                    </button>
                  </div>

                </Card>
              );
            })
          )}
        </div>

        {/* ✅ CTA */}
        <GradientButton
          fullWidth
          onClick={() => navigate("/location")}
        >
          Book New Service
        </GradientButton>

      </div>
    </PageLayout>
  );
}

/* ================= STYLES ================= */

const container = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  padding: spacing.lg,
  gap: spacing.md,
  marginTop: 56,
  marginBottom: 70,
  background: "#f9fafb",
};

/* HEADER */
const title = {
  ...typography.title,
  textAlign: "center",
};

/* FILTER */
const filterRow = {
  display: "flex",
  gap: spacing.sm,
  justifyContent: "center",
};

const filterBtn = {
  padding: "8px 14px",
  borderRadius: radius.md,
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
};

/* LIST */
const list = {
  display: "flex",
  flexDirection: "column",
  gap: spacing.sm,
};

/* CARD */
const card = {
  padding: spacing.md,
  borderRadius: radius.lg,
  boxShadow: shadows.soft,
  background: "#fff",
  display: "flex",
  flexDirection: "column",
  gap: spacing.xs,
};

/* ROWS */
const rowBetween = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

/* TEXT */
const vehicle = {
  ...typography.subtitle,
  fontWeight: 600,
};

const detail = {
  ...typography.small,
  color: colors.muted,
};

const cost = {
  fontSize: 16,
  fontWeight: 700,
  color: colors.primary,
};

/* STATUS */
const statusBadge = {
  padding: "4px 10px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 600,
};

/* BUTTON */
const viewBtn = {
  border: "none",
  background: "transparent",
  color: colors.primary,
  fontWeight: 600,
  cursor: "pointer",
};

/* EMPTY */
const emptyBox = {
  textAlign: "center",
  padding: spacing.lg,
};

const emptyText = {
  color: colors.muted,
};