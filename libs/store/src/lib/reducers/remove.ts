import {
  AppStateModel,
  AppPlayerLogId,
  AppRaceId,
  AppPlayerId,
} from '@razor/models';
import {
  removePlayerReducerPayload,
  removeTournamentReducerPayload,
} from '../payloads';
import * as _ from 'lodash';

// Basic Remove Operations
export const removePlayerReducer = (
  state: AppStateModel,
  payload: removePlayerReducerPayload,
): AppStateModel => {
  const { tournamentId, playerId } = payload;
  const newPlayersModel = _.omit(state.playersModel, [playerId]);
  const newState: AppStateModel = {
    ...state,
    tournamentsModel: {
      ...state.tournamentsModel,
      [tournamentId]: {
        ...state.tournamentsModel[tournamentId],
        playerIds: [
          ...state.tournamentsModel[tournamentId].playerIds.slice(
            0,
            state.tournamentsModel[tournamentId].playerIds.indexOf(playerId),
          ),
          ...state.tournamentsModel[tournamentId].playerIds.slice(
            state.tournamentsModel[tournamentId].playerIds.indexOf(playerId) +
              1,
          ),
        ],
      },
    },
    playersModel: {
      ...newPlayersModel,
    },
  };
  return newState;
};

export const removeTournamentReducer = (
  state: AppStateModel,
  payload: removeTournamentReducerPayload,
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

  const newTournamentModel = _.omit(state.tournamentsModel, [tournamentId]);

  const newState: AppStateModel = {
    ...state,
    tournamentsModel: {
      ...newTournamentModel,
    },
  };

  playerIds.forEach(playerId => {
    const newPlayersModel = _.omit(newState.playersModel, [playerId]);
    newState.playersModel = {
      ...newPlayersModel,
    };
  });

  raceIds.forEach(raceId => {
    const newRacesModel = _.omit(newState.racesModel, [raceId]);
    newState.racesModel = {
      ...newRacesModel,
    };
  });

  playerLogIds.forEach(playerLogId => {
    const newPlayerLogsModel = _.omit(state.playerLogsModel, [playerLogId]);
    newState.playerLogsModel = {
      ...newPlayerLogsModel,
    };
  });
  return newState;
};
