import { AppStateModel } from '@razor/models';
import { UpdatePlayerLogReducerPayload, UpdatePlayerReducerPayload, UpdateRaceReducerPayload, UpdateTournamentReducerPayload } from '../payloads';
/** Reducer function for updating a tournament in the state model.
 * Tournament in tournaments model will be updated with the given tournament.
 *
 * @param state - Current state model
 * @param payload - Payload for update tournament
 * @returns New state model if successful, else current state model
 */
export declare const updateTournamentReducer: (state: AppStateModel, payload: UpdateTournamentReducerPayload) => AppStateModel;
/** Reducer function for updating a race in the state model.
 * Race in races model will be updated with the given race.
 *
 * @param state - Current state model
 * @param payload - Payload for update race
 * @returns New state model if successful, else current state model
 */
export declare const updateRaceReducer: (state: AppStateModel, payload: UpdateRaceReducerPayload) => AppStateModel;
/** Reducer function for updating a player in the state model.
 * Player in players model will be updated with the given player.
 *
 * @param state - Current state model
 * @param payload - Payload for update player
 * @returns New state model if successful, else current state model
 */
export declare const updatePlayerReducer: (state: AppStateModel, payload: UpdatePlayerReducerPayload) => AppStateModel;
/** Reducer function for updating a player log-in state model.
 * Player log-in player logs model will be updated with the given player log.
 *
 * @param state - Current state model
 * @param payload - Payload for updating player log
 * @returns New state model if successful, else current state model
 */
export declare const updatePlayerLogReducer: (state: AppStateModel, payload: UpdatePlayerLogReducerPayload) => AppStateModel;
