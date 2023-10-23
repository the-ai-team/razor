import { z } from 'zod';

import { leaderboardSchema } from './leaderboard';
import { playerIdSchema, playerNameSchema, playerSchema } from './player';
import { playerLogSchema, playerLogsCollectionSchema } from './playerLog';
// eslint-disable-next-line unused-imports/no-unused-imports
import { SocketProtocols } from './protocols';
import { raceIdSchema } from './race';
import { stateModelSchema } from './state-model';
import { roomIdSchema, tournamentIdSchema } from './tournament';

// Following schemas to be used when data sent through socket.
// Each schema is related to a protocol defined in {@link SocketProtocols}

/**
 * Related protocol - {@link SocketProtocols.AuthTokenTransfer}
 */
export const authTokenTransferSchema = z.string();

/**
 * Related protocol - {@link SocketProtocols.JoinLobbyRequest} and {@link SocketProtocols.CreateLobbyRequest}
 */
export const initialClientDataSchema = z.object({
  playerName: playerNameSchema,
  roomId: roomIdSchema.optional(),
});

/**
 * Related protocol - {@link SocketProtocols.CreateLobbyAccept} and {@link SocketProtocols.JoinLobbyAccept}
 */
export const initialServerDataSchema = z.object({
  playerId: playerIdSchema,
  tournamentId: tournamentIdSchema,
  snapshot: stateModelSchema,
});

/**
 * Related protocol - {@link SocketProtocols.PlayerJoin}
 */
export const playerJoinSchema = z.object({
  player: playerSchema,
});

/**
 * Related protocol - {@link SocketProtocols.StartRaceRequest}
 */
export const startRaceRequestSchema = z.object({});

/**
 * Related protocol - {@link SocketProtocols.StartRaceAccept}
 */
export const startRaceAcceptSchema = z.object({
  raceId: raceIdSchema,
  raceStartedBy: playerIdSchema,
  raceText: z.string(),
});

/**
 * Related protocol - {@link SocketProtocols.SendTypeLog}
 */
export const sendTypeLogSchema = z.object({
  raceId: raceIdSchema,
  playerLogs: z.array(playerLogSchema),
});

/**
 * Related protocol - {@link SocketProtocols.UpdateTypeLogs}
 */
export const updateTypeLogsSchema = z.object({
  raceId: raceIdSchema,
  playerLogs: playerLogsCollectionSchema,
});

/**
 * Related protocol - {@link SocketProtocols.InformTimeout}
 */
export const informTimeoutSchema = z.object({
  timestamp: z.number(),
});

/**
 * Related protocol - {@link SocketProtocols.SendLeaderboard}
 */
export const sendLeaderboardSchema = z.object({
  raceId: raceIdSchema,
  leaderboard: leaderboardSchema,
});

export type ProtocolSchemaTypes =
  | typeof authTokenTransferSchema
  | typeof initialClientDataSchema
  | typeof initialServerDataSchema
  | typeof playerJoinSchema
  | typeof startRaceRequestSchema
  | typeof startRaceAcceptSchema
  | typeof sendTypeLogSchema
  | typeof updateTypeLogsSchema
  | typeof informTimeoutSchema
  | typeof sendLeaderboardSchema;
