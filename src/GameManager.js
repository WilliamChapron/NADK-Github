import { WritePositionToFile } from './CinematicWriter';

import ObjectiveManager from './ObjectiveManager'
import PickupManager from './PickupManager'
import NPCManager from './NPCManager'





class GameManager {
  constructor() {
    this.gameData = {
      score: 0,
      discoveredCountries: [],
      gameMode: 'inGame',
      objectiveInstance: new ObjectiveManager(),
      pickupInstance: new PickupManager(),
      NPCInstance: new NPCManager(),
      subtitleCurrentIndex: 0,
      subtitleList: ["Le globe a ete cree en 1900","Les regles du jeu sont","Suis moi !"],
      canWriteCinematic: false,
    };
  }

  

  async initGame() {
    // Game


    // State d'objectifs
    this.gameData.objectiveInstance.addObjective("Aller discuter avec Louis en bas du globe", [5, 3, 5], true, "Game");
    this.gameData.objectiveInstance.addObjective("Aller discuter avec Louis en haut de l'architecture", [5, 3, 5], true, "Game");
    this.gameData.objectiveInstance.addObjective("Allez parler a louis de chine pour qu'il vous dise ou vous êtes", [-1, 4.8, 6], true, "Level");
    this.gameData.objectiveInstance.addObjective("Choisir le bon drapeau", [5, 3, 5], true, "Level");
    this.gameData.objectiveInstance.addObjective("Allez parler a louis de chine pour valider le drapeau", [-1, 4.8, 6], true, "Level");
    this.gameData.objectiveInstance.addObjective("Aller discuter de nouveau avec Louis devant vous", [5, 3, 5], true, "Game");

    await this.gameData.pickupInstance.addPickup("Trophée de découverte du pays 1", "Vous ne l'avez pas encore découvert, continuez votre aventure", 0, [5, 0, 5], 0.5, 1.5, 0.5, "Game");
    // système de changement de text durant 


    await this.gameData.NPCInstance.addNPC("Louis mort", [
      {
        dialogName: "default",
        sentences: ["Bonjour, je n'ai rien a raconter pour le moment", "Au revoie et à bientôt"],
        action: null
      },
      {
        dialogName: "start",
        sentences: ["Bonjour, tu peux me suivre si tu le souhaite je peux te faire decouvrir mon architecture", "Suis moi"],
        action: "startCinematic"
      },
      {
        dialogName: "explanation",
        sentences: ["Salut, comment ça va?", "Bienvenue", "Je t'explique le jeu, teleport toi au premier niveau"],
        action: "teleportCountry"
      },
      {
        dialogName: "explanation2",
        sentences: ["Je vais t'en dire plus à propos de cette architecture", "sdjkdskjjskjdkj"],
        action: null
      },
    ], [0, 0, 5], [0,1,0,0], 0, 1.8, 0.3, "Game");

    this.gameData.NPCInstance.setCurrentDialog("start")



    // Level

    await this.gameData.pickupInstance.addPickup("Item 1", "Description 1", 10, [7, 4.8, 39], 0.5, 1.5, 0.5, "Level"); 
    await this.gameData.pickupInstance.addPickup("Item 2", "Description 1", 10, [7, 4.8, 40], 0.5, 1.5, 0.5, "Level"); 
    await this.gameData.pickupInstance.addPickup("Item 3", "Description 1", 10, [7, 4.8, 41], 0.5, 1.5, 0.5, "Level"); 


  
  

    await this.gameData.NPCInstance.addNPC("Louis de chine", [
      {
        dialogName: "default",
        sentences: ["Bonjour, je n'ai rien a raconter pour le moment", "Au revoie et à bientôt"],
        action: null
      },
      {
        dialogName: "explanation",
        sentences: ["Tu est maintenant dans le level", "tu vas devoir choisir le bon drapeaux","tu va pouvoir aussi récuperer des objets pour du score bonus"],
        action: "activeLevel"
      },
      {
        dialogName: "success",
        sentences: ["Tu a réussi le niveau car tu a trouvé le bon pays", "je t'explique l'histoire du pays, du décor","téleporte toi pour revenir a l'architecture"],
        action: "returnGlobe"
      },
      {
        dialogName: "defeat",
        sentences: ["Tu n'a pas réussi le niveau car tu n'a pas trouvé le bon pays", "je t'explique quand meme l'histoire du pays, du décor","téleporte toi pour revenir a l'architecture"],
        action: "returnGlobe"
      },
    ], [3, 0, 5], [0,0,0,1], 0, 1.8, 0.3, "Level");
  }

  incrementSubtitleIndex() {
    this.gameData.subtitleCurrentIndex += 1
  }

  getCurrentSubtitle() {
    return this.gameData.subtitleList[this.gameData.subtitleCurrentIndex];
  }

  incrementScore(points) {
    this.gameData.score += points;
  }

  // addDiscoverCountry(country) {
  //   if (!this.gameData.discoveredCountries.includes(country)) {
  //     this.gameData.discoveredCountries.push(country);
  //   }
  // }

  setGameMode(mode) {
    this.gameData.gameMode = mode;
  }

  async gameUpdate(is3DVerseLoad) {

    if (is3DVerseLoad) {
      await this.gameData.objectiveInstance.getMetersFromPlayer()
      await this.gameData.objectiveInstance.getMetersFromPlayerHeight()
    }




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
