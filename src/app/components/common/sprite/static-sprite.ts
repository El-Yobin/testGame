import {Sprite} from "./abstract/sprite";
import {Vector} from "p5";
import {ImageAsset} from "../../game/services/assets.service";

export class StaticSprite extends Sprite {

  constructor(private asset: ImageAsset) {
    super();
  }

  show(position: Vector, direction: Vector = this.p5.createVector(0, 0), offset: Vector = this.p5.createVector(0, 0)): void {
    const angle = Math.atan2(direction.y, direction.x) + this.p5.HALF_PI;
    this.p5.push()
    this.p5.translate(position.x + offset.x, position.y + offset.y)
    this.p5.rotate(angle)
    this.p5.image(
      this.asset.image,
      0,
      0,
      this.asset.image.width,
      this.asset.image.height,
    );
    this.p5.pop();
  }
}
