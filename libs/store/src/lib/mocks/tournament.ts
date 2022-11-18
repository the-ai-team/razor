import {
  AppPlayerId,
  AppTournament,
  AppTournamentId,
  AppTournamentState,
} from '@razor/models';
import { giveZeroPadding } from '@razor/util';
import { range } from 'lodash';
import { mockPlayerId } from '../mocks';
import { mockRaceId } from './race';

export const mockTournamentId = (n: number): AppTournamentId => {
  return `T:testTR${giveZeroPadding(n.toString(), 2)}`;
};

export const M_TOURNAMENT_ID0 = mockTournamentId(0);
export const M_TOURNAMENT_ID1 = mockTournamentId(1);
export const M_TOURNAMENT_ID2 = mockTournamentId(2);
export const M_TOURNAMENT_ID3 = mockTournamentId(3);

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

export const M_TOURNAMENT0: AppTournament = mockTournament(
  M_TOURNAMENT_ID0,
  [0, 3],
  [0, 3],
);
export const M_TOURNAMENT1: AppTournament = mockTournament(
  M_TOURNAMENT_ID1,
  [0, 3],
  [0, 3],
);
export const M_TOURNAMENT2: AppTournament = mockTournament(
  M_TOURNAMENT_ID2,
  [0, 3],
  [0, 3],
);
export const M_TOURNAMENT3: AppTournament = mockTournament(
  M_TOURNAMENT_ID3,
  [0, 3],
  [0, 3],
);
