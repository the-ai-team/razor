import { AppErrorCode, AppMessageLogType } from '@razor/models';
import { Dispatch } from '../store';

export const tournamentNotFound = async (
  dispatch: Dispatch,
  tid: string,
  additionalMessage?: string,
) => {
  dispatch.game.sendLogMessage({
    message: `Tournament with id ${tid} does not exist`,
    code: AppErrorCode.TournamentNotExists,
    related: additionalMessage ? additionalMessage : '',
    type: AppMessageLogType.Error,
  });
};

// TODO: add return types
// TODO: write docs
