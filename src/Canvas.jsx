import React, { useCallback, useEffect, useRef, useState } from 'react';
import UseSDK3DVerse from './UseSDK3DVerse';

// Functions
import { HandleKeyDown } from './HandleKeyDown';
import { InitFirstPersonController } from './InitFirstPersonController';
import { SetFPSCameraController } from './SetFPSCameraController';


import ProgressBar from './ProgressBar';


// Controller
import DialogController from './DialogController';
import PickupController from './PickupController';
import ObjectiveController from './ObjectiveController';

export const Canvas = () => {
  const status = UseSDK3DVerse();
  const canvasRef = useRef(null);
  const [lastKeyPressed, setLastKeyPressed] = useState(null);
  const [isInteractable, setIsInteractable] = useState(false);
  let lastUpdateTime = performance.now();

  const [isSDK3DVerseInitialized, setIsSDK3DVerseInitialized] = useState(false);

  const initApp = useCallback(async () => {
    if (canvasRef.current && status === 'ready') {
      const SDK3DVerse = window.SDK3DVerse;
      await SDK3DVerse.joinOrStartSession({
        userToken: 'public_-nM_De0OP4HFtVZc',
        sceneUUID: '425f1f1e-2995-4c5e-849a-39c505038dbd',
        canvas: document.getElementById('display-canvas'),
        createDefaultCamera: false,
        startSimulation: 'on-assets-loaded',
      });

      await InitFirstPersonController('ff0b5223-75dc-48ad-ae0d-d710012c3a80');
      console.log("dfd")
      setIsSDK3DVerseInitialized(true);
    }
  }, [status]);

  const handleKeyDown = async (event) => {
    const key = await HandleKeyDown(event);
    if (key) {
      setLastKeyPressed(key);
    }
  };



  const update = async () => {
    // const speed = 100; 
    // const deltaTime = performance.now() - lastUpdateTime;
    // const distance = (speed * deltaTime) / 1000; 


    // const clientID = await SDK3DVerse.engineAPI.cameraAPI.currentClientUUID()
    // const camera = await SDK3DVerse.engineAPI.cameraAPI.getClientCameras(clientID)
    
    // console.log(clientID)

    // lastUpdateTime = performance.now();
  }

  useEffect(() => {
    initApp();
    // document.addEventListener('contextmenu', function (event) {
    //   event.preventDefault();
    // });
    

    // window.addEventListener('mousedown', () => SetFPSCameraController(document.getElementById('display-canvas')));


    // Nettoyer les écouteurs d'événements lors du démontage du composant
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [initApp]);

  useEffect(() => {
    console.log('lastKeyPressed a changé :', lastKeyPressed);
  }, [lastKeyPressed]);

  useEffect(() => {

    const updateLoop = async () => {
      if (isSDK3DVerseInitialized) {
        await update();
      }
      requestAnimationFrame(updateLoop);
    };
  
    updateLoop();  
  
    return () => {

    };
  }, [isSDK3DVerseInitialized]);

  const resetLastKeyPressed = () => {
    setLastKeyPressed(null);
  };


  return (
    <div>
      <DialogController
        dialogOpenProp={lastKeyPressed === 'a'}
        dialogMessages={[
          'Bonjour !',
          'Comment ça va ?',
          "C'est un beau jour.",
          'Autre message',
        ]}
        onClose={resetLastKeyPressed}
        shouldHaveActionButton={true}
      />
      <PickupController
        pickupInfo={['name', 'Les infos de cette item sont la']}
        isVisible={lastKeyPressed === 'g'}
        onClose={resetLastKeyPressed}
      />
      {/* <ProgressBar value={50}>Kevlar</ProgressBar> */}

      {isInteractable && (
        <ObjectiveController
          currentObjective={'Aller dans la salle des coffres'}
          score={'345'}
          distanceToGoal={'1567 M'}
        />
      )}

      <canvas
        ref={canvasRef}
        id='display-canvas'
        style={{
          height: '100vh',
          width: '100vw',
          verticalAlign: 'middle',
        }}
        tabIndex="1"
      ></canvas>
    </div>
  );
};
