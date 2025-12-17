// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../services/apiClient';
// import UserMap from '../components/UserMap'; 
// import '../styles/profile.css'; 

// const Profile = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);

//   const [userData, setUserData] = useState({
//     name: '', email: '', role: '', phone: '', address: '', city: '', zip: '', 
//     dob: '', licenseNumber: '', licenseExpiry: '', 
//     vehicleModel: '', vehiclePlate: '', vehicleYear: '',
//     joined: '2023-01-15', lat: 40.7128, lng: -74.0060
//   });

//   // --- 1. LOAD DATA ---
//   useEffect(() => {
//     const fetchData = async () => {
//         const token = localStorage.getItem('token');
//         if (!token) { navigate('/login'); return; }

//         try {
//             const response = await api.get('/auth/profile');
//             console.log("Database Data:", response.data);

//             setUserData(prev => ({ 
//                 ...prev, 
//                 ...response.data,
//                 name: response.data.name || response.data.fullName || "User",
//                 role: response.data.role ? response.data.role.toUpperCase() : "DRIVER"
//             }));
            
//         } catch (error) {
//             console.error("Error loading:", error);
//             const stored = localStorage.getItem('user');
//             if (stored) setUserData(prev => ({...prev, ...JSON.parse(stored)}));
//         } finally {
//             setLoading(false);
//         }
//     };
//     fetchData();
//   }, [navigate]);

//   const handleChange = (e) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };

//   // --- 2. SAVE DATA ---
//   const handleSave = async () => {
//     try {
//         await api.post('/auth/profile', userData);
//         localStorage.setItem('user', JSON.stringify(userData));
//         setIsEditing(false);
//         alert("Profile Saved Successfully!");
//     } catch (error) {
//         console.error("Save failed:", error);
//         alert("Could not save to database.");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate('/login');
//   };

//   if (loading) return <div style={{color:'white', padding:'40px', textAlign:'center'}}>Loading...</div>;

//   return (
//     <div className="profile-page-wrapper">
      
//       {/* ➤ UPDATED HEADER BAR */}
//       <div className="profile-navbar">
//         {/* LEFT: Logo (Clickable to go Home) */}
//         <div className="nav-left" onClick={() => navigate('/home')}>
//             <span className="brand-logo">NeuroFleetX</span>
//         </div>

//         {/* RIGHT: Page Title + Close Button */}
//         <div className="nav-right">
//             <span className="nav-title">My Profile</span>
//             <button onClick={() => navigate('/home')} className="nav-close-btn">
//                 ✕ Close
//             </button>
//         </div>
//       </div>

//       <div className="profile-layout-grid">
        
//         {/* --- LEFT SIDEBAR --- */}
//         <div className="profile-sidebar card-glass">
//           <div className="avatar-section">
//              <div className="avatar-circle-xl">
//                {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
//              </div>
//              <h3>{userData.name}</h3>
//              <p className="sub-text">{userData.vehicleModel || "No Vehicle Assigned"}</p>
//              <span className="role-pill">{userData.role}</span>
//           </div>

//           <div className="sidebar-details">
//             <div className="detail-item">
//                 <label>Username</label>
//                 <p>{userData.email ? userData.email.split('@')[0] : 'user'}</p>
//             </div>
//             <div className="detail-item">
//                 <label>Member Since</label>
//                 <p>{userData.joined}</p>
//             </div>
//           </div>
//           <button className="btn-logout-sidebar" onClick={handleLogout}>Logout Account</button>
//         </div>

//         {/* --- RIGHT CONTENT --- */}
//         <div className="profile-content">
            
//             <div className="info-card card-glass">
//                 <div className="card-header-bar">Personal Information</div>
//                 <div className="card-row">
//                     <label>Full Name</label>
//                     <input type="text" name="name" value={userData.name} onChange={handleChange} disabled={!isEditing} className="input-clean" />
//                 </div>
//                 <div className="card-row">
//                     <label>Date of Birth</label>
//                     <input type="date" name="dob" value={userData.dob || ''} onChange={handleChange} disabled={!isEditing} className="input-clean" />
//                 </div>
//                 <div className="card-row">
//                     <label>Email</label>
//                     <input type="text" value={userData.email} disabled className="input-clean" />
//                 </div>
//             </div>

//             <div className="info-card card-glass">
//                 <div className="card-header-bar">Contact Details</div>
//                 <div className="card-row">
//                     <label>Phone</label>
//                     <input type="text" name="phone" value={userData.phone} onChange={handleChange} disabled={!isEditing} className="input-clean" placeholder="Add Phone..." />
//                 </div>
//                 <div className="card-row">
//                     <label>Address</label>
//                     <input type="text" name="address" value={userData.address} onChange={handleChange} disabled={!isEditing} className="input-clean" placeholder="Add Address..." />
//                 </div>
//                 <div className="card-row">
//                     <label>City / Zip</label>
//                     <div style={{width:'65%', display:'flex', gap:'10px', justifyContent:'flex-end'}}>
//                         <input type="text" name="city" value={userData.city} onChange={handleChange} disabled={!isEditing} className="input-clean" placeholder="City" style={{textAlign:'right'}} />
//                         <span style={{color:'#666'}}>|</span>
//                         <input type="text" name="zip" value={userData.zip} onChange={handleChange} disabled={!isEditing} className="input-clean" placeholder="Zip" style={{textAlign:'right', width:'80px'}} />
//                     </div>
//                 </div>
//             </div>

//             <div className="info-card card-glass">
//                 <div className="card-header-bar">Fleet & Verification</div>
//                 <div className="card-row">
//                     <label>License Number</label>
//                     <input type="text" name="licenseNumber" value={userData.licenseNumber} onChange={handleChange} disabled={!isEditing} className="input-clean" placeholder="DL-XXXXX" />
//                 </div>
//                 <div className="card-row">
//                     <label>License Expiry</label>
//                     <input type="date" name="licenseExpiry" value={userData.licenseExpiry || ''} onChange={handleChange} disabled={!isEditing} className="input-clean" />
//                 </div>
//                 <div className="card-row">
//                     <label>Vehicle Model</label>
//                     <input type="text" name="vehicleModel" value={userData.vehicleModel} onChange={handleChange} disabled={!isEditing} className="input-clean" placeholder="Toyota..." />
//                 </div>
//                 <div className="card-row">
//                     <label>Plate Number</label>
//                     <input type="text" name="vehiclePlate" value={userData.vehiclePlate} onChange={handleChange} disabled={!isEditing} className="input-clean" placeholder="KA-01..." />
//                 </div>
//             </div>

//             <div className="info-card card-glass">
//                 <div className="card-header-bar">Last Known Location</div>
//                 <div style={{padding: '20px'}}>
//                     <UserMap location={`${userData.address || ''} ${userData.city || ''} ${userData.zip || ''}`} />
//                 </div>
//             </div>

//             <div className="action-row" style={{marginBottom: '40px'}}>
//                 {isEditing ? (
//                     <button className="btn-save" onClick={handleSave}>Save All Changes</button>
//                 ) : (
//                     <button className="btn-edit" onClick={() => setIsEditing(true)}>Edit Details</button>
//                 )}
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;











import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/apiClient';
import UserMap from '../components/UserMap'; 
import '../styles/profile.css'; 

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    name: '', email: '', role: '', phone: '', address: '', city: '', zip: '', 
    dob: '', licenseNumber: '', licenseExpiry: '', 
    vehicleModel: '', vehiclePlate: '', vehicleYear: '',
    joined: '2023-01-15', lat: 40.7128, lng: -74.0060
  });

  // --- 1. LOAD DATA ---
  useEffect(() => {
    const fetchData = async () => {
        const token = localStorage.getItem('token');
        if (!token) { navigate('/login'); return; }

        try {
            const response = await api.get('/auth/profile');
            console.log("Database Data:", response.data);

            setUserData(prev => ({ 
                ...prev, 
                ...response.data,
                name: response.data.name || response.data.fullName || "User",
                role: response.data.role ? response.data.role.toUpperCase() : "DRIVER"
            }));
            
        } catch (error) {
            console.error("Error loading:", error);
            const stored = localStorage.getItem('user');
            if (stored) setUserData(prev => ({...prev, ...JSON.parse(stored)}));
        } finally {
            setLoading(false);
        }
    };
    fetchData();
  }, [navigate]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // --- 2. SAVE DATA ---
  const handleSave = async () => {
    try {
        await api.post('/auth/profile', userData);
        localStorage.setItem('user', JSON.stringify(userData));
        setIsEditing(false);
        alert("Profile Saved Successfully!");
    } catch (error) {
        console.error("Save failed:", error);
        alert("Could not save to database.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (loading) return <div style={{color:'white', padding:'40px', textAlign:'center'}}>Loading...</div>;

  return (
    <div className="profile-page-wrapper">
      
      {/* HEADER BAR */}
      <div className="profile-navbar">
        <div className="nav-left" onClick={() => navigate('/home')}>
            <span className="brand-logo">NeuroFleetX</span>
        </div>
        <div className="nav-right">
            <span className="nav-title">My Profile</span>
            <button onClick={() => navigate('/home')} className="nav-close-btn">
                ✕ Close
            </button>
        </div>
      </div>

      <div className="profile-layout-grid">
        
        {/* --- LEFT SIDEBAR --- */}
        <div className="profile-sidebar card-glass">
          <div className="avatar-section">
             <div className="avatar-circle-xl">
               {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
             </div>
             <h3>{userData.name}</h3>
             <p className="sub-text">{userData.vehicleModel || "No Vehicle Assigned"}</p>
             <span className="role-pill">{userData.role}</span>
          </div>

          <div className="sidebar-details">
            <div className="detail-item">
                <label>Username</label>
                <p>{userData.email ? userData.email.split('@')[0] : 'user'}</p>
            </div>
            <div className="detail-item">
                <label>Member Since</label>
                <p>{userData.joined}</p>
            </div>
          </div>
          <button className="btn-logout-sidebar" onClick={handleLogout}>Logout Account</button>
        </div>

        {/* --- RIGHT CONTENT --- */}
        <div className="profile-content">
            
            <div className="info-card card-glass">
                <div className="card-header-bar">Personal Information</div>
                <div className="card-row">
                    <label>Full Name</label>
                    <input type="text" name="name" value={userData.name} onChange={handleChange} disabled={!isEditing} className="input-clean" />
                </div>
                <div className="card-row">
                    <label>Date of Birth</label>
                    <input type="date" name="dob" value={userData.dob || ''} onChange={handleChange} disabled={!isEditing} className="input-clean" />
                </div>
                <div className="card-row">
                    <label>Email</label>
                    <input type="text" value={userData.email} disabled className="input-clean" />
                </div>
            </div>

            <div className="info-card card-glass">
                <div className="card-header-bar">Contact Details</div>
                <div className="card-row">
                    <label>Phone</label>
                    <input type="text" name="phone" value={userData.phone} onChange={handleChange} disabled={!isEditing} className="input-clean" placeholder="Add Phone..." />
                </div>
                <div className="card-row">
                    <label>Address</label>
                    <input type="text" name="address" value={userData.address} onChange={handleChange} disabled={!isEditing} className="input-clean" placeholder="Add Address..." />
                </div>
                <div className="card-row">
                    <label>City / Zip</label>
                    <div style={{width:'65%', display:'flex', gap:'10px', justifyContent:'flex-end'}}>
                        <input type="text" name="city" value={userData.city} onChange={handleChange} disabled={!isEditing} className="input-clean" placeholder="City" style={{textAlign:'right'}} />
                        <span style={{color:'#666'}}>|</span>
                        <input type="text" name="zip" value={userData.zip} onChange={handleChange} disabled={!isEditing} className="input-clean" placeholder="Zip" style={{textAlign:'right', width:'80px'}} />
                    </div>
                </div>
            </div>

            <div className="info-card card-glass">
                <div className="card-header-bar">Fleet & Verification</div>
                <div className="card-row">
                    <label>License Number</label>
                    <input type="text" name="licenseNumber" value={userData.licenseNumber} onChange={handleChange} disabled={!isEditing} className="input-clean" placeholder="DL-XXXXX" />
                </div>
                <div className="card-row">
                    <label>License Expiry</label>
                    <input type="date" name="licenseExpiry" value={userData.licenseExpiry || ''} onChange={handleChange} disabled={!isEditing} className="input-clean" />
                </div>
                <div className="card-row">
                    <label>Vehicle Model</label>
                    <input type="text" name="vehicleModel" value={userData.vehicleModel} onChange={handleChange} disabled={!isEditing} className="input-clean" placeholder="Toyota..." />
                </div>
                <div className="card-row">
                    <label>Plate Number</label>
                    <input type="text" name="vehiclePlate" value={userData.vehiclePlate} onChange={handleChange} disabled={!isEditing} className="input-clean" placeholder="KA-01..." />
                </div>
            </div>

            {/* ➤ CHANGED SECTION START */}
            <div className="info-card card-glass">
                <div className="card-header-bar">Last Known Location</div>
                
                {/* IMPORTANT: We added a wrapper DIV with a fixed height (300px).
                   Without this, the map collapses to 0 height because UserMap uses height:100%
                */}
                <div style={{ padding: '15px', height: '350px', width: '100%', position: 'relative' }}>
                    <UserMap 
                        // We construct the string so your existing UserMap logic can find the city name
                        location={`${userData.address || ''} ${userData.city || ''} ${userData.zip || ''}`} 
                    />
                </div>
            </div>
            {/* ➤ CHANGED SECTION END */}

            <div className="action-row" style={{marginBottom: '40px'}}>
                {isEditing ? (
                    <button className="btn-save" onClick={handleSave}>Save All Changes</button>
                ) : (
                    <button className="btn-edit" onClick={() => setIsEditing(true)}>Edit Details</button>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;