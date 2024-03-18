import { PubSub } from '@razor/util';

import { AllClientPubSubEventsToTypeMap } from '../models';

export const pubsub = new PubSub<AllClientPubSubEventsToTypeMap>();
