class NPCManager {
  constructor() {
    this.npcs = [];
    this.currentNpcIndex = 0;
  }

  async addNPC(name, dialogs, position,actions) {
    const newNPC = {
      name: name,
      dialogs: dialogs,
      currentDialog: "default",
      actions: actions,
      position: position,
    };
    this.npcs.push(newNPC);
    await this.checkAndSpawnNPC(name, position);
  }

  async checkAndSpawnNPC(name, position) {
    // In online, we want check the npc is not already spawn because logic is on all client instance
    const response = await fetch(`http://localhost:4444/api/check-and-spawn-npc?npcName=${name}`);

    if (!response.ok) {
      throw new Error('Erreur lors de la vérification et du spawn du NPC');
    }

    const data = await response.json();

    if (data.action === 'SPAWN_NPC') {
      await this.initNPC(name, position); 
    }
  }

  async initNPC(name, position) {
    let template = new SDK3DVerse.EntityTemplate();
    template.attachComponent('scene_ref', { value: "e58390b7-01c0-42d6-9049-40d93ab3e4e2" });
    template.attachComponent('local_transform', { position: position });
    await template.instantiateTransientEntity(name, null, true);
  }

  async getCurrentNpc() {
    return this.npcs[this.currentNpcIndex];
  }

  async getCurrentNPCDialog() {
    // Get current npc dialog
    return this.npcs[this.currentNpcIndex].dialogs[this.npcs[this.currentNpcIndex].currentDialog];
  }

  async setCurrentDialog(name) {
    // Set the index of the current dialog, will influence the get of current npc dialog
    // Basically, it's the game manage dialog switch
    this.npcs[this.currentNpcIndex].currentDialog = name
  }

}

export default NPCManager;

// // Exemple d'utilisation :
// const npcManager = new NPCManager();

// // Ajouter plusieurs NPCs avec leurs dialogues et actions
// npcManager.addNPC("NPC2", ["Bonjour", "Tu peux te téléporter si tu veux", "clique sur le bouton "], [function2(), function1()], [0, 0, -3]);

// npcManager.addNPC("NPC3", ["Bonjour", "Tu peux te téléporter si tu veux", "clique sur le bouton "], [function2(), function1()], [0, 0, -3]);
// // Ajouter plus de NPCs au besoin
