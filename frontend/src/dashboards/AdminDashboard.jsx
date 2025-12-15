import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="home-layout">
      {/* Navbar */}
      <nav className="navbar" style={{ borderBottom: '4px solid #dc3545' }}>
        <div className="nav-logo">NeuroFleetX <span style={{fontSize:'0.6em', opacity:0.8}}>ADMIN</span></div>
        <div className="nav-right">
          <button onClick={handleLogout} className="action-btn secondary" style={{padding: '5px 15px'}}>Logout</button>
          <div className="profile-icon">A</div>
        </div>
      </nav>

      <div className="page-container">
        <div className="hero-section">
          <h1>System Administration</h1>
          <p className="role-badge" style={{backgroundColor: '#dc3545'}}>Super User Access</p>
        </div>

        {/* Admin Stats Grid */}
        <div className="dashboard-grid">
          <div className="stat-card">
            <div className="card-header"><h3>Total Users</h3></div>
            <div className="card-body"><h2>1,240</h2><span className="status-text" style={{color: 'green'}}>+12 this week</span></div>
          </div>
          <div className="stat-card">
            <div className="card-header"><h3>Active Fleets</h3></div>
            <div className="card-body"><h2>58</h2><span className="status-text">Operating Normal</span></div>
          </div>
          <div className="stat-card">
            <div className="card-header"><h3>System Health</h3></div>
            <div className="card-body"><h2>99.9%</h2><span className="status-text" style={{color: 'blue'}}>Server Online</span></div>
          </div>
          <div className="stat-card">
            <div className="card-header"><h3>Pending Approvals</h3></div>
            <div className="card-body"><h2>4</h2><span className="status-text" style={{color: 'orange'}}>Action Required</span></div>
          </div>
        </div>

        <div className="quick-actions">
           <button className="action-btn">Manage Users</button>
           <button className="action-btn">System Logs</button>
           <button className="action-btn">Global Settings</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;