import { InstanceType, EncounterEnderMode, PluginEvent } from "../consts/enums";
import { Observer } from "../utilities/observer";
import { EncounterData } from "./data_component";

export class EncounterEnder {
  private instanceModes: { [key in InstanceType]: EncounterEnderMode } = {
    [InstanceType.OpenWorld]: EncounterEnderMode.Legacy,
    [InstanceType.Dungeon]: EncounterEnderMode.OnVictory,
    [InstanceType.Trial]: EncounterEnderMode.OnceOutOfCombat,
    [InstanceType.Raid]: EncounterEnderMode.OnceOutOfCombat,
    [InstanceType.DeepDungeon]: EncounterEnderMode.OnVictory,
    [InstanceType.Pvp]: EncounterEnderMode.Legacy,
    [InstanceType.Other]: EncounterEnderMode.Legacy
  }

  shouldEnd(instanceType: InstanceType, event: PluginEvent) {
    const mode = this.instanceModes[instanceType];
    switch (mode) {
      case EncounterEnderMode.Legacy:
        return event === PluginEvent.ACTOutOfCombat;
      case EncounterEnderMode.OnceOutOfCombat:
        return event === PluginEvent.OutOfCombat;
      case EncounterEnderMode.OnVictory:
        return event === PluginEvent.Victory;
    }
  }

  setMode(instanceType: InstanceType, mode: EncounterEnderMode) {
    this.instanceModes[instanceType] = mode;
  }
}