import React from 'react';

const UserMap = ({ location }) => {
  // If no address is provided, default to "New York"
  const query = location && location.trim() !== "" ? location : "New York, USA";
  
  // Create search URL
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div style={containerStyle}>
      <iframe 
        title="User Location"
        width="100%" 
        height="100%" 
        frameBorder="0" 
        style={{ border: 0 }} 
        allowFullScreen 
        src={mapSrc}
      ></iframe>
    </div>
  );
};

const containerStyle = {
  width: '100%',
  height: '350px',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
  background: '#222'
};

export default UserMap;