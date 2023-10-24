"use strict";
// ### [Effects] Logger operations ### //
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendLogMessage = void 0;
const models_1 = require("@razor/models");
const util_1 = require("@razor/util");
/** Effect function for sending a log message.
 * This effect will check the type of the log message which comes from the payload
 * and do the relevant operation.
 *
 * @param {Dispatch} dispatch - The dispatch function from the store
 * @param {AppMessageLog} payload - The payload which contains the log message
 *
 * ### Related reducers and effects
 * - logErrorReducer
 */
const sendLogMessage = (dispatch, payload) => {
    /** Current unix timestamp */
    const timestamp = new Date().getTime();
    const { message, code, related, type } = payload;
    /** General random id */
    const randomId = (0, util_1.generateUid)(models_1.AppIdNumberType.General);
    switch (type) {
        // If the type is an error, send the error to the state and log in to the console as an error.
        case models_1.AppMessageLogType.Error:
            console.error(`[Error ${code}]: ${message} (${related})`);
            dispatch.game.logErrorReducer({
                errorLog: {
                    message,
                    code,
                    related,
                },
                errorTimestamp: `${timestamp}-${randomId}`,
            });
            break;
        // If the type is a warning, log in to the console as a warning.
        case models_1.AppMessageLogType.Warn:
            console.warn(`[Warn ${code}]: ${message} (${related})`);
            break;
        // If the type is info, log in to the console as info.
        case models_1.AppMessageLogType.Info:
            console.info(`[Info ${code}]: ${message} (${related})`);
            break;
    }
};
exports.sendLogMessage = sendLogMessage;
//# sourceMappingURL=logger.js.map