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

import CrossHair from './CrossHair';


// Component
import LoadingScreen from './LoadingScreen';
import ClickMessagePointerLockOverlay from './ClickMessagePointerLockOverlay';

// Game Controller

import gameManagerInstance from './GameManager'; 

// Cinematic 

import { StartCinematic, WritePositionToFile } from './CinematicWriter.js';


import {
  publicToken,
  mainSceneUUID,
  characterControllerSceneUUID,
} from "./config.js";

export const Canvas = () => {

  const canvasRef = useRef(null);

  // Objectives Current values
  const [currentObjectiveMeters, setCurrentObjectiveMeters] = useState(0);
  const [currentObjectiveMetersHeight, setCurrentObjectiveMetersHeight] = useState(0);

  const [currentObjectiveDescription, setCurrentObjectiveDescription] = useState("");

  // Pickup values 
  const [currentPickupName, setCurrentPickupName] = useState("");
  const [currentPickupDescription, setCurrentPickupDescription] = useState("");

  // Npc values

  const [currentNPCName, setCurrentNPCName] = useState("");
  const [currentNPCDialog, setCurrentNPCDialog] = useState([]);
  const [currentNPCAction, setCurrentNPCAction] = useState(null);


  

  // Key one press
  const [lastKeyPressed, setLastKeyPressed] = useState(null);

  // Don't display objectives if popup for pickup find is open
  const [isPickupComponentOpen, setIsPickupComponentOpen] = useState(false);








  // 3D VERSE States
  const [is3DVerseLoad, setIs3DVerseLoad] = useState(false);

  const [isPointerLockInitialWasClick, setIsPointerLockInitialWasClick] = useState(false);

  // DT

  // JS Event States 
  const [isInitialClick, setIsInitialClick] = useState(false);
  const [isFPSControllerClick, setIsFPSControllerClick] = useState(false);

  // Cinematic 
  const [isCinematicEnd, setIsCinematicEnd] = useState(false);

  // Timeout

  
  
  const status = useScript(
    `https://cdn.3dverse.com/legacy/sdk/latest/SDK3DVerse.js`,
    {
      removeOnUnmount: false,
    }
  );



  

  // Update
  const update = async () => {

    // Project point 3d to 2d 

    // const playerviewPort = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()

    // const project = await playerviewPort[0].project([0,0,0])


    // console.log("Project POINT", project)

    await gameManagerInstance.gameUpdate();
    setCurrentObjectiveMeters(gameManagerInstance.gameData.objectiveInstance.objectives[gameManagerInstance.gameData.objectiveInstance.currentObjectiveIndex].meters)
    setCurrentObjectiveMetersHeight(gameManagerInstance.gameData.objectiveInstance.objectives[gameManagerInstance.gameData.objectiveInstance.currentObjectiveIndex].heightMeters)

    



  }

  // Use Effect Game Loop
  useEffect(() => {
    const updateLoop = async () => {
      if (is3DVerseLoad) {
        await update();
      }
    };

    const intervalId = setInterval(updateLoop, 1000); // 1000 milliseconds, adjust as needed

    return () => {
      clearInterval(intervalId); // Clear the interval when the component unmounts
    };

  }, [is3DVerseLoad]);

  async function getHighestAncestor(entity) {
    const ancestors = await entity.getAncestors();
  
    if (ancestors && ancestors.length > 0) {
      // Récupère le dernier ancêtre dans la liste (le plus haut dans la hiérarchie)
      const highestAncestor = ancestors[ancestors.length - 1];
      return highestAncestor;
    } else {
      // Si l'entité n'a pas d'ancêtres, elle est déjà la plus haute
      return entity;
    }
  }
  

  // useEffect(() => {
  //   console.log('Dernière touche appuyée :', lastKeyPressed);
  // }, [lastKeyPressed]); // Effect déclenché chaque fois que lastKeyPressed change




  let lastKeyPressTime = 0;

  // Si touche pressé alors Evenements liées aux interactions
  const handleKeyDown = async (event) => {
    const currentTime = new Date().getTime();
    

    // Vérifier si le temps écoulé depuis la dernière pression de touche est supérieur à 2000 millisecondes (2 secondes)
    if (currentTime - lastKeyPressTime > 200) {

      // console.log(currentTime, "", lastKeyPressTime)


      const key = await HandleKeyDown(event);

      if (key) {
        setLastKeyPressed(key);
      }

      if (key === "f") {
        if (gameManagerInstance.gameData.canWriteCinematic) {
          gameManagerInstance.gameData.canWriteCinematic = false;
        }
        else if (gameManagerInstance.gameData.canWriteCinematic == false) {
          gameManagerInstance.gameData.canWriteCinematic = true;
        }
        resetLastKeyPressed();
      }

      


      // WritePositionToFile(position);


      // Interaction with npc and objects
      if (key === "e") {



        const canvasElement = document.getElementById('display-canvas');
        const canvasRect = canvasElement.getBoundingClientRect();

        const centerX = canvasRect.left + canvasRect.width / 2;
        const centerY = canvasRect.top + canvasRect.height / 2;

        // Pick pos
        const { entity, pickedPosition, pickedNormal } = await SDK3DVerse.engineAPI.castScreenSpaceRay(centerX, centerY, false);

        const highestAncestor = await getHighestAncestor(entity);
        const nameOfEntity = await highestAncestor.getName();

        console.log(nameOfEntity);



        if (nameOfEntity.match(/^NPC/)) {

          // Set current npc for dialog interface
          await gameManagerInstance.gameData.NPCInstance.setCurrentNpc(nameOfEntity);
          // Get current npc to set use state var
          const NPC = await gameManagerInstance.gameData.NPCInstance.getCurrentNpc()

          // console.log(NPC)
          const currentNPCdialog = await gameManagerInstance.gameData.NPCInstance.getCurrentNPCDialog()

          setCurrentNPCName(NPC.name);
          setCurrentNPCDialog(currentNPCdialog)
          // setCurrentNPCAction(currentNPCdialog.action)

          SDK3DVerse.disableInputs()

          
        } else if (nameOfEntity.match(/^Object/)) {
          
          // Set current npc for dialog interface
          await gameManagerInstance.gameData.pickupInstance.setCurrentPickup(nameOfEntity);
          // Get current npc to set use state var
          const Pickup = await gameManagerInstance.gameData.pickupInstance.getCurrentPickup()


          setCurrentPickupName(Pickup.name);
          setCurrentPickupDescription(Pickup.description);

          
          // setCurrentNPCAction(currentNPCdialog.action)

        } else {
          console.log("Le nom de l'entité ne commence ni par 'NPC' ni par 'Object'");
        }
        resetLastKeyPressed();
      }

      lastKeyPressTime = currentTime;
    }
  };
  

  

  

  // Reset INFO npc at null
  const resetCurrentNPC = () => {
    SDK3DVerse.enableInputs()
    resetLastKeyPressed()
    setCurrentNPCName("");
    setCurrentNPCDialog([])
    setCurrentNPCAction(null)

  };

  const resetCurrentPickup = () => {
    resetLastKeyPressed()

    setIsPickupComponentOpen(false) // Don't display objective when pickup popup is active

    setCurrentPickupName("")
    setCurrentPickupDescription("")

  };

  const resetLastKeyPressed = () => {
    setLastKeyPressed(null);
  };

  let positionsAndOrientationToWrite = []

  const updateRender = async () => {
    // StartCinematic()

    // # TODO Place in functions

    // Write position if Write list is over 100
    if (positionsAndOrientationToWrite.length > 100) {
      WritePositionToFile(positionsAndOrientationToWrite);
      console.log(positionsAndOrientationToWrite)
      positionsAndOrientationToWrite.splice(0, positionsAndOrientationToWrite.length);
      console.log(positionsAndOrientationToWrite)
    }


    // Event to allow to write posiiton in cinematic and push the list
    if (gameManagerInstance.gameData.canWriteCinematic) {
      const camera = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports();
      const transform = await camera[0].getTransform();
      const textToPush = {
        position: transform.position,
        orientation: transform.orientation
      };
      positionsAndOrientationToWrite.push(textToPush);
    }

    
  }




  // Start Actions when 3DVerse is Ready
  useEffect(() => {
    const fetchDataReady = async () => {
      if (status === 'ready') {
        await handleInitialClick();
        await gameManagerInstance.initGame();
        SDK3DVerse.notifier.on('onFramePostRender', updateRender);
      }
    };
  
    fetchDataReady();
  }, [status]);



  
  
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
      const joysticksElement = document.getElementById('joysticks');
      SDK3DVerse.installExtension(window.SDK3DVerse_VirtualJoystick_Ext, null, joysticksElement);
      setIs3DVerseLoad(true);
    }
  };





  
  //------------------------------------------------------------------------------
  

  // Managing Single Click for First Active of Moving in space
  const handleClickForFPSController = async () => {
    if (!isFPSControllerClick) {
      window.removeEventListener('click', handleClickForFPSController );
      SetFPSCameraController(document.getElementById('display-canvas'));
      setIsFPSControllerClick(true);
      setIsPointerLockInitialWasClick(true)
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

        window.addEventListener('click', handleClickForFPSController); // Single click to active FPS Controller


        

        // const player = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports();
        // const cameraEntity = player[0];

        // const block = await SDK3DVerse.engineAPI.findEntitiesByEUID("109c1226-637f-411e-b896-d02140baae1f");

        // SDK3DVerse.engineAPI.onEnterTrigger((cameraEntity, block) => {
        //   console.log("TRIGGER");
        //   // console.log(player.components.debug_name.value, " entered trigger of ", block.components.debug_name.value);
        // });


        
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
  
      {is3DVerseLoad && isPointerLockInitialWasClick && (
        <>
          <CrossHair/>
          <DialogController
            isVisible={currentNPCDialog && currentNPCDialog.length > 0}
            dialogMessages={currentNPCDialog}
            onClose={resetCurrentNPC}
            shouldHaveActionButton={true}
            resetFPSCameraController={ResetFPSCameraController}
            setFPSCameraController={SetFPSCameraController}
          />
          <PickupController
            pickupInfo={[currentPickupName, currentPickupDescription]}
            isVisible={currentPickupName !== "" && currentPickupDescription !== ""}
            onOpen={() => setIsPickupComponentOpen(true)} 
            onClose={resetCurrentPickup}
          />
          {!isPickupComponentOpen && (
            <ObjectiveController
              currentObjective={'Aller dans la salle des coffres'}
              score={'345'}
              distanceToGoal={currentObjectiveMeters}
              distanceToGoalInHeight={currentObjectiveMetersHeight}
            />
          )}
          {/* <MobileButtons /> */}
        </>
      )}
  
      {!is3DVerseLoad && (
        <>
          <LoadingScreen />
        </>
      )}
  
      {is3DVerseLoad && !isPointerLockInitialWasClick && (
        <>
          <ClickMessagePointerLockOverlay />
        </>
      )}
    </>
  );
  
  


};









        // const clickEvent = new MouseEvent('click', {
        //   bubbles: true,
        //   cancelable: true,
        //   view: window,
        // });
        // // Lancer l'événement de clic sur l'élément approprié
        // const element = document.getElementById('display-canvas');
        // element.dispatchEvent(clickEvent);
