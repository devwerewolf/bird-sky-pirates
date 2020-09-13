import { property } from "../../../decorators";
import Bird, { BirdState } from "../Bird/Bird";
import Bat from "../Bat/Bat";
const { print } = godot;

export default class Flamingo extends Bird {
  @property({ type: godot.VariantType.TYPE_NODE_PATH }) subordinateNode: godot.VariantType.TYPE_NODE_PATH;
  private subordinateBird: Bird;
  
  constructor() {
    super();
  }
  
  _ready() {
    super._ready();
    
    // [DEBUG] Pretend this is somewhere smarter
    this.subordinateBird = this.get_node(this.subordinateNode.toString()) as Bat;
    this.subordinateBird.connect(Bird.OnIdle, this, "onBatDoneMoving");
  }
  
  special() {
    print("FLAMINGO");
    this.changeState(BirdState.Idle);
  }
  
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
}