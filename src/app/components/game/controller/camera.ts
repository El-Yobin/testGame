import {Vector} from 'p5';
import {P5InstanceService} from '../services/p5-instance.service';
import {UserInputService} from "../services/user-input.service";
import {LocatorService} from "../services/locator.service";

export class Camera {
  public lerpTranslation: Vector;
  private nextTranslation: Vector;
  private p5 = P5InstanceService.p5Instance;
  private userInput: UserInputService;
  private aimIsActive!: boolean;

  constructor() {
    this.userInput = LocatorService.injector.get(UserInputService);
    this.nextTranslation = this.p5.createVector(0, 0);
    this.lerpTranslation = this.p5.createVector(0, 0);
    this.subscribeToAim();
  }

  public update(target: Vector): void {
    this.translateTo(target);
    this.calculateAimTranslation();
    this.interpolateToTarget();
    this.p5.translate(this.lerpTranslation.x, this.lerpTranslation.y);
  }

  private translateTo(target: Vector): void {
    this.p5.translate(this.p5.width / 2, this.p5.height / 2);
    this.nextTranslation.set(-target.x, -target.y);
  }

  private interpolateToTarget(): void {
    this.lerpTranslation.set(
      this.p5.lerp(this.lerpTranslation.x, this.nextTranslation.x, 0.15),
      this.p5.lerp(this.lerpTranslation.y, this.nextTranslation.y, 0.15)
    );
  }

  private calculateAimTranslation(): void {
    if (this.aimIsActive) {
      const y = this.p5.mouseY - this.p5.height / 2;
      const x = this.p5.mouseX - this.p5.width / 2;

      this.nextTranslation.add(this.p5.createVector(x, y).div(5).mult(-1).setMag(100));
    }
  }

  private subscribeToAim(): void {
    this.userInput.subscribeToAim().subscribe(res => {
      this.aimIsActive = res;
    })
  }
}
