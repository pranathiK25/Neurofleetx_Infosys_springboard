import React, { useState } from 'react';
import '../styles/FleetDashboard.css';
import UserMap from '../components/UserMap.jsx'; // <--- IMPORTING YOUR EXISTING MAP

const FleetDashboard = () => {
  // --- STATE ---
  // Added 'location' field to mock data
  const [vehicles, setVehicles] = useState([
    { id: 1, name: "Toyota Innova", plate: "MH-12-JN-1234", status: "Active", location: "Pune, India" },
    { id: 2, name: "Tata Winger", plate: "MH-14-GT-9988", status: "Maintenance", location: "Mumbai, India" },
    { id: 3, name: "Maruti Ertiga", plate: "MH-02-AB-7766", status: "Active", location: "Nashik, India" },
    { id: 4, name: "Mahindra XUV", plate: "MH-04-XY-4545", status: "Active", location: "Nagpur, India" },
  ]);

  const drivers = [
    { id: 101, name: "Rohit Sharma", phone: "+91 98900 12345", rating: 4.8 },
    { id: 102, name: "Virat Kohli", phone: "+91 99220 67890", rating: 4.5 },
  ];

  // Map State: Defaults to "Maharashtra"
  const [mapLocation, setMapLocation] = useState("Maharashtra, India");
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [newVehicle, setNewVehicle] = useState({ name: '', plate: '', status: 'Active', location: '' });

  // --- HANDLERS ---
  
  // 1. Update Map when "View" is clicked
  const handleViewMap = (location) => {
    if (location) {
      setMapLocation(location);
    } else {
      alert("No location data for this vehicle");
    }
  };

  const handleDelete = (id) => setVehicles(vehicles.filter(v => v.id !== id));
  
  const handleAddClick = () => setShowModal(true);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle({ ...newVehicle, [name]: value });
  };

  const handleSave = () => {
    if (!newVehicle.name || !newVehicle.plate) return alert("Please fill details");
    setVehicles([...vehicles, { id: Date.now(), ...newVehicle }]); 
    setShowModal(false);
    setNewVehicle({ name: '', plate: '', status: 'Active', location: '' });
  };

  return (
    <div className="dashboard-container">
      
      {/* HEADER */}
      <div className="dashboard-header">
        <h1>Fleet Overview</h1>
        <p>Manage vehicles, drivers, and live tracking</p>
      </div>

      {/* STATS GRID */}
      <div className="stats-grid">
        <div className="glass-panel stat-card">
          <h3>Total Vehicles</h3>
          <div className="stat-value">{vehicles.length}</div>
        </div>
        <div className="glass-panel stat-card">
          <h3>Active Bookings</h3>
          <div className="stat-value">12</div>
        </div>
        <div className="glass-panel stat-card">
          <h3>Total Drivers</h3>
          <div className="stat-value">{drivers.length}</div>
        </div>
        
        <button className="glass-panel add-btn-card" onClick={handleAddClick}>
          <div className="plus-icon">+</div>
          <span>Add Vehicle</span>
        </button>
      </div>

      {/* MAIN CONTENT SPLIT */}
      <div className="content-split">
        
        {/* LEFT COLUMN: VEHICLE LIST */}
        <div className="left-column">
          <div className="glass-panel table-panel">
            <div className="panel-header">
              <h2>Fleet Management</h2>
            </div>
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
                    <td>
                      <span className={`status-badge ${v.status.toLowerCase()}`}>
                        {v.status}
                      </span>
                    </td>
                    <td>{v.location || "N/A"}</td>
                    <td className="actions-cell">
                      {/* BUTTON TO TRIGGER MAP UPDATE */}
                      <button 
                        className="btn-icon view" 
                        title="Locate on Map"
                        onClick={() => handleViewMap(v.location)}
                      >
                        📍 Map
                      </button>
                      
                      <button className="btn-icon delete" onClick={() => handleDelete(v.id)}>
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COLUMN: LIVE MAP */}
        <div className="right-column">
          <div className="glass-panel map-panel">
            <div className="panel-header">
              {/* Shows which location is currently active */}
              <h2>Live Tracking: {mapLocation}</h2>
            </div>
            
            <div className="map-container-wrapper">
              {/* PASSING STATE TO YOUR USERMAP COMPONENT */}
              <UserMap location={mapLocation} />
            </div>
            
          </div>
        </div>

      </div>

      {/* MODAL (ADD VEHICLE) */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Vehicle</h2>
            
            <label>Model</label>
            <input name="name" value={newVehicle.name} onChange={handleInputChange} placeholder="e.g. Toyota Innova" />
            
            <label>Plate No.</label>
            <input name="plate" value={newVehicle.plate} onChange={handleInputChange} placeholder="MH-12-AB-1234" />
            
            <label>Location (City)</label>
            <input name="location" value={newVehicle.location} onChange={handleInputChange} placeholder="e.g. Pune" />
            
            <label>Status</label>
            <select name="status" value={newVehicle.status} onChange={handleInputChange}>
              <option>Active</option>
              <option>Maintenance</option>
              <option>Idle</option>
            </select>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-save" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default FleetDashboard;