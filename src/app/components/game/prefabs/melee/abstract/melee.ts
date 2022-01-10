import {FireMode, MeleeConfig, MeleeNames} from "../../../../common/constants/guns";
import {InventorySlot} from "../../../controller/inventory";
import {p5InstanceExtensions, Vector} from "p5";
import {P5InstanceService} from "../../../../common/p5-instance.service";
import {AssetsService} from "../../../services/assets.service";
import {LocatorService} from "../../../services/locator.service";
import {ParticleService} from "../../../services/particle.service";

export abstract class Melee implements MeleeConfig {
  abstract name: MeleeNames;
  abstract assetName: string;
  abstract fireMode: FireMode;
  abstract fireRate: number;
  abstract imageUrl: string;
  abstract inventorySlot: InventorySlot;
  abstract equipped: boolean;
  protected p5: p5InstanceExtensions = P5InstanceService.p5Instance;
  protected assetsService: AssetsService = LocatorService.injector.get(AssetsService);
  protected particleService: ParticleService = LocatorService.injector.get(ParticleService)

  abstract shoot(position: Vector, direction: Vector, offset: Vector): void;

  public abstract show(): void;

  abstract update(): void;
}
