"use strict";
// ### [Reducers] Basic update operations for store ### //
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePlayerLogReducer = exports.updatePlayerReducer = exports.updateRaceReducer = exports.updateTournamentReducer = void 0;
/** Reducer function for updating a tournament in the state model.
 * Tournament in tournaments model will be updated with the given tournament.
 *
 * @param state - Current state model
 * @param payload - Payload for update tournament
 * @returns New state model if successful, else current state model
 */
const updateTournamentReducer = (state, payload) => {
    const { tournamentId, tournament } = payload;
    // If the tournament does not exists.
    if (!(tournamentId in state.tournamentsModel)) {
        return state;
    }
    /** State model after updating specific tournament in tournaments model. */
    const newState = Object.assign(Object.assign({}, state), { tournamentsModel: Object.assign(Object.assign({}, state.tournamentsModel), { [tournamentId]: Object.assign({}, tournament) }) });
    return newState;
};
exports.updateTournamentReducer = updateTournamentReducer;
/** Reducer function for updating a race in the state model.
 * Race in races model will be updated with the given race.
 *
 * @param state - Current state model
 * @param payload - Payload for update race
 * @returns New state model if successful, else current state model
 */
const updateRaceReducer = (state, payload) => {
    const { raceId, race } = payload;
    // If the race does not exists.
    if (!(raceId in state.racesModel)) {
        return state;
    }
    /** State model after updating specific race in races model. */
    const newState = Object.assign(Object.assign({}, state), { racesModel: Object.assign(Object.assign({}, state.racesModel), { [raceId]: Object.assign({}, race) }) });
    return newState;
};
exports.updateRaceReducer = updateRaceReducer;
/** Reducer function for updating a player in the state model.
 * Player in players model will be updated with the given player.
 *
 * @param state - Current state model
 * @param payload - Payload for update player
 * @returns New state model if successful, else current state model
 */
const updatePlayerReducer = (state, payload) => {
    const { playerId, player } = payload;
    // If the player does not exists.
    if (!(playerId in state.playersModel)) {
        return state;
    }
    /** State model after updating specific player in players model. */
    const newState = Object.assign(Object.assign({}, state), { playersModel: Object.assign(Object.assign({}, state.playersModel), { [playerId]: Object.assign({}, player) }) });
    return newState;
};
exports.updatePlayerReducer = updatePlayerReducer;
/** Reducer function for updating a player log-in state model.
 * Player log-in player logs model will be updated with the given player log.
 *
 * @param state - Current state model
 * @param payload - Payload for updating player log
 * @returns New state model if successful, else current state model
 */
const updatePlayerLogReducer = (state, payload) => {
    const { playerLogId, playerLog } = payload;
    const existingPlayerLogs = state.playerLogsModel[playerLogId] || [];
    const updatedPlayerLogs = Array.isArray(playerLog)
        ? [...existingPlayerLogs, ...playerLog]
        : [...existingPlayerLogs, playerLog];
    /** State model after updating specific player log-in player logs model. */
    const newState = Object.assign(Object.assign({}, state), { playerLogsModel: Object.assign(Object.assign({}, state.playerLogsModel), { [playerLogId]: updatedPlayerLogs }) });
    return newState;
};
exports.updatePlayerLogReducer = updatePlayerLogReducer;
//# sourceMappingURL=update.js.map