// ### [Effects] Player operations ### //

import {
  AppIdNumberType,
  AppPlayerId,
  AppPlayerLogId,
  AppPlayerState,
  AppTournamentState,
  PlayerId,
} from '@razor/models';
import { generateAvatarLink, generateUid } from '@razor/util';

import {
  AddPlayerPayload,
  ClearPlayerPayload,
  JoinPlayerPayload,
  SendTypeLogPayload,
} from '../payloads';
import {
  invalidPlayerName,
  invalidPlayerNameLength,
  payloadNotProvided,
  playerNotFound,
  raceNotFound,
  tournamentNotFound,
} from '../raisers';
import { Dispatch, RootState } from '../store';

/** Effect function for joining player.
 * Run the validation for the received payload.
 * If an id is provided, then the player will be joined to the tournament.
 * If an id is not provided, then the new tournament will be generated and the player will be joined to the new tournament.
 *
 * @param dispatch - Dispatch function from the store.
 * @param payload - Payload for joining player.
 * @param state - Current state model.
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
export const joinPlayer = (
  dispatch: Dispatch,
  payload: JoinPlayerPayload,
  state: RootState,
): PlayerId | null => {
  const { receivedTournamentId, playerName } = payload;
  // Tournament id with correct format.
  let tournamentId;

  // If the player name is not provided, call the raiser.
  if (!playerName) {
    payloadNotProvided(joinPlayer.name, dispatch, 'playerName');
    return null;
  }
  // If the player name has an invalid length, call the raiser.
  if (playerName.length < 2 || playerName.length > 16) {
    invalidPlayerNameLength(dispatch);
    return null;
  }
  // If the player name has invalid characters, call the raiser.
  if (!playerName.match(/^[a-zA-Z0-9]+$/)) {
    invalidPlayerName(dispatch);
    return null;
  }

  // If the tournament id is provided,
  if (receivedTournamentId) {
    // If the tournament is not found, call the raiser.
    if (!state.game.tournamentsModel[receivedTournamentId]) {
      tournamentNotFound(dispatch, receivedTournamentId);
      return null;
    }
    // If the tournament is found, set the tournament id.
    tournamentId = receivedTournamentId;

    // Tournament state validation will handle inside the setTournamentState effect.
    dispatch.game.setTournamentState({
      tournamentId,
      tournamentState: AppTournamentState.Lobby,
    });
  } else {
    // If the tournament id is not provided, generate a new tournament id.
    tournamentId = generateUid(AppIdNumberType.Tournament);

    // If the tournament id was not provided, then add a new tournament.
    dispatch.game.addTournamentReducer({
      tournamentId,
      tournament: {
        state: AppTournamentState.Lobby,
        raceIds: [],
        playerIds: [],
      },
    });
  }

  // Generate a new player id.
  const playerId: AppPlayerId = generateUid(AppIdNumberType.Player);

  // Add the new player.
  dispatch.game.addPlayerReducer({
    tournamentId,
    playerId: playerId,
    player: {
      name: playerName,
      avatarLink: generateAvatarLink(playerName),
      state: AppPlayerState.Idle,
      tournamentId,
    },
  });

  return playerId;
};

/** Effect function for adding player.
 * Run the validation for the received payload.
 * Player will be added to the tournament.
 * Tournament state will update with the given state.
 *
 * @param dispatch - Dispatch function from the store.
 * @param payload - Payload for adding player.
 * @param state - Current state model.
 *
 * ### Related reducers and effects
 * - setTournamentState (effect)
 * - addPlayerReducer
 *
 * ### Related raisers
 * - payloadNotProvided
 * - invalidPlayerName
 * - invalidPlayerNameLength
 * - tournamentNotFound
 */
export const addPlayer = (
  dispatch: Dispatch,
  payload: AddPlayerPayload,
  state: RootState,
): void => {
  const { playerId, player } = payload;
  const {
    name: playerName,
    avatarLink,
    state: playerState,
    tournamentId,
  } = player;

  // Validate the payload.
  if (!playerName) {
    payloadNotProvided(addPlayer.name, dispatch, 'playerName');
    return;
  }
  if (!tournamentId) {
    payloadNotProvided(addPlayer.name, dispatch, 'tournamentId');
    return;
  }
  if (playerName.length < 2 || playerName.length > 16) {
    invalidPlayerNameLength(dispatch);
    return;
  }
  if (!playerName.match(/^[a-zA-Z0-9]+$/)) {
    invalidPlayerName(dispatch);
    return;
  }
  // If the tournament is not found, call the raiser.
  if (!state.game.tournamentsModel[tournamentId]) {
    tournamentNotFound(dispatch, tournamentId);
    return;
  }

  // Tournament state validation will handle inside the setTournamentState effect.
  dispatch.game.setTournamentState({
    tournamentId,
    tournamentState: AppTournamentState.Lobby,
  });

  // Add the new player.
  dispatch.game.addPlayerReducer({
    tournamentId,
    playerId: playerId,
    player: {
      name: playerName,
      avatarLink: avatarLink,
      state: playerState,
      tournamentId,
    },
  });
};

/** Effect function for clearing player.
 * Run the validation for the received payload.
 * If the player is found, then the player will be cleared.
 *
 * @param dispatch - Dispatch function from the store.
 * @param payload - Payload for clearing player.
 * @param state - Current state model.
 *
 * ### Related reducers and effects
 * - setTournamentState (effect)
 * - removePlayerReducer
 *
 * ### Related raisers
 * - payloadNotProvided
 * - playerNotFound
 */
export const clearPlayer = (
  dispatch: Dispatch,
  payload: ClearPlayerPayload,
  state: RootState,
): void => {
  const { playerId } = payload;

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

  // Tournament state validation will handle inside the setTournamentState effect.
  dispatch.game.setTournamentState({
    tournamentId,
    tournamentState: AppTournamentState.Lobby,
  });
};

/** Effect function for sending player logs while racing.
 * Run the validation for the received payload.
 * If the player and race are found, then the player logs will be sent.
 *
 * @param dispatch - Dispatch function from the store.
 * @param payload - Payload for sending player logs.
 * @param state - Current state model.
 *
 * ### Related reducers and effects
 * - updatePlayerLogReducer
 *
 * ### Related raisers
 * - payloadNotProvided
 * - playerNotFound
 * - raceNotFound
 */
export const sendTypeLog = (
  dispatch: Dispatch,
  payload: SendTypeLogPayload,
  state: RootState,
): void => {
  const { raceId, playerId, playerLog } = payload;

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
