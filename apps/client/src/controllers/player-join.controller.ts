import { playerStateToAppPlayerState, SocketProtocols } from '@razor/models';
import { AddPlayerPayload, store } from '@razor/store';

import { AllServerPubSubEventsToTypeMap } from '../models';
import { pubsub } from '../utils/pubsub';

pubsub.subscribe(
  SocketProtocols.PlayerJoin,
  ({
    data,
    tournamentId,
  }: AllServerPubSubEventsToTypeMap[SocketProtocols.PlayerJoin]) => {
    const { id: playerId, state, ...playerData } = data.player;

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
  },
);
