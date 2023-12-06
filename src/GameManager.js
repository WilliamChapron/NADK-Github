import { WritePositionToFile } from './CinematicWriter';

class GameManager {
  constructor() {
    this.gameData = {
      score: 0,
      discoveredCountries: [],
      gameMode: 'inGame',
    };
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
    
    const SDK3DVerse = window.SDK3DVerse;

    const player = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports();
    const cameraEntity = player[0].getCamera();

    console.log(cameraEntity);

    const transform = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports();

    const position = await transform[0].getTransform().position;

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
