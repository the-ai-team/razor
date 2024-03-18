import {
  AppPlayer,
  AppPlayerId,
  AppPlayerLog,
  AppPlayerLogId,
  AppPlayers,
  AppPlayerState,
  AppRaceId,
  AppTournamentId,
} from '@razor/models';
import { random, range } from 'lodash';

import { giveZeroPadding } from './give-zero-padding';

const mockPlayerName = (n: number): string => {
  return `Player${n}`;
};
const mockPlayerAvatar = (n: number): string => {
  return `https://avatars.dicebear.com/api/open-peeps/${n}.svg`;
};

export const mockPlayerId = (n: number): AppPlayerId => {
  return `P:testPL${giveZeroPadding(n.toString(), 2)}`;
};

// predefined sample player data
export const M_PLAYER_ID0 = mockPlayerId(0);
export const M_PLAYER_ID1 = mockPlayerId(1);
export const M_PLAYER_ID2 = mockPlayerId(2);
export const M_PLAYER_ID3 = mockPlayerId(3);
export const M_PLAYER_NAME0 = mockPlayerName(0);
export const M_PLAYER_NAME1 = mockPlayerName(1);
export const M_PLAYER_NAME2 = mockPlayerName(2);
export const M_PLAYER_NAME3 = mockPlayerName(3);
export const M_PLAYER_AVATAR0 = mockPlayerAvatar(0);
export const M_PLAYER_AVATAR1 = mockPlayerAvatar(1);
export const M_PLAYER_AVATAR2 = mockPlayerAvatar(2);
export const M_PLAYER_AVATAR3 = mockPlayerAvatar(3);

/** Generate player from id(number) given */
export const mockPlayer = (
  n: number,
  tid: AppTournamentId = 'T:testTR00',
  state: AppPlayerState = AppPlayerState.Idle,
): AppPlayer => ({
  avatarLink: `https://avatars.dicebear.com/api/open-peeps/${n}.svg`,
  name: `Player${n}`,
  state: state,
  tournamentId: tid,
});

// predefined sample players
export const M_PLAYER0: AppPlayer = mockPlayer(0);
export const M_PLAYER1: AppPlayer = mockPlayer(1);
export const M_PLAYER2: AppPlayer = mockPlayer(2);
export const M_PLAYER3: AppPlayer = mockPlayer(3);

/** Generate mock players model withing range given
 *
 * @param pIdRange - Range of player id to generate
 * @param tid - Tournament id to assign to players
 * @param state - Player state to assign to players
 * @returns Mock players model
 */
export const mockPlayersModel = (
  pIdRange: [number, number],
  tid: AppTournamentId = 'T:testTR00',
  state: AppPlayerState = AppPlayerState.Idle,
): AppPlayers => {
  const players: AppPlayers = {};
  for (const i of range(pIdRange[0], pIdRange[1])) {
    players[mockPlayerId(+i)] = mockPlayer(+i, tid, state);
  }
  return players;
};

/** Generate mock player log id
 *
 * @param rid - Race id
 * @param pid - Player id
 * @returns Mock player log id
 */
export const mockPlayerLogId = (
  rid: AppRaceId,
  pid: AppPlayerId,
): AppPlayerLogId => {
  return `${rid}-${pid}`;
};

/** Generate mock completed player logs
 *
 * @param textLength - Length of race text.
 * @returns Mock completed player logs.
 */
export const mockPlayerLogs = (textLength: number): AppPlayerLog[] => {
  const playerLogs: AppPlayerLog[] = [];
  let timestamp = 1234567000;
  // starting log
  playerLogs.push({
    timestamp,
    textLength: 0,
  });

  let typedLength = random(5, 10);
  timestamp += random(1, 3);

  while (typedLength < textLength) {
    playerLogs.push({
      timestamp,
      textLength: typedLength,
    });
    timestamp += random(1, 3);
    typedLength += random(6, 12);
  }

  playerLogs.push({
    timestamp: timestamp + random(1, 3),
    textLength,
  });

  return playerLogs;
};

// Predefined sample player logs (completed) - Text length: 500
export const M_COMPLETE_PLAYER_LOGS0 = [
  {
    timestamp: 1698054735753,
    textLength: 0,
  },
  {
    timestamp: 1698054736199,
    textLength: 1,
  },
  {
    timestamp: 1698054736450,
    textLength: 2,
  },
  {
    timestamp: 1698054736739,
    textLength: 3,
  },
  {
    timestamp: 1698054736963,
    textLength: 4,
  },
  {
    timestamp: 1698054737106,
    textLength: 5,
  },
  {
    timestamp: 1698054737210,
    textLength: 6,
  },
  {
    timestamp: 1698054745353,
    textLength: 7,
  },
  {
    timestamp: 1698054745537,
    textLength: 8,
  },
  {
    timestamp: 1698054746041,
    textLength: 9,
  },
  {
    timestamp: 1698054746181,
    textLength: 10,
  },
  {
    timestamp: 1698054746337,
    textLength: 11,
  },
  {
    timestamp: 1698054746418,
    textLength: 12,
  },
  {
    timestamp: 1698054746554,
    textLength: 13,
  },
  {
    timestamp: 1698054746633,
    textLength: 14,
  },
  {
    timestamp: 1698054746842,
    textLength: 15,
  },
  {
    timestamp: 1698054746930,
    textLength: 16,
  },
  {
    timestamp: 1698054747099,
    textLength: 17,
  },
  {
    timestamp: 1698054747257,
    textLength: 18,
  },
  {
    timestamp: 1698054747547,
    textLength: 19,
  },
  {
    timestamp: 1698054747794,
    textLength: 20,
  },
  {
    timestamp: 1698054747953,
    textLength: 21,
  },
  {
    timestamp: 1698054748057,
    textLength: 22,
  },
  {
    timestamp: 1698054748169,
    textLength: 23,
  },
  {
    timestamp: 1698054748273,
    textLength: 24,
  },
  {
    timestamp: 1698054748418,
    textLength: 25,
  },
  {
    timestamp: 1698054748921,
    textLength: 26,
  },
  {
    timestamp: 1698054748977,
    textLength: 27,
  },
  {
    timestamp: 1698054749073,
    textLength: 28,
  },
  {
    timestamp: 1698054749353,
    textLength: 29,
  },
  {
    timestamp: 1698054749489,
    textLength: 30,
  },
  {
    timestamp: 1698054749650,
    textLength: 31,
  },
  {
    timestamp: 1698054749731,
    textLength: 32,
  },
  {
    timestamp: 1698054749825,
    textLength: 33,
  },
  {
    timestamp: 1698054750009,
    textLength: 34,
  },
  {
    timestamp: 1698054750153,
    textLength: 35,
  },
  {
    timestamp: 1698054750265,
    textLength: 36,
  },
  {
    timestamp: 1698054750364,
    textLength: 37,
  },
  {
    timestamp: 1698054750570,
    textLength: 38,
  },
  {
    timestamp: 1698054750802,
    textLength: 39,
  },
  {
    timestamp: 1698054761337,
    textLength: 40,
  },
  {
    timestamp: 1698054761546,
    textLength: 41,
  },
  {
    timestamp: 1698054761747,
    textLength: 42,
  },
  {
    timestamp: 1698054762457,
    textLength: 43,
  },
  {
    timestamp: 1698054762593,
    textLength: 44,
  },
  {
    timestamp: 1698054762730,
    textLength: 45,
  },
  {
    timestamp: 1698054763130,
    textLength: 46,
  },
  {
    timestamp: 1698054763209,
    textLength: 47,
  },
  {
    timestamp: 1698054763378,
    textLength: 48,
  },
  {
    timestamp: 1698054763730,
    textLength: 49,
  },
  {
    timestamp: 1698054763873,
    textLength: 50,
  },
  {
    timestamp: 1698054764089,
    textLength: 51,
  },
  {
    timestamp: 1698054764201,
    textLength: 52,
  },
  {
    timestamp: 1698054764385,
    textLength: 53,
  },
  {
    timestamp: 1698054764703,
    textLength: 54,
  },
  {
    timestamp: 1698054764778,
    textLength: 55,
  },
  {
    timestamp: 1698054765721,
    textLength: 56,
  },
  {
    timestamp: 1698054765785,
    textLength: 57,
  },
  {
    timestamp: 1698054765889,
    textLength: 58,
  },
  {
    timestamp: 1698054766073,
    textLength: 59,
  },
  {
    timestamp: 1698054766185,
    textLength: 60,
  },
  {
    timestamp: 1698054766281,
    textLength: 61,
  },
  {
    timestamp: 1698054766609,
    textLength: 62,
  },
  {
    timestamp: 1698054766801,
    textLength: 63,
  },
  {
    timestamp: 1698054766828,
    textLength: 64,
  },
  {
    timestamp: 1698054766979,
    textLength: 65,
  },
  {
    timestamp: 1698054767225,
    textLength: 66,
  },
  {
    timestamp: 1698054767372,
    textLength: 67,
  },
  {
    timestamp: 1698054767641,
    textLength: 68,
  },
  {
    timestamp: 1698054767746,
    textLength: 69,
  },
  {
    timestamp: 1698054767906,
    textLength: 70,
  },
  {
    timestamp: 1698054768001,
    textLength: 71,
  },
  {
    timestamp: 1698054768162,
    textLength: 72,
  },
  {
    timestamp: 1698054768265,
    textLength: 73,
  },
  {
    timestamp: 1698054768409,
    textLength: 74,
  },
  {
    timestamp: 1698054768513,
    textLength: 75,
  },
  {
    timestamp: 1698054768569,
    textLength: 76,
  },
  {
    timestamp: 1698054768681,
    textLength: 77,
  },
  {
    timestamp: 1698054780288,
    textLength: 78,
  },
  {
    timestamp: 1698054780417,
    textLength: 79,
  },
  {
    timestamp: 1698054780513,
    textLength: 80,
  },
  {
    timestamp: 1698054780784,
    textLength: 81,
  },
  {
    timestamp: 1698054780864,
    textLength: 82,
  },
  {
    timestamp: 1698054780962,
    textLength: 83,
  },
  {
    timestamp: 1698054781146,
    textLength: 84,
  },
  {
    timestamp: 1698054781417,
    textLength: 85,
  },
  {
    timestamp: 1698054781552,
    textLength: 86,
  },
];

export const M_COMPLETE_PLAYER_LOGS1 = [
  {
    timestamp: 1698054735760,
    textLength: 0,
  },
  {
    timestamp: 1698054738813,
    textLength: 1,
  },
  {
    timestamp: 1698054739167,
    textLength: 2,
  },
  {
    timestamp: 1698054740457,
    textLength: 3,
  },
  {
    timestamp: 1698054740643,
    textLength: 4,
  },
  {
    timestamp: 1698054740763,
    textLength: 5,
  },
  {
    timestamp: 1698054740974,
    textLength: 6,
  },
  {
    timestamp: 1698054741152,
    textLength: 7,
  },
  {
    timestamp: 1698054741268,
    textLength: 8,
  },
  {
    timestamp: 1698054741450,
    textLength: 9,
  },
  {
    timestamp: 1698054741635,
    textLength: 10,
  },
  {
    timestamp: 1698054742861,
    textLength: 11,
  },
  {
    timestamp: 1698054743029,
    textLength: 12,
  },
  {
    timestamp: 1698054743160,
    textLength: 13,
  },
  {
    timestamp: 1698054743250,
    textLength: 14,
  },
  {
    timestamp: 1698054752766,
    textLength: 15,
  },
  {
    timestamp: 1698054752887,
    textLength: 16,
  },
  {
    timestamp: 1698054753167,
    textLength: 17,
  },
  {
    timestamp: 1698054753610,
    textLength: 18,
  },
  {
    timestamp: 1698054753738,
    textLength: 19,
  },
  {
    timestamp: 1698054753859,
    textLength: 20,
  },
  {
    timestamp: 1698054754037,
    textLength: 21,
  },
  {
    timestamp: 1698054754155,
    textLength: 22,
  },
  {
    timestamp: 1698054754251,
    textLength: 23,
  },
  {
    timestamp: 1698054754418,
    textLength: 24,
  },
  {
    timestamp: 1698054754664,
    textLength: 25,
  },
  {
    timestamp: 1698054754963,
    textLength: 26,
  },
  {
    timestamp: 1698054755023,
    textLength: 27,
  },
  {
    timestamp: 1698054755270,
    textLength: 28,
  },
  {
    timestamp: 1698054755575,
    textLength: 29,
  },
  {
    timestamp: 1698054755660,
    textLength: 30,
  },
  {
    timestamp: 1698054755838,
    textLength: 31,
  },
  {
    timestamp: 1698054755909,
    textLength: 32,
  },
  {
    timestamp: 1698054755991,
    textLength: 33,
  },
  {
    timestamp: 1698054756169,
    textLength: 34,
  },
  {
    timestamp: 1698054756393,
    textLength: 35,
  },
  {
    timestamp: 1698054756465,
    textLength: 36,
  },
  {
    timestamp: 1698054756537,
    textLength: 37,
  },
  {
    timestamp: 1698054756765,
    textLength: 38,
  },
  {
    timestamp: 1698054756932,
    textLength: 39,
  },
  {
    timestamp: 1698054757442,
    textLength: 40,
  },
  {
    timestamp: 1698054757564,
    textLength: 41,
  },
  {
    timestamp: 1698054757756,
    textLength: 42,
  },
  {
    timestamp: 1698054758045,
    textLength: 43,
  },
  {
    timestamp: 1698054758166,
    textLength: 44,
  },
  {
    timestamp: 1698054758442,
    textLength: 45,
  },
  {
    timestamp: 1698054758621,
    textLength: 46,
  },
  {
    timestamp: 1698054758702,
    textLength: 47,
  },
  {
    timestamp: 1698054758890,
    textLength: 48,
  },
  {
    timestamp: 1698054759121,
    textLength: 49,
  },
  {
    timestamp: 1698054759235,
    textLength: 50,
  },
  {
    timestamp: 1698054772350,
    textLength: 51,
  },
  {
    timestamp: 1698054773404,
    textLength: 52,
  },
  {
    timestamp: 1698054773698,
    textLength: 53,
  },
  {
    timestamp: 1698054773890,
    textLength: 54,
  },
  {
    timestamp: 1698054773943,
    textLength: 55,
  },
  {
    timestamp: 1698054774149,
    textLength: 56,
  },
  {
    timestamp: 1698054774159,
    textLength: 57,
  },
  {
    timestamp: 1698054774295,
    textLength: 58,
  },
  {
    timestamp: 1698054774426,
    textLength: 59,
  },
  {
    timestamp: 1698054774490,
    textLength: 60,
  },
  {
    timestamp: 1698054774625,
    textLength: 61,
  },
  {
    timestamp: 1698054775174,
    textLength: 62,
  },
  {
    timestamp: 1698054775359,
    textLength: 63,
  },
  {
    timestamp: 1698054775422,
    textLength: 64,
  },
  {
    timestamp: 1698054775498,
    textLength: 65,
  },
  {
    timestamp: 1698054775606,
    textLength: 66,
  },
  {
    timestamp: 1698054775745,
    textLength: 67,
  },
  {
    timestamp: 1698054775854,
    textLength: 68,
  },
  {
    timestamp: 1698054775914,
    textLength: 69,
  },
  {
    timestamp: 1698054776056,
    textLength: 70,
  },
  {
    timestamp: 1698054776190,
    textLength: 71,
  },
  {
    timestamp: 1698054776387,
    textLength: 72,
  },
  {
    timestamp: 1698054776409,
    textLength: 73,
  },
  {
    timestamp: 1698054776555,
    textLength: 74,
  },
  {
    timestamp: 1698054776661,
    textLength: 75,
  },
  {
    timestamp: 1698054776725,
    textLength: 76,
  },
  {
    timestamp: 1698054776850,
    textLength: 77,
  },
  {
    timestamp: 1698054777016,
    textLength: 78,
  },
  {
    timestamp: 1698054777081,
    textLength: 79,
  },
  {
    timestamp: 1698054777231,
    textLength: 80,
  },
  {
    timestamp: 1698054777348,
    textLength: 81,
  },
  {
    timestamp: 1698054777370,
    textLength: 82,
  },
  {
    timestamp: 1698054777499,
    textLength: 83,
  },
  {
    timestamp: 1698054777660,
    textLength: 84,
  },
  {
    timestamp: 1698054778553,
    textLength: 85,
  },
  {
    timestamp: 1698054778634,
    textLength: 86,
  },
];

/** Generate mock uncompleted player logs. */
export const mockTimeoutPlayerLogs = (textLength: number): AppPlayerLog[] => {
  const playerLogs: AppPlayerLog[] = [];
  let timestamp = 1234567000;
  // race starting log.
  playerLogs.push({
    timestamp,
    textLength: 0,
  });

  let typedLength = random(5, 10);
  timestamp += random(1, 3);

  const lastTypedLength = textLength - random(20, 100);

  while (typedLength < lastTypedLength) {
    playerLogs.push({
      timestamp,
      textLength: typedLength,
    });
    timestamp += random(1, 3);
    typedLength += random(6, 12);
  }

  return playerLogs;
};

// Predefined sample player logs (uncompleted) - Text length: 500
export const M_TIMEOUT_PLAYER_LOGS1 = [
  {
    timestamp: 1698054735760,
    textLength: 0,
  },
  {
    timestamp: 1698054738813,
    textLength: 1,
  },
  {
    timestamp: 1698054739167,
    textLength: 2,
  },
  {
    timestamp: 1698054740457,
    textLength: 3,
  },
  {
    timestamp: 1698054740643,
    textLength: 4,
  },
  {
    timestamp: 1698054740763,
    textLength: 5,
  },
  {
    timestamp: 1698054740974,
    textLength: 6,
  },
  {
    timestamp: 1698054741152,
    textLength: 7,
  },
  {
    timestamp: 1698054741268,
    textLength: 8,
  },
  {
    timestamp: 1698054741450,
    textLength: 9,
  },
  {
    timestamp: 1698054741635,
    textLength: 10,
  },
  {
    timestamp: 1698054742861,
    textLength: 11,
  },
  {
    timestamp: 1698054743029,
    textLength: 12,
  },
  {
    timestamp: 1698054743160,
    textLength: 13,
  },
  {
    timestamp: 1698054743250,
    textLength: 14,
  },
  {
    timestamp: 1698054752766,
    textLength: 15,
  },
  {
    timestamp: 1698054752887,
    textLength: 16,
  },
  {
    timestamp: 1698054753167,
    textLength: 17,
  },
  {
    timestamp: 1698054753610,
    textLength: 18,
  },
  {
    timestamp: 1698054753738,
    textLength: 19,
  },
  {
    timestamp: 1698054753859,
    textLength: 20,
  },
  {
    timestamp: 1698054754037,
    textLength: 21,
  },
  {
    timestamp: 1698054754155,
    textLength: 22,
  },
  {
    timestamp: 1698054754251,
    textLength: 23,
  },
  {
    timestamp: 1698054754418,
    textLength: 24,
  },
  {
    timestamp: 1698054754664,
    textLength: 25,
  },
  {
    timestamp: 1698054754963,
    textLength: 26,
  },
  {
    timestamp: 1698054755023,
    textLength: 27,
  },
  {
    timestamp: 1698054755270,
    textLength: 28,
  },
  {
    timestamp: 1698054755575,
    textLength: 29,
  },
  {
    timestamp: 1698054755660,
    textLength: 30,
  },
  {
    timestamp: 1698054755838,
    textLength: 31,
  },
  {
    timestamp: 1698054755909,
    textLength: 32,
  },
  {
    timestamp: 1698054755991,
    textLength: 33,
  },
  {
    timestamp: 1698054756169,
    textLength: 34,
  },
  {
    timestamp: 1698054756393,
    textLength: 35,
  },
  {
    timestamp: 1698054756465,
    textLength: 36,
  },
  {
    timestamp: 1698054756537,
    textLength: 37,
  },
  {
    timestamp: 1698054756765,
    textLength: 38,
  },
  {
    timestamp: 1698054756932,
    textLength: 39,
  },
  {
    timestamp: 1698054757442,
    textLength: 40,
  },
  {
    timestamp: 1698054757564,
    textLength: 41,
  },
  {
    timestamp: 1698054757756,
    textLength: 42,
  },
  {
    timestamp: 1698054758045,
    textLength: 43,
  },
  {
    timestamp: 1698054758166,
    textLength: 44,
  },
  {
    timestamp: 1698054758442,
    textLength: 45,
  },
  {
    timestamp: 1698054758621,
    textLength: 46,
  },
  {
    timestamp: 1698054758702,
    textLength: 47,
  },
  {
    timestamp: 1698054758890,
    textLength: 48,
  },
  {
    timestamp: 1698054759121,
    textLength: 49,
  },
  {
    timestamp: 1698054759235,
    textLength: 50,
  },
  {
    timestamp: 1698054772350,
    textLength: 51,
  },
  {
    timestamp: 1698054773404,
    textLength: 52,
  },
  {
    timestamp: 1698054773698,
    textLength: 53,
  },
  {
    timestamp: 1698054773890,
    textLength: 54,
  },
  {
    timestamp: 1698054773943,
    textLength: 55,
  },
  {
    timestamp: 1698054774149,
    textLength: 56,
  },
  {
    timestamp: 1698054774159,
    textLength: 57,
  },
  {
    timestamp: 1698054774295,
    textLength: 58,
  },
  {
    timestamp: 1698054774426,
    textLength: 59,
  },
  {
    timestamp: 1698054774490,
    textLength: 60,
  },
  {
    timestamp: 1698054774625,
    textLength: 61,
  },
  {
    timestamp: 1698054775174,
    textLength: 62,
  },
  {
    timestamp: 1698054775359,
    textLength: 63,
  },
  {
    timestamp: 1698054775422,
    textLength: 64,
  },
  {
    timestamp: 1698054775498,
    textLength: 65,
  },
];

export const M_TIMEOUT_PLAYER_LOGS2 = [
  {
    timestamp: 1698054735753,
    textLength: 0,
  },
  {
    timestamp: 1698054736199,
    textLength: 1,
  },
  {
    timestamp: 1698054736450,
    textLength: 2,
  },
  {
    timestamp: 1698054736739,
    textLength: 3,
  },
  {
    timestamp: 1698054736963,
    textLength: 4,
  },
  {
    timestamp: 1698054737106,
    textLength: 5,
  },
  {
    timestamp: 1698054737210,
    textLength: 6,
  },
  {
    timestamp: 1698054745353,
    textLength: 7,
  },
  {
    timestamp: 1698054745537,
    textLength: 8,
  },
  {
    timestamp: 1698054746041,
    textLength: 9,
  },
  {
    timestamp: 1698054746181,
    textLength: 10,
  },
];
