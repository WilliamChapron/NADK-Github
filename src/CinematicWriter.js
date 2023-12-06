
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
  try {
    const positions = await GetPositions();


    for (const position of positions) {
      const viewports = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()

      const travel = await SDK3DVerse.engineAPI.cameraAPI.travel(viewports[0], position, [0, 1, 0, 0], 10);


      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('Parcours terminé');
  } 
  catch (error) {
    console.error('Erreur lors du parcours des positions :', error);
  }
}

export { WritePositionToFile, GetPositions, StartCinematic };
