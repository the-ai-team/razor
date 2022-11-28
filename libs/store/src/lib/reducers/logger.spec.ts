import { MAX_ERR_LOGS_COUNT } from '@razor/constants';
import {
  AppErrorCode,
  AppErrorLog,
  AppErrorLogs,
  AppErrorTimestamp,
  AppStateModel,
} from '@razor/models';
import { giveZeroPadding } from '@razor/util';
import { omit } from 'lodash';
import { initializeStore } from '../store';

const initialState: AppStateModel = {
  tournamentsModel: {},
  playersModel: {},
  racesModel: {},
  leaderboardsModel: {},
  playerLogsModel: {},
  errorLogsModel: {},
};

describe('[Reducers] Logger', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('(id) => Add new log to logs model', () => {
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

  it('(all valid, logs exceeding max limit) => Remove older logs, Add new log to logs model', () => {
    const maxLogs = MAX_ERR_LOGS_COUNT;

    // TODO: move function to mocks
    /** Generate sample error logs.
     * Return error log with the given length.
     *
     * @param {number} count - Log length
     * @returns {AppErrorLogs} - Mock error logs
     */
    const errorLogsGenerator = (count: number): AppErrorLogs => {
      const codes = [
        AppErrorCode.TournamentNotExists,
        AppErrorCode.PlayerNotExists,
        AppErrorCode.RaceNotExists,
        AppErrorCode.InvalidPlayerName,
      ];
      const messages = [
        'Tournament with id T:testTOUR does not exist',
        'Player with id P:testPLAYER does not exist',
        'Race with id R:testRACE does not exist',
        'Player name is invalid',
      ];

      const errorLogs: AppErrorLogs = {};
      for (let i = 0; i < count; i++) {
        const id = `1234567890-test${giveZeroPadding(i.toString(), 4)}`;
        const randomNum = Math.floor(Math.random() * 4);
        errorLogs[id] = {
          message: messages[randomNum],
          code: codes[randomNum],
          related: '',
        };
      }
      return errorLogs;
    };

    // Adding a few additional logs to check every older log that exceeds the limit is removed.
    const initialErrorLogs = errorLogsGenerator(maxLogs + 10);

    const initialValues: AppStateModel = {
      ...initialState,
      errorLogsModel: initialErrorLogs,
    };

    const store = initializeStore(initialValues);
    const initialStoreState = store.getState();

    // Initilize a log that is ready to be dispatched.
    const newErrorLog: AppErrorLog = {
      message: 'Tournament with id T:testTOR3 does not exist',
      code: AppErrorCode.TournamentNotExists,
      related: '',
    };

    // Initilaize error logs model with initial logs.
    let errorLogs: AppErrorLogs = {
      ...initialErrorLogs,
    };
    const errorLogsLength = Object.keys(errorLogs).length;

    // Remove the oldest log if the logs count is exceeding the max logs count
    let logDiff = maxLogs - errorLogsLength;
    while (logDiff <= 0) {
      const lastKey: AppErrorTimestamp = Object.keys(errorLogs)[0];
      const newLogsModel = omit(errorLogs, [lastKey]);
      errorLogs = { ...newLogsModel };
      logDiff++;
    }

    // Adding the newly created log to the logs model
    errorLogs = {
      ...errorLogs,
      ['1234567890-test9999']: newErrorLog,
    };

    // Dispatch the new error logs to the state
    store.dispatch.game.logErrorReducer({
      errorLog: newErrorLog,
      errorTimestamp: '1234567890-test9999',
    });

    const expectedResult = {
      ...initialValues,
      errorLogsModel: errorLogs,
    };

    const gameState = store.getState();
    expect(gameState).toEqual({
      ...initialStoreState,
      game: expectedResult,
    });
  });
});
