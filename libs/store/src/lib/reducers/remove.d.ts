import { AppStateModel } from '@razor/models';
import { RemovePlayerReducerPayload, RemoveTournamentReducerPayload } from '../payloads';
/** Reducer function for removing the player from the state model.
 * Player will be removed from players model.
 * Related player ids array of the tournament will be updated.
 *
 * @param state - Current state model
 * @param payload - Payload for removing player
 * @returns New state model if successful, else current state model
 */
export declare const removePlayerReducer: (state: AppStateModel, payload: RemovePlayerReducerPayload) => AppStateModel;
/** Reducer function for removing tournament from state model.
 * Tournament will be removed from the tournament model.
 * Each player of the tournament will be removed from the players model.
 * Each race of the tournament will be removed from the races model.
 * Each player log of the tournament will be removed from the player logs model.
 *
 * @param state - Current state model
 * @param payload - Payload for removing tournament
 * @returns New state model if successful, else current state model
 */
export declare const removeTournamentReducer: (state: AppStateModel, payload: RemoveTournamentReducerPayload) => AppStateModel;
