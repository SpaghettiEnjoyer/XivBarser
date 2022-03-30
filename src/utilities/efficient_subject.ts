import { ParsablePluginEvent, PluginEvent } from "../consts/enums";
import { Observer } from "./observer";

export class EfficientSubject {
  private observers: { [key in ParsablePluginEvent]?: Set<Observer> } = {};

  constructor(...parsableEvents: ParsablePluginEvent[]) {
    for (let i = 0; i != parsableEvents.length; ++i)
      this.observers[parsableEvents[i]] = new Set<Observer>();
  }

  addObserver(observer: Observer, parsableEvent: ParsablePluginEvent) {
    this.observers[parsableEvent].add(observer);
  }
  
  removeObserver(observer: Observer, parsableEvent: ParsablePluginEvent) {
    this.observers[parsableEvent].delete(observer);
  }

  notify(data: any, event: PluginEvent) {
    const observers = this.observers[event];
    for(let observer of observers.values())
      observer.onNotify(data, event);
  }
}
