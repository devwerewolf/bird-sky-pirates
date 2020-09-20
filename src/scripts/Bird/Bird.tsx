import { property, signal } from "../../../decorators";
const { KinematicBody2D, Vector2 } = godot;

type BirdStateSignals = {
  [S in BirdState]: string
}

type BirdStateFunctions = {
  [S in BirdState]: Function
}

export enum BirdState {
  Idle,
  Move,
  Special,
}

export default class Bird extends KinematicBody2D {
  @property({ default: BirdState.Idle }) birdState: BirdState;
  @property({ default: Vector2.ZERO }) target: godot.Vector2;
  @property({ default: 100 }) speed: number;
  @property({ default: 1 }) moveMargin: number;
  @signal static readonly OnIdle: string;
  @signal static readonly OnMove: string;
  @signal static readonly OnSpecial: string;
  
  private birdStateSignals: BirdStateSignals;
  private birdStateFunctions: BirdStateFunctions;
  
  constructor() {
    super();
  }
  
  _ready() {
    this.birdStateSignals = {
      [BirdState.Idle]: Bird.OnIdle,
      [BirdState.Move]: Bird.OnMove,
      [BirdState.Special]: Bird.OnSpecial
    };
    
    this.birdStateFunctions = {
      [BirdState.Idle]: () => this.idle(),
      [BirdState.Move]: () => this.move(),
      [BirdState.Special]: () => this.special()
    }
  }
  
  _physics_process(fixedDelta: number) {
    this.birdStateFunctions[this.birdState]();
  }
  
  public changeState(birdState: BirdState) {
    this.birdState = birdState;
    this.emit_signal(this.birdStateSignals[this.birdState], this.get_path());
  }
  
  public setTarget(target: godot.Vector2) {
    this.target = target;
  }
  
  protected idle() {
    // godot.print("IDLE")
  }
  
  protected move() {
    // Move toward the target
    //@ts-ignore
    let velocity: godot.Vector2 = this.position.direction_to(this.target) * this.speed;
    
    this.move_and_slide(velocity);
    
    // [DONE MOVING]
    if (this.positionIsWithinMargin()) {
      this.position = this.target;
      this.changeState(BirdState.Idle);
    }
  }
  
  protected special() {}
  
  private positionIsWithinMargin(): boolean {
    const distanceFromTarget = this.position.distance_to(this.target);
    return distanceFromTarget <= this.moveMargin;
  }
}