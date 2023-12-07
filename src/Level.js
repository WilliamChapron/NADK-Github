class Level {
    constructor(name) {
      this.name = name;
      this.npcs = [];
      this.objectives = [];
      this.pickups = [];

      const defaultNPC = new NPC('Default NPC');
      const defaultObjective = new Objective('Default Objective', 100);
      const defaultPickup = new Pickup('Default Pickup', 50);
    }
}