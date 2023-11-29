// Dialog.js
import React from 'react';

const DialogComponent = ({ onClose, messages, currentMessageIndex, handleNextMessage }) => {
  const overlayStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    borderRadius: '3px',
    backdropFilter: 'blur(2px)', // Augmentation du flou
    background: 'rgba(0, 0, 0, 0.8)', // Fond plus sombre
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '1000',
  };

  const dialogStyle = {
    padding: '60px 120px', // Augmentation de la taille du padding
    border: '2px solid #fff', // Augmentation de l'épaisseur de la bordure
    background: '#000',
    color: '#fff',
    maxWidth: '600px', // Augmentation de la largeur maximale
    textAlign: 'center',
    position: 'relative',
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '10px', // Augmentation de la distance par rapport au haut
    right: '10px', // Augmentation de la distance par rapport à la droite
    cursor: 'pointer',
    fontSize: '18px', // Augmentation de la taille de la police
    color: '#fff',
    background: 'none',
    border: 'none',
  };

  const messageStyle = {
    fontSize: '24px', // Augmentation de la taille du texte
    marginBottom: '20px', // Augmentation de la marge en bas
  };

  return (
    <div style={overlayStyle}>
      <div style={dialogStyle}>
        <button style={closeButtonStyle} onClick={onClose}>X</button>
        <p style={messageStyle}>{messages[currentMessageIndex]}</p>
        <button onClick={handleNextMessage} style={{ fontSize: '20px' }}>Next</button> {/* Ajustement de la taille du bouton Next */}
      </div>
    </div>
  );
};

export default DialogComponent;
