// ### [Reducers] Basic logger operations for store ### //

import { MAX_ERR_LOGS_COUNT } from '@razor/constants';
import { AppErrorTimestamp, AppStateModel } from '@razor/models';
import { omit } from 'lodash';
import { logErrorReducerPayload } from '../payloads';

/** Reducer effect for log an error to state model.
 * Error will be added to errors model.
 * If errors model is at max capacity, oldest errors will be removed.
 
 * @param {AppStateModel} state - Current state model
 * @param {logErrorReducerPayload} payload - Payload for log error
 * @returns {AppStateModel} - New state model if successful, else current state model
 */
export const logErrorReducer = (
  state: AppStateModel,
  payload: logErrorReducerPayload,
): AppStateModel => {
  const { errorLog, errorTimestamp } = payload;
  let logModel = { ...state.errorLogsModel };

  const maxLogs = MAX_ERR_LOGS_COUNT;
  /** Current logs length */
  const logsLength = Object.keys(logModel).length;

  /** Number of logs exceeding the limit */
  let logDiff = maxLogs - logsLength;
  // While logs are exceeding the limit.
  while (logDiff <= 0) {
    /** Oldest log id */
    const lastKey: AppErrorTimestamp = Object.keys(logModel)[0];
    /** New logs model after removing the oldest. */
    const newLogsModel = omit(logModel, [lastKey]);
    logModel = { ...newLogsModel };
    logDiff++;
  }

  /** State model with new error log added to errors model. */
  const newState: AppStateModel = {
    ...state,
    errorLogsModel: {
      ...logModel,
      [errorTimestamp]: errorLog,
    },
  };

  return newState;
};
