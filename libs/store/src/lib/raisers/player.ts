import { AppErrorCode, AppMessageLogType } from '@razor/models';
import { Dispatch } from '../store';

/** Logger raiser if a player cannot be found in players model.
 *
 * @param dispatch - Dispatch function of the store.
 * @param playerId - Id of the player who is not found.
 * @param additionalMessage - Additional message to be logged.
 */
export const playerNotFound = (
  dispatch: Dispatch,
  playerId: string,
  additionalMessage?: string,
): void => {
  dispatch.game.sendLogMessage({
    message: `Player with id ${playerId} does not exist.`,
    code: AppErrorCode.PlayerNotExists,
    related: additionalMessage || '',
    type: AppMessageLogType.Error,
  });
};

/** Logger raiser if a player name is invalid.
 *
 * @param dispatch - Dispatch function of the store.
 */
export const invalidPlayerName = (dispatch: Dispatch): void => {
  dispatch.game.sendLogMessage({
    message: 'Player name is invalid.',
    code: AppErrorCode.InvalidPlayerName,
    related: '',
    type: AppMessageLogType.Error,
  });
};

/** Logger raiser if a player name length is invalid.
 *
 * @param dispatch - Dispatch function of the store.
 */
export const invalidPlayerNameLength = (dispatch: Dispatch): void => {
  dispatch.game.sendLogMessage({
    message: `Player name is too long or too short`,
    code: AppErrorCode.InvalidPlayerName,
    related: '',
    type: AppMessageLogType.Error,
  });
};
