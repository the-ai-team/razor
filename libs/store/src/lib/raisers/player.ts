import { AppErrorCode, AppMessageLogType } from '@razor/models';
import { Dispatch } from '../store';

export const playerNotFound = async (
  dispatch: Dispatch,
  pid: string,
  additionalMessage?: string,
): Promise<void> => {
  await dispatch.game.sendLogMessage({
    message: `Player with id ${pid} does not exist`,
    code: AppErrorCode.PlayerNotExists,
    related: additionalMessage ? additionalMessage : '',
    type: AppMessageLogType.Error,
  });
};

export const invalidPlayerName = async (dispatch: Dispatch): Promise<void> => {
  await dispatch.game.sendLogMessage({
    message: 'Player name is invalid',
    code: AppErrorCode.InvalidPlayerName,
    related: '',
    type: AppMessageLogType.Error,
  });
};

export const invalidPlayerNameLength = async (
  dispatch: Dispatch,
): Promise<void> => {
  await dispatch.game.sendLogMessage({
    message: `Player name is too long or too short`,
    code: AppErrorCode.InvalidPlayerName,
    related: '',
    type: AppMessageLogType.Error,
  });
};
