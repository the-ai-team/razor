import { AppErrorCode, AppMessageLogType } from '@razor/models';
import { Dispatch } from '../store';

export const payloadNotProvided = (
  funcName: string,
  dispatch: Dispatch,
  payloadName: string,
): void => {
  dispatch.game.sendLogMessage({
    message: `[${funcName}] ${payloadName} is not provided`,
    code: AppErrorCode.PayloadNotProvided,
    related: '',
    type: AppMessageLogType.Error,
  });
};
