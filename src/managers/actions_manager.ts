import { PluginEvent } from "../consts/enums";
import { EncounterStarter } from "../core/encounter_starter";
import { Combatants } from "../data_representation/combatants";
import { ExecuteActionData, SendActionData, SendDmgActionData, SendEffectActionData, SendHealActionData } from "../data_representation/events_data";
import { Parser } from "../parser/parser";
import { Observer } from "../utilities/observer";
import { Subject } from "../utilities/subject";
import { ActionsProcessor } from "./actions_processor";

type SentActionMapEntry = { actionEvent: PluginEvent, actionData: SendActionData };

export class ActionsManager implements Observer {
  private sentActions = new Map<string, SentActionMapEntry>();
  private sentActionsPerTarget = new Map<string, string>();
  private receiver: ActionsProcessor | EncounterStarter
  constructor(private actionsProcessor: ActionsProcessor, private encounterStarter: EncounterStarter) {
    this.receiver = encounterStarter;
  }
  initParserObservers(parser: Parser): void {
    throw new Error("Method not implemented.");
  }

  onNotify(data: any, event: PluginEvent): void {
    switch(event) {
      case PluginEvent.SendDmgAction:
      case PluginEvent.SendHealAction:
      case PluginEvent.SendEffectAction:
        const casterId = data.casterId; // idc lmao
        this.sentActions.set(casterId, { actionEvent: event, actionData: data }); // I'm keeping data as any
        this.sentActionsPerTarget.set(data.targetId, data.sequenceNumber);
        break;
      case PluginEvent.ExecuteAction:
        const sequenceNumber = (<ExecuteActionData>data).sequenceNumber;
        const sentAction = this.sentActions.get(sequenceNumber);
        //this.receiver.handleAction(sentAction.actionData, sentAction.actionEvent);
    }
  }

  #processAction(sentAction: SentActionMapEntry) {
    /*
    const actionEvent = sentAction.actionEvent;
    const actionData = sentAction.actionData;
    
    const caster = this.combatants.get(actionData.casterId);
    const target = this.combatants.get(actionData.targetId);
    
    switch (actionEvent) {
      case PluginEvents.SendDmgAction:
        const dmgActionData = <SendDmgActionData>actionData;
        caster.dealDamage(target, dmgActionData.dmgAmount);
        break;
      case PluginEvents.SendHealAction:
        const healActionData = <SendHealActionData>actionData;
        caster.heal(target, healActionData.healAmount)
        break;
      
      // case PluginEvents.SendEffectAction: don't care for this atm. EffectsManager will take care of the actual effects
    }
    this.sentActions.delete(actionData.sequenceNumber);
    this.sentActionsPerTarget.delete(actionData.targetId);*/
  }
}