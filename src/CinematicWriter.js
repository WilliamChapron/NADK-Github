

import * as glMatrix from 'gl-matrix';

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



async function GetPositions() {
  console.log("get positions")
  const apiUrl = 'http://localhost:4444/api/data';

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Erreur lors de la requête : ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des positions :', error);
    throw error;
  }
}


function WritePositionToFile(positions) {
  const apiUrl = 'http://localhost:4444/api/data';

  console.log("write")


  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(positions),
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


// const positionsArray = await GetPositions();
// let currentIndex = 0;
// let Viewports = null;
// let NPCEntity = null;
// let player = null;



// async function MovePlayer() {

//   if (currentIndex == 0) {
//     Viewports = SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()
//     let entities = await SDK3DVerse.engineAPI.findEntitiesByNames("NPC_Louis mort");
//     NPCEntity = entities && entities[0];
//     console.log(`npc`, NPCEntity);
//     if(!NPCEntity) {
//       console.warn("NPC not found");
//       requestAnimationFrame(MovePlayer);
//       return;
//     }

//     const clientUUID = SDK3DVerse.getClientUUID() 
//     const playerName = `Player_${clientUUID}`;
//     entities = await SDK3DVerse.engineAPI.findEntitiesByNames(playerName);
//     player = entities && entities[0];
//     console.log(`player`, player);    
//     if(!player) {
//       console.warn("player not found");
//       requestAnimationFrame(MovePlayer);
//       return;
//     }

//     const children = await player.getChildren();
//     const charCtl = children && children[0];
//     console.log(`player children`, children);
//     if(!charCtl || !charCtl.isAttached('script_map')) {
//       console.warn("Character controller not found or script not attached");
//       requestAnimationFrame(MovePlayer);
//       return;
//     }

//     console.log("detach script map from character controller entity");
//     charCtl.detachComponent("script_map")
//   }

  

//   console.log(currentIndex, "currentIndex");
//   console.log(positionsArray.length, "pos array length");
//   if (currentIndex >= positionsArray.length) {
//     console.log("Move player animation done!");
//     return;
//   }

//   const transform = SDK3DVerse.utils.clone(positionsArray[currentIndex]);
//   transform.scale = [1, 1, 1]

//   // // # TODO CAN'T GET ROTATION / Orientation of player
  

//   // 3 point (orientation)
//   // await player.lookAt(positionsArray[currentIndex].orientation)
//   // viewports[0].lookAt(positionsArray[currentIndex].orientation)

//   //await viewports[0].setComponent("local_transform", transform);
//   requestAnimationFrame(() => Viewports[0].setGlobalTransform(transform, true, true));


//   const transformNPC = SDK3DVerse.utils.clone(positionsArray[currentIndex]);
//   transformNPC.scale = [1, 1, 1];
//   const rotateQuaternion = glMatrix.quat.create();
//   glMatrix.quat.rotateY(rotateQuaternion, transformNPC.orientation, Math.PI);
//   transformNPC.orientation = Array.from(rotateQuaternion)

//   console.log([...Viewports[0].getTransform().position])

//   NPCEntity.setGlobalTransform(transformNPC);
//   const eulerOrientation = [0, NPCEntity.getComponent('local_transform').eulerOrientation[1], 0];
//   NPCEntity.setGlobalTransform({ eulerOrientation });

//   console.log(...Viewports[0].getTransform().position)

//   currentIndex++;
//   requestAnimationFrame(MovePlayer);
// }



// async function StartCinematic() {
//   // SDK3DVerse.disableInputs();

//   //await new Promise(resolve => setTimeout(resolve, 3000));
//   console.log("************** start cinematic");
//   await MovePlayer();
  
//   // await InitCamera();
//   // await MoveCamera();
// }


let positionsArray = await GetPositions();;
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

  const transform = SDK3DVerse.utils.clone(positionsArray[currentIndexPlayer]);
  transform.position = [transform.position[0], transform.position[1] - playerYSize, transform.position[2]];
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

  if (currentIndexPlayer < positionsArray.length) {
    requestAnimationFrame(animatePlayer);
  } else {
    console.log("Player animation done!");

    // Re attach script map 
    // const meshUUID = 'b9936cb6-0e73-4398-a06f-0355d8a96fca';
    // const meshRefComponent = { value : meshUUID, submeshIndex : 0 };
    // entity.attachComponent('mesh_ref', meshRefComponent);
  }
}

async function animateNPC() {
  
  if (!NPCEntity) {
    console.warn("NPC not initialized");
    return;
  }

  const transformNPC = SDK3DVerse.utils.clone(positionsArray[currentIndexNPC]);
  transformNPC.scale = [1, 1, 1];
  // Remove offset because this is the position of the camera 
  transformNPC.position = [transformNPC.position[0], transformNPC.position[1] - npcYSize, transformNPC.position[2]];
  const rotateQuaternion = glMatrix.quat.create();
  glMatrix.quat.rotateY(rotateQuaternion, transformNPC.orientation, Math.PI);
  transformNPC.orientation = Array.from(rotateQuaternion);

  NPCEntity.setGlobalTransform(transformNPC);



  

  const eulerOrientation = [0, NPCEntity.getComponent('local_transform').eulerOrientation[1], 0];
  NPCEntity.setGlobalTransform({ eulerOrientation });

  currentIndexNPC++;

  if (currentIndexNPC < positionsArray.length) {
    requestAnimationFrame(animateNPC);
  } else {
    console.log("NPC animation done!");
  }
}

async function StartCinematic() {
  console.log("************** Start cinematic");


  if (!hasSetupEntities) {
    const entitiesInitialized = await setupEntities();
    hasSetupEntities = entitiesInitialized; 

    if (entitiesInitialized) {
      // e83b0e8a-2363-406f-9935-c38084f7e647
      animateNPC()

      
      setTimeout(() => animatePlayer(), 4000)
      
    }
  }
}

export { WritePositionToFile, GetPositions, StartCinematic };




