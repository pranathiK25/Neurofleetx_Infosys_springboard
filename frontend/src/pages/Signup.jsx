import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css'; // Ensure this path is correct

const Signup = () => {
  // 1. DEFINE NAVIGATE HOOK HERE
  const navigate = useNavigate();

  // 2. DEFINE STATE (formData) HERE
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: 'Male',
    role: 'Commuter',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // 3. API CALL (Using port 8080 as you requested)
      const response = await fetch('http://localhost:8080/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          gender: formData.gender.toUpperCase(), 
          role: formData.role.toUpperCase(),
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration Successful! Redirecting to Login...");
        navigate('/');
      } else {
        alert(data.message || "Registration Failed");
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Connection failed. Check if backend is running on port 8080.");
    }
  };

  return (
    <div className="auth-container">
      <h1 className="neuro-title">NeuroFleetX</h1>
      <div className="auth-card">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="input-group">
            <input 
              type="text" 
              name="name" 
              placeholder="Enter your name" 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              name="email" 
              placeholder="Enter email" 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="input-group">
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="input-group">
            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="Commuter">Commuter</option>
              <option value="Driver">Driver</option>
              <option value="Admin">Admin</option>
              <option value="Fleet Manager">Fleet Manager</option>
            </select>
          </div>

          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input 
              type="password" 
              name="confirmPassword" 
              placeholder="Confirm password" 
              onChange={handleChange} 
              required 
            />
          </div>

          <button type="submit" className="btn-submit">REGISTER</button>

          <div className="auth-link">
            Already have an account? <a href="/login">Login</a>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Signup;