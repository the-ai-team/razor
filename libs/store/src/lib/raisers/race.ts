import { AppErrorCode, AppMessageLogType } from '@razor/models';
import { Dispatch } from '../store';

/** Logger raiser if a race cannot be found in races model.
 *
 * @param {Dispatch} dispatch - Dispatch function of the store.
 * @param {string} raceId - Id of the race which is not found.
 * @param {string} additionalMessage - Additional message to be logged.
 */
export const raceNotFound = (
  dispatch: Dispatch,
  raceId: string,
  additionalMessage?: string,
): void => {
  dispatch.game.sendLogMessage({
    message: `Race with id ${raceId} does not exist.`,
    code: AppErrorCode.RaceNotExists,
    related: additionalMessage || '',
    type: AppMessageLogType.Error,
  });
};
