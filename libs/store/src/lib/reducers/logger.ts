import { MAX_ERR_LOGS_COUNT } from '@razor/constants';
import { AppErrorTimestamp, AppStateModel } from '@razor/models';
import { omit } from 'lodash';
import { logErrorReducerPayload } from '../payloads';

export const logErrorReducer = (
  state: AppStateModel,
  payload: logErrorReducerPayload,
): AppStateModel => {
  const { errorLog, errorTimestamp } = payload;
  let logModel = { ...state.errorLogsModel };

  const maxLogs = MAX_ERR_LOGS_COUNT;
  const logsLength = Object.keys(logModel).length;

  let logDiff = maxLogs - logsLength;
  while (logDiff <= 0) {
    const lastKey: AppErrorTimestamp = Object.keys(logModel)[0];
    const newLogsModel = omit(logModel, [lastKey]);
    logModel = { ...newLogsModel };
    logDiff++;
  }

  const newState: AppStateModel = {
    ...state,
    errorLogsModel: {
      ...logModel,
      [errorTimestamp]: errorLog,
    },
  };

  return newState;
};
