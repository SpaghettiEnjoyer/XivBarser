import { CombatantBase } from "./combatant_base";
import { PlayerPet, PlayerWithStatsPet, StrayPet } from "./pets";

export class Player extends CombatantBase {
  createPet(id: string, name: string, lvl: number, jobId: number, currentHp: number, maxHp: number) {
    const pet = new PlayerPet(id, name, lvl, jobId, currentHp, maxHp, this);
    return pet;
  }

  createPetFromStray(strayPet: StrayPet) {
    let pet = strayPet as PlayerPet;
    pet.owner = this;
    return pet;
    new PlayerPet(null, null, null, null, null, null, this);
    for (let key in strayPet)
      pet[key] = strayPet[key];
    return pet;
  }
}

export class PlayerWithStats extends Player {
  private weaponDmg = 0;
  private weaponDelay = 0;
  private mainstat = 0;
  private physAp = 0;
  private magicalAp = 0;
  private critPoints = 0;
  private detPoints = 0;
  private dhPoints = 0;
  private sksPoints = 0;
  private spsPoints = 0;
  private tncPoints = 0;
  private fWeaponDmg = 0;

  constructor(id, name, jobId, lvl, maxHp, currentHp) {
    super(id, name, jobId, lvl, maxHp, currentHp);
  }
  /*
  setStats(weaponDmg, weaponDelay, physAp, magicalAp, critPoints, detPoints, dhPoints, sksPoints, spsPoints, tncPoints) {
    this.weaponDmg = weaponDmg;
    this.weaponDelay = weaponDelay;
    this.physAp = physAp;
    this.magicalAp = magicalAp;
    this.critPoints = critPoints;
    this.detPoints = detPoints;
    this.dhPoints = dhPoints;
    this.sksPoints = sksPoints;
    this.spsPoints = spsPoints;
    this.tncPoints = tncPoints;
  }
  */
  public updateJob(jobId: number, lvl: number, maxHp: number, currentHp: number) {
    this.jobId = jobId;
    this.lvl = lvl;
    this.maxHp = maxHp;
    this.currentHp = currentHp;
  }

  public createPet(id: string, name: string, lvl: number, jobId: number, currentHp: number, maxHp: number): PlayerWithStatsPet {
    const pet = new PlayerWithStatsPet(id, name, lvl, jobId, currentHp, maxHp, this);
    return pet;
  }

  public createPetFromStray(strayPet: StrayPet) {
    let pet = strayPet as PlayerWithStatsPet;
    pet.owner = this;
    return pet;
    /*
    let pet = new PlayerWithStatsPet(null, null, this);
    for (let key in strayPet)
      pet[key] = strayPet[key];
    return pet;*/
  }
}
