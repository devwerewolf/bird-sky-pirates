import Bird, { BirdState } from "../Bird/Bird";
const { print } = godot;

export default class Bat extends Bird {
  special() {
    print("BAT DONE DID THE SPECIAL");
    this.changeState(BirdState.Idle);
  }
}