
// Scenario Script Function 


const scenarioScriptFunctions = [
    { 
      name: 'teleportCountry',
      func: async () => {
        const clientUUID = SDK3DVerse.getClientUUID();
        const playerName = `Player_${clientUUID}`;
        const entities = await SDK3DVerse.engineAPI.findEntitiesByNames(playerName);
        const player = entities && entities[0];
        player.setPosition([-1, 4.8, 6]);
      }
    },
    { 
      name: 'returnGlobe',
      func: async () => {
        const clientUUID = SDK3DVerse.getClientUUID();
        const playerName = `Player_${clientUUID}`;
        const entities = await SDK3DVerse.engineAPI.findEntitiesByNames(playerName);
        const player = entities && entities[0];
        player.setPosition([-1, 4.8, 6]);
      }
    },
  ];

export default scenarioScriptFunctions;
