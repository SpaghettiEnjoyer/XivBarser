import { CombatantBase } from "./combatant_base";
import { CombatantOutput } from "./combatant_output";
import { Monster } from "./monster";
import { StrayPet } from "./pets";
import { Player, PlayerWithStats } from "./players";


class Combatants {
  private missingPetOwners = new Map<string, StrayPet>(); // player id -> stray pets
  public mainPlayer: PlayerWithStats;
  public map = new Map<string, CombatantBase>();
  public playerOutputs = new Array<CombatantOutput>();
  public hasJustAddedDataFromHandler: boolean;

  public constructor() {
    // this.table.addRow(addedPlayerOutput) -> add a row element and fill it with info. also bind the row to the object in the table
    // 

    this.hasJustAddedDataFromHandler = false;
  }

  public add(id: string, name: string, jobId: number, lvl: number, ownerId: string, currentHp: number, maxHp: number) {
    if (id[0] === '1') { // is player
      const player = this.map.get(id);
      if (!player) { // add player
        const player = new Player(id, name, jobId, lvl, maxHp, currentHp);
        this.map.set(id, player);
        this.playerOutputs.push(player.output);
        const strayPet = this.missingPetOwners.get(id);
        if (strayPet) {
          this.map.set(strayPet.id, player.createPetFromStray(strayPet));
          this.missingPetOwners.delete(id);
        }
      }
      else { // only requires update
        // player.updateJob(jobId, lvl, maxHp, currentHp);
      }
    }
    
    else if (id[0] === '4') { // is pet or monster
      if (ownerId[0] === '1') { // add pet
        const owner = this.map.get(ownerId);
        if (owner) {
          (owner as Player).createPet(id, name, jobId, lvl, maxHp, currentHp);
        }
        else {
          const pet = new StrayPet(id, name, jobId, lvl, maxHp, currentHp)
          this.missingPetOwners.set(ownerId, pet)
          this.map.set(id, pet);
        }
      }
      else {
        this.map.set(id, new Monster(id, name, jobId, lvl, maxHp, currentHp));
      }
    }
  }

  // this is for when the overlay is started mid fight or something
  /*
  addFromHandler(res) {
    this.hasJustAddedDataFromHandler = true;
    const combatants = res.combatants;
    let combatant = combatants[0];
    let id = combatant.ID.toString(16).toUpperCase();
    this.mainPlayer = new PlayerWithStats(id, combatant.Name, combatant.Job, combatant.Level, combatant.MaxHP, combatant.CurrentHP);
    this.map.set(id, this.mainPlayer);

    const petsToAddLater = [];
    for (let i = 1; i != this.length; ++i) {
      combatant = combatants[i];
      if (combatant.type > 2) continue;
      id = combatant.ID.toString(16).toUpperCase();
      if (id[0] === "1") {
        this.map.set(id, new Player(id, combatant.Name, combatant.Job, combatant.Level, combatant.MaxHP, combatant.CurrentHP));
      }
      else if (id[0] === "4") {
        let ownerId = combatant.OwnerID.toString(16).toUpperCase();
        if (ownerId[0] === "1") {
          petsToAddLater.push({ id: id, name: combatant.Name, ownerId: ownerId });
        }
        else {
          this.map.set(id, new Monster(id, combatant.Name, combatant.MaxHP, combatant.CurrentHP));
        }
      }
    }

    for (let i = 0; i != petsToAddLater.length; ++i) {
      const pet = petsToAddLater[i];
      const owner = this.map.get(pet.ownerId);
      if (owner) {
        switch (owner.combatantType) {
          case 1: this.map.set(id, new PlayerWithStatsPet(pet.id, pet.name, owner)); break;
          case 2: this.map.set(id, new PlayerPet(pet.id, pet.name, owner)); break;
        }
      }
      else {
        const strayPet = new StrayPet(pet.id, pet.name)
        this.missingPetOwners.set(pet.ownerId, strayPet)
        this.map.set(pet.id, strayPet);
      }
    }
  }
  */

  get(combatantId: string) {
    return this.map.get(combatantId);
  }

  setMainPlayer(id, name) {
    this.map.delete(this.mainPlayer.id);
    this.mainPlayer.id = id;
    this.mainPlayer.name = name;
    this.map.set(id, this.mainPlayer);
  }

  removeFromLogLine(id, ownerId) {
    this.map.delete(id);
    this.missingPetOwners.delete(ownerId);
  }

  clear() {
    this.map.clear();
    if (this.mainPlayer)
      this.map.set(this.mainPlayer.id, this.mainPlayer);
    this.missingPetOwners.clear();
  }
}


