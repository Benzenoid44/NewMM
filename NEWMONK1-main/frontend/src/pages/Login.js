import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Captcha from "../components/Captcha";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [captchaValid, setCaptchaValid] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    if (!captchaValid) {
      setError("Invalid Captcha. Please try again.");
      return;
    }
  
    try {
        const response = await axios.post(
            "http://localhost:5000/api/auth/login", 
            { email, password },
            { withCredentials: true }
          );
          
  
      console.log("Response from server:", response.data);
  
      if (response.data.success) {
        console.log("Login successful, role:", response.data.user.role);
        
        // Store the JWT token in localStorage
        localStorage.setItem("token", response.data.token);
  
        // Save role for UI redirection if needed
        localStorage.setItem("role", response.data.user.role);
  
        if (response.data.user.role === "user") {
          navigate("/dashboard/user");
        } else if (response.data.user.role === "ngo") {
          navigate("/dashboard/ngo");
        } else {
          setError("Invalid role received from server.");
        }
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response) {
        console.error("Server Response:", err.response.data);
        setError(err.response.data.message || "Login failed!");
      } else {
        setError("Server error. Please try again later.");
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg w-50">
        <h2 className="text-center">Login</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="user">User</option>
              <option value="ngo">NGO</option>
            </select>
          </div>

          <Captcha setCaptchaValid={setCaptchaValid} />

          <button type="submit" className="btn btn-primary w-100" disabled={!captchaValid}>
            Login
          </button>

          <p className="text-center mt-3">
            Don't have an account? <a href="/register" className="fw-bold">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
