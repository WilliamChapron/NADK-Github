import * as glMatrix from 'gl-matrix';

import React, { useState, useEffect } from 'react';
import gameManagerInstance from './GameManager';

// # TODO AU DESSUS DES OBJETS ET DES JOUEURS AUSSI

const EntityHeadLabelDisplayController = (bool) => {
  const [npcs, setNPCs] = useState([]);
  const [pickups, setPickups] = useState([]);

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
    const playerForwardVector = calculatePlayerForwardVector(playerOrientation);
    const directionToEntity = subtractVectors(entityPosition, playerPosition);
    normalizeVector(directionToEntity);
    const dotProduct = dotProductBetweenTwoVectors(playerForwardVector, directionToEntity);

    return dotProduct <= -0.50;
  
  }

  // Marge for Size range setter
  const threshold = 5;
  const initialCoefficient = 0.05;

  useEffect(() => {
  const updateEntities = async (entityType) => {
    const entities = entityType === 'NPC' ? gameManagerInstance.gameData.NPCInstance.getNPCs() : gameManagerInstance.gameData.pickupInstance.getPickups();
    const playerViewport = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports();
    

    const updatedEntities = [];

    let index = 0;
    for (const entity of entities) {
      const entityPosition = await entity.position;
      const playerTransform = await playerViewport[0].getTransform();
      const playerPosition = playerTransform.position;
      const playerOrientation = playerTransform.orientation;
      const { isInViewport, position2D } = isEntityInViewport(entityPosition, playerViewport, [entity.offsetX,entity.offsetY,entity.offsetZ]);

      if (isInViewport && isEntityInPlayerView(entityPosition, playerPosition, playerOrientation, 90)) {
        const dx = entityPosition[0] - playerPosition[0];
        const dz = entityPosition[2] - playerPosition[2];
        const distance = Math.round(Math.sqrt(dx * dx + dz * dz));

        const coefficient = initialCoefficient * Math.log(distance + 1) / Math.log(threshold + 1);

        const adjustedY = position2D.y;
        const fontSize = 700 / distance * coefficient;

        if (distance <= 7) {
          updatedEntities.push({
            name: entity.name,
            position: { x: position2D.x, y: adjustedY },
            fontSize: fontSize,
          });
        }
      }
      index++;
    }

    if (entityType === 'NPC') {
      setNPCs(updatedEntities);
    } else if (entityType === 'Pickup') {
      setPickups(updatedEntities);
    }
  };

  updateEntities('NPC');
  updateEntities('Pickup');

}, [gameManagerInstance, bool]);

  const isEntityInViewport = (entityPosition, playerViewport,offsetArray) => {
    const posHead = [entityPosition[0] + offsetArray[0], entityPosition[1] + offsetArray[1], entityPosition[2] + offsetArray[2]];

    const [x, y, z] = playerViewport[0].project(posHead);

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
    <div className="game-world">
      {([...npcs, ...pickups]).map((entity) => (
        <div
          key={entity.name}
          className="npc"
          style={{
            left: entity.position.x + 'px',
            top: entity.position.y + 'px',
            transform: `translate(-50%, -50%)`,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            borderRadius: '8px',
            padding: '8px',
            fontSize: `${entity.fontSize}px`,
            position: 'absolute',
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.7)', // Ajoute une lueur
            transition: 'transform 0.2s ease-out, box-shadow 0.2s ease-out', // Ajoute une animation
            cursor: 'pointer', // Curseur interactif
          }}
        >
          <h1 style={{ margin: 0 }}>{entity.name}</h1>
        </div>
      ))}
    </div>
  );
};

export default EntityHeadLabelDisplayController;
