import { property } from "../../../decorators";
import Bird, { BirdState } from "../Bird/Bird";
import Bat from "../Bat/Bat";
import Peacock from "../Peacock/Peacock";
const { print } = godot;

export default class Flamingo extends Bird {
  @property({ type: godot.VariantType.TYPE_NODE_PATH }) subordinateNode: godot.VariantType.TYPE_NODE_PATH;
  subordinates: Bird[];
  
  constructor() {
    super();
    this.subordinates = [];
  }
  
  get subordinateCount() {
    return this.subordinates.length;
  }
  
  public addSubordinates(birds: Bird[]) {
    birds.forEach(bird => {
      // Connect signal
      if (bird instanceof Bat) {
        bird.connect(Bat.OnSonarDiscover, this, "onBatSonarDiscover");
      }
      
      // Add to subordinates
      this.subordinates.push(bird);
    });
  }
  
  public removeSubordinates(birds: Bird[]) {
    birds.forEach(bird => {
      // Disconnect signal
      if (bird instanceof Bat) {
        bird.disconnect(Bat.OnSonarDiscover, this, "onBatSonarDiscover");
      }
      
      // Remove from subordinates
      const subordinateIndex = this.subordinates.indexOf(bird);
      this.subordinates.splice(subordinateIndex, 1);
    });
  }
  
  //#region Bat
  onBatSonarDiscover(bat: Bat) {
    print("Let's get this bread " + bat.name + "!");
  }
  
  onBatDoneMoving(bat: Bat) {
    print("BAT IDLE, NERD");
    
    bat.disconnect(Bird.OnIdle, this, "onBatDoneMoving");
    bat.connect(Bird.OnSpecial, this, "onBatDoneSonar");
    bat.changeState(BirdState.Special);
  }
  
  onBatDoneSonar(bat: Bat) {
    print("BAT SONAR, BIYATCH");
    
    bat.disconnect(Bird.OnSpecial, this, "onBatDoneSonar");
  }
  //#endregion
  
  //#region Peacock
  onPeacockIdle(peacock: Peacock) {
    peacock.dummy();
  }
  //#endregion
}