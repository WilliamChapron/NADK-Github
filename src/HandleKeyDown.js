// HandleKeyDown.js



const HandleKeyDown = async (event) => {
  // const status = UseSDK3DVerse();

  console.log("Handle Key Down");

  const key = event.key.toLowerCase();

  // Reste de votre logique HandleKeyDown ici...

  // Exemple : console.log("Handle Key Down");

  // Retourne la touche pressée

  // const SDK3DVerse = window.SDK3DVerse; // Assurez-vous que SDK3DVerse est globalement disponible
  // console.log(SDK3DVerse)
  // const viewports = SDK3DVerse.engineAPI.cameraAPI.getActiveViewports();
  // const camera = viewports[0].getCamera();
  // const moveSpeed = 0.1;

  // console.log(key)
  // const cube = await SDK3DVerse.engineAPI.findEntitiesByEUID("8e761a63-500f-4376-9208-e8e4986602c3");
  // const cubePos = await cube[0].getGlobalTransform().position;
  // console.log(cubePos)
  // const array = [cubePos[0] + 10, cubePos[1] + 10, cubePos[2] + 10];
  // // const cubePosNext = await cube[0].getGlobalTransform().position;
  // // console.log(cubePosNext)
  // cube[0].setPosition(array);

  
  return key;

  

  // if (status === 'ready') {
    
    


    // switch (key) {
    //   case 'z':
    //     MoveCamera(SDK3DVerse, camera, 0, 0, -moveSpeed);
    //     break;
    //   case 'q':
    //     MoveCamera(SDK3DVerse, camera, -moveSpeed, 0, 0);
    //     break;
    //   case 's':
    //     MoveCamera(SDK3DVerse, camera, 0, 0, moveSpeed);
    //     break;
    //   case 'd':
    //     MoveCamera(SDK3DVerse, camera, moveSpeed, 0, 0);
    //     break;
    //   default:
    //     break;
    // }

    // SDK3DVerse.engineAPI.propagateChanges();
  // }
};

export { HandleKeyDown };
