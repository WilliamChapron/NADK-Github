// IMPORT 

// React
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useScript } from '@uidotdev/usehooks';

// Functions
import { HandleKeyDown } from './HandleKeyDown';
import { InitFirstPersonController } from './InitFirstPersonController';
import { SetFPSCameraController, ResetFPSCameraController } from './SetFPSCameraController';

// Component Controller
import DialogController from './DialogController';
import PickupController from './PickupController';
import ObjectiveController from './ObjectiveController';
import MobileButtons from './MobileButtons';

// Component
import LoadingScreen from './LoadingScreen';

// Game Controller

import { gameData, incrementScore, addDiscoverCountry, setGameMode, resetGame, gameUpdate } from './GameManager';

// Cinematic 

import { StartCinematic } from './CinematicWriter.js';


import {
  publicToken,
  mainSceneUUID,
  characterControllerSceneUUID,
} from "./config.js";

export const Canvas = () => {

  const canvasRef = useRef(null);

  // Key one press
  const [lastKeyPressed, setLastKeyPressed] = useState(null);

  const [isInteractable, setIsInteractable] = useState(true);

  // 3D VERSE States
  const [is3DVerseLoad, setIs3DVerseLoad] = useState(false);

  const [startingState, setStartingState] = useState(0);
  // DT
  let lastUpdateTime = performance.now();

  // JS Event States 
  const [isInitialClick, setIsInitialClick] = useState(false);
  const [isFPSControllerClick, setIsFPSControllerClick] = useState(false);
  
  const status = useScript(
    `https://cdn.3dverse.com/legacy/sdk/latest/SDK3DVerse.js`,
    {
      removeOnUnmount: false,
    }
  );
  

  // Update
  const update = async () => {
    gameUpdate();



  }

  // Use Effect Game Loop
  useEffect(() => {
    const updateLoop = async () => {
      if (is3DVerseLoad) {
        await update();
      }
    };

    const intervalId = setInterval(updateLoop, 4000); // 1000 milliseconds, adjust as needed

    return () => {
      clearInterval(intervalId); // Clear the interval when the component unmounts
    };

  }, [is3DVerseLoad]);

  // Si touche pressé
  const handleKeyDown = async (event) => {
    const key = await HandleKeyDown(event);
    if (key) {
      setLastKeyPressed(key);
    }
  };

  // Reset last key press
  const resetLastKeyPressed = () => {
    setLastKeyPressed(null);
  };
  useEffect(() => {
    console.log('lastKeyPressed a changé :', lastKeyPressed);
  
    const fetchData = async () => {
      if (status === 'ready') {
        await handleInitialClick();
      }
    };
  
    fetchData();
  }, [lastKeyPressed, status]);
  
  const initApp = async () => {
    if (status === 'ready') {
      await SDK3DVerse.joinOrStartSession({
        userToken: publicToken,
        sceneUUID: mainSceneUUID,
        canvas: document.getElementById("display-canvas"),
        createDefaultCamera: false,
        startSimulation: "on-assets-loaded",
      });
      await InitFirstPersonController(characterControllerSceneUUID);
      setIs3DVerseLoad(true);
    }
  };


  
  //------------------------------------------------------------------------------
  

  // Managing Single Click for First Active of Moving in space
  const handleClickForFPSController = async () => {
    if (!isFPSControllerClick) {
      window.removeEventListener('mousedown', handleClickForFPSController );
      SetFPSCameraController(document.getElementById('display-canvas'));
      setIsFPSControllerClick(true);
    }
  };
  

  // Managing Single Click for First Click to start the App with 3d verse Instead of the load
  const handleInitialClick = async () => {
    if (!isInitialClick) {
      setIsInitialClick(true); // Var for single click
      window.removeEventListener('click', handleInitialClick);
      if (!is3DVerseLoad) {
        await initApp();
        
        window.addEventListener('keydown', handleKeyDown); // Catch all key press

        window.addEventListener('mousedown', handleClickForFPSController); // Single click to active FPS Controller



        const clickEvent = new MouseEvent('mousedown', {
          bubbles: true,
          cancelable: true,
          view: window,
        });
        // Lancer l'événement de clic sur l'élément approprié
        const element = document.getElementById('display-canvas');
        element.dispatchEvent(clickEvent);


        


        // const player = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports();
        // const cameraEntity = player[0];

        // const block = await SDK3DVerse.engineAPI.findEntitiesByEUID("109c1226-637f-411e-b896-d02140baae1f");

        // SDK3DVerse.engineAPI.onEnterTrigger((cameraEntity, block) => {
        //   console.log("TRIGGER");
        //   // console.log(player.components.debug_name.value, " entered trigger of ", block.components.debug_name.value);
        // });

        // StartCinematic()



        


        
      }
    }

  };

  // Ajoutez l'événement click à la fenêtre
  // window.addEventListener('click', handleInitialClick);
  // window.addEventListener('load', handleInitialClick);

  

  return (
    <>
      <canvas
        id='display-canvas'
        style={{
          height: '100vh',
          width: '100vw',
          verticalAlign: 'middle',
        }}
        tabIndex="1"
        onContextMenu={event => event.preventDefault()}
      ></canvas>
  
      {is3DVerseLoad ? (
        <>
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
            resetFPSCameraController={ResetFPSCameraController}
            setFPSCameraController={SetFPSCameraController}
          />
          <PickupController
            pickupInfo={['name', 'Les infos de cette item sont là']}
            isVisible={lastKeyPressed === 'g'}
            onClose={resetLastKeyPressed}
          />
          {isInteractable && (
            <ObjectiveController
              currentObjective={'Aller dans la salle des coffres'}
              score={'345'}
              distanceToGoal={'1567 M'}
            />
          )}
          <MobileButtons />
        </>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
  


};
