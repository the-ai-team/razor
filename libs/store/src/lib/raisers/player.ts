import { AppErrorCode, AppMessageLogType } from '@razor/models';
import { Dispatch } from '../store';

export const playerNotFound = (
  dispatch: Dispatch,
  pid: string,
  additionalMessage?: string,
): void => {
  dispatch.game.sendLogMessage({
    message: `Player with id ${pid} does not exist`,
    code: AppErrorCode.PlayerNotExists,
    related: additionalMessage || '',
    type: AppMessageLogType.Error,
  });
};

export const invalidPlayerName = (dispatch: Dispatch): void => {
  dispatch.game.sendLogMessage({
    message: 'Player name is invalid',
    code: AppErrorCode.InvalidPlayerName,
    related: '',
    type: AppMessageLogType.Error,
  });
};

export const invalidPlayerNameLength = (dispatch: Dispatch): void => {
  dispatch.game.sendLogMessage({
    message: `Player name is too long or too short`,
    code: AppErrorCode.InvalidPlayerName,
    related: '',
    type: AppMessageLogType.Error,
  });
};
