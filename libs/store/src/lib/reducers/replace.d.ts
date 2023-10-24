import { AppStateModel } from '@razor/models';
import { ReplaceFullStateReducerPayload } from '../payloads';
/** Reducer function for replacing entire state.
 * Newly joining players will use this reducer to replace their current state with the state from the server.
 *
 * @param state - Current state model
 * @param payload - Payload for replacing state
 */
export declare const replaceFullStateReducer: (state: AppStateModel, payload: ReplaceFullStateReducerPayload) => AppStateModel;
