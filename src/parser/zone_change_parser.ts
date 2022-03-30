import { PluginEvent } from "../consts/enums";
import { ZoneChangeData } from "../data_representation/events_data";
import { Subject } from "../utilities/subject";
import { ILogLineParser } from "./log_line_parser";

enum Fields {
  Id = 2,
  Name = 3
}

export class ZoneChangeParser extends Subject implements ILogLineParser {
  public execute(logLine1: Array<string>) {
    const id = parseInt(logLine1[Fields.Id], 16);
    const name = logLine1[Fields.Name];
    super.notify(new ZoneChangeData(id, name), PluginEvent.ZoneChange);
  }
}