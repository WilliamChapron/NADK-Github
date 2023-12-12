// DialogController.js
import React, { useState, useEffect } from 'react';
import DialogComponent from './DialogComponent';

const DialogController = ({ isVisible, dialogMessages,  onClose, shouldHaveActionButton, resetFPSCameraController, setFPSCameraController }) => {
  const [dialogOpen, setDialogOpen] = useState(isVisible);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    if (isVisible) {
      openDialog();
    }
  }, [isVisible]);

  const openDialog = () => {
    setDialogOpen(true);
    resetFPSCameraController(document.getElementById('display-canvas'));
  };

  const closeDialog = () => {
    setDialogOpen(false);
    onClose();
    setFPSCameraController(document.getElementById('display-canvas'));
  };

  const handleNextMessage = () => {
    if (currentMessageIndex < dialogMessages.length - 1) {
      setCurrentMessageIndex(currentMessageIndex + 1);
    }
  };

  const handlePreviousMessage = () => {
    if (currentMessageIndex >= 0) {
      setCurrentMessageIndex(currentMessageIndex - 1);
    }
  };

  const handleActionButton = async () => {

  };

  return (
    <div>
      {dialogOpen && (
        <DialogComponent
          dialogOpen={dialogOpen}
          onClose={closeDialog}
          messages={dialogMessages}
          currentMessageIndex={currentMessageIndex}
          handleNextMessage={handleNextMessage}
          handlePreviousMessage={handlePreviousMessage}
          shouldHaveActionButton={shouldHaveActionButton}
          handleActionButton={handleActionButton}
        />
      )}
    </div>
  );
};

export default DialogController;
