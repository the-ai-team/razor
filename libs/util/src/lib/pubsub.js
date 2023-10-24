"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSub = void 0;
class PubSub {
    constructor() {
        this.events = {};
    }
    subscribe(eventName, fn) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(fn);
        console.log(`Subscribed to ${eventName}`);
    }
    unsubscribe(eventName, fn) {
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);
            console.log(`Unsubscribed from ${eventName}`);
        }
    }
    publish(eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(fn => {
                fn(data);
            });
            console.log(`Published to ${eventName}`);
        }
    }
}
exports.PubSub = PubSub;
//# sourceMappingURL=pubsub.js.map