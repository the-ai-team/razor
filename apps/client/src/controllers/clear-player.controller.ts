import { SocketProtocols } from '@razor/models';
import { store } from '@razor/store';

import { AllClientPubSubEventsToTypeMap } from '../models';
import { pubsub } from '../utils/pubsub';

type ClearPlayerControllerArgs =
  AllClientPubSubEventsToTypeMap[SocketProtocols.ClearPlayer];

function clearPlayerController({ data }: ClearPlayerControllerArgs): void {
  const { playerId } = data;

  store.dispatch.game.clearPlayer({ playerId });
}

pubsub.subscribe(SocketProtocols.ClearPlayer, clearPlayerController);
