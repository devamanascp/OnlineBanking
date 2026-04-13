import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../api";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const resData = await response.json();

      // 🔴 HANDLE SUCCESS
      if (resData.access_token) {
        const token = resData.access_token;

        // store token
        localStorage.setItem("token", token);

        // role logic (simple for now)
        let role = "customer";
        if (data.email === "admin@gmail.com") {
          role = "admin";
        }

        login(token, role);

        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      } else {
        alert(resData.error || "Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div style={styles.container}>
      <h2>SmartBank Login</h2>

      <input
        style={styles.input}
        placeholder="Email"
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />

      <input
        style={styles.input}
        type="password"
        placeholder="Password"
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />

      <button style={styles.button} onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    width: "320px",
    margin: "120px auto",
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
    background: "#2563eb",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  }
};