 // src/pages/Wallet.jsx
import { useState } from "react";
import PageLayout from "../components/PageLayout";
import GradientButton from "../components/GradientButton";
import Card from "../components/Card";
import { typography, colors, spacing, radius, shadows } from "../styles/theme";

export default function Wallet() {
  const [balance, setBalance] = useState(500);
  const [amount, setAmount] = useState("");

  const transactions = [
    { id: 1, type: "debit", amount: 100, title: "Puncture Repair", date: "03 Apr 2026" },
    { id: 2, type: "credit", amount: 500, title: "Wallet Top-up", date: "01 Apr 2026" },
    { id: 3, type: "debit", amount: 50, title: "Service Fee", date: "28 Mar 2026" },
  ];

  const handleAddMoney = () => {
    const value = parseInt(amount);
    if (!value || value <= 0) return alert("Enter valid amount");

    setBalance((prev) => prev + value);
    setAmount("");

    // later: integrate payment gateway
  };

  return (
    <PageLayout>
      <div style={container}>

        {/* ===== BALANCE ===== */}
        <Card style={balanceCard}>
          <p style={balanceLabel}>Wallet Balance</p>
          <h1 style={balanceAmount}>₹{balance}</h1>

          <div style={addRow}>
            <input
              type="number"
              placeholder="Add money"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={input}
            />

            <GradientButton onClick={handleAddMoney}>
              Add
            </GradientButton>
          </div>
        </Card>

        {/* ===== TRANSACTIONS ===== */}
        <div style={sectionHeader}>
          <p style={sectionTitle}>Transactions</p>
        </div>

        <div style={list}>
          {transactions.map((tx) => (
            <Card key={tx.id} style={txCard}>
              <div style={txRow}>

                <div>
                  <p style={txTitle}>{tx.title}</p>
                  <p style={txDate}>{tx.date}</p>
                </div>

                <p
                  style={{
                    ...txAmount,
                    color:
                      tx.type === "debit"
                        ? colors.danger
                        : colors.success,
                  }}
                >
                  {tx.type === "debit" ? "-" : "+"}₹{tx.amount}
                </p>

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
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: spacing.md,
  padding: spacing.md,
  background: colors.backgroundGray,
  marginTop: 56,
  marginBottom: 70,
};

/* BALANCE */
const balanceCard = {
  padding: spacing.lg,
  borderRadius: radius.xl,
  boxShadow: shadows.strong,
  textAlign: "center",
  background: "#fff",
};

const balanceLabel = {
  ...typography.small,
  color: colors.muted,
};

const balanceAmount = {
  fontSize: "34px",
  fontWeight: "800",
  marginTop: spacing.xs,
};

/* ADD MONEY */
const addRow = {
  display: "flex",
  gap: spacing.sm,
  marginTop: spacing.md,
};

const input = {
  flex: 1,
  padding: "12px",
  borderRadius: radius.md,
  border: `1px solid ${colors.border}`,
  fontSize: "14px",
};

/* SECTION */
const sectionHeader = {
  marginTop: spacing.sm,
};

const sectionTitle = {
  ...typography.subtitle,
  fontWeight: 600,
};

/* TRANSACTIONS */
const list = {
  display: "flex",
  flexDirection: "column",
  gap: spacing.sm,
};

const txCard = {
  padding: spacing.md,
  borderRadius: radius.lg,
  boxShadow: shadows.soft,
  background: "#fff",
};

const txRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const txTitle = {
  fontWeight: 600,
};

const txDate = {
  fontSize: "12px",
  color: colors.muted,
};

const txAmount = {
  fontWeight: 700,
  fontSize: "14px",
};