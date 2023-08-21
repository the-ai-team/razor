import { PubSub } from '@razor/util';

import { AllServerPubSubEventsToTypeMap } from '../models';

export const pubsub = new PubSub<AllServerPubSubEventsToTypeMap>();
