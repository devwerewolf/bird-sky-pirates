import { signal } from "../../../decorators";
import Bird, { BirdState } from "../Bird/Bird";
import Gold from "../Gold/Gold";
const { print } = godot;

export default class Bat extends Bird {
  @signal static readonly OnSonarDiscover: string;
  goldShiny: Gold;
  
  special() {
    // [DEBUG] Pretend Sonar found gold
    // this.emit_signal(Bat.OnSonarDiscover, this);
    
    if (this.goldShiny) {
      this.emit_signal(Bat.OnSonarDiscover, this, this.goldShiny);
      this.goldShiny = null;
    }
    
    // TODO: Let Flamingo handle Idle
    // this.changeState(BirdState.Idle);
  }
  
  public goldSenseAttract(goldShiny: Gold) {
    this.goldShiny = goldShiny;
  }
  
  public goldSenseRevoke() {
    this.goldShiny = null;
  }
}