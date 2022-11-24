import { AppStateModel } from '@razor/models';
import { Dispatch, initializeStore } from '../store';
import { payloadNotProvided } from './payload';

const initialState: AppStateModel = {
  tournamentsModel: {},
  playersModel: {},
  racesModel: {},
  leaderboardsModel: {},
  playerLogsModel: {},
  errorLogsModel: {},
};

describe('[Raisers]', () => {
  it('sendLogMessage', async () => {
    const store = initializeStore(initialState);
    const dispatch: Dispatch = store.dispatch;
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    await payloadNotProvided('function', dispatch, 'message');
    expect(consoleSpy).toHaveBeenCalled();
  });
});
