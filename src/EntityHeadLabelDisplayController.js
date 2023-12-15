import React, { useState, useEffect } from 'react';
import gameManagerInstance from './GameManager';

// # TODO AU DESSUS DES OBJETS ET DES JOUEURS AUSSI

const EntityHeadLabelDisplayController = (bool) => {
  const [npcs, setNPCs] = useState([]);

  useEffect(() => {
    // console.log("Update logic")
    const updateNPCs = async () => {
      const NPCs = gameManagerInstance.gameData.NPCInstance.getNPCs();
      const playerViewport = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports();

      const updatedNPCs = [];

      let index = 0;
      for (const npc of NPCs) {
        const entityPosition = await gameManagerInstance.gameData.NPCInstance.npcs[index].position;
        const playerPosition = await playerViewport[0].getTransform().position;
        const { isInViewport, position2D } = isEntityInViewport(entityPosition, playerViewport);

        if (isInViewport) {
          const dx = entityPosition[0] - playerPosition[0];
          const dz = entityPosition[2] - playerPosition[2];
          const distance = Math.round(Math.sqrt(dx * dx + dz * dz));

          const adjustedY = position2D.y;
          const fontSize = 16 / (distance / 2); 

          if (distance <= 5) {
            updatedNPCs.push({
              name: npc.name,
              position: { x: position2D.x, y: adjustedY },
              fontSize: fontSize,
            });
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
      {/* {npcs.map((npc) => (
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
      ))} */}
      <p></p>
    </div>
  );
};

export default EntityHeadLabelDisplayController;
