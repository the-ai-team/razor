import { AppErrorTimestamp, AppStateModel } from '@razor/models';
import { logErrorReducerPayload } from '../payloads';

export const logErrorReducer = (
  state: AppStateModel,
  payload: logErrorReducerPayload,
): AppStateModel => {
  const { errorLog, errorTimestamp } = payload;
  let logModel = { ...state.errorLogsModel };

  const maxLogs = 1024;
  const logsLength = Object.keys(state.errorLogsModel).length;

  if (logsLength > maxLogs - 1) {
    const lastKey: AppErrorTimestamp = Object.keys(state.errorLogsModel)[0];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [lastKey]: removedLog, ...newLogModel } = state.errorLogsModel;
    logModel = { ...newLogModel };
  }

  console.log(state.errorLogsModel);

  const newState: AppStateModel = {
    ...state,
    errorLogsModel: {
      ...logModel,
      [errorTimestamp]: errorLog,
    },
  };

  return newState;
};
