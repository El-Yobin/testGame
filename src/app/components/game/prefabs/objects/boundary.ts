import {Vector} from "p5";
import {RigidBody} from "../../../common/rigidBody";

export class Boundary extends RigidBody {

  constructor(
    public override position: Vector,
    public width: number,
    public height: number,
  ) {
    super();
  }

  public show(): void {
    this.p5.rect(this.position.x, this.position.y, this.width, this.height);
  }
}
