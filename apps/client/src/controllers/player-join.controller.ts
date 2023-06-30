import {
  ClientStoredPlayerData,
  PlayerJoinData,
  playerStateToAppPlayerState,
  socketProtocols,
} from '@razor/models';
import { AddPlayerPayload, store } from '@razor/store';

import { pubsub } from '../utils/pubsub';

pubsub.subscribe(
  socketProtocols.PlayerJoin,
  ({
    tournamentId,
    savedPlayerId: _selfPlayerId,
    data,
  }: ClientStoredPlayerData<PlayerJoinData>) => {
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
