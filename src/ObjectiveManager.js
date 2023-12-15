class ObjectiveManager {
  constructor() {
    this.currentObjectiveIndex = 0;
    this.objectives = [];

  }

  // Ajouter un nouvel objectif
  addObjective(description, position, hasPointToFollow) {
    const newObjective = {
      description: description,
      position: position,
      meters: -1,
      heightMeters: -1,
      isCompleted: false,
      hasPointToFollow: hasPointToFollow
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

  // Get distance between player and objective
  async getMetersFromPlayer() {

    if (this.objectives[this.currentObjectiveIndex].hasPointToFollow) {
      const SDK3DVerse = window.SDK3DVerse;
      const camera = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports();

      const playerPosition = await camera[0].getTransform().position;

      // console.log(playerPosition)
    

      const dx = this.objectives[this.currentObjectiveIndex].position[0] - playerPosition[0];
      const dz = this.objectives[this.currentObjectiveIndex].position[2] - playerPosition[2];
    

      const distance = Math.floor(Math.sqrt(dx * dx + dz * dz));

      this.objectives[this.currentObjectiveIndex].meters = distance;
    }

  }

  // Get distance between player and objective in height
  async getMetersFromPlayerHeight() {
    if (this.objectives[this.currentObjectiveIndex].hasPointToFollow) {
      const SDK3DVerse = window.SDK3DVerse;

      const camera = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports();

      const playerPosition = await camera[0].getTransform().position;
    


      const dy = this.objectives[this.currentObjectiveIndex].position[1] - playerPosition[1];
    

      const distance = Math.round(dy)

      this.objectives[this.currentObjectiveIndex].heightMeters = distance;
    }
  }


}


export default ObjectiveManager;
