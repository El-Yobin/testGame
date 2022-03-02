import {Boundary} from "../prefabs/objects/boundary";
import {BoundaryData} from "../../common/constants/assets";

export class ObjectsGenerator {
  public objects: Boundary[] = [];

  public generateObjects(objects: BoundaryData[]): void {
    objects.forEach(item => {
      this.objects.push(new Boundary(item))
    })
  }

  public updateObjects(): void {
    this.objects.forEach(object => {
      object.show();
    })
  }
}
