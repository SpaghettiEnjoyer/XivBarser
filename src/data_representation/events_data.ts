import { DamageActionHitType, DamageActionStatus, DamageType, InstanceType } from "../consts/enums";

export class CombatantSpawnData {
  constructor(
    public id: string,
    public name: string,
    public jobId: number,
    public lvl: number,
    public ownerId: string,
    public currentHp: number,
    public maxHp: number
  ) { }
}

export class CombatantDespawnData {
  constructor(
    public id: string,
    public name: string,
    public jobId: number,
    public lvl: number,
    public ownerId: string,
    public currentHp: number,
    public maxHp: number
  ) { }
}

export class ZoneChangeData {
  constructor(
    public id: number,
    public name: string,
  ) { }
}

export interface SendActionData {
  casterId: string,
  casterName: string,
  actionId: string,
  actionName: string,
  targetId: string,
  targetName: string,
  sequenceNumber: string,
}

export class SendDmgActionData implements SendActionData {
  constructor(
    public casterId: string,
    public casterName: string,
    public actionId: string,
    public actionName: string,
    public targetId: string,
    public targetName: string,
    public sequenceNumber: string,
    public dmgAmount: number,
    public status: DamageActionStatus,
    public hitType: DamageActionHitType,
    public dmgType: DamageType,
    public comboFlag: number,
    public casterXPos: number,
    public casterYPos: number,
    public casterZPos: number
  ) { }
}

export class SendHealActionData implements SendActionData {
  constructor(
    public casterId: string,
    public casterName: string,
    public actionId: string,
    public actionName: string,
    public targetId: string,
    public targetName: string,
    public sequenceNumber: string,
    public healAmount: number,
    public isCrit: boolean
  ) { }
}

export class SendEffectActionData implements SendActionData {
  constructor(
    public casterId: string,
    public casterName: string,
    public actionId: string,
    public actionName: string,
    public targetId: string,
    public targetName: string,
    public sequenceNumber: string
  ) { }
}

export class InstanceChangeData {
  constructor(
    public isInstanced: boolean,
    public instanceType: InstanceType,
    public instanceId: number
  ) { }
}

export class ExecuteActionData {
  constructor(
    public targetId: string,
    public targetName: string,
    public sequenceNumber: string
  ) { }
}

/*



*/

