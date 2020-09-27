import { property } from "../../../decorators";
import Bird, { BirdState } from "../Bird/Bird";
import Bat from "../Bat/Bat";
import Peacock from "../Peacock/Peacock";
import Crow from "../Crow/Crow";
const { print } = godot;

export default class Flamingo extends Bird {
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
    const crows = this.subordinates.filter(bird => bird instanceof Crow) as Crow[];
    crows.forEach(crow => {
      // TODO: Check if crow is currently busy
      crow.setTarget(bat.position);
      crow.changeState(BirdState.Move);
      
      bat.setTarget(this.position);
      bat.changeState(BirdState.Move);
    });
  }
  //#endregion
  
  //#region Crow
  //#endregion
}