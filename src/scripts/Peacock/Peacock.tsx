import Bird, { BirdState } from "../Bird/Bird";
const { print } = godot;

export default class Peacock extends Bird {
  influenceArea: godot.Area2D;
  
  _ready() {
    this.influenceArea = this.get_node("./Influence Area") as godot.Area2D;
  }
  
  special() {
    let bodies = this.influenceArea.get_overlapping_bodies() as godot.PhysicsBody2D[];
    
    bodies.forEach((body) => {
      const bird = body as Bird;
      
      if (this !== bird) {
        bird.setTarget(this.position);
        bird.changeState(BirdState.Move);
      }
    });
    
    this.changeState(BirdState.Idle);
  }
}