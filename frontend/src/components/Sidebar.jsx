import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar() {
  const { role } = useContext(AuthContext);
  const location = useLocation();

  return (
    <div style={styles.sidebar}>
      <div style={styles.logoContainer}>
        <span style={styles.brand}>💳 SmartBank</span>
      </div>

      {/* 👤 CUSTOMER MENU */}
      {role === "customer" && (
        <>
          <NavItem to="/dashboard" label="📊 Dashboard" current={location.pathname} />
          <NavItem to="/transfer" label="💸 Transfer" current={location.pathname} />
          <NavItem to="/transactions" label="📜 Transactions" current={location.pathname} />
        </>
      )}

      {/* 👨‍💼 ADMIN MENU */}
      {role === "admin" && (
        <>
          <NavItem to="/admin" label="👨‍💼 Admin Dashboard" current={location.pathname} />
        </>
      )}
    </div>
  );
}

function NavItem({ to, label, current }) {
  const isActive = current === to;

  return (
    <Link
      to={to}
      style={{
        ...styles.link,
        background: isActive
          ? "linear-gradient(135deg, #3b82f6, #2563eb)"
          : "transparent",
        boxShadow: isActive ? "0 8px 20px rgba(0,0,0,0.25)" : "none"
      }}
    >
      {label}
    </Link>
  );
}

const styles = {
  sidebar: {
    width: "240px",
    background: "linear-gradient(180deg, #1e3a8a, #1e40af)",
    color: "white",
    padding: "25px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    borderTopRightRadius: "30px",
    borderBottomRightRadius: "30px"
  },

  logoContainer: {
    marginBottom: "30px"
  },

  brand: {
    fontSize: "22px",
    fontWeight: "800"
  },

  link: {
    color: "white",
    textDecoration: "none",
    padding: "14px",
    borderRadius: "14px",
    transition: "0.3s",
    fontWeight: "500"
  }
};