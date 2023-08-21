import { playerStateToAppPlayerState, socketProtocols } from '@razor/models';
import { AddPlayerPayload, store } from '@razor/store';

import { AllServerPubSubEventsToTypeMap } from '../models';
import { pubsub } from '../utils/pubsub';

pubsub.subscribe(
  socketProtocols.PlayerJoin,
  ({
    data,
    tournamentId,
  }: AllServerPubSubEventsToTypeMap[socketProtocols.PlayerJoin]) => {
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
