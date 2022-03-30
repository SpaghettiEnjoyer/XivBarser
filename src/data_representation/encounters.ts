import { Combatants } from "./combatants";
import { Encounter } from "./encounter";

export class Encounters {
  public current: Encounter;
  public previous = new Array<Encounter>();
  public shouldSaveHistory: boolean;

  createNewEncounter() {
    if (this.shouldSaveHistory)
      this.previous.push(this.current);
    this.current = new Encounter();
    this.current.start();
    return this.current;
  }
  
  getCurrentTimer() {
    return this.current.getTimer();
  }

  endCurrent() {
    this.current.end();
  }
}