import { Dispatch } from '../store';
/** Logger raiser for payload not provided for a function.
 *
 * @param funcName - Name of the function which is raising the error.
 * @param dispatch - Dispatch function of the store.
 * @param payloadName - Missing payload item.
 */
export declare const payloadNotProvided: (funcName: string, dispatch: Dispatch, payloadName: string) => void;
