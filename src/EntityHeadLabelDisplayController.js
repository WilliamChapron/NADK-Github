import * as glMatrix from 'gl-matrix';

import React, { useState, useEffect } from 'react';
import gameManagerInstance from './GameManager';

// # TODO AU DESSUS DES OBJETS ET DES JOUEURS AUSSI

const EntityHeadLabelDisplayController = (bool) => {
  const [npcs, setNPCs] = useState([]);

  function subtractVectors(a, b) {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  }
  
  // Fonction de normalisation de vecteurs
  function normalizeVector(v) {
    const length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    if (length !== 0) {
      v[0] /= length;
      v[1] /= length;
      v[2] /= length;
    }
    return v;
  }

  function dotProductBetweenTwoVectors(vector1, vector2) {
    if (vector1.length !== vector2.length) {
        throw new Error("Les vecteurs doivent être de la même longueur");
    }

    let result = 0;
    for (let i = 0; i < vector1.length; i++) {
        result += vector1[i] * vector2[i];
    }

    return result;
  }


  function calculatePlayerForwardVector(playerOrientation) {
    if (!playerOrientation) {
      console.error("Player orientation is undefined");
      return null;
    }
  
    const forwardVector = glMatrix.vec3.create();
    glMatrix.vec3.transformQuat(forwardVector, glMatrix.vec3.fromValues(0, 0, 1), playerOrientation);
    return forwardVector;
  }

  const isEntityInPlayerView = (entityPosition, playerPosition, playerOrientation, fieldOfView) => {
    // Calculez le vecteur de direction du joueur
    const playerForwardVector = calculatePlayerForwardVector(playerOrientation);
  
    // Calculez le vecteur distance normalisé du joueur vers l'entité
    const directionToEntity = subtractVectors(entityPosition, playerPosition);
    normalizeVector(directionToEntity);
  
    // Calculez le produit scalaire entre le vecteur avant du joueur et le vecteur direction normalisé de l'entité
    const dotProduct = dotProductBetweenTwoVectors(playerForwardVector, directionToEntity);

    // console.log(dotProduct)

    return dotProduct <= -0.70;
  
    // // Calculez l'angle en radians
    // const angle = Math.acos(dotProduct);
  
    // // Convertissez l'angle en degrés;
  
    // console.log("Angle en degrés :", angle, "est inférieur ou égal à", fieldOfView / 2);
  
    // Vérifiez si l'angle est dans le champ de vision
    // return angle <= fieldOfView / 2;
}

  useEffect(() => {
    // console.log("Update logic")
    const updateNPCs = async () => {
      const NPCs = gameManagerInstance.gameData.NPCInstance.getNPCs();
      const playerViewport = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports();

      const updatedNPCs = [];

      let index = 0;
      for (const npc of NPCs) {
        const entityPosition = await gameManagerInstance.gameData.NPCInstance.npcs[index].position;
        const playerTransform = await playerViewport[0].getTransform();
        const playerPosition = playerTransform.position
        const playerOrientation = playerTransform.orientation
        const { isInViewport, position2D } = isEntityInViewport(entityPosition, playerViewport);


        // Test if in Range


        


        if (isInViewport) {
          if (isEntityInPlayerView(entityPosition, playerPosition, playerOrientation, 90)) {
            const dx = entityPosition[0] - playerPosition[0];
            const dz = entityPosition[2] - playerPosition[2];
            const distance = Math.round(Math.sqrt(dx * dx + dz * dz));

            const adjustedY = position2D.y;
            const fontSize = 250 / distance*0.1; 

            if (distance <= 5) {
              updatedNPCs.push({
                name: npc.name,
                position: { x: position2D.x, y: adjustedY },
                fontSize: fontSize,
            });
          }
          }
          
        }
        index++;
      }

      setNPCs(updatedNPCs);
    };

    updateNPCs();
  }, [gameManagerInstance, bool]);

  const isEntityInViewport = (entityPosition, playerViewport) => {
    const posHead = [entityPosition[0], entityPosition[1] + 1.8, entityPosition[2]];

    const [x, y, z] = playerViewport[0].project(posHead);

    window.caca = playerViewport[0]





    // console.log(x, y,z)

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    // console.log(canvasWidth,canvasHeight)

    const isInViewport =
      x >= 0 && x <= canvasWidth &&
      y >= 0 && y <= canvasHeight;

    

    const position2D = { x, y };

    return { isInViewport, position2D };
  };



  return (
    <div>
      {npcs.map((npc) => (
        <div
          key={npc.name}
          style={{
            position: 'absolute',
            left: npc.position.x + 'px',
            top: npc.position.y + 'px',
            zIndex: npc.position.z,
            backgroundColor: 'black',
            color: 'white',
            borderRadius: '8px',
            padding: '8px',
            fontSize: `${npc.fontSize}px`, // Utilisez la taille dynamique
          }}
        >
          <h1>{npc.name}</h1>
        </div>
      ))}
      <p></p>
    </div>
  );
};

export default EntityHeadLabelDisplayController;
