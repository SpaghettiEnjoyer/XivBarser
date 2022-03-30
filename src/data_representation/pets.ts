import { CombatantBase } from "./combatant_base";
import { Player } from "./players";

export class PlayerPet extends CombatantBase {
  constructor(id: string, name: string, lvl: number, jobId: number, currentHp: number, maxHp: number, 
    public owner: Player) {
    super(id, name, lvl, jobId, currentHp, maxHp);
  }
}

export class PlayerWithStatsPet extends PlayerPet {
}


export class StrayPet extends CombatantBase {
}