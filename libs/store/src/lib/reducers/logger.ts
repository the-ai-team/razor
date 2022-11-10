import { AppStateModel } from '@razor/models';
import { logErrorReducerPayload } from '../payloads';

export const logErrorReducer = (
  state: AppStateModel,
  payload: logErrorReducerPayload,
) => {
  const { errorLog, errorTimestamp } = payload;
  const { message, code, relatedId } = errorLog;
  const newState: AppStateModel = {
    ...state,
    errorLogsModel: {
      ...state.errorLogsModel,
      [errorTimestamp]: errorLog,
    },
  };
  console.error(`[Error ${code}]: ${message} (${relatedId})`);
  return newState;
};
