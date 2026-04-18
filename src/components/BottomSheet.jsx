export default function BottomSheet({ children }) {
  return <div style={sheet}>{children}</div>;
}

const sheet = {
  position: "fixed",
  bottom: 0,
  width: "100%",
  maxWidth: 420,
  background: "#fff",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  padding: 16,
  boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
};