import { WritePositionToFile } from './CinematicWriter';

import ObjectiveManager from './ObjectiveManager'
import PickupManager from './PickupManager'
import NPCManager from './NPCManager'
import Level from './Level'

function function2() {
  console.log("action npc")
  
}

class GameManager {
  constructor() {
    this.gameData = {
      score: 0,
      discoveredCountries: [],
      gameMode: 'inGame',
      objectiveInstance: new ObjectiveManager(),
      pickupInstance: new PickupManager(),
      NPCInstance: new NPCManager(),
      levelInstance: new Level(),
      canWriteCinematic: false,
    };

    // Init Objectives for game 

    
    // Init Objects to pickup for game 

    // Init NPC for Game

    
  }

  

  async initGame() {

    this.gameData.objectiveInstance.addObjective("Description de l'objectif 1", [5, 3, 5], true);
    this.gameData.objectiveInstance.addObjective("Description de l'objectif 2", [15, 15, 15], true);

    await this.gameData.pickupInstance.addPickup("Totem", "Restaure la santé", 10, [0, 0, -3]);
    await this.gameData.pickupInstance.addPickup("Tableau", "Fournit des munitions", 20, [2, 0, -3]);



    await this.gameData.NPCInstance.addNPC("Mickeal", [
      {
        dialogName: "default",
        sentences: ["Salut, comment ça va?", "Bienvenue dans notre monde!", "C'est une journée ensoleillée."],
        action: function2()
      },
      {
        dialogName: "custom",
        sentences: ["C'est un plaisir de te voir!", "Nous avons beaucoup à explorer ici.", "Si tu as des questions, n'hésite pas."],
        action: function2()
      }
    ], [0, 0, 5]);
    
    await this.gameData.NPCInstance.addNPC("George", [
      {
        dialogName: "default",
        sentences: ["Bonjour, aventurier!", "La quête t'attend.", "Prends garde aux créatures!"],
        action: null
      },
      {
        dialogName: "custom",
        sentences: ["Bienvenue dans notre royaume!", "Nous avons besoin de ton aide.", "Es-tu prêt pour l'aventure?"],
        action: function2()
      }
    ], [0, 0, 0]);


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
    

    // const player = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports();
    // const cameraEntity = player[0].getCamera();

    // console.log(cameraEntity);



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
