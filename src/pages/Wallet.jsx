 import { useState } from "react";
import PageLayout from "../components/PageLayout";
import Card from "../components/Card";
import GradientButton from "../components/GradientButton";
import { useApp } from "../context/AppContext";

import { colors, radius } from "../styles/theme";

export default function Wallet() {
  const { user } = useApp();

  const [amount, setAmount] = useState("");
  const [upiId, setUpiId] = useState("");
  const [tab, setTab] = useState("add");

  /* ================= TRANSACTIONS (PLACEHOLDER FOR BACKEND) ================= */
  const transactions = [
    {
      id: "TXN001",
      type: "credit",
      title: "UPI Add Money",
      amount: 500,
      date: "18 Apr 2026",
      status: "success",
    },
    {
      id: "TXN002",
      type: "debit",
      title: "Mechanic Payment",
      amount: 120,
      date: "17 Apr 2026",
      status: "success",
    },
  ];

  /* ================= UI HANDLERS (NO REAL MONEY LOGIC) ================= */
  const handleAddMoney = () => {
    if (!amount) return alert("Enter amount");

    alert("Redirecting to UPI payment gateway (to be integrated)");
    setAmount("");
  };

  const handleWithdraw = () => {
    if (!upiId || !amount) return alert("Fill all fields");

    alert("Payout request sent (backend integration pending)");
    setAmount("");
    setUpiId("");
  };

  return (
    <PageLayout>
      <div style={container}>

        {/* ================= HEADER ================= */}
        <div style={header}>
          <h2>Wallet</h2>
          <p style={sub}>Secure UPI Wallet</p>
        </div>

        {/* ================= BALANCE ================= */}
        <Card>
          <div style={label}>Available Balance</div>
          <div style={balance}>₹{user?.wallet || 0}</div>
          <div style={hint}>Powered by secure ledger system</div>
        </Card>

        {/* ================= TABS ================= */}
        <div style={tabs}>
          <button
            onClick={() => setTab("add")}
            style={tab === "add" ? activeTab : tabBtn}
          >
            Add Money
          </button>

          <button
            onClick={() => setTab("withdraw")}
            style={tab === "withdraw" ? activeTab : tabBtn}
          >
            Withdraw
          </button>

          <button
            onClick={() => setTab("history")}
            style={tab === "history" ? activeTab : tabBtn}
          >
            History
          </button>
        </div>

        {/* ================= ADD MONEY ================= */}
        {tab === "add" && (
          <Card>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              style={input}
            />

            <GradientButton fullWidth onClick={handleAddMoney}>
              Pay via UPI
            </GradientButton>

            <p style={note}>
              You will be redirected to your UPI app (GPay / PhonePe / Paytm)
            </p>
          </Card>
        )}

        {/* ================= WITHDRAW ================= */}
        {tab === "withdraw" && (
          <Card>
            <input
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="Enter UPI ID (e.g. name@upi)"
              style={input}
            />

            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              style={input}
            />

            <GradientButton fullWidth onClick={handleWithdraw}>
              Send Money
            </GradientButton>

            <p style={note}>
              Transfer will be processed to linked UPI account
            </p>
          </Card>
        )}

        {/* ================= HISTORY ================= */}
        {tab === "history" && (
          <Card>
            {transactions.map((t) => (
              <div key={t.id} style={txnRow}>
                <div>
                  <div style={txnTitle}>{t.title}</div>
                  <div style={txnDate}>{t.date}</div>
                </div>

                <div
                  style={{
                    color: t.type === "credit" ? "green" : "red",
                    fontWeight: 600,
                  }}
                >
                  {t.type === "credit" ? "+" : "-"} ₹{t.amount}
                </div>
              </div>
            ))}
          </Card>
        )}

        {/* ================= SECURITY NOTE ================= */}
        <div style={security}>
          🔐 All transactions are protected. Payment processing will be handled via secure UPI gateway integration.
        </div>

      </div>
    </PageLayout>
  );
}

/* ================= STYLES ================= */

const container = {
  display: "flex",
  flexDirection: "column",
  gap: 14,
};

const header = {
  textAlign: "center",
};

const sub = {
  fontSize: 12,
  color: "#777",
};

const label = {
  fontSize: 12,
  color: "#777",
};

const balance = {
  fontSize: 28,
  fontWeight: 700,
  marginTop: 5,
};

const hint = {
  fontSize: 11,
  color: "#999",
  marginTop: 4,
};

const tabs = {
  display: "flex",
  gap: 8,
};

const tabBtn = {
  flex: 1,
  padding: 10,
  border: "1px solid #ddd",
  borderRadius: radius.md,
  background: "#fff",
  cursor: "pointer",
};

const activeTab = {
  flex: 1,
  padding: 10,
  borderRadius: radius.md,
  background: colors.primary,
  color: "#fff",
  border: "none",
};

const input = {
  width: "100%",
  padding: 12,
  marginBottom: 10,
  borderRadius: radius.md,
  border: "1px solid #ddd",
};

const txnRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 0",
  borderBottom: "1px solid #eee",
};

const txnTitle = {
  fontSize: 13,
};

const txnDate = {
  fontSize: 11,
  color: "#777",
};

const note = {
  fontSize: 11,
  color: "#777",
  marginTop: 8,
};

const security = {
  fontSize: 11,
  color: "#666",
  textAlign: "center",
  marginTop: 10,
};