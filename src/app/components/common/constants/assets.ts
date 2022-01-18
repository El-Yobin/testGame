export type ImageData = {
  name: string;
  url: string;
}

export type AnimationData = {
  name: string;
  url: string;
  json: string;
}

export type BoundaryData = {
  X: number,
  Y: number,
  W: number,
  H: number,
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

export const BOUNDARIES: BoundaryData[] = [
  {
    X: 500,
    Y: 0,
    W: 50,
    H: 500,
  },
  {
    X: 0,
    Y: 500,
    W: 500,
    H: 50,
  },
  {
    X: 1000,
    Y: 300,
    W: 100,
    H: 100,
  },
  {
    X: 500,
    Y: 700,
    W: 1000,
    H: 50,
  },
  {
    X: 100,
    Y: 1000,
    W: 50,
    H: 300,
  }
]
