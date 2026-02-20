import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <Routes>
      {/* Redireciona raiz para dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" />} />

      {/* Páginas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Página principal */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
