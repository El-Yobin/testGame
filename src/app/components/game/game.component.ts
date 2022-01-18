import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {P5JSInvoker} from '../common/p5JSInvoker';
import {p5InstanceExtensions} from 'p5';
import {P5InstanceService} from './services/p5-instance.service';
import {Player} from './prefabs/characters/player';
import {Camera} from './controller/camera';
import {BackgroundGenerator} from './controller/backgroundGenerator';
import {ParticleService} from "./services/particle.service";
import {AssetsService} from "./services/assets.service";
import {ObjectsGenerator} from "./controller/objectsGenerator";
import {PhysicsEngineService} from "./services/physics-engine.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent extends P5JSInvoker implements AfterViewInit {
  public frameRate: number = 70;
  public player!: Player;
  public p5!: p5InstanceExtensions;
  @ViewChild('container') private container!: ElementRef;
  private p5Canvas: any;
  private camera!: Camera;
  private backgroundGenerator!: BackgroundGenerator;
  private boundaryGenerator!: ObjectsGenerator;

  constructor(
    private particlesService: ParticleService,
    private assetsService: AssetsService,
    private physicsService: PhysicsEngineService,
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
    this.createBoundaries();
    this.createCanvas();
    this.createCamera();
    this.createPlayer();
  }

  public draw(p5: p5InstanceExtensions): void {
    this.p5.frameRate(this.frameRate)
    this.updateDeltaTime();
    this.updateCanvas();
    this.updateBoundaries();
    this.updateParticles();
    this.updatePlayer();
    this.updatePhysics();
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

  private createBoundaries(): void {
    this.boundaryGenerator = new ObjectsGenerator();
    this.boundaryGenerator.generateObjects(this.assetsService.getBoundaries());
    this.physicsService.addObjects(this.boundaryGenerator.objects)
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

  private updateBoundaries(): void {
    this.boundaryGenerator.updateObjects();
  }

  private updateCamera(): void {
    this.camera.update(this.player.position);
  }

  private updateDeltaTime(): void {
    P5InstanceService.delta = this.p5.deltaTime;
  }

  private updatePhysics(): void {
    this.physicsService.update();
  }
}
