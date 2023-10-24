"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tournamentNotFound = void 0;
const models_1 = require("@razor/models");
/** Logger raiser if a tournament cannot be found in the tournaments model.
 *
 * @param dispatch - Dispatch function of the store.
 * @param tid - Id of the tournament which is not found.
 * @param additionalMessage - Additional message to be logged.
 */
const tournamentNotFound = (dispatch, tid, additionalMessage) => {
    dispatch.game.sendLogMessage({
        message: `Tournament with id ${tid} does not exist.`,
        code: models_1.AppErrorCode.TournamentNotExists,
        related: additionalMessage || '',
        type: models_1.AppMessageLogType.Error,
    });
};
exports.tournamentNotFound = tournamentNotFound;
//# sourceMappingURL=tournament.js.map