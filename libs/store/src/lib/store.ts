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
const models: RootModel = { game };

export const store = init({
  models,
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;

store.dispatch({
  type: 'game/joinPlayer',
  payload: {
    tid: 'T:w',
    playerName: 'su ss',
  },
});
