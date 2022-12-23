// ### [Reducers] Basic update operations for store ### //

import { AppStateModel } from '@razor/models';
import {
  UpdateTournamentReducerPayload,
  UpdateRaceReducerPayload,
  UpdatePlayerLogReducerPayload,
  UpdatePlayerReducerPayload,
} from '../payloads';

/** Reducer function for updating a tournament in the state model.
 * Tournament in tournaments model will be updated with the given tournament.
 *
 * @param state - Current state model
 * @param payload - Payload for update tournament
 * @returns New state model if successful, else current state model
 */
export const updateTournamentReducer = (
  state: AppStateModel,
  payload: UpdateTournamentReducerPayload,
): AppStateModel => {
  const { tournamentId, tournament } = payload;
  // If the tournament does not exists.
  if (!(tournamentId in state.tournamentsModel)) {
    return state;
  }
  /** State model after updating specific tournament in tournaments model. */
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

/** Reducer function for updating a race in the state model.
 * Race in races model will be updated with the given race.
 *
 * @param state - Current state model
 * @param payload - Payload for update race
 * @returns New state model if successful, else current state model
 */
export const updateRaceReducer = (
  state: AppStateModel,
  payload: UpdateRaceReducerPayload,
): AppStateModel => {
  const { raceId, race } = payload;
  // If the race does not exists.
  if (!(raceId in state.racesModel)) {
    return state;
  }
  /** State model after updating specific race in races model. */
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

/** Reducer function for updating a player in the state model.
 * Player in players model will be updated with the given player.
 *
 * @param state - Current state model
 * @param payload - Payload for update player
 * @returns New state model if successful, else current state model
 */
export const updatePlayerReducer = (
  state: AppStateModel,
  payload: UpdatePlayerReducerPayload,
): AppStateModel => {
  const { playerId, player } = payload;
  // If the player does not exists.
  if (!(playerId in state.playersModel)) {
    return state;
  }
  /** State model after updating specific player in players model. */
  const newState: AppStateModel = {
    ...state,
    playersModel: {
      ...state.playersModel,
      [playerId]: {
        ...player,
      },
    },
  };
  return newState;
};

/** Reducer function for updating a player log-in state model.
 * Player log-in player logs model will be updated with the given player log.
 *
 * @param state - Current state model
 * @param payload - Payload for updating player log
 * @returns New state model if successful, else current state model
 */
export const updatePlayerLogReducer = (
  state: AppStateModel,
  payload: UpdatePlayerLogReducerPayload,
): AppStateModel => {
  const { playerLogId, playerLog } = payload;
  /** State model after updating specific player log-in player logs model. */
  const newState: AppStateModel = {
    ...state,
    playerLogsModel: {
      ...state.playerLogsModel,
      [playerLogId]: [...(state.playerLogsModel[playerLogId] || []), playerLog],
    },
  };
  return newState;
};
