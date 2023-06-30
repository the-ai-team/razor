import {
  AppPlayer,
  InitialClientData,
  InitialServerData,
  PlayerJoinData,
  PlayerState,
  Snapshot,
  socketProtocols,
  TournamentId,
} from '@razor/models';
import { store } from '@razor/store';
import { pick } from 'lodash';

import { PubSubEvents } from '../models';
import { ContextOutput, Logger, pubsub } from '../services';
import { tokenPlayerMap } from '../stores';

interface JoinLobbyRequestArgs {
  data: InitialClientData;
  context: ContextOutput;
}

const logger = new Logger('create-tournament.controller');

const joinTournamentController = ({
  data,
  context,
}: JoinLobbyRequestArgs): void => {
  const { socketId } = context;
  // Checking whether player already has playerId.
  let playerId = tokenPlayerMap.getPlayerIdBySocketId(socketId);
  let player: AppPlayer;
  if (playerId) {
    logger.info(
      'Player already has playerId, checking whether player is available on the store.',
      context,
    );
    player =
      store.getState().game.playersModel[
        tokenPlayerMap.getPlayerIdBySocketId(socketId)
      ];
  }

  // If player data is not available on the store let new player join to the store.
  if (!player) {
    const { playerName, roomId } = data;
    const receivedTournamentId: TournamentId = `T:${roomId}`;
    playerId ||= store.dispatch.game.joinPlayer({
      receivedTournamentId,
      playerName,
    });
    if (!playerId) {
      logger.error("Store didn't send a playerId", context);
      // TODO: send error response
      return;
    }
    logger.debug('Player added to the store', context);

    // Adding player to the tokenPlayerMap.
    tokenPlayerMap.addPlayerId(socketId, playerId);
    logger.debug('Player added to tokenPlayerMap', context);
  }

  // Collecting required data from the store.
  const state = store.getState().game;
  player ||= state.playersModel[playerId];
  const tournamentId = player.tournamentId;
  const tournament = state.tournamentsModel[tournamentId];
  const playerIds = tournament.playerIds;
  const raceIds = tournament.raceIds;
  const lastRaceId = raceIds[raceIds.length - 1];
  const filteredPlayers = pick(state.playersModel, playerIds);
  const filteredRaces = pick(state.playersModel, raceIds);
  const filteredLeaderboards = pick(state.leaderboardsModel, raceIds);
  let filteredPlayersLogs = {};
  if (filteredRaces[lastRaceId]?.isOnGoing === true) {
    const playersLogsIds = playerIds.map(playerId => lastRaceId + playerId);
    filteredPlayersLogs = pick(state.playerLogsModel, playersLogsIds);
  }

  const snapshot: Snapshot = {
    tournamentsModel: {
      [tournamentId]: tournament,
    },
    playersModel: filteredPlayers,
    racesModel: filteredRaces,
    leaderboardsModel: filteredLeaderboards,
    playerLogsModel: filteredPlayersLogs,
  };

  const initialServerData: InitialServerData = {
    playerId,
    tournamentId,
    snapshot,
  };

  pubsub.publish(PubSubEvents.SendDataToClient, {
    playerId,
    protocol: socketProtocols.JoinLobbyAccept,
    data: initialServerData,
  });

  // Sending player joined event to all players.
  const joinedPlayerData: PlayerJoinData = {
    player: {
      id: playerId,
      name: player.name,
      avatarLink: player.avatarLink,
      state: player.state as unknown as PlayerState,
    },
  };

  pubsub.publish(PubSubEvents.SendDataToAll, {
    tournamentId,
    protocol: socketProtocols.PlayerJoin,
    data: joinedPlayerData,
  });
};

pubsub.subscribe(socketProtocols.JoinLobbyRequest, joinTournamentController);
