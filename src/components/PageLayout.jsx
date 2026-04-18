 import Header from "./Header";
import Footer from "./Footer";
import { colors } from "../styles/theme";

export default function PageLayout({
  children,
  showHeader = true,
  showFooter = true,
}) {
  return (
    <div style={wrapper}>
      {showHeader && <Header />}

      <main style={content}>
        <div style={inner}>{children}</div>
      </main>

      {showFooter && <Footer />}
    </div>
  );
}

/* ================= STYLES ================= */

const wrapper = {
  width: "100%",
  maxWidth: 420,
  margin: "0 auto",
  height: "100dvh",
  display: "flex",
  flexDirection: "column",
  background: colors.background,
  overflow: "hidden",
};

/* main scroll area */
const content = {
  flex: 1,
  overflowY: "auto",
  WebkitOverflowScrolling: "touch",
  paddingTop: 56,     // fixed header space (NO MORE manual marginTop anywhere)
  paddingBottom: 70,  // fixed footer space
};

/* inner consistent padding system */
const inner = {
  padding: 16,
  display: "flex",
  flexDirection: "column",
  gap: 16,
};