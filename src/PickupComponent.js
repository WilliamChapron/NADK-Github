import React, { useState, useEffect } from 'react';

const PickupComponent = ({ pickupInfo }) => {

  const pickupStyle = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: '1010',
    background: 'rgba(0, 0, 0, 0.9)',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.5)',
    opacity: 1,
    transform: `translateX(${1}px) scale(${1})`,
  };

  const headingStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: 'white',
  };

  return (
    <div style={pickupStyle}>
      {pickupInfo && (
        <div>
          <p style={headingStyle}>{pickupInfo[2]}</p>
          <p style={headingStyle}>Description : {pickupInfo[1]}</p>
          {pickupInfo[2] > 0 && (
            <p style={headingStyle}>Vous venez de gagner {pickupInfo[3]} points de score</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PickupComponent;
