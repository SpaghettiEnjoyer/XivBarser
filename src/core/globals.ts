var mainPlayerId: string;
var isInCombat: boolean;
function getCombatants(ids: string[]) {
  return callOverlayHandler({ call: 'getCombatants', ids: ids });
}