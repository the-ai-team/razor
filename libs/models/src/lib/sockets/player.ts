import { PLAYER_NAME_RANGE } from '@razor/constants';
import { z } from 'zod';

// ==== Primary Schemas ==== //
export const playerIdSchema = z.custom<`P:${string}`>(id =>
  /^P:[a-zA-Z0-9]{8}$/.test(id as string),
);
export const playerNameSchema = z
  .string()
  .min(PLAYER_NAME_RANGE[0])
  .max(PLAYER_NAME_RANGE[1])
  .regex(/^[a-zA-Z0-9_]+$/);

// ==== Enums ==== //
export enum PlayerState {
  /** **Player idle**
   *
   * When a player is not in a race but in the lobby.
   *
   * Possible actions:
   * In the lobby, In the leaderboard, etc.
   */
  Idle = 'idle',
  /** **Player racing**
   *
   * When a player is in a race.
   *
   * Possible actions:
   * In race only.
   */
  Racing = 'racing',
}

// ==== Types ==== //
/** Player id template literal */
export type playerId = z.input<typeof playerIdSchema>;

// ==== Interfaces ==== //
// Note: `Player` does not need to be a schema; because it's only bound to the server-to-client communication.
export interface Player {
  /** Unique player id */
  id: playerId;
  /** Player name */
  name: string;
  /** Player avatar icon URL */
  avatarLink: string;
  /** Player state */
  state: PlayerState;
}
