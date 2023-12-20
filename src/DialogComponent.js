// DialogComponent.js
import React from 'react';

const DialogComponent = ({ dialogOpen, onClose, messages, currentMessageIndex, handleNextMessage, handlePreviousMessage, shouldHaveActionButton, handleActionButton, currentActionName }) => {
  const overlayStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
    background: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: '1000',
    padding: '20px',
    border: '2px solid #3498db', // Bordure bleue
    boxShadow: '0px 0px 20px rgba(52, 152, 219, 0.8)', // Ombre bleue
  };

  const dialogStyle = {
    width: '100%',
    maxWidth: '600px',
    textAlign: 'center',
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
    fontSize: '18px',
    color: '#fff',
    background: 'none',
    border: 'none',
  };

  const messageStyle = {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#fff',
  };

  const buttonStyle = {
    fontSize: '20px',
    margin: '10px',
    padding: '10px 20px',
    cursor: 'pointer',
    background: '#3498db', // Couleur de fond bleue
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    outline: 'none',
    transition: 'background 0.3s ease', // Animation de transition
  };

  const actionButtonStyle = {
    fontSize: '20px',
    margin: '10px',
    padding: '10px 20px',
    cursor: 'pointer',
    background: '#e74c3c', // Couleur de fond rouge pour le bouton d'action
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    outline: 'none',
    transition: 'background 0.3s ease', // Animation de transition
  };

  return (
    <>
      {dialogOpen && (
        <div style={overlayStyle}>
          <div style={dialogStyle}>
            <button style={closeButtonStyle} onClick={onClose}>
              X
            </button>
            <p style={messageStyle}>{messages[currentMessageIndex]}</p>
            {currentMessageIndex > 0 && (
              <button onClick={handlePreviousMessage} style={buttonStyle}>
                Previous
              </button>
            )}
            {currentMessageIndex < messages.length - 1 && (
              <button onClick={handleNextMessage} style={buttonStyle}>
                Next
              </button>
            )}
            {shouldHaveActionButton && currentMessageIndex === messages.length - 1 && (
              <button onClick={handleActionButton} style={actionButtonStyle}>
                {currentActionName}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DialogComponent;
