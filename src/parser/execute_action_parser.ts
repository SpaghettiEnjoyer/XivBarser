import { PluginEvent } from "../consts/enums";
import { ExecuteActionData } from "../data_representation/events_data";
import { Subject } from "../utilities/subject";
import { ILogLineParser } from "./log_line_parser";

enum Fields {
  TargetId = 2,
  TargetName = 3,
  SequenceNumber = 4
}

export class ExecuteActionParser extends Subject implements ILogLineParser {
  execute(logLine37: string[]): void {
      const targetId = logLine37[Fields.TargetId];
      const targetName = logLine37[Fields.TargetName];
      const sequenceNumber = logLine37[Fields.SequenceNumber];
      super.notify(new ExecuteActionData(targetId, targetName, sequenceNumber), PluginEvent.ExecuteAction);
  }
}