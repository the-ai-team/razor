"use strict";
// ### [Effects] Player operations ### //
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTypeLog = exports.clearPlayer = exports.addPlayer = exports.joinPlayer = void 0;
const models_1 = require("@razor/models");
const util_1 = require("@razor/util");
const raisers_1 = require("../raisers");
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
const joinPlayer = (dispatch, payload, state) => {
    const { receivedTournamentId, playerName } = payload;
    // Tournament id with correct format.
    let tournamentId;
    // If the player name is not provided, call the raiser.
    if (!playerName) {
        (0, raisers_1.payloadNotProvided)(exports.joinPlayer.name, dispatch, 'playerName');
        return null;
    }
    // If the player name has an invalid length, call the raiser.
    if (playerName.length < 2 || playerName.length > 16) {
        (0, raisers_1.invalidPlayerNameLength)(dispatch);
        return null;
    }
    // If the player name has invalid characters, call the raiser.
    if (!playerName.match(/^[a-zA-Z0-9]+$/)) {
        (0, raisers_1.invalidPlayerName)(dispatch);
        return null;
    }
    // If the tournament id is provided,
    if (receivedTournamentId) {
        // If the tournament is not found, call the raiser.
        if (!state.game.tournamentsModel[receivedTournamentId]) {
            (0, raisers_1.tournamentNotFound)(dispatch, receivedTournamentId);
            return null;
        }
        // If the tournament is found, set the tournament id.
        tournamentId = receivedTournamentId;
        // Converting tournament state to "Lobby" from "Empty" if it had no players.
        if (state.game.tournamentsModel[receivedTournamentId].playerIds.length == 0) {
            dispatch.game.setTournamentState({
                tournamentId,
                tournamentState: models_1.AppTournamentState.Lobby,
            });
        }
        // Converting tournament state to "Ready" from "Lobby" if it has 2 or more players.
        if (state.game.tournamentsModel[receivedTournamentId].playerIds.length >= 1) {
            const tournamentState = state.game.tournamentsModel[receivedTournamentId].state;
            // Change to Ready only if the tournament is in Lobby state
            // (Don't change state if current state is Race or Leaderboard)
            if (tournamentState === models_1.AppTournamentState.Lobby) {
                dispatch.game.setTournamentState({
                    tournamentId,
                    tournamentState: models_1.AppTournamentState.Ready,
                });
            }
        }
    }
    else {
        // If the tournament id is not provided, generate a new tournament id.
        tournamentId = (0, util_1.generateUid)(models_1.AppIdNumberType.Tournament);
        // If the tournament id was not provided, then add a new tournament.
        dispatch.game.addTournamentReducer({
            tournamentId,
            tournament: {
                state: models_1.AppTournamentState.Lobby,
                raceIds: [],
                playerIds: [],
            },
        });
    }
    // Generate a new player id.
    const playerId = (0, util_1.generateUid)(models_1.AppIdNumberType.Player);
    // Add the new player.
    dispatch.game.addPlayerReducer({
        tournamentId,
        playerId: playerId,
        player: {
            name: playerName,
            avatarLink: (0, util_1.generateAvatarLink)(playerName),
            state: models_1.AppPlayerState.Idle,
            tournamentId,
        },
    });
    return playerId;
};
exports.joinPlayer = joinPlayer;
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
const addPlayer = (dispatch, payload, state) => {
    const { playerId, player } = payload;
    const { name: playerName, avatarLink, state: playerState, tournamentId, } = player;
    // Validate the payload.
    if (!playerName) {
        (0, raisers_1.payloadNotProvided)(exports.addPlayer.name, dispatch, 'playerName');
        return;
    }
    if (!tournamentId) {
        (0, raisers_1.payloadNotProvided)(exports.addPlayer.name, dispatch, 'tournamentId');
        return;
    }
    if (playerName.length < 2 || playerName.length > 16) {
        (0, raisers_1.invalidPlayerNameLength)(dispatch);
        return;
    }
    if (!playerName.match(/^[a-zA-Z0-9]+$/)) {
        (0, raisers_1.invalidPlayerName)(dispatch);
        return;
    }
    // If the tournament is not found, call the raiser.
    if (!state.game.tournamentsModel[tournamentId]) {
        (0, raisers_1.tournamentNotFound)(dispatch, tournamentId);
        return;
    }
    // When adding a player lobby cannot be Empty
    // Converting tournament state to "Ready" only if state was "Lobby".
    const tournamentState = state.game.tournamentsModel[tournamentId].state;
    if (state.game.tournamentsModel[tournamentId].playerIds.length >= 1 &&
        tournamentState === models_1.AppTournamentState.Lobby) {
        dispatch.game.setTournamentState({
            tournamentId,
            tournamentState: models_1.AppTournamentState.Ready,
        });
    }
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
exports.addPlayer = addPlayer;
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
const clearPlayer = (dispatch, payload, state) => {
    const { playerId } = payload;
    // If the player id is not provided, call the raiser.
    if (!playerId) {
        (0, raisers_1.payloadNotProvided)(exports.clearPlayer.name, dispatch, 'playerId');
        return;
    }
    // If the player is not found, call the raiser.
    if (!(playerId in state.game.playersModel)) {
        (0, raisers_1.playerNotFound)(dispatch, playerId);
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
    const playerIdsInTournament = state.game.tournamentsModel[tournamentId].playerIds;
    if (playerIdsInTournament.length === 1) {
        if (playerIdsInTournament[0] === playerId) {
            dispatch.game.setTournamentState({
                tournamentId,
                tournamentState: models_1.AppTournamentState.Empty,
            });
        }
    }
};
exports.clearPlayer = clearPlayer;
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
const sendTypeLog = (dispatch, payload, state) => {
    const { raceId, playerId, playerLog } = payload;
    // If the race id is not provided, call the raiser.
    if (!raceId) {
        (0, raisers_1.payloadNotProvided)(exports.sendTypeLog.name, dispatch, 'raceId');
        return;
    }
    // If the player id is not provided, call the raiser.
    if (!playerId) {
        (0, raisers_1.payloadNotProvided)(exports.sendTypeLog.name, dispatch, 'playerId');
        return;
    }
    // If the player is not found, call the raiser.
    if (!(playerId in state.game.playersModel)) {
        (0, raisers_1.playerNotFound)(dispatch, playerId);
        return;
    }
    // If the race is not found, call the raiser.
    if (!(raceId in state.game.racesModel)) {
        (0, raisers_1.raceNotFound)(dispatch, raceId);
        return;
    }
    // Player log id.
    const playerLogId = `${raceId}-${playerId}`;
    // Update the player log.
    dispatch.game.updatePlayerLogReducer({
        playerLogId,
        playerLog,
    });
};
exports.sendTypeLog = sendTypeLog;
//# sourceMappingURL=player.js.map