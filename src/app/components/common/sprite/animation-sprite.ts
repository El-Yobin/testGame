import {Sprite} from "./abstract/sprite";
import {Image, Vector} from "p5";
import {AnimationAsset} from "../../game/services/assets.service";
import {splitSpriteSheet} from "../tools/functions";
import {P5InstanceService} from "../../game/services/p5-instance.service";

export class AnimationSprite extends Sprite {
  public animation: Image[] = [];
  public index: number = 0;

  constructor(
    private asset: AnimationAsset,
    private speed: number,
  ) {
    super();
    this.animation = splitSpriteSheet(this.asset);
  }

  show(position: Vector, direction: Vector = this.p5.createVector(0, 0), offset: Vector = this.p5.createVector(0, 0)): void {
    const floorIndex = Math.floor(this.index);
    if (floorIndex < this.animation.length) {
      const angle = Math.atan2(direction.y, direction.x) + this.p5.HALF_PI
      this.p5.push();
      this.p5.translate(position.x + offset.x, position.y + offset.y)
      this.p5.rotate(angle)
      this.p5.image(
        this.animation[floorIndex],
        -this.asset.json.frames[floorIndex].pivot.x,
        -this.asset.json.frames[floorIndex].pivot.y,
        this.animation[floorIndex].width,
        this.animation[floorIndex].height
      );
      this.p5.pop();
    }
  }

  public update(): void {
    this.index += this.speed * P5InstanceService.delta;
  }

  public reset(index: number = 0): void {
    this.index = index;
  }

}
