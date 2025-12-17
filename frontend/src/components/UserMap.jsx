import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// --- FIX MARKER ICONS (Leaflet Default Icon Bug) ---
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- COMPONENT TO UPDATE MAP VIEW ---
// This must be a CHILD of MapContainer to access the map context safely
const RecenterAutomatically = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
};

const UserMap = ({ location }) => {
  // Default: Center of India
  const [coords, setCoords] = useState([20.5937, 78.9629]); 

  useEffect(() => {
    if (!location) return;

    const loc = location.toLowerCase();
    
    // Simple Geocoding Logic
    if (loc.includes('pune')) setCoords([18.5204, 73.8567]);
    else if (loc.includes('mumbai')) setCoords([19.0760, 72.8777]);
    else if (loc.includes('nashik')) setCoords([19.9975, 73.7898]);
    else if (loc.includes('nagpur')) setCoords([21.1458, 79.0882]);
    else if (loc.includes('delhi')) setCoords([28.7041, 77.1025]);
    else if (loc.includes('bangalore')) setCoords([12.9716, 77.5946]);
    else if (loc.includes('hyderabad')) setCoords([17.3850, 78.4867]);
    // Default fallback if unknown
    else setCoords([20.5937, 78.9629]); 

  }, [location]);

  return (
    <div style={{ height: '100%', width: '100%', borderRadius: '12px', overflow: 'hidden', zIndex: 0 }}>
      {/* Key prop forces re-render if connection breaks, preventing white screen */}
      <MapContainer 
        center={coords} 
        zoom={10} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <Marker position={coords}>
          <Popup>{location || "Vehicle Location"}</Popup>
        </Marker>

        {/* This safe component handles the movement */}
        <RecenterAutomatically lat={coords[0]} lng={coords[1]} />
        
      </MapContainer>
    </div>
  );
};

export default UserMap;