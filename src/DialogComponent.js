// DialogComponent.js
import React from 'react';

const DialogComponent = ({ onClose, messages, currentMessageIndex, handleNextMessage, handlePreviousMessage }) => {
  const overlayStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
    backdropFilter: 'blur(5px)', // Augmentation du flou
    background: 'rgba(0, 0, 0, 0.8)', // Fond plus sombre
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: '1000',
    padding: '20px',
  };

  const dialogStyle = {
    width: '100%', // Ajustement de la largeur
    maxWidth: '600px', // Augmentation de la largeur maximale
    textAlign: 'center',
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
    color: '#fff',
  };

  const buttonStyle = {
    fontSize: '20px', // Ajustement de la taille des boutons
    margin: '10px', // Ajout de marges aux boutons
    padding: '10px 20px', // Ajout de padding aux boutons
    cursor: 'pointer',
    background: '#007BFF', // Couleur du fond
    color: '#fff', // Couleur du texte
    border: 'none',
    borderRadius: '5px',
    outline: 'none',
  };

  return (
    <div style={overlayStyle}>
      <div style={dialogStyle}>
        <button style={closeButtonStyle} onClick={onClose}>X</button>
        <p style={messageStyle}>{messages[currentMessageIndex]}</p>
        <button onClick={handlePreviousMessage} style={buttonStyle} disabled={currentMessageIndex === 0}>
          Previous
        </button>
        <button onClick={handleNextMessage} style={buttonStyle} disabled={currentMessageIndex === messages.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default DialogComponent;
