 import { colors } from "../styles/theme";

export default function Loader({ text = "Loading..." }) {
  return (
    <div style={container}>
      <div style={spinner} />
      <p style={label}>{text}</p>
    </div>
  );
}

const container = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: 20,
};

const spinner = {
  width: 32,
  height: 32,
  border: "3px solid #eee",
  borderTop: `3px solid ${colors.primary}`,
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

const label = {
  marginTop: 8,
  fontSize: 13,
  color: "#666",
};