"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTournamentState = void 0;
const raisers_1 = require("../raisers");
/** Effect function for setting tournament state.
 * Run the validation for the received payload.
 * If the tournament is found, then change the state of the tournament.
 *
 * @param dispatch - The dispatch function of the store.
 * @param payload - The payload of the action.
 * @param state - The state of the store.
 *
 * ### Related reducers and effects
 * - updateTournamentReducer
 *
 * ### Related raisers
 * - tournamentNotFound
 */
const setTournamentState = (dispatch, payload, state) => {
    const { tournamentId, tournamentState } = payload;
    if (!(tournamentId in state.game.tournamentsModel)) {
        (0, raisers_1.tournamentNotFound)(dispatch, tournamentId, `While setting ready`);
        return;
    }
    const tournament = Object.assign(Object.assign({}, state.game.tournamentsModel[tournamentId]), { state: tournamentState });
    dispatch.game.updateTournamentReducer({
        tournamentId,
        tournament,
    });
};
exports.setTournamentState = setTournamentState;
//# sourceMappingURL=tournament.js.map