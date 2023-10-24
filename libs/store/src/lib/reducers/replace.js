"use strict";
// ### [Reducers] Replace operations for store ### //
// Replace functions will replace the state with the given payload. These methods will be used for syncing client state with server state.
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceFullStateReducer = void 0;
/** Reducer function for replacing entire state.
 * Newly joining players will use this reducer to replace their current state with the state from the server.
 *
 * @param state - Current state model
 * @param payload - Payload for replacing state
 */
const replaceFullStateReducer = (state, payload) => {
    const { parentState } = payload;
    /** State model after replacing full game */
    const newState = Object.assign(Object.assign({}, parentState), { errorLogsModel: Object.assign({}, state.errorLogsModel) });
    return newState;
};
exports.replaceFullStateReducer = replaceFullStateReducer;
//# sourceMappingURL=replace.js.map