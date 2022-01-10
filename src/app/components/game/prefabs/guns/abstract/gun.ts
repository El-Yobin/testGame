import {p5InstanceExtensions, Vector} from 'p5';
import {ParticleSystem} from '../../../../common/particle-system';
import {Bullet} from '../../particles/bullet';
import {InventorySlot} from '../../../controller/inventory';
import {FireMode, GunConfig, GunNames} from "../../../../common/constants/guns";
import {ParticleService} from "../../../services/particle.service";
import {LocatorService} from "../../../services/locator.service";
import {P5InstanceService} from "../../../../common/p5-instance.service";


export abstract class Gun implements GunConfig {
  public abstract name: GunNames;
  public abstract fireMode: FireMode;
  public abstract shotVelocity: number;
  public abstract imageUrl: string;
  public abstract inventorySlot: InventorySlot;
  public abstract fireRate: number;
  public abstract spread: number;
  public abstract equipped: boolean;
  protected abstract bullets: ParticleSystem<Bullet>;
  protected particleService: ParticleService = LocatorService.injector.get(ParticleService)
  protected p5: p5InstanceExtensions = P5InstanceService.p5Instance;

  public abstract shoot(position: Vector, direction: Vector, offset?: Vector): void;

  public abstract show(): void;

  public abstract update(): void;
}
