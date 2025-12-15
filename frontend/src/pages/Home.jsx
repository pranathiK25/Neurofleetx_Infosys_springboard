import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css'; 

import AdminDashboard from '../dashboards/AdminDashboard';
import CustomerDashboard from '../dashboards/CustomerDashboard';
import DriverDashboard from '../dashboards/DriverDashboard';
import FleetManagerDashboard from '../dashboards/FleetManagerDashboard';

const Home = () => {
  const navigate = useNavigate();
  const [selectedView, setSelectedView] = useState(null);

  const handleBackToMenu = () => {
    setSelectedView(null);
  };

  if (selectedView) {
    return (
      <div>
        <div style={backButtonStyle} onClick={handleBackToMenu}>⬅ Back to Menu</div>
        {selectedView === 'ADMIN' && <AdminDashboard />}
        {selectedView === 'MANAGER' && <FleetManagerDashboard />}
        {selectedView === 'DRIVER' && <DriverDashboard />}
        {selectedView === 'COMMUTER' && <CustomerDashboard />}
      </div>
    );
  }

  return (
    <div className="home-layout">
      <nav className="navbar">
        <div className="nav-logo">
          NeuroFleetX <span style={{fontSize:'0.5em', opacity:0.7, marginLeft:'10px'}}>PORTAL</span>
        </div>
        
        <div className="nav-right">
            <button 
                className="action-btn secondary" 
                onClick={() => navigate('/profile')}
                style={{ padding: '8px 20px', fontSize: '0.9rem', border: '1px solid white', color: 'white' }}
            >
                My Profile
            </button>
        </div>
      </nav>

      <div className="page-container">
        <div className="hero-section">
          <h1>Welcome to NeuroFleetX</h1>
          <p>Select a dashboard below to enter that specific view.</p>
        </div>

        <div className="dashboard-grid">
          <div className="stat-card" onClick={() => setSelectedView('ADMIN')} style={{cursor: 'pointer', borderTop: '5px solid #dc3545'}}>
            <div className="card-header"><h3>System Access</h3></div>
            <div className="card-body"><h2>Admin</h2><span className="status-text" style={{color: '#dc3545'}}>Manage Users & Logs</span></div>
          </div>

          <div className="stat-card" onClick={() => setSelectedView('MANAGER')} style={{cursor: 'pointer', borderTop: '5px solid #ff9800'}}>
            <div className="card-header"><h3>Operations</h3></div>
            <div className="card-body"><h2>Manager</h2><span className="status-text" style={{color: '#ff9800'}}>Track Fleet & Maintenance</span></div>
          </div>

          <div className="stat-card" onClick={() => setSelectedView('DRIVER')} style={{cursor: 'pointer', borderTop: '5px solid #4caf50'}}>
            <div className="card-header"><h3>Logistics</h3></div>
            <div className="card-body"><h2>Driver</h2><span className="status-text" style={{color: '#4caf50'}}>View Routes & Assignments</span></div>
          </div>

          <div className="stat-card" onClick={() => setSelectedView('COMMUTER')} style={{cursor: 'pointer', borderTop: '5px solid #2196f3'}}>
            <div className="card-header"><h3>Public Transit</h3></div>
            <div className="card-body"><h2>Commuter</h2><span className="status-text" style={{color: '#2196f3'}}>Book Rides & Tickets</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const backButtonStyle = {
  position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#333', color: 'white',
  padding: '10px 20px', borderRadius: '30px', cursor: 'pointer', zIndex: 1000,
  boxShadow: '0 4px 10px rgba(0,0,0,0.3)', fontWeight: 'bold'
};

export default Home;