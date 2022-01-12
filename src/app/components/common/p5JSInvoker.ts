import * as P5 from 'p5';

export abstract class P5JSInvoker {
  abstract preload(p: P5.p5InstanceExtensions): void;
  abstract setup(p: P5.p5InstanceExtensions): void;
  abstract draw(p: P5.p5InstanceExtensions): void;


  protected startP5JS(containerElement: HTMLElement): P5.p5InstanceExtensions {
    return new P5(this.generate_sketch(), containerElement);
  }

  private generate_sketch(): any {
    const that = this;

    return ((p: P5) => {
      p.preload = (): void => {
        that.preload(p);
      };

      p.setup = (): void => {
        that.setup(p);
      };

      p.draw = (): void => {
        that.draw(p);
      };
    });
  }
}
