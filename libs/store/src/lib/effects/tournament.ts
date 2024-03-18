import { MIN_ALLOWED_PLAYERS } from '@razor/constants';
import { AppTournament, AppTournamentState } from '@razor/models';

import { UpdateTournamentStatePayload } from '../payloads';
import { tournamentNotFound } from '../raisers';
import { Dispatch, RootState } from '../store';

/** Effect function for setting tournament state.
 * Run the validation for the received payload.
 * If the tournament is found, then validate and change the state of the tournament.
 *
 * - If tournament state is, `Lobby` validate tournament state and update it.
 *  (No active players => Empty, MIN_ALLOWED_PLAYERS or more => Ready, else => Lobby)
 * - If tournament state of `Race` and `Leaderboard` just update it.
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
export const updateTournamentState = (
  dispatch: Dispatch,
  payload: UpdateTournamentStatePayload,
  state: RootState,
): void => {
  const { tournamentId, tournamentState } = payload;

  if (!(tournamentId in state.game.tournamentsModel)) {
    tournamentNotFound(dispatch, tournamentId, `While setting state`);
    return;
  }

  // Validate and update tournament state.
  const playerIdsInTournament =
    state.game.tournamentsModel[tournamentId].playerIds;

  let validatedTournamentState: AppTournamentState = tournamentState;
  if (tournamentState === AppTournamentState.Lobby) {
    if (playerIdsInTournament.length === 0) {
      validatedTournamentState = AppTournamentState.Empty;
    } else if (playerIdsInTournament.length >= MIN_ALLOWED_PLAYERS) {
      validatedTournamentState = AppTournamentState.Ready;
    }
  }

  const tournament: AppTournament = {
    ...state.game.tournamentsModel[tournamentId],
    state: validatedTournamentState,
  };
  dispatch.game.updateTournamentReducer({
    tournamentId,
    tournament,
  });
};
