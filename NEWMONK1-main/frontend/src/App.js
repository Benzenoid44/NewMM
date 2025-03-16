import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard";
import NGODashboard from "./pages/NGODashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Protected Route Component
const ProtectedRoute = ({ element, requiredRole }) => {
  const role = localStorage.getItem("role"); // Get role from localStorage

  return role === requiredRole ? element : <Navigate to="/" replace />;
};

const App = () => {
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    // Listen for role changes in localStorage
    const handleStorageChange = () => {
      setRole(localStorage.getItem("role"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/user" element={<ProtectedRoute element={<UserDashboard />} requiredRole="user" />} />
        <Route path="/dashboard/ngo" element={<ProtectedRoute element={<NGODashboard />} requiredRole="ngo" />} />
      </Routes>
    </Router>
  );
};

export default App;
