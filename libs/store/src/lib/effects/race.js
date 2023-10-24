"use strict";
// ### [Effects] Race operations ### //
Object.defineProperty(exports, "__esModule", { value: true });
exports.endRace = exports.startRace = void 0;
const constants_1 = require("@razor/constants");
const models_1 = require("@razor/models");
const util_1 = require("@razor/util");
const raisers_1 = require("../raisers");
/** Effect function for starting the countdown of the race.
 * Run the validation for the received payload.
 * If the player who pressed the start button and the relevant tournament are found, then the countdown will be started.
 * Tournament state will be changed to "Countdown".
 *
 * @param dispatch - Dispatch function from the store.
 * @param payload - Payload for starting the countdown of the
 * @param state - Current state model.
 *
 * ### Related reducers and effects
 * - setTournamentState (effect)
 * - updatePlayerReducer
 * - updateRaceReducer
 *
 * ### Related raisers
 * - tournamentNotFound
 * - playerNotFound
 */
const startRace = (dispatch, payload, state) => {
    const { tournamentId, playerId, raceText } = payload;
    // TODO: check race is ready to start
    // If the tournament is not found, call the raiser.
    if (!(tournamentId in state.game.tournamentsModel)) {
        (0, raisers_1.tournamentNotFound)(dispatch, tournamentId, `Started by: ${playerId}`);
        return;
    }
    // If the player who started the tournament is not found, call the raiser.
    if (!(playerId in state.game.playersModel)) {
        (0, raisers_1.playerNotFound)(dispatch, playerId, `While tournament starting: ${tournamentId}`);
        return;
    }
    // Number of races played in the past in this tournament.
    const numberOfRacesBefore = state.game.tournamentsModel[tournamentId].raceIds.length || 0;
    // Race index for next tournament with zero padding. (e.g. 001, 002, 003...)
    const raceIndex = (0, util_1.giveZeroPadding)(numberOfRacesBefore.toString(), constants_1.RACE_ID_LENGTH);
    // Compound race id.
    const raceId = `${tournamentId}-R:${raceIndex}`;
    // Player profiles which need to add for the race details.
    const players = {};
    // Adding players in the tournament at this moment to the race.
    for (const id of state.game.tournamentsModel[tournamentId].playerIds) {
        // If the player is not found, call the raiser.
        if (!(id in state.game.playersModel)) {
            (0, raisers_1.playerNotFound)(dispatch, id, `While players are being added to: ${tournamentId}`);
            return;
        }
        else {
            // Take the player in players model.
            const player = state.game.playersModel[id];
            players[id] = {
                name: player.name,
                avatarLink: player.avatarLink,
            };
            // Updating player state in playersModel. ("Idle" -> "Racing")
            const playerData = Object.assign(Object.assign({}, player), { state: models_1.AppPlayerState.Racing });
            dispatch.game.updatePlayerReducer({
                playerId: id,
                player: playerData,
            });
        }
    }
    // Timeout duration for recived race text.
    const timeoutDuration = (0, util_1.computeRaceDuration)(raceText);
    // Race details.
    const race = {
        text: raceText,
        timeoutDuration: timeoutDuration,
        startedTimestamp: new Date().getTime(),
        players: players,
        isOnGoing: true,
        raceStartedBy: playerId,
    };
    // Updating tournament state in tournamentsModel. ("Ready" -> "Race")
    dispatch.game.setTournamentState({
        tournamentId,
        tournamentState: models_1.AppTournamentState.Race,
    });
    // Add race to races model.
    dispatch.game.addRaceReducer({
        raceId,
        race,
    });
};
exports.startRace = startRace;
/** Effect function for ending race of the tournament.
 * Run the validation for the received payload.
 * If the race is found, then the race will be ended.
 * Leaderboard will be generated.
 * Tournament state will be updated to "Leaderboard".
 *
 * @param dispatch - The dispatch function of the store.
 * @param payload - The payload of the action.
 * @param state - The state of the store.
 *
 * ### Related reducers and effects
 * - updateTournamentReducer
 * - updateRaceReducer
 * - addLeaderboardReducer
 * - updatePlayerReducer
 *
 * ### Related raisers
 * - raceNotFound
 */
const endRace = (dispatch, payload, state) => {
    const { raceId } = payload;
    // If the race is not found, call the raiser.
    if (!(raceId in state.game.racesModel)) {
        (0, raisers_1.raceNotFound)(dispatch, raceId, 'While race ending');
        return;
    }
    // Extract tournament id from race id.
    const tournamentId = (0, util_1.extractId)(raceId, util_1.ExtractIdType.Race, util_1.ExtractIdType.Tournament);
    // Set tournament state to Leaderboard.
    dispatch.game.setTournamentState({
        tournamentId,
        tournamentState: models_1.AppTournamentState.Leaderboard,
    });
    // Get received race text length.
    const raceTextLength = state.game.racesModel[raceId].text.length;
    // Get leaderboard from player logs and add leaderboard.
    const leaderboard = (0, util_1.generateLeaderboard)(state.game.playerLogsModel, raceId, raceTextLength);
    dispatch.game.addLeaderboardReducer({
        leaderboardId: raceId,
        leaderboard,
    });
    // End race.
    const race = Object.assign(Object.assign({}, state.game.racesModel[raceId]), { isOnGoing: false });
    dispatch.game.updateRaceReducer({
        raceId,
        race,
    });
    // Set player state to "Idle" of all players in the tournament.
    for (const id of state.game.tournamentsModel[tournamentId].playerIds) {
        if (id in state.game.playersModel &&
            state.game.playersModel[id].state != models_1.AppPlayerState.Idle) {
            const player = Object.assign(Object.assign({}, state.game.playersModel[id]), { state: models_1.AppPlayerState.Idle });
            dispatch.game.updatePlayerReducer({
                playerId: id,
                player,
            });
        }
    }
};
exports.endRace = endRace;
//# sourceMappingURL=race.js.map