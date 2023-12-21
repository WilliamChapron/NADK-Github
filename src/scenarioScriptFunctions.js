
// Scenario Script Function 


// Game Controller
import gameManagerInstance from './GameManager'; 

import { StartCinematic, WritePositionToFile } from './CinematicWriter.js';

const scenarioScriptFunctions = [
    { 
      name: 'startCinematic',
      func: async () => {
        StartCinematic()
        // 
        gameManagerInstance.gameData.objectiveInstance.setCurrentObjective(1)
        gameManagerInstance.gameData.NPCInstance.setCurrentDialog("explanation")
      }
    },
    { 
      name: 'teleportCountry',
      func: async () => {
        const clientUUID = SDK3DVerse.getClientUUID();
        const playerName = `Player_${clientUUID}`;
        const entities = await SDK3DVerse.engineAPI.findEntitiesByNames(playerName);
        const player = entities && entities[0];
        // console.log(player.getGlobalTransform().position)
        player.setGlobalTransform({position: [0, 0, 0]});

        // Set old npc to next dialog and change objective
        gameManagerInstance.gameData.NPCInstance.setCurrentDialog("explanation2")
        gameManagerInstance.gameData.objectiveInstance.setCurrentObjective(2)

        // Set new npc / level npc to his dialog 
        gameManagerInstance.gameData.NPCInstance.setCurrentNpc("NPC_Louis de chine")
        // console.log(gameManagerInstance.gameData.NPCInstance.getCurrentNpc)
        gameManagerInstance.gameData.NPCInstance.setCurrentDialog("explanation")
      }
    },
    { 
      name: 'activeLevel',
      func: async () => {
        gameManagerInstance.gameData.objectiveInstance.setCurrentObjective(3)
      }
    },
    { 
      name: 'returnGlobe',
      func: async () => {
        // console.log("RETURN GLOBE")
        const clientUUID = SDK3DVerse.getClientUUID();
        const playerName = `Player_${clientUUID}`;
        const entities = await SDK3DVerse.engineAPI.findEntitiesByNames(playerName);
        const player = entities && entities[0];
        gameManagerInstance.gameData.objectiveInstance.setCurrentObjective(5)
        player.setPosition([5, 0, 0]);
        
      }
    },
  ];

export default scenarioScriptFunctions;
