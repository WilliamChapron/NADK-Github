
// React
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useScript } from '@uidotdev/usehooks';

// Functions
import { InitFirstPersonController } from './InitFirstPersonController';
import { SetFPSCameraController, ResetFPSCameraController } from './SetFPSCameraController';

// Component Controller
import DialogController from './DialogController';
import PickupController from './PickupController';
import ObjectiveController from './ObjectiveController';
import EntityHeadLabelDisplayController from "./EntityHeadLabelDisplayController"

import InteractMobileComponent from './InteractMobileComponent';

// Component
import LoadingScreen from './LoadingScreen';
import ClickMessagePointerLockOverlay from './ClickMessagePointerLockOverlay';
import SubtitleComponent from "./SubtitleComponent"
import CrossHair from './CrossHair';

// Game Controller
import gameManagerInstance from './GameManager'; 

// Scenario 
import scenarioScriptFunctions from './scenarioScriptFunctions.js'; 

// Cinematic 
import { StartCinematic, WritePositionToFile } from './CinematicWriter.js';

import * as glMatrix from 'gl-matrix';

// Config
import {
  publicToken,
  mainSceneUUID,
  characterControllerSceneUUID,
} from "./config.js";


window.lastPickupComponentState = 0
window.drawObjectives = true
window.drawLabels = true
window.drawSubtitle = false
let timeSeconds = 0
let sessionID = 0

// Fonction pour incrémenter le temps
function incrementTime() {
  timeSeconds += 1;
  // console.log(timeSeconds)
}

const timer = setInterval(incrementTime, 1000);
let isMobile = false


// Canva / Main
export const Canvas = () => {

  const canvasRef = useRef(null);
  // Objectives Current values
  const [currentObjectiveMeters, setCurrentObjectiveMeters] = useState(0);
  const [currentObjectiveMetersHeight, setCurrentObjectiveMetersHeight] = useState(0);
  const [currentObjectiveDescription, setCurrentObjectiveDescription] = useState("");
  const [currentScore, setCurrentScore] = useState("");
  // Pickup values 
  const [currentPickupName, setCurrentPickupName] = useState("");
  const [currentPickupDescription, setCurrentPickupDescription] = useState("");
  const [currentPickupText, setCurrentPickupText] = useState("");
  const [currentPickupScore, setCurrentPickupScore] = useState(0);

  // Npc values
  const [currentNPCName, setCurrentNPCName] = useState("");
  const [currentNPCDialog, setCurrentNPCDialog] = useState([]);
  const [currentNPCAction, setCurrentNPCAction] = useState(null);
  // Subtitle values 

  const [currentSubtitleText, setCurrentSubtitleText] = useState("");

  // Init Game
  const [isGameLoad, setIsGameLoad] = useState(false);
  const [isCameraOrientationChanged, setIsCameraOrientationChanged] = useState(null);
  const [isFirstUpdateRender, setIsFirstUpdateRender] = useState(false);
  // Key one press
  const [lastKeyPressed, setLastKeyPressed] = useState(null);
  // Don't display objectives if popup for pickup find is open
  const [isPickupComponentOpen, setIsPickupComponentOpen] = useState(false);
  // 3D VERSE States
  const [is3DVerseLoad, setIs3DVerseLoad] = useState(false);
  const [isPointerLockInitialWasClick, setIsPointerLockInitialWasClick] = useState(false);
  // JS Event States 
  const [isInitialClick, setIsInitialClick] = useState(false);
  const [isFPSControllerClick, setIsFPSControllerClick] = useState(false);
  // Cinematic 
  const [isCinematicEnd, setIsCinematicEnd] = useState(false);

  const status = useScript(
    `https://cdn.3dverse.com/legacy/sdk/latest/SDK3DVerse.js`,
    {
      removeOnUnmount: false,
    }
  );



  
  
  // UPDATE
  const update = async () => {
    // console.log(window.lastPickupComponentState)
    // const viewports = SDK3DVerse.engineAPI.cameraAPI.getActiveViewports();
    // const position = viewports[0].getTransform().position
    // console.log(position)
    await gameManagerInstance.gameUpdate(is3DVerseLoad);
    // Only logic correspond to interface // all logic, condition variable specific to game logic is contain in Game Manager / Or in some specific fonctionnalities controller
    setCurrentScore(gameManagerInstance.gameData.score)
    setCurrentObjectiveDescription(gameManagerInstance.gameData.objectiveInstance.objectives[gameManagerInstance.gameData.objectiveInstance.currentObjectiveIndex].description)
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

    const intervalId = setInterval(updateLoop, 1); 

    return () => {
      clearInterval(intervalId); // Clear on unmount
    };

  }, [is3DVerseLoad]);
  //


  // useEffect(() => {
  //   console.log(currentSubtitleText)
  // }, [currentSubtitleText]);
  //


  // Get Highest Ancestor
  async function getHighestAncestor(entity) {
    const ancestors = await entity.getAncestors();
  
    if (ancestors && ancestors.length > 0) {
      const highestAncestor = ancestors[ancestors.length - 1];
      return highestAncestor;
    } else {
      return entity;
    }
  }
  // Interact Function

  async function interactLogic() {
    // ResetFPSCameraController(document.getElementById('display-canvas'))
    const canvasElement = document.getElementById('display-canvas');
    const canvasRect = canvasElement.getBoundingClientRect();

    const centerX = canvasRect.left + canvasRect.width / 2;
    const centerY = canvasRect.top + canvasRect.height / 2;


    // Pick pos
    const { entity, pickedPosition, pickedNormal } = await SDK3DVerse.engineAPI.castScreenSpaceRay(centerX, centerY, false);

    if (!entity) {
      return null; 
    }

    
    console.log(pickedPosition)

    const highestAncestor = await getHighestAncestor(entity);
    const nameOfEntity = await highestAncestor.getName();

    console.log(nameOfEntity);



    if (nameOfEntity.match(/^NPC/)) {

      // Set current npc for dialog interface
      gameManagerInstance.gameData.NPCInstance.setCurrentNpc(nameOfEntity);
      // Get current npc to set use state var
      const NPC = gameManagerInstance.gameData.NPCInstance.getCurrentNpc()

      // console.log(NPC)
      const currentNPCdialog = gameManagerInstance.gameData.NPCInstance.getCurrentNPCDialog()

      // console.log(currentNPCdialog)
      setCurrentNPCName(NPC.name);
      setCurrentNPCDialog(currentNPCdialog.sentences)
      setCurrentNPCAction(currentNPCdialog.action)

      SDK3DVerse.disableInputs()

      
    } else if (nameOfEntity.match(/^Object/)) {
      // Set current npc for dialog interface
      gameManagerInstance.gameData.pickupInstance.setCurrentPickup(nameOfEntity);
      // Get current npc to set use state var


      if (!gameManagerInstance.gameData.pickupInstance.checkInteractLimit()) {


        // Only on time execute this interact
        if (nameOfEntity.includes("Set") ) {
          gameManagerInstance.gameData.score += 20
        }
        if (nameOfEntity.includes("Guandao")) {
          gameManagerInstance.gameData.score += 20
        }

        const Pickup = gameManagerInstance.gameData.pickupInstance.getCurrentPickup()
        setCurrentPickupName(Pickup.name);
        setCurrentPickupDescription(Pickup.description);
        setCurrentPickupScore(Pickup.score)
        setCurrentPickupText(Pickup.pickupText)
      
        if (nameOfEntity.includes("Drapeau")) {
          const flagState = gameManagerInstance.gameData.pickupInstance.checkFlags()
          if (flagState == "Good Flag") {
            gameManagerInstance.gameData.NPCInstance.setCurrentDialog("success")
            gameManagerInstance.gameData.pickupInstance.setCurrentPickupInfo({name: "Trophée de la chine", description: "ce trophée t'appartient"})
            setCurrentPickupName("Trophée de la chine");
            setCurrentPickupDescription("ce trophée t'appartient");
            setCurrentPickupText("Trophée de la chine");
            gameManagerInstance.gameData.score += 50
          }
          else if (flagState == "Bad Flag") {
            gameManagerInstance.gameData.NPCInstance.setCurrentDialog("defeat")
          }
          gameManagerInstance.gameData.objectiveInstance.currentObjectiveIndex = 4
        }
        
        gameManagerInstance.gameData.pickupInstance.incrementInteract()
      }
      else {
        
        setCurrentPickupName("Tu as déja intéragit");
        setCurrentPickupDescription("ce n'est plus possible d'interagir avec cet objet");
        setCurrentPickupText("Tu as déja intéragit");
        setCurrentPickupScore(0)
      }

      window.lastPickupComponentState = 1




    } else {
      console.log("Le nom de l'entité ne commence ni par 'NPC' ni par 'Object'");
    }
    resetLastKeyPressed();
    // SetFPSCameraController(document.getElementById('display-canvas'))
    
  }




  // Var Time wait to press any key
  let lastKeyPressTime = 0;
  // If key press, interactions start
  const handleKeyDown = async (event) => {
    const currentTime = new Date().getTime();
    if (currentTime - lastKeyPressTime > 200) {
      const key = event.key.toLowerCase();
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
        interactLogic()
      }

      lastKeyPressTime = currentTime;
    }
  };

  // Call functions for interface
  const handleDialogAction = async () => {
    // console.log(currentNPCAction)
    if (currentNPCAction) {
      const actionFunction = scenarioScriptFunctions.find(func => func.name === currentNPCAction);
      
      if (actionFunction && typeof actionFunction.func === 'function') {
        await actionFunction.func();
      } else {
        console.error(`La fonction correspondant à ${currentNPCAction} n'a pas été trouvée ou n'est pas une fonction.`);
      }
    }
  };



  // Reset INFO For interface
  const wait = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));
  const resetCurrentSubtitle = async () => {
    if (gameManagerInstance.gameData.subtitleCurrentIndex < gameManagerInstance.gameData.subtitleList.length - 1) {
      await wait(4000);
      gameManagerInstance.incrementSubtitleIndex();
      setCurrentSubtitleText(gameManagerInstance.getCurrentSubtitle());
    }
  };
  const resetCurrentNPC = () => {
    SDK3DVerse.enableInputs()
    resetLastKeyPressed()
    setCurrentNPCName("");
    setCurrentNPCDialog([])
    setCurrentNPCAction(null)
  };
  const resetCurrentPickup = () => {
    window.lastPickupComponentState = 0
    resetLastKeyPressed()
    setIsPickupComponentOpen(false) // Don't display objective when pickup popup is active
    setCurrentPickupName("")
    setCurrentPickupDescription("")
    setCurrentPickupText("")
    setCurrentPickupScore(0)

  };
  const resetLastKeyPressed = () => {
    setLastKeyPressed(null);
  };


  // Var for store value for create cinematics
  let positionsAndOrientationToWrite = []


  // Var for catch movement for Head Label
  let cameraState = {
    orientation: null,
    position: null
  };
  let isFirstUpdate = false;

  const checkPlayerTransformChange = async () => {
    // #TODO REPLACE CHECKING WITH ORIENTATION(ROTATION) BY checking WITH CHANGING LOOK AT USING CAST ON SCREEN RAY

    // Utils / Compare Value in quaternion
    const quaternionsAreEqual = (quat1, quat2) => {
      // Vérifier si l'un des quaternions est null
      for (let i = 0; i < 4; i++) {
        if (quat1[i] !== quat2[i]) {
          // console.log("Camera Move");
          setIsCameraOrientationChanged(true)
          return false;
        }
      }
      // console.log("Camera Stay");
      setIsCameraOrientationChanged(false)
      return true;
    };

    const positionsAreEqual = (pos1, pos2) => {
      for (let i = 0; i < 3; i++) {
        if (pos1[i] !== pos2[i]) {
          // console.log("Camera Move");
          setIsCameraOrientationChanged(true)
          return false;
        }
      }
      // console.log("Camera Stay");
      setIsCameraOrientationChanged(false)
      return true;
    };

    if (!isFirstUpdate) {
      // First execution we set base orientation and position to compare after
      const camera = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports();
      const transform = await camera[0].getTransform();
      cameraState = {
        orientation: transform.orientation,
        position: transform.position
      };
      isFirstUpdate = true;
    }

    // Refresh component that counts on Camera move changement / Update new old orientation and position
    const camera = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports();
    const newTransform = await camera[0].getTransform();

    if (!quaternionsAreEqual(cameraState.orientation, newTransform.orientation) || !positionsAreEqual(cameraState.position, newTransform.position)) {
      // Update old orientation and position
      cameraState = {
        orientation: newTransform.orientation,
        position: newTransform.position
      };
    }
  }


  const writeYourOwnCinematic = async () => {

    // Write position if Write list is over 100
    if (positionsAndOrientationToWrite.length > 100) {
      WritePositionToFile(positionsAndOrientationToWrite);
      console.log(positionsAndOrientationToWrite)
      positionsAndOrientationToWrite.splice(0, positionsAndOrientationToWrite.length);
      console.log(positionsAndOrientationToWrite)
    }


    // Event to allow to write posiiton in cinematic and push the list
    // # TODO CAN'T GET ROTATION / Orientation of player
    if (gameManagerInstance.gameData.canWriteCinematic) {
      const camera = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports();
      const transform = await camera[0].getTransform();

      // const canvasElement = document.getElementById('display-canvas');
      // const canvasRect = canvasElement.getBoundingClientRect();

      // const centerX = canvasRect.left + canvasRect.width / 2;
      // const centerY = canvasRect.top + canvasRect.height / 2;

      // // Pick pos
      // const { entity, pickedPosition, pickedNormal } = await SDK3DVerse.engineAPI.castScreenSpaceRay(centerX, centerY, false);

      // console.log(pickedPosition)







      const textToPush = {
        position: transform.position,
        orientation: transform.orientation,
      };
      positionsAndOrientationToWrite.push(textToPush);
    }

  }


  // Update at PostFrameRender
  const updateRender = async () => {
    checkPlayerTransformChange()
    writeYourOwnCinematic()
  }


  // Start Actions when 3DVerse is Ready
  useEffect(() => {
    const fetchDataReady = async () => {
      if (status === 'ready') {
        await handleInitialClick();
        await gameManagerInstance.initGame();
        setIsGameLoad(true)
        setCurrentSubtitleText(gameManagerInstance.getCurrentSubtitle())
        SDK3DVerse.notifier.on('onFramePostRender', updateRender);
      }
    };
  
    fetchDataReady();
  }, [status]);

  // Init Session and Player Controller And mobile extension
  const initApp = async () => {

    if (status === 'ready') {
      try {
        await SDK3DVerse.joinOrStartSession({
          userToken: publicToken,
          sceneUUID: mainSceneUUID,
          canvas: document.getElementById("display-canvas"),
          createDefaultCamera: false,
          startSimulation: "on-assets-loaded",
        });
        const sessionId = SDK3DVerse.getSessionId();
        console.log("SESSION ID", sessionId);
        await fetch(`https://w3xklm-4444.csb.app/api/${sessionId}`);
      }
      catch {
        console.log("hello")
      }

      isMobile = window.innerWidth <= 768;
      

      await InitFirstPersonController(characterControllerSceneUUID, [-30,1,4]);
      const joysticksElement = document.getElementById('joysticks');
      SDK3DVerse.installExtension(window.SDK3DVerse_VirtualJoystick_Ext, null, joysticksElement);
      setIs3DVerseLoad(true);
    }
  };
  //
  

  // Managing Single Click for First Active of Moving in space
  const handleClickForFPSController = async () => {
    if (!isFPSControllerClick) {
      window.removeEventListener('click', handleClickForFPSController );
      SetFPSCameraController(document.getElementById('display-canvas'));
      setIsFPSControllerClick(true);
      setIsPointerLockInitialWasClick(true)
    }
  };
  //

  // Managing Single Click for First Click to start the App with 3d verse Instead of the load
  const handleInitialClick = async () => {
    if (!isInitialClick) {
      setIsInitialClick(true); // Var for single click
      window.removeEventListener('click', handleInitialClick);
      if (!is3DVerseLoad) {
        await initApp();
        window.addEventListener('keypress', handleKeyDown); // Catch all key press
        window.addEventListener('click', handleClickForFPSController); // Single click to active FPS Controller
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


  // # TODO Pickup doesn't work
  return (
    <>

    

      <canvas
        id='display-canvas'
        style={{
          height: '100vh',
          width: '100%',
          verticalAlign: 'middle',
          overflowY: 'hidden',
        }}
        tabIndex="1"
        onContextMenu={event => event.preventDefault()}
      ></canvas>
  
      {is3DVerseLoad && isPointerLockInitialWasClick && (
        <>
          <CrossHair/>
          {isGameLoad && window.drawObjectives && <EntityHeadLabelDisplayController isCameraOrientationChanged={isCameraOrientationChanged} />} {/*  Send position When Mouse move to refresh component, but this var is not use*/}
          
          <DialogController
            isVisible={currentNPCDialog && currentNPCDialog.length > 0}
            dialogMessages={currentNPCDialog}
            onClose={resetCurrentNPC}
            onAction={handleDialogAction}
            currentActionName={currentNPCAction}
            shouldHaveActionButton={currentNPCAction !== null}
            resetFPSCameraController={ResetFPSCameraController}
            setFPSCameraController={SetFPSCameraController}
          />
          {currentPickupName !== "" && currentPickupDescription !== "" && (
            <PickupController
              pickupInfo={[currentPickupName, currentPickupDescription, currentPickupText, currentPickupScore]}
              onOpen={() => setIsPickupComponentOpen(true)} 
              onClose={resetCurrentPickup}
            />
          )}
          {currentSubtitleText !== "" && window.drawSubtitle && (
            <SubtitleComponent 
              text={currentSubtitleText} 
              onClose={resetCurrentSubtitle}
              duration={10000} 
            />
          )}
          {!isPickupComponentOpen && window.drawLabels && (
            <ObjectiveController
              currentObjective={currentObjectiveDescription}
              score={currentScore}
              time={timeSeconds}
              distanceToGoal={currentObjectiveMeters}
              distanceToGoalInHeight={currentObjectiveMetersHeight}
            />
          )}
          {/* {isMobile && <InteractMobileComponent interactLogic={interactLogic} />} */}
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











        