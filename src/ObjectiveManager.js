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

  // Définir l'état d'achèvement de l'objectif actuel
  setCompletionCurrentObjective(bool) {
    this.objectives[this.currentObjectiveIndex].isCompleted = bool;
  }

  // Obtenir l'état d'achèvement de l'objectif actuel
  getCompletionCurrentObjective() {
    return this.objectives[this.currentObjectiveIndex].isCompleted;
  }
}

// Exemple d'utilisation :
const objectiveManager = new ObjectiveManager();

// Ajouter plusieurs objectifs
objectiveManager.addObjective("Description de l'objectif 1", [1, 2, 3]);
objectiveManager.addObjective("Description de l'objectif 2", [4, 5, 6]);
// Ajouter plus d'objectifs au besoin
