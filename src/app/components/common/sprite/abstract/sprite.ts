import {p5InstanceExtensions, Vector} from "p5";
import {P5InstanceService} from "../../../game/services/p5-instance.service";

export abstract class Sprite {
  protected p5: p5InstanceExtensions = P5InstanceService.p5Instance;

  public abstract show(position: Vector, direction: Vector, offset?: Vector): void;
}
