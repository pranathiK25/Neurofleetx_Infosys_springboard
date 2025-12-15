import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const CustomerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="home-layout">
      <nav className="navbar" style={{ borderBottom: '4px solid #2196f3' }}>
        <div className="nav-logo">NeuroFleetX <span style={{fontSize:'0.6em', opacity:0.8}}>COMMUTER</span></div>
        <div className="nav-right">
           <div className="profile-icon" onClick={() => navigate('/profile')}>C</div>
        </div>
      </nav>

      <div className="page-container">
        <div className="hero-section">
          <h1>Commuter Portal</h1>
          <p className="role-badge" style={{backgroundColor: '#2196f3'}}>Standard Plan</p>
        </div>

        <div className="dashboard-grid">
          <div className="stat-card">
            <div className="card-header"><h3>Upcoming Ride</h3></div>
            <div className="card-body"><h2>17:30</h2><span className="status-text">Bus #404 - Downtown</span></div>
          </div>
          <div className="stat-card">
            <div className="card-header"><h3>Wallet Balance</h3></div>
            <div className="card-body"><h2>$45.50</h2><span className="status-text" style={{color: 'green'}}>Auto-Reload On</span></div>
          </div>
          <div className="stat-card">
            <div className="card-header"><h3>Total Trips</h3></div>
            <div className="card-body"><h2>124</h2><span className="status-text">Lifetime</span></div>
          </div>
          <div className="stat-card">
            <div className="card-header"><h3>Notifications</h3></div>
            <div className="card-body"><h2>0</h2><span className="status-text">All Caught Up</span></div>
          </div>
        </div>

        <div className="quick-actions">
           <button className="action-btn">Book a Seat</button>
           <button className="action-btn">View Schedule</button>
           <button className="action-btn">Add Funds</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;