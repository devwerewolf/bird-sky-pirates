const { Node2D } = godot;

export default class WalletManager extends Node2D {
  static gold: number = 0;
  
  public static addGold(amount: number) {
    WalletManager.gold += amount;
    godot.print(WalletManager.gold);
  }
  
  public static subtractGold(amount: number) {
    WalletManager.gold -= amount;
  }
}