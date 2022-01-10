import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {P5JSInvoker} from './services/p5JSInvoker';
import {p5InstanceExtensions} from 'p5';
import {P5InstanceService} from '../common/p5-instance.service';
import {Player} from './prefabs/player';
import {Camera} from './controller/camera';
import {BackgroundGenerator} from './controller/backgroundGenerator';
import {ParticleService} from "./services/particle.service";
import {AssetsService} from "./services/assets.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent extends P5JSInvoker implements AfterViewInit {
  public player!: Player;
  @ViewChild('container') private container!: ElementRef;
  private p5!: p5InstanceExtensions;
  private p5Canvas: any;
  private camera!: Camera;
  private backgroundGenerator!: BackgroundGenerator;

  constructor(
    private particlesService: ParticleService,
    private assetsService: AssetsService
  ) {
    super();
  }

  public ngAfterViewInit(): void {
    this.startP5JS(this.container.nativeElement);
  }

  public preload(p5: p5InstanceExtensions): void {
    this.p5 = P5InstanceService.p5Instance = p5;
    this.assetsService.loadAssets(p5);
  }

  public setup(p5: p5InstanceExtensions): void {
    this.createBackground();
    this.createCanvas();
    this.createCamera();
    this.createPlayer();
  }

  public draw(p5: p5InstanceExtensions): void {
    this.updateCanvas();
    this.updateParticles();
    this.updatePlayer();
  }

  private createCanvas(): void {
    this.p5Canvas = this.p5.createCanvas(
      this.container.nativeElement.offsetWidth,
      this.container.nativeElement.offsetHeight,
    );
  }

  private createPlayer(): void {
    this.player = new Player();
  }

  private createCamera(): void {
    this.camera = new Camera();
  }

  private createBackground(): void {
    this.backgroundGenerator = new BackgroundGenerator();
    this.backgroundGenerator.generateChunks(this.assetsService.getImage('background').image);
  }

  private updateCanvas(): void {
    this.updateCamera();
    this.updateBackground();
  }

  private updatePlayer(): void {
    this.player.update();
    this.player.updatePhysics();
    this.player.show();
  }

  private updateParticles(): void {
    this.particlesService.update();
  }

  private updateBackground(): void {
    this.backgroundGenerator.update(this.camera.lerpTranslation);
  }

  private updateCamera(): void {
    this.camera.update(this.player.position);
  }
}
