import { AppErrorCode, AppMessageLogType } from '@razor/models';
import { Dispatch } from '../store';

export const tournamentNotFound = (
  dispatch: Dispatch,
  tid: string,
  additionalMessage?: string,
): void => {
  dispatch.game.sendLogMessage({
    message: `Tournament with id ${tid} does not exist`,
    code: AppErrorCode.TournamentNotExists,
    related: additionalMessage || '',
    type: AppMessageLogType.Error,
  });
};
