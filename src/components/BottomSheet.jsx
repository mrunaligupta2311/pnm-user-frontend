 import { useEffect } from "react";
import { colors, radius, shadows, spacing, zIndex } from "../styles/theme";

export default function BottomSheet({
  children,
  isOpen = true,
  onClose,
  height = "auto",
}) {
  // Prevent background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* 🔥 Overlay */}
      <div style={overlay} onClick={onClose} />

      {/* 🔥 Sheet */}
      <div style={{ ...sheet, height }}>
        
        {/* 🔥 Handle */}
        <div style={handleWrapper}>
          <div style={handle} />
        </div>

        {/* 🔥 Content */}
        <div style={content}>
          {children}
        </div>
      </div>
    </>
  );
}

/* ================= STYLES ================= */

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.35)",
  backdropFilter: "blur(6px)",
  zIndex: zIndex.overlay,
};

const sheet = {
  position: "fixed",
  bottom: 0,
  width: "100%",
  maxWidth: 420,
  left: "50%",
  transform: "translateX(-50%)",
  background: colors.surface,
  borderTopLeftRadius: radius.xl,
  borderTopRightRadius: radius.xl,
  boxShadow: "0 -10px 40px rgba(0,0,0,0.18)",
  zIndex: zIndex.modal,
  display: "flex",
  flexDirection: "column",
  animation: "slideUp 0.3s ease",
};

const handleWrapper = {
  display: "flex",
  justifyContent: "center",
  paddingTop: spacing.sm,
  paddingBottom: spacing.xs,
};

const handle = {
  width: 40,
  height: 5,
  borderRadius: 999,
  background: colors.mutedBorder,
};

const content = {
  padding: spacing.md,
  display: "flex",
  flexDirection: "column",
  gap: spacing.md,
  maxHeight: "75vh",
  overflowY: "auto",
};