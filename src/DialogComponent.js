import React from 'react';
import './DialogComponent.css'; // Import the CSS file

const DialogComponent = ({ dialogOpen, onClose, messages, currentMessageIndex, handleNextMessage, handlePreviousMessage, shouldHaveActionButton, handleActionButton, currentActionName }) => {
  return (
    <>
      {dialogOpen && (
        <div className="overlay">
          <div className="dialog">
            <button className="closeButton" onClick={onClose}>
              X
            </button>
            <p className="message">{messages[currentMessageIndex]}</p>
            {currentMessageIndex > 0 && (
              <button onClick={handlePreviousMessage} className="buttonStyle">
                Previous
              </button>
            )}
            {currentMessageIndex < messages.length - 1 && (
              <button onClick={handleNextMessage} className="buttonStyle">
                Next
              </button>
            )}
            {shouldHaveActionButton && currentMessageIndex === messages.length - 1 && (
              <button onClick={handleActionButton} className="actionButtonStyle">
                Continuer l'aventure
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DialogComponent;
