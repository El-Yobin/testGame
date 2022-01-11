import {Melee} from "./abstract/melee";
import {Vector} from "p5";
import {ParticleSystem} from "../../../common/particle-system";
import {SwordSwing} from "../particles/sword-swing";
import {SwordSprite} from "./swordSprite";
import {MELEE, MeleeConfig} from "../../../common/constants/guns";

export class Sword extends Melee {
  public config: MeleeConfig = MELEE.Sword;
  private particleSystem!: ParticleSystem<SwordSwing>;
  private animationSprite!: SwordSprite;
  private coolDown: boolean = false;


  constructor() {
    super();
    this.loadAssets();
  }

  public shoot(position: Vector, direction: Vector): void {
    this.debouncedShooting(position, direction);
  }

  public update(): void {

  }

  public show(): void {

  }


  private emitSwing(position: Vector, direction: Vector): void {
    const angle = Math.atan2(direction.y, direction.x) + this.p5.radians(0)
    const offset = this.p5.createVector(Math.cos(angle) * this.config.offsetDistance, Math.sin(angle) * this.config.offsetDistance)
    this.particleSystem.emit(new SwordSwing(position, direction, offset, this.animationSprite))
  }

  private debouncedShooting(position: Vector, direction: Vector): void {
    if (this.coolDown) return;
    this.coolDown = true;
    this.emitSwing(position, direction);
    setTimeout(() => {
      this.coolDown = false;
    }, this.config.fireRate)
  }

  private loadAssets(): void {
    this.particleSystem = this.particleService.getSystem(this.config.name);
    this.animationSprite = new SwordSprite(this.assetsService.getAnimation(this.config.assetName), this.config.fireRate / 5000);
  }
}
