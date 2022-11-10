import { AppStateModel } from '@razor/models';
import { logErrorReducerPayload } from '../payloads';

export const logErrorReducer = (
  state: AppStateModel,
  payload: logErrorReducerPayload,
): AppStateModel => {
  const { errorLog, errorTimestamp } = payload;
  const newState: AppStateModel = {
    ...state,
    errorLogsModel: {
      ...state.errorLogsModel,
      [errorTimestamp]: errorLog,
    },
  };
  return newState;
};
