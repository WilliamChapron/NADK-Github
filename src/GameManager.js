import { WritePositionToFile } from './CinematicWriter';

import ObjectiveManager from './ObjectiveManager'

class GameManager {
  constructor() {
    this.gameData = {
      score: 0,
      discoveredCountries: [],
      gameMode: 'inGame',
      objectiveInstance: new ObjectiveManager(),
    };

    this.gameData.objectiveInstance.addObjective("Description de l'objectif 1", [5, 3, 5]);
    this.gameData.objectiveInstance.addObjective("Description de l'objectif 2", [15, 15, 15]);

    
  }

  incrementScore(points) {
    this.gameData.score += points;
  }

  addDiscoverCountry(country) {
    if (!this.gameData.discoveredCountries.includes(country)) {
      this.gameData.discoveredCountries.push(country);
    }
  }

  setGameMode(mode) {
    this.gameData.gameMode = mode;
  }

  async gameUpdate() {


    await this.gameData.objectiveInstance.getMetersFromPlayer()

    await this.gameData.objectiveInstance.getMetersFromPlayerHeight()



    // GET POSITION FOR WRITE POSITION IN API
    
    // const SDK3DVerse = window.SDK3DVerse;

    // const player = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports();
    // const cameraEntity = player[0].getCamera();

    // console.log(cameraEntity);

    // const transform = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports();

    // const position = await transform[0].getTransform().position;

    // WritePositionToFile(position);
  }

  resetGame() {
    this.gameData = {
      score: 0,
      discoveredCountries: [],
      gameMode: 'inGame',
    };
  }
}

// Créer une instance unique du gestionnaire de jeu
const gameManagerInstance = new GameManager();

// Exporter l'instance unique du gestionnaire de jeu
export default gameManagerInstance;
