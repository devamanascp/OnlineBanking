import { useState } from "react";
import API_BASE_URL from "../api";

export default function Transfer() {
  const [toAccountId, setToAccountId] = useState("");
  const [amount, setAmount] = useState("");

  const handleTransfer = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_BASE_URL}/transaction/transfer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          to_account_id: parseInt(toAccountId),
          amount: parseFloat(amount)
        })
      });

      const data = await response.json();

      if (data.message) {
        alert("Transfer Successful");
      } else {
        alert(data.error || "Transfer Failed");
      }

    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Transfer Money</h2>

      <input
        style={styles.input}
        placeholder="Receiver Account ID"
        onChange={(e) => setToAccountId(e.target.value)}
      />

      <input
        style={styles.input}
        type="number"
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
      />

      <button style={styles.button} onClick={handleTransfer}>
        Transfer
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    width: "320px",
    margin: "80px auto",
    gap: "12px",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    background: "white",
    textAlign: "center"
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  },
  button: {
    background: "#16a34a",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  }
};