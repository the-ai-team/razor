// ### [Reducers] Basic update operations for store ### //

import { AppStateModel } from '@razor/models';
import {
  updatePlayerLogReducerPayload,
  updatePlayerReducerPayload,
  updateRaceReducerPayload,
  updateTournamentReducerPayload,
} from '../payloads';

/** Reducer effect for update a tournament in state model.
 * Tournament in tournaments model will be updated with given tournament.
 *
 * @param {AppStateModel} state - Current state model
 * @param {updateTournamentReducerPayload} payload - Payload for update tournament
 * @returns {AppStateModel} - New state model if successful, else current state model
 */
export const updateTournamentReducer = (
  state: AppStateModel,
  payload: updateTournamentReducerPayload,
): AppStateModel => {
  const { tournamentId, tournament } = payload;

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

/** Reducer effect for update a race in state model.
 * Race in races model will be updated with given race.
 *
 * @param {AppStateModel} state - Current state model
 * @param {updateRaceReducerPayload} payload - Payload for update race
 * @returns {AppStateModel} - New state model if successful, else current state model
 */
export const updateRaceReducer = (
  state: AppStateModel,
  payload: updateRaceReducerPayload,
): AppStateModel => {
  const { raceId, race } = payload;

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

/** Reducer effect for update a player in state model.
 * Player in players model will be updated with given player.
 *
 * @param {AppStateModel} state - Current state model
 * @param {updatePlayerReducerPayload} payload - Payload for update player
 * @returns {AppStateModel} - New state model if successful, else current state model
 */
export const updatePlayerReducer = (
  state: AppStateModel,
  payload: updatePlayerReducerPayload,
): AppStateModel => {
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

/** Reducer effect for update a player log in state model.
 * Player log in player logs model will be updated with given player log.
 *
 * @param {AppStateModel} state - Current state model
 * @param {updatePlayerLogReducerPayload} payload - Payload for update player log
 * @returns {AppStateModel} - New state model if successful, else current state model
 */
export const updatePlayerLogReducer = (
  state: AppStateModel,
  payload: updatePlayerLogReducerPayload,
): AppStateModel => {
  const { playerLogId, playerLog } = payload;

  /** State model after updating specific player log in player logs model. */
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
