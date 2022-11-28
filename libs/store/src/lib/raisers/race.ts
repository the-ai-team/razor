import { AppErrorCode, AppMessageLogType } from '@razor/models';
import { Dispatch } from '../store';

export const raceNotFound = async (
  dispatch: Dispatch,
  rid: string,
  additionalMessage?: string,
): Promise<void> => {
  await dispatch.game.sendLogMessage({
    message: `Race with id ${rid} does not exist`,
    code: AppErrorCode.RaceNotExists,
    related: additionalMessage ? additionalMessage : '',
    type: AppMessageLogType.Error,
  });
};
