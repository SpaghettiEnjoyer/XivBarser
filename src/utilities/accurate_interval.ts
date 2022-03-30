import { Stopwatch } from "./stopwatch";
// remove this crap
export class AccurateInterval {
  private stopwatch = new Stopwatch();
  private handle: number;
  private expected: number = 0;
  private drift: number = 0;

  constructor(
    private callback: (...args: any[]) => void,
    private interval: number,
    private args: any[] = []
    ) {

    }

  start() {
    this.expected = window.performance.now() + this.interval;
    window.setInterval(this.callback, this.interval);
    //this.handle = window.setTimeout(this.#uhh, this.interval);
    //this.#uhh(this.args);
  }

  #uhh = (args: any[]) => {
    this.drift = window.performance.now() - this.expected;
    this.callback(...this.args);
    this.expected += this.interval;
    console.log(this.interval - this.drift);
    this.handle = window.setTimeout(this.#uhh, Math.max(0, this.interval - this.drift), this.args);
  }

  stop() {
    window.clearTimeout(this.handle);
  }

  adjustInterval(interval: number) {
    this.interval = interval;
  }
}