import { signal } from "../../../decorators";
import Bird, { BirdState } from "../Bird/Bird";
const { print } = godot;

export default class Bat extends Bird {
  @signal static readonly OnSonarDiscover: string;
  
  special() {
    // print("BAT DONE DID THE SPECIAL");
    
    // [DEBUG] Pretend Sonar found gold
    this.emit_signal(Bat.OnSonarDiscover, this);
    
    this.changeState(BirdState.Idle);
  }
}