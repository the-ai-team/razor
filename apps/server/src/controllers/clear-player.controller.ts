import { SocketProtocols } from '@razor/models';
import { store } from '@razor/store';

import { AllServerPubSubEventsToTypeMap, PubSubEvents } from '../models';
import { Logger, publishToAllClients, pubsub } from '../services';

const logger = new Logger('clear-player.controller');

type PlayerDisconnectArgs =
  AllServerPubSubEventsToTypeMap[PubSubEvents.PlayerDisconnect];

const playerDisconnectController = ({
  context,
  data,
}: PlayerDisconnectArgs): void => {
  const { playerId } = data;
  const game = store.getState().game;
  if (!game.playersModel[playerId]?.tournamentId) {
    logger.error('Player data missing in store', context);
    return;
  }

  const player = game.playersModel[playerId];
  const tournamentId = player.tournamentId;

  // Clear player from the store.
  store.dispatch.game.clearPlayer({ playerId });
  logger.info('Player cleared from store', context);

  publishToAllClients({
    tournamentId,
    protocol: SocketProtocols.ClearPlayer,
    data: { playerId },
  });
};

pubsub.subscribe(PubSubEvents.PlayerDisconnect, playerDisconnectController);
