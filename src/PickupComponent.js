// PickupComponent.js
import React from 'react';

const PickupComponent = ({ pickupInfo }) => {
  const pickupStyle = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '20px',
    color: '#fff',
    background: 'linear-gradient(to right, #1a1a1a, #333, #1a1a1a)',
    borderRadius: '10px',
    border: '2px solid #fff',
    display: pickupInfo ? 'block' : 'none',
    transition: 'visibility 0s, opacity 0.5s linear',
    zIndex: '1010',
  };

  const headingStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  };
  
  return (
    <div style={pickupStyle}>
      <p style={headingStyle}>Name :  {pickupInfo[0]}</p>
      <p style={headingStyle}>Info : {pickupInfo[1]}</p>
    </div>
  );
};

export default PickupComponent;
