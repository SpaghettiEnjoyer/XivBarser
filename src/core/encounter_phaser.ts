import { EncounterPhaserMode, InstanceType, PluginEvent } from "../consts/enums";

// Subscribe to 
export class EncounterPhaser {
  private instanceModes: { [key in InstanceType]: EncounterPhaserMode } = {
    [InstanceType.OpenWorld]: EncounterPhaserMode.Off,
    [InstanceType.Dungeon]: EncounterPhaserMode.OnceOutOfCombat,
    [InstanceType.Trial]: EncounterPhaserMode.OnDowntime,
    [InstanceType.Raid]: EncounterPhaserMode.OnDowntime,
    [InstanceType.DeepDungeon]: EncounterPhaserMode.Off,
    [InstanceType.Pvp]: EncounterPhaserMode.Off,
    [InstanceType.Other]: EncounterPhaserMode.Off
  }

  shouldPhase(instanceType: InstanceType, event: PluginEvent) {
    const mode = this.instanceModes[instanceType];
    switch (mode) {
      case EncounterPhaserMode.Off:
        return false;
      case EncounterPhaserMode.OnceOutOfCombat:
        return event === PluginEvent.OutOfCombat;
      case EncounterPhaserMode.OnceACTOutOfCombat:
        return event === PluginEvent.ACTOutOfCombat; 
      case EncounterPhaserMode.OnDowntime:
        return event === PluginEvent.Downtime;
    }
  }
}