import { AppErrorCode, AppMessageLogType } from '@razor/models';
import { Dispatch } from '../store';

export const raceNotFound = (
  dispatch: Dispatch,
  rid: string,
  additionalMessage?: string,
): void => {
  dispatch.game.sendLogMessage({
    message: `Race with id ${rid} does not exist`,
    code: AppErrorCode.RaceNotExists,
    related: additionalMessage || '',
    type: AppMessageLogType.Error,
  });
};
