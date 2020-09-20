import { property } from "../../../decorators";
import Bird, { BirdState } from "../Bird/Bird";
import Bat from "../Bat/Bat";
import Peacock from "../Peacock/Peacock";
const { print } = godot;

export default class Flamingo extends Bird {
  @property({ type: godot.VariantType.TYPE_NODE_PATH }) subordinateNode: godot.VariantType.TYPE_NODE_PATH;
  private subordinateBird: Bird;
  
  constructor() {
    super();
  }
  
  _ready() {
    // // [DEBUG] Pretend this is somewhere smarter
    // this.subordinateBird = this.get_node(this.subordinateNode.toString()) as Bat;
    // this.subordinateBird.connect(Bird.OnIdle, this, "onBatDoneMoving");
    
    this.subordinateBird = this.get_node(this.subordinateNode.toString()) as Peacock;
    this.subordinateBird.connect(Bird.OnIdle, this, "onPeacockIdle");
    this.subordinateBird.changeState(BirdState.Special);
  }
  
  //#region Bat
  onBatDoneMoving() {
    print("BAT IDLE, NERD");
    
    this.subordinateBird.disconnect(Bird.OnIdle, this, "onBatDoneMoving");
    this.subordinateBird.connect(Bird.OnSpecial, this, "onBatDoneSonar");
    this.subordinateBird.changeState(BirdState.Special);
  }
  
  onBatDoneSonar() {
    print("BAT SONAR, BIYATCH");
    
    this.subordinateBird.disconnect(Bird.OnSpecial, this, "onBatDoneSonar");
  }
  //#endregion
  
  //#region Peacock
  onPeacockIdle() {
    print("What's good?");
  }
  //#endregion
}