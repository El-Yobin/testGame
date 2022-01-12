import {Injectable} from '@angular/core';
import {p5InstanceExtensions} from 'p5';

@Injectable({
  providedIn: 'root',
})
export class P5InstanceService {
  public static p5Instance: p5InstanceExtensions;
}
