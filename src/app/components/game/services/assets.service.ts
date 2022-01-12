import {Injectable} from '@angular/core';
import {Image, p5InstanceExtensions} from "p5";
import {ANIMATIONS, IMAGES} from "../../common/constants/assets";

export type AnimationJson = {
  frames: Array<{
    filename: string;
    frame: { x: number; y: number; w: number; h: number; }
    pivot: { x: number, y: number; }
  }>;
  meta: { size: { w: number; h: number; } };
}

export type ImageAsset = {
  name: string;
  image: Image;
}

export type AnimationAsset = {
  name: string;
  json: AnimationJson;
  spriteSheet: Image;
}

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  private images: Record<string, ImageAsset> = {};
  private animations: Record<string, AnimationAsset> = {}
  private p5!: p5InstanceExtensions;

  constructor() {
  }

  public loadAssets(p5: p5InstanceExtensions) {
    this.p5 = p5;
    this.loadImages();
    this.loadAnimations();
  }

  public getImage(name: string): ImageAsset {
    return this.images[name];
  }

  public getAnimation(name: string): AnimationAsset {
    return this.animations[name];
  }

  private loadImages(): void {
    IMAGES.forEach(image => {
      this.p5.loadImage(image.url, (res => {
        this.images[image.name] = {
          name: image.name,
          image: res,
        }
      }))
    })
  }

  private loadAnimations(): void {
    ANIMATIONS.forEach(animation => {
      this.p5.loadImage(animation.url, (res => {
        this.animations[animation.name] = {
          name: animation.name,
          spriteSheet: res,
          json: this.p5.loadJSON(animation.json) as AnimationJson,
        }
      }))
    })
  }
}
