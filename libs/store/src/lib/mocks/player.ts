import {
  AppPlayer,
  AppPlayerId,
  AppPlayers,
  AppPlayerState,
  AppTournamentId,
} from '@razor/models';
import { giveZeroPadding } from '@razor/util';

const mockPlayerName = (n: number) => {
  return `Player${n}`;
};
const mockPlayerAvatar = (n: number) => {
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

export const mockPlayer = (
  n: number,
  tid: AppTournamentId = 'T:testTR00',
  state: AppPlayerState = AppPlayerState.Idle,
) => ({
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

export const mockPlayersModel = (
  len: number,
  tid: AppTournamentId = 'T:testTR00',
): AppPlayers => {
  const players: AppPlayers = {};
  for (let i = 1; i <= len; i++) {
    players[mockPlayerId(i)] = mockPlayer(i, tid);
  }
  return players;
};
