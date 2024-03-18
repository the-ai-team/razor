import { AppPlayerId } from '@razor/models';

let savedPlayerId: AppPlayerId | null;

/** Save the player ID for local store dispatch uses. */
export function savePlayerId(playerId: AppPlayerId | null = null): void {
  savedPlayerId = playerId;
}

export function getSavedPlayerId(): AppPlayerId | null {
  return savedPlayerId;
}
