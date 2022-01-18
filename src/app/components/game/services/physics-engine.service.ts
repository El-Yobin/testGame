import {Injectable} from '@angular/core';
import {Boundary} from "../prefabs/objects/boundary";
import {ParticleService} from "./particle.service";
import {BulletSystem} from "../../common/particle-system";
import {collideLineRect, LineRectCollision} from "../../common/tools/calculations";

@Injectable({
  providedIn: 'root'
})
export class PhysicsEngineService {
  public objects: Boundary[] = [];
  private systems: BulletSystem<any>[] = [];

  constructor(
    private particles: ParticleService,
  ) {
    this.getParticleSystems();
  }

  public update(): void {
    this.systems.forEach(system => {
      system.bullets.forEach(bullet => {
        this.objects.forEach(object => {
          const collision: LineRectCollision = collideLineRect(
            bullet.position.x,
            bullet.position.y,
            bullet.position.x + bullet.velocity.x,
            bullet.position.y + bullet.velocity.y,
            object.position.x,
            object.position.y,
            object.width,
            object.height,
          )
          if (collision.intersect) {
            bullet.resolveCollision(collision);
          }
        })
      })
    })
  }

  public addObjects(objects: Boundary[]): void {
    this.objects.push(...objects);
  }

  private getParticleSystems(): void {
    this.systems.push(
      this.particles.getSystem('MachineGun'),
      this.particles.getSystem('Pistol')
    )
  }
}
