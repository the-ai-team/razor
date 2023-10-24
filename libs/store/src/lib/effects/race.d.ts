import { EndRacePayload, StartRacePayload } from '../payloads';
import { Dispatch, RootState } from '../store';
/** Effect function for starting the countdown of the race.
 * Run the validation for the received payload.
 * If the player who pressed the start button and the relevant tournament are found, then the countdown will be started.
 * Tournament state will be changed to "Countdown".
 *
 * @param dispatch - Dispatch function from the store.
 * @param payload - Payload for starting the countdown of the
 * @param state - Current state model.
 *
 * ### Related reducers and effects
 * - setTournamentState (effect)
 * - updatePlayerReducer
 * - updateRaceReducer
 *
 * ### Related raisers
 * - tournamentNotFound
 * - playerNotFound
 */
export declare const startRace: (dispatch: Dispatch, payload: StartRacePayload, state: RootState) => void;
/** Effect function for ending race of the tournament.
 * Run the validation for the received payload.
 * If the race is found, then the race will be ended.
 * Leaderboard will be generated.
 * Tournament state will be updated to "Leaderboard".
 *
 * @param dispatch - The dispatch function of the store.
 * @param payload - The payload of the action.
 * @param state - The state of the store.
 *
 * ### Related reducers and effects
 * - updateTournamentReducer
 * - updateRaceReducer
 * - addLeaderboardReducer
 * - updatePlayerReducer
 *
 * ### Related raisers
 * - raceNotFound
 */
export declare const endRace: (dispatch: Dispatch, payload: EndRacePayload, state: RootState) => void;
