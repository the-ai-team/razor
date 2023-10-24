import { AppStateModel } from '@razor/models';
import { AddLeaderboardReducerPayload, AddPlayerReducerPayload, AddRaceReducerPayload, AddTournamentReducerPayload } from '../payloads';
/** Reducer function for adding tournament to state model.
 * Tournament will be added to the tournaments model.
 *
 * @param state - Current state model
 * @param payload - Payload for add tournament
 * @returns New state model if successful, else current state model
 */
export declare const addTournamentReducer: (state: AppStateModel, payload: AddTournamentReducerPayload) => AppStateModel;
/** Reducer function for adding race to state model.
 * Race will be added to the races model and race id will be added to the relevant tournament.
 *
 * @param state - Current state model
 * @param payload - Payload for adding race
 * @returns New state model if successful, else current state model
 */
export declare const addRaceReducer: (state: AppStateModel, payload: AddRaceReducerPayload) => AppStateModel;
/** Reducer function for adding a player to the state model.
 * Player will be added to the players model and the player id will be added to the relevant tournament.
 *
 * @param state - Current state model
 * @param payload - Payload for add leaderboard
 * @returns New state model if successful, else current state model
 */
export declare const addPlayerReducer: (state: AppStateModel, payload: AddPlayerReducerPayload) => AppStateModel;
/** Reducer function for adding leaderboard to state model.
 * Leaderboard will be added to the leaderboards model.
 *
 * @param state - Current state model
 * @param payload - Payload for add leaderboard
 * @returns New state model if successful, else current state model
 */
export declare const addLeaderboardReducer: (state: AppStateModel, payload: AddLeaderboardReducerPayload) => AppStateModel;
