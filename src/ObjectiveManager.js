class ObjectiveManager {
  constructor() {
    this.currentObjectiveIndex = 0;
    this.objectives = [];
  }

  // Ajouter un nouvel objectif
  addObjective(description, position) {
    const newObjective = {
      description: description,
      position: position,
      meters: 0,
      heightMeters: 0,
      isCompleted: false,
    };
    this.objectives.push(newObjective);
  }

  // Changer l'objectif actuel
  setCurrentObjective(index) {
    this.currentObjectiveIndex = index;
  }

  // Obtenir l'objectif actuel
  getCurrentObjective() {
    return this.objectives[this.currentObjectiveIndex];
  }

  async getMetersFromPlayer() {
    const SDK3DVerse = window.SDK3DVerse;

    const camera = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports();

    const playerPosition = await camera[0].getTransform().position;
  

    const dx = this.objectives[this.currentObjectiveIndex].position[0] - playerPosition[0];
    const dz =this.objectives[this.currentObjectiveIndex].position[2] - playerPosition[2];
  

    const distance = Math.round(Math.sqrt(dx * dx + dz * dz));

    this.objectives[this.currentObjectiveIndex].meters = distance;
  }

  async getMetersFromPlayerHeight() {
    const SDK3DVerse = window.SDK3DVerse;

    const camera = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports();

    const playerPosition = await camera[0].getTransform().position;
  


    const dy = this.objectives[this.currentObjectiveIndex].position[1] - playerPosition[1];
  

    const distance = Math.round(dy)

    this.objectives[this.currentObjectiveIndex].heightMeters = distance;
  }
}


export default ObjectiveManager;
