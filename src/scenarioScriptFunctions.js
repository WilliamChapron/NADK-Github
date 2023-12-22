
// Scenario Script Function 


// Game Controller
import gameManagerInstance from './GameManager'; 

import { StartCinematic, WritePositionToFile } from './CinematicWriter.js';

const scenarioScriptFunctions = [
    { 
      name: 'startCinematic',
      func: async () => {
        gameManagerInstance.gameData.objectiveInstance.setCurrentObjective(6)
        StartCinematic()
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
        player.setGlobalTransform({position: [5705.29296875, 1.0095393657684326, 3251.810791015625]});

        // Set old npc to next dialog and change objective
        gameManagerInstance.gameData.NPCInstance.npcs[0].currentDialog = "explanation2";
        gameManagerInstance.gameData.objectiveInstance.setCurrentObjective(2)

        // Set new npc / level npc to his dialog 
        gameManagerInstance.gameData.NPCInstance.currentNpcIndex = 1;
        // console.log(gameManagerInstance.gameData.NPCInstance.getCurrentNpc)
        gameManagerInstance.gameData.NPCInstance.npcs[1].currentDialog = "explanation";
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
        player.setPosition([0,47,-0.03593]);
        
      }
    },
    { 
      name: 'teleportTrophy',
      func: async () => {
        // console.log("RETURN GLOBE")
        const clientUUID = SDK3DVerse.getClientUUID();
        const playerName = `Player_${clientUUID}`;
        const entities = await SDK3DVerse.engineAPI.findEntitiesByNames(playerName);
        const player = entities && entities[0];
        player.setPosition([9.008907, 7.758502, 13.295341]);
        
      }
    },
  ];

export default scenarioScriptFunctions;
