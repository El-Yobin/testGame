import {Character} from './character';
import {Vector} from 'p5';
import {LocatorService} from '../services/locator.service';
import {UserInputService} from '../services/user-input.service';
import {Inventory, InventorySlot} from '../controller/inventory';
import {Pistol} from './guns/pistol';
import {takeWhile} from 'rxjs/operators';
import {MachineGun} from "./guns/machine-gun";
import {Sword} from "./melee/sword";

export class Player extends Character {
  public inventory: Inventory = new Inventory();
  private active = true;
  private moveInput: Vector = new Vector();
  private userInput: UserInputService;
  private shooting: boolean = false;

  constructor() {
    super();
    this.userInput = LocatorService.injector.get(UserInputService);
    this.subscribeToUserInput();
    this.inventory.addItem(new Pistol());
    this.inventory.addItem(new MachineGun());
    this.inventory.addItem(new Sword());
  }

  public show(): void {
    this.p5.push();
    this.p5.translate(this.position.x, this.position.y);
    this.p5.rotate(this.calculateMouseAngle() - this.p5.radians(90))
    Object.values(this.inventory.getStorage()).forEach(item => item?.update());
    this.inventory.getSelectedWeapon()?.show();
    this.p5.circle(0, 0, 60);
    this.p5.pop();
  }

  public update(): void {
    this.moveByInput();
    this.checkShooting();
  }

  private subscribeToUserInput(): void {
    this.userInput
      .subscribeToMoveInput()
      .pipe(takeWhile((_) => this.active))
      .subscribe((vector) => {
        this.moveInput = vector;
      });

    this.userInput
      .subscribeToShooting()
      .pipe(takeWhile((_) => this.active))
      .subscribe((pressed) => {
        if (this.inventory.getSelectedWeapon()?.fireMode === 'auto') {
          this.shooting = pressed;
          return;
        }
        if (pressed) {
          this.shoot();
        }
      });

    this.userInput
      .subscribeToSlotSelection()
      .pipe(takeWhile((_) => this.active))
      .subscribe((slot: InventorySlot) => {
        this.inventory.selectWeapon(slot);
        this.shooting = false;
      });
  }

  private moveByInput(): void {
    this.constrainPosition(0, 5000);
    this.applyForce(this.moveInput);
    this.velocity.limit(this.maxSpeed);
    if (!this.moveInput.mag()) {
      if (this.velocity.mag() < 0.5) {
        this.velocity.mult(0);
        return;
      }
      this.applyFriction(0.5);
    }
  }

  private calculateMouseAngle(): number {
    return this.p5.atan2(
      this.p5.mouseY - this.p5.height / 2,
      this.p5.mouseX - this.p5.width / 2
    );
  }

  private checkShooting(): void {
    if (this.shooting) {
      this.shoot();
    }
  }

  private shoot() {
    const x = this.p5.mouseX - this.p5.width / 2;
    const y = this.p5.mouseY - this.p5.height / 2;

    const angle = Math.atan2(y, x);
    const offset = this.p5.createVector(Math.cos(angle) * 40, Math.sin(angle) * 40)

    this.inventory
      .getSelectedWeapon()
      ?.shoot(this.position, this.p5.createVector(x, y), offset);
  }
}
