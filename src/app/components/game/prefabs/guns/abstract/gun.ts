import {p5InstanceExtensions, Vector} from 'p5';
import {ParticleService} from "../../../services/particle.service";
import {LocatorService} from "../../../services/locator.service";
import {P5InstanceService} from "../../../services/p5-instance.service";
import {GunConfig} from "../../../../common/constants/guns";
import {ParticleSystem} from "../../../../common/particle-system";


export abstract class Gun {
  public abstract config: GunConfig;
  public abstract bullets: ParticleSystem<any>
  protected particleService: ParticleService = LocatorService.injector.get(ParticleService)
  protected p5: p5InstanceExtensions = P5InstanceService.p5Instance;

  public abstract shoot(position: Vector, direction: Vector): void;

  public abstract show(): void;

  public abstract update(): void;
}
