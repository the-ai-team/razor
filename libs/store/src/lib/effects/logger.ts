// ### [Effects] Logger operations ### //

import {
  AppIdNumberType,
  AppMessageLog,
  AppMessageLogType,
} from '@razor/models';
import { generateUid } from '@razor/util';

import { Dispatch } from '../store';

/** Effect function for sending a log message.
 * This effect will check the type of the log message which comes from the payload
 * and do the relevant operation.
 *
 * @param {Dispatch} dispatch - The dispatch function from the store
 * @param {AppMessageLog} payload - The payload which contains the log message
 *
 * ### Related reducers and effects
 * - logErrorReducer
 */
export const sendLogMessage = (
  dispatch: Dispatch,
  payload: AppMessageLog,
): void => {
  /** Current unix timestamp */
  const timestamp: number = new Date().getTime();
  const { message, code, related, type } = payload;

  /** General random id */
  const randomId = generateUid(AppIdNumberType.General);

  switch (type) {
    // If the type is an error, send the error to the state and log in to the console as an error.
    case AppMessageLogType.Error:
      console.error(`[Error ${code}]: ${message} (${related})`);

      dispatch.game.logErrorReducer({
        errorLog: {
          message,
          code,
          related,
        },
        errorTimestamp: `${timestamp}-${randomId}`,
      });
      break;
    // If the type is a warning, log in to the console as a warning.
    case AppMessageLogType.Warn:
      console.warn(`[Warn ${code}]: ${message} (${related})`);
      break;
    // If the type is info, log in to the console as info.
    case AppMessageLogType.Info:
      console.info(`[Info ${code}]: ${message} (${related})`);
      break;
  }
};
