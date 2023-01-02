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
import { giveZeroPadding } from './give-zero-padding';
import { random, range } from 'lodash';

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
  { timestamp: 1234567000, textLength: 0 },
  { timestamp: 1234567003, textLength: 8 },
  { timestamp: 1234567004, textLength: 18 },
  { timestamp: 1234567006, textLength: 25 },
  { timestamp: 1234567007, textLength: 35 },
  { timestamp: 1234567010, textLength: 42 },
  { timestamp: 1234567013, textLength: 48 },
  { timestamp: 1234567015, textLength: 58 },
  { timestamp: 1234567017, textLength: 66 },
  { timestamp: 1234567020, textLength: 76 },
  { timestamp: 1234567022, textLength: 84 },
  { timestamp: 1234567023, textLength: 96 },
  { timestamp: 1234567026, textLength: 105 },
  { timestamp: 1234567028, textLength: 113 },
  { timestamp: 1234567031, textLength: 122 },
  { timestamp: 1234567032, textLength: 133 },
  { timestamp: 1234567033, textLength: 140 },
  { timestamp: 1234567036, textLength: 148 },
  { timestamp: 1234567037, textLength: 160 },
  { timestamp: 1234567039, textLength: 171 },
  { timestamp: 1234567041, textLength: 179 },
  { timestamp: 1234567044, textLength: 185 },
  { timestamp: 1234567047, textLength: 192 },
  { timestamp: 1234567050, textLength: 203 },
  { timestamp: 1234567051, textLength: 214 },
  { timestamp: 1234567053, textLength: 220 },
  { timestamp: 1234567055, textLength: 227 },
  { timestamp: 1234567056, textLength: 235 },
  { timestamp: 1234567057, textLength: 242 },
  { timestamp: 1234567060, textLength: 250 },
  { timestamp: 1234567062, textLength: 262 },
  { timestamp: 1234567064, textLength: 274 },
  { timestamp: 1234567065, textLength: 283 },
  { timestamp: 1234567066, textLength: 294 },
  { timestamp: 1234567069, textLength: 300 },
  { timestamp: 1234567072, textLength: 308 },
  { timestamp: 1234567074, textLength: 318 },
  { timestamp: 1234567077, textLength: 329 },
  { timestamp: 1234567080, textLength: 340 },
  { timestamp: 1234567083, textLength: 348 },
  { timestamp: 1234567084, textLength: 354 },
  { timestamp: 1234567085, textLength: 360 },
  { timestamp: 1234567087, textLength: 369 },
  { timestamp: 1234567090, textLength: 375 },
  { timestamp: 1234567091, textLength: 387 },
  { timestamp: 1234567094, textLength: 398 },
  { timestamp: 1234567095, textLength: 405 },
  { timestamp: 1234567096, textLength: 414 },
  { timestamp: 1234567099, textLength: 426 },
  { timestamp: 1234567102, textLength: 436 },
  { timestamp: 1234567104, textLength: 443 },
  { timestamp: 1234567106, textLength: 452 },
  { timestamp: 1234567107, textLength: 460 },
  { timestamp: 1234567110, textLength: 472 },
  { timestamp: 1234567113, textLength: 479 },
  { timestamp: 1234567116, textLength: 491 },
  { timestamp: 1234567117, textLength: 497 },
  { timestamp: 1234567123, textLength: 500 },
];
export const M_COMPLETE_PLAYER_LOGS1 = [
  { timestamp: 1234567000, textLength: 0 },
  { timestamp: 1234567001, textLength: 5 },
  { timestamp: 1234567003, textLength: 14 },
  { timestamp: 1234567004, textLength: 26 },
  { timestamp: 1234567007, textLength: 35 },
  { timestamp: 1234567009, textLength: 43 },
  { timestamp: 1234567011, textLength: 54 },
  { timestamp: 1234567013, textLength: 61 },
  { timestamp: 1234567014, textLength: 69 },
  { timestamp: 1234567016, textLength: 75 },
  { timestamp: 1234567019, textLength: 85 },
  { timestamp: 1234567022, textLength: 93 },
  { timestamp: 1234567025, textLength: 103 },
  { timestamp: 1234567028, textLength: 110 },
  { timestamp: 1234567030, textLength: 121 },
  { timestamp: 1234567031, textLength: 133 },
  { timestamp: 1234567032, textLength: 140 },
  { timestamp: 1234567033, textLength: 147 },
  { timestamp: 1234567034, textLength: 156 },
  { timestamp: 1234567036, textLength: 164 },
  { timestamp: 1234567038, textLength: 175 },
  { timestamp: 1234567039, textLength: 183 },
  { timestamp: 1234567041, textLength: 191 },
  { timestamp: 1234567042, textLength: 201 },
  { timestamp: 1234567043, textLength: 211 },
  { timestamp: 1234567046, textLength: 221 },
  { timestamp: 1234567049, textLength: 229 },
  { timestamp: 1234567051, textLength: 239 },
  { timestamp: 1234567054, textLength: 247 },
  { timestamp: 1234567057, textLength: 255 },
  { timestamp: 1234567058, textLength: 267 },
  { timestamp: 1234567060, textLength: 273 },
  { timestamp: 1234567063, textLength: 282 },
  { timestamp: 1234567066, textLength: 291 },
  { timestamp: 1234567069, textLength: 298 },
  { timestamp: 1234567071, textLength: 305 },
  { timestamp: 1234567074, textLength: 315 },
  { timestamp: 1234567077, textLength: 327 },
  { timestamp: 1234567080, textLength: 334 },
  { timestamp: 1234567083, textLength: 340 },
  { timestamp: 1234567085, textLength: 348 },
  { timestamp: 1234567086, textLength: 354 },
  { timestamp: 1234567087, textLength: 366 },
  { timestamp: 1234567089, textLength: 376 },
  { timestamp: 1234567090, textLength: 384 },
  { timestamp: 1234567091, textLength: 396 },
  { timestamp: 1234567092, textLength: 402 },
  { timestamp: 1234567095, textLength: 411 },
  { timestamp: 1234567096, textLength: 422 },
  { timestamp: 1234567097, textLength: 433 },
  { timestamp: 1234567098, textLength: 441 },
  { timestamp: 1234567101, textLength: 447 },
  { timestamp: 1234567104, textLength: 458 },
  { timestamp: 1234567107, textLength: 467 },
  { timestamp: 1234567108, textLength: 476 },
  { timestamp: 1234567111, textLength: 488 },
  { timestamp: 1234567113, textLength: 498 },
  { timestamp: 1234567116, textLength: 500 },
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
  { timestamp: 1234567000, textLength: 0 },
  { timestamp: 1234567003, textLength: 7 },
  { timestamp: 1234567005, textLength: 14 },
  { timestamp: 1234567007, textLength: 21 },
  { timestamp: 1234567009, textLength: 28 },
  { timestamp: 1234567012, textLength: 36 },
  { timestamp: 1234567014, textLength: 42 },
  { timestamp: 1234567015, textLength: 50 },
  { timestamp: 1234567018, textLength: 59 },
  { timestamp: 1234567020, textLength: 71 },
  { timestamp: 1234567021, textLength: 80 },
  { timestamp: 1234567024, textLength: 90 },
  { timestamp: 1234567027, textLength: 99 },
  { timestamp: 1234567030, textLength: 109 },
  { timestamp: 1234567032, textLength: 115 },
  { timestamp: 1234567034, textLength: 126 },
  { timestamp: 1234567035, textLength: 135 },
  { timestamp: 1234567038, textLength: 143 },
  { timestamp: 1234567039, textLength: 153 },
  { timestamp: 1234567040, textLength: 162 },
  { timestamp: 1234567043, textLength: 172 },
  { timestamp: 1234567046, textLength: 179 },
  { timestamp: 1234567048, textLength: 187 },
  { timestamp: 1234567050, textLength: 193 },
  { timestamp: 1234567052, textLength: 201 },
  { timestamp: 1234567054, textLength: 212 },
  { timestamp: 1234567055, textLength: 218 },
  { timestamp: 1234567057, textLength: 230 },
  { timestamp: 1234567059, textLength: 238 },
  { timestamp: 1234567060, textLength: 246 },
  { timestamp: 1234567062, textLength: 253 },
  { timestamp: 1234567065, textLength: 259 },
  { timestamp: 1234567068, textLength: 268 },
  { timestamp: 1234567069, textLength: 274 },
  { timestamp: 1234567072, textLength: 286 },
  { timestamp: 1234567074, textLength: 296 },
  { timestamp: 1234567075, textLength: 303 },
  { timestamp: 1234567078, textLength: 309 },
  { timestamp: 1234567080, textLength: 319 },
  { timestamp: 1234567082, textLength: 330 },
  { timestamp: 1234567083, textLength: 340 },
  { timestamp: 1234567085, textLength: 351 },
  { timestamp: 1234567088, textLength: 358 },
  { timestamp: 1234567091, textLength: 365 },
  { timestamp: 1234567093, textLength: 377 },
  { timestamp: 1234567094, textLength: 389 },
  { timestamp: 1234567096, textLength: 401 },
  { timestamp: 1234567099, textLength: 407 },
  { timestamp: 1234567100, textLength: 417 },
  { timestamp: 1234567101, textLength: 429 },
  { timestamp: 1234567102, textLength: 437 },
  { timestamp: 1234567103, textLength: 443 },
  { timestamp: 1234567104, textLength: 451 },
];

export const M_TIMEOUT_PLAYER_LOGS2 = [
  { timestamp: 1234567000, textLength: 0 },
  { timestamp: 1234567003, textLength: 7 },
  { timestamp: 1234567004, textLength: 15 },
  { timestamp: 1234567007, textLength: 25 },
  { timestamp: 1234567010, textLength: 31 },
  { timestamp: 1234567012, textLength: 40 },
  { timestamp: 1234567014, textLength: 50 },
  { timestamp: 1234567015, textLength: 60 },
  { timestamp: 1234567018, textLength: 67 },
  { timestamp: 1234567019, textLength: 75 },
  { timestamp: 1234567021, textLength: 86 },
  { timestamp: 1234567023, textLength: 95 },
  { timestamp: 1234567024, textLength: 103 },
  { timestamp: 1234567025, textLength: 114 },
  { timestamp: 1234567028, textLength: 126 },
  { timestamp: 1234567030, textLength: 136 },
  { timestamp: 1234567032, textLength: 144 },
  { timestamp: 1234567035, textLength: 150 },
  { timestamp: 1234567038, textLength: 158 },
  { timestamp: 1234567041, textLength: 164 },
  { timestamp: 1234567043, textLength: 175 },
  { timestamp: 1234567046, textLength: 184 },
  { timestamp: 1234567048, textLength: 191 },
  { timestamp: 1234567049, textLength: 201 },
  { timestamp: 1234567052, textLength: 209 },
  { timestamp: 1234567100, textLength: 221 },
  { timestamp: 1234567155, textLength: 232 },
  { timestamp: 1234567175, textLength: 243 },
  { timestamp: 1234567186, textLength: 254 },
  { timestamp: 1234567200, textLength: 261 },
];
