import {Gun} from '../abstract/gun';
import {ParticleSystem} from '../../../../common/particle-system';
import {Bullet} from './bullet';
import {Vector} from 'p5';
import {GunConfig, GUNS} from '../../../../common/constants/guns';

export class Pistol extends Gun {
  public config: GunConfig = GUNS.Pistol;
  public bullets: ParticleSystem<Bullet>;
  private coolDown: boolean = false;

  constructor() {
    super();
    this.bullets = this.particleService.getSystem(this.config.name);
  }

  public shoot(position: Vector, direction: Vector): void {
    this.debouncedShooting(position, direction);
  }

  public update(): void {
  }

  public show(): void {
    this.p5.rect(-5, 20, 10, 20);
  }

  private emitBullet(position: Vector, direction: Vector): void {
    const angle = Math.atan2(direction.y, direction.x) + this.p5.radians(0)
    const offset = this.p5.createVector(Math.cos(angle) * this.config.offsetDistance, Math.sin(angle) * this.config.offsetDistance)
    this.bullets.emit(
      new Bullet(
        position.copy().add(offset),
        direction.setMag(this.config.shotVelocity)
          .add(
            (Math.random() * this.config.spread - (this.config.spread / 2)),
            (Math.random() * this.config.spread - (this.config.spread / 2)))
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
