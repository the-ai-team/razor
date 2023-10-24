"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.raceNotFound = void 0;
const models_1 = require("@razor/models");
/** Logger raiser if a race cannot be found in races model.
 *
 * @param dispatch - Dispatch function of the store.
 * @param raceId - Id of the race which is not found.
 * @param additionalMessage - Additional message to be logged.
 */
const raceNotFound = (dispatch, raceId, additionalMessage) => {
    dispatch.game.sendLogMessage({
        message: `Race with id ${raceId} does not exist.`,
        code: models_1.AppErrorCode.RaceNotExists,
        related: additionalMessage || '',
        type: models_1.AppMessageLogType.Error,
    });
};
exports.raceNotFound = raceNotFound;
//# sourceMappingURL=race.js.map