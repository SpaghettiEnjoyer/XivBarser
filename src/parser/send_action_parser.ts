import { DamageActionHitType, DamageActionStatus, DamageType, PluginEvent } from "../consts/enums";
import { SendDmgActionData, SendEffectActionData, SendHealActionData } from "../data_representation/events_data";
import { EfficientSubject } from "../utilities/efficient_subject";
import { Subject } from "../utilities/subject";
import { ILogLineParser } from "./log_line_parser";


// B for draw
// F for infinite self buffs?

export class SendActionParser extends EfficientSubject implements ILogLineParser {
  execute(logLine21: string[]): void {
    const flags = parseInt(logLine21[Field.Flags], 16);
    if (Exclusions[flags])
      return;
    const casterId = logLine21[Field.CasterId];
    const casterName = logLine21[Field.CasterName];
    const actionId = logLine21[Field.ActionId];
    const actionName = logLine21[Field.ActionName];
    const targetId = logLine21[Field.TargetId];
    const targetName = logLine21[Field.TargetName];
    const sequenceNumber = logLine21[Field.SequenceNumber];
    const basicData = [casterId, casterName, actionId, actionName, targetId, targetName, sequenceNumber] as const;

    
    const actionType = <ActionTypeFlag>(flags & actionTypeMask);
    switch (actionType) {
      case ActionTypeFlag.DodgedDamage:
      case ActionTypeFlag.BlockedDamage:
      case ActionTypeFlag.ParriedDamage:
      case ActionTypeFlag.NormalDamage:
      case ActionTypeFlag.InvulnedDamage:
        const dmgAmount = parseInt(logLine21[Field.DmgOrHealAmount]);
        const actionStatus = <DamageActionStatus>(<number>actionType);
        const hitType = <DamageActionHitType>(flags & dmgHitTypeMask);
        let dmgType: DamageType = DamageType.Physical;
        {
          const dmgElementFlag = <DamageElementFlag>(flags & dmgElementMask);
          const dmgTypeFlag = <DamageTypeFlag>(flags & dmgTypeMask);
          if (dmgTypeFlag === DamageTypeFlag.Magical)
            dmgType = (dmgElementFlag === DamageElementFlag.Unaspected) ? DamageType.Unaspected : DamageType.Magical;
        }
        const comboFlag = (flags & comboMask);
        const casterXPos = parseFloat(logLine21[Field.CasterXPos]);
        const casterYPos = parseFloat(logLine21[Field.CasterYPos]);
        const casterZPos = parseFloat(logLine21[Field.CasterZPos]);
        super.notify(new SendDmgActionData(...basicData, dmgAmount, actionStatus, hitType, dmgType, comboFlag, casterXPos, casterYPos, casterZPos)
                     , PluginEvent.SendDmgAction);
        break;
      case ActionTypeFlag.Heal:
        const healAmount = parseInt(logLine21[Field.DmgOrHealAmount]);
        const isCrit = (flags & healHitTypeMask) === healCritFlag;
        super.notify(new SendHealActionData(...basicData, healAmount, isCrit), PluginEvent.SendHealAction);
        break;
      case ActionTypeFlag.Effect: 
        super.notify(new SendEffectActionData(...basicData), PluginEvent.SendEffectAction);
        break;
      default:
        console.warn("[SendActionParser] Unknown ActionTypeFlag in log line:");
        console.warn(logLine21);
        break;
    }
  }
}

enum Field {
  CasterId = 2,
  CasterName = 3,
  ActionId = 4,
  ActionName = 5,
  TargetId = 6,
  TargetName = 7,
  Flags = 8,
  DmgOrHealAmount = 9,
  CasterXPos = 40,
  CasterYPos = 41,
  CasterZPos = 42,
  SequenceNumber = 44
}


enum Exclusions {
  StatuslessEffect = 0x00000000,
  Mount = 0x00000128,
  Teleport = 0x0000003C,
  Return = 0x0000003C,
  PetSummon = 0x0000003D// maybe
}

const mountFlag = 0x00000128;

const actionTypeMask = 0x0000000F;
enum ActionTypeFlag {
  DodgedDamage = 0x00000001,
  NormalDamage = 0x00000003,
  Heal = 0x00000004,
  BlockedDamage = 0x00000005,
  ParriedDamage = 0x00000006,
  InvulnedDamage = 0x00000007,
  InvulnedHeal = 0x00000008,
  Effect = 0x0000000E,
  
}

const dmgHitTypeMask = 0x00000F00;
const healHitTypeMask = 0x000F0000;
const healCritFlag = 0x00010000;

const dmgTypeMask = 0x000F0000;
enum DamageTypeFlag {
  PhysMelee = 0x00010000,
  PhysRanged = 0x00020000,
  PhysMonster = 0x00030000,
  Magical = 0x00050000
}

const dmgElementMask = 0x00F00000;
enum DamageElementFlag {
  Fire = 0x000100000,
  Ice = 0x000200000,
  Wind = 0x000300000,
  Earth = 0x000400000,
  Thunder = 0x000500000,
  Water = 0x000600000,
  Unaspected = 0x000700000
}

const comboMask = 0xFF000000;

// melee physical action:  0x10000
// ranged physical action: 0x20000
// hybrid? mobs that swap between melee and magic/ranged actions: 0x30000
// magical action: 0x50000
// fire: 0x100000
// ice: 0x200000
// wind: 0x300000
// stone: 0x400000
// thunder: 0x500000
// water: 0x600000
// unaspected: 0x700000
// unaspected magical are 0x750000
// physical actions are 0x710000