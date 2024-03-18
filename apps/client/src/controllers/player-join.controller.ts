import { playerStateToAppPlayerState, SocketProtocols } from '@razor/models';
import { AddPlayerPayload, store } from '@razor/store';

import { AllClientPubSubEventsToTypeMap } from '../models';
import { pubsub } from '../utils/pubsub';
import { getSavedPlayerId } from '../utils/save-player-id';

type PlayerJoinControllerArgs =
  AllClientPubSubEventsToTypeMap[SocketProtocols.PlayerJoin];

function playerJoinController({
  data,
  tournamentId,
}: PlayerJoinControllerArgs): void {
  const { id: playerId, state, ...playerData } = data.player;

  // Skip if player is self
  if (playerId === getSavedPlayerId()) {
    return;
  }

  // converted PlayerState to AppPlayerState,
  // because we're using two models for store and socket
  const appPlayerState = playerStateToAppPlayerState(state);

  const dataToDispatch: AddPlayerPayload = {
    playerId,
    player: {
      ...playerData,
      state: appPlayerState,
      // This is equal because received player and joined player on same tournament
      tournamentId,
    },
  };

  store.dispatch.game.addPlayer({ ...dataToDispatch });
}

pubsub.subscribe(SocketProtocols.PlayerJoin, playerJoinController);
