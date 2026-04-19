 import PageLayout from "../components/PageLayout";
import Card from "../components/Card";

import {
  spacing,
  colors,
  radius,
  typography,
} from "../styles/theme";

export default function History() {
  // 🔥 mock data (later backend will replace this)
  const history = [
    {
      id: 1,
      service: "Puncture Repair",
      mechanic: "Sharma Garage",
      vehicle: "GJ-06-AB-1234",
      date: "18 Apr 2026, 4:30 PM",
      amount: 120,
      status: "Completed",
    },
    {
      id: 2,
      service: "Battery Jump Start",
      mechanic: "QuickFix Auto",
      vehicle: "GJ-01-KK-9090",
      date: "15 Apr 2026, 9:10 AM",
      amount: 200,
      status: "Completed",
    },
    {
      id: 3,
      service: "Flat Tyre",
      mechanic: "Speed Mechanic",
      vehicle: "GJ-03-XY-7788",
      date: "10 Apr 2026, 6:45 PM",
      amount: 0,
      status: "Cancelled",
    },
  ];

  return (
    <PageLayout>
      <div style={container}>

        {/* HEADER */}
        <div style={header}>
          <h2 style={title}>Service History</h2>
          <p style={subtitle}>Your past roadside assistance records</p>
        </div>

        {/* LIST */}
        {history.length === 0 ? (
          <Card>
            <p style={emptyText}>No history available yet</p>
          </Card>
        ) : (
          history.map((item) => (
            <Card key={item.id} style={card}>

              {/* TOP ROW */}
              <div style={topRow}>
                <div>
                  <div style={serviceName}>{item.service}</div>
                  <div style={smallText}>{item.mechanic}</div>
                </div>

                <div
                  style={{
                    ...statusBadge,
                    background:
                      item.status === "Completed"
                        ? "#22c55e"
                        : "#ef4444",
                  }}
                >
                  {item.status}
                </div>
              </div>

              {/* DETAILS */}
              <div style={details}>
                <p>🚗 {item.vehicle}</p>
                <p>📅 {item.date}</p>
                <p>💰 ₹{item.amount}</p>
              </div>

            </Card>
          ))
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

const header = {
  textAlign: "center",
  marginBottom: 6,
};

const title = {
  ...typography.title,
};

const subtitle = {
  ...typography.subtitle,
};

const card = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const topRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const serviceName = {
  fontSize: 15,
  fontWeight: 600,
};

const smallText = {
  fontSize: 12,
  color: colors.muted,
  marginTop: 2,
};

const details = {
  fontSize: 13,
  color: colors.text,
  display: "flex",
  flexDirection: "column",
  gap: 4,
  marginTop: 6,
};

const statusBadge = {
  padding: "4px 10px",
  borderRadius: radius.md,
  color: "#fff",
  fontSize: 11,
  fontWeight: 600,
};

const emptyText = {
  textAlign: "center",
  color: colors.muted,
};