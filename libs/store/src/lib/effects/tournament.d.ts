import { SetTournamentStatePayload } from '../payloads';
import { Dispatch, RootState } from '../store';
/** Effect function for setting tournament state.
 * Run the validation for the received payload.
 * If the tournament is found, then change the state of the tournament.
 *
 * @param dispatch - The dispatch function of the store.
 * @param payload - The payload of the action.
 * @param state - The state of the store.
 *
 * ### Related reducers and effects
 * - updateTournamentReducer
 *
 * ### Related raisers
 * - tournamentNotFound
 */
export declare const setTournamentState: (dispatch: Dispatch, payload: SetTournamentStatePayload, state: RootState) => void;
