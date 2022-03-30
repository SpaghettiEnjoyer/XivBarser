import { CombatantOutput } from "./combatant_output";
import { DmgBuffEntry } from "./dmg_buff_entry";

export class CombatantBase {
  
  public output = new CombatantOutput();
  public dmgBuffs = new Array<DmgBuffEntry>();
  
  constructor(
    public id: string,
    public name: string,
    public lvl: number,
    public jobId: number,
    public currentHp: number,
    public maxHp: number
    ) { }

    dealDamage(target: CombatantBase, amount: number) {
      this.output.dmgDone += amount;
      target.output.dmgTaken += amount;
    }

    heal(target: CombatantBase, amount: number) {
      
    }
}