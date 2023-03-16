import {
  PROTO_CREATE_LOBBY_ACCEPT,
  PROTO_CREATE_LOBBY_REQUEST,
} from '@razor/constants';
import {
  InitialClientData,
  InitialServerData,
  Snapshot,
  socketId,
} from '@razor/models';
import { store } from '@razor/store';

import { PubSubEvents } from '../models';
import { pubsub } from '../services';
import { tokenPlayerMap } from '../stores';

interface JoinLobbyRequestArgs {
  socketId: socketId;
  data: InitialClientData;
}

pubsub.subscribe(
  PROTO_CREATE_LOBBY_REQUEST,
  ({ socketId, data }: JoinLobbyRequestArgs) => {
    const { playerName } = data;
    const playerId = store.dispatch.game.joinPlayer({
      receivedTournamentId: '',
      playerName,
    });
    if (!playerId) {
      return;
    }
    tokenPlayerMap.addPlayerId(socketId, playerId);

    const state = store.getState().game;
    const player = state.playersModel[playerId];
    const tournamentId = player.tournamentId;
    const tournament = state.tournamentsModel[tournamentId];

    const snapshot: Snapshot = {
      tournamentsModel: {
        [tournamentId]: tournament,
      },
      playersModel: {
        [playerId]: player,
      },
      racesModel: {},
      leaderboardsModel: {},
      playerLogsModel: {},
    };

    const initialServerData: InitialServerData = {
      playerId,
      tournamentId,
      snapshot,
    };

    pubsub.publish(PubSubEvents.SendDataToClient, {
      playerId,
      protocol: PROTO_CREATE_LOBBY_ACCEPT,
      data: initialServerData,
    });
  },
);
