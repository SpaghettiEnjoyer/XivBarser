import { PartyStatus } from "../consts/enums";
import { MainPlayer } from "./main_player";

export class PartyList {
  private map = new Map<string, PartyStatus>();

  constructor(private mainPlayer: MainPlayer) {
    addOverlayListener("PartyChanged", (e) => {
      console.log(e);
      this.map.clear();
      for (let i = 0; i != e.party.length; ++i) {
        const member = e.party[i];
        const partyStatus = member.inParty ? PartyStatus.PartyMember : PartyStatus.AllianceMember;
        this.map.set(member.id, partyStatus);
        //this.add(member.id);
      }
    });
  }

  add(id: string, partyStatus: PartyStatus) {
    this.map.set(id, partyStatus);
  }

  getPartyStatus(id: string) {
    return this.map.get(id);
  }

  contains(id: string) {
    return this.map.has(id);
  }

  /*
  party: Array(2)
    0:
    id: "10747283"
    inParty: true
    job: 33
    level: 0
    name: "Alerian Vinter"
    worldId: 66
    [[Prototype]]: Object
    1:
    id: "106C24E4"
    inParty: true
    job: 32
    level: 0
    name: "Wink Wink"
    worldId: 56
    [[Prototype]]: Object
    length: 2
    [[Prototype]]: Array(0)
  type: "PartyChanged"
    */
}