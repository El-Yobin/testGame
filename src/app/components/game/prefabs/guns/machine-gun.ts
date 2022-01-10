import {Gun} from './abstract/gun';
import {Bullet} from '../particles/bullet';
import {Vector} from 'p5';
import {GUNS} from '../../../common/constants/guns';

export class MachineGun extends Gun {
  public readonly name = GUNS.MachineGun.name;
  public readonly fireMode = GUNS.MachineGun.fireMode;
  public readonly imageUrl = GUNS.MachineGun.imageUrl;
  public readonly inventorySlot = GUNS.MachineGun.inventorySlot;
  public readonly shotVelocity = GUNS.MachineGun.shotVelocity;
  public readonly fireRate = GUNS.MachineGun.fireRate;
  public equipped = false;
  public spread = GUNS.MachineGun.spread;
  public bullets;

  private coolDown: boolean = false;

  constructor() {
    super();
    this.bullets = this.particleService.getSystem(this.name);
  }

  public shoot(position: Vector, direction: Vector, offset: Vector): void {
    if (this.spread < 10) {
      this.spread += 0.2;
    }

    this.debouncedShooting(position.copy().add(offset), direction)
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
    this.bullets.emit(
      new Bullet(position.copy(), direction.setMag(this.shotVelocity).add((Math.random() - 0.5) * this.spread, (Math.random() - 0.5) * this.spread).setMag(this.shotVelocity))
    );
  }

  private debouncedShooting(position: Vector, direction: Vector): void {
    if (this.coolDown) return;
    this.coolDown = true;
    this.emitBullet(position, direction);
    setTimeout(() => {
      this.coolDown = false;
    }, this.fireRate)
  }
}
