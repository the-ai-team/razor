import { AppStateModel, AppTournamentId } from '@razor/models';
import { extractId, extractIdType } from '@razor/util';
import {
  addPlayerReducerPayload,
  addRaceReducerPayload,
  addTournamentReducerPayload,
} from '../payloads';

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

export const addRaceReducer = (
  state: AppStateModel,
  payload: addRaceReducerPayload,
): AppStateModel => {
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
): AppStateModel => {
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
