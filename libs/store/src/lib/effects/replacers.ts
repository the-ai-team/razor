import { ReplaceFullStatePayload } from '../payloads';
import { Dispatch } from '../store';

/** Effect function for repalce full state
 * Replace the entire state with the given state.
 *
 * @param dispatch - The dispatch function of the store.
 * @param payload - The payload of the action.
 * @param state - The state of the store.
 *
 * ### Related reducers and effects
 * - replaceFullStateReducer
 *
 * ### Related raisers
 * - incompleteState
 */
export const replaceFullState = (
  dispatch: Dispatch,
  payload: ReplaceFullStatePayload,
): void => {
  const { parentState } = payload;
  dispatch.game.replaceFullStateReducer({
    parentState,
  });
};
