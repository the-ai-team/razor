import { AppStateModel, AppTournamentId } from '@razor/models';
import { extractId, extractIdType } from '@razor/util';
import {
  AddPlayerReducerPayload,
  AddRaceReducerPayload,
  AddTournamentReducerPayload,
} from '../payloads';

// Basic Add Operations
export const addTournamentReducer = (
  state: AppStateModel,
  payload: AddTournamentReducerPayload,
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
  payload: AddRaceReducerPayload,
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
  payload: AddPlayerReducerPayload,
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
