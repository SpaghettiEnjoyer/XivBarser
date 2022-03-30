import { PluginEvent } from "../consts/enums";
import { ExecuteActionData } from "../data_representation/events_data";
import { Subject } from "../utilities/subject";
import { ILogLineParser } from "./log_line_parser";

enum Fields {
  PartyListLength = 2
}

export class PartyListParser extends Subject implements ILogLineParser {
  execute(logLine37: string[]): void {
    console.log("parser");
  }
}