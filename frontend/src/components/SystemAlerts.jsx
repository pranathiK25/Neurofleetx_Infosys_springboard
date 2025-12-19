// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/FleetDashboard.css';

// const SystemAlerts = () => {
//   const [alerts, setAlerts] = useState([]);
//   const navigate = useNavigate();

//   const fetchAlerts = async () => {
//     try {
//       const alertRes = await fetch('http://localhost:8080/api/vehicles/alerts');
//       if (alertRes.ok) {
//         const alertData = await alertRes.json();
//         if (Array.isArray(alertData)) setAlerts(alertData);
//       }
//     } catch (error) {
//       console.error("Connection Error:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAlerts();
//     const interval = setInterval(fetchAlerts, 5000); 
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="dashboard-container" style={{ minHeight: '100vh', padding: '40px' }}>
      
//       <div className="dashboard-header" style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '20px' }}>
//         <button 
//           onClick={() => navigate('/fleet-dashboard')} 
//           style={{ 
//             background: 'rgba(255,255,255,0.1)', 
//             border: '1px solid rgba(255,255,255,0.2)', 
//             color: 'white', 
//             padding: '10px 15px', 
//             borderRadius: '8px', 
//             cursor: 'pointer',
//             fontSize: '1rem'
//           }}
//         >
//           ← Back
//         </button>
//         <div>
//           <h1 style={{ fontSize: '2rem', margin: 0 }}>System Alerts Log</h1>
//           <p style={{ opacity: 0.7, margin: '5px 0 0 0' }}>Real-time vehicle anomalies and warnings</p>
//         </div>
//       </div>

//       <div className="glass-panel" style={{ padding: '20px' }}>
//         {alerts.length === 0 ? (
//            <div style={{ textAlign: 'center', padding: '40px', opacity: 0.6 }}>No active alerts found.</div>
//         ) : (
//            alerts.map(alert => (
//              <div key={alert.id || Math.random()} style={{ 
//                display: 'flex', 
//                justifyContent: 'space-between', 
//                alignItems: 'center',
//                padding: '15px', 
//                marginBottom: '10px', 
//                background: 'rgba(255,255,255,0.03)', 
//                borderRadius: '8px',
//                borderLeft: `4px solid ${alert.type === 'error' ? '#ff6b6b' : '#feca57'}`
//              }}>
//                <div>
//                  <div style={{ fontSize: '1.1rem', fontWeight: '500', color: alert.type === 'error' ? '#ff6b6b' : '#feca57' }}>
//                     {alert.message}
//                  </div>
//                  <div style={{ fontSize: '0.85rem', opacity: 0.5, marginTop: '4px' }}>
//                     Source: Vehicle Sensor ID #{alert.vehicleId || 'N/A'}
//                  </div>
//                </div>
//                <div style={{ textAlign: 'right', minWidth: '100px', fontSize: '0.9rem', opacity: 0.7 }}>
//                  {alert.timestamp ? new Date(alert.timestamp).toLocaleString() : 'Just Now'}
//                </div>
//              </div>
//            ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default SystemAlerts;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/FleetDashboard.css';

const SystemAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [vehicles, setVehicles] = useState([]); 
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      // Fetch Alerts
      const alertRes = await fetch('http://localhost:8080/api/vehicles/alerts');
      let alertData = [];
      if (alertRes.ok) {
        alertData = await alertRes.json();
      }

      // Fetch Vehicles
      const vehicleRes = await fetch('http://localhost:8080/api/vehicles');
      let vehicleData = [];
      if (vehicleRes.ok) {
        vehicleData = await vehicleRes.json();
      }

      if (Array.isArray(vehicleData)) setVehicles(vehicleData);
      if (Array.isArray(alertData)) setAlerts(alertData);

    } catch (error) {
      console.error("Connection Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  // ➤ ROBUST MATCHING FUNCTION
  const getVehicleDetails = (alert) => {
    if (!vehicles || vehicles.length === 0) return { plate: 'Loading...', location: 'Loading...' };

    // Strategy 1: Match by ID (loose equality for string/number match)
    let found = vehicles.find(v => v.id == alert.vehicleId);

    // Strategy 2: Match by Name inside Message (e.g. "Tesla is speeding")
    if (!found && alert.message) {
        found = vehicles.find(v => v.name && alert.message.includes(v.name));
    }

    // Strategy 3: Match by Plate inside Message (e.g. "MH-12 is speeding")
    if (!found && alert.message) {
        found = vehicles.find(v => v.plate && alert.message.includes(v.plate));
    }

    if (found) {
        return found;
    }
    
    return { plate: 'Unknown Plate', location: 'Unknown Location' };
  };

  return (
    <div className="dashboard-container" style={{ minHeight: '100vh', padding: '40px' }}>
      
      <div className="dashboard-header" style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button 
          onClick={() => navigate('/fleet-dashboard')} 
          style={{ 
            background: 'rgba(255,255,255,0.1)', 
            border: '1px solid rgba(255,255,255,0.2)', 
            color: 'white', 
            padding: '10px 15px', 
            borderRadius: '8px', 
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          ← Back
        </button>
        <div>
          <h1 style={{ fontSize: '2rem', margin: 0 }}>System Alerts Log</h1>
          <p style={{ opacity: 0.7, margin: '5px 0 0 0' }}>Real-time vehicle anomalies and warnings</p>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '20px' }}>
        {alerts.length === 0 ? (
           <div style={{ textAlign: 'center', padding: '40px', opacity: 0.6 }}>No active alerts found.</div>
        ) : (
           alerts.map(alert => {
             const vehicle = getVehicleDetails(alert);

             return (
               <div key={alert.id || Math.random()} style={{ 
                 display: 'flex', 
                 justifyContent: 'space-between', 
                 alignItems: 'center',
                 padding: '15px', 
                 marginBottom: '10px', 
                 background: 'rgba(255,255,255,0.03)', 
                 borderRadius: '8px',
                 borderLeft: `4px solid ${alert.type === 'error' ? '#ff6b6b' : '#feca57'}`
               }}>
                 
                 <div>
                   <div style={{ fontSize: '1.1rem', fontWeight: '500', color: alert.type === 'error' ? '#ff6b6b' : '#feca57', marginBottom: '4px' }}>
                      {alert.message}
                   </div>
                   
                   <div style={{ fontSize: '0.9rem', color: '#ccc', display: 'flex', gap: '15px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        🚗 <strong>{vehicle.plate}</strong>
                      </span>
                      <span style={{ opacity: 0.4 }}>|</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        📍 {vehicle.location}
                      </span>
                   </div>
                 </div>

                 <div style={{ textAlign: 'right', minWidth: '100px', fontSize: '0.9rem', opacity: 0.7 }}>
                   {alert.timestamp ? new Date(alert.timestamp).toLocaleString() : 'Just Now'}
                 </div>
               </div>
             );
           })
        )}
      </div>
    </div>
  );
};

export default SystemAlerts;