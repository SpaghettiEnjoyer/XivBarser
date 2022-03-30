
declare global {
  type JsObj = {[key: string]: any};
  type OverlayPluginCombatant = {
    CurrentWorldID?: number;
    WorldID?: number;
    WorldName?: string;
    BNpcID?: number;
    BNpcNameID?: number;
    PartyType?: number;
    ID?: number;
    OwnerID?: number;
    type?: number;
    Job?: number;
    Level?: number;
    Name?: string;
    CurrentHP: number;
    MaxHP: number;
    CurrentMP: number;
    MaxMP: number;
    PosX: number;
    PosY: number;
    PosZ: number;
    Heading: number;
  }
  function callOverlayHandler(obj: {call: string, [keys: string]: any}): Promise<any>;
  function addOverlayListener(event: string, callback: (e: JsObj) => void): void;
  function removeOverlayListener(event: string, callback: (e: JsObj) => void): void;
  function startOverlayEvents(): void;
  
}

export = global;
