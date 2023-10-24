"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.effects = void 0;
const logger_1 = require("./logger");
const player_1 = require("./player");
const race_1 = require("./race");
const replacers_1 = require("./replacers");
const tournament_1 = require("./tournament");
/** Effects functions of the store
 *
 * Effects are calculating and generating operations which will pass the data to the reducers to dispatch to the store.
 */
const effects = (dispatch) => ({
    joinPlayer: (payload, state) => (0, player_1.joinPlayer)(dispatch, payload, state),
    addPlayer: (payload, state) => (0, player_1.addPlayer)(dispatch, payload, state),
    clearPlayer: (payload, state) => (0, player_1.clearPlayer)(dispatch, payload, state),
    setTournamentState: (payload, state) => (0, tournament_1.setTournamentState)(dispatch, payload, state),
    startRace: (payload, state) => (0, race_1.startRace)(dispatch, payload, state),
    endRace: (payload, state) => (0, race_1.endRace)(dispatch, payload, state),
    sendTypeLog: (payload, state) => (0, player_1.sendTypeLog)(dispatch, payload, state),
    sendLogMessage: (payload) => (0, logger_1.sendLogMessage)(dispatch, payload),
    replaceFullState: (payload) => (0, replacers_1.replaceFullState)(dispatch, payload),
});
exports.effects = effects;
//# sourceMappingURL=effects.js.map