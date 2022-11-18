import { AppPlayerId, AppRaceId, AppTournamentId } from '@razor/models';
import { giveZeroPadding } from '@razor/util';

export const mockRaceId = (
  tournamentId: AppTournamentId,
  rN: number,
): AppRaceId => `${tournamentId}-R:${giveZeroPadding(rN.toString(), 3)}`;
