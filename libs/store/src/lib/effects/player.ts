// ### [Effects] Player operations ### //

import {
  AppIdNumberType,
  AppPlayerId,
  AppPlayerLog,
  AppPlayerLogId,
  AppPlayerState,
  AppRaceId,
  AppTournamentId,
  AppTournamentState,
} from '@razor/models';
import { generateAvatarLink, generateUid } from '@razor/util';
import {
  invalidPlayerName,
  invalidPlayerNameLength,
  payloadNotProvided,
  playerNotFound,
  raceNotFound,
  tournamentNotFound,
} from '../raisers';
import {
  ClearPlayerPayload,
  JoinPlayerPayload,
  SendTypeLogPlayload,
} from '../payloads';
import { Dispatch, RootState } from '../store';

/** Effect function for joining player.
 * Run the validation for the received payload.
 * If an id is provided, then the player will be joined to the tournament.
 * If an id is not provided, then the new tournament will be generated and the player will be joined to the new tournament.
 *
 * @param {Dispatch} dispatch - Dispatch function from the store.
 * @param {joinPlayerPayload} payload - Payload for joining player.
 * @param {RootState} state - Current state model.
 *
 * ### Related reducers and effects
 * - setTournamentState (effect)
 * - addTournamentReducer
 * - addPlayerReducer
 *
 * ### Related raisers
 * - payloadNotProvided
 * - invalidPlayerName
 * - invalidPlayerNameLength
 * - tournamentNotFound
 */
export const joinPlayer = async (
  dispatch: Dispatch,
  payload: JoinPlayerPayload,
  state: RootState,
): Promise<void> => {
  const { tid, playerName }: { tid: string; playerName: string } = payload;
  let tournamentId: string;

  // If the player name is not provided, call the raiser.
  if (!playerName) {
    payloadNotProvided(joinPlayer.name, dispatch, 'playerName');
    return;
  }
  // If the player name has an invalid length, call the raiser.
  if (playerName.length < 2 || playerName.length > 16) {
    invalidPlayerNameLength(dispatch);
    return;
  }
  // If the player name has invalid characters, call the raiser.
  if (!playerName.match(/^[a-zA-Z0-9]+$/)) {
    invalidPlayerName(dispatch);
    return;
  }

  // If the tournament id is provided,
  if (tid) {
    // If the tournament is not found, call the raiser.
    if (!state.game.tournamentsModel[tid as AppTournamentId]) {
      tournamentNotFound(dispatch, tid);
      return;
    }
    // If the tournament is found, set the tournament id.
    tournamentId = tid;
  } else {
    // If the tournament id is not provided, generate a new tournament id.
    tournamentId = await generateUid(AppIdNumberType.Tournament);
  }

  // TODO: remove unnecessary code
  // Take tournament id as AppTournamentId
  const formattedTournamentId: AppTournamentId =
    tournamentId as AppTournamentId;
  // Generate a new player id.
  const formattedPlayerId: AppPlayerId = (await generateUid(
    AppIdNumberType.Player,
  )) as AppPlayerId;

  // If the tournament id was not provided, then add a new tournament.
  if (!tid) {
    dispatch.game.addTournamentReducer({
      tournamentId: formattedTournamentId,
      tournament: {
        state: AppTournamentState.Lobby,
        raceIds: [],
        playerIds: [],
      },
    });
  }

  // Converting tournament state to "Lobby" from "Empty" if it had no players.
  if (
    state.game.tournamentsModel[tid as AppTournamentId] &&
    state.game.tournamentsModel[tid as AppTournamentId].playerIds.length == 0
  ) {
    dispatch.game.setTournamentState({
      tournamentId: formattedTournamentId,
      tournamentState: AppTournamentState.Lobby,
    });
  }

  // Converting tournament state to "Ready" from "Lobby" if it has 2 or more players.
  if (
    state.game.tournamentsModel[tid as AppTournamentId] &&
    state.game.tournamentsModel[tid as AppTournamentId].playerIds.length >= 1
  ) {
    dispatch.game.setTournamentState({
      tournamentId: formattedTournamentId,
      tournamentState: AppTournamentState.Ready,
    });
  }

  // Add the new player.
  dispatch.game.addPlayerReducer({
    tournamentId: formattedTournamentId,
    playerId: formattedPlayerId,
    player: {
      name: playerName,
      avatarLink: await generateAvatarLink(playerName),
      state: AppPlayerState.Idle,
      tournamentId: formattedTournamentId,
    },
  });
};

/** Effect function for clearing player.
 * Run the validation for the received payload.
 * If the player is found, then the player will be cleared.
 *
 * @param {Dispatch} dispatch - Dispatch function from the store.
 * @param {clearPlayerPayload} payload - Payload for clearing player.
 * @param {RootState} state - Current state model.
 *
 * ### Related reducers and effects
 * - setTournamentState (effect)
 * - removePlayerReducer
 *
 * ### Related raisers
 * - payloadNotProvided
 * - playerNotFound
 */
export const clearPlayer = async (
  dispatch: Dispatch,
  payload: ClearPlayerPayload,
  state: RootState,
): Promise<void> => {
  const { playerId }: { playerId: AppPlayerId } = payload;

  // If the player id is not provided, call the raiser.
  if (!playerId) {
    payloadNotProvided(clearPlayer.name, dispatch, 'playerId');
    return;
  }
  // If the player is not found, call the raiser.
  if (!(playerId in state.game.playersModel)) {
    playerNotFound(dispatch, playerId);
    return;
  }

  // Tournament id of the player.
  const tournamentId = state.game.playersModel[playerId].tournamentId;

  // Remove the player.
  dispatch.game.removePlayerReducer({
    tournamentId,
    playerId,
  });

  // If player was the last member of the tournament, change the tournament state to empty
  const playerIdsInTournament =
    state.game.tournamentsModel[tournamentId].playerIds;
  if (playerIdsInTournament.length === 1) {
    if (playerIdsInTournament[0] === playerId) {
      dispatch.game.setTournamentState({
        tournamentId,
        tournamentState: AppTournamentState.Empty,
      });
    }
  }
};

/** Effect function for sending player logs while racing.
 * Run the validation for the received payload.
 * If the player and race are found, then the player logs will be sent.
 *
 * @param {Dispatch} dispatch - Dispatch function from the store.
 * @param {sendPlayerLogsPayload} payload - Payload for sending player logs.
 * @param {RootState} state - Current state model.
 *
 * ### Related reducers and effects
 * - updatePlayerLogReducer
 *
 * ### Related raisers
 * - payloadNotProvided
 * - playerNotFound
 * - raceNotFound
 */
export const sendTypeLog = async (
  dispatch: Dispatch,
  payload: SendTypeLogPlayload,
  state: RootState,
): Promise<void> => {
  const {
    raceId,
    playerId,
    playerLog,
  }: { raceId: AppRaceId; playerId: AppPlayerId; playerLog: AppPlayerLog } =
    payload;

  // If the race id is not provided, call the raiser.
  if (!raceId) {
    payloadNotProvided(sendTypeLog.name, dispatch, 'raceId');
    return;
  }
  // If the player id is not provided, call the raiser.
  if (!playerId) {
    payloadNotProvided(sendTypeLog.name, dispatch, 'playerId');
    return;
  }

  // If the player is not found, call the raiser.
  if (!(playerId in state.game.playersModel)) {
    playerNotFound(dispatch, playerId);
    return;
  }
  // If the race is not found, call the raiser.
  if (!(raceId in state.game.racesModel)) {
    raceNotFound(dispatch, raceId);
    return;
  }

  // Player log id.
  const playerLogId: AppPlayerLogId = `${raceId}-${playerId}`;

  // Update the player log.
  dispatch.game.updatePlayerLogReducer({
    playerLogId,
    playerLog,
  });
};
