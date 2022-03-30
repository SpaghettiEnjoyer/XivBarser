import { PluginEvent } from "../consts/enums";
import { Combatants } from "../data_representation/combatants";
import { Zone } from "../data_representation/zone";
import { ActionsManager } from "../managers/actions_manager";
import { Parser } from "../parser/parser";
import { Observer } from "../utilities/observer";
import { EncounterStarter } from "./encounter_starter";

export class EncounterData implements Observer {
  initParserObservers(parser: Parser): void {
    throw new Error("Method not implemented.");
  }
  onNotify(data: any, event: PluginEvent): void {
    throw new Error("Method not implemented.");
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