import { AppStateModel } from '@razor/models';
import { LogErrorReducerPayload } from '../payloads';
/** Reducer function for logging an error to state model.
 * Error will be added to the errors model.
 * If the errors model is at its max capacity, the oldest errors will be removed.
 
 * @param state - Current state model
 * @param payload - Payload for log error
 * @returns New state model if successful, else current state model
 */
export declare const logErrorReducer: (state: AppStateModel, payload: LogErrorReducerPayload) => AppStateModel;
