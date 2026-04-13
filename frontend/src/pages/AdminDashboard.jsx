import Layout from "../components/Layout";

export default function AdminDashboard() {
  return (
    <Layout>
      <h2>Admin Dashboard</h2>

      <div style={grid}>
        <div style={card}>Users: 50</div>
        <div style={card}>Transactions: 120</div>
        <div style={card}>⚠️ Flagged: 3</div>
      </div>
    </Layout>
  );
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px"
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "12px"
};