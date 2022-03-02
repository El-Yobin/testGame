export type ImageData = {
  name: string;
  url: string;
}

export type AnimationData = {
  name: string;
  url: string;
  json: string;
}

export type BoundaryType = 'rect'

export type BoundaryData = {
  type: BoundaryType,
  x: number,
  y: number,
  w: number,
  h: number,
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
    type: 'rect',
    x: 500,
    y: 0,
    w: 50,
    h: 500,
  },
  {
    type: 'rect',
    x: 0,
    y: 500,
    w: 500,
    h: 50,
  },
  {
    type: 'rect',
    x: 1000,
    y: 300,
    w: 100,
    h: 100,
  },
  {
    type: 'rect',
    x: 500,
    y: 700,
    w: 1000,
    h: 50,
  },
  {
    type: 'rect',
    x: 100,
    y: 1000,
    w: 50,
    h: 300,
  }
]
