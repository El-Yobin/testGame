import {Image, p5InstanceExtensions, Vector} from "p5";
import {P5InstanceService} from "../../../common/p5-instance.service";
import {AnimationAsset} from "../../services/assets.service";

export class SwordSprite {
  public animation: Image[] = [];
  public index: number = 0;
  private p5: p5InstanceExtensions = P5InstanceService.p5Instance;

  constructor(
    private asset: AnimationAsset,
    private speed: number,
  ) {
    this.splitSpriteSheet();
  }

  public show(position: Vector, direction: Vector, offset: { x: number; y: number } = {x: 0, y: 0}): void {
    const floorIndex = Math.floor(this.index);
    if (floorIndex < this.animation.length) {
      const angle = Math.atan2(direction.y, direction.x) + this.p5.radians(90)
      this.p5.push();
      this.p5.translate(position.x + offset.x, position.y + offset.y)
      this.p5.rotate(angle)
      this.p5.image(
        this.animation[floorIndex],
        -this.asset.json.frames[floorIndex].pivot.x,
        -this.asset.json.frames[floorIndex].pivot.y,
        100,
        100
      );
      this.p5.pop();
    }
  }

  public update(): void {
    this.index += this.speed;
  }

  public reset(): void {
    this.index = 0;
  }

  private splitSpriteSheet(): void {
    this.asset.json.frames.forEach(frame => {
      const image = this.asset.spriteSheet.get(frame.frame.x, frame.frame.y, frame.frame.w, frame.frame.h);
      this.animation.push(image);
    })
  }
}
