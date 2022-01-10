import {Gun} from '../prefabs/guns/abstract/gun';
import {Melee} from "../prefabs/melee/abstract/melee";

export type InventorySlot = 'primary' | 'secondary' | 'melee';

export class Inventory {
  private storage: Record<InventorySlot, Gun | Melee | null> = {
    primary: null,
    secondary: null,
    melee: null,
  };

  private selectedSlot: InventorySlot = 'secondary';

  public addItem(item: Gun | Melee) {
    this.storage[item.inventorySlot] = item;
  }

  public getSelectedWeapon(): Gun | Melee | null {
    return this.storage[this.selectedSlot];
  }

  public getStorage() {
    return this.storage;
  }

  public selectWeapon(slot: InventorySlot): void {
    this.selectedSlot = slot;
  }
}
