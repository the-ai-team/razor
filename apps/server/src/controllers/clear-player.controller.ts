import { store } from '@razor/store';

import { PubSubEvents } from '../models';
import { ContextOutput, pubsub } from '../services';

interface ClearPlayerArgs {
  context: ContextOutput;
}

pubsub.subscribe(
  PubSubEvents.PlayerDisconnect,
  ({ context }: ClearPlayerArgs) => {
    store.dispatch.game.clearPlayer({
      playerId: context.playerId,
    });
  },
);
