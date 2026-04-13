import Layout from "../components/Layout";
import { useEffect, useState, useCallback } from "react";
import API_BASE_URL from "../api";

export default function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState(0);
  const [alerts, setAlerts] = useState(0);

  const accountId = 1; // 🔴 for now fixed (user1)

  // 🔥 FETCH DATA (FIXED WITH useCallback)
  const fetchDashboardData = useCallback(async () => {
    try {
      // ✅ Fetch balance
      const balanceRes = await fetch(
        `${API_BASE_URL}/account/balance/${accountId}`
      );
      const balanceData = await balanceRes.json();

      // ✅ Fetch transactions
      const txnRes = await fetch(
        `${API_BASE_URL}/transaction/my/${accountId}`
      );
      const txnData = await txnRes.json();

      // 🎯 Animate with real values
      animateValues(balanceData.balance || 0, txnData.length || 0);

    } catch (err) {
      console.error("Dashboard error:", err);
    }
  }, [accountId]);

  // 🔥 CALL ON LOAD
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // 🔥 ANIMATION WITH REAL DATA
  const animateValues = (targetBalance, targetTransactions) => {
    let b = 0, t = 0, a = 0;

    const interval = setInterval(() => {
      if (b < targetBalance) b += Math.ceil(targetBalance / 50);
      if (t < targetTransactions) t += 1;
      if (a < (targetTransactions > 0 ? 1 : 0)) a += 1;

      if (b > targetBalance) b = targetBalance;

      setBalance(b);
      setTransactions(t);
      setAlerts(a);

      if (b >= targetBalance && t >= targetTransactions) {
        clearInterval(interval);
      }
    }, 30);
  };

  return (
    <Layout>
      <h2 style={title}>Dashboard</h2>

      <div style={grid}>
        {/* CARD 1 */}
        <div style={card}>
          <p style={label}>💰 Balance</p>
          <h3 style={value}>₹{balance.toLocaleString()}</h3>
        </div>

        {/* CARD 2 */}
        <div style={card}>
          <p style={label}>📈 Transactions</p>
          <h3 style={value}>{transactions}</h3>
        </div>

        {/* CARD 3 */}
        <div style={card}>
          <p style={label}>⚠️ Alerts</p>
          <h3 style={value}>{alerts}</h3>
        </div>
      </div>
    </Layout>
  );
}

const title = {
  fontSize: "28px",
  fontWeight: "700",
  marginBottom: "20px"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "25px"
};

const card = {
  background: "linear-gradient(135deg, #ffffff, #f1f5f9)",
  padding: "25px",
  borderRadius: "20px",
  boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
  transition: "0.3s",
  cursor: "pointer"
};

const label = {
  color: "#6b7280",
  marginBottom: "10px"
};

const value = {
  fontSize: "24px",
  fontWeight: "700"
};