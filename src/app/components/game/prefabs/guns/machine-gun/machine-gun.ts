import {Gun} from '../abstract/gun';
import {Bullet} from '../pistol/bullet';
import {Vector} from 'p5';
import {GunConfig, GUNS} from '../../../../common/constants/guns';
import {BulletSystem} from "../../../../common/particle-system";

export class MachineGun extends Gun {
  public config: GunConfig = GUNS.MachineGun;
  public bullets: BulletSystem<Bullet>;
  private spread: number = GUNS.MachineGun.spread;

  private coolDown: boolean = false;

  constructor() {
    super();
    this.bullets = this.particleService.getSystem(this.config.name);
  }

  public shoot(position: Vector, direction: Vector): void {
    if (this.spread < 10) {
      this.spread += 0.2;
    }

    this.debouncedShooting(position, direction)
  }


  public update(): void {
    if (this.spread > GUNS.MachineGun.spread && !this.coolDown) {
      this.spread -= 0.2;
      return;
    }
  }

  public show(): void {
    this.p5.rect(-6, 20, 12, 50);
  }

  private emitBullet(position: Vector, direction: Vector): void {
    const angle = Math.atan2(direction.y, direction.x) + this.p5.radians(0)
    const offset = this.p5.createVector(Math.cos(angle) * this.config.offsetDistance, Math.sin(angle) * this.config.offsetDistance)
    this.bullets.emit(
      new Bullet(
        position.copy().add(offset),
        direction.setMag(this.config.shotVelocity)
          .add(
            (Math.random() - 0.5) * this.spread,
            (Math.random() - 0.5) * this.spread)
          .setMag(this.config.shotVelocity))
    );
  }

  private debouncedShooting(position: Vector, direction: Vector): void {
    if (this.coolDown) return;
    this.coolDown = true;
    this.emitBullet(position, direction);
    setTimeout(() => {
      this.coolDown = false;
    }, this.config.fireRate)
  }
}
