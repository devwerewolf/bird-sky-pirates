import { property } from "../../../decorators";
import Bird, { BirdState } from "../Bird/Bird";
import Bat from "../Bat/Bat";
import Peacock from "../Peacock/Peacock";
import Crow from "../Crow/Crow";
import Gold from "../Gold/Gold";
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
  onBatSonarDiscover(bat: Bat, goldShiny: Gold) {
    const crows = this.subordinates.filter(bird => bird instanceof Crow) as Crow[];
    crows.forEach(crow => {
      // TODO: Check if crow is currently busy
      crow.setCurrentGoldShiny(goldShiny);
      crow.setTarget(goldShiny.position);
      crow.changeState(BirdState.Move);
      crow.connect(Bird.OnIdle, this, "onCrowIdle");
      
      bat.setTarget(this.position);
      bat.changeState(BirdState.Move);
    });
  }
  //#endregion
  
  //#region Crow
  onCrowIdle(crow: Crow) {
    crow.changeState(BirdState.Special);
    crow.connect(Crow.OnCollectGold, this, "onCrowCollectGold");
  }
  
  onCrowCollectGold(crow: Crow) {
    crow.setTarget(this.position);
    crow.changeState(BirdState.Move);
    crow.disconnect(Bird.OnIdle, this, "onCrowIdle");
    crow.disconnect(Crow.OnCollectGold, this, "onCrowCollectGold");
  }
  //#endregion
}