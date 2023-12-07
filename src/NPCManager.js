class NPCManager {
  constructor() {
    this.npcs = [];
  }

  addNPC(name, dialogues, actions, position) {
    const newNPC = {
      name: name,
      dialogues: dialogues,
      actions: actions,
      position: position,
    };
    this.npcs.push(newNPC);
    this.initNPC(name, position);
  }

  async initNPC(name, position) {
    let template = new SDK3DVerse.EntityTemplate();
    template.attachComponent('scene_ref', { value: "e58390b7-01c0-42d6-9049-40d93ab3e4e2" });
    template.attachComponent('local_transform', { position: position });
    await template.instantiateTransientEntity(name, null, true);
  }
}

// // Exemple d'utilisation :
// const npcManager = new NPCManager();

// // Ajouter plusieurs NPCs avec leurs dialogues et actions
// npcManager.addNPC("NPC2", ["Bonjour", "Tu peux te téléporter si tu veux", "clique sur le bouton "], [function2(), function1()], [0, 0, -3]);

// npcManager.addNPC("NPC3", ["Bonjour", "Tu peux te téléporter si tu veux", "clique sur le bouton "], [function2(), function1()], [0, 0, -3]);
// // Ajouter plus de NPCs au besoin
