import {Melee} from "./abstract/melee";
import {InventorySlot} from "../../controller/inventory";
import {FireMode, MELEE, MeleeNames} from "../../../common/constants/guns";
import {Vector} from "p5";
import {ParticleSystem} from "../../../common/particle-system";
import {SwordSwing} from "../particles/sword-swing";
import {SwordSprite} from "./swordSprite";

export class Sword extends Melee {
  equipped: boolean = false;
  name: MeleeNames = MELEE.Sword.name;
  assetName: string = MELEE.Sword.assetName;
  fireMode: FireMode = MELEE.Sword.fireMode;
  fireRate: number = MELEE.Sword.fireRate;
  imageUrl: string = MELEE.Sword.imageUrl;
  inventorySlot: InventorySlot = MELEE.Sword.inventorySlot;
  private particleSystem!: ParticleSystem<SwordSwing>;
  private animationSprite!: SwordSprite;
  private coolDown: boolean = false;


  constructor() {
    super();
    this.loadAssets();
  }

  public shoot(position: Vector, direction: Vector, offset: Vector): void {
    this.debouncedShooting(position, direction, offset);
  }

  public update(): void {

  }

  public show(): void {

  }


  private emitSwing(position: Vector, direction: Vector, offset: Vector): void {
    this.particleSystem.emit(new SwordSwing(position, direction, offset, this.animationSprite))
  }

  private debouncedShooting(position: Vector, direction: Vector, offset: Vector): void {
    if (this.coolDown) return;
    this.coolDown = true;
    this.emitSwing(position, direction, offset);
    setTimeout(() => {
      this.coolDown = false;
    }, this.fireRate)
  }

  private loadAssets(): void {
    this.particleSystem = this.particleService.getSystem(this.name);
    this.animationSprite = new SwordSprite(this.assetsService.getAnimation(this.assetName), this.fireRate / 5000);
  }
}
