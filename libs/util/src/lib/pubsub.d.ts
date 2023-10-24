type FuncType<T extends object> = (data: T) => void | Promise<void>;
export declare class PubSub<EventMap extends Record<string, object>> {
    private events;
    subscribe<Event extends string>(eventName: Event, fn: FuncType<EventMap[Event]>): void;
    unsubscribe<Event extends string>(eventName: Event, fn: FuncType<EventMap[Event]>): void;
    publish<Event extends string>(eventName: Event, data: EventMap[Event]): void;
}
export {};
