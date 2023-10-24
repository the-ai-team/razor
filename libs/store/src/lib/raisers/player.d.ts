import { Dispatch } from '../store';
/** Logger raiser if a player cannot be found in players model.
 *
 * @param dispatch - Dispatch function of the store.
 * @param playerId - Id of the player who is not found.
 * @param additionalMessage - Additional message to be logged.
 */
export declare const playerNotFound: (dispatch: Dispatch, playerId: string, additionalMessage?: string) => void;
/** Logger raiser if a player name is invalid.
 *
 * @param dispatch - Dispatch function of the store.
 */
export declare const invalidPlayerName: (dispatch: Dispatch) => void;
/** Logger raiser if a player name length is invalid.
 *
 * @param dispatch - Dispatch function of the store.
 */
export declare const invalidPlayerNameLength: (dispatch: Dispatch) => void;
