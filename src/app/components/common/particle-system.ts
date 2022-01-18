import {Queue} from './tools/queue';

export class ParticleSystem<T extends Particle> implements IParticleSystem<T> {
  public queue: Queue<T>;

  constructor() {
    this.queue = new Queue();
  }

  public emit(particle: T): void {
    this.queue.add(particle);
  }

  public run(): void {
    this.queue.getAllAsArray().forEach((particle) => {
      particle.update();
      particle.show();
      if (particle.isDead()) {
        this.queue.get();
      }
    });
  }
}

export class BulletSystem<T extends Particle> implements IParticleSystem<T> {
  public bullets: Array<T> = [];

  emit(particle: T): void {
    this.bullets.push(particle);
  }

  run(): void {
    this.bullets.forEach(particle => {
      particle.update();
      particle.show();
      if (particle.isDead()) {
        this.bullets = this.bullets.filter(curr => curr !== particle);
      }
    })
  }
}

export interface Particle {
  update: () => void;
  show: () => void;
  isDead: () => boolean;
}

export interface IParticleSystem<T> {
  emit(particle: T): void;

  run(): void;
}
