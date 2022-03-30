import { ListenerEvents, LogLineEvent, ParsablePluginEvent, PluginEvent } from "../consts/enums";
import { Combatants } from "../data_representation/combatants";
import { Encounters } from "../data_representation/encounters";
import { EventEmitter } from "../data_representation/event_emitter";
import { MainPlayer } from "../data_representation/main_player";
import { PartyList } from "../data_representation/party_list";
import { Timer } from "../data_representation/timer";
import { Zone } from "../data_representation/zone";
import { ActionsManager } from "../managers/actions_manager";
import { ActionsProcessor } from "../managers/actions_processor";
import { Parser } from "../parser/parser";
import { EncounterData } from "./data_component";
import { EncounterController } from "./encounter_controller";
import { EncounterStarter } from "./encounter_starter";
// 2 update methods: legacy (on execute action) and setInterval
export class XivBarser {
  public userId: string;
  public isInCombat: boolean;
  public zone = new Zone([ListenerEvents.InstanceEnter, ListenerEvents.InstanceExit]);
  public logLineParser = new Parser();
  private mainPlayer = new MainPlayer();
  public encounters = new Encounters();
  private timer = new Timer();
  private partyList = new PartyList(this.mainPlayer);
  private updateInterval = 2000;
  private updateHandle = -1;
  private encounterController = new EncounterController(this.encounters, this.logLineParser, this.mainPlayer, this.partyList, this.zone, () => this.start(), () => this.end(), null, null);

  private combatants = new Combatants();
  private dataComponent = new EncounterData();
  private actionsProcessor = new ActionsProcessor();
  public actionsManager = new ActionsManager(this.actionsProcessor, null);
  
  private eventEmitters: {[key in ListenerEvents]: EventEmitter} = {
    [ListenerEvents.InstanceEnter]: this.zone,
    [ListenerEvents.InstanceExit]: this.zone
  }
  // in case we're out of combat (not parsing yet)
  // someone does execute an action with log line 37 -> check with encounterStarter to see if we should start
  // encounter should start, create the combatants in question (both caster and target)
  // options: create a class for action processing
  private formatter;
  private callback: () => void;


  constructor(configStr: string, callback) {
    this.#initOverlayListeners();
    this.#initObservers();
    this.#initBarserListeners();
    this.callback = callback;
  }

  setUpdateInterval(updateInterval: number) {
    this.updateInterval = updateInterval;
  }

  #initOverlayListeners() {
    /*
    addOverlayListener("EnmityTargetData", (e) => {
      console.log(e);
    });
*/
    this.getCombatants(undefined).then((res) => {
      console.log(res);
    });
    
    addOverlayListener("LogLine", (e) => {
      this.logLineParser.parse(e.line);
    })
    addOverlayListener("ChangeZone", (e) => {
      this.zone.setZone(e.zoneID, e.zoneName);
    });
    addOverlayListener("ChangePrimaryPlayer", (e) => {
      this.mainPlayer.setIdAndName(e.charID, e.charName);
    });

    addOverlayListener("InCombat", (e) => {
      let event: PluginEvent;
      if (this.mainPlayer.isInCombat !== e.inGameCombat)
        event = PluginEvent.OutOfCombat + (~~e.inGameCombat);
      else if (this.mainPlayer.isInACTCombat !== e.inACTCombat)
        event = PluginEvent.ACTOutOfCombat + (~~e.inACTCombat);

      this.mainPlayer.isInCombat = e.inGameCombat;
      this.mainPlayer.isInACTCombat = e.inACTCombat;
      if ((event === PluginEvent.ACTInCombat || event === PluginEvent.InCombat))
        return;
      this.encounterController.onNotify(null, event);
    });

    
    startOverlayEvents();

    window.setInterval(() => { this.#updateMainPlayersCoords(); }, 1000);
  }

  #initObservers = () => {
    this.zone.initParserObservers(this.logLineParser);
    this.encounterController.initParserObservers(this.logLineParser);
  }

  #initBarserListeners() {
    this.zone.addEventListener(ListenerEvents.InstanceEnter, () => {
      
    });
  }

  #updateMainPlayersCoords() {
    this.getCombatants([parseInt(this.mainPlayer.id, 16)]).then((res) => {
      if (!res || res.combatants.length == 0)
        return;
      const player = <OverlayPluginCombatant>res.combatants[0];
      this.mainPlayer.setCoords(player.PosX, player.PosY, player.PosZ);
    });
  }

  getCombatants(ids: string[]|number[]) {
    return callOverlayHandler({ call: 'getCombatants', ids: ids });
  }



  addEventListener(event: ListenerEvents, callback: () => void) {
    if (!ListenerEvents[event]) {
      console.warn(`The event '${event}' doesn't exist`);
      return;
    }
    this.eventEmitters[event].addEventListener(event, callback);
  }

  start() {
    this.timer.start();
    this.updateHandle = window.setInterval(() => { this.update(); }, this.updateInterval);
  }

  update() {
    this.timer.update();
    console.log(`${this.timer.formattedTime}.${this.timer.formattedMilliseconds}`);
  }

  end() {
    this.timer.stop();
    window.clearInterval(this.updateHandle);
    this.update();
    this.timer.reset();
  }

  setEncounterKickoffMethod() {

  }

  setEncounterSplitMethod() {

  }


  setFormatter() {
    
  }

  #turnOnActionsManager() {
    
  }

}

