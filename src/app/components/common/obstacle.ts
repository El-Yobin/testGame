import {RigidBody} from "./rigidBody";

export class Obstacle extends RigidBody {
  constructor() {
    super();
  }

  public show(): void {
    this.p5.fill('#444444')
    this.p5.rect(500, 500, 500, 500);
    this.p5.fill('')
  }
}
