import {p5InstanceExtensions, Vector} from "p5";
import {P5InstanceService} from "../../../services/p5-instance.service";
import {AssetsService} from "../../../services/assets.service";
import {LocatorService} from "../../../services/locator.service";
import {ParticleService} from "../../../services/particle.service";
import {MeleeConfig} from "../../../../common/constants/guns";

export abstract class Melee {
  public abstract config: MeleeConfig;
  protected p5: p5InstanceExtensions = P5InstanceService.p5Instance;
  protected assetsService: AssetsService = LocatorService.injector.get(AssetsService);
  protected particleService: ParticleService = LocatorService.injector.get(ParticleService)

  abstract shoot(position: Vector, direction: Vector): void;

  public abstract show(): void;

  abstract update(): void;
}
