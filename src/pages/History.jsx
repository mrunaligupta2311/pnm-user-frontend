 import PageLayout from "../components/PageLayout";
import Card from "../components/Card";

export default function History() {
  const bookings = JSON.parse(localStorage.getItem("pnm_history")) || [];

  return (
    <PageLayout>
      <div style={container}>

        <h2>Booking History</h2>

        {bookings.length === 0 && (
          <p style={{ textAlign: "center", color: "#777" }}>
            No bookings yet
          </p>
        )}

        {bookings.map((b) => (
          <Card key={b.id}>

            <h3>{b.service}</h3>

            <p>Mechanic: {b.mechanic}</p>
            <p>Vehicle: {b.vehicle}</p>
            <p>Date: {b.date}</p>

            <hr style={{ margin: "8px 0" }} />

            <p><b>₹{b.price}</b></p>
            <p>Status: {b.status}</p>

          </Card>
        ))}

      </div>
    </PageLayout>
  );
}

const container = {
  display: "flex",
  flexDirection: "column",
  gap: 14,
};