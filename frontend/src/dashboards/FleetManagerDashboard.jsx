

import React, { useState } from 'react';
import '../styles/FleetDashboard.css'; 
import UserMap from '../components/UserMap'; 

const FleetManagerDashboard = () => {
  

  const [vehicles, setVehicles] = useState([
    { id: 1, name: "Toyota Innova", plate: "MH-12-JN-1234", status: "Active", location: "Pune, Maharashtra" },
    { id: 2, name: "Tata Winger", plate: "MH-14-GT-9988", status: "Maintenance", location: "Mumbai, Maharashtra" },
    { id: 3, name: "Maruti Ertiga", plate: "MH-02-AB-7766", status: "Active", location: "Nashik, Maharashtra" },
    { id: 4, name: "Mahindra XUV", plate: "MH-04-XY-4545", status: "Active", location: "Nagpur, Maharashtra" },
  ]);

  const drivers = [
    { id: 101, name: "Rohit", phone: "+91 98900 12345", rating: 4.8 },
    { id: 102, name: "Viraj", phone: "+91 99220 67890", rating: 4.5 },
  ];

  const [currentMapLocation, setCurrentMapLocation] = useState("Maharashtra, India");

  const [showModal, setShowModal] = useState(false);
  const [newVehicle, setNewVehicle] = useState({ 
    name: '', 
    plate: '', 
    status: 'Active', 
    location: '' 
  });

  
  const handleAddClick = () => {
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle({ ...newVehicle, [name]: value });
  };

  const handleSave = () => {
    if (!newVehicle.name || !newVehicle.plate || !newVehicle.location) {
      alert("Please fill in all details (Name, Plate, Location)");
      return;
    }
    setVehicles([...vehicles, { id: Date.now(), ...newVehicle }]); 
    setShowModal(false);
    setNewVehicle({ name: '', plate: '', status: 'Active', location: '' });
  };

  const handleViewOnMap = (location) => {
    if (location) setCurrentMapLocation(location);
  };

  const handleDelete = (id) => setVehicles(vehicles.filter(v => v.id !== id));

  return (
    <div className="dashboard-container">
      
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Fleet Overview</h1>
          <p>Manage vehicles, drivers, and live tracking</p>
        </div>
        
      </div>

      <div className="stats-grid">
        <div className="glass-panel stat-card">
          <h3>Total Vehicles</h3><div className="stat-value">{vehicles.length}</div>
        </div>
        <div className="glass-panel stat-card">
          <h3>Active Bookings</h3><div className="stat-value">12</div>
        </div>
        <div className="glass-panel stat-card">
          <h3>Total Drivers</h3><div className="stat-value">{drivers.length}</div>
        </div>
        
        <button className="glass-panel add-btn-card" onClick={handleAddClick}>
          <div className="plus-icon">+</div><span>Add Vehicle</span>
        </button>
      </div>

      <div className="content-split">
        
        <div className="left-column">
          <div className="glass-panel table-panel">
            <div className="panel-header"><h2>Fleet Management</h2></div>
            <table className="glass-table">
              <thead>
                <tr>
                  <th>Vehicle</th>
                  <th>Status</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((v) => (
                  <tr key={v.id}>
                    <td>
                      <div>{v.name}</div>
                      <div className="mono" style={{fontSize: '0.8rem', opacity: 0.7}}>{v.plate}</div>
                    </td>
                    <td><span className={`status-badge ${v.status.toLowerCase()}`}>{v.status}</span></td>
                    <td>{v.location}</td>
                    <td className="actions-cell">
                      <button 
                        className="btn-icon view" 
                        onClick={() => handleViewOnMap(v.location)}
                        title="View on Map"
                        style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc', marginRight: '5px' }}
                      >
                        📍 Map
                      </button>
                      <button className="btn-icon delete" onClick={() => handleDelete(v.id)}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="right-column">
          <div className="glass-panel map-panel">
            <div className="panel-header">
              <h2>Live Tracking: {currentMapLocation}</h2>
            </div>
            <div className="map-container-wrapper" style={{ flexGrow: 1, minHeight: '400px' }}>
              <UserMap location={currentMapLocation} />
            </div>
          </div>
        </div>

      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={modalContentStyle}>
            <h2>Add New Vehicle</h2>
            
            <label>Model</label>
            <input 
                name="name" 
                value={newVehicle.name} 
                onChange={handleInputChange} 
                placeholder="e.g. Toyota Innova" 
                style={inputStyle}
            />
            
            <label>Plate No.</label>
            <input 
                name="plate" 
                value={newVehicle.plate} 
                onChange={handleInputChange} 
                placeholder="MH-12-AB-1234" 
                style={inputStyle}
            />
            
            <label>Location (City)</label>
            <input 
                name="location" 
                value={newVehicle.location} 
                onChange={handleInputChange} 
                placeholder="e.g. Pune" 
                style={inputStyle}
            />
            
            <label>Status</label>
            <select 
                name="status" 
                value={newVehicle.status} 
                onChange={handleInputChange}
                style={inputStyle}
            >
              <option>Active</option>
              <option>Maintenance</option>
              <option>Idle</option>
            </select>

            <div className="modal-actions" style={{marginTop: '20px', display: 'flex', gap: '10px'}}>
              <button className="btn-cancel" onClick={() => setShowModal(false)} style={{flex:1, padding:'10px'}}>Cancel</button>
              <button className="btn-save" onClick={handleSave} style={{flex:1, padding:'10px', background: '#6366f1', color:'white', border:'none', borderRadius:'5px'}}>Save</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

const modalContentStyle = {
    background: '#1e1e2e', 
    padding: '30px', 
    borderRadius: '12px', 
    width: '400px', 
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
};

const inputStyle = {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #555',
    background: 'rgba(0,0,0,0.2)',
    color: 'white'
};

export default FleetManagerDashboard;