import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={styles.nav}>
      <div style={styles.right}>
        <span style={styles.user}>👋 Hello User</span>

        <button style={styles.logout} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "15px 30px",
    background: "#1e3a8a",
    color: "white",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },

  user: {
    fontWeight: "500"
  },

  logout: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "0.3s"
  }
};