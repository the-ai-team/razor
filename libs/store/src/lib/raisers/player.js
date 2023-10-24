"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidPlayerNameLength = exports.invalidPlayerName = exports.playerNotFound = void 0;
const models_1 = require("@razor/models");
/** Logger raiser if a player cannot be found in players model.
 *
 * @param dispatch - Dispatch function of the store.
 * @param playerId - Id of the player who is not found.
 * @param additionalMessage - Additional message to be logged.
 */
const playerNotFound = (dispatch, playerId, additionalMessage) => {
    dispatch.game.sendLogMessage({
        message: `Player with id ${playerId} does not exist.`,
        code: models_1.AppErrorCode.PlayerNotExists,
        related: additionalMessage || '',
        type: models_1.AppMessageLogType.Error,
    });
};
exports.playerNotFound = playerNotFound;
/** Logger raiser if a player name is invalid.
 *
 * @param dispatch - Dispatch function of the store.
 */
const invalidPlayerName = (dispatch) => {
    dispatch.game.sendLogMessage({
        message: 'Player name is invalid.',
        code: models_1.AppErrorCode.InvalidPlayerName,
        related: '',
        type: models_1.AppMessageLogType.Error,
    });
};
exports.invalidPlayerName = invalidPlayerName;
/** Logger raiser if a player name length is invalid.
 *
 * @param dispatch - Dispatch function of the store.
 */
const invalidPlayerNameLength = (dispatch) => {
    dispatch.game.sendLogMessage({
        message: `Player name is too long or too short`,
        code: models_1.AppErrorCode.InvalidPlayerName,
        related: '',
        type: models_1.AppMessageLogType.Error,
    });
};
exports.invalidPlayerNameLength = invalidPlayerNameLength;
//# sourceMappingURL=player.js.map