// ### [Reducers] Basic add operations for store ### //

import { AppStateModel, AppTournamentId } from '@razor/models';
import { extractId, extractIdType } from '@razor/util';
import {
  addLeaderboardReducerPayload,
  addPlayerReducerPayload,
  addRaceReducerPayload,
  addTournamentReducerPayload,
} from '../payloads';

/** Reducer effect for add tournament to state model.
 * Tournament will be added to tournaments model.
 *
 * @param {AppStateModel} state - Current state model
 * @param {addTournamentReducerPayload} payload - Payload for add tournament
 * @returns {AppStateModel} - New state model if successful, else current state model
 */
export const addTournamentReducer = (
  state: AppStateModel,
  payload: addTournamentReducerPayload,
): AppStateModel => {
  const { tournamentId, tournament } = payload;
  // If tournament id is provided.
  if (tournamentId) {
    // If tournament already exists.
    if (tournamentId in state.tournamentsModel) {
      return state;
    }

    /** State model with tournamnet added to tournaments model with data assigned. */
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

/** Reducer effect for add race to state model.
 * Race will be added to races model and race id will be added to relevant tournament.
 *
 * @param {AppStateModel} state - Current state model
 * @param {addRaceReducerPayload} payload - Payload for add race
 * @returns {AppStateModel} - New state model if successful, else current state model
 */
export const addRaceReducer = (
  state: AppStateModel,
  payload: addRaceReducerPayload,
): AppStateModel => {
  const { raceId, race } = payload;
  /** Extract tournaemnt id from race id */
  const tournamentId: AppTournamentId = extractId(
    raceId,
    extractIdType.race,
    extractIdType.tournament,
  ) as AppTournamentId;

  // If race id is provided.
  if (raceId) {
    // If tournament does not exists.
    if (!(tournamentId in state.tournamentsModel)) {
      return state;
    }
    // If race already exists.
    if (raceId in state.racesModel) {
      return state;
    }

    /** State model with new race added to races model and race id added to tournament. */
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

/** Reducer effect for add player to state model.
 * Player will be added to players model and player id will be added to relevant tournament.
 *
 * @param {AppStateModel} state - Current state model
 * @param {addLeaderboardReducerPayload} payload - Payload for add leaderboard
 * @returns {AppStateModel} - New state model if successful, else current state model
 */
export const addPlayerReducer = (
  state: AppStateModel,
  payload: addPlayerReducerPayload,
): AppStateModel => {
  const { tournamentId, playerId, player } = payload;
  // If tournament id and player id is provided
  if (playerId && tournamentId) {
    // If tournament does not exists.
    if (!(tournamentId in state.tournamentsModel)) {
      return state;
    }
    // If player already exists.
    if (playerId in state.playersModel) {
      return state;
    }

    /** State model with new player added to players model and player id added to tournament. */
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

/** Reducer effect for add leaderboard to state model.
 * Leaderboard will be added to leaderboards model.
 *
 * @param {AppStateModel} state - Current state model
 * @param {addLeaderboardReducerPayload} payload - Payload for add leaderboard
 * @returns {AppStateModel} - New state model if successful, else current state model
 */
export const addLeaderboardReducer = (
  state: AppStateModel,
  payload: addLeaderboardReducerPayload,
): AppStateModel => {
  const { leaderboardId, leaderboard } = payload;
  // If leaderboard id is provided.
  if (leaderboardId) {
    // If leaderboard already exists.
    if (leaderboardId in state.leaderboardsModel) {
      return state;
    }

    /** State model with new leaderboard added to leaderboards model. */
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
