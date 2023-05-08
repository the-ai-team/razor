type FuncType<T extends object> = (data: T) => void | Promise<void>;
interface Events {
  [key: string]: FuncType<object>[];
}

export class PubSub {
  private events: Events = {};

  subscribe<T extends object>(eventName: string, fn: FuncType<T>): void {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn as FuncType<object>);
    console.log(`Subscribed to ${eventName}`);
  }

  unsubscribe<T extends object>(eventName: string, fn: FuncType<T>): void {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        eventFn => fn !== eventFn,
      );
      console.log(`Unsubscribed from ${eventName}`);
    }
  }

  publish<T extends object>(eventName: string, data: T): void {
    if (this.events[eventName]) {
      this.events[eventName].forEach(fn => {
        fn(data);
      });
      console.log(`Published to ${eventName}`);
    }
  }
}
