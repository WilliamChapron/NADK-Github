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
      subtitleList: ["J'ai imaginé ce globe à la fin du XIXe siècle pour répondre aux attentes de mon ami Elisee Reclus qui voulait faire entrer la géographie dans la cité. C'est pour cela que j'ai inventé une architecture qui puisse mettre en valeur ce merveilleux globe","Les regles du jeu sont simples mais je n'en suis pas le maître, l'incroyable force que possède le Globe à pris possession des lieux, allons donc intéragir avec lui pour voir ce qu'il attends de vous","Suis-moi !"],
      canWriteCinematic: false,
    };
  }

  

  async initGame() {
    // Game


    // State d'objectifs

        // [-21.999155044555664,0,4.39353609085083]  initial guide
    // Hight guide             position : [0,45.75,-2],
    // chine boulée [5701.52294921875, -0.3, 3251.251708984375]


    this.gameData.objectiveInstance.addObjective("Rencontrer le guide du batiment", [-21.999155044555664,0,4.39353609085083], true, "Game");
    this.gameData.objectiveInstance.addObjective("Discuter avec Louis en haut de l'architecture", [0,45.75,-2], true, "Game");
    this.gameData.objectiveInstance.addObjective("Questionner le guide pour qu'il vous informe de vos missions", [5701.52294921875, -0.3, 3251.251708984375], true, "Level");
    this.gameData.objectiveInstance.addObjective("Choisir le bon drapeau", [5, 3, 5], false, "Level");
    this.gameData.objectiveInstance.addObjective("Parler a louis pour valider le drapeau", [5701.52294921875, -0.3, 3251.251708984375], true, "Level");
    this.gameData.objectiveInstance.addObjective("Reparler à Louis devant vous pour la suite de vos missions", [5, 3, 5], false, "Game");

    this.gameData.objectiveInstance.addObjective("Suivez le guide du batiment", [5, 3, 5], false, "Game");


    await this.gameData.pickupInstance.addPickup("Trophée du pays 1", "Vous ne l'avez pas encore découvert, continuez votre aventure","Trophée de découverte du pays 1", 0,  [10.008907, 7.758502, 15.295341], 0, 2, 0, "Game", 1000,"3bc2f8af-3e7a-4001-9dc1-2d163742f3dc");
    // système de changement de text durant 

    await this.gameData.NPCInstance.addNPC("Guide du globe", [
      {
        dialogName: "default",
        sentences: ["Bonjour, je n'ai rien à raconter pour le moment", "Au revoir et à bientôt"],
        action: null,
      },
      {
        dialogName: "start",
        sentences: ["Bonjour jeune aventurier, bienvenue dans \"Le Globe\", un lieu aussi mystérieux que fascinant. Si tu penses être prêt à prouver ta valeur en résolvant les énigmes que cet endroit te réserve, sois attentif et prépare-toi à vivre la meilleure visite guidée de ta vie.", "Ne perdons pas de temps", "Suis-moi"],
        action: "startCinematic",
      },
      {
        dialogName: "explanation",
        sentences: ["Oh te revoilà, ravi de voir que la puissante aura que dégage cette orbe ne t'a pas fait fuir", "Je te souhaite la bienvenue", "Si tu es déterminé à affronter les épreuves du Globe, accepte de te rendre sur le premier territoire inconnu qui te sera proposé, je t'expliquerai ta mission une fois que nous y serons"],
        action: "teleportCountry",
      },
      {
        dialogName: "explanation2",
        sentences: ["Pour t'aider à comprendre ta mission, laisse-moi te révéler une partie de l'histoire de ce bâtiment \"magique\",", "A l'origine, c'était l'idée d'un vieil ami à moi qui voulait permettre à tous les habitants de Paris de voyager, au moins dans leur esprit, en les laissant profiter d'un globe d'une envergure titanesque mais aussi truffé de fins détails", "Mais depuis mon premier essai à réaliser ce projet, il y a plus d'un siècle, le globe a réussi à canaliser une énergie inconnue qui lui permet de faire voyager réellement les quelques chanceux qui réussissent à venir jusqu'ici", "Maintenant que tu est ici, va regarder si tu as des trophées"],
        action: "teleportTrophy",
      },
    ], [-21.999155044555664,0,4.39353609085083], [0, -0.7071, 0, 0.7071], 0, 1.9, -0.04, "Game", "b0d0aad6-cba6-4d0f-90fe-3133544c66c8");

    this.gameData.NPCInstance.setCurrentDialog("start")



    // Level

    await this.gameData.pickupInstance.addPickup("Guandao", "Une arme de combat rapproché traditionnelle, originellement appelée [ lame de lune inclinée ] qui servait notamment dans les arts martiaux. Elle est très difficile à manier car elle mesurait généralement plus de 2 mètres et pesait plus de 10 kilogrammes", "Vous venez de récuperer le premier objet rare !", 10, [5683.073242,5.134306,3268.407227], 0.3, 0.5, 0.5, "Level", 1, "60dfd22d-607a-403b-90e3-599b5e25e013"); 
    // await this.gameData.pickupInstance.addPickup("Tête de guerrier en terre cuite", "Une armée entière de soldat en terre cuite fut découverte dans ce pays, c'est une façon de rendre honneur aux grands guerriers", "Vous venez de récuperer le second objet rare !", 10, [7, 4.8, 40], 0.5, 1.5, 0.5, "Level", 1, "97924e1f-3cc0-4df3-b2cc-d614df5661df"); 
    await this.gameData.pickupInstance.addPickup("Set de thé", "Un set d'une élégance magistrale, une chose tout à fait logique puisque la légende veut que ce soit le pays dans lequel le thé fut découvert pour la première fois", "Vous venez de récuperer le troisième objet rare !", 10, [5678.638184,4.731987,3257.64502], 0.5, 1.5, 0.5, "Level", 1, "97924e1f-3cc0-4df3-b2cc-d614df5661df"); 

    
    await this.gameData.pickupInstance.addPickup("Drapeau de la chine", "Vous avez choisi un drapeau, est-ce le bon ?", "Vous venez de récuperer le drapeau de la Chine !", 10, [5671.388672,4.134436,3267.318848], 1.2, 0.1, 0.5, "Level", 1, "51a71d16-b791-4e71-9b7f-5ff57c79371a"); 
    await this.gameData.pickupInstance.addPickup("Drapeau de la corée du sud", "Vous avez choisi un drapeau, est-ce le bon ?", "Vous venez de récuperer le drapeau de la Corée du sud !", 10, [5673.703125,4.731987,3261.594238], 0.5, 0.1, 0.5, "Level", 1, "edb58234-13b3-44a4-a3ed-cd797f06859a"); 
    await this.gameData.pickupInstance.addPickup("Drapeau du japon", "Vous avez choisi un drapeau, est-ce le bon ?", "Vous venez de récuperer le drapeau du Japon !", 10, [5671.507324,3.50149,3269.132324], 0.5, 0.1, 0.5, "Level", 1, "1e2036ec-ea58-44f7-9231-fad25d97ba88"); 


  

    await this.gameData.NPCInstance.addNPC("Louis Boullée", [
      {
        dialogName: "default",
        sentences: ["On vient juste d'arriver voyageur, concentre toi sur la mission que le Globe t'a confiée", "Reviens me voir lorsque tu auras découvert quelque chose"],
        action: null,
      },
      {
        dialogName: "explanation",
        sentences: ["Et voilà ! Nous sommes arrivés à destination. Laquelle ? Pour être honnête je n'en sais pas plus que toi, et c'est justement pour ça que le globe t'a choisi.", "Il a su déceler la curiosité et le courage que tu renfermes et te demande de lui remettre les idées en place.", "Cela fait tellement de temps qu'il s'amuse avec une énergie aussi puissante, il en a perdu les pédales", "Comme tu peux le remarquer, il y a plétore de drapeaux autour de toi, à mon humble avis, il doit y avoir un lien entre eux et l'environnement dans lequel nous nous trouvons","Je remarque aussi différents objets qui sortent du lot dans cet endroit, j'imagine que ce bon vieux Globe ne serait pas contre quelques élements de contexte sur l'endroit dans lequel nous sommes.", "Essayez donc d'en collecter pour lui, il saura vous récompenser"],
        action: "activeLevel",
      },
      {
        dialogName: "success",
        sentences: ["Incroyable, tu as réussi à te repérer dans ce dédale, je n'en attendais pas moins de toi !", "Nous sommes effectivement en Chine, telle qu'elle était en 1900 sous la dynastie Qing. Il y avait de forts conflits internes à cette période et et pays était très affaibli, malgré une économie très développée grâce à la soie ou la navigation marchande notamment.","Maintenant que l'épreuve est réussie, nous pouvons retourner dans le monde réel ahahah"],
        action: "returnGlobe",
      },
      {
        dialogName: "defeat",
        sentences: ["Apparement tu as échoué dans ta mission, le drapeau que tu as selectionné ne corresponds pas au l'environnement qui nous entoure. Ce n'est pas aujourd'hui que les pensées du Globe seront remises à leur place", "Nous sommes effectivement en Chine, telle qu'elle était en 1900 sous la dynastie Qing. Il y avait de forts conflits internes à cette période et et pays était très affaibli, malgré une économie très développée grâce à la soie ou la navigation marchande notamment.","Maintenant que l'épreuve est terminée, nous pouvons retourner dans le monde réel ahahah"],
        action: "returnGlobe",
      },
    ], [5701.52294921875, -0.3, 3251.251708984375], [0,0,0,1], 0.3, 2.2, 0, "Level", "0160f8e2-8bdd-4c92-ab01-eb090ec5319e");
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
