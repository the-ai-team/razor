import { z } from 'zod';

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
      timoutDuration: z.number(),
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
  leaderboardsModel: z.record(
    raceIdSchema,
    z.array(
      z.object({
        playerId: playerIdSchema,
        status: z.nativeEnum(PlayerState),
        values: z
          .object({
            wpm: z.number(),
            elapsedTime: z.number(),
          })
          .or(
            z.object({
              distnace: z.number(),
            }),
          ),
      }),
    ),
  ),
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
