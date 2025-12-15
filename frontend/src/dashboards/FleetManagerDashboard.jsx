
import '../styles/FleetDashboard.css'; 

const Dashboard = () => {
  const statsData = [
    { title: "Active Vehicles", value: "42", sub: "60 total" },
    { title: "Active Trips", value: "8", sub: "154 completed (week)" },
    { title: "Active Drivers", value: "38", sub: "Available now" },
    { title: "Weekly Revenue", value: "₹32,450", sub: "This week" },
    { title: "Fleet Size", value: "60", sub: "All registered" },
    { title: "Completed Trips (W)", value: "154", sub: "Week total" },
  ];

  const vehiclesData = [
    { id: "VH-1000", model: "Toyota Innova", driver: "Rohit S.", location: "Pune", km: "66 km", status: "active" },
    { id: "VH-1001", model: "Winger", driver: "Kumar P.", location: "Sangli", km: "10 km", status: "maintenance" },
    { id: "VH-1002", model: "Tata Ace", driver: "Asha R.", location: "Pandharpur", km: "187 km", status: "idle" },
    { id: "VH-1003", model: "Mahindra e-Verito", driver: "Siddhesh M.", location: "Mumbai", km: "141 km", status: "active" },
    { id: "VH-1004", model: "Toyota Innova", driver: "Rohit S.", location: "Pune", km: "45 km", status: "maintenance" },
  ];

  const activeTrips = [
    { id: "TR-9001", vehicle: "VH-1001", route: "Sangli → Pandharpur • ETA 22 min" },
    { id: "TR-9002", vehicle: "VH-1003", route: "Pune → Mumbai • ETA 120 min" },
  ];

  const driversData = [
    { name: "Rohit S.", meta: "DR-101 • 4.7 ★" },
    { name: "Asha R.", meta: "DR-102 • 4.9 ★" },
    { name: "Siddhesh M.", meta: "DR-103 • 4.4 ★" },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'active': return 'badge active';
      case 'maintenance': return 'badge maint';
      case 'idle': return 'badge idle';
      default: return 'badge';
    }
  };

  return (
    <div className="app-container">
      
      <nav className="navbar">
        <div className="brand">
          NeuroFleetX <span className="brand-sub">Fleet Manager Dashboard</span>
        </div>
        <div className="nav-right">
          <span>Welcome, Fleet Manager</span>
          <button className="btn-primary">New Trip</button>
        </div>
      </nav>

      <div className="dashboard-container">
        
        <div className="header-section">
          <div className="header-titles">
            <h1>Fleet Overview</h1>
            <p>Snapshot of fleet health, active trips, and revenue</p>
          </div>
          <div className="header-controls">
            <div className="search-wrapper">
              <input type="text" placeholder="Search vehicles, drivers, loc..." />
            </div>
            <select className="status-select">
              <option>All status</option>
              <option>Active</option>
              <option>Maintenance</option>
            </select>
            <button className="btn-dark">Export CSV</button>
          </div>
        </div>

        <div className="stats-grid">
          {statsData.map((stat, index) => (
            <div className="stat-card" key={index}>
              <h3>{stat.title}</h3>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-sub">{stat.sub}</div>
            </div>
          ))}
        </div>

        <div className="content-grid">
          
          <div className="main-column">
            <div className="card table-card">
              <div className="card-header">
                <h2>Vehicles</h2>
                <span className="results-count">Showing {vehiclesData.length} results</span>
              </div>
              <table className="fleet-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Model</th>
                    <th>Driver</th>
                    <th>Location</th>
                    <th>KMs Today</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {vehiclesData.map((v, i) => (
                    <tr key={i}>
                      <td className="fw-bold">{v.id}</td>
                      <td>{v.model}</td>
                      <td>{v.driver}</td>
                      <td>{v.location}</td>
                      <td>{v.km}</td>
                      <td>
                        <span className={getStatusClass(v.status)}>
                          {v.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="sidebar-column">
            
            <div className="card">
              <div className="card-header">
                <h2>Active Trips</h2>
                <span className="results-count">{activeTrips.length} ongoing</span>
              </div>
              {activeTrips.map((trip, i) => (
                <div className="trip-item" key={i}>
                  <div className="trip-details">
                    <div className="trip-id">{trip.id} — {trip.vehicle}</div>
                    <div className="trip-route">{trip.route}</div>
                  </div>
                  <div className="trip-actions">
                    <button className="link-view">View</button>
                    <button className="btn-green-sm">Mark complete</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="card">
              <div className="card-header">
                <h2>Drivers</h2>
              </div>
              {driversData.map((driver, i) => (
                <div className="driver-item" key={i}>
                  <div className="driver-info">
                    <div className="driver-name">{driver.name}</div>
                    <div className="driver-meta">{driver.meta}</div>
                  </div>
                  <div className="driver-actions">
                    <button className="btn-text">Call</button>
                    <button className="btn-text">Msg</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="card map-card">
              <div className="card-header">
                <h2>Map / Visualization</h2>
              </div>
              <div className="map-placeholder">
                <div className="map-controls">
                  <button>+</button>
                  <button>-</button>
                </div>
                <div className="map-dot dot-1"></div>
                <div className="map-dot dot-2"></div>
                <div className="map-dot dot-3"></div>
                <div className="map-footer">Live mode: Simulation (client-side)</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;