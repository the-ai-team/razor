"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeStore = exports.store = exports.models = exports.game = void 0;
const core_1 = require("@rematch/core");
const effects_1 = require("./effects");
const initialState_1 = require("./initialState");
const reducers = require("./reducers");
exports.game = (0, core_1.createModel)()({
    state: initialState_1.initialState,
    reducers,
    effects: effects_1.effects,
});
/** Models for store
 *
 * `game` model has state, reducers and effects.
 * `state` will be initialized with initialState.
 * `reducers` contain core functionalities with store such as adding, updating, deleting.
 * `effects` contain calculating and generating operations which will pass down to reducers to add to the store.
 */
exports.models = { game: exports.game };
/** Redux rematch store
 *
 * Store has one model; game.
 */
exports.store = (0, core_1.init)({
    models: exports.models,
});
/** Function to initialize store
 *
 * This function will be used in tests to initialize many stores with custom initial state.
 * @param initialState - Initial state model
 * @returns Generated redux rematch store
 */
const initializeStore = (initialState) => {
    const game = (0, core_1.createModel)()({
        state: initialState,
        reducers,
        effects: effects_1.effects,
    });
    const models = { game };
    const store = (0, core_1.init)({
        models,
    });
    return store;
};
exports.initializeStore = initializeStore;
//# sourceMappingURL=store.js.map