 import Header from "./Header";
import Footer from "./Footer";

export default function PageLayout({ children }) {
  return (
    <div style={wrapper}>
      <Header />

      <main style={content}>
        <div style={inner}>{children}</div>
      </main>

      <Footer />
    </div>
  );
}

/* ================= STYLES ================= */

const wrapper = {
  width: "100%",
  maxWidth: "420px",
  margin: "0 auto",
  minHeight: "100dvh",
  display: "flex",
  flexDirection: "column",
  background: "#f7f9fc",
  position: "relative",
};

const content = {
  flex: 1,
  overflowY: "auto",
  paddingTop: 70,     // header space
  paddingBottom: 80,  // footer space
};

const inner = {
  padding: 16,
  display: "flex",
  flexDirection: "column",
  gap: 16,
};