import Bird, { BirdState } from "../Bird/Bird";
const { print } = godot;

export default class Crow extends Bird {
  special() {
    print("Zoo-wee-mama!");
    this.changeState(BirdState.Idle);
  }
}