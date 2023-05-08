// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  M_TOURNAMENT_ID0,
  M_TOURNAMENT_ID1,
  M_TOURNAMENT0,
  M_TOURNAMENT1,
  mockPlayersModel,
} from '@razor/mocks';
import { AppSnapshot, AppStateModel } from '@razor/models';

import { initializeStore } from '../store';

const initialState: AppStateModel = {
  tournamentsModel: {},
  playersModel: {},
  racesModel: {},
  leaderboardsModel: {},
  playerLogsModel: {},
  errorLogsModel: {},
};

describe('[Effects] Replacers', () => {
  it('(snapshot) => Replace full game state', () => {
    const initialValues: AppStateModel = {
      ...initialState,
      tournamentsModel: {
        [M_TOURNAMENT_ID0]: M_TOURNAMENT0,
      },
      playersModel: mockPlayersModel([0, 3]),
      racesModel: {},
      leaderboardsModel: {},
      playerLogsModel: {},
      errorLogsModel: {},
    };

    const store = initializeStore(initialValues);
    const initialStoreState = store.getState();

    const snapshot: AppSnapshot = {
      tournamentsModel: {
        [M_TOURNAMENT_ID1]: M_TOURNAMENT1,
      },
      playersModel: mockPlayersModel([0, 3]),
      racesModel: {},
      leaderboardsModel: {},
      playerLogsModel: {},
    };

    store.dispatch.game.replaceFullState({
      parentState: snapshot,
    });

    const storeState = store.getState();

    const expectedResult = {
      ...snapshot,
      errorLogsModel: {
        ...initialState.errorLogsModel,
      },
    };

    expect(storeState).toEqual({
      ...initialStoreState,
      game: expectedResult,
    });
  });
});
