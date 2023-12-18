

import * as glMatrix from 'gl-matrix';


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


const positionsArray = await GetPositions();
let currentIndex = 0;
let Viewports = null;
let NPCEntity = null;
let player = null;

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


async function MovePlayer() {

  if (currentIndex == 0) {
    Viewports = SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()
    let entities = await SDK3DVerse.engineAPI.findEntitiesByNames("NPC_Mickeal");
    NPCEntity = entities && entities[0];
    console.log(`npc`, NPCEntity);
    if(!NPCEntity) {
      console.warn("NPC not found");
      requestAnimationFrame(MovePlayer);
      return;
    }

    const clientUUID = SDK3DVerse.getClientUUID() 
    const playerName = `Player_${clientUUID}`;
    entities = await SDK3DVerse.engineAPI.findEntitiesByNames(playerName);
    player = entities && entities[0];
    console.log(`player`, player);    
    if(!player) {
      console.warn("player not found");
      requestAnimationFrame(MovePlayer);
      return;
    }

    const children = await player.getChildren();
    const charCtl = children && children[0];
    console.log(`player children`, children);
    if(!charCtl || !charCtl.isAttached('script_map')) {
      console.warn("Character controller not found or script not attached");
      requestAnimationFrame(MovePlayer);
      return;
    }

    console.log("detach script map from character controller entity");
    charCtl.detachComponent("script_map")
  }

  

  console.log(currentIndex, "currentIndex");
  console.log(positionsArray.length, "pos array length");
  if (currentIndex >= positionsArray.length) {
    console.log("Move player animation done!");
    return;
  }

  const transform = SDK3DVerse.utils.clone(positionsArray[currentIndex]);
  transform.scale = [1, 1, 1]

  // // # TODO CAN'T GET ROTATION / Orientation of player
  

  // 3 point (orientation)
  // await player.lookAt(positionsArray[currentIndex].orientation)
  // viewports[0].lookAt(positionsArray[currentIndex].orientation)

  //await viewports[0].setComponent("local_transform", transform);
  requestAnimationFrame(() => Viewports[0].setGlobalTransform(transform, true, true));



  console.log()

  const transformNPC = SDK3DVerse.utils.clone(positionsArray[currentIndex]);
  transformNPC.scale = [1, 1, 1];
  const rotateQuaternion = glMatrix.quat.create();
  glMatrix.quat.rotateY(rotateQuaternion, transformNPC.orientation, Math.PI);
  transformNPC.orientation = Array.from(rotateQuaternion)

  console.log([...Viewports[0].getTransform().position])

  NPCEntity.setGlobalTransform(transformNPC);
  const eulerOrientation = [0, NPCEntity.getComponent('local_transform').eulerOrientation[1], 0];
  NPCEntity.setGlobalTransform({ eulerOrientation });

  console.log(...Viewports[0].getTransform().position)

  currentIndex++;
  requestAnimationFrame(MovePlayer);
}



async function StartCinematic() {
  // SDK3DVerse.disableInputs();

  //await new Promise(resolve => setTimeout(resolve, 3000));
  console.log("************** start cinematic");
  await MovePlayer();
  
  // await InitCamera();
  // await MoveCamera();
}

export { WritePositionToFile, GetPositions, StartCinematic };




