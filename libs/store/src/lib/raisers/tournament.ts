import { AppErrorCode, AppMessageLogType } from '@razor/models';
import { Dispatch } from '../store';

export const tournamentNotFound = async (
  dispatch: Dispatch,
  tid: string,
  additionalMessage?: string,
): Promise<void> => {
  await dispatch.game.sendLogMessage({
    message: `Tournament with id ${tid} does not exist`,
    code: AppErrorCode.TournamentNotExists,
    related: additionalMessage ? additionalMessage : '',
    type: AppMessageLogType.Error,
  });
};
