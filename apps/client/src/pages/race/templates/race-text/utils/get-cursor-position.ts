import {
  AppPlayerId,
  AppPlayerLog,
  AppPlayerLogId,
  AppPlayerLogs,
  AppPlayerProfiles,
  AppRacePlayerCursor,
} from '@razor/models';
import { extractId, ExtractIdType } from '@razor/util';

/** Get cursor position base on player logs. */
export function getCursorPosition(playerLogs: AppPlayerLog[]): number {
  if (!playerLogs?.length) {
    return 0;
  }
  return playerLogs[playerLogs.length - 1].textLength;
}

/** Get cursor positions with their player avatars as a list. */
export function getCursorPositionsWithPlayerAvatars(
  playerLogs: AppPlayerLogs,
  playerProfiles: AppPlayerProfiles,
): AppRacePlayerCursor[] {
  const playerIds = Object.keys(playerLogs) as AppPlayerLogId[];

  const playerCursors: AppRacePlayerCursor[] = playerIds.map(playerLogId => {
    const playerLog = playerLogs[playerLogId];
    const playerId = extractId(
      playerLogId,
      ExtractIdType.PlayerLog,
      ExtractIdType.Player,
    );
    const playerProfile = playerProfiles[playerId];

    return {
      playerId: playerLogId as AppPlayerId,
      position: getCursorPosition(playerLog),
      avatarLink: playerProfile?.avatarLink || '',
    };
  });

  return playerCursors;
}
