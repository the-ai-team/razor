import { AppStateModel } from '@razor/models';
import { Models, RematchDispatch, RematchRootState } from '@rematch/core';
import * as reducers from './reducers';
export declare const game: {
    name?: string | undefined;
    state: AppStateModel;
} & {
    effects: (dispatch: Dispatch) => {
        joinPlayer: (payload: import("./payloads").JoinPlayerPayload, state: RootState) => `P:${string}` | null;
        addPlayer: (payload: import("./payloads").AddPlayerPayload, state: RootState) => void;
        clearPlayer: (payload: import("./payloads").ClearPlayerPayload, state: RootState) => void;
        setTournamentState: (payload: import("./payloads").SetTournamentStatePayload, state: RootState) => void;
        startRace: (payload: import("./payloads").StartRacePayload, state: RootState) => void;
        endRace: (payload: import("./payloads").EndRacePayload, state: RootState) => void;
        sendTypeLog: (payload: import("./payloads").SendTypeLogPayload, state: RootState) => void;
        sendLogMessage: (payload: import("@razor/models").AppMessageLog) => void;
        replaceFullState: (payload: import("./payloads").ReplaceFullStatePayload) => void;
    };
} & {
    reducers: typeof reducers;
} & ({} | {
    baseReducer: import("redux").Reducer<AppStateModel>;
});
export interface RootModel extends Models<RootModel> {
    game: typeof game;
}
/** Models for store
 *
 * `game` model has state, reducers and effects.
 * `state` will be initialized with initialState.
 * `reducers` contain core functionalities with store such as adding, updating, deleting.
 * `effects` contain calculating and generating operations which will pass down to reducers to add to the store.
 */
export declare const models: RootModel;
/** Redux rematch store
 *
 * Store has one model; game.
 */
export declare const store: import("@rematch/core").RematchStore<RootModel, Record<string, never>>;
/** Function to initialize store
 *
 * This function will be used in tests to initialize many stores with custom initial state.
 * @param initialState - Initial state model
 * @returns Generated redux rematch store
 */
export declare const initializeStore: (initialState: AppStateModel) => import("@rematch/core").RematchStore<RootModel, Record<string, never>>;
export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
