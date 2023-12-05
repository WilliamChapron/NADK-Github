// IMPORT 

// React
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useScript } from '@uidotdev/usehooks';

// Functions
import { HandleKeyDown } from './HandleKeyDown';
// import { InitFirstPersonController } from './InitFirstPersonController';
import { SetFPSCameraController,ResetFPSCameraController } from './SetFPSCameraController';

// // Controller
import DialogController from './DialogController';
import PickupController from './PickupController';
import ObjectiveController from './ObjectiveController';


import {
  publicToken,
  mainSceneUUID,
  characterControllerSceneUUID,
} from "./config.js";

export const Canvas = () => {

  const canvasRef = useRef(null);
  const [lastKeyPressed, setLastKeyPressed] = useState(null);
  const [isInteractable, setIsInteractable] = useState(true);
  let lastUpdateTime = performance.now();
  
  const status = useScript(
    `https://cdn.3dverse.com/legacy/sdk/latest/SDK3DVerse.js`,
    {
      removeOnUnmount: false,
    }
  );
  

  const handleKeyDown = async (event) => {
    const key = await HandleKeyDown(event);
    if (key) {
      setLastKeyPressed(key);
    }
  };

  const resetLastKeyPressed = () => {
    setLastKeyPressed(null);
  };

  useEffect(() => {
    console.log('lastKeyPressed a changé :', lastKeyPressed);
  }, [lastKeyPressed]);
  
  
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
      window.addEventListener('mousedown', () => SetFPSCameraController(document.getElementById('display-canvas')));
      window.addEventListener('keydown', handleKeyDown);
    }
  

  };
  
  //------------------------------------------------------------------------------
  async function InitFirstPersonController(charCtlSceneUUID) {
    // To spawn an entity we need to create an EntityTempllate and specify the
    // components we want to attach to it. In this case we only want a scene_ref
    // that points to the character controller scene.
    const playerTemplate = new SDK3DVerse.EntityTemplate();
    playerTemplate.attachComponent("scene_ref", { value: charCtlSceneUUID });
  
    // Passing null as parent entity will instantiate our new entity at the root
    // of the main scene.
    const parentEntity = null;
    // Setting this option to true will ensure that our entity will be destroyed
    // when the client is disconnected from the session, making sure we don't
    // leave our 'dead' player body behind.
    const deleteOnClientDisconnection = true;
    // We don't want the player to be saved forever in the scene, so we
    // instantiate a transient entity.
    // Note that an entity template can be instantiated multiple times.
    // Each instantiation results in a new entity.
    const playerSceneEntity = await playerTemplate.instantiateTransientEntity(
      "Player",
      parentEntity,
      deleteOnClientDisconnection
    );
  
    // The character controller scene is setup as having a single entity at its
    // root which is the first person controller itself.
    const firstPersonController = (await playerSceneEntity.getChildren())[0];
    // Look for the first person camera in the children of the controller.
    const children = await firstPersonController.getChildren();
    const firstPersonCamera = children.find((child) =>
      child.isAttached("camera")
    );
  
    // We need to assign the current client to the first person controller
    // script which is attached to the firstPersonController entity.
    // This allows the script to know which client inputs it should read.
    SDK3DVerse.engineAPI.assignClientToScripts(firstPersonController);
  
    // Finally set the first person camera as the main camera.
    SDK3DVerse.setMainCamera(firstPersonCamera);
  }

  window.addEventListener("load", async () => {
    await initApp();
  });
  

  return (
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
      />
      <PickupController
        pickupInfo={['name', 'Les infos de cette item sont la']}
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
    </>
  );
};
