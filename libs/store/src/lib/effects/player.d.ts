import { PlayerId } from '@razor/models';
import { AddPlayerPayload, ClearPlayerPayload, JoinPlayerPayload, SendTypeLogPayload } from '../payloads';
import { Dispatch, RootState } from '../store';
/** Effect function for joining player.
 * Run the validation for the received payload.
 * If an id is provided, then the player will be joined to the tournament.
 * If an id is not provided, then the new tournament will be generated and the player will be joined to the new tournament.
 *
 * @param dispatch - Dispatch function from the store.
 * @param payload - Payload for joining player.
 * @param state - Current state model.
 *
 * ### Related reducers and effects
 * - setTournamentState (effect)
 * - addTournamentReducer
 * - addPlayerReducer
 *
 * ### Related raisers
 * - payloadNotProvided
 * - invalidPlayerName
 * - invalidPlayerNameLength
 * - tournamentNotFound
 */
export declare const joinPlayer: (dispatch: Dispatch, payload: JoinPlayerPayload, state: RootState) => PlayerId | null;
/** Effect function for adding player.
 * Run the validation for the received payload.
 * Player will be added to the tournament.
 * Tournament state will update with the given state.
 *
 * @param dispatch - Dispatch function from the store.
 * @param payload - Payload for adding player.
 * @param state - Current state model.
 *
 * ### Related reducers and effects
 * - setTournamentState (effect)
 * - addPlayerReducer
 *
 * ### Related raisers
 * - payloadNotProvided
 * - invalidPlayerName
 * - invalidPlayerNameLength
 * - tournamentNotFound
 */
export declare const addPlayer: (dispatch: Dispatch, payload: AddPlayerPayload, state: RootState) => void;
/** Effect function for clearing player.
 * Run the validation for the received payload.
 * If the player is found, then the player will be cleared.
 *
 * @param dispatch - Dispatch function from the store.
 * @param payload - Payload for clearing player.
 * @param state - Current state model.
 *
 * ### Related reducers and effects
 * - setTournamentState (effect)
 * - removePlayerReducer
 *
 * ### Related raisers
 * - payloadNotProvided
 * - playerNotFound
 */
export declare const clearPlayer: (dispatch: Dispatch, payload: ClearPlayerPayload, state: RootState) => void;
/** Effect function for sending player logs while racing.
 * Run the validation for the received payload.
 * If the player and race are found, then the player logs will be sent.
 *
 * @param dispatch - Dispatch function from the store.
 * @param payload - Payload for sending player logs.
 * @param state - Current state model.
 *
 * ### Related reducers and effects
 * - updatePlayerLogReducer
 *
 * ### Related raisers
 * - payloadNotProvided
 * - playerNotFound
 * - raceNotFound
 */
export declare const sendTypeLog: (dispatch: Dispatch, payload: SendTypeLogPayload, state: RootState) => void;
