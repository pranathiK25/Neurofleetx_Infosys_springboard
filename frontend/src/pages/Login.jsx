import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/apiClient";
import "../styles/auth.css"; // Ensure this matches your file name

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEmailBlur = async () => {
    if (form.email) {
      try {
        const response = await api.post("auth/check-role", { email: form.email });
        if (response.data) {
          setRole(response.data);
        }
      } catch (error) {
        console.log("Email not found");
        setRole("");
      }
    }
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { 
        email: form.email, 
        password: form.password 
      });

      localStorage.setItem("token", response.data);
      localStorage.setItem("email", form.email);
      
      // ➤ FIX: SAVE THE ROLE SO DASHBOARDS CAN USE IT
      localStorage.setItem("role", role); 

      navigate('/home'); 

    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="page-container">
      {/* Title */}
      <h1 className="neuro-title">NeuroFleetX</h1>

      <div className="auth-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleEmailBlur}
            required
          />

          <label>Role</label>
          <select value={role} disabled className="role-select">
            <option value="">-- Auto Detected --</option>
            <option value="COMMUTER">Commuter</option>
            <option value="ADMIN">Admin</option>
            <option value="OPERATOR">Operator</option>
            <option value="FLEET MANAGER">Fleet Manager</option>
          </select>

          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn primary">
            LOGIN
          </button>
        </form>

        <p className="muted">
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}