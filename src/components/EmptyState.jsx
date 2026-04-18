 export default function EmptyState({ title, subtitle }) {
  return (
    <div style={container}>
      <div style={icon}>📭</div>
      <h3>{title}</h3>
      <p>{subtitle}</p>
    </div>
  );
}

const container = {
  textAlign: "center",
  padding: 30,
};

const icon = {
  fontSize: 40,
};