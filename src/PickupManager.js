class PickupManager {
  constructor() {
    this.pickups = [];
    this.currentPickupIndex = 0;
  }

  async addPickup(name, description, pickupText, score, position, offsetX, offsetY, offsetZ, gamemode, interactLimit, assetUUID) {
    const newPickup = {
      name: name,
      description: description,
      pickupText: pickupText,
      score: score,
      position: position,
      offsetX: offsetX,
      offsetY: offsetY,
      offsetZ: offsetZ,
      gamemode: gamemode,
      interactLimit: interactLimit,
      interactNumber: 0,
    };
    this.pickups.push(newPickup);

    // Ajoutez la vérification et le spawn du côté du serveur
    await this.checkAndSpawnPickup(name, position, assetUUID);
  }

  async checkAndSpawnPickup(name, position, assetUUID) {
    // En ligne, vérifiez si le Pickup n'est pas déjà apparu
    const response = await fetch(`https://w3xklm-4444.csb.app/api/check-and-spawn-pickup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pickupName: name }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la vérification et du spawn du Pickup');
    }

    const data = await response.json();

    if (data.action === 'SPAWN_PICKUP') {
      await this.initPickup(name, position, assetUUID);
    }
  }

  checkInteractLimit() {
    if (this.pickups[this.currentPickupIndex].interactNumber >= this.pickups[this.currentPickupIndex].interactLimit) {
      return true;
    }
    return false
  }

  incrementInteract() {
    this.pickups[this.currentPickupIndex].interactNumber += 1
  }

  async initPickup(name, position, assetUUID) {
    console.log(assetUUID)
    let template = new SDK3DVerse.EntityTemplate();
    template.attachComponent('scene_ref', { value: assetUUID }); 
    template.attachComponent('local_transform', { position: position });
    await template.instantiateTransientEntity(`Object_${name}`, null, false);
  }

  setCurrentPickup(name) {
    const pickupIndex = this.pickups.findIndex(pickup => `Object_${pickup.name}` === name);
    // console.log("Pickups array:", this.pickups);
    // console.log("Searching for pickup:", `Object_${name}`);
    // console.log("Found pickup index:", pickupIndex);

    if (pickupIndex !== -1) {
      this.currentPickupIndex = pickupIndex;  
    } else {
      console.error(`Aucun Pickup trouvé avec le nom ${name}`);
    }
  }

  setCurrentPickupInfo(updatedValues) {
    const existingPickup = { ...this.pickups[this.currentPickupIndex] };
    const updatedPickup = { ...existingPickup, ...updatedValues };
    this.pickups[this.currentPickupIndex] = updatedPickup;
  }

  getCurrentPickup() {
    return this.pickups[this.currentPickupIndex];
  }

  getPickups() {
    return this.pickups;
  }

  // Check success flags
  checkFlags() {
    const flagName = this.pickups[this.currentPickupIndex].name
    if (flagName == "Drapeau de la chine") {
      return "Good Flag";
    }
    else {
      return "Bad Flag";
    }
  }

}

export default PickupManager;
