import {
  AppTournament,
  AppTournamentId,
  AppTournamentState,
} from '@razor/models';
import { range } from 'lodash';

import { giveZeroPadding } from './give-zero-padding';
import { mockPlayerId } from './player';
import { mockRaceId } from './race';

export const mockTournamentId = (n: number): AppTournamentId => {
  return `T:testTR${giveZeroPadding(n.toString(), 2)}`;
};

// predefined sample tournament ids
export const M_TOURNAMENT_ID0 = mockTournamentId(0);
export const M_TOURNAMENT_ID1 = mockTournamentId(1);
export const M_TOURNAMENT_ID2 = mockTournamentId(2);
export const M_TOURNAMENT_ID3 = mockTournamentId(3);

/** Generate mock tournament.
 *
 * @param tournamentId - Tournament id
 * @param rIdRange - Race ids to assign.
 * @param pIdRange - Player ids to assign.
 * @param state - Tournament state
 */
export const mockTournament = (
  tournamentId: AppTournamentId,
  rIdRange: [number, number],
  pIdRange: [number, number],
  state: AppTournamentState = AppTournamentState.Lobby,
): AppTournament => ({
  state,
  raceIds: range(rIdRange[0], rIdRange[1]).map(i =>
    mockRaceId(tournamentId, i),
  ),
  playerIds: range(pIdRange[0], pIdRange[1]).map(i => mockPlayerId(i)),
});

// Predefined sample tournaments
export const M_TOURNAMENT0: AppTournament = mockTournament(
  M_TOURNAMENT_ID0,
  [0, 1],
  [0, 3],
);
export const M_TOURNAMENT1: AppTournament = mockTournament(
  M_TOURNAMENT_ID1,
  [0, 1],
  [0, 3],
);
export const M_TOURNAMENT2: AppTournament = mockTournament(
  M_TOURNAMENT_ID2,
  [0, 1],
  [0, 3],
);
export const M_TOURNAMENT3: AppTournament = mockTournament(
  M_TOURNAMENT_ID3,
  [0, 1],
  [0, 3],
);
