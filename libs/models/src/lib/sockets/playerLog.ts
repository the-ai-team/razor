import { MAX_ALLOWED_TEXT_LENGTH } from '@razor/constants';
import { z } from 'zod';
import { Player } from './player';
import { timestampSchema } from './tournament';

// ==== Primary Schemas ==== //
export const playerLogIdSchema =
  z.custom<`T:${string}-R:${string}-P:${string}`>(id =>
    /^T:[a-zA-Z0-9]{8}-R:[a-zA-Z0-9]{3}-P:[a-zA-Z0-9]{8}$/.test(id as string),
  );

// ==== Compound Schemas ==== //
export const playerLogSchema = z.object({
  /** Correctly typed length by player */
  textLength: z.number().min(0).max(MAX_ALLOWED_TEXT_LENGTH),
  /** Timestamp when player typed the last character */
  timestamp: timestampSchema,
});

// ==== Types ==== //
/** Type for time-logs when players are typing */
export type PlayerLog = z.input<typeof playerLogSchema>;

// ==== Interfaces ==== //
// Note: `PlayerLogsCollection` and `PlayerLogsPacket` does not need to be a schema; because it's only bound to the server-to-client communication.
/** Log collection for a specific player in a specific race.
 *
 * Keeping player id, name, and avatar link inside race to show data even if a player leaves.
 */
export interface PlayerLogsCollection extends Omit<Player, 'state'> {
  /** Array of time logs of player */
  logs: PlayerLog[];
}

/** Server sends player logs packet by packet, as the race continues. */
export interface PlayerLogsPacket extends PlayerLogsCollection {
  /** Last timestamp of player log that was sent to the viewer.
   *
   * Keeping last timestamp will make easy to merge updates from server to client.
   */
  lastTimestamp: number;
}
