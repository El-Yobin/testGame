import { p5InstanceExtensions, Vector } from 'p5';
import { P5InstanceService } from './p5-instance.service';

export abstract class RigidBody {
  public mass = 1;
  public position: Vector;
  public acceleration: Vector;
  public velocity: Vector;
  protected p5: p5InstanceExtensions = P5InstanceService.p5Instance;

  protected constructor() {
    this.acceleration = this.p5.createVector(0, 0);
    this.velocity = this.p5.createVector(0, 0);
    this.position = this.p5.createVector(0, 0);
  }

  public abstract show(): void;

  public constrainPosition(low: number, high: number): void {
    this.position.x = this.p5.constrain(this.position.x, low, high);
    this.position.y = this.p5.constrain(this.position.y, low, high);
  }

  public updatePhysics(): void {
    this.applyAcceleration();
    this.resetAcceleration();
  }

  public applyForce(force: Vector): void {
    this.acceleration.add(force.div(this.mass));
  }

  public applyAirResistance(dragCoefficient: number): void {
    const speed = this.velocity.mag();
    const dragForce = this.velocity.copy().normalize();
    dragForce.mult(-dragCoefficient * speed * speed);
    this.applyForce(dragForce);
  }

  public applyFriction(frictionCoefficient: number): void {
    const friction = this.velocity
      .copy()
      .normalize()
      .mult(-frictionCoefficient);
    this.applyForce(friction);
  }

  private applyAcceleration(): void {
    this.position = this.position.add(this.velocity.add(this.acceleration));
  }

  private resetAcceleration(): void {
    this.acceleration.mult(0);
  }
}
