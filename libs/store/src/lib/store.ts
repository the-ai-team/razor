import { AppStateModel } from '@razor/models';
import {
  createModel,
  init,
  Models,
  RematchDispatch,
  RematchRootState,
} from '@rematch/core';
import { effects } from './effects';
import { initialState } from './initialState';
import * as reducers from './reducers';

export const game = createModel<RootModel>()({
  state: initialState,
  reducers,
  effects,
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
export const models: RootModel = { game };

/** Redux rematch store
 *
 * Store has one model; game.
 */
export const store = init({
  models,
});

/** Function to initialize store
 *
 * This function will be used in tests to initialize many stores with custom initial state.
 * @param initialState - Initial state model
 * @returns Generated redux rematch store
 */
export const initializeStore = (initialState: AppStateModel): Store => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const game: any = createModel<RootModel>()({
    state: initialState,
    reducers,
    effects,
  });

  interface RootModel extends Models<RootModel> {
    game: typeof game;
  }
  const models: RootModel = { game };
  const store = init({
    models,
  });
  return store;
};

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
