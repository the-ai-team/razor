import { AppStateModel } from '@razor/models';
import { Dispatch, initializeStore } from '../store';
import {
  invalidPlayerName,
  invalidPlayerNameLength,
  playerNotFound,
} from './player';

const initialState: AppStateModel = {
  tournamentsModel: {},
  playersModel: {},
  racesModel: {},
  leaderboardsModel: {},
  playerLogsModel: {},
  errorLogsModel: {},
};

describe('[Raisers]', () => {
  it('playerNotFound', async () => {
    const store = initializeStore(initialState);
    const dispatch: Dispatch = store.dispatch;
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    await playerNotFound(dispatch, 'P:notExist', 'message');
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('playerNotFound (without any message)', async () => {
    const store = initializeStore(initialState);
    const dispatch: Dispatch = store.dispatch;
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    await playerNotFound(dispatch, 'P:notExist');
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('invalidPlayerName', async () => {
    const store = initializeStore(initialState);
    const dispatch: Dispatch = store.dispatch;
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    await invalidPlayerName(dispatch);
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('invalidPlayerNameLength', async () => {
    const store = initializeStore(initialState);
    const dispatch: Dispatch = store.dispatch;
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    await invalidPlayerNameLength(dispatch);
    expect(consoleSpy).toHaveBeenCalled();
  });
});
