import { z } from 'zod';

import { leaderboardSchema } from './leaderboard';
import { playerIdSchema, PlayerState } from './player';
import { playerLogIdSchema } from './playerLog';
import { raceIdSchema } from './race';
import { tournamentIdSchema, TournamentState } from './tournament';

// ==== Schemas ==== //
export const stateModelSchema = z.object({
  tournamentsModel: z.record(
    tournamentIdSchema,
    z.object({
      state: z.nativeEnum(TournamentState),
      raceIds: z.array(raceIdSchema),
      playerIds: z.array(playerIdSchema),
    }),
  ),
  playersModel: z.record(
    playerIdSchema,
    z.object({
      name: z.string(),
      avatarLink: z.string(),
      state: z.nativeEnum(PlayerState),
      tournamentId: tournamentIdSchema,
    }),
  ),
  racesModel: z.record(
    raceIdSchema,
    z.object({
      text: z.string(),
      timeoutDuration: z.number(),
      startedTimestamp: z.number(),
      players: z.record(
        playerIdSchema,
        z.object({
          name: z.string(),
          avatarLink: z.string(),
        }),
      ),
      isOnGoing: z.boolean(),
      raceStartedBy: playerIdSchema,
    }),
  ),
  leaderboardsModel: z.record(raceIdSchema, leaderboardSchema),
  playerLogsModel: z.record(
    playerLogIdSchema,
    z.array(
      z.object({
        timestamp: z.number(),
        textLength: z.number(),
      }),
    ),
  ),
});
