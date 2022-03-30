import { EncounterStarterMode, InstanceType, PluginEvent } from "../consts/enums";
import { CombatantDespawnData, CombatantSpawnData, SendActionData, SendDmgActionData, SendEffectActionData, SendHealActionData } from "../data_representation/events_data";
import { Observer } from "../utilities/observer";
import { EncounterData } from "./data_component";
import { XivBarser } from "./xiv_barser";

export class EncounterStarter {
  public ownAggroList = new Set<String>();
  public nearbyPlayers = new Map<string, CombatantSpawnData>();
  public inCombatPlayers = new Set<string>();

  public monstersAggroList = new Map<String, String>();
  public isInCombat: boolean;

  public distanceConstraint: number;

  // TODO: pull out from here to a default settings file
  private instanceModes: { [key in InstanceType]: EncounterStarterMode } = {
    [InstanceType.OpenWorld]: EncounterStarterMode.OnceInCombat,
    [InstanceType.Dungeon]: EncounterStarterMode.Legacy,
    [InstanceType.Trial]: EncounterStarterMode.Legacy,
    [InstanceType.Raid]: EncounterStarterMode.Legacy,
    [InstanceType.DeepDungeon]: EncounterStarterMode.Legacy,
    [InstanceType.Pvp]: EncounterStarterMode.OnceInCombat,
    [InstanceType.Other]: EncounterStarterMode.Legacy
  }


  setMode(instanceType: InstanceType, mode: EncounterStarterMode) {
    this.instanceModes[instanceType] = mode;
  }


  shouldStart(instanceType: InstanceType, event: PluginEvent, distanceFromUser?: number, isAPartyMember?: boolean) {
    const mode = this.instanceModes[instanceType];
    switch (mode) {
      case EncounterStarterMode.Legacy:
        return event === PluginEvent.ACTInCombat;
      case EncounterStarterMode.OnceInCombat:
        return event === PluginEvent.InCombat;
      case EncounterStarterMode.LegacyWithDistanceConstraint:
        return distanceFromUser <= this.distanceConstraint;
      case EncounterStarterMode.OnPartyMemberAttack:
        return isAPartyMember;
    }
  }
}


// requires nothing
// default for instances
/* shouldStart(attackerId, playerId, attackedMonster) { add whoever
    return true;
}
*/

// requires constant checking of main player pos and using that to filter 37 lines on monsters
/* shouldStart(attackerId, playerId, attackedMonster) { add whoever with a distance constraint
    calculate distance thing
    return true if distance < constraint;
}
*/

// requires own aggro list
/* shouldStart(attackerId, playerId, attackedMonster) { add only those who attack my mobs but exclude data from before I attacked
    check if attackedMonster exist in player's aggro list
    return true if it exists;
}
*/

// requires own + monsters aggro list
// requires storing of actions
// default for open world.
/* shouldStart(attackerId, playerId, attackedMonster) { add only those who attack my mobs but also include data from before I attacked
    check if attackedMonster exist in player's aggro list

    return true if it exists;
}
*/