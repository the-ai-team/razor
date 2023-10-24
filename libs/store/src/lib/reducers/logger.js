"use strict";
// ### [Reducers] Basic logger operations for store ### //
Object.defineProperty(exports, "__esModule", { value: true });
exports.logErrorReducer = void 0;
const constants_1 = require("@razor/constants");
const lodash_1 = require("lodash");
/** Reducer function for logging an error to state model.
 * Error will be added to the errors model.
 * If the errors model is at its max capacity, the oldest errors will be removed.
 
 * @param state - Current state model
 * @param payload - Payload for log error
 * @returns New state model if successful, else current state model
 */
const logErrorReducer = (state, payload) => {
    const { errorLog, errorTimestamp } = payload;
    let logModel = Object.assign({}, state.errorLogsModel);
    const maxLogs = constants_1.MAX_ERR_LOGS_COUNT;
    /** Current logs length */
    const logsLength = Object.keys(logModel).length;
    /** Number of logs exceeding the limit */
    let logDiff = maxLogs - logsLength;
    // While logs are exceeding the limit.
    while (logDiff <= 0) {
        /** Oldest log id */
        const lastKey = Object.keys(logModel)[0];
        /** New logs model after removing the oldest. */
        const newLogsModel = (0, lodash_1.omit)(logModel, [lastKey]);
        logModel = Object.assign({}, newLogsModel);
        logDiff++;
    }
    /** State model with new error log added to errors model. */
    const newState = Object.assign(Object.assign({}, state), { errorLogsModel: Object.assign(Object.assign({}, logModel), { [errorTimestamp]: errorLog }) });
    return newState;
};
exports.logErrorReducer = logErrorReducer;
//# sourceMappingURL=logger.js.map