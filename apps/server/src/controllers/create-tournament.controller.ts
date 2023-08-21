import { InitialServerData, Snapshot, socketProtocols } from '@razor/models';
import { store } from '@razor/store';

import { AllServerPubSubEventsToTypeMap } from '../models';
import { Logger, publishToSingleClient, pubsub } from '../services';
import { tokenPlayerMap } from '../stores';

const logger = new Logger('create-tournament.controller');

type CreateTournamentArgs =
  AllServerPubSubEventsToTypeMap[socketProtocols.CreateLobbyRequest];

const createTournamentController = ({
  data,
  context,
  socketId,
}: CreateTournamentArgs): void => {
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

  publishToSingleClient({
    playerId,
    protocol: socketProtocols.CreateLobbyAccept,
    data: initialServerData,
  });
};

pubsub.subscribe(
  socketProtocols.CreateLobbyRequest,
  createTournamentController,
);
