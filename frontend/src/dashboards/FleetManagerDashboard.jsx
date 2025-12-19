


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/FleetDashboard.css'; 
import UserMap from '../components/UserMap'; 

const FleetManagerDashboard = () => {
  const navigate = useNavigate(); 

  const [vehicles, setVehicles] = useState([]); 
  const [currentMapLocation, setCurrentMapLocation] = useState("Maharashtra, India");

  const drivers = [
    { id: 101, name: "Rohit Sharma", phone: "+91 98900 12345", rating: 4.8 },
    { id: 102, name: "Virat Kohli", phone: "+91 99220 67890", rating: 4.5 },
  ];

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newVehicle, setNewVehicle] = useState({ name: '', plate: '', status: 'Active', location: '' });

  const fetchFleetData = async () => {
    try {
      const vehicleRes = await fetch('http://localhost:8080/api/vehicles');
      if (vehicleRes.ok) {
        const data = await vehicleRes.json();
        if (Array.isArray(data)) setVehicles(data);
      }
    } catch (error) {
      console.error("Connection Error:", error);
    }
  };

  useEffect(() => {
    fetchFleetData();
    const interval = setInterval(fetchFleetData, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleAddClick = () => { setEditingId(null); setNewVehicle({ name: '', plate: '', status: 'Active', location: '' }); setShowModal(true); };
  const handleEditClick = (vehicle) => { setEditingId(vehicle.id); setNewVehicle({ name: vehicle.name, plate: vehicle.plate, status: vehicle.status, location: vehicle.location }); setShowModal(true); };
  const handleInputChange = (e) => { const { name, value } = e.target; setNewVehicle({ ...newVehicle, [name]: value }); };
  
  const handleSave = async () => {
    if (!newVehicle.name || !newVehicle.plate || !newVehicle.location) { alert("Please fill in all details"); return; }
    try {
      const url = editingId ? `http://localhost:8080/api/vehicles/${editingId}` : 'http://localhost:8080/api/vehicles/add';
      const method = editingId ? 'PUT' : 'POST';
      const payload = editingId ? { ...newVehicle } : { ...newVehicle, battery: 100, speed: 0, distance: 0 };
      const response = await fetch(url, { method: method, headers: { 'Content-Type': 'application/json', 'Role': 'FLEET MANAGER' }, body: JSON.stringify(payload) });
      if (response.ok) { await fetchFleetData(); setShowModal(false); setNewVehicle({ name: '', plate: '', status: 'Active', location: '' }); setEditingId(null); } 
      else { const errorText = await response.text(); alert("Server Error: " + errorText); }
    } catch (error) { console.error("Save failed:", error); }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure?")) return;
    try { await fetch(`http://localhost:8080/api/vehicles/${id}`, { method: 'DELETE', headers: { 'Role': 'FLEET MANAGER' } }); setVehicles(prev => prev.filter(v => v.id !== id)); } 
    catch (error) { console.error("Failed to delete:", error); }
  };

  const handleViewOnMap = (location) => { if (location) setCurrentMapLocation(location); };

  return (
    <div className="dashboard-container">
      
      <div className="dashboard-header" style={{ marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{fontSize: '2.2rem', margin: 0}}>Fleet Overview</h1>
          <p style={{fontSize: '1rem', marginTop: '5px', opacity: 0.7}}>Live Backend Connection • Updating every 3s</p>
        </div>
        
        <button 
          onClick={() => navigate('/home')} 
          style={{
            background: 'rgba(255,255,255,0.1)', 
            border: '1px solid rgba(255,255,255,0.2)', 
            color: 'white', 
            padding: '10px 20px', 
            borderRadius: '8px', 
            cursor: 'pointer',
            fontSize: '1rem',
            height: 'fit-content'
          }}
        >
          🏠 Back to Home
        </button>
      </div>

      <div className="stats-grid">
        <div className="glass-panel stat-card">
            <h3 style={{fontSize: '1rem', opacity: 0.8}}>Total Vehicles</h3>
            <div className="stat-value">{vehicles.length}</div>
        </div>
        
        <div className="glass-panel stat-card">
            <h3 style={{fontSize: '1rem', opacity: 0.8}}>Total Drivers</h3>
            <div className="stat-value">{drivers.length}</div>
        </div>
        
        <div className="glass-panel stat-card" style={{gridColumn: "span 2", display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px'}}>
           <div>
             <h3 style={{fontSize: '1.2rem', marginBottom: '5px'}}>System Health</h3>
             <span style={{opacity: 0.7}}>View full log of anomalies</span>
           </div>
           
           <button 
             onClick={() => navigate('/system-alerts')} 
             style={{
               background: '#ff6b6b', 
               border: 'none', 
               color: 'white', 
               padding: '12px 24px', 
               borderRadius: '8px', 
               cursor: 'pointer',
               fontWeight: 'bold',
               fontSize: '1rem',
               boxShadow: '0 4px 15px rgba(255, 107, 107, 0.4)'
             }}
           >
             Go to Alerts Log ➜
           </button>
        </div>
      </div>

      <div className="content-split">
        <div className="left-column">
          <div className="glass-panel table-panel">
            <div className="panel-header" style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding: '20px'}}>
                <h2 style={{fontSize: '1.3rem'}}>Live Fleet Status</h2>
                <button onClick={handleAddClick} style={btnAddStyle}>+ New Vehicle</button>
            </div>
            
            <div className="table-scroll-wrapper">
                <table className="glass-table">
                <thead>
                    <tr><th>Vehicle</th><th>Status</th><th>Speed</th><th>Battery</th><th>Actions</th></tr>
                </thead>
                <tbody>
                    {vehicles.map((v) => (
                    <tr key={v.id}>
                        <td style={{padding: '16px 12px'}}>
                            <div style={{fontWeight: 'bold', fontSize: '1rem'}}>{v.name}</div>
                            <div className="mono" style={{fontSize: '0.8rem', opacity: 0.6}}>{v.plate}</div>
                        </td>
                        <td><span className={`status-badge ${v.status ? v.status.toLowerCase().replace(' ', '-') : 'active'}`}>{v.status}</span></td>
                        <td className="mono" style={{color: v.speed > 100 ? '#ff4d4d' : 'white', fontSize: '1rem'}}>{v.speed} km/h</td>
                        <td style={{width: '20%'}}>
                            <div style={{width: '100%', background: 'rgba(255,255,255,0.1)', height: '8px', borderRadius: '4px', marginBottom:'5px'}}>
                                <div style={{width: `${v.battery}%`, background: v.battery < 20 ? '#ff4d4d' : '#4caf50', height: '100%', borderRadius: '4px', transition: 'width 0.5s ease'}}></div>
                            </div>
                            <span style={{fontSize: '0.75rem', opacity: 0.8}}>{Math.round(v.battery)}%</span>
                        </td>
                        <td className="actions-cell">
                        <button className="btn-icon view" onClick={() => handleViewOnMap(v.location)} title="View Map" style={{fontSize: '1.2rem'}}>📍</button>
                        <button className="btn-icon edit" onClick={() => handleEditClick(v)} title="Edit Vehicle" style={{ marginRight: '5px', fontSize: '1.2rem' }}>✏️</button>
                        <button className="btn-icon delete" onClick={() => handleDelete(v.id)} title="Delete" style={{fontSize: '1.2rem'}}>🗑️</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
          </div>
        </div>

        <div className="right-column">
            <div className="glass-panel map-panel">
                <div className="panel-header">
                    <h2 style={{margin: 0, fontSize: '1.1rem'}}>Live Tracking: {currentMapLocation}</h2>
                </div>
                <div className="map-container-wrapper">
                    <UserMap location={currentMapLocation} />
                </div>
            </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={modalContentStyle}>
            <h2>{editingId ? "Edit Vehicle" : "Add New Vehicle"}</h2>
            <input name="name" value={newVehicle.name} onChange={handleInputChange} placeholder="Model (e.g. Tesla Model 3)" style={inputStyle}/>
            <input name="plate" value={newVehicle.plate} onChange={handleInputChange} placeholder="Plate (e.g. MH-12-AB-1234)" style={inputStyle}/>
            <input name="location" value={newVehicle.location} onChange={handleInputChange} placeholder="Location (e.g. Pune, India)" style={inputStyle}/>
            <select name="status" value={newVehicle.status} onChange={handleInputChange} style={inputStyle}>
              <option value="Active">Active</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Idle">Idle</option>
            </select>
            <div className="modal-actions" style={{marginTop: '20px', display: 'flex', gap: '10px'}}>
              <button onClick={() => setShowModal(false)} style={btnCancelStyle}>Cancel</button>
              <button onClick={handleSave} style={btnSaveStyle}>{editingId ? "Update Vehicle" : "Save Vehicle"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const modalContentStyle = { background: '#1e1e2e', padding: '30px', borderRadius: '12px', width: '400px', color: 'white', display: 'flex', flexDirection: 'column', gap: '15px' };
const inputStyle = { padding: '12px', borderRadius: '8px', border: '1px solid #555', background: 'rgba(0,0,0,0.2)', color: 'white', fontSize: '1rem' };
const btnAddStyle = { background: '#6366f1', color:'white', border:'none', padding:'8px 16px', borderRadius:'6px', cursor:'pointer', fontWeight: '600' };
const btnSaveStyle = { flex:1, padding:'12px', background: '#6366f1', color:'white', border:'none', borderRadius:'6px', cursor:'pointer', fontWeight: 'bold' };
const btnCancelStyle = { flex:1, padding:'12px', background: 'transparent', color: '#ccc', border: '1px solid #555', borderRadius:'6px', cursor:'pointer' };

export default FleetManagerDashboard;