import {InventorySlot} from '../../game/controller/inventory';

export type FireMode = 'auto' | 'semi';
export type GunNames = 'Pistol' | 'MachineGun';
export type MeleeNames = 'Sword'

export type GunConfig = {
  name: GunNames;
  imageUrl: string;
  shotVelocity: number;
  inventorySlot: InventorySlot;
  fireMode: FireMode;
  fireRate: number;
  spread: number;
};

export type MeleeConfig = {
  name: MeleeNames;
  assetName: string;
  imageUrl: string;
  inventorySlot: InventorySlot;
  fireMode: FireMode;
  fireRate: number;
}

export const MELEE: Record<MeleeNames, MeleeConfig> = {
  Sword: {
    name: 'Sword',
    assetName: 'sword-swing',
    imageUrl: '../../../assets/melee/Sword.png',
    inventorySlot: 'melee',
    fireMode: 'semi',
    fireRate: 500,
  }
}

export const GUNS: Record<GunNames, GunConfig> = {
  Pistol: {
    name: 'Pistol',
    imageUrl: '../../../assets/guns/Pistol.png',
    shotVelocity: 20,
    inventorySlot: 'secondary',
    fireMode: 'semi',
    fireRate: 100,
    spread: 2,
  },
  MachineGun: {
    name: 'MachineGun',
    imageUrl: '../../../assets/guns/MachineGun.png',
    shotVelocity: 15,
    inventorySlot: 'primary',
    fireMode: 'auto',
    fireRate: 70,
    spread: 1,
  }
};
