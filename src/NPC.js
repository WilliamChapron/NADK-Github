class NPCManager {
    constructor(name) {
      this.name = name;
      this.dialogues = [];
      this.actions = [];
    }
  
    addDialogue(dialogue) {
      this.dialogues.push(dialogue);
    }
  
    addAction(action) {
      this.actions.push(action);
    }
  

}
  