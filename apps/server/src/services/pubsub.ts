import { PubSub } from '@razor/util';

import { AllServerPubSubEventsToTypeMap } from '../models';

/**
 * Server pubsub has two types of events
 * 1. socket events from client - when client sends socket event it will be published to server pubsub
 *    Related event mapping - {@link socketEventsMap}
 * 2. server events - events triggered by server
 *    Related events - {@link PubSubEvents}
 */
export const pubsub = new PubSub<AllServerPubSubEventsToTypeMap>();
