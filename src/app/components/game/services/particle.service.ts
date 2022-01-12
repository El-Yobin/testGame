import {Injectable} from '@angular/core';
import {ParticleSystem} from "../../common/particle-system";
import {GunNames, MeleeNames} from "../../common/constants/guns";
import {Bullet} from "../prefabs/guns/pistol/bullet";
import {SwordSwing} from "../prefabs/melee/sword/sword-swing";

@Injectable({
  providedIn: 'root'
})
export class ParticleService {

  private particleSystems: Record<GunNames | MeleeNames, ParticleSystem<any>> = {
    'Pistol': new ParticleSystem<Bullet>(),
    'MachineGun': new ParticleSystem<Bullet>(),
    'Sword': new ParticleSystem<SwordSwing>(),
    'Hands': new ParticleSystem<any>(),
  };

  constructor() {
  }

  public update(): void {
    Object.values(this.particleSystems).forEach(system => system.run());
  }

  public getSystem(name: GunNames | MeleeNames): ParticleSystem<any> {
    return this.particleSystems[name];
  }
}
