class NPCManager {
  constructor() {
    this.npcs = [];
    this.currentNpcIndex = 0;
  }

  async addNPC(name, dialogs, position, orientation, offsetX, offsetY, offsetZ, gamemode, assetUUID) {
    const newNPC = {
      name: name,
      dialogs: dialogs,
      currentDialog: "default",
      position: position,
      orientation: orientation,
      offsetX: offsetX,
      offsetY: offsetY,
      offsetZ: offsetZ,
      gamemode: gamemode,
    };
    this.npcs.push(newNPC);
    await this.checkAndSpawnNPC(name, position, orientation, assetUUID);
  }

  async checkAndSpawnNPC(name, position, orientation, assetUUID) {

    // En ligne, nous voulons vérifier que le NPC n'est pas déjà apparu car la logique est sur toutes les instances clients
    const response = await fetch(`http://localhost:4444/api/check-and-spawn-npc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ npcName: name }),
    });
  
    if (!response.ok) {
      throw new Error('Erreur lors de la vérification et du spawn du NPC');
    }
  
    const data = await response.json();
    // console.log(data)
  
    if (data.action === 'SPAWN_NPC') {
      await this.initNPC(name, position, orientation, assetUUID); 
    }
  }

  async initNPC(name, position, orientation, assetUUID) {
    console.log(assetUUID)
    let template = new SDK3DVerse.EntityTemplate();
    template.attachComponent('scene_ref', { value: assetUUID });
    template.attachComponent('local_transform', { position: position, orientation: orientation });
    await template.instantiateTransientEntity(`NPC_${name}`, null, false);
  }

  getCurrentNpc() {
    return this.npcs[this.currentNpcIndex];
  }

  setCurrentNpc(name) {
    const npcIndex = this.npcs.findIndex(npc => `NPC_${npc.name}` === name);
    
    if (npcIndex !== -1) {
      this.currentNpcIndex = npcIndex;
      console.log(`Le NPC actuel a été défini sur ${name}`);
    } else {
      console.error(`Aucun NPC trouvé avec le nom ${name}`);
    }
  }

  getCurrentNPCDialog() {
    const currentDialogName = this.npcs[this.currentNpcIndex].currentDialog;
    
    // Find dialog item for current dialog name
    const currentDialog = this.npcs[this.currentNpcIndex].dialogs.find(dialog => dialog.dialogName === currentDialogName);
  
    if (currentDialog) {
      return currentDialog;
    }
  }

  setCurrentDialog(name) {
    this.npcs[this.currentNpcIndex].currentDialog = name
  }

  getNPCs() {
    return this.npcs;
  }

}

export default NPCManager;

