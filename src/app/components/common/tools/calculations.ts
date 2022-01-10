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
