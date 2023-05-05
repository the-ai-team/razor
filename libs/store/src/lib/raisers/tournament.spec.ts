import { AppStateModel } from '@razor/models';

import { Dispatch, initializeStore } from '../store';

import { tournamentNotFound } from './tournament';

const initialState: AppStateModel = {
  tournamentsModel: {},
  playersModel: {},
  racesModel: {},
  leaderboardsModel: {},
  playerLogsModel: {},
  errorLogsModel: {},
};

describe('[Raisers]', () => {
  it('tournamentNotFound', () => {
    const store = initializeStore(initialState);
    const dispatch: Dispatch = store.dispatch;
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    tournamentNotFound(dispatch, 'T:notExist', 'message');
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('tournamentNotFound (without any message)', () => {
    const store = initializeStore(initialState);
    const dispatch: Dispatch = store.dispatch;
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    tournamentNotFound(dispatch, 'T:notExist');
    expect(consoleSpy).toHaveBeenCalled();
  });
});
