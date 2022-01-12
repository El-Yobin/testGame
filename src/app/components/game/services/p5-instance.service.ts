import {Injectable} from '@angular/core';
import {p5InstanceExtensions} from 'p5';

@Injectable({
  providedIn: 'root',
})
export class P5InstanceService {
  public static p5Instance: p5InstanceExtensions;

  private static _delta: number;

  static get delta(): number {
    return this._delta;
  }

  static set delta(value: number) {
    this._delta = value / 10;
  }
}
