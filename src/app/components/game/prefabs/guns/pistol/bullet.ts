import {Vector} from 'p5';
import {Particle} from '../../../../common/particle-system';
import {RigidBody} from '../../../../common/rigidBody';
import {LineRectCollision} from "../../../../common/tools/calculations";

export class Bullet extends RigidBody implements Particle {
  private readonly startPos: Vector;
  private dead: boolean = false;
  private showTrail: boolean = false;

  constructor(position: Vector, direction: Vector) {
    super();
    this.position = position.copy();
    this.startPos = position.copy();
    this.applyForce(direction);
    this.delayTrail();
  }

  isDead(): boolean {
    return this.velocity.mag() < 4 || this.dead;
  }

  show(): void {
    this.p5.fill('rgba(200, 200, 200, 0.6)');
    this.p5.noStroke();
    if (this.showTrail) {
      this.p5.beginShape();
      const leftX = 5 * Math.cos(this.velocity.heading() - 45) + this.position.x;
      const leftY = 5 * Math.sin(this.velocity.heading() - 45) + this.position.y;
      const rightX =
        5 * Math.cos(this.velocity.heading() + 45) + this.position.x;
      const rightY =
        5 * Math.sin(this.velocity.heading() + 45) + this.position.y;

      let tailX =
        this.velocity.mag() *
        4 *
        Math.cos(this.velocity.copy().mult(-1).heading()) +
        this.position.x;
      let tailY =
        this.velocity.mag() *
        4 *
        Math.sin(this.velocity.copy().mult(-1).heading()) +
        this.position.y;

      this.p5.vertex(leftX, leftY);
      this.p5.vertex(rightX, rightY);
      this.p5.vertex(tailX, tailY);
      this.p5.endShape();
    }
    this.p5.circle(this.position.x, this.position.y, 9);
    this.p5.fill('rgba(255, 255, 255)');
    this.p5.stroke(0);
  }

  update(): void {
    this.applyAirResistance(0.01);
    this.updatePhysics();
  }

  public resolveCollision(collision: LineRectCollision): void {
    collision.intersections.forEach(intersection => {
      this.die();
      this.p5.fill('#FF0000');
      this.p5.circle(intersection.x, intersection.y, 30)
      this.p5.fill('');
      this.delayTrail();
    })
    // r=d−2(d⋅n)n
    // where d⋅n is the dot product, and n must be normalized.
  }

  private die(): void {
    this.dead = true;
  }

  private delayTrail(): void {
    this.showTrail = false;
    setTimeout(() => this.showTrail = true, 50)
  }
}
