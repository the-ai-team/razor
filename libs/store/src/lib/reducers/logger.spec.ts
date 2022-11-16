import { AppErrorCode } from '@razor/models';
import { initialState } from '../initialState';
import { initializeStore } from '../store';

describe('[Reducers] Logger', () => {
  // ====== Log Error ====== //
  it('Log error to the state', () => {
    const initialValues = initialState;
    const store = initializeStore(initialValues);
    const initialStoreState = store.getState();

    store.dispatch.game.logErrorReducer({
      errorLog: {
        message: 'Tournament with id T:testTOUR does not exist',
        code: AppErrorCode.TournamentNotExists,
        related: '',
      },
      errorTimestamp: '1234567890-testUID1',
    });

    const expectedResult = {
      ...initialValues,
      errorLogsModel: {
        ...initialValues.errorLogsModel,
        '1234567890-testUID1': {
          message: 'Tournament with id T:testTOUR does not exist',
          code: AppErrorCode.TournamentNotExists,
          related: '',
        },
      },
    };

    const gameState = store.getState();
    expect(gameState).toEqual({ ...initialStoreState, game: expectedResult });
  });
});
