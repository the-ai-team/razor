import { ClearPlayerData, socketProtocols } from '@razor/models';
import { store } from '@razor/store';

import { PlayerDisconnectModel, PubSubEvents } from '../models';
import { Logger, pubsub } from '../services';

const logger = new Logger('clear-player.controller');

const clearPlayerController = ({
  context,
  data,
}: PlayerDisconnectModel): void => {
  const { playerId } = data;
  const tournamentId =
    store.getState().game.playersModel[playerId]?.tournamentId;

  if (tournamentId) {
    const clearedPlayerData: ClearPlayerData = {
      playerId,
    };
    pubsub.publish(PubSubEvents.SendDataToAll, {
      tournamentId,
      protocol: socketProtocols.ClearPlayer,
      data: clearedPlayerData,
    });
  }

  store.dispatch.game.clearPlayer({
    playerId: playerId,
  });

  logger.info('Player cleared from the store', context);
};

pubsub.subscribe(PubSubEvents.PlayerDisconnect, clearPlayerController);
