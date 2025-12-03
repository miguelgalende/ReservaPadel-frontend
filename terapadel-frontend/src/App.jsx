import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Pista from "./pages/Pista";
import Reservas from "./pages/Reservas";
import AdminPanel from "./pages/AdminPanel";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Footer from "./components/Footer";

function PrivateAdminRoute({ children }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  if (!usuario || usuario.rolUsuario !== "ADMIN") {
    return <Navigate to="/home" />;
  }
  return children;
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/pista" element={<Pista />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route
            path="/admin"
            element={
              <PrivateAdminRoute>
                <AdminPanel />
              </PrivateAdminRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
