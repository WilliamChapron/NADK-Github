class PickupManager {
  constructor() {
    this.pickups = [];
    this.currentPickupIndex = 0;
  }

  async addPickup(name, description, score, position, offsetX, offsetY, offsetZ, gamemode) {
    const newPickup = {
      name: name,
      description: description,
      score: score,
      position: position,
      offsetX: offsetX,
      offsetY: offsetY,
      offsetZ: offsetZ,
      gamemode: gamemode,
    };
    this.pickups.push(newPickup);

    // Ajoutez la vérification et le spawn du côté du serveur
    await this.checkAndSpawnPickup(name, position);
  }

  async checkAndSpawnPickup(name, position) {
    // En ligne, vérifiez si le Pickup n'est pas déjà apparu
    const response = await fetch(`http://localhost:4444/api/check-and-spawn-pickup`, {
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
      await this.initPickup(name, position);
    }
  }

  async initPickup(name, position) {
    let template = new SDK3DVerse.EntityTemplate();
    template.attachComponent('scene_ref', { value: "13bb84dd-d6d2-48fc-add4-b5a6ff632cfc" }); 
    template.attachComponent('local_transform', { position: position });
    await template.instantiateTransientEntity(`Object_${name}`, null, false);
  }

  async setCurrentPickup(name) {
    const pickupIndex = this.pickups.findIndex(pickup => `Object_${pickup.name}` === name);
    console.log("Pickups array:", this.pickups);
    console.log("Searching for pickup:", `Object_${name}`);
    console.log("Found pickup index:", pickupIndex);

    if (pickupIndex !== -1) {
      this.currentPickupIndex = pickupIndex;  
      console.log(`Le Pickup actuel a été défini sur ${name}`);
    } else {
      console.error(`Aucun Pickup trouvé avec le nom ${name}`);
    }
  }

  getCurrentPickup() {
    return this.pickups[this.currentPickupIndex];
  }

  getPickups() {
    return this.pickups;
  }
}

export default PickupManager;
