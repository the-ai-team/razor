import { setReadyTournamentPayload } from '../payloads';
import { Dispatch, RootState } from '../store';
import {
  AppTournament,
  AppTournamentId,
  AppTournamentState,
} from '@razor/models';
import { tournamentNotFound } from '../raisers';

export const setReadyTournament = async (
  dispatch: Dispatch,
  payload: setReadyTournamentPayload,
  state: RootState,
): Promise<void> => {
  const { tournamentId }: { tournamentId: AppTournamentId } = payload;

  if (!state.game.tournamentsModel[tournamentId])
    tournamentNotFound(dispatch, tournamentId, `While setting ready`);

  const tournament: AppTournament = {
    state: AppTournamentState.Ready,
    raceIds: [...state.game.tournamentsModel[tournamentId].raceIds],
    playerIds: [...state.game.tournamentsModel[tournamentId].playerIds],
  };
  dispatch.game.updateTournamentReducer({
    tournamentId,
    tournament,
  });
};
