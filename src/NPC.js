class NPCManager {
    constructor(name) {
      this.name = name;
      this.npcs = [];
    }
  
    // Ajouter un nouveau NPC avec ses dialogues et actions
    addNPC(dialogues, actions) {
      const newNPC = {
        dialogues: dialogues,
        actions: actions,
      };
      this.npcs.push(newNPC);
    }
  
    // Obtenir le NPC actuel
    getCurrentNPC(index) {
      return this.npcs[index];
    }
  
    // Ajouter des dialogues à un NPC existant
    addDialoguesToNPC(index, dialogues) {
      this.npcs[index].dialogues.push(...dialogues);
    }
  
    // Ajouter des actions à un NPC existant
    addActionsToNPC(index, actions) {
      this.npcs[index].actions.push(...actions);
    }
  }
  
  // Exemple d'utilisation :
  const npcManager = new NPCManager("NPC Manager");
  
  // Ajouter plusieurs NPCs avec leurs dialogues et actions
  npcManager.addNPC(["Dialogue 1", "Dialogue 2"], ["Action 1", "Action 2"]);
  npcManager.addNPC(["Dialogue 3", "Dialogue 4"], ["Action 3", "Action 4"]);
  // Ajouter plus de NPCs au besoin
  