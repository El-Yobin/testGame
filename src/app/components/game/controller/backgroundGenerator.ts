import { Vector, Image } from 'p5';
import { P5InstanceService } from '../../common/p5-instance.service';

export class BackgroundGenerator {
  private p5 = P5InstanceService.p5Instance;
  private chunks: Image[][] = [];
  private imageHeight: number = 500;
  private imageWidth: number = 500;

  constructor() {}

  public generateChunks(backgroundImage: Image): void {
    for (let i = 0; i < 10; i++) {
      this.chunks.push([backgroundImage]);
      for (let n = 1; n < 10; n++) {
        this.chunks[i].push(backgroundImage);
      }
    }
  }

  public update(position: Vector): void {
    this.p5.background('#000000');
    const x = Math.floor(-position.x / this.imageWidth);
    const y = Math.floor(-position.y / this.imageHeight);

    this.drawBackground(x, y);
  }

  private drawBackground(x: number, y: number): void {
    for (let i = -1; i <= 1; i++) {
      for (let n = -1; n <= 1; n++) {
        if (this.chunks[x + i] && this.chunks[x + i][y + n]) {
          this.p5.image(
            this.chunks[x + i][y + n],
            (x + i) * this.imageWidth,
            (y + n) * this.imageHeight,
            this.imageWidth,
            this.imageHeight
          );
        } else {
          this.p5.square(
            (x + i) * this.imageWidth,
            (y + n) * this.imageHeight,
            this.imageHeight
          );
        }
      }
    }
  }
}
