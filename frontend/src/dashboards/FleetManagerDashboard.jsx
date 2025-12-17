

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/FleetDashboard.css'; 
// import UserMap from '../components/UserMap'; 

// const FleetManagerDashboard = () => {
//   const navigate = useNavigate();

//   // --- 1. INITIAL LOCAL DATA ---
//   const [vehicles, setVehicles] = useState([
//     { id: 1, name: "Toyota Innova", plate: "MH-12-JN-1234", status: "Active", location: "Pune, Maharashtra", battery: 85, speed: 0, distance: 850 },
//     { id: 2, name: "Tata Winger", plate: "MH-14-GT-9988", status: "Maintenance", location: "Mumbai, Maharashtra", battery: 10, speed: 0, distance: 2100 },
//     { id: 3, name: "Maruti Ertiga", plate: "MH-02-AB-7766", status: "Active", location: "Nashik, Maharashtra", battery: 92, speed: 45, distance: 400 },
//     { id: 4, name: "Mahindra XUV", plate: "MH-04-XY-4545", status: "Idle", location: "Nagpur, Maharashtra", battery: 100, speed: 0, distance: 50 },
//   ]);

//   const drivers = [
//     { id: 101, name: "Rohit Sharma", phone: "+91 98900 12345", rating: 4.8 },
//     { id: 102, name: "Virat Kohli", phone: "+91 99220 67890", rating: 4.5 },
//   ];

//   const [alerts, setAlerts] = useState([]); 
//   const [currentMapLocation, setCurrentMapLocation] = useState("Maharashtra, India");
//   const [showModal, setShowModal] = useState(false);
//   const [newVehicle, setNewVehicle] = useState({ name: '', plate: '', status: 'Active', location: '' });

//   // --- 2. FRONTEND SIMULATION LOOP (Runs every 3 seconds) ---
//   useEffect(() => {
//     const simulationInterval = setInterval(() => {
      
//       setVehicles(prevVehicles => {
//         return prevVehicles.map(v => {
//           let updated = { ...v };

//           // A. BATTERY LOGIC
//           if (updated.status === 'Active') {
//             updated.battery = Math.max(0, updated.battery - 2); // Drain 2%
//           } else if (updated.status === 'Idle') {
//             updated.battery = Math.max(0, updated.battery - 0.1); // Drain 0.1%
//           }

//           // Force Maintenance if Dead
//           if (updated.battery <= 0 && updated.status !== 'Maintenance') {
//             updated.status = 'Maintenance';
//             updated.speed = 0;
//             addLocalAlert(`CRITICAL: ${updated.name} battery dead!`, 'error');
//           }

//           // B. SPEED LOGIC
//           if (updated.status === 'Active') {
//             updated.speed = Math.floor(Math.random() * 121); // Random 0-120
            
//             if (updated.speed > 100) {
//               addLocalAlert(`OVERSPEEDING: ${updated.name} at ${updated.speed} km/h`, 'warning');
//             }
//           } else {
//             updated.speed = 0;
//           }

//           return updated;
//         });
//       });

//     }, 3000); 

//     return () => clearInterval(simulationInterval);
//   }, []);

//   // Helper to add alerts safely
//   const addLocalAlert = (message, type) => {
//     const newAlert = { id: Date.now() + Math.random(), message, type, time: new Date().toLocaleTimeString() };
//     setAlerts(prev => [newAlert, ...prev].slice(0, 5)); // Keep last 5
//   };

//   // --- 3. HANDLERS (Local Only) ---

//   const handleAddClick = () => setShowModal(true);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewVehicle({ ...newVehicle, [name]: value });
//   };

//   const handleSave = () => {
//     if (!newVehicle.name || !newVehicle.plate || !newVehicle.location) {
//       alert("Please fill in all details");
//       return;
//     }
//     // Add to Local State
//     setVehicles([...vehicles, { id: Date.now(), ...newVehicle, battery: 100, speed: 0, distance: 0 }]); 
//     setShowModal(false);
//     setNewVehicle({ name: '', plate: '', status: 'Active', location: '' });
//   };

//   const handleDelete = (id) => {
//     if(window.confirm("Are you sure?")) {
//       setVehicles(vehicles.filter(v => v.id !== id));
//     }
//   };

//   const handleViewOnMap = (location) => {
//     if (location) setCurrentMapLocation(location);
//   };

//   return (
//     <div className="dashboard-container">
      
//       {/* HEADER */}
//       <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <div>
//           <h1>Fleet Overview</h1>
//           <p>Frontend Simulation Active • Updating every 3s</p>
//         </div>
//         <button 
//           onClick={() => navigate('/home')} 
//           style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}
//         >
//           ← Back to Menu
//         </button>
//       </div>

//       {/* STATS GRID */}
//       <div className="stats-grid">
//         <div className="glass-panel stat-card">
//           <h3>Total Vehicles</h3><div className="stat-value">{vehicles.length}</div>
//         </div>
//         <div className="glass-panel stat-card">
//           <h3>Total Drivers</h3><div className="stat-value">{drivers.length}</div>
//         </div>
        
//         {/* ALERTS PANEL */}
//         <div className="glass-panel stat-card" style={{gridColumn: "span 2", display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
//           <h3>System Alerts</h3>
//           <div className="alerts-feed" style={{marginTop: '10px', fontSize: '0.85rem', overflowY: 'auto', maxHeight: '80px'}}>
//             {alerts.length === 0 && <span style={{color: '#666'}}>No active alerts...</span>}
//             {alerts.map(alert => (
//               <div key={alert.id} className={`alert-item ${alert.type}`}>
//                 <span className="alert-time">[{alert.time}]</span> {alert.message}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="content-split">
        
//         {/* LEFT COLUMN: VEHICLE LIST */}
//         <div className="left-column">
//           <div className="glass-panel table-panel">
//             <div className="panel-header" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
//                 <h2>Live Fleet Status</h2>
//                 <button className="btn-small" onClick={handleAddClick} style={{background: '#6366f1', color:'white', border:'none', padding:'5px 10px', borderRadius:'5px', cursor:'pointer'}}>
//                   + New Vehicle
//                 </button>
//             </div>
            
//             <table className="glass-table">
//               <thead>
//                 <tr>
//                   <th>Vehicle</th>
//                   <th>Status</th>
//                   <th>Speed</th>
//                   <th>Battery</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {vehicles.map((v) => (
//                   <tr key={v.id}>
//                     <td>
//                       <div>{v.name}</div>
//                       <div className="mono" style={{fontSize: '0.75rem', opacity: 0.7}}>{v.plate}</div>
//                     </td>
//                     <td>
//                       <span className={`status-badge ${v.status.toLowerCase().replace(' ', '-')}`}>
//                         {v.status}
//                       </span>
//                     </td>
//                     <td className="mono" style={{color: v.speed > 100 ? '#ff4d4d' : 'white'}}>
//                         {v.speed} km/h
//                     </td>
//                     <td>
//                         <div style={{width: '100%', background: 'rgba(255,255,255,0.1)', height: '6px', borderRadius: '3px', marginTop:'5px'}}>
//                             <div style={{
//                                 width: `${v.battery}%`, 
//                                 background: v.battery < 20 ? '#ff4d4d' : '#4caf50', 
//                                 height: '100%', borderRadius: '3px'
//                             }}></div>
//                         </div>
//                         <span style={{fontSize: '0.7rem', opacity: 0.8}}>{Math.round(v.battery)}%</span>
//                     </td>
//                     <td className="actions-cell">
//                       <button className="btn-icon view" onClick={() => handleViewOnMap(v.location)}>📍</button>
//                       <button className="btn-icon delete" onClick={() => handleDelete(v.id)}>🗑️</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* RIGHT COLUMN: MAP */}
//         <div className="right-column">
//           <div className="glass-panel map-panel">
//             <div className="panel-header"><h2>Live Tracking: {currentMapLocation}</h2></div>
//             <div className="map-container-wrapper" style={{ flexGrow: 1, minHeight: '400px' }}>
//               <UserMap location={currentMapLocation} />
//             </div>
//           </div>
//         </div>

//       </div>

//       {/* --- MODAL POPUP --- */}
//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal-content" style={modalContentStyle}>
//             <h2>Add New Vehicle</h2>
//             <input name="name" value={newVehicle.name} onChange={handleInputChange} placeholder="Model (e.g. Tesla)" style={inputStyle}/>
//             <input name="plate" value={newVehicle.plate} onChange={handleInputChange} placeholder="Plate (e.g. MH-12-XX)" style={inputStyle}/>
//             <input name="location" value={newVehicle.location} onChange={handleInputChange} placeholder="Location (e.g. Pune)" style={inputStyle}/>
//             <select name="status" value={newVehicle.status} onChange={handleInputChange} style={inputStyle}>
//               <option>Active</option><option>Maintenance</option><option>Idle</option>
//             </select>
//             <div className="modal-actions" style={{marginTop: '20px', display: 'flex', gap: '10px'}}>
//               <button className="btn-cancel" onClick={() => setShowModal(false)} style={{flex:1, padding:'10px'}}>Cancel</button>
//               <button className="btn-save" onClick={handleSave} style={{flex:1, padding:'10px', background: '#6366f1', color:'white', border:'none', borderRadius:'5px'}}>Save Local</button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// const modalContentStyle = { background: '#1e1e2e', padding: '30px', borderRadius: '12px', width: '400px', color: 'white', display: 'flex', flexDirection: 'column', gap: '10px' };
// const inputStyle = { padding: '10px', borderRadius: '6px', border: '1px solid #555', background: 'rgba(0,0,0,0.2)', color: 'white' };

// export default FleetManagerDashboard;




import React, { useState, useEffect } from 'react';
import '../styles/FleetDashboard.css'; 
import UserMap from '../components/UserMap'; 

const FleetManagerDashboard = () => {

  const [vehicles, setVehicles] = useState([]); 
  const [alerts, setAlerts] = useState([]); 
  const [currentMapLocation, setCurrentMapLocation] = useState("Maharashtra, India");

  const drivers = [
    { id: 101, name: "Rohit Sharma", phone: "+91 98900 12345", rating: 4.8 },
    { id: 102, name: "Virat Kohli", phone: "+91 99220 67890", rating: 4.5 },
  ];

  const [showModal, setShowModal] = useState(false);
  const [newVehicle, setNewVehicle] = useState({ name: '', plate: '', status: 'Active', location: '' });

 const fetchFleetData = async () => {
    try {
      const vehicleRes = await fetch('http://localhost:8080/api/vehicles');
      if (vehicleRes.ok) {
        const data = await vehicleRes.json();
        if (Array.isArray(data)) setVehicles(data);
      }

      const alertRes = await fetch('http://localhost:8080/api/vehicles/alerts');
      
      if (alertRes.ok) {
        const alertData = await alertRes.json();
        if (Array.isArray(alertData)) {
            setAlerts(alertData);
        }
      } else {
         console.warn("Alerts endpoint not found or error:", alertRes.status);
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

  const handleAddClick = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle({ ...newVehicle, [name]: value });
  };

  const handleSave = async () => {
    if (!newVehicle.name || !newVehicle.plate || !newVehicle.location) {
      alert("Please fill in all details");
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/vehicles/add', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Role': 'FLEET MANAGER' 
        },
        body: JSON.stringify({
            ...newVehicle,
            battery: 100, 
            speed: 0,
            distance: 0
        })
      });

      if (response.ok) {
        await fetchFleetData(); 
        setShowModal(false);
        setNewVehicle({ name: '', plate: '', status: 'Active', location: '' });
      } else {
        const errorText = await response.text();
        alert("Server Error: " + errorText);
      }

    } catch (error) {
      console.error("Save failed:", error);
      alert("Could not connect to backend.");
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure?")) return;
    try {
      await fetch(`http://localhost:8080/api/vehicles/${id}`, { 
          method: 'DELETE',
          headers: { 'Role': 'FLEET MANAGER' } 
      });
      setVehicles(prev => prev.filter(v => v.id !== id));
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const handleViewOnMap = (location) => {
    if (location) setCurrentMapLocation(location);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Fleet Overview</h1>
          <p>Live Backend Connection • Updating every 3s</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="glass-panel stat-card"><h3>Total Vehicles</h3><div className="stat-value">{vehicles.length}</div></div>
        <div className="glass-panel stat-card"><h3>Total Drivers</h3><div className="stat-value">{drivers.length}</div></div>
        
        <div className="glass-panel stat-card" style={{gridColumn: "span 2", display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
  <h3>System Alerts</h3>
  <div className="alerts-feed" style={{marginTop: '10px', fontSize: '0.85rem', overflowY: 'auto', maxHeight: '80px'}}>
    
    {alerts.length === 0 ? (
        <span style={{color: '#666'}}>No active alerts...</span>
    ) : (
        alerts.map(alert => (
          <div key={alert.id || Math.random()} style={{ marginBottom: '5px', paddingBottom:'5px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <span style={{ color: '#aaa', fontSize: '0.75rem', marginRight: '8px' }}>
              [{alert.timestamp ? new Date(alert.timestamp).toLocaleTimeString() : 'Now'}]
            </span>
            <span style={{ color: alert.type === 'error' ? '#ff6b6b' : '#feca57' }}>
              {alert.message}
            </span>
          </div>
        ))
    )}

  </div>
</div>
      </div>

      <div className="content-split">
        <div className="left-column">
          <div className="glass-panel table-panel">
            <div className="panel-header" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <h2>Live Fleet Status</h2>
                <button onClick={handleAddClick} style={btnAddStyle}>+ New Vehicle</button>
            </div>
            
            <table className="glass-table">
              <thead>
                <tr>
                  <th>Vehicle</th>
                  <th>Status</th>
                  <th>Speed</th>
                  <th>Battery</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((v) => (
                  <tr key={v.id}>
                    <td>
                      <div>{v.name}</div>
                      <div className="mono" style={{fontSize: '0.75rem', opacity: 0.7}}>{v.plate}</div>
                    </td>
                    <td><span className={`status-badge ${v.status ? v.status.toLowerCase().replace(' ', '-') : 'active'}`}>{v.status}</span></td>
                    <td className="mono" style={{color: v.speed > 100 ? '#ff4d4d' : 'white'}}>{v.speed} km/h</td>
                    <td>
                        <div style={{width: '100%', background: 'rgba(255,255,255,0.1)', height: '6px', borderRadius: '3px', marginTop:'5px'}}>
                            <div style={{width: `${v.battery}%`, background: v.battery < 20 ? '#ff4d4d' : '#4caf50', height: '100%', borderRadius: '3px'}}></div>
                        </div>
                        <span style={{fontSize: '0.7rem', opacity: 0.8}}>{Math.round(v.battery)}%</span>
                    </td>
                    <td className="actions-cell">
                      <button className="btn-icon view" onClick={() => handleViewOnMap(v.location)}>📍</button>
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
    {/* Header floats on top now */}
    <div className="panel-header">
      <h2 style={{margin: 0, fontSize: '1.1rem'}}>Live Tracking: {currentMapLocation}</h2>
    </div>
    
    {/* Map takes up the WHOLE box behind the header */}
    <div className="map-container-wrapper">
      <UserMap location={currentMapLocation} />
    </div>
  </div>
</div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={modalContentStyle}>
            <h2>Add New Vehicle</h2>
            <input name="name" value={newVehicle.name} onChange={handleInputChange} placeholder="Model" style={inputStyle}/>
            <input name="plate" value={newVehicle.plate} onChange={handleInputChange} placeholder="Plate" style={inputStyle}/>
            <input name="location" value={newVehicle.location} onChange={handleInputChange} placeholder="Location" style={inputStyle}/>
            <select name="status" value={newVehicle.status} onChange={handleInputChange} style={inputStyle}>
              <option value="Active">Active</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Idle">Idle</option>
            </select>
            <div className="modal-actions" style={{marginTop: '20px', display: 'flex', gap: '10px'}}>
              <button onClick={() => setShowModal(false)} style={btnCancelStyle}>Cancel</button>
              <button onClick={handleSave} style={btnSaveStyle}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const modalContentStyle = { background: '#1e1e2e', padding: '30px', borderRadius: '12px', width: '400px', color: 'white', display: 'flex', flexDirection: 'column', gap: '10px' };
const inputStyle = { padding: '10px', borderRadius: '6px', border: '1px solid #555', background: 'rgba(0,0,0,0.2)', color: 'white' };
const btnAddStyle = { background: '#6366f1', color:'white', border:'none', padding:'5px 10px', borderRadius:'5px', cursor:'pointer' };
const btnSaveStyle = { flex:1, padding:'10px', background: '#6366f1', color:'white', border:'none', borderRadius:'5px', cursor:'pointer' };
const btnCancelStyle = { flex:1, padding:'10px', background: 'transparent', color: '#ccc', border: '1px solid #555', borderRadius:'5px', cursor:'pointer' };

export default FleetManagerDashboard;