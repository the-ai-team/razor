"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceFullState = void 0;
/** Effect function for repalce full state
 * Replace the entire state with the given state.
 *
 * @param dispatch - The dispatch function of the store.
 * @param payload - The payload of the action.
 * @param state - The state of the store.
 *
 * ### Related reducers and effects
 * - replaceFullStateReducer
 *
 * ### Related raisers
 * - incompleteState
 */
const replaceFullState = (dispatch, payload) => {
    const { parentState } = payload;
    dispatch.game.replaceFullStateReducer({
        parentState,
    });
};
exports.replaceFullState = replaceFullState;
//# sourceMappingURL=replacers.js.map