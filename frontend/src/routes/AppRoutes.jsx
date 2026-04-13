import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Transfer from "../pages/Transfer";
import Transactions from "../pages/Transactions";
import AdminDashboard from "../pages/AdminDashboard";

export default function AppRoutes() {
  const { role } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/transactions" element={<Transactions />} />

        <Route
          path="/admin"
          element={role === "admin" ? <AdminDashboard /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}