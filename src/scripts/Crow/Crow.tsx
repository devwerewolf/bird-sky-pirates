import Bird, { BirdState } from "../Bird/Bird";
import Gold from "../Gold/Gold";
const { print } = godot;

export default class Crow extends Bird {
  static currentGoldShiny: Gold;
  
  special() {
    print("Zoo-wee-mama!");
    this.changeState(BirdState.Idle);
  }
}