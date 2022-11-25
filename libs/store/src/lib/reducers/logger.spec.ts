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
  // ====== Log Error ====== //
  it('should dispatch new log to the state', () => {
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

  it('should remove older logs if max logs count exceed when dispatching errors to the state', () => {
    //Initialize store with 1024 logs
    const maxLogs = MAX_ERR_LOGS_COUNT;
    const errorLogsGenerator = (count: number) => {
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
    const initialErrorLogs = errorLogsGenerator(maxLogs + 10); //Adding additional logs to check the oldest log is removed while the logs count is exceeding the max logs count

    const initialValues: AppStateModel = {
      ...initialState,
      errorLogsModel: initialErrorLogs,
    };

    const store = initializeStore(initialValues);
    const initialStoreState = store.getState();

    //Initilize a log which is ready to be dispatched
    const newErrorLog: AppErrorLog = {
      message: 'Tournament with id T:testTOR3 does not exist',
      code: AppErrorCode.TournamentNotExists,
      related: '',
    };

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

    // Adding the new log to the logs
    errorLogs = {
      ...errorLogs,
      ['1234567890-test9999']: newErrorLog,
    };

    // Dispatch the new log to the state
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
