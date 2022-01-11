import {Gun} from '../prefabs/guns/abstract/gun';
import {Melee} from "../prefabs/melee/abstract/melee";
import {Hands} from "../prefabs/melee/hands";

export type InventorySlot = 'primary' | 'secondary' | 'melee';

export class Inventory {
  private storage: Record<InventorySlot, Gun | Melee> = {
    primary: new Hands(),
    secondary: new Hands(),
    melee: new Hands(),
  };

  private selectedSlot: InventorySlot = 'melee';

  public addItem(item: Gun | Melee) {
    this.storage[item.config.inventorySlot] = item;
  }

  public getSelectedWeapon(): Gun | Melee {
    return this.storage[this.selectedSlot];
  }

  public getStorage() {
    return this.storage;
  }

  public selectWeapon(slot: InventorySlot): void {
    this.selectedSlot = slot;
  }

  public update(): void {
    Object.values(this.storage).forEach(item => item.update());
  }
}
