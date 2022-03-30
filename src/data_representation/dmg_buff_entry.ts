import { DamageType } from "../consts/enums";
import { CombatantBase } from "./combatant_base";

export class DmgBuffEntry {
  constructor(
    public effectId: string, 
    public effectName: string, 
    public value: number, 
    public dmgType: DamageType, 
    public caster: CombatantBase
    ) { 

    }

  giveRdpsToCaster(amount: number) {
    
  }
}