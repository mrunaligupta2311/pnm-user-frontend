 import PageLayout from "../components/PageLayout";
import Card from "../components/Card";
import { spacing } from "../styles/theme";

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

        {bookings.map((b, i) => (
          <Card key={i}>
            <h3>{b.service}</h3>
            <p>{b.date}</p>
            <p>₹{b.price}</p>
            <p>{b.status}</p>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
}

const container = {
  padding: spacing.md,
  marginTop: 56,
};