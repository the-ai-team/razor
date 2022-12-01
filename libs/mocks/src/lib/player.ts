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
 * @param {[number,number]} pIdRange - Range of player id to generate
 * @param {AppTournamentId} tid - Tournament id to assign to players
 * @param {AppPlayerState} state - Player state to assign to players
 * @returns {AppPlayers} - Mock players model
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
 * @param {AppRaceId} rid - Race id
 * @param {AppPlayerId} pid - Player id
 * @returns {AppPlayerLogId} - Mock player log id
 */
export const mockPlayerLogId = (
  rid: AppRaceId,
  pid: AppPlayerId,
): AppPlayerLogId => {
  return `${rid}-${pid}`;
};

/** Generate mock completed player logs
 *
 * @param {number} textLength - Length of race text.
 * @returns {AppPlayerLog} - Mock completed player logs.
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

/** Generate mock incompleted player logs. */
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

  const lastTypedLength = textLength - random(5, 60);

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
