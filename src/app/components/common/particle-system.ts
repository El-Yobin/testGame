import {Queue} from './tools/queue';

export class ParticleSystem<T extends Particle> {
  private queue: Queue<T>;

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

export interface Particle {
  update: () => void;
  show: () => void;
  isDead: () => boolean;
}
