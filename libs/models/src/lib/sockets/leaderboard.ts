import { z } from 'zod';

import { playerIdSchema } from './player';

// ==== Enums ==== //
/** Represents the different ways a player can finish the race. */
export enum PlayerStatus {
  /** Player finished the race by completing the text */
  Complete = 'complete',
  /** Player finished by timeout */
  Timeout = 'timeout',
}

// ==== Compound Schemas ==== //
export const leaderboardSchema = z.array(
  z.object({
    playerId: playerIdSchema,
    status: z.nativeEnum(PlayerStatus),
    values: z
      .object({
        wpm: z.number(),
        elapsedTime: z.number(),
      })
      .or(
        z.object({
          distance: z.number(),
        }),
      ),
  }),
);
