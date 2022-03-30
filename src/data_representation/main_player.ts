export class MainPlayer {
  public id: string;
  public name: string;
  public xPos: number;
  public yPos: number;
  public zPos: number;
  public isInCombat: boolean;
  public isInACTCombat: boolean;

  setCoords(x: number, y: number, z: number) {
    this.xPos = x;
    this.yPos = y;
    this.zPos = z;
  }

  setIdAndName(id: string | number, name: string) {
    if (typeof id === "number")
      id = id.toString(16);
    this.id = id;
    this.name = name;
  }

  setCombatState(isInCombat: boolean) {
    this.isInCombat = isInCombat;
  }

  distance(x: number, y: number, z: number) {
    //d = ((x2 - x1)2 + (y2 - y1)2 + (z2 - z1)2)1/2  
    return Math.pow(Math.pow(x - this.xPos, 2) + Math.pow(y - this.yPos, 2) + Math.pow(z - this.zPos, 2), 0.5);
  }
}