import { AppMessageLog } from '@razor/models';
import { Dispatch } from '../store';
/** Effect function for sending a log message.
 * This effect will check the type of the log message which comes from the payload
 * and do the relevant operation.
 *
 * @param {Dispatch} dispatch - The dispatch function from the store
 * @param {AppMessageLog} payload - The payload which contains the log message
 *
 * ### Related reducers and effects
 * - logErrorReducer
 */
export declare const sendLogMessage: (dispatch: Dispatch, payload: AppMessageLog) => void;
