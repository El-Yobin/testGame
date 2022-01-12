import {AnimationAsset} from "../../game/services/assets.service";
import {Image} from "p5";

export const splitSpriteSheet = (asset: AnimationAsset): Image[] => {
  return asset.json.frames.map(frame => {
    return asset.spriteSheet.get(frame.frame.x, frame.frame.y, frame.frame.w, frame.frame.h)
  })
}
