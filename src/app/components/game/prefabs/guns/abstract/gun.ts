import {p5InstanceExtensions, Vector} from 'p5';
import {ParticleService} from "../../../services/particle.service";
import {LocatorService} from "../../../services/locator.service";
import {P5InstanceService} from "../../../../common/p5-instance.service";
import {GunConfig} from "../../../../common/constants/guns";


export abstract class Gun {
  public abstract config: GunConfig;
  protected particleService: ParticleService = LocatorService.injector.get(ParticleService)
  protected p5: p5InstanceExtensions = P5InstanceService.p5Instance;

  public abstract shoot(position: Vector, direction: Vector): void;

  public abstract show(): void;

  public abstract update(): void;
}
