import { ParsablePluginEvent, PluginEvent } from "../consts/enums";
import { Parser } from "../parser/parser";

export interface Observer {
  initParserObservers(parser: Parser): void;
  onNotify(data: any, event: PluginEvent): void;
}