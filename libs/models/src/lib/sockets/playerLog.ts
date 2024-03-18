import { MAX_ALLOWED_TEXT_LENGTH } from '@razor/constants';
import { z } from 'zod';

import { playerIdSchema } from './player';
import { timestampSchema } from './tournament';

// ==== Types ==== //
/** Type for time-logs when players are typing */
export type PlayerLog = z.infer<typeof playerLogSchema>;

/** Log collection or partial collection for a specific player. */
export type PlayerLogsCollection = z.infer<typeof playerLogsCollectionSchema>;

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

export const playerLogsCollectionSchema = z.record(
  playerIdSchema,
  z.array(playerLogSchema),
);
