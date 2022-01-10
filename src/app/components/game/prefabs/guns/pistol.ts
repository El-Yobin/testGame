import {Gun} from './abstract/gun';
import {ParticleSystem} from '../../../common/particle-system';
import {Bullet} from '../particles/bullet';
import {Vector} from 'p5';
import {InventorySlot} from '../../controller/inventory';
import {GunNames, GUNS} from '../../../common/constants/guns';

export class Pistol extends Gun {
  public readonly name: GunNames = GUNS.Pistol.name;
  public readonly imageUrl: string = GUNS.Pistol.imageUrl;
  public readonly inventorySlot: InventorySlot = GUNS.Pistol.inventorySlot;
  public readonly shotVelocity = GUNS.Pistol.shotVelocity;
  public readonly fireMode = GUNS.Pistol.fireMode;
  public readonly fireRate = GUNS.Pistol.fireRate;
  public equipped: boolean = false;
  public spread: number = GUNS.Pistol.spread;
  public bullets: ParticleSystem<Bullet>;
  private coolDown: boolean = false;

  constructor() {
    super();
    this.bullets = this.particleService.getSystem(this.name);
  }

  public shoot(position: Vector, direction: Vector, offset: Vector): void {
    this.debouncedShooting(position.copy().add(offset), direction);
  }

  public update(): void {
  }

  public show(): void {
    this.p5.rect(-5, 20, 10, 20);
  }

  private emitBullet(position: Vector, direction: Vector): void {
    this.bullets.emit(
      new Bullet(position, direction.setMag(this.shotVelocity).add((Math.random() * this.spread - (this.spread / 2)), (Math.random() * this.spread - (this.spread / 2))).setMag(this.shotVelocity))
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
