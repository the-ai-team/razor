import { Dispatch } from '../store';
/** Logger raiser if a tournament cannot be found in the tournaments model.
 *
 * @param dispatch - Dispatch function of the store.
 * @param tid - Id of the tournament which is not found.
 * @param additionalMessage - Additional message to be logged.
 */
export declare const tournamentNotFound: (dispatch: Dispatch, tid: string, additionalMessage?: string) => void;
