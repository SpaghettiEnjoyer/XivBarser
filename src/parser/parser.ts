import { LogLineEvent, ParsablePluginEvent, PluginEvent } from "../consts/enums";
import { Observer } from "../utilities/observer";
import { Subject } from "../utilities/subject";
import { ILogLineParser } from "./log_line_parser";
import { CombatantDespawnParser } from "./combatant_despawn_parser";
import { CombatantSpawnParser } from "./combatant_spawn_parser";
import { ZoneChangeParser } from "./zone_change_parser";
import { ActorControlParser } from "./actor_control_parser";
import { SendActionParser } from "./send_action_parser";
import { ExecuteActionParser } from "./execute_action_parser";
import { PartyListParser } from "./party_list_parser";
import { EfficientSubject } from "../utilities/efficient_subject";

export class Parser {
  private zoneChangeParser = new ZoneChangeParser();
  private combatantSpawnParser = new CombatantSpawnParser();
  private combatantDespawnParser = new CombatantDespawnParser();
  private actorControlParser = new ActorControlParser(ParsablePluginEvent.InstanceChange, ParsablePluginEvent.Victory, ParsablePluginEvent.Wipe);
  private sendActionParser = new SendActionParser(ParsablePluginEvent.SendDmgAction, ParsablePluginEvent.SendHealAction, ParsablePluginEvent.SendEffectAction);
  private executeActionParser = new ExecuteActionParser();

  private parsersByLogLines: { [key in LogLineEvent]?: (Subject | EfficientSubject) & ILogLineParser } = {
    [LogLineEvent.ZoneChange]: this.zoneChangeParser,
    [LogLineEvent.CombatantSpawn]: this.combatantSpawnParser,
    [LogLineEvent.CombatantDespawn]: this.combatantDespawnParser,
    [LogLineEvent.ActorControl]: this.actorControlParser,
    [LogLineEvent.SendAction]: this.sendActionParser,
    [LogLineEvent.ExecuteAction]: this.executeActionParser
  };

  private parsersByPluginEvent: { [key in ParsablePluginEvent]?: (Subject | EfficientSubject) & ILogLineParser } = {
    [ParsablePluginEvent.ZoneChange]: this.zoneChangeParser,
    [ParsablePluginEvent.CombatantSpawn]: this.combatantSpawnParser,
    [ParsablePluginEvent.CombatantDespawn]: this.combatantDespawnParser,
    [ParsablePluginEvent.InstanceChange]: this.actorControlParser,
    [ParsablePluginEvent.Victory]: this.actorControlParser,
    [ParsablePluginEvent.Wipe]: this.actorControlParser,
    [ParsablePluginEvent.SendDmgAction]: this.sendActionParser,
    [ParsablePluginEvent.SendHealAction]: this.sendActionParser,
    [ParsablePluginEvent.SendEffectAction]: this.sendActionParser,
    [ParsablePluginEvent.ExecuteAction]: this.executeActionParser
  }

  parse(logLine: any) {
    const logLineParser = this.parsersByLogLines[logLine[0]];
    if (logLineParser)
      logLineParser.execute(logLine);
  }

  addObserver(observer: Observer, ...parsableEvents: ParsablePluginEvent[]) {
    for (let i = 0; i != parsableEvents.length; ++i) {
      const event = parsableEvents[i];
      const logLineParser = this.parsersByPluginEvent[event];
      console.log(`[Parser] ${observer.constructor.name} is observing '${logLineParser.constructor.name}`);
      logLineParser.addObserver(observer, event);
    }
  }

  removeObserver(observer: Observer, ...parsableEvents: ParsablePluginEvent[]) {
    for (let i = 0; i != parsableEvents.length; ++i) {
      const event = parsableEvents[i];
      const logLineParser = this.parsersByPluginEvent[event];
      console.log(`[Parser] ${observer.constructor.name} is no longer observing for '${logLineParser.constructor.name}`);
      logLineParser.removeObserver(observer, event);
    }
  }
}