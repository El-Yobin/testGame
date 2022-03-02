import {Injectable} from '@angular/core';
import {p5InstanceExtensions, Vector} from 'p5';
import {P5InstanceService} from './p5-instance.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {InventorySlot} from '../controller/inventory';

@Injectable({
  providedIn: 'root',
})
export class UserInputService {
  private p5: p5InstanceExtensions = P5InstanceService.p5Instance;
  private moveInput$: BehaviorSubject<Vector> = new BehaviorSubject<Vector>(
    this.p5.createVector(0, 0)
  );
  private aimActive$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private click$: Subject<null> = new Subject<null>();
  private shooting$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  private slotSelected$: Subject<InventorySlot> = new Subject<InventorySlot>();

  constructor() {
    window.onkeydown = (e): void => this.keyDown(e);
    window.onkeyup = (): void => this.keyUp();
    window.onmousedown = (e): void => this.mousePressed(e);
    window.onmouseup = (e): void => this.mouseReleased(e);
    window.onclick = (e): void => this.mouseClicked(e);
  }

  public subscribeToMoveInput(): Observable<Vector> {
    return this.moveInput$.asObservable();
  }

  public subscribeToAim(): Observable<boolean> {
    return this.aimActive$.asObservable();
  }

  public subscribeToShooting(): Observable<boolean> {
    return this.shooting$.asObservable();
  }

  public subscribeToClick(): Observable<null> {
    return this.click$.asObservable();
  }

  public subscribeToSlotSelection(): Observable<InventorySlot> {
    return this.slotSelected$.asObservable();
  }

  private keyDown(e: KeyboardEvent): void {
    if (!e.repeat) {
      this.updateMoveInput();

      switch (e.key) {
        case '1':
          this.slotSelected$.next('primary');
          break;
        case '2':
          this.slotSelected$.next('secondary');
          break;
        case '3':
          this.slotSelected$.next('melee');
          break;
      }
    }
  }

  private keyUp(): void {
    this.updateMoveInput();
  }

  private updateMoveInput(): void {
    const moveInput = new Vector();
    if (this.p5.keyIsDown(87)) {
      moveInput.add(0, -1);
    }
    if (this.p5.keyIsDown(83)) {
      moveInput.add(0, 1);
    }
    if (this.p5.keyIsDown(65)) {
      moveInput.add(-1, 0);
    }
    if (this.p5.keyIsDown(68)) {
      moveInput.add(1, 0);
    }
    this.moveInput$.next(moveInput.normalize());
  }

  private mousePressed(e: MouseEvent): void {
    if (e.button === 0) {
      this.shooting$.next(true);
    }

    if (e.button === 2) {
      this.aimActive$.next(true);
    }
  }

  private mouseReleased(e: MouseEvent): void {
    if (e.button === 0) {
      this.shooting$.next(false);
    }

    if (e.button === 2) {
      this.aimActive$.next(false);
    }
  }

  private mouseClicked(e: MouseEvent): void {
    if (e.button === 0) {
      this.click$.next(null);
    }
  }
}
