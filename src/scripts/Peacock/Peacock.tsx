import Bird, { BirdState } from "../Bird/Bird";
const { print } = godot;

export default class Peacock extends Bird {
  special() {
    print("PEACOCK");
    this.changeState(BirdState.Idle);
  }
}