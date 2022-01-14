import {Injectable} from '@angular/core';
import {BulletSystem} from "../../common/particle-system";
import {GunNames, MeleeNames} from "../../common/constants/guns";
import {Bullet} from "../prefabs/guns/pistol/bullet";
import {SwordSwing} from "../prefabs/melee/sword/sword-swing";

@Injectable({
  providedIn: 'root'
})
export class ParticleService {

  private particleSystems: Record<GunNames | MeleeNames, BulletSystem<any>> = {
    'Pistol': new BulletSystem<Bullet>(),
    'MachineGun': new BulletSystem<Bullet>(),
    'Sword': new BulletSystem<SwordSwing>(),
    'Hands': new BulletSystem<any>(),
  };

  constructor() {
  }

  public update(): void {
    Object.values(this.particleSystems).forEach(system => system.run());
  }

  public getSystem(name: GunNames | MeleeNames): BulletSystem<any> {
    return this.particleSystems[name];
  }
}
