import {
  AppPlayerId,
  AppPlayerProfiles,
  AppRace,
  AppRaceId,
  AppTournamentId,
} from '@razor/models';
import { giveZeroPadding } from '@razor/util';
import { range } from 'lodash';
import { mockPlayerId } from './player';

export const mockRaceId = (
  tournamentId: AppTournamentId,
  rN: number,
): AppRaceId => `${tournamentId}-R:${giveZeroPadding(rN.toString(), 3)}`;

// Predefined race ids
export const M_TR0_RACE_ID0 = mockRaceId('T:testTR00', 0);
export const M_TR0_RACE_ID1 = mockRaceId('T:testTR00', 1);
export const M_TR0_RACE_ID2 = mockRaceId('T:testTR00', 2);
export const M_TR0_RACE_ID3 = mockRaceId('T:testTR00', 3);

export const M_TR1_RACE_ID0 = mockRaceId('T:testTR01', 0);
export const M_TR1_RACE_ID1 = mockRaceId('T:testTR01', 1);
export const M_TR1_RACE_ID2 = mockRaceId('T:testTR01', 2);
export const M_TR1_RACE_ID3 = mockRaceId('T:testTR01', 3);

export const M_TR2_RACE_ID0 = mockRaceId('T:testTR02', 0);
export const M_TR2_RACE_ID1 = mockRaceId('T:testTR02', 1);
export const M_TR2_RACE_ID2 = mockRaceId('T:testTR02', 2);
export const M_TR2_RACE_ID3 = mockRaceId('T:testTR02', 3);

export const M_TR3_RACE_ID0 = mockRaceId('T:testTR03', 0);
export const M_TR3_RACE_ID1 = mockRaceId('T:testTR03', 1);
export const M_TR3_RACE_ID2 = mockRaceId('T:testTR03', 2);
export const M_TR3_RACE_ID3 = mockRaceId('T:testTR03', 3);

// Predefined texts
export const M_RACE_TEXT0 =
  'A brian sees an actor as a whinny mirror. Galleies are foetid colds. Extending this logic, their laborer was, in this moment, a disguised century. Authors often misinterpret the trade as a crudest band, when in actuality it feels more like a kooky richard. A sociology can hardly be considered a proxy plow without also being a tempo. Some posit the howling ketchup to be less than gardant. A german can hardly be considered a scleroid mosque without also being a fireman. The first colloid lotion is, in its own way, a pantry.';

/** Generate race */
export const mockRace = (
  pIdRange: [number, number],
  isOnGoing = false,
): AppRace => {
  const players: AppPlayerProfiles = {};
  const raceStartedBy: AppPlayerId = mockPlayerId(pIdRange[0]);
  for (const i of range(pIdRange[0], pIdRange[1])) {
    players[mockPlayerId(i)] = {
      name: `Player${i}`,
      avatarLink: `https://avatars.dicebear.com/api/open-peeps/${i}.svg`,
    };
  }
  return {
    text: M_RACE_TEXT0,
    timeoutDuration: 100,
    startedTimestamp: 1234567890,
    players,
    isOnGoing,
    raceStartedBy,
  };
};

export const M_RACE0: AppRace = mockRace([0, 3]);
