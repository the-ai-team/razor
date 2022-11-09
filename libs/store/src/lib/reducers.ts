import {
  AppPlayerId,
  AppPlayerLogId,
  AppRaceId,
  AppStateModel,
  AppTournamentId,
} from '@razor/models';
import { extractId, extractIdType } from '@razor/util';
import {
  addPlayerReducerPayload,
  addRaceReducerPayload,
  addTournamentReducerPayload,
  logErrorReducerPayload,
  removePlayerReducerPayload,
  updateLeaderboardReducerPayload,
  updatePlayerLogReducerPayload,
  updateRaceReducerPayload,
  updateTournamentReducerPayload,
} from './payloadTypes';

// Fundamental CRUD operations for all models
// Basic Add Operations
export const addTournamentReducer = (
  state: AppStateModel,
  payload: addTournamentReducerPayload,
): AppStateModel => {
  const { tournamentId, tournament } = payload;
  const newState: AppStateModel = {
    ...state,
    tournamentsModel: {
      ...state.tournamentsModel,
      [tournamentId]: tournament,
    },
  };
  return newState;
};

//TODO: Add conditions to check values are not undefined
export const addRaceReducer = (
  state: AppStateModel,
  payload: addRaceReducerPayload,
) => {
  const { raceId, race } = payload;
  const tournamentId: AppTournamentId = extractId(
    raceId,
    extractIdType.race,
    extractIdType.tournament,
  ) as AppTournamentId;

  if (raceId) {
    const newState: AppStateModel = {
      ...state,
      tournamentsModel: {
        ...state.tournamentsModel,
        [tournamentId]: {
          ...state.tournamentsModel[tournamentId],
          raceIds: [...state.tournamentsModel[tournamentId].raceIds, raceId],
        },
      },
      racesModel: {
        ...state.racesModel,
        [raceId]: { ...race },
      },
    };
    return newState;
  } else {
    return state;
  }
};

export const addPlayerReducer = (
  state: AppStateModel,
  payload: addPlayerReducerPayload,
) => {
  const { tournamentId, playerId, player } = payload;
  const newState: AppStateModel = {
    ...state,
    tournamentsModel: {
      ...state.tournamentsModel,
      [tournamentId]: {
        ...state.tournamentsModel[tournamentId],
        playerIds: [
          ...(state.tournamentsModel[tournamentId] &&
          state.tournamentsModel[tournamentId].playerIds
            ? state.tournamentsModel[tournamentId].playerIds
            : []),
          playerId,
        ],
      },
    },
    playersModel: {
      ...state.playersModel,
      [playerId]: { ...player },
    },
  };
  return newState;
};

// Basic Update Opeations
export const updateTournamentReducer = (
  state: AppStateModel,
  payload: updateTournamentReducerPayload,
) => {
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
) => {
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
) => {
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
) => {
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

// Basic Remove Operations
export const removePlayerReducer = (
  state: AppStateModel,
  payload: removePlayerReducerPayload,
) => {
  const { tournamentId, playerId } = payload;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [playerId]: removedPlayer, ...newPlayerModel } = state.playersModel;
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
      ...newPlayerModel,
    },
  };
  return newState;
};

export const logErrorReducer = (
  state: AppStateModel,
  payload: logErrorReducerPayload,
) => {
  const { errorLog, errorTimestamp } = payload;
  const { message, code, relatedId } = errorLog;
  const newState: AppStateModel = {
    ...state,
    errorLogsModel: {
      ...state.errorLogsModel,
      [errorTimestamp]: errorLog,
    },
  };
  console.error(`[Error ${code}]: ${message} (${relatedId})`);
  return newState;
};

export const removeTournamentReducer = (
  state: AppStateModel,
  payload: removePlayerReducerPayload,
) => {
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
