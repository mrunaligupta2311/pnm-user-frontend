 import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import Card from "../components/Card";
import GradientButton from "../components/GradientButton";
import { useApp } from "../context/AppContext";

import {
  typography,
  spacing,
  colors,
  radius,
  shadows,
} from "../styles/theme";

export default function PunctureDetails() {
  const navigate = useNavigate();
  const { setService, vehicle } = useApp();

  const [selected, setSelected] = useState(null);

  const punctureServices = [
    {
      id: "simple_puncture",
      title: "Simple Tyre Puncture",
      desc: "Basic nail / small hole repair",
      priceRange: "₹80 - ₹150",
      min: 80,
      max: 150,
      icon: "🛞",
    },
    {
      id: "tube_puncture",
      title: "Tube Tyre Puncture",
      desc: "Tube repair or replacement",
      priceRange: "₹120 - ₹250",
      min: 120,
      max: 250,
      icon: "⚙️",
    },
    {
      id: "side_cut",
      title: "Side Wall Damage",
      desc: "Severe tyre damage repair",
      priceRange: "₹200 - ₹500",
      min: 200,
      max: 500,
      icon: "⚠️",
    },
    {
      id: "multiple",
      title: "Multiple Punctures",
      desc: "More than one puncture repair",
      priceRange: "₹150 - ₹350",
      min: 150,
      max: 350,
      icon: "🛞🛞",
    },
    {
      id: "idk",
      title: "Not Sure (Inspection Required)",
      desc: "Mechanic will inspect & decide final cost",
      priceRange: "₹100 - ₹600 (estimate)",
      min: 100,
      max: 600,
      icon: "🤷",
    },
  ];

  const handleSelect = (service) => {
    setSelected(service.id);

    const price =
      Math.floor(Math.random() * (service.max - service.min + 1)) +
      service.min;

    setService({
      id: service.id,
      title: service.title,
      desc: service.desc,
      priceRange: service.priceRange,
      price,
    });

    setTimeout(() => {
      navigate("/mechanics");
    }, 300);
  };

  return (
    <PageLayout>
      <div style={container}>

        {/* ================= STICKY HEADER ================= */}
        <div style={stickyHeader}>
          <h2 style={title}>Puncture Services</h2>
          <p style={subtitle}>
            Select issue type for accurate mechanic pricing
          </p>
        </div>

        {/* ================= SCROLL LIST ================= */}
        <div style={scrollArea}>
          {punctureServices.map((s) => (
            <Card
              key={s.id}
              style={{
                ...card,
                border:
                  selected === s.id
                    ? `2px solid ${colors.primary}`
                    : `1px solid ${colors.border}`,
              }}
              onClick={() => setSelected(s.id)}
            >
              {/* TOP */}
              <div style={topRow}>
                <div style={iconBox}>
                  <span style={icon}>{s.icon}</span>
                </div>

                <div style={{ flex: 1 }}>
                  <h3 style={serviceTitle}>{s.title}</h3>
                  <p style={desc}>{s.desc}</p>
                </div>

                <div style={priceTag}>{s.priceRange}</div>
              </div>

              {/* CTA */}
              <div style={{ marginTop: 10 }}>
                <GradientButton
                  fullWidth
                  onClick={() => handleSelect(s)}
                >
                  Select
                </GradientButton>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </PageLayout>
  );
}

/* ================= STYLES ================= */

const container = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  gap: spacing.sm,
};

/* 🔥 sticky header */
const stickyHeader = {
  position: "sticky",
  top: 0,
  zIndex: 10,
  background: colors.background,
  paddingBottom: spacing.sm,
};

/* scroll area */
const scrollArea = {
  flex: 1,
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: spacing.md,
  paddingBottom: spacing.lg,
};

/* text */
const title = {
  ...typography.title,
};

const subtitle = {
  ...typography.subtitle,
};

/* card */
const card = {
  padding: spacing.md,
  borderRadius: radius.lg,
  boxShadow: shadows.soft,
  cursor: "pointer",
  transition: "all 0.2s ease",
};

/* row */
const topRow = {
  display: "flex",
  alignItems: "center",
  gap: spacing.sm,
};

const iconBox = {
  width: 44,
  height: 44,
  borderRadius: radius.md,
  background: colors.backgroundGray,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const icon = {
  fontSize: 20,
};

const serviceTitle = {
  fontSize: 15,
  fontWeight: 700,
  color: colors.heading,
};

const desc = {
  fontSize: 12,
  color: colors.muted,
  marginTop: 2,
};

const priceTag = {
  fontSize: 13,
  fontWeight: 700,
  color: colors.primary,
};