import { AppStateModel } from '@razor/models';
import { Dispatch, initializeStore } from '../store';
import { raceNotFound } from './race';

const initialState: AppStateModel = {
  tournamentsModel: {},
  playersModel: {},
  racesModel: {},
  leaderboardsModel: {},
  playerLogsModel: {},
  errorLogsModel: {},
};

describe('[Raisers]', () => {
  it('raceNotFound', async () => {
    const store = initializeStore(initialState);
    const dispatch: Dispatch = store.dispatch;
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    await raceNotFound(dispatch, 'R:notExist', 'message');
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('raceNotFound (without any message)', async () => {
    const store = initializeStore(initialState);
    const dispatch: Dispatch = store.dispatch;
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    await raceNotFound(dispatch, 'R:notExist');
    expect(consoleSpy).toHaveBeenCalled();
  });
});
