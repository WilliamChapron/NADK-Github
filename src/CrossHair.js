import React from 'react';

const Crosshair = () => {
  const crosshairStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '20px',
    height: '20px',
    pointerEvents: 'none', // Permet aux événements de souris de passer à travers le crosshair
  };

  const lineStyle = {
    position: 'absolute', // Changer à 'absolute' pour suivre le scroll
    backgroundColor: 'black', // Couleur du crosshair
    transformOrigin: 'center',
  };

  return (
    <div style={crosshairStyle}>
      <div style={{ ...lineStyle, width: '20px', height: '2px', top: '0', left: '-10px', transform: 'translateY(-50%)' }}></div>
      <div style={{ ...lineStyle, width: '2px', height: '20px', top: '-10px', left: '0', transform: 'translateX(-50%)' }}></div>
    </div>
  );
};

export default Crosshair;
