import {Vector} from 'p5';
import {Particle} from '../../../../common/particle-system';
import {RigidBody} from '../../../../common/rigidBody';
import {collideLineLine} from "../../../../common/tools/calculations";

export class Bullet extends RigidBody implements Particle {
  private readonly startPos: Vector;
  private dead: boolean = false;

  constructor(position: Vector, direction: Vector) {
    super();
    this.position = position.copy();
    this.startPos = position.copy();
    this.applyForce(direction);
  }

  isDead(): boolean {
    return this.velocity.mag() < 4 || this.dead;
  }

  show(): void {
    this.p5.fill('rgba(200, 200, 200, 0.6)');
    this.p5.noStroke();
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
    this.p5.circle(this.position.x, this.position.y, 9);
    this.p5.fill('rgba(255, 255, 255)');
    this.p5.stroke(0);
  }

  update(): void {
    this.applyAirResistance(0.01);
    this.updatePhysics();
    this.checkCollision();
  }

  private checkCollision(): void {
    const collision = collideLineLine(
      this.position.x,
      this.position.y,
      this.position.x + this.velocity.x,
      this.position.y + this.velocity.y,
      500,
      0,
      500,
      1000,
    )
    if (collision.intersect) {
      const angle = this.velocity.angleBetween(this.p5.createVector(0, 1));
      const newDir = Vector.fromAngle(angle + this.p5.HALF_PI);
      const distance = Vector.dist(this.velocity.copy().normalize(), newDir.normalize());
      if (distance > 1) {
        this.dead = true;
        this.p5.fill('#FF0000');
      } else {
        this.p5.fill('#00FF00');
        this.velocity.set(newDir.setMag(this.velocity.mag() * 0.8))
      }
      this.p5.circle(collision.x, collision.y, 30)
      this.p5.fill('');
    }
  }
}
