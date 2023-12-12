import ObjectiveManager from './ObjectiveManager'
import PickupManager from './PickupManager'
import NPCManager from './NPCManager'

class Level {
    constructor(name) {
      this.name = name;
      this.objectiveInstance = new ObjectiveManager();
      this.NPCInstance = new NPCManager();
      this.pickupInstance = new PickupManager();
    }


}

export default Level;

