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
  it('playerNotFound', () => {
    const store = initializeStore(initialState);
    const dispatch: Dispatch = store.dispatch;
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    playerNotFound(dispatch, 'P:notExist', 'message');
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('playerNotFound (without any message)', () => {
    const store = initializeStore(initialState);
    const dispatch: Dispatch = store.dispatch;
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    playerNotFound(dispatch, 'P:notExist');
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('invalidPlayerName', () => {
    const store = initializeStore(initialState);
    const dispatch: Dispatch = store.dispatch;
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    invalidPlayerName(dispatch);
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('invalidPlayerNameLength', () => {
    const store = initializeStore(initialState);
    const dispatch: Dispatch = store.dispatch;
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    invalidPlayerNameLength(dispatch);
    expect(consoleSpy).toHaveBeenCalled();
  });
});
