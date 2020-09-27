import { property } from "../../../decorators";
import Bat from "../Bat/Bat";
import WalletManager from "../Wallet Manager/WalletManager";

const { Area2D } = godot;

export default class Gold extends Area2D {
  @property({ default: 0 }) amount: number;
  
  _ready() {
    this.connect(Area2D.body_entered, this, "checkBatAttract");
    this.connect(Area2D.body_exited, this, "checkBatRevoke");
  }
  
  checkBatAttract(body: godot.PhysicsBody2D) {
    if (body instanceof Bat) {
      (body as Bat).goldSenseAttract(this);
    }
  }
  
  checkBatRevoke(body: godot.PhysicsBody2D) {
    if (body instanceof Bat) {
      (body as Bat).goldSenseRevoke();
    }
  }
  
  public collect() {
    // WalletManager.addGold(this.amount);
    
    WalletManager.addGold(this.amount);
    this.queue_free();
  }
}