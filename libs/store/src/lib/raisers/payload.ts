import { AppErrorCode, AppMessageLogType } from '@razor/models';
import { Dispatch } from '../store';

/** Logger raiser for payload not provided for a function.
 *
 * @param {string} funcName - Name of the function which is raising the error.
 * @param {Dispatch} dispatch - Dispatch function of the store.
 * @param {string} payloadName - Missing payload item.
 */
export const payloadNotProvided = (
  funcName: string,
  dispatch: Dispatch,
  payloadName: string,
): void => {
  dispatch.game.sendLogMessage({
    message: `[${funcName}] ${payloadName} is not provided.`,
    code: AppErrorCode.PayloadNotProvided,
    related: '',
    type: AppMessageLogType.Error,
  });
};
