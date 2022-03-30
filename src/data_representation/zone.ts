import { PluginEvent, InstanceType, ListenerEvents, ParsablePluginEvent } from "../consts/enums";
import { Parser } from "../parser/parser";
import { Observer } from "../utilities/observer";
import { InstanceChangeData, ZoneChangeData } from "./events_data";
import { EventEmitter } from "./event_emitter";

export class Zone extends EventEmitter implements Observer {
  public id: number;
  public name: string;
  public isInstanced: boolean;
  public instanceType: InstanceType;
  public instanceId: number;

  constructor(events: ListenerEvents[]) {
    super(events);
  }

  initParserObservers(parser: Parser): void {
    parser.addObserver(this, ParsablePluginEvent.ZoneChange, ParsablePluginEvent.InstanceChange);
  }

  onNotify(data: ZoneChangeData | InstanceChangeData, event: PluginEvent) {
    switch (event) {
      case PluginEvent.ZoneChange: 
        const zoneData = data as ZoneChangeData
        const justExitedInstance = this.isInstanced;
        this.setZone(zoneData.id, zoneData.name);
        if (justExitedInstance)
          super.invokeEventListeners(ListenerEvents.InstanceExit);
        break;
      case PluginEvent.InstanceChange:
        const instanceData = data as InstanceChangeData;
        const justEnteredInstance = !this.isInstanced && instanceData.isInstanced;
        this.setInstance(instanceData.instanceId, instanceData.instanceType);
        if (justEnteredInstance)
          super.invokeEventListeners(ListenerEvents.InstanceExit);
        break;
    }
    console.log(this);
  }

  setZone(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.isInstanced = false;
    this.instanceType = InstanceType.OpenWorld;
    this.instanceId = 0;
  }

  setInstance(id: number, type: InstanceType) {
    //console.log(id);
    this.instanceId = id;
    this.instanceType = type;
    this.isInstanced = true;
  }
}