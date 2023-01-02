import { AppTournament } from '@razor/models';
import { SetTournamentStatePayload } from '../payloads';
import { tournamentNotFound } from '../raisers';
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
export const setTournamentState = (
  dispatch: Dispatch,
  payload: SetTournamentStatePayload,
  state: RootState,
): void => {
  const { tournamentId, tournamentState } = payload;

  if (!(tournamentId in state.game.tournamentsModel)) {
    tournamentNotFound(dispatch, tournamentId, `While setting ready`);
    return;
  }

  const tournament: AppTournament = {
    ...state.game.tournamentsModel[tournamentId],
    state: tournamentState,
  };
  dispatch.game.updateTournamentReducer({
    tournamentId,
    tournament,
  });
};
