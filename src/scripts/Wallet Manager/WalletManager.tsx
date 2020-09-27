const { Node2D } = godot;

export default class WalletManager extends Node2D {
  static gold = 0;
  
  static addGold(amount: number) {
    WalletManager.gold += amount;
  }
  
  static subtractGold(amount: number) {
    WalletManager.gold -= amount;
  }
}