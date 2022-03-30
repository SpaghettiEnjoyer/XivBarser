// FIXED VALUE = IMPORTANT
export enum PluginEvent {
  OutOfCombat = 0,
  InCombat = 1,
  ACTOutOfCombat = 2,
  ACTInCombat = 3,
  ZoneChange = 4,
  CombatantSpawn = 5,
  CombatantDespawn = 6,
  SendDmgAction = 7,
  SendHealAction = 8,
  SendEffectAction = 9,
  ExecuteAction = 10,
  InstanceChange = 11,
  Wipe = 12,
  Victory = 13,
  Downtime
}export enum ParsablePluginEvent {
  ZoneChange = 4,
  CombatantSpawn = 5,
  CombatantDespawn = 6,
  SendDmgAction = 7,
  SendHealAction = 8,
  SendEffectAction = 9,
  ExecuteAction = 10,
  InstanceChange = 11,
  Wipe = 12,
  Victory = 13,
}

export enum LogLineEvent {
  ZoneChange = "01",
  PrimayPlayerChange = "02",
  CombatantSpawn = "03",
  CombatantDespawn = "04",
  PartyList = "11",
  PlayerStatsChange = "12",
  SendAction = "21",
  SendAoeAction = "22",
  DotTick = "24",
  Death = "25",
  ApplyBuff = "26",
  RemoveBuff = "30",
  GaugeChange = "31",
  ActorControl = "33",
  NameplateToggle = "34",
  ExecuteAction = "37",
  StatusEffectChange = "38"
}




export enum InstanceType {
  OpenWorld = "OpenWorld",
  Dungeon = "Dungeon", // ID 1-4999
  Trial = "Trial", // ID 20001-24999
  Raid = "Raid", // ID 30001-34999. has raids, alliances & ultimates
  Pvp = "Pvp", // 40001-54999
  DeepDungeon = "DeepDungeon",// 60001-60099
  Other = "Other"
}

// match their flag indicated in the log line 21/22
export enum DamageActionStatus {
  Dodged = 0x000000001,
  Normal = 0x000000003,
  Blocked = 0x000000005,
  Parried = 0x000000006,
  Invulned = 0x000000007
}

// match their flag indicated in the log line 21/22
export enum DamageActionHitType {
  Normal = 0x00000000,
  Crit = 0x00000100,
  Dh = 0x00000200,
  CritDh = 0x00000300
}

export enum DamageType {
  Physical,
  Magical,
  Unaspected
}

export enum CombatantType {
  Player,
  Pet,
  Chocobo,
  NPC
}

export enum EncounterStarterMode {
  Legacy = "Legacy",
  LegacyWithDistanceConstraint = "LegacyWithDistanceConstraint",
  OnceInCombat = "OnceInCombat",
  OnPartyMemberAttack = "OnPartyMemberAttack"
}

export enum EncounterEnderMode {
  Legacy = "Legacy",
  OnceOutOfCombat = "OnceOutOfCombat",
  OnWipeOrVictory = "OnWipeOrVictory",
  OnVictory = "OnVictory"
}

export enum EncounterPhaserMode {
  Off = "Off",
  OnceOutOfCombat = "OnceOutOfCombat",
  OnceACTOutOfCombat = "OnceACTOutOfCombat",
  OnDowntime = "OnDowntime"
}

export enum ListenerEvents {
  InstanceEnter = "InstanceEnter",
  InstanceExit = "InstanceExit"
}

export enum PartyStatus {
  NotInParty = "NotInParty",
  PartyMember = "PartyMember",
  AllianceMember = "AllianceMember"
}
