import Layout from "../components/Layout";

export default function Transactions() {
  return (
    <Layout>
      <h2 style={title}>Transactions</h2>

      <div style={card}>
        {/* HEADER */}
        <div style={rowHeader}>
          <span>Amount</span>
          <span>Status</span>
          <span>Flag</span>
        </div>

        {/* ROW */}
        <div
          style={row}
          onMouseOver={(e) => (e.currentTarget.style.background = "#eef2ff")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#f9fafb")}
        >
          <span style={amount}>₹60,000</span>
          <span style={status}>Done</span>
          <span style={flag}>FLAGGED</span>
        </div>
      </div>
    </Layout>
  );
}

const title = {
  marginBottom: "20px",
  fontWeight: "600"
};

const card = {
  background: "white",
  padding: "25px",
  borderRadius: "18px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  marginTop: "10px"
};

const rowHeader = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  fontWeight: "bold",
  marginBottom: "15px",
  color: "#6b7280"
};

const row = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  padding: "15px",
  borderRadius: "12px",
  background: "#f9fafb",
  alignItems: "center",
  transition: "0.3s"
};

const amount = {
  fontWeight: "600"
};

const status = {
  color: "#16a34a",
  fontWeight: "500"
};

const flag = {
  color: "#dc2626",
  fontWeight: "600"
};