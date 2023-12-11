
async function GetPositions() {
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

async function MoveCamera() {

  // Set position de la caméra
  // const viewports = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()
  // const travel = await SDK3DVerse.engineAPI.cameraAPI.travel(viewports[0], [15,3,15], [0, 1, 0, 0], 3);
  // SDK3DVerse.engineAPI.cameraAPI.stopTravel()




}

async function InitCamera() {
  const cameraEntity = await SDK3DVerse.engineAPI.findEntitiesByEUID("92a9a522-0c50-4780-8073-743b96395e31")


    
  
  // Finally set the first person camera as the main camera.
  await SDK3DVerse.setMainCamera(cameraEntity[0]);


}


async function MovePlayer() {

  const player = await SDK3DVerse.engineAPI.findEntitiesByNames("MonPlayer");

  const positionData = positionsArray[currentIndex]; // Supposons que `positionArray` soit une variable globale ou accessible dans la portée de cette fonction
  const { position, orientation } = positionData;

  const transform = {
    position: position,
    orientation: orientation,
    scale: [1, 1, 1],
  };

  await player[0].setGlobalTransform(transform);
}



async function StartCinematic() {
  console.log(currentIndex, positionsArray.length)
  if (currentIndex <= positionsArray.length) {
    await MovePlayer()
    currentIndex += 1
  }
  await InitCamera()
  await MoveCamera()

}

export { WritePositionToFile, GetPositions, StartCinematic };




