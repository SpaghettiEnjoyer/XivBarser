import { CombatantOutput } from "./combatant_output";

export class RowModel {
  constructor(
    public iconUnicode: string,
    public name: string,
    public rowColorRgba: string,
    public output: CombatantOutput
  ) {

  }
}