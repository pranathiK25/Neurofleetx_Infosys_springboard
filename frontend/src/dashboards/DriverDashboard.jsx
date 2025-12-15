import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const DriverDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="home-layout">
      <nav className="navbar" style={{ borderBottom: '4px solid #4caf50' }}>
        <div className="nav-logo">NeuroFleetX <span style={{fontSize:'0.6em', opacity:0.8}}>DRIVER</span></div>
        <div className="nav-right">
          <div className="profile-icon" onClick={() => navigate('/profile')}>D</div>
        </div>
      </nav>

      <div className="page-container">
        <div className="hero-section">
          <h1>My Assignments</h1>
          <p className="role-badge" style={{backgroundColor: '#4caf50'}}>Active Status</p>
        </div>

        <div className="dashboard-grid">
          <div className="stat-card">
            <div className="card-header"><h3>Current Vehicle</h3></div>
            <div className="card-body"><h2>#TRK-42</h2><span className="status-text">Volvo VNL 860</span></div>
          </div>
          <div className="stat-card">
            <div className="card-header"><h3>Driving Score</h3></div>
            <div className="card-body"><h2>96/100</h2><span className="status-text" style={{color: 'green'}}>Excellent</span></div>
          </div>
          <div className="stat-card">
            <div className="card-header"><h3>Next Trip</h3></div>
            <div className="card-body"><h2>08:00 AM</h2><span className="status-text">To: Chicago, IL</span></div>
          </div>
          <div className="stat-card">
            <div className="card-header"><h3>Hours of Service</h3></div>
            <div className="card-body"><h2>4.5h Left</h2><span className="status-text">Drive Time</span></div>
          </div>
        </div>

        <div className="quick-actions">
           <button className="action-btn">Start Trip</button>
           <button className="action-btn">Log Inspection</button>
           <button className="action-btn">Report Issue</button>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;