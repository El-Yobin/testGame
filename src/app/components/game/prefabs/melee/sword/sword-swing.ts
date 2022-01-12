import {Particle} from "../../../../common/particle-system";
import {Vector} from "p5";
import {RigidBody} from "../../../../common/rigidBody";
import {AnimationSprite} from "../../../../common/sprite/animation-sprite";

export class SwordSwing extends RigidBody implements Particle {

  constructor(
    public override position: Vector,
    private direction: Vector,
    private offset: Vector,
    private sprite: AnimationSprite) {
    super();
  }

  isDead(): boolean {
    if (Math.floor(this.sprite.index) >= this.sprite.animation.length) {
      this.sprite.reset();
      return true;
    }
    return false;
  }

  show(): void {
    this.sprite.show(this.position, this.direction, this.offset);
  }

  update(): void {
    this.sprite.update();
  }

}
