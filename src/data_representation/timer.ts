import { Stopwatch } from "../utilities/stopwatch"

export class Timer {
  //private static timeFormatSetting = { minimumIntegerDigits: 2, useGrouping:false };
  private encounterStopwatch = new Stopwatch();
  private downtimeStopwatch = new Stopwatch();
  public elapsedTime: number;
  public elapsedUptime: number;
  public elapsedDowntime: number;
  public formattedTime: string;
  public formattedMilliseconds: string;

  start() {
    this.encounterStopwatch.startOrResume();
  }

  stop() {
    this.encounterStopwatch.stop();
  }

  startCountingDowntime() {
    this.downtimeStopwatch.startOrResume();
  }

  stopCountingDowntime() {
    this.downtimeStopwatch.stop();
  }

  reset() {
    this.encounterStopwatch.reset();
    this.downtimeStopwatch.reset();
  }

  update() {
    this.elapsedTime = this.encounterStopwatch.getElapsedTime();
    this.elapsedDowntime = this.downtimeStopwatch.getElapsedTime();
    this.elapsedUptime = Math.max(0, this.elapsedTime - this.elapsedDowntime);
    this.formattedTime = this.#getFormattedTime();
    this.formattedMilliseconds = this.#getFormattedMilliseconds();
  }

  #getFormattedTime() {
    const seconds = Math.floor(this.elapsedTime / 1000);
    const minutesStr = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secondsStr = (seconds % 60).toString().padStart(2, '0');
    return `${minutesStr}:${secondsStr}`
  }

  #getFormattedMilliseconds() {
    return Math.round(this.elapsedTime % 100).toString().padStart(2, '0');
  }
}