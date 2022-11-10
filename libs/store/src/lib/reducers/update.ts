import { AppStateModel } from '@razor/models';
import {
  updateTournamentReducerPayload,
  updateRaceReducerPayload,
  updateLeaderboardReducerPayload,
  updatePlayerLogReducerPayload,
} from '../payloads';

// Basic Update Opeations
export const updateTournamentReducer = (
  state: AppStateModel,
  payload: updateTournamentReducerPayload,
): AppStateModel => {
  const { tournamentId, tournament } = payload;
  const newState: AppStateModel = {
    ...state,
    tournamentsModel: {
      ...state.tournamentsModel,
      [tournamentId]: {
        ...tournament,
      },
    },
  };
  return newState;
};

export const updateRaceReducer = (
  state: AppStateModel,
  payload: updateRaceReducerPayload,
): AppStateModel => {
  const { raceId, race } = payload;
  const newState: AppStateModel = {
    ...state,
    racesModel: {
      ...state.racesModel,
      [raceId]: {
        ...race,
      },
    },
  };
  return newState;
};

export const updateLeaderboardReducer = (
  state: AppStateModel,
  payload: updateLeaderboardReducerPayload,
): AppStateModel => {
  const { leaderboardId, leaderboard } = payload;
  const newState: AppStateModel = {
    ...state,
    leaderboardsModel: {
      ...state.leaderboardsModel,
      [leaderboardId]: {
        ...leaderboard,
      },
    },
  };
  return newState;
};

export const updatePlayerLogReducer = (
  state: AppStateModel,
  payload: updatePlayerLogReducerPayload,
): AppStateModel => {
  const { playerLogId, playerLog } = payload;
  const newState: AppStateModel = {
    ...state,
    playerLogsModel: {
      ...state.playerLogsModel,
      [playerLogId]: [
        ...(state.playerLogsModel[playerLogId]
          ? state.playerLogsModel[playerLogId]
          : []),
        playerLog,
      ],
    },
  };
  return newState;
};
