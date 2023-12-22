

import * as glMatrix from 'gl-matrix';

import { InitFirstPersonController } from './InitFirstPersonController';
import { SetFPSCameraController, ResetFPSCameraController } from './SetFPSCameraController';
import gameInstance from "./GameManager"

async function MoveCamera() {

  // Set position de la caméra
  // const viewports = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()
  // const travel = await SDK3DVerse.engineAPI.cameraAPI.travel(viewports[0], [15,3,15], [0, 1, 0, 0], 3);
  // SDK3DVerse.engineAPI.cameraAPI.stopTravel()




}

async function InitCamera() {
  // const cameraEntity = await SDK3DVerse.engineAPI.findEntitiesByEUID("92a9a522-0c50-4780-8073-743b96395e31")




  // // Finally set the first person camera as the main camera.
  // await SDK3DVerse.setMainCamera(cameraEntity[0]);


}


async function GetPositions(fileName) {
  console.log("get positions");
  const apiUrl = `http://localhost:4444/api/data/${fileName}`;

  try 
  {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Erreur lors de la requête : ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } 
  catch (error) 
  {
    console.error('Erreur lors de la récupération des positions :', error);
    throw error;
  }
}

function WritePositionToFile(positions) {
  const apiUrl = 'http://localhost:4444/api/data';

  console.log("write");

  const fileName = "player"

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fileName, data: positions }),
  };

  fetch(apiUrl, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur lors de la requête : ${response.statusText}`);
      }
      console.log('Position enregistrée avec succès');
    })
    .catch(error => {
      console.error('Erreur lors de l\'enregistrement de la position :', error);
    });
}




let positionsNPCArray = await GetPositions("npc");
let positionsPlayerArray = await GetPositions("player");
// let positionsNPCArray = 0;
// let positionsPlayerArray = 0;
let currentIndexNPC = 0;
let currentIndexPlayer = 0;
let hasSetupEntities = false;
let Viewports = null;
let NPCEntity = null;
let player = null;

let playerYSize = 0;
let npcYSize = 0;

let isAnimateNPCEnd = false;
let isAnimatePlayerEnd = false;


async function setupEntities() {
  Viewports = SDK3DVerse.engineAPI.cameraAPI.getActiveViewports();
  let entities = await SDK3DVerse.engineAPI.findEntitiesByNames("NPC_Guide du globe");
  NPCEntity = entities && entities[0];

  if (!NPCEntity) {
    console.warn("NPC not found");
    return false;
  }

  const clientUUID = SDK3DVerse.getClientUUID();
  const playerName = `Player_${clientUUID}`;
  entities = await SDK3DVerse.engineAPI.findEntitiesByNames(playerName);
  player = entities && entities[0];

  if (!player) {
    console.warn("Player not found");
    return false;
  }


  const children = await player.getChildren();
  const charCtl = children && children[0];

  if (!charCtl || !charCtl.isAttached('script_map')) {
    console.warn("Character controller not found or script not attached");
    return false;
  }

  // charCtl.detachComponent("script_map");

  // Find size with aabb

  const playerAABB = player.getGlobalAABB()
  const NPCEntityAABB = NPCEntity.getGlobalAABB()

  playerYSize = playerAABB.max[1] - playerAABB.min[1];
  npcYSize = NPCEntityAABB.max[1] - NPCEntityAABB.min[1];

  // console.log(playerYSize, npcYSize)

  // console.log(playerAABB)
  // console.log(NPCEntityAABB)


  return true;
}

async function animatePlayer() {
  if (!player) {
    console.warn("Player not initialized");
    return;
  }



  const transform = SDK3DVerse.utils.clone(positionsPlayerArray[currentIndexPlayer]);
  transform.position = [transform.position[0], transform.position[1] - playerYSize + 0.13, transform.position[2]];
  transform.scale = [1, 1, 1];

  // requestAnimationFrame(() => Viewports[0].setGlobalTransform(transform, true, true));

  const rotateQuaternion = glMatrix.quat.create();
  glMatrix.quat.rotateY(rotateQuaternion, transform.orientation, Math.PI);
  transform.orientation = Array.from(rotateQuaternion);

  player.setGlobalTransform(transform, true, true);
  const eulerOrientation = [0, player.getComponent('local_transform').eulerOrientation[1], 0];
  player.setGlobalTransform({ eulerOrientation });



  

  currentIndexPlayer++;

  if (currentIndexPlayer < positionsPlayerArray.length) {
    requestAnimationFrame(animatePlayer);
  } else {
    console.log("Player animation done!");

    await InitFirstPersonController("ff0b5223-75dc-48ad-ae0d-d710012c3a80", transform.position, [0, -0.7071, 0, 0.7071]);
    await SDK3DVerse.engineAPI.deleteEntities([player]);

    isAnimatePlayerEnd = true



  }
}

async function animateNPC() {
  
  if (!NPCEntity) {
    console.warn("NPC not initialized");
    return;
  }

  const transformNPC = SDK3DVerse.utils.clone(positionsNPCArray[currentIndexNPC]);
  transformNPC.scale = [1, 1, 1];
  // Remove offset because this is the position of the camera 
  transformNPC.position = [transformNPC.position[0], transformNPC.position[1] - npcYSize + 0.13, transformNPC.position[2]];
  const rotateQuaternion = glMatrix.quat.create();
  glMatrix.quat.rotateY(rotateQuaternion, transformNPC.orientation, Math.PI);
  transformNPC.orientation = Array.from(rotateQuaternion);

  NPCEntity.setGlobalTransform(transformNPC);



  

  const eulerOrientation = [0, NPCEntity.getComponent('local_transform').eulerOrientation[1], 0];
  NPCEntity.setGlobalTransform({ eulerOrientation });

  gameInstance.gameData.NPCInstance.npcs[0].position = transformNPC.position

  currentIndexNPC++;

  if (currentIndexNPC < positionsNPCArray.length) {
    requestAnimationFrame(animateNPC);
  } else {
    console.log("NPC animation done!");
    NPCEntity.setComponent('scene_ref', { value: "b0d0aad6-cba6-4d0f-90fe-3133544c66c8" });
    isAnimateNPCEnd = true;
  }
}


async function GlobeCinematic() {


  




  
  //SDK3DVerse.cameraControllerType.none;
  
  // SDK3DVerse.engineAPI.onEnterTrigger((cameraEntity, block) => {
    

  //   //console.log(cameraEntity);
  // // console.log(player.components.debug_name.value, " entered trigger of ", block.components.debug_name.value);
  // });
}






async function StartCinematic() {

  
  console.log("************** Start cinematic");



  if (!hasSetupEntities) {
    const entitiesInitialized = await setupEntities();
    window.drawSubtitle = true
    hasSetupEntities = entitiesInitialized; 
    if (entitiesInitialized) {
      
      NPCEntity.setComponent('scene_ref', { value: "aed581dd-008b-4d71-bfa0-65558a4cf94a" });
      await new Promise(resolve => setTimeout(resolve, 1000));
      await animateNPC()
      // setTimeout(() => animatePlayer(), 0)

      SDK3DVerse.engineAPI.onEnterTrigger( async (cameraEntity, block) => {


        console.log("Start globe")
        const cinematique = await SDK3DVerse.engineAPI.findEntitiesByEUID('6661d67a-70ad-4989-8e15-27c651d1e64c')
        // const mainCamera = await SDK3DVerse.engineAPI.findEntitiesByEUID('e4f95f27-2495-4ca2-9180-336c90105a3e')
        const sceneGlobe = await SDK3DVerse.engineAPI.findEntitiesByEUID('435e063b-c037-44f5-b8ed-cbed043f855d')
        const clientUUID = SDK3DVerse.getClientUUID();
        const playerName = `Player_${clientUUID}`;
        const entities = await SDK3DVerse.engineAPI.findEntitiesByNames(playerName);
        const player = entities && entities[0];
        let npcEntity = await SDK3DVerse.engineAPI.findEntitiesByNames("NPC_Louis mort");
        // SDK3DVerse.engineAPI.stopAnimationSequence('e0da36a6-2f28-4ae7-92b1-4651f4bad0c4', sceneGlobe[0])
        //SDK3DVerse.disableInputs();
        // SDK3DVerse.engineAPI.detachClientFromScripts(player);


        await SDK3DVerse.engineAPI.deleteEntities([player]);

        //SDK3DVerse.engineAPI.detachClientFromScripts(cinématique[0]);
        SDK3DVerse.setMainCamera(cinematique[0])
        SDK3DVerse.engineAPI.playAnimationSequence('faa12b0d-ed4d-445d-b734-51825bf53ee4', { playbackSpeed : 0.2 }, sceneGlobe[0]);
    
        // Don't display few things when cinematic is on 
    
        window.drawObjectives = false;
        window.drawLabels = false;
    
        setTimeout( async () => {
          // SDK3DVerse.setMainCamera(mainCamera[0])
          // SDK3DVerse.engineAPI.assignClientToScripts(player);
    
          const transform =
          {
            position : [0,47,-0.03593],
            orientation : [0,0,0,1],
            scale : [1,1,1]
          };

          SDK3DVerse.engineAPI.stopAnimationSequence('faa12b0d-ed4d-445d-b734-51825bf53ee4', sceneGlobe[0])
          await InitFirstPersonController("ff0b5223-75dc-48ad-ae0d-d710012c3a80", transform.position, transform.orientation);



          const transformNPC =
          {
            position : [0,45.85,-2],
            orientation : [0,0,0,1],
            scale : [1,1,1]
          };  


          let template = new SDK3DVerse.EntityTemplate();
          template.attachComponent('scene_ref', { value: "0160f8e2-8bdd-4c92-ab01-eb090ec5319e" });
          template.attachComponent('local_transform', transformNPC);
          await template.instantiateTransientEntity(`NPC_${"Guide du globe"}`, null, false);
          gameInstance.gameData.NPCInstance.npcs[0].position = transformNPC.position

          // npcEntity[0].setGlobalTransform(transformNPC)
          // store old camera position

          // const viewport = SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()[0]
          // const viewportPosition = viewport.getTransform()
          // and set player position 


          // player.setGlobalTransform(transform);
          // console.log("Retardée d'une seconde."); 
          gameInstance.gameData.objectiveInstance.setCurrentObjective(1)
          window.drawObjectives = true;
          window.drawLabels = true;
          window.drawSubtitle = false;
        }, 37000);
      })
      
      

      // if(isAnimateNPCEnd) {
      //   // GlobeCinematic()

        
        

        
      // }

      
    }
  }
}

export { WritePositionToFile, GetPositions, StartCinematic };




