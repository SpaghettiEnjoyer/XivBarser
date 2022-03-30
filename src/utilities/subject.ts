import { PluginEvent } from "../consts/enums";
import { Observer } from "./observer";

export class Subject {
  public observers = new Set<Observer>();
  public addObserver(observer: Observer) {
    this.observers.add(observer);
  }
  public removeObserver(observer: Observer) {
    this.observers.delete(observer);
  }
  public notify(data: any, event: PluginEvent) {
    for(let observer of this.observers.values())
      observer.onNotify(data, event);
  }
}
