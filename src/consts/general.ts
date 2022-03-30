export const LOG_LINE_FIELDS = {
  "3" : { id: 2, name: 3, jobId: 4, lvl: 5, ownerId: 6, baseId: 10, currentHp: 11, maxHp: 12 },
  "4" : { id: 2, ownerId: 6 },
  "21": { casterId: 2, actionId: 4, actionName: 5, targetId: 6, flags: 8, dmg: 9, targetCurrentHp: 24, targetMaxHp: 25, castId: 44 },
  "26": { effectId: 2, effectName: 3, casterId: 5, casterName: 6, targetId: 7, targetName: 8, stacks: 9 },
  "30": { effectId: 2, effectName: 3, casterId: 5, casterName: 6, targetId: 7, targetName: 8 }
};

export class Role {
  static Tank = 1;
  static Healer = 2;
  static DPS = 3;
}

// isMelee is for AST cards but might not even be needed
export const JOBS_BASIC_INFO = {
  "1" : { name: "GLA", role: Role.Tank  , isMelee: true , iconUnicode: "\uF001" },
  "2" : { name: "PGL", role: Role.DPS   , isMelee: true , iconUnicode: "\uF002" },
  "3" : { name: "MRD", role: Role.Tank  , isMelee: true , iconUnicode: "\uF003" },
  "4" : { name: "LNC", role: Role.DPS   , isMelee: true , iconUnicode: "\uF004" },
  "5" : { name: "ARC", role: Role.DPS   , isMelee: false, iconUnicode: "\uF005" },
  "6" : { name: "CNJ", role: Role.Healer, isMelee: false, iconUnicode: "\uF006" },
  "7" : { name: "THM", role: Role.DPS   , isMelee: false, iconUnicode: "\uF007" },
  "19": { name: "PLD", role: Role.Tank  , isMelee: false, iconUnicode: "\uF019" },
  "20": { name: "MNK", role: Role.DPS   , isMelee: true , iconUnicode: "\uF020" },
  "21": { name: "WAR", role: Role.Tank  , isMelee: true , iconUnicode: "\uF021" },
  "22": { name: "DRG", role: Role.DPS   , isMelee: true , iconUnicode: "\uF022" },
  "23": { name: "BRD", role: Role.DPS   , isMelee: false, iconUnicode: "\uF023" },
  "24": { name: "WHM", role: Role.Healer, isMelee: false, iconUnicode: "\uF024" },
  "25": { name: "BLM", role: Role.DPS   , isMelee: false, iconUnicode: "\uF025" },
  "26": { name: "ACN", role: Role.DPS   , isMelee: false, iconUnicode: "\uF026" },
  "27": { name: "SMN", role: Role.DPS   , isMelee: false, iconUnicode: "\uF027" },
  "28": { name: "SCH", role: Role.Healer, isMelee: false, iconUnicode: "\uF028" },
  "29": { name: "ROG", role: Role.DPS   , isMelee: true , iconUnicode: "\uF029" },
  "30": { name: "NIN", role: Role.DPS   , isMelee: true , iconUnicode: "\uF030" },
  "31": { name: "MCH", role: Role.DPS   , isMelee: false, iconUnicode: "\uF031" },
  "32": { name: "DRK", role: Role.Tank  , isMelee: true , iconUnicode: "\uF032" },
  "33": { name: "AST", role: Role.Healer, isMelee: false, iconUnicode: "\uF033" },
  "34": { name: "SAM", role: Role.DPS   , isMelee: true , iconUnicode: "\uF034" },
  "35": { name: "RDM", role: Role.DPS   , isMelee: false, iconUnicode: "\uF035" },
  "36": { name: "BLU", role: Role.DPS   , isMelee: false, iconUnicode: "\uF036" },
  "37": { name: "GNB", role: Role.Tank  , isMelee: true , iconUnicode: "\uF037" },
  "38": { name: "DNC", role: Role.DPS   , isMelee: false, iconUnicode: "\uF038" }
}

