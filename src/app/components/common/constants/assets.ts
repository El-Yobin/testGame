export type ImageData = {
  name: string;
  url: string;
}

export type AnimationData = {
  name: string;
  url: string;
  json: string;
}

export const IMAGES: ImageData[] = [
  {
    name: 'background',
    url: '../../assets/grid.png',
  },

]

export const ANIMATIONS: AnimationData[] = [
  {
    name: 'sword-swing',
    url: '../../assets/melee/sword_swing.png',
    json: '../../assets/melee/sword_swing.json'
  }
]
