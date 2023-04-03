// ### [Reducers] Replace operations for store ### //
// Replace functions will replace the state with the given payload. These methods will be used for syncing client state with server state.

import { AppStateModel } from '@razor/models';

import { ReplaceFullStateReducerPayload } from '../payloads';

/** Reducer function for replacing entire state.
 * Newly joining players will use this reducer to replace their current state with the state from the server.
 *
 * @param state - Current state model
 * @param payload - Payload for replacing state
 */
export const replaceFullStateReducer = (
  state: AppStateModel,
  payload: ReplaceFullStateReducerPayload,
): AppStateModel => {
  const { parentState } = payload;
  /** State model after replacing full game */
  const newState: AppStateModel = {
    ...parentState,
    errorLogsModel: {
      ...state.errorLogsModel,
    },
  };
  return newState;
};
