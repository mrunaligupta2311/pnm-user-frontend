 import { colors } from "../styles/theme";

export default function StatusBadge({ status }) {
  const map = {
    Completed: "#22c55e",
    Pending: "#f59e0b",
    Cancelled: "#ef4444",
  };

  return (
    <span
      style={{
        padding: "4px 10px",
        borderRadius: 20,
        fontSize: 12,
        background: map[status] + "22",
        color: map[status],
      }}
    >
      {status}
    </span>
  );
}