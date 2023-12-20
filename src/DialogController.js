// DialogController.js
import React, { useState, useEffect } from 'react';
import DialogComponent from './DialogComponent';

const DialogController = ({ isVisible, dialogMessages,  onClose, onAction, currentActionName, shouldHaveActionButton, resetFPSCameraController, setFPSCameraController }) => {
  const [dialogOpen, setDialogOpen] = useState(isVisible);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);




  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (isVisible) {
        // await getOpenDialogOrientation();  // Attendre que onOpen soit terminé
        await openDialog();  // Attendre que openDialog soit termin
      }
    };

    handleVisibilityChange();

    return () => {
      setCurrentMessageIndex(0); // Reset message index when component is unmounted
    };
  }, [isVisible]);

  const openDialog = async () => {
    setDialogOpen(true);
    await resetFPSCameraController(document.getElementById('display-canvas'));
    // await setOpenDialogOrientation()
  };

  const closeDialog = async () => {
    setDialogOpen(false);
    await onClose();
    await setFPSCameraController(document.getElementById('display-canvas'));
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
          handleActionButton={onAction}
          currentActionName={currentActionName}
        />
      )}
    </div>
  );
};

export default DialogController;


  // Store player orientation to enter in dialog interface and set orientation in interface because pointer lock move camera when it's setup
  // let dialogOrientation = []

  // async function getOpenDialogOrientation() {
  //   // const clientUUID = await SDK3DVerse.getClientUUID();
  //   // const player = await SDK3DVerse.engineAPI.findEntitiesByNames(`Player_${clientUUID}`);
  //   // #TODO DONT WORK FOR MULTIPLAYER  BECAUSE WE DON'T HAVE ACCESS TO PLAYER VALUE
  //   const camera = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports();
  //   const orientation = await SDK3DVerse.utils.clone(camera[0].getTransform().orientation);
  //   console.log("get", orientation)
  //   dialogOrientation = orientation;
  // }

  // async function setOpenDialogOrientation() {

  //   const camera = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports();
  //   // const clientUUID = await SDK3DVerse.getClientUUID();
  //   // const player = await SDK3DVerse.engineAPI.findEntitiesByNames(`Player_${clientUUID}`);
  //   // console.log("set orient", dialogOrientation)
  //   // player[0].setGlobalTransform({ orientation : dialogOrientation})
  //   console.log("set", dialogOrientation)
  //   camera[0].setGlobalTransform({ orientation : dialogOrientation})
  //   dialogOrientation = []
  // }
