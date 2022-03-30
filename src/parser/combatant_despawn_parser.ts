import { PluginEvent } from "../consts/enums";
import { CombatantDespawnData } from "../data_representation/events_data";
import { Subject } from "../utilities/subject";
import { ILogLineParser } from "./log_line_parser";

enum Fields {
  Id = 2, 
  Name = 3, 
  JobId = 4, 
  Lvl = 5, 
  OwnerId = 6, 
  // baseId = 10, 
  CurrentHp = 11, 
  MaxHp = 12
}

export class CombatantDespawnParser extends Subject implements ILogLineParser {
  execute(logLine3: Array<string>) {
    const id = logLine3[Fields.Id].toUpperCase();
    const name = logLine3[Fields.Name];
    const jobId = parseInt(logLine3[Fields.JobId]);
    const lvl = parseInt(logLine3[Fields.Lvl]);
    const ownerId = logLine3[Fields.OwnerId].toUpperCase();
    const currentHp = parseInt(logLine3[Fields.CurrentHp]);
    const maxHp = parseInt(logLine3[Fields.MaxHp]);
    super.notify(new CombatantDespawnData(id, name, jobId, lvl, ownerId, currentHp, maxHp), PluginEvent.CombatantDespawn);
  }
}