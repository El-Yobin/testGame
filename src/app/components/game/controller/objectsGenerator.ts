import {P5InstanceService} from "../services/p5-instance.service";
import {Boundary} from "../prefabs/objects/boundary";
import {BoundaryData} from "../../common/constants/assets";

export class ObjectsGenerator {
  public objects: Boundary[] = [];
  private p5 = P5InstanceService.p5Instance;

  public generateObjects(objects: BoundaryData[]): void {
    objects.forEach(item => {
      this.objects.push(new Boundary(
        this.p5.createVector(item.X, item.Y),
        item.W,
        item.H
      ))
    })
  }

  public updateObjects(): void {
    this.objects.forEach(object => {
      object.show();
    })
  }
}
