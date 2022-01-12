import {Melee} from "../abstract/melee";
import {MELEE, MeleeConfig} from "../../../../common/constants/guns";
import {Vector} from "p5";

export class Hands extends Melee {
  public config: MeleeConfig = MELEE.Hands;

  shoot(position: Vector, direction: Vector): void {
  }

  show(): void {
  }

  update(): void {
  }
}
