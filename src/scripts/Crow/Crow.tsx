import { signal } from "../../../decorators";
import Bird, { BirdState } from "../Bird/Bird";
import Gold from "../Gold/Gold";
const { print } = godot;

export default class Crow extends Bird {
  @signal static readonly OnCollectGold: string;
  currentGoldShiny: Gold;
  
  special() {
    this.currentGoldShiny.collect();
    this.emit_signal(Crow.OnCollectGold, this);
    this.changeState(BirdState.Idle);
  }
  
  setCurrentGoldShiny(goldShiny: Gold) {
    this.currentGoldShiny = goldShiny;
  }
}