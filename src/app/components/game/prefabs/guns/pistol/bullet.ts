import {Vector} from 'p5';
import {Particle} from '../../../../common/particle-system';
import {RigidBody} from '../../../../common/rigidBody';

export class Bullet extends RigidBody implements Particle {
  private readonly direction: Vector;
  private readonly startPos: Vector;

  constructor(position: Vector, direction: Vector) {
    super();
    this.position = position.copy();
    this.startPos = position.copy();
    this.direction = direction;
    this.applyForce(this.direction);
  }

  isDead(): boolean {
    return this.velocity.mag() < 5;
  }

  show(): void {
    this.p5.fill('rgba(200, 200, 200, 0.6)');
    this.p5.noStroke();
    this.p5.beginShape();
    const leftX = 5 * Math.cos(this.direction.heading() - 45) + this.position.x;
    const leftY = 5 * Math.sin(this.direction.heading() - 45) + this.position.y;
    const rightX =
      5 * Math.cos(this.direction.heading() + 45) + this.position.x;
    const rightY =
      5 * Math.sin(this.direction.heading() + 45) + this.position.y;

    let tailX =
      this.velocity.mag() *
      4 *
      Math.cos(this.direction.copy().mult(-1).heading()) +
      this.position.x;
    let tailY =
      this.velocity.mag() *
      4 *
      Math.sin(this.direction.copy().mult(-1).heading()) +
      this.position.y;

    if (this.p5.createVector(this.position.x, this.position.y).dist(this.startPos) < 50) {
      tailX = this.startPos.x;
      tailY = this.startPos.y;
    }

    this.p5.vertex(leftX, leftY);
    this.p5.vertex(rightX, rightY);
    this.p5.vertex(tailX, tailY);
    this.p5.endShape();
    this.p5.circle(this.position.x, this.position.y, 9);
    this.p5.fill('rgba(255, 255, 255)');
    this.p5.stroke(0);
  }

  update(): void {
    this.applyAirResistance(0.001);
    this.updatePhysics();
  }
}
