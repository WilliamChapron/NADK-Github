import React from 'react';

const ClickMessagePointerLockOverlay = ({ onClick }) => {
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond semi-transparent
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff', // Couleur du texte
    fontSize: '24px',
    cursor: 'pointer', // Curseur indiquant que c'est cliquable
  };

  return (
    <div style={overlayStyle} onClick={onClick}>
      Cliquez pour jouer
    </div>
  );
};

export default ClickMessagePointerLockOverlay;
