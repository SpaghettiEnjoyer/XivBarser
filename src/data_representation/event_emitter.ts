import { ListenerEvents } from "../consts/enums";

export class EventEmitter {
  protected listeners: { [key: string]: Set<() => void> } = { };

  constructor(events: ListenerEvents[]) {
    console.log(this.listeners);
    for (let i = 0; i != events.length; ++i)
      this.listeners[events[i]] = new Set<() => void>();
  }

  addEventListener(event: ListenerEvents, callback: () => void) {
    this.listeners[event].add(callback);
  }

  removeEventListener(event: ListenerEvents, callback: () => void) {
    this.listeners[event].delete(callback);
  }

  invokeEventListeners(event: ListenerEvents) {
    const set = this.listeners[event];
    for (let callback of set.values())
      callback();
  }
}