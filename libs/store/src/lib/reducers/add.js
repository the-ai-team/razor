"use strict";
// ### [Reducers] Basic add operations for store ### //
Object.defineProperty(exports, "__esModule", { value: true });
exports.addLeaderboardReducer = exports.addPlayerReducer = exports.addRaceReducer = exports.addTournamentReducer = void 0;
const util_1 = require("@razor/util");
/** Reducer function for adding tournament to state model.
 * Tournament will be added to the tournaments model.
 *
 * @param state - Current state model
 * @param payload - Payload for add tournament
 * @returns New state model if successful, else current state model
 */
const addTournamentReducer = (state, payload) => {
    const { tournamentId, tournament } = payload;
    // If the tournament already exists.
    if (tournamentId in state.tournamentsModel) {
        return state;
    }
    /** State model with tournament added to tournaments model with data assigned. */
    const newState = Object.assign(Object.assign({}, state), { tournamentsModel: Object.assign(Object.assign({}, state.tournamentsModel), { [tournamentId]: tournament }) });
    return newState;
};
exports.addTournamentReducer = addTournamentReducer;
/** Reducer function for adding race to state model.
 * Race will be added to the races model and race id will be added to the relevant tournament.
 *
 * @param state - Current state model
 * @param payload - Payload for adding race
 * @returns New state model if successful, else current state model
 */
const addRaceReducer = (state, payload) => {
    const { raceId, race } = payload;
    /** Extract tournaemnt id from race id */
    const tournamentId = (0, util_1.extractId)(raceId, util_1.ExtractIdType.Race, util_1.ExtractIdType.Tournament);
    // If the tournament does not exists.
    if (!(tournamentId in state.tournamentsModel)) {
        return state;
    }
    // If race already exists.
    if (raceId in state.racesModel) {
        return state;
    }
    /** State model with new race added to races model and race id added to the tournament. */
    const newState = Object.assign(Object.assign({}, state), { tournamentsModel: Object.assign(Object.assign({}, state.tournamentsModel), { [tournamentId]: Object.assign(Object.assign({}, state.tournamentsModel[tournamentId]), { raceIds: [...state.tournamentsModel[tournamentId].raceIds, raceId] }) }), racesModel: Object.assign(Object.assign({}, state.racesModel), { [raceId]: Object.assign({}, race) }) });
    return newState;
};
exports.addRaceReducer = addRaceReducer;
/** Reducer function for adding a player to the state model.
 * Player will be added to the players model and the player id will be added to the relevant tournament.
 *
 * @param state - Current state model
 * @param payload - Payload for add leaderboard
 * @returns New state model if successful, else current state model
 */
const addPlayerReducer = (state, payload) => {
    const { tournamentId, playerId, player } = payload;
    // If the tournament does not exists.
    if (!(tournamentId in state.tournamentsModel)) {
        return state;
    }
    // If the player already exists.
    if (playerId in state.playersModel) {
        return state;
    }
    /** State model with new player added to players model and player id added to the tournament. */
    const newState = Object.assign(Object.assign({}, state), { tournamentsModel: Object.assign(Object.assign({}, state.tournamentsModel), { [tournamentId]: Object.assign(Object.assign({}, state.tournamentsModel[tournamentId]), { playerIds: [
                    ...state.tournamentsModel[tournamentId].playerIds,
                    playerId,
                ] }) }), playersModel: Object.assign(Object.assign({}, state.playersModel), { [playerId]: Object.assign({}, player) }) });
    return newState;
};
exports.addPlayerReducer = addPlayerReducer;
/** Reducer function for adding leaderboard to state model.
 * Leaderboard will be added to the leaderboards model.
 *
 * @param state - Current state model
 * @param payload - Payload for add leaderboard
 * @returns New state model if successful, else current state model
 */
const addLeaderboardReducer = (state, payload) => {
    const { leaderboardId, leaderboard } = payload;
    // If leaderboard already exists.
    if (leaderboardId in state.leaderboardsModel) {
        return state;
    }
    /** State model with new leaderboard added to leaderboards model. */
    const newState = Object.assign(Object.assign({}, state), { leaderboardsModel: Object.assign(Object.assign({}, state.leaderboardsModel), { [leaderboardId]: [...leaderboard] }) });
    return newState;
};
exports.addLeaderboardReducer = addLeaderboardReducer;
//# sourceMappingURL=add.js.map