import { RigidBody } from '../../common/rigidBody';

export abstract class Character extends RigidBody {
  public maxSpeed = 5;
  public health = 100;
}
