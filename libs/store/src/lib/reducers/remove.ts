// ### [Reducers] Basic remove operations for store ### //

import {
  AppStateModel,
  AppPlayerLogId,
  AppRaceId,
  AppPlayerId,
} from '@razor/models';
import {
  RemovePlayerReducerPayload,
  RemoveTournamentReducerPayload,
} from '../payloads';
import { omit } from 'lodash';

/** Reducer function for removing the player from the state model.
 * Player will be removed from players model.
 * Related player ids array of the tournament will be updated.
 *
 * @param {AppStateModel} state - Current state model
 * @param {removePlayerReducerPayload} payload - Payload for removing player
 * @returns {AppStateModel} - New state model if successful, else current state model
 */
export const removePlayerReducer = (
  state: AppStateModel,
  payload: RemovePlayerReducerPayload,
): AppStateModel => {
  const { tournamentId, playerId } = payload;
  // If the player does not exists.
  if (!(playerId in state.playersModel)) {
    return state;
  }
  // If the tournament does not exists.
  if (!(tournamentId in state.tournamentsModel)) {
    return state;
  }
  /** New players model after removing specific player. */
  const newPlayersModel = omit(state.playersModel, [playerId]);
  /** State model after player removed from players model. */
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
      ...newPlayersModel,
    },
  };
  return newState;
};

/** Reducer function for removing tournament from state model.
 * Tournament will be removed from the tournament model.
 * Each player of the tournament will be removed from the players model.
 * Each race of the tournament will be removed from the races model.
 * Each player log of the tournament will be removed from the player logs model.
 *
 * @param {AppStateModel} state - Current state model
 * @param {removeTournamentReducerPayload} payload - Payload for removing tournament
 * @returns {AppStateModel} - New state model if successful, else current state model
 */
export const removeTournamentReducer = (
  state: AppStateModel,
  payload: RemoveTournamentReducerPayload,
): AppStateModel => {
  const { tournamentId } = payload;
  // If the tournament does not exists.
  if (!(tournamentId in state.tournamentsModel)) {
    return state;
  }
  /** Player ids array of the tournament */
  const playerIds = state.tournamentsModel[tournamentId].playerIds;
  /** Race ids array of the tournament */
  const raceIds = state.tournamentsModel[tournamentId].raceIds;
  /** Empty array for player log id */
  let playerLogIds: AppPlayerLogId[] = [];

  // Adding relevant player log ids to the array
  raceIds.forEach((raceId: AppRaceId) => {
    // TODO: fix - mapping player ids should map the player ids in the race
    const specificPlayerLogsId = playerIds.map(
      (playerId: AppPlayerId): AppPlayerLogId => {
        return `${raceId}-${playerId}`;
      },
    );
    playerLogIds = playerLogIds.concat(specificPlayerLogsId);
  });

  /** New tournaments model after removing specific tournaments. */
  const newTournamentModel = omit(state.tournamentsModel, [tournamentId]);

  /** State model after removing specific tournament. */
  const newState: AppStateModel = {
    ...state,
    tournamentsModel: {
      ...newTournamentModel,
    },
  };

  // Generating new players model by removing all players of the tournament.
  playerIds.forEach(playerId => {
    const newPlayersModel = omit(newState.playersModel, [playerId]);
    newState.playersModel = {
      ...newPlayersModel,
    };
  });

  // Generating a new races model by removing all races of the tournament.
  raceIds.forEach(raceId => {
    const newRacesModel = omit(newState.racesModel, [raceId]);
    newState.racesModel = {
      ...newRacesModel,
    };
  });

  // Generating new player logs model by removing all player logs of the tournament.
  playerLogIds.forEach(playerLogId => {
    const newPlayerLogsModel = omit(state.playerLogsModel, [playerLogId]);
    newState.playerLogsModel = {
      ...newPlayerLogsModel,
    };
  });
  return newState;
};
