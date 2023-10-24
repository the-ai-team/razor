import { Dispatch } from '../store';
/** Logger raiser if a race cannot be found in races model.
 *
 * @param dispatch - Dispatch function of the store.
 * @param raceId - Id of the race which is not found.
 * @param additionalMessage - Additional message to be logged.
 */
export declare const raceNotFound: (dispatch: Dispatch, raceId: string, additionalMessage?: string) => void;
