import {Injectable} from '@angular/core';
import {Boundary} from "../prefabs/objects/boundary";
import {ParticleService} from "./particle.service";
import {BulletSystem} from "../../common/particle-system";
import {
  collideLineRect,
  collideRectCircle,
  LineRectCollision,
  RectCircleCollision
} from "../../common/tools/calculations";
import {Player} from "../prefabs/characters/player";
import {Bullet} from "../prefabs/guns/pistol/bullet";

@Injectable({
  providedIn: 'root'
})
export class PhysicsEngineService {
  public objects: Boundary[] = [];
  private systems: BulletSystem<any>[] = [];
  private player!: Player;

  constructor(
    private particles: ParticleService,
  ) {
    this.getParticleSystems();
  }

  public update(): void {
    this.objects.forEach(object => {
      this.checkPlayerCollision(object);
      this.systems.forEach(system => {
        system.bullets.forEach(bullet => {
          this.checkBulletCollision(object, bullet);
        })
      })
    })
  }

  public addObjects(objects: Boundary[]): void {
    this.objects.push(...objects);
  }

  public addPlayer(player: Player): void {
    this.player = player;
  }

  private getParticleSystems(): void {
    this.systems.push(
      this.particles.getSystem('MachineGun'),
      this.particles.getSystem('Pistol')
    )
  }

  private checkPlayerCollision(object: Boundary): void {
    if (this.player) {
      if (object.type === 'rect') {
        const collision: RectCircleCollision = collideRectCircle(
          object.position.x,
          object.position.y,
          object.config.w,
          object.config.h,
          this.player.position.x,
          this.player.position.y,
          this.player.diameter,
        )

        if (collision.intersect) {
          this.player.resolveCollision(collision);
        }
      }
    }
  }

  private checkBulletCollision(object: Boundary, bullet: Bullet): void {
    if (object.type === 'rect') {
      const collision: LineRectCollision = collideLineRect(
        bullet.position.x,
        bullet.position.y,
        bullet.position.x + bullet.velocity.x,
        bullet.position.y + bullet.velocity.y,
        object.position.x,
        object.position.y,
        object.config.w,
        object.config.h,
      )
      if (collision.intersect) {
        bullet.resolveCollision(collision);
      }
    }
  }
}
