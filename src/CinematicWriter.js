
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

function WritePositionToFile(position) {
  const apiUrl = 'http://localhost:4444/api/data'; 


  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(position),
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

async function StartCinematic() {
  // CINEMATIC 
    const positions = await GetPositions();

    // const viewports = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()

    // const travel = await SDK3DVerse.engineAPI.cameraAPI.travel(viewports[0], position, [0, 1, 0, 0], 3);
    // SDK3DVerse.engineAPI.cameraAPI.stopTravel()

    const cameraEntity = await SDK3DVerse.engineAPI.findEntitiesByEUID("4d3eeea5-40ac-4b76-bfb3-835fbc4294b1")
    
  
    // Finally set the first person camera as the main camera.
    await SDK3DVerse.setMainCamera(cameraEntity);



    // for (const position of positions) {


    //   const player = await SDK3DVerse.engineAPI.findEntitiesByNames("MonPlayer")

    //   console.log(position)

    //   const transform =
    //   {
    //       position : [position[0],position[1],position[2]],
    //       orientation : [0,0,0,1],
    //       scale : [1,1,1]
    //   };
    //   await player[0].setGlobalTransform(transform)


    // }
    // console.log('Parcours terminé');
}

export { WritePositionToFile, GetPositions, StartCinematic };
