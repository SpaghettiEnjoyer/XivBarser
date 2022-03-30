import { DamageType } from "../consts/enums";
import { CombatantBase } from "../data_representation/combatant_base";


/*
class EffectsManager {
  static _methodMap = new Map([
    [DMG_BUFFS, EffectsManager._addDmgBuff],
    [SCALING_DMG_BUFFS, EffectsManager._addScalingDmgBuff],
    [DD_ALTERED_DMG_BUFFS, EffectsManager._addDdAlteredDmgBuff],

  ]);
  
  _allEffects = new Map();
  _dmgBuffs = new Map();

  addEffect(logLine26) {
    const fields = LOG_LINE_FIELDS["26"];
    const effectId = logLine26[fields.effectId].toUpperCase();
    const effectName = logLine26[fields.effectName];
    const casterId = logLine26[fields.casterId];
    const targetId = logLine26[fields.targetId];
    const stacks = logLine26[fields.stacks];

    const effect = EFFECTS[effectId];
    if (!effect) {
      const casterName = logLine26[fields.casterName];
      const targetName = logLine26[fields.targetName];
      console.log(`Unrecognized effect: ${effectName} (0x${effectId}) cast on ${targetName} by ${casterName}`);
      return;
    }

    const mapContainingEffect = EffectsManager._methodMap.get(effect.table)(effectId, effectName, casterId, targetId, stacks);
    EffectsManager._allEffects.set(`${targetId}:${effectId}`, mapContainingEffect);
  }

  
  removeEffect(logLine30) {
    const fields = LOG_LINE_FIELDS["30"];
    const effectId = logLine30[fields.effectId].toUpperCase();
    const effectName = logLine30[fields.effectName];
    const targetId = logLine30[fields.targetId];

    const mapContainingEffect = EffectsManager._allEffects.get(`${targetId}:${effectId}`);
    if (!mapContainingEffect) {
      const casterName = logLine30[fields.casterName];
      const targetName = logLine30[fields.targetName];
      console.log(`Unrecognized effect: ${effectName} (0x${effectId}) has faded from ${targetName}, and the caster was ${casterName}`);
      return;
    }

    mapContainingEffect.delete(effectId);
    console.log(EffectsManager._dmgBuffs);
    console.log(EffectsManager._allEffects);
  }




  private static _addDmgBuff(effectId, effectName, casterId, targetId) {
    const dmgBuffData = DMG_BUFFS[effectId];
    let target_dmgBuffs =  EffectsManager._dmgBuffs.get(targetId);
    const entry = new DmgBuffEntry(effectId, effectName, dmgBuffData.value, dmgBuffData.type, Combatants.map.get(casterId));

    if (target_dmgBuffs) {
      target_dmgBuffs.set(effectId, entry);
    }
    else {
      target_dmgBuffs = new Map();
      target_dmgBuffs.set(effectId, entry);
      EffectsManager._dmgBuffs.set(targetId, target_dmgBuffs);
    }
    return target_dmgBuffs;
  }

  private static _addScalingDmgBuff(effectId, effectName, casterId, targetId, stacks) {
    const dmgBuffData = SCALING_DMG_BUFFS[effectId];
    let target_dmgBuffs =  EffectsManager._dmgBuffs.get(targetId);
    const entry = new DmgBuffEntry(effectId, effectName, dmgBuffData.scalingValue * parseInt(stacks), dmgBuffData.type, Combatants.map.get(casterId));

    if (target_dmgBuffs) {
      target_dmgBuffs.set(effectId, entry);
    }
    else {
      target_dmgBuffs = new Map();
      target_dmgBuffs.set(effectId, entry);
      EffectsManager._dmgBuffs.set(targetId, target_dmgBuffs);
    }
    return target_dmgBuffs;
  }

  private static _addDdAlteredDmgBuff(effectId, effectName, casterId, targetId) {
    const dmgBuffData = DD_ALTERED_DMG_BUFFS[effectId];
    let target_dmgBuffs =  EffectsManager._dmgBuffs.get(targetId);
    const action = Cache.buffAlteringActions.get(casterId);
    const buffValue = dmgBuffData.dependencies[action];
    const entry = new DmgBuffEntry(effectId, effectName, buffValue, dmgBuffData.type, Combatants.map.get(casterId));

    if (target_dmgBuffs) {
      target_dmgBuffs.set(effectId, entry);
    }
    else {
      target_dmgBuffs = new Map();
      target_dmgBuffs.set(effectId, entry);
      EffectsManager._dmgBuffs.set(targetId, target_dmgBuffs);
    }
    return target_dmgBuffs;
  }

  
}
*/