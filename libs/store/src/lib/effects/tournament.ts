import {
  AppTournament,
  AppTournamentId,
  AppTournamentState,
} from '@razor/models';
import { setTournamentStatePayload } from '../payloads';
import { tournamentNotFound } from '../raisers';
import { Dispatch, RootState } from '../store';

export const setStateTournament = async (
  dispatch: Dispatch,
  payload: setTournamentStatePayload,
  state: RootState,
): Promise<void> => {
  const {
    tournamentId,
    tournamentState,
  }: { tournamentId: AppTournamentId; tournamentState: AppTournamentState } =
    payload;

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
