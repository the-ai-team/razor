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
export const models: RootModel = { game };

export const store = init({
  models,
});

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
