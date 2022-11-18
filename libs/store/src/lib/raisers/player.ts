import { AppErrorCode, AppMessageLogType } from '@razor/models';
import { Dispatch } from '../store';

export const playerNotFound = async (
  dispatch: Dispatch,
  pid: string,
  additionalMessage?: string,
) => {
  dispatch.game.sendLogMessage({
    message: `Player with id ${pid} does not exist`,
    code: AppErrorCode.PlayerNotExists,
    related: additionalMessage ? additionalMessage : '',
    type: AppMessageLogType.Error,
  });
  return;
};

export const invalidPlayerName = async (dispatch: Dispatch) => {
  dispatch.game.sendLogMessage({
    message: 'Player name is invalid',
    code: AppErrorCode.InvalidPlayerName,
    related: '',
    type: AppMessageLogType.Error,
  });
  return;
};

export const invalidPlayerNameLength = async (dispatch: Dispatch) => {
  dispatch.game.sendLogMessage({
    message: `Player name is too long or too short`,
    code: AppErrorCode.InvalidPlayerName,
    related: '',
    type: AppMessageLogType.Error,
  });
  return;
};
