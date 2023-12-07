class PickupManager {
    constructor() {
      this.pickups = [];
    }
  
    addPickup(name, description, score, position) {
      const newPickup = {
        name: name,
        description: description,
        score: score,
        position: position,
      };
      this.pickups.push(newPickup);
      this.initPickup(name, position);
    }
  
    async initPickup(name, position) {
      let template = new SDK3DVerse.EntityTemplate();
      template.attachComponent('scene_ref', { value: "pickup_template_scene_id" }); // Remplacez "pickup_template_scene_id" par l'ID de votre scène de modèle de pickup
      template.attachComponent('local_transform', { position: position });
      await template.instantiateTransientEntity(name, null, true);
    }
}

export default PickupManager;

  
  // // Exemple d'utilisation :
  // const pickupManager = new PickupManager();
  
  // // Ajouter plusieurs Pickups avec leurs descriptions, valeurs et positions
  // pickupManager.addPickup("Pickup1", "Un objet à ramasser", 50, [0, 0, -3]);
  // pickupManager.addPickup("Pickup2", "Un autre objet à ramasser", 75, [0, 0, -3]);
  // // Ajouter plus de Pickups au besoin
  