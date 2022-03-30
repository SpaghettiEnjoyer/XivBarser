
export class Attributes {
  static STR = 1;
  static DEX = 2;
  static INT = 3;
  static MND = 4;
}

export class JobType {
  static DoW = 1;
  static DoM = 2;
}


const [MELEE_AUTO_POTENCY, RANGED_AUTO_POTENCY] = [110, 100];
const DH_BONUS = 1.25;


const JOBS_EXTENDED_INFO = {
  "1" : { name: "GLA", type: JobType.DoW, mainstat: Attributes.STR, autoPotency: MELEE_AUTO_POTENCY , mainstatMod: 95 , traitsBonus: 1.0},
  "2" : { name: "PGL", type: JobType.DoW, mainstat: Attributes.STR, autoPotency: MELEE_AUTO_POTENCY , mainstatMod: 100, traitsBonus: 1.0},
  "3" : { name: "MRD", type: JobType.DoW, mainstat: Attributes.STR, autoPotency: MELEE_AUTO_POTENCY , mainstatMod: 100, traitsBonus: 1.0},
  "4" : { name: "LNC", type: JobType.DoW, mainstat: Attributes.STR, autoPotency: MELEE_AUTO_POTENCY , mainstatMod: 105, traitsBonus: 1.0},
  "5" : { name: "ARC", type: JobType.DoW, mainstat: Attributes.DEX, autoPotency: RANGED_AUTO_POTENCY, mainstatMod: 105, traitsBonus: 1.2},
  "6" : { name: "CNJ", type: JobType.DoM, mainstat: Attributes.MND, autoPotency: MELEE_AUTO_POTENCY , mainstatMod: 105, traitsBonus: 1.3},
  "7" : { name: "THM", type: JobType.DoM, mainstat: Attributes.INT, autoPotency: MELEE_AUTO_POTENCY , mainstatMod: 105, traitsBonus: 1.3},
  "19": { name: "PLD", type: JobType.DoW, mainstat: Attributes.STR, autoPotency: MELEE_AUTO_POTENCY , mainstatMod: 100, traitsBonus: 1.0},
  "20": { name: "MNK", type: JobType.DoW, mainstat: Attributes.STR, autoPotency: MELEE_AUTO_POTENCY , mainstatMod: 110, traitsBonus: 1.0},
  "21": { name: "WAR", type: JobType.DoW, mainstat: Attributes.STR, autoPotency: MELEE_AUTO_POTENCY , mainstatMod: 105, traitsBonus: 1.0},
  "22": { name: "DRG", type: JobType.DoW, mainstat: Attributes.STR, autoPotency: MELEE_AUTO_POTENCY , mainstatMod: 115, traitsBonus: 1.0},
  "23": { name: "BRD", type: JobType.DoW, mainstat: Attributes.DEX, autoPotency: RANGED_AUTO_POTENCY, mainstatMod: 115, traitsBonus: 1.2},
  "24": { name: "WHM", type: JobType.DoM, mainstat: Attributes.MND, autoPotency: MELEE_AUTO_POTENCY , mainstatMod: 115, traitsBonus: 1.3},
  "25": { name: "BLM", type: JobType.DoM, mainstat: Attributes.INT, autoPotency: MELEE_AUTO_POTENCY , mainstatMod: 115, traitsBonus: 1.3},
  "26": { name: "ACN", type: JobType.DoM, mainstat: Attributes.INT, autoPotency: MELEE_AUTO_POTENCY , mainstatMod: 105, traitsBonus: 1.3},
  "27": { name: "SMN", type: JobType.DoM, mainstat: Attributes.INT, autoPotency: MELEE_AUTO_POTENCY , mainstatMod: 115, traitsBonus: 1.3},
  "28": { name: "SCH", type: JobType.DoM, mainstat: Attributes.MND, autoPotency: MELEE_AUTO_POTENCY , mainstatMod: 115, traitsBonus: 1.3},
  "29": { name: "ROG", type: JobType.DoW, mainstat: Attributes.DEX, autoPotency: MELEE_AUTO_POTENCY , mainstatMod: 100, traitsBonus: 1.0},
  "30": { name: "NIN", type: JobType.DoW, mainstat: Attributes.DEX, autoPotency: MELEE_AUTO_POTENCY , mainstatMod: 110, traitsBonus: 1.0},
  "31": { name: "MCH", type: JobType.DoW, mainstat: Attributes.DEX, autoPotency: RANGED_AUTO_POTENCY, mainstatMod: 115, traitsBonus: 1.2},
  "32": { name: "DRK", type: JobType.DoW, mainstat: Attributes.STR, autoPotency: MELEE_AUTO_POTENCY , mainstatMod: 105, traitsBonus: 1.0},
  "33": { name: "AST", type: JobType.DoM, mainstat: Attributes.MND, autoPotency: MELEE_AUTO_POTENCY , mainstatMod: 115, traitsBonus: 1.3},
  "34": { name: "SAM", type: JobType.DoW, mainstat: Attributes.STR, autoPotency: MELEE_AUTO_POTENCY , mainstatMod: 112, traitsBonus: 1.0},
  "35": { name: "RDM", type: JobType.DoM, mainstat: Attributes.MND, autoPotency: MELEE_AUTO_POTENCY , mainstatMod: 115, traitsBonus: 1.3},
  "36": { name: "BLU", type: JobType.DoM, mainstat: Attributes.MND, autoPotency: MELEE_AUTO_POTENCY , mainstatMod: 115, traitsBonus: 1.5},
  "37": { name: "GNB", type: JobType.DoW, mainstat: Attributes.STR, autoPotency: MELEE_AUTO_POTENCY , mainstatMod: 110, traitsBonus: 1.0},
  "38": { name: "DNC", type: JobType.DoW, mainstat: Attributes.DEX, autoPotency: MELEE_AUTO_POTENCY , mainstatMod: 115, traitsBonus: 1.2}
}


const DOM_STR_MODS = {
  // "6" : 50, // CNJ
  // "7" : 40, // THM
  "24": 55, // WHM
  "25": 45, // BLM
  // "26": 86, // ACN
  "27": 90, // SMN
  "28": 90, // SCH
  "33": 50, // AST
  "35": 55, // RDM
  "36": 70  // BLU
}

const JOB_GAUGES = {
  // Only have need for these two to calculate nDPS:
  "23": { G1_INDEX: 3, G1_MASK: 0xF0000   , G2_INDEX: 4, G2_MASK: 0x0FF    , G3_INDEX: -1, G3_MASK: 0x0      }, // BRD: Repertoire        > Soul Voice     > N/A
  "25": { G1_INDEX: 4, G1_MASK: 0x000FF00 , G2_INDEX: 4, G2_MASK: 0xF000000, G3_INDEX:  4, G3_MASK: 0x00F0000}, // BLM: Astral Fire/Ice   > Umbral Hearts  > Polyglot
  // "19": { G1_INDEX: 3, G1_MASK: 0xFF00    , G2_INDEX: 4, G2_MASK: 0x0      }, // PLD: Oath Gauge        > N/A
  // "20": { G1_INDEX: 3, G1_MASK: 0xF00     , G2_INDEX: 4, G2_MASK: 0x0      }, // MNK: Chakras           > N/A
  // "21": { G1_INDEX: 3, G1_MASK: 0xFF00    , G2_INDEX: 4, G2_MASK: 0x0      }, // WAR: Beast Gauge       > N/A
  // "22": { G1_INDEX: 3, G1_MASK: 0x0       , G2_INDEX: 4, G2_MASK: 0x0      }, // DRG: N/A               > N/A
  // "24": { G1_INDEX: 4, G1_MASK: 0x00F00   , G2_INDEX: 4, G2_MASK: 0xF0000  }, // WHM: Lily              > Blood Lily
  // "27": { G1_INDEX: 4, G1_MASK: 0xFF00    , G2_INDEX: 4, G2_MASK: 0x0      }, // SMN: Aetherflow Stacks + Dreadwyrm Aether Stacks (4 each) + Firebird Trance (gives 16) 🤡          > Blood Lily
  // "28": { G1_INDEX: 3, G1_MASK: 0xF000000 , G2_INDEX: 4, G2_MASK: 0xFF     }, // SCH: Aetherflow Stacks > Faerie Gauge
  // "30": { G1_INDEX: 4, G1_MASK: 0xF0000   , G2_INDEX: 4, G2_MASK: 0x0FF00  }, // NIN: Huton Usage       > Ninki
  // "31": { G1_INDEX: 4, G1_MASK: 0x00FF00  , G2_INDEX: 4, G2_MASK: 0xFF0000 }, // MCH: Heat Gauge        > Battery
  // "32": { G1_INDEX: 3, G1_MASK: 0x0000FF00, G2_INDEX: 4, G2_MASK: 0x000F00 }, // DRK: Darkside Gauge    > Dark Arts
  // "33": { G1_INDEX: 4, G1_MASK: 0x0000F00 , G2_INDEX: 4, G2_MASK: 0x0000000}, // AST: Drawn Card        > Combination code? cba

  /*
  21|200 Bole card
  21|10000 balance seal
  21|10300 arrow card
  21|2010000 arrow seal
  21|2010200 Bole card
  21|2010000|E0000001 balance seal (dup)
  21|2010600 spire card
  21|1020000 fixed dup
  */

}

const PET_IDS = [ 
  10489, // Esteem
  10897, // Bunshin
  3256,  // Rook Autoturret
  10490, // Automaton Queen
  1013,  // Ifrit
  1014,  // Titan
  1015,  // Garuda
  6982,  // Demi-Bahamut
  10488, // Demi-Phoenix
 ]; 

const PET_MAINSTAT_MODS = {
  "id": 1
}

const PET_TRAITS_BONUS = {
  "id": 1
}

const LVL_MODIFIERS = {
  "80": { main: 340, sub: 380, div: 3300.0 }
}


const RACE_MODIFIERS = {
  "1" : { str: 22, dex: 19, int: 23, mnd: 19 }, // Midlander
  "2" : { str: 23, dex: 20, int: 18, mnd: 20 }, // Highlander
  "3" : { str: 20, dex: 23, int: 22, mnd: 19 }, // Wildwood
  "4" : { str: 20, dex: 20, int: 23, mnd: 21 }, // Duskwight
  "5" : { str: 19, dex: 23, int: 22, mnd: 20 }, // Plainsfolk
  "6" : { str: 19, dex: 21, int: 22, mnd: 23 }, // Dunesfolk
  "7" : { str: 22, dex: 23, int: 19, mnd: 19 }, // Seekers of the Sun
  "8" : { str: 19, dex: 22, int: 21, mnd: 23 }, // Keepers of the Moon
  "9" : { str: 22, dex: 19, int: 18, mnd: 21 }, // Sea Wolves
  "10": { str: 20, dex: 18, int: 20, mnd: 22 }, // Hellsguard
  "11": { str: 19, dex: 22, int: 20, mnd: 23 }, // Raen
  "12": { str: 23, dex: 20, int: 20, mnd: 18 }, // Xaela
  "13": { str: 23, dex: 17, int: 17, mnd: 23 }, // Helions
  "14": { str: 23, dex: 17, int: 17, mnd: 23 }, // The Lost
  "15": { str: 20, dex: 23, int: 21, mnd: 21 }, // Rava
  "16": { str: 19, dex: 20, int: 23, mnd: 22 }, // Veena
}