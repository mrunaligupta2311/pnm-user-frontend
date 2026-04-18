 import { useState } from "react";
import PageLayout from "../components/PageLayout";
import Card from "../components/Card";
import GradientButton from "../components/GradientButton";
import { useApp } from "../context/AppContext";
import { spacing } from "../styles/theme";

export default function Wallet() {
  const { user, setUser } = useApp();
  const [amount, setAmount] = useState("");

  const addMoney = () => {
    const val = Number(amount);

    if (!val || val <= 0) return alert("Enter valid amount");

    setUser({
      ...user,
      wallet: user.wallet + val,
    });

    setAmount("");
  };

  return (
    <PageLayout>
      <div style={container}>
        <h2>Wallet</h2>

        <Card>
          <h3>Balance: ₹{user.wallet}</h3>

          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            style={input}
          />

          <GradientButton fullWidth onClick={addMoney}>
            Add Money
          </GradientButton>
        </Card>
      </div>
    </PageLayout>
  );
}

const container = {
  padding: spacing.md,
  marginTop: 56,
};

const input = {
  width: "100%",
  padding: spacing.md,
  marginBottom: 10,
};