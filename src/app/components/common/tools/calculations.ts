import * as p5Methods from 'p5';
import {RigidBody} from '../rigidBody';

export function calculateSpringForce(
  object: RigidBody,
  origin: p5Methods.Vector,
  restLength: number,
  coefficient: number,
): p5Methods.Vector {
  const springForce = p5Methods.Vector.sub(object.position, origin);
  const currentLength = springForce.mag();
  const displacement = currentLength - restLength;

  return springForce.normalize().mult(-coefficient * displacement);
}

export function calculateAttractionForce(current: RigidBody, another: RigidBody): p5Methods.Vector {
  const force = p5Methods.Vector.sub(current.position, another.position);
  const distance = force.mag();
  force.normalize();
  return force.mult((current.mass * another.mass) / ((distance * distance) / 25));
}

export function collideLineLine(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  x4: number,
  y4: number
) {
  // calculate the distance to intersection point
  const uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
  const uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

  // if uA and uB are between 0-1, lines are colliding
  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {

    const intersectionX = x1 + (uA * (x2 - x1));
    const intersectionY = y1 + (uA * (y2 - y1));

    return {
      intersect: true,
      x: intersectionX,
      y: intersectionY,
    }
  }
  return {
    intersect: false,
    x: 0,
    y: 0,
  };
}
