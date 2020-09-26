import { signal } from "../../../decorators";
import Bird, { BirdState } from "../Bird/Bird";
const { print } = godot;

export default class Bat extends Bird {
  @signal static readonly OnSonarDiscover: string;
  
  special() {
    // [DEBUG] Pretend Sonar found gold
    this.emit_signal(Bat.OnSonarDiscover, this);
    
    // TODO: Let Flamingo handle Idle
    // this.changeState(BirdState.Idle);
  }
}