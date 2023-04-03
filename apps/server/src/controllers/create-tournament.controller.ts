import {
  PROTO_CREATE_LOBBY_ACCEPT,
  PROTO_CREATE_LOBBY_REQUEST,
} from '@razor/constants';
import { InitialClientData, InitialServerData, Snapshot } from '@razor/models';
import { store } from '@razor/store';

import { PubSubEvents } from '../models';
import { ContextOutput, Logger, pubsub } from '../services';
import { tokenPlayerMap } from '../stores';

interface JoinLobbyRequestArgs {
  data: InitialClientData;
  context: ContextOutput;
}

const logger = new Logger('create-tournament.controller');

const createTournamentController = ({
  data,
  context,
}: JoinLobbyRequestArgs): void => {
  const { socketId } = context;
  const { playerName } = data;
  const playerId = store.dispatch.game.joinPlayer({
    receivedTournamentId: '',
    playerName,
  });
  if (!playerId) {
    logger.error("Store didn't send a playerId", context);
    return;
  }
  logger.debug('Player added to the store', context);

  tokenPlayerMap.addPlayerId(socketId, playerId);
  logger.debug('Player added to tokenPlayerMap', context);

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
};

pubsub.subscribe(PROTO_CREATE_LOBBY_REQUEST, createTournamentController);
