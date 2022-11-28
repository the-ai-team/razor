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
 * @param {AppStateModel} state - Current state model
 * @param {updateTournamentReducerPayload} payload - Payload for update tournament
 * @returns {AppStateModel} - New state model if successful, else current state model
 */
export const updateTournamentReducer = (
  state: AppStateModel,
  payload: UpdateTournamentReducerPayload,
): AppStateModel => {
  const { tournamentId, tournament } = payload;
  //TODO: if the tournament id not found, return the state
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
 * @param {AppStateModel} state - Current state model
 * @param {updateRaceReducerPayload} payload - Payload for update race
 * @returns {AppStateModel} - New state model if successful, else current state model
 */
export const updateRaceReducer = (
  state: AppStateModel,
  payload: UpdateRaceReducerPayload,
): AppStateModel => {
  const { raceId, race } = payload;
  //TODO: if race id not found, return state
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
 * @param {AppStateModel} state - Current state model
 * @param {updatePlayerReducerPayload} payload - Payload for update player
 * @returns {AppStateModel} - New state model if successful, else current state model
 */
export const updatePlayerReducer = (
  state: AppStateModel,
  payload: UpdatePlayerReducerPayload,
): AppStateModel => {
  //TODO: if the player id is not found, return the state
  const { playerId, player } = payload;

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
 * @param {AppStateModel} state - Current state model
 * @param {updatePlayerLogReducerPayload} payload - Payload for updating player log
 * @returns {AppStateModel} - New state model if successful, else current state model
 */
export const updatePlayerLogReducer = (
  state: AppStateModel,
  payload: UpdatePlayerLogReducerPayload,
): AppStateModel => {
  const { playerLogId, playerLog } = payload;
  //TODO: if player id is not found, return the state
  /** State model after updating specific player log-in player logs model. */
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
