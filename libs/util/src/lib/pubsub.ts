type FuncType<T extends object> = (data: T) => void | Promise<void>;
interface Events {
  [key: string]: FuncType<object>[];
}

export class PubSub<EventMap extends Record<string, object>> {
  private events: Events = {};

  subscribe<Event extends string>(
    eventName: Event,
    fn: FuncType<EventMap[Event]>,
  ): void {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn as FuncType<object>);
    console.log(`Subscribed to ${eventName}`);
  }

  unsubscribe<Event extends string>(
    eventName: Event,
    fn: FuncType<EventMap[Event]>,
  ): void {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        eventFn => fn !== eventFn,
      );
      console.log(`Unsubscribed from ${eventName}`);
    }
  }

  publish<Event extends string>(eventName: Event, data: EventMap[Event]): void {
    if (this.events[eventName]) {
      this.events[eventName].forEach(fn => {
        fn(data);
      });
      console.log(`Published to ${eventName}`);
    }
  }
}
