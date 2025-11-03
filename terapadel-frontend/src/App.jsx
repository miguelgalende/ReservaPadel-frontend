import React from "react";
import { Routes, Route } from "react-router-dom";
import Init from "./pages/Init";
import Home from "./pages/Home";
import Pista from "./pages/Pista";
import AdminPanel from "./pages/AdminPanel";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Init />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pista/:id" element={<Pista />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </div>
  );
}
