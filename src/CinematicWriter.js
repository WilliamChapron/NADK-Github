

import * as glMatrix from 'gl-matrix';

import { InitFirstPersonController } from './InitFirstPersonController';
import { SetFPSCameraController, ResetFPSCameraController } from './SetFPSCameraController';

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

  const fileName = "npc"

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


async function setupEntities() {
  Viewports = SDK3DVerse.engineAPI.cameraAPI.getActiveViewports();
  let entities = await SDK3DVerse.engineAPI.findEntitiesByNames("NPC_Louis mort");
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

  charCtl.detachComponent("script_map");

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


  // player.setGlobalTransform(transform, true, true);

  

  currentIndexPlayer++;

  if (currentIndexPlayer < positionsPlayerArray.length) {
    requestAnimationFrame(animatePlayer);
  } else {
    console.log("Player animation done!");

    await InitFirstPersonController("0b262353-3440-4f49-93f1-bf815d1bdfba", transform.position, [0, -0.7071, 0, 0.7071]);
    await SDK3DVerse.engineAPI.deleteEntities([player]);



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

  currentIndexNPC++;

  if (currentIndexNPC < positionsNPCArray.length) {
    requestAnimationFrame(animateNPC);
  } else {
    console.log("NPC animation done!");
    NPCEntity.setComponent('scene_ref', { value: "3fb0fce3-eefb-4bdf-8545-2f10bddce478" });

  }
}

async function StartCinematic() {
  console.log("************** Start cinematic");


  if (!hasSetupEntities) {
    const entitiesInitialized = await setupEntities();
    hasSetupEntities = entitiesInitialized; 

    if (entitiesInitialized) {
      NPCEntity.setComponent('scene_ref', { value: "e83b0e8a-2363-406f-9935-c38084f7e647" });
      await new Promise(resolve => setTimeout(resolve, 1000));
      animateNPC()
      setTimeout(() => animatePlayer(), 0)
      
    }
  }
}

export { WritePositionToFile, GetPositions, StartCinematic };




