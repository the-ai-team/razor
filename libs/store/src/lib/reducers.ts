import { AppStateModel } from '@razor/models';
import {
  addPlayerReducerPayload,
  addRaceReducerPayload,
  addTournamentReducerPayload,
  logErrorReducerPayload,
  removePlayerReducerPayload,
  updateTournamentReducerPayload,
} from './payloadTypes';

//fundamental CRUD operations for all models
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

export const addRaceReducer = (
  state: AppStateModel,
  payload: addRaceReducerPayload,
) => {
  const { tournamentId, raceId, race } = payload;
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

export const logErrorReducer = (
  state: AppStateModel,
  payload: logErrorReducerPayload,
) => {
  const { errorLog, errorTimestamp } = payload;
  const newState: AppStateModel = {
    ...state,
    errorLogsModel: {
      ...state.errorLogsModel,
      [errorTimestamp]: errorLog,
    },
  };
  return newState;
};
