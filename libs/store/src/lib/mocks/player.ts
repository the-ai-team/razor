import {
  AppPlayer,
  AppPlayerId,
  AppPlayers,
  AppPlayerState,
  AppTournamentId,
} from '@razor/models';
import { giveZeroPadding } from '@razor/util';
import { M_ID_TOURNAMENT1 } from './tournament';

export const mockPlayerID = (n: number): AppPlayerId =>
  `P:testPL${giveZeroPadding(n.toString(), 2)}` as AppPlayerId;
export const mockPlayerName = (n: number): string =>
  `Player${giveZeroPadding(n.toString(), 2)}`;
export const mockPlayerAvatar = (n: number): string =>
  `https://avatars.dicebear.com/api/open-peeps/${n}.svg`;

// predefined sample data
export const M_PLAYER_ID1 = mockPlayerID(1);
export const M_PLAYER_ID2 = mockPlayerID(2);
export const M_PLAYER_ID3 = mockPlayerID(3);
export const M_PLAYER_NAME1 = mockPlayerName(1);
export const M_PLAYER_NAME2 = mockPlayerName(2);
export const M_PLAYER_NAME3 = mockPlayerName(3);
export const M_PLAYER_AVATAR1 = mockPlayerAvatar(1);
export const M_PLAYER_AVATAR2 = mockPlayerAvatar(2);
export const M_PLAYER_AVATAR3 = mockPlayerAvatar(3);

export const mockPlayer = (
  n: number,
  tid: AppTournamentId = M_ID_TOURNAMENT1,
  state: AppPlayerState = AppPlayerState.Idle,
): AppPlayer => {
  return {
    avatarLink: `https://avatars.dicebear.com/api/open-peeps/${n}.svg`,
    name: `Player${n}`,
    state: state,
    tournamentId: tid,
  };
};

// predefined sample players
export const M_PLAYER1: AppPlayer = mockPlayer(1);
export const M_PLAYER2: AppPlayer = mockPlayer(2);
export const M_PLAYER3: AppPlayer = mockPlayer(3);

export const mockPlayersModel = (
  len: number,
  tid: AppTournamentId = M_ID_TOURNAMENT1,
): AppPlayers => {
  const players: AppPlayers = {};
  for (let i = 1; i <= len; i++) {
    players[mockPlayerID(i)] = mockPlayer(i, tid);
  }
  return players;
};
