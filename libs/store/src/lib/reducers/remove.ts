import {
  AppStateModel,
  AppPlayerLogId,
  AppRaceId,
  AppPlayerId,
} from '@razor/models';
import {
  RemovePlayerReducerPayload,
  RemoveTournamentReducerPayload,
} from '../payloads';

// Basic Remove Operations
export const removePlayerReducer = (
  state: AppStateModel,
  payload: RemovePlayerReducerPayload,
): AppStateModel => {
  const { tournamentId, playerId } = payload;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [playerId]: removedPlayer, ...newPlayerModel } = state.playersModel;
  const newState: AppStateModel = {
    ...state,
    tournamentsModel: {
      ...state.tournamentsModel,
      [tournamentId]: {
        ...state.tournamentsModel[tournamentId],
        playerIds: state.tournamentsModel[tournamentId].playerIds.filter(
          id => id !== playerId,
        ),
      },
    },
    playersModel: {
      ...newPlayerModel,
    },
  };
  return newState;
};

export const removeTournamentReducer = (
  state: AppStateModel,
  payload: RemoveTournamentReducerPayload,
): AppStateModel => {
  const { tournamentId } = payload;
  const playerIds = state.tournamentsModel[tournamentId].playerIds;
  const raceIds = state.tournamentsModel[tournamentId].raceIds;
  let playerLogIds: AppPlayerLogId[] = [];

  raceIds.forEach((raceId: AppRaceId) => {
    const specificPlayerLogsId = playerIds.map(
      (playerId: AppPlayerId): AppPlayerLogId => {
        return `${raceId}-${playerId}`;
      },
    );
    playerLogIds = playerLogIds.concat(specificPlayerLogsId);
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [tournamentId]: removedTournament, ...newTournamentModel } =
    state.tournamentsModel;

  const newState: AppStateModel = {
    ...state,
    tournamentsModel: {
      ...newTournamentModel,
    },
  };
  playerIds.forEach(playerId => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [playerId]: removedPlayer, ...newPlayersModel } =
      newState.playersModel;
    newState.playersModel = {
      ...newPlayersModel,
    };
  });

  raceIds.forEach(raceId => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [raceId]: removedRace, ...newRacesModel } = newState.racesModel;
    newState.racesModel = {
      ...newRacesModel,
    };
  });

  playerLogIds.forEach(playerLogId => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [playerLogId]: removedPlayerLog, ...newPlayerLogsModel } =
      newState.playerLogsModel;
    newState.playerLogsModel = {
      ...newPlayerLogsModel,
    };
  });
  return newState;
};
