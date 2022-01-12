import {Vector} from 'p5';
import {LocatorService} from '../../services/locator.service';
import {UserInputService} from '../../services/user-input.service';
import {Inventory, InventorySlot} from '../../controller/inventory';
import {Pistol} from '../guns/pistol/pistol';
import {takeWhile} from 'rxjs/operators';
import {MachineGun} from "../guns/machine-gun/machine-gun";
import {Sword} from "../melee/sword/sword";
import {P5InstanceService} from "../../services/p5-instance.service";
import {RigidBody} from "../../../common/rigidBody";

export class Player extends RigidBody {
  public inventory: Inventory = new Inventory();
  private maxSpeed = 5;
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
    this.p5.rotate(this.p5.atan2(this.getMousePosition().y, this.getMousePosition().x) - this.p5.HALF_PI)
    this.inventory.getSelectedWeapon().show();
    this.p5.circle(0, 0, 60);
    this.p5.pop();
  }

  public update(): void {
    this.inventory.update();
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
        if (this.inventory.getSelectedWeapon().config.fireMode === 'auto') {
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
    this.applyForce(this.moveInput);
    this.velocity.limit(this.maxSpeed * P5InstanceService.delta);
    if (!this.moveInput.mag()) {
      if (this.velocity.mag() < 0.5 * P5InstanceService.delta) {
        this.velocity.mult(0);
        return;
      }
      this.applyFriction(0.25 * P5InstanceService.delta);
    }
  }

  private getMousePosition(): Vector {
    return this.p5.createVector(
      this.p5.mouseX - this.p5.width / 2,
      this.p5.mouseY - this.p5.height / 2,
    )
  }

  private checkShooting(): void {
    if (this.shooting) {
      this.shoot();
    }
  }

  private shoot() {
    this.inventory
      .getSelectedWeapon()
      ?.shoot(this.position, this.getMousePosition());
  }
}
