import {RigidBody} from "../../../common/rigidBody";
import {BoundaryData, BoundaryType} from "../../../common/constants/assets";

export class Boundary extends RigidBody {
  public type: BoundaryType;

  constructor(
    public config: BoundaryData,
  ) {
    super();
    this.type = config.type;
    this.position.set(config.x, config.y);
  }

  public show(): void {
    this.p5.rect(this.position.x, this.position.y, this.config.w, this.config.h);
  }
}
