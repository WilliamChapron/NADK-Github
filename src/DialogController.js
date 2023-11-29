// DialogController.js
import React, { useState, useEffect } from 'react';
import DialogComponent from './DialogComponent';

const DialogController = ({ dialogOpenProp, onClose }) => {
  const [dialogOpen, setDialogOpen] = useState(null);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    onClose();
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

  const dialogMessages = ["Bonjour !", "Comment ça va ?", "C'est un beau jour.", "Autre message"];

  useEffect(() => {
    setDialogOpen(dialogOpenProp);
  }, [dialogOpenProp]);

  return (
    <div>
      {dialogOpen && (
        <DialogComponent
          onClose={closeDialog}
          messages={dialogMessages}
          currentMessageIndex={currentMessageIndex}
          handleNextMessage={handleNextMessage}
          handlePreviousMessage={handlePreviousMessage}
        />
      )}
    </div>
  );
};

export default DialogController;
