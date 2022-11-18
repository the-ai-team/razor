import { AppStateModel, AppTournamentId } from '@razor/models';
import { extractId, extractIdType } from '@razor/util';
import {
  addLeaderboardReducerPayload,
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
  // Check if tournament id is provided
  if (tournamentId) {
    // Check if tournament id is valid
    if (tournamentId in state.tournamentsModel) {
      return state;
    }
    const newState: AppStateModel = {
      ...state,
      tournamentsModel: {
        ...state.tournamentsModel,
        [tournamentId]: tournament,
      },
    };
    return newState;
  } else {
    return state;
  }
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
    // Check if tournament does not exists
    if (!(tournamentId in state.tournamentsModel)) {
      return state;
    }
    // Check if race already exists
    if (raceId in state.racesModel) {
      return state;
    }
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
  // Check if tournament id and player if is provided
  if (playerId && tournamentId) {
    if (!(tournamentId in state.tournamentsModel)) {
      return state;
    }
    if (playerId in state.playersModel) {
      return state;
    }
    const newState: AppStateModel = {
      ...state,
      tournamentsModel: {
        ...state.tournamentsModel,
        [tournamentId]: {
          ...state.tournamentsModel[tournamentId],
          playerIds: [
            ...state.tournamentsModel[tournamentId].playerIds,
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
  } else {
    return state;
  }
};

export const addLeaderboardReducer = (
  state: AppStateModel,
  payload: addLeaderboardReducerPayload,
): AppStateModel => {
  const { leaderboardId, leaderboard } = payload;
  if (leaderboardId) {
    if (leaderboardId in state.leaderboardsModel) {
      console.log('Leaderboard already exists');
      return state;
    }

    const newState: AppStateModel = {
      ...state,
      leaderboardsModel: {
        ...state.leaderboardsModel,
        [leaderboardId]: [...leaderboard],
      },
    };
    return newState;
  } else {
    return state;
  }
};
