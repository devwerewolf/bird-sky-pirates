import { property } from "../../../decorators";
import Bird from "../Bird/Bird";
import Flamingo from "../Flamingo/Flamingo";
const { Node2D, print } = godot;

export default class Game extends Node2D {
  @property({ type: godot.VariantType.TYPE_NODE_PATH }) currentFlamingoPath: godot.VariantType.TYPE_NODE_PATH;
  private birds: Bird[];
  private currentFlamingo: Flamingo;
  
  _ready() {
    this.birds = this.get_node("./Birds").get_children() as Bird[];
    // print(this.birds);
    this.currentFlamingo = this.get_node(this.currentFlamingoPath.toString()) as Flamingo;
    this.currentFlamingo.addSubordinates(this.birds);
    print(this.currentFlamingo.subordinateCount);
  }
}