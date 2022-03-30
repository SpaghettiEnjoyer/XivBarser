import { LogLineEvent, ParsablePluginEvent, PluginEvent } from "../consts/enums";
import { Encounters } from "../data_representation/encounters";
import { ExecuteActionData, SendDmgActionData } from "../data_representation/events_data";
import { MainPlayer } from "../data_representation/main_player";
import { PartyList } from "../data_representation/party_list";
import { Timer } from "../data_representation/timer";
import { Zone } from "../data_representation/zone";
import { Parser } from "../parser/parser";
import { AccurateInterval } from "../utilities/accurate_interval";
import { Observer } from "../utilities/observer";
import { EncounterEnder } from "./encounter_ender";
import { EncounterPhaser } from "./encounter_phaser";
import { EncounterStarter } from "./encounter_starter";
import { XivBarser } from "./xiv_barser";

export class EncounterController implements Observer {
  private encounterStarter = new EncounterStarter();
  private encounterEnder = new EncounterEnder();
  private encounterPhaser = new EncounterPhaser();

  public isInEncounter: boolean;
  public isInDowntime: boolean;
  private actions: string[] = [];
  
  constructor(
    
    private encounters: Encounters,
    private logLineParser: Parser,
    private mainPlayer: MainPlayer,
    private partyList: PartyList,
    private zone: Zone,
    private onStart: () => void,
    private onEnd: () => void,
    private onPhase: () => void,
    private onDowntime: () => void
  ) {

    addOverlayListener("TargetableEnemies", (e) => {
      if (!this.isInDowntime && this.zone.isInstanced && this.isInEncounter && e.TargetableEnemyList.length === 0) {
        // should be encounterController.setCombat
        console.log(e);
        this.isInDowntime = true;
      }
      else if (this.isInDowntime && e.TargetableEnemyList.length > 0) {
        this.isInDowntime = false;
        this.#maybePhaseEncounter(null, PluginEvent.Downtime);
      }
    });
  }

  initParserObservers(parser: Parser): void {
    parser.addObserver(this, ParsablePluginEvent.Victory, ParsablePluginEvent.Wipe, ParsablePluginEvent.SendDmgAction, ParsablePluginEvent.ExecuteAction)
  }

  handleInCombatState(isInCombat: boolean) {
    if (isInCombat) {
      this.#startEncounter();
    }
  }

  onNotify(data: any, event: PluginEvent): void {
    console.log(PluginEvent[event]);
    if (!this.isInEncounter) {
      this.#maybeStartEncounter(data, event);
    }
    else {
      if (!this.#maybeEndEncounter(data, event))
        this.#maybePhaseEncounter(data, event);
    }
  }

  #maybeStartEncounter(data: any, event: PluginEvent) {
    let shouldStartEncounter: boolean = false;
    switch (event) {

      /*
      case PluginEvents.InCombat:
      case PluginEvents.ACTInCombat:
        shouldStartEncounter = this.encounterStarter.shouldStart(this.zone.instanceType, event);
        break;
      */
      case PluginEvent.SendDmgAction:
        const dmgActionData = <SendDmgActionData>data;
        const distanceFromMainPlayer = this.mainPlayer.distance(dmgActionData.casterXPos, dmgActionData.casterYPos, dmgActionData.casterZPos);
        const isInPartyList = this.partyList.contains(dmgActionData.casterId);
        if (this.encounterStarter.shouldStart(this.zone.instanceType, event, distanceFromMainPlayer, isInPartyList))
          this.actions.push(dmgActionData.sequenceNumber);
        break;
      case PluginEvent.ExecuteAction:
        if (this.actions.length == 0)
          break;
        const execActionData = <ExecuteActionData>data;
        shouldStartEncounter = this.actions.includes(execActionData.sequenceNumber);
        break;
    }
    if (shouldStartEncounter)
      this.#startEncounter();
  }


  #maybePhaseEncounter(data: any, event: PluginEvent) {
    const shouldPhase = this.encounterPhaser.shouldPhase(this.zone.instanceType, event);
    if (shouldPhase)
      this.#phaseEncounter();
    return shouldPhase;
  }

  #maybeEndEncounter(data: any, event: PluginEvent) {
    const shouldEnd = this.encounterEnder.shouldEnd(this.zone.instanceType, event);
    if (shouldEnd)
      this.#endEncounter();
    return shouldEnd;
  }

  #startEncounter() {
    console.log("started");
    this.actions = [];
    this.isInEncounter = true;
    //this.logLineParser.removeObserver(this, ParsablePluginEvents.SendDmgAction, ParsablePluginEvents.ExecuteAction);
    this.onStart();
  }


  #phaseEncounter() {
    console.log("phased");
    //this.isInDowntime = true;
  }

  #endEncounter() {
    console.log("ended");
    this.isInEncounter = false;
    this.isInDowntime = false;
    //this.logLineParser.addObserver(this, ParsablePluginEvents.SendDmgAction, ParsablePluginEvents.ExecuteAction);
    this.onEnd();
  }

}