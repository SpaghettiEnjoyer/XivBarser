import { Combatants } from "./combatants";
import { EncounterPhase } from "./encounter_phase";
import { Timer } from "./timer";

export class Encounter {
  private phases = new Array<EncounterPhase>();
  private timer = new Timer();

  constructor() {
    
  }

  init() {
    
  }

  start() {
    this.timer.start();
  }

  end() {
    this.timer.stop();
  }

  getTimer() {
    return this.timer;
  }
}