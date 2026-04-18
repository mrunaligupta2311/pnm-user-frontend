 import { useState, useEffect } from "react";
import PageLayout from "../components/PageLayout";
import GradientButton from "../components/GradientButton";
import { useApp } from "../context/AppContext";
import { spacing } from "../styles/theme";

export default function Profile() {
  const { user, setUser } = useApp();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    setName(user.name || "");
    setPhone(user.phone || "");
  }, []);

  const handleSave = () => {
    if (!name) return alert("Name required");

    setUser({
      ...user,
      name,
      phone,
    });

    alert("Profile updated");
  };

  return (
    <PageLayout>
      <div style={container}>
        <h2>Profile</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          style={input}
        />

        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          style={input}
        />

        <GradientButton fullWidth onClick={handleSave}>
          Save
        </GradientButton>
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